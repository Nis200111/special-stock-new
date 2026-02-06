const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Use static binaries for reliability
let FFMPEG_PATH;
let FFPROBE_PATH;

try {
    FFMPEG_PATH = require('ffmpeg-static');
    const ffprobeStatic = require('ffprobe-static');
    FFPROBE_PATH = ffprobeStatic.path;

    console.log('✅ Using static FFmpeg binaries:', FFMPEG_PATH);
} catch (e) {
    // Fallback to local bin if static packages not found
    console.warn('⚠️ Static FFmpeg not found, falling back to local ./bin');
    FFMPEG_PATH = path.join(process.cwd(), 'bin', 'ffmpeg', 'ffmpeg.exe');
    FFPROBE_PATH = path.join(process.cwd(), 'bin', 'ffmpeg', 'ffprobe.exe');
}

// Set fluent-ffmpeg to use our binaries
console.log(`[FFmpeg Service] Configured Paths:`);
console.log(` - FFmpeg: ${FFMPEG_PATH}`);
console.log(` - FFprobe: ${FFPROBE_PATH}`);

if (!fs.existsSync(FFMPEG_PATH)) console.error('[FFmpeg Service] ❌ FFmpeg binary NOT FOUND at path!');
if (!fs.existsSync(FFPROBE_PATH)) console.error('[FFmpeg Service] ❌ FFprobe binary NOT FOUND at path!');

ffmpeg.setFfmpegPath(FFMPEG_PATH);
ffmpeg.setFfprobePath(FFPROBE_PATH);

/**
 * Calculate optimal grid dimensions based on PHP logic
 * PHP Reference: calculate_optimal_grid()
 */
function calculateGrid(width, height) {
    const MIN_GRID = 3;   // Defined in PHP as WATERMARK_MIN_GRID_SIZE
    const MAX_GRID = 8;   // Defined in PHP as WATERMARK_MAX_GRID_SIZE
    const OPTIMAL_CELL_SIZE = 200; // Defined in PHP as WATERMARK_OPTIMAL_CELL_SIZE

    // PHP: intval($dest_width / $optimal_cell_size)
    let cols = Math.floor(width / OPTIMAL_CELL_SIZE);
    let rows = Math.floor(height / OPTIMAL_CELL_SIZE);

    // Clamping to min/max
    cols = Math.max(MIN_GRID, Math.min(MAX_GRID, cols));
    rows = Math.max(MIN_GRID, Math.min(MAX_GRID, rows));

    // Aspect ratio adjustments from PHP
    const aspect = width / height;
    if (aspect > 2) {
        // Panoramic: increase cols
        cols = Math.min(MAX_GRID, Math.floor(cols * 1.5));
    }
    if (aspect < 0.5) {
        // Tall/Portrait: increase rows
        rows = Math.min(MAX_GRID, Math.floor(rows * 1.5));
    }

    return { cols, rows };
}

/**
 * Add Grid Watermark to Image using FFmpeg
 * Replicates the PHP 'apply_clean_grid_watermark' logic
 * 
 * @param {string} inputPath - Path to source image
 * @param {string} outputPath - Path to save WebP output
 * @param {string} watermarkPath - Path to watermark PNG
 * @returns {Promise<string>} Output path
 */
exports.watermarkImage = (inputPath, outputPath, watermarkPath, knownWidth = null, knownHeight = null) => {
    return new Promise((resolve, reject) => {

        console.log(`[FFmpeg Service] Applying Tiled Grid Watermark (Opacity 40%)`);

        // Dimensions are guaranteed 800x600 via imageProcessing.service.js
        const width = knownWidth || 800;
        const height = knownHeight || 600;

        // Grid Configuration: 3x3 Grid for 800x600 image
        const cols = 3;
        const rows = 3;
        const cellW = Math.floor(width / cols);
        const cellH = Math.floor(height / rows);

        // Watermark Size: 60% of cell width (approx 160px for 800px image)
        // This ensures it's "smaller and cleaner" as requested
        const wmTargetW = Math.floor(cellW * 0.6);

        // Build Complex Filter
        let filterComplex = [];

        // 1. Prepare Watermark: Scale & Opacity
        // scale: resize to target width, preserve aspect (-1)
        // format=rgba: ensure alpha channel
        // colorchannelmixer=aa=0.4: Set opacity to 40%
        filterComplex.push(`[1:v]scale=${wmTargetW}:-1,format=rgba,colorchannelmixer=aa=0.4[wm_transparent]`);

        // 2. Split watermark into N copies
        const total = cols * rows;
        let splitOuts = "";
        for (let i = 0; i < total; i++) splitOuts += `[wm${i}]`;

        filterComplex.push(`[wm_transparent]split=${total}${splitOuts}`);

        // 3. Overlay Loop
        let lastStream = "[0:v]";
        let count = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const wmRef = `[wm${count}]`;
                const nextStream = (count === total - 1) ? "[out]" : `[tmp${count}]`;

                // Calculate position: Center of cell
                // 'w' and 'h' in the overlay expression refer to the watermark (overlay) dimensions
                const xExpr = `${c * cellW} + (${cellW}-w)/2`;
                const yExpr = `${r * cellH} + (${cellH}-h)/2`;

                filterComplex.push(`${lastStream}${wmRef}overlay=x='${xExpr}':y='${yExpr}'${nextStream === "[out]" ? "" : nextStream}`);

                lastStream = nextStream;
                count++;
            }
        }

        // Execute FFmpeg
        ffmpeg()
            .input(inputPath)
            .input(watermarkPath)
            .complexFilter(filterComplex)
            .outputOptions([
                '-q:v 90',
                '-lossless 0'
            ])
            .on('start', (commandLine) => {
                console.log('[FFmpeg Service] Spawned FFMpeg with command: ' + commandLine);
            })
            .on('end', () => {
                console.log('[FFmpeg Service] Watermarking finished successfully.');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`[FFmpeg Service] Error: ${err.message}`);
                reject(new Error(`FFmpeg Error: ${err.message}`));
            })
            .toFormat('webp')
            .save(outputPath);
    });
};

/**
 * Add Grid Text Watermark to Video
 * Replicates PHP 'apply_simple_drawtext_grid'
 * 
 * @param {string} inputPath 
 * @param {string} outputPath 
 * @param {string} text 
 * @returns {Promise<string>} Output path
 */
exports.watermarkVideo = (inputPath, outputPath, text = 'Special Stocks') => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputPath, (err, metadata) => {
            if (err) return reject(err);

            // Find video stream
            const videoStream = metadata.streams.find(s => s.codec_type === 'video');
            const width = videoStream ? videoStream.width : 1920;
            const height = videoStream ? videoStream.height : 1080;

            // Grid Logic matches PHP function 'process_video_with_simple_drawtext'
            let cols = 5;
            let rows = 4;

            if (width < 1280) {
                cols = 3;
                rows = 3;
            } else if (width >= 3840) {
                cols = 6;
                rows = 5;
            }

            const marginX = width * 0.08;
            const marginY = height * 0.08;
            const usableWidth = width - (2 * marginX);
            const usableHeight = height - (2 * marginY);

            const stepX = usableWidth / (cols + 1);
            const stepY = usableHeight / (rows + 1);

            // Dynamic Font Size
            let fontSize = Math.floor(width / 90);
            fontSize = Math.max(14, Math.min(22, fontSize));

            // Escape text for FFmpeg filter
            const safeText = text.replace(/'/g, "\\'");
            const opacity = 0.8;

            let drawTextFilters = [];

            for (let r = 1; r <= rows; r++) {
                for (let c = 1; c <= cols; c++) {
                    const xPos = marginX + (c * stepX);
                    const yPos = marginY + (r * stepY);

                    // Offset alternate rows/cols slightly for pattern effect
                    const offsetX = (c % 2 === 0) ? 0 : 10;
                    const offsetY = (r % 2 === 0) ? 0 : 10;

                    const finalX = Math.floor(xPos + offsetX);
                    const finalY = Math.floor(yPos + offsetY);

                    // drawtext filter
                    drawTextFilters.push(
                        `drawtext=text='${safeText}':x=${finalX}-text_w/2:y=${finalY}-text_h/2:fontsize=${fontSize}:fontcolor=white@${opacity}`
                    );
                }
            }

            ffmpeg(inputPath)
                .outputOptions('-vf', drawTextFilters.join(','))
                .outputOptions('-c:a', 'copy') // Copy audio stream
                .save(outputPath)
                .on('end', () => resolve(outputPath))
                .on('error', (err) => reject(new Error(`FFmpeg Video Error: ${err.message}`)));
        });
    });
};

/**
 * Apply Standardized Centered Watermark to Image
 * 
 * 1. Resizes Input Image to fixed width 1280px (maintaining aspect ratio).
 * 2. Scales Watermark Logo to exactly 15% of the standardized image width (approx 192px).
 * 3. Places the single Watermark instance in the exact center.
 * 4. Ensures only ONE watermark is applied (no tiling).
 * 
 * @param {string} inputPath 
 * @param {string} outputPath 
 * @param {string} watermarkPath 
 * @returns {Promise<string>}
 */
exports.applyImageWatermark = (inputPath, outputPath, watermarkPath) => {
    return new Promise((resolve, reject) => {
        // 1. Strict Path Validation
        if (!fs.existsSync(inputPath)) return reject(new Error(`Input file missing: ${inputPath}`));
        if (!fs.existsSync(watermarkPath)) return reject(new Error(`Watermark file missing: ${watermarkPath}`));

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`[FFmpeg Service] Starting Standardized Watermark Process...`);
        console.log(` - Input: ${inputPath}`);
        console.log(` - Watermark: ${watermarkPath}`);

        // FILTER LOGIC EXPLAINED:
        // [0:v]scale=1280:-1[norm] 
        //      -> Take input [0], scale width to 1280px, height auto (-1). 
        //      -> Output stream named [norm] (Normalized Image).
        // 
        // [1:v][norm]scale2ref=w=iw*0.15:h='ow/mdar'[wm_sized][norm_ref] 
        //      -> Take watermark [1] and normalize image [norm].
        //      -> Scale scale [1] so its width is 15% of [norm]'s width (iw*0.15).
        //      -> Output correctly scaled watermark as [wm_sized] and pass through image as [norm_ref].
        //
        // [norm_ref][wm_sized]overlay=(W-w)/2:(H-h)/2:format=auto
        //      -> Overlay [wm_sized] on top of [norm_ref].
        //      -> Coordinates (W-w)/2 and (H-h)/2 ensure exact centering.
        //      -> format=auto handles alpha channel transparency correctly.

        const filterComplex = `[0:v]scale=1280:-1[norm];[1:v][norm]scale2ref=w=iw*0.15:h='ow/mdar'[wm_sized][norm_ref];[norm_ref][wm_sized]overlay=(W-w)/2:(H-h)/2:format=auto`;

        ffmpeg()
            .input(inputPath)
            .input(watermarkPath)
            .complexFilter(filterComplex)
            .outputOptions([
                '-q:v 90',       // High Quality WebP
                '-lossless 0',   // Lossy compression desirable for web
                '-v verbose'     // Verbose logging for debugging
            ])
            .toFormat('webp')
            .on('start', (cmd) => {
                console.log('--------------------------------------------------');
                console.log('[FFmpeg Service] Executing Command:');
                console.log(cmd);
                console.log('--------------------------------------------------');
            })
            .save(outputPath)
            .on('end', () => {
                console.log(`[FFmpeg Service] ✅ Success! Image normalized to 1280px with centered watermark.`);
                resolve(outputPath);
            })
            .on('error', (err, stdout, stderr) => {
                console.error(`[FFmpeg Service] ❌ FAILED: ${err.message}`);
                console.error('[FFmpeg Stderr Dump]:\n', stderr);
                reject(err);
            });
    });
};
