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

    let cols = Math.floor(width / OPTIMAL_CELL_SIZE);
    let rows = Math.floor(height / OPTIMAL_CELL_SIZE);

    cols = Math.max(MIN_GRID, Math.min(MAX_GRID, cols));
    rows = Math.max(MIN_GRID, Math.min(MAX_GRID, rows));

    const aspect = width / height;
    if (aspect > 2) cols = Math.min(MAX_GRID, Math.floor(cols * 1.5));
    if (aspect < 0.5) rows = Math.min(MAX_GRID, Math.floor(rows * 1.5));

    return { cols, rows };
}

/**
 * Add Grid Watermark to Image using FFmpeg
 * Replicates the PHP 'apply_clean_grid_watermark' logic
 */
exports.watermarkImage = (inputPath, outputPath, watermarkPath, knownWidth = null, knownHeight = null) => {
    return new Promise((resolve, reject) => {
        console.log(`[FFmpeg Service] Applying Tiled Grid Watermark (Opacity 40%)`);

        const width = knownWidth || 800;
        const height = knownHeight || 600;

        // (kept your existing fixed grid config)
        const cols = 3;
        const rows = 3;
        const cellW = Math.floor(width / cols);
        const cellH = Math.floor(height / rows);

        const wmTargetW = Math.floor(cellW * 0.6);

        const filterComplex = [];

        filterComplex.push(`[1:v]scale=${wmTargetW}:-1,format=rgba,colorchannelmixer=aa=0.4[wm_transparent]`);

        const total = cols * rows;
        let splitOuts = '';
        for (let i = 0; i < total; i++) splitOuts += `[wm${i}]`;
        filterComplex.push(`[wm_transparent]split=${total}${splitOuts}`);

        let lastStream = '[0:v]';
        let count = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const wmRef = `[wm${count}]`;
                const nextStream = (count === total - 1) ? '[out]' : `[tmp${count}]`;

                const xExpr = `${c * cellW} + (${cellW}-w)/2`;
                const yExpr = `${r * cellH} + (${cellH}-h)/2`;

                filterComplex.push(`${lastStream}${wmRef}overlay=x='${xExpr}':y='${yExpr}'${nextStream === '[out]' ? '' : nextStream}`);

                lastStream = nextStream;
                count++;
            }
        }

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
 */
exports.watermarkVideo = (inputPath, outputPath, text = 'Special Stocks') => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputPath, (err, metadata) => {
            if (err) return reject(err);

            const videoStream = metadata.streams.find(s => s.codec_type === 'video');
            const width = videoStream ? videoStream.width : 1920;
            const height = videoStream ? videoStream.height : 1080;

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

            let fontSize = Math.floor(width / 90);
            fontSize = Math.max(14, Math.min(22, fontSize));

            const safeText = text.replace(/'/g, "\\'");
            const opacity = 0.8;

            const drawTextFilters = [];

            for (let r = 1; r <= rows; r++) {
                for (let c = 1; c <= cols; c++) {
                    const xPos = marginX + (c * stepX);
                    const yPos = marginY + (r * stepY);

                    const offsetX = (c % 2 === 0) ? 0 : 10;
                    const offsetY = (r % 2 === 0) ? 0 : 10;

                    const finalX = Math.floor(xPos + offsetX);
                    const finalY = Math.floor(yPos + offsetY);

                    drawTextFilters.push(
                        `drawtext=text='${safeText}':x=${finalX}-text_w/2:y=${finalY}-text_h/2:fontsize=${fontSize}:fontcolor=white@${opacity}`
                    );
                }
            }

            ffmpeg(inputPath)
                .outputOptions('-vf', drawTextFilters.join(','))
                .outputOptions('-c:a', 'copy')
                .save(outputPath)
                .on('end', () => resolve(outputPath))
                .on('error', (e) => reject(new Error(`FFmpeg Video Error: ${e.message}`)));
        });
    });
};

/**
 * Apply RIGHT-MIDDLE watermark to Image (Single logo, not tiled)
 *
 * - Normalizes input to width 1280 (keeps aspect)
 * - Scales watermark to 30% of normalized image width
 * - Places watermark at right side, vertically centered (right-middle)
 * - Exports WebP
 */
exports.applyImageWatermark = (inputPath, outputPath, watermarkPath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(inputPath)) return reject(new Error(`Input file missing: ${inputPath}`));
        if (!fs.existsSync(watermarkPath)) return reject(new Error(`Watermark file missing: ${watermarkPath}`));

        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`[FFmpeg Service] Starting RIGHT-MIDDLE Watermark Process...`);
        console.log(` - Input: ${inputPath}`);
        console.log(` - Watermark: ${watermarkPath}`);

        // ✅ RIGHT-MIDDLE:
        // watermark width = 30% of image width  (change 0.30 -> 0.35/0.40 for bigger)
        // position = right padding 24px, vertically centered
        const filterComplex =
            `[0:v]scale=1180:-1[norm];` +
            `[1:v][norm]scale2ref=w=iw*0.30:h='ow/mdar'[wm_sized][norm_ref];` +
            `[norm_ref][wm_sized]overlay=W-w-0:(H-h)/2:format=auto`;

        ffmpeg()
            .input(inputPath)
            .input(watermarkPath)
            .complexFilter(filterComplex)
            .outputOptions([
                '-q:v 90',
                '-lossless 0',
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
                console.log(`[FFmpeg Service] ✅ Success! Watermark placed right-middle.`);
                resolve(outputPath);
            })
            .on('error', (err, stdout, stderr) => {
                console.error(`[FFmpeg Service] ❌ FAILED: ${err.message}`);
                console.error('[FFmpeg Stderr Dump]:\n', stderr);
                reject(err);
            });
    });
};
