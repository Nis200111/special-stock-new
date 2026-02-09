import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import { exiftool } from "exiftool-vendored";
import path from "path";
import fs from "fs";
import ffmpegStatic from "ffmpeg-static";

if (ffmpegStatic) ffmpeg.setFfmpegPath(ffmpegStatic);

export interface AssetMetadata {
    title?: string;
    description?: string;
    author?: string;
    copyright?: string;
    keywords?: string[];
}

export type WatermarkStyle = "corner" | "grid";

export interface WatermarkOptions {
    style?: WatermarkStyle;
    gridOpacity?: number; // 0.0 to 1.0 (default 0.4)
    text?: string; // Text for video grid watermark (default: metadata.copyright)
}

export class WatermarkService {
    // ✅ change this to your file (make sure it exists in server/public/)
    private static readonly WATERMARK_PATH = path.join(
        process.cwd(),
        "public",
        "waterMark.png"
    );

    private static readonly FONT_PATH = "C:/Windows/Fonts/arial.ttf";

    private static readonly WATERMARKED_DIR = path.join(
        process.cwd(),
        "public",
        "uploads",
        "watermarked"
    );
    private static readonly THUMBNAILS_DIR = path.join(
        process.cwd(),
        "public",
        "uploads",
        "thumbnails"
    );

    constructor() {
        this.ensureDirectories();
    }

    private ensureDirectories() {
        [WatermarkService.WATERMARKED_DIR, WatermarkService.THUMBNAILS_DIR].forEach(
            (dir) => {
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            }
        );
    }

    async processImage(
        inputPath: string,
        outputPath: string,
        metadata: AssetMetadata,
        options: WatermarkOptions = { style: "corner" }
    ): Promise<void> {
        try {
            const style = options.style || "corner";

            const image = sharp(inputPath);
            const imageMeta = await image.metadata();

            if (!imageMeta.width || !imageMeta.height) {
                throw new Error("Could not retrieve image dimensions");
            }

            // ✅ Corner watermark (middle-right)
            if (style === "corner") {
                const maxWatermarkWidth = Math.round(imageMeta.width * 0.25);
                const maxWatermarkHeight = Math.round(imageMeta.height * 0.25);

                const watermarkBuffer = await sharp(WatermarkService.WATERMARK_PATH)
                    .resize({
                        width: maxWatermarkWidth,
                        height: maxWatermarkHeight,
                        fit: "inside",
                    })
                    .toBuffer();

                await image
                    .composite([
                        {
                            input: watermarkBuffer,
                            gravity: "east",
                            blend: "over",
                        },
                    ])
                    .webp({ quality: 90 })
                    .toFile(outputPath);
            } else {
                // ✅ Grid watermark (tiled logos)
                const opacity = options.gridOpacity ?? 0.4;

                const cols = Math.min(8, Math.max(3, Math.floor(imageMeta.width / 200)));
                const rows = Math.min(8, Math.max(3, Math.floor(imageMeta.height / 200)));

                const cellWidth = Math.ceil(imageMeta.width / cols);
                const cellHeight = Math.ceil(imageMeta.height / rows);

                const logoSize = Math.round(Math.min(cellWidth, cellHeight) * 0.6);

                // Make watermark semi-transparent
                const wmBase = sharp(WatermarkService.WATERMARK_PATH).resize({
                    width: logoSize,
                    fit: "inside",
                });

                const wmPng = await wmBase.png().toBuffer();
                const wmMeta = await sharp(wmPng).metadata();
                const wmW = wmMeta.width || 0;
                const wmH = wmMeta.height || 0;

                // create alpha mask
                const alphaMask = await sharp({
                    create: {
                        width: wmW,
                        height: wmH,
                        channels: 4,
                        background: { r: 0, g: 0, b: 0, alpha: opacity },
                    },
                })
                    .png()
                    .toBuffer();

                const watermarkBuffer = await sharp(wmPng)
                    .composite([{ input: alphaMask, blend: "dest-in" }])
                    .png()
                    .toBuffer();

                const composites: sharp.OverlayOptions[] = [];
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const left = Math.round(c * cellWidth + (cellWidth - wmW) / 2);
                        const top = Math.round(r * cellHeight + (cellHeight - wmH) / 2);
                        composites.push({ input: watermarkBuffer, left, top, blend: "over" });
                    }
                }

                await image
                    .composite(composites)
                    .webp({ quality: 90 })
                    .toFile(outputPath);
            }

            // Thumbnail (300px)
            await sharp(inputPath).resize({ width: 300 }).webp({ quality: 80 }).toFile(
                path.join(WatermarkService.THUMBNAILS_DIR, path.basename(outputPath))
            );

            await this.embedMetadata(outputPath, metadata);
        } catch (error) {
            console.error("Error processing image:", error);
            throw error;
        }
    }

    async processVideo(
        inputPath: string,
        outputPath: string,
        metadata: AssetMetadata,
        options: WatermarkOptions = { style: "corner" }
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const style = options.style || "corner";
            const cmd = ffmpeg(inputPath);

            if (style === "corner") {
                cmd.input(WatermarkService.WATERMARK_PATH).complexFilter([
                    `[1:v][0:v]scale2ref=w=rw*0.25:h='ow/mdar'[wm][vid]`,
                    `[vid][wm]overlay=W-w:(H-h)/2`,
                ]);
            } else {
                const text = options.text || metadata.copyright || "Protected Content";
                const opacity = options.gridOpacity ?? 0.4;

                const safeText = text.replace(/:/g, "\\:").replace(/'/g, "");
                const fontPath = WatermarkService.FONT_PATH.replace(/\\/g, "/").replace(
                    /:/g,
                    "\\:"
                );

                const rows = 4;
                const cols = 4;
                const filters: string[] = [];
                let lastLabel = "0:v";

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const nextLabel =
                            r === rows - 1 && c === cols - 1 ? null : `v${r}_${c}`;

                        const xExpr = `(w/${cols})*${c}+(w/${cols}-text_w)/2`;
                        const yExpr = `(h/${rows})*${r}+(h/${rows}-text_h)/2`;

                        const content = `drawtext=fontfile='${fontPath}':text='${safeText}':fontsize=h/20:fontcolor=white@${opacity}:x=${xExpr}:y=${yExpr}`;

                        filters.push(
                            `[${lastLabel}]${content}${nextLabel ? `[${nextLabel}]` : ""}`
                        );
                        if (nextLabel) lastLabel = nextLabel;
                    }
                }

                cmd.complexFilter(filters.join(";"));
            }

            cmd.outputOptions([
                "-c:v libx264",
                "-preset medium",
                "-crf 23",
                "-movflags +faststart",
            ])
                .outputOptions(
                    "-metadata",
                    `title=${metadata.title || ""}`,
                    "-metadata",
                    `copyright=${metadata.copyright || ""}`,
                    "-metadata",
                    `artist=${metadata.author || ""}`,
                    "-metadata",
                    `comment=${metadata.description || ""}`
                )
                .save(outputPath)
                .on("end", async () => {
                    try {
                        await this.embedMetadata(outputPath, metadata);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                })
                .on("error", (err) => {
                    console.error("Error processing video:", err);
                    reject(err);
                });
        });
    }

    private async embedMetadata(filePath: string, metadata: AssetMetadata) {
        const tags: any = {};

        if (metadata.title) {
            tags["Title"] = metadata.title;
            tags["XMP-dc:Title"] = metadata.title;
        }
        if (metadata.description) {
            tags["Description"] = metadata.description;
            tags["XMP-dc:Description"] = metadata.description;
        }
        if (metadata.author) {
            tags["Artist"] = metadata.author;
            tags["XMP-dc:Creator"] = metadata.author;
        }
        if (metadata.copyright) {
            tags["Copyright"] = metadata.copyright;
            tags["XMP-dc:Rights"] = metadata.copyright;
        }
        if (metadata.keywords?.length) {
            tags["Keywords"] = metadata.keywords;
        }

        await exiftool.write(filePath, tags);
    }
}
