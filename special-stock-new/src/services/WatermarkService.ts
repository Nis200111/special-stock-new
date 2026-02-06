import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import { exiftool } from 'exiftool-vendored';
import path from 'path';
import fs from 'fs';
import ffmpegStatic from 'ffmpeg-static';

// Set ffmpeg path
if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
}

export interface AssetMetadata {
    title?: string;
    description?: string;
    author?: string;
    copyright?: string;
    keywords?: string[];
}

export type WatermarkStyle = 'corner' | 'grid';

export interface WatermarkOptions {
    style?: WatermarkStyle;
    gridOpacity?: number; // 0.0 to 1.0 (default 0.4)
    text?: string; // Text for video grid watermark (default: metadata.copyright)
}

export class WatermarkService {
    private static readonly WATERMARK_PATH = path.join(process.cwd(), 'public', 'speciallogo.png');
    // Using standard Windows font path since OS is Windows. 
    // In production (Linux), this should be env configurable or point to a local font.
    private static readonly FONT_PATH = 'C:/Windows/Fonts/arial.ttf';

    private static readonly WATERMARKED_DIR = path.join(process.cwd(), 'public', 'uploads', 'watermarked');
    private static readonly THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'uploads', 'thumbnails');

    constructor() {
        this.ensureDirectories();
    }

    private ensureDirectories() {
        [WatermarkService.WATERMARKED_DIR, WatermarkService.THUMBNAILS_DIR].forEach((dir) => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    /**
     * Process image: Add watermark (Corner or Grid) and generate thumbnail
     */
    async processImage(
        inputPath: string,
        outputPath: string,
        metadata: AssetMetadata,
        options: WatermarkOptions = { style: 'corner' }
    ): Promise<void> {
        try {
            const style = options.style || 'corner';

            // 1. Get input image metadata
            const image = sharp(inputPath);
            const imageMeta = await image.metadata();

            if (!imageMeta.width || !imageMeta.height) {
                throw new Error('Could not retrieve image dimensions');
            }

            // 2. Prepare & Apply Watermark
            if (style === 'corner') {
                // Style 'Corner': Middle-Right, 25% max size, 0 margin
                const maxWatermarkWidth = Math.round(imageMeta.width * 0.25);
                const maxWatermarkHeight = Math.round(imageMeta.height * 0.25);

                const watermarkBuffer = await sharp(WatermarkService.WATERMARK_PATH)
                    .resize({
                        width: maxWatermarkWidth,
                        height: maxWatermarkHeight,
                        fit: 'inside',
                    })
                    .toBuffer();

                await image
                    .composite([{
                        input: watermarkBuffer,
                        gravity: 'east',
                        blend: 'over',
                    }])
                    .webp({ quality: 90 })
                    .toFile(outputPath);

            } else {
                // Style 'Grid': Tiled pattern
                // Logic: Grid size based on image size (~200px cells), min 3x3, max 8x8.
                const opacity = options.gridOpacity ?? 0.4;

                // Calculate Grid Dimensions
                const cols = Math.min(8, Math.max(3, Math.floor(imageMeta.width / 200)));
                const rows = Math.min(8, Math.max(3, Math.floor(imageMeta.height / 200)));

                const cellWidth = Math.ceil(imageMeta.width / cols);
                const cellHeight = Math.ceil(imageMeta.height / rows);

                // Prepare scaled watermark for grid cells (e.g., 60% of cell min dimension)
                const logoSize = Math.round(Math.min(cellWidth, cellHeight) * 0.6);

                // Load and process watermark for opacity
                // To support opacity in sharp composites effectively, we modulate the alpha channel
                const watermarkBuffer = await sharp(WatermarkService.WATERMARK_PATH)
                    .resize({ width: logoSize, fit: 'inside' })
                    .composite([{
                        input: Buffer.from([0, 0, 0, Math.round(255 * opacity)]), // Black with alpha
                        raw: { width: 1, height: 1, channels: 4 },
                        tile: true,
                        blend: 'dest-in' // Keeps the alpha of the secondary image (our generated alpha)
                    }])
                    .toBuffer();

                // Get actual dimensions of the resized watermark
                const wmMeta = await sharp(watermarkBuffer).metadata();
                const wmW = wmMeta.width || 0;
                const wmH = wmMeta.height || 0;

                // Create composites list
                const composites: sharp.OverlayOptions[] = [];

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        // Center in cell
                        const left = Math.round(c * cellWidth + (cellWidth - wmW) / 2);
                        const top = Math.round(r * cellHeight + (cellHeight - wmH) / 2);

                        composites.push({
                            input: watermarkBuffer,
                            left: left,
                            top: top,
                            blend: 'over'
                        });
                    }
                }

                await image
                    .composite(composites)
                    .webp({ quality: 90 })
                    .toFile(outputPath);
            }

            // 3. Generate Thumbnail (300px width, no watermark)
            const filename = path.basename(outputPath);
            const thumbnailPath = path.join(WatermarkService.THUMBNAILS_DIR, filename);

            await sharp(inputPath)
                .resize({ width: 300 })
                .webp({ quality: 80 })
                .toFile(thumbnailPath);

            // 4. Embed Metadata
            await this.embedMetadata(outputPath, metadata);

        } catch (error) {
            console.error('Error processing image:', error);
            throw error;
        }
    }

    /**
     * Process video: Add watermark (Overlay or Drawtext Grid) and embed metadata
     */
    async processVideo(
        inputPath: string,
        outputPath: string,
        metadata: AssetMetadata,
        options: WatermarkOptions = { style: 'corner' }
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const style = options.style || 'corner';
            const cmd = ffmpeg(inputPath);

            if (style === 'corner') {
                // Style 'Corner': 25% width/height, Middle-Right
                cmd.input(WatermarkService.WATERMARK_PATH)
                    .complexFilter([
                        // Scale watermark to 25% of video ref width (rw)
                        `[1:v][0:v]scale2ref=w=rw*0.25:h='ow/mdar'[wm][vid]`,
                        // Overlay at W-w, (H-h)/2
                        `[vid][wm]overlay=W-w:(H-h)/2`
                    ]);
            } else {
                // Style 'Grid': Drawtext Grid
                // Replicate PHP apply_simple_drawtext_grid logic using drawtext filter
                const text = options.text || metadata.copyright || 'Protected Content';
                const opacity = options.gridOpacity ?? 0.4;

                // Escape special characters for drawtext
                const safeText = text.replace(/:/g, '\\:').replace(/'/g, '');
                // Path escaping for filter
                const fontPath = WatermarkService.FONT_PATH.replace(/\\/g, '/').replace(/:/g, '\\:');

                // Let's create a 3x3 grid of text for simplicity and robustness
                // Or dynamic based on "apply_simple_drawtext_grid" conceptual logic.
                // We'll use 4x4 for good coverage.
                const rows = 4;
                const cols = 4;

                const filters: string[] = [];
                // We chain filters: [0:v]drawtext...[v1];[v1]drawtext...[v2]...

                let lastLabel = '0:v';

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const nextLabel = (r === rows - 1 && c === cols - 1) ? null : `v${r}_${c}`;

                        // Calculate position expressions
                        // x = (W/cols)*c + (W/cols)/2 - text_w/2  => simplified center logic
                        // We use relative expressions: x=(w/${cols})*${c}+(w/${cols}-text_w)/2
                        const xExpr = `(w/${cols})*${c}+(w/${cols}-text_w)/2`;
                        const yExpr = `(h/${rows})*${r}+(h/${rows}-text_h)/2`;

                        // Font size relative to height? e.g. h/20
                        const content = `drawtext=fontfile='${fontPath}':text='${safeText}':fontsize=h/20:fontcolor=white@${opacity}:x=${xExpr}:y=${yExpr}`;

                        filters.push(`[${lastLabel}]${content}${nextLabel ? `[${nextLabel}]` : ''}`);

                        if (nextLabel) lastLabel = nextLabel;
                    }
                }

                cmd.complexFilter(filters.join(';'));
            }

            cmd.outputOptions([
                '-c:v libx264', // Standard robust codec
                '-preset medium',
                '-crf 23',
                '-movflags +faststart'
            ])
                .outputOptions(
                    '-metadata', `title=${metadata.title || ''}`,
                    '-metadata', `copyright=${metadata.copyright || ''}`,
                    '-metadata', `artist=${metadata.author || ''}`,
                    '-metadata', `comment=${metadata.description || ''}`
                )
                .save(outputPath)
                .on('end', async () => {
                    try {
                        await this.embedMetadata(outputPath, metadata);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                })
                .on('error', (err) => {
                    console.error('Error processing video:', err);
                    reject(err);
                });
        });
    }

    private async embedMetadata(filePath: string, metadata: AssetMetadata) {
        const tags: any = {};

        if (metadata.title) {
            tags['Title'] = metadata.title;
            tags['XMP-dc:Title'] = metadata.title;
        }
        if (metadata.description) {
            tags['Description'] = metadata.description;
            tags['XMP-dc:Description'] = metadata.description;
        }
        if (metadata.author) {
            tags['Artist'] = metadata.author;
            tags['XMP-dc:Creator'] = metadata.author;
        }
        if (metadata.copyright) {
            tags['Copyright'] = metadata.copyright;
            tags['XMP-dc:Rights'] = metadata.copyright;
        }
        if (metadata.keywords && metadata.keywords.length > 0) {
            tags['Keywords'] = metadata.keywords;
        }

        await exiftool.write(filePath, tags);
    }
}
