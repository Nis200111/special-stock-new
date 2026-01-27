/**
 * Image Processing Service
 * Handles thumbnail generation and watermarking using Sharp
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * Process uploaded image: create thumbnail and watermark
 * @param {string} imagePath - Path to the original uploaded image
 * @param {string} outputDir - Directory to save processed images
 * @param {string} filename - Base filename (without extension)
 * @returns {Promise<Object>} - Paths to thumbnail and watermarked images
 */
async function processImage(imagePath, outputDir, filename) {
    try {
        // Ensure output directories exist
        const thumbnailDir = path.join(outputDir, 'thumbnails');
        const watermarkDir = path.join(outputDir, 'watermarked');

        await fs.mkdir(thumbnailDir, { recursive: true });
        await fs.mkdir(watermarkDir, { recursive: true });

        const ext = path.extname(filename);
        const baseName = path.basename(filename, ext);

        // Generate thumbnail (300x300) - Small preview
        const thumbnailPath = path.join(thumbnailDir, `thumb_${baseName}.jpg`);
        await sharp(imagePath)
            .resize(300, 300, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);

        // Generate watermarked version
        const watermarkedPath = path.join(watermarkDir, `watermarked_${baseName}${ext}`);

        // Get image metadata
        const metadata = await sharp(imagePath).metadata();

        // Create watermark text overlay
        const watermarkText = 'Special Stocks';
        const watermarkSize = Math.floor(metadata.width / 15);

        // Create SVG watermark
        const svgWatermark = Buffer.from(`
            <svg width="${metadata.width}" height="${metadata.height}">
                <style>
                    .watermark { 
                        fill: rgba(255, 255, 255, 0.3);
                        font-size: ${watermarkSize}px;
                        font-family: Arial, sans-serif;
                        font-weight: bold;
                    }
                </style>
                <text x="50%" y="50%" 
                      text-anchor="middle" 
                      dominant-baseline="middle"
                      class="watermark"
                      transform="rotate(-45 ${metadata.width / 2} ${metadata.height / 2})">
                    ${watermarkText}
                </text>
            </svg>
        `);

        // Apply watermark
        await sharp(imagePath)
            .composite([
                {
                    input: svgWatermark,
                    top: 0,
                    left: 0
                }
            ])
            .toFile(watermarkedPath);

        console.log('✅ Image processing completed:', {
            thumbnail: thumbnailPath,
            watermarked: watermarkedPath
        });

        return {
            thumbnailPath: `/uploads/thumbnails/thumb_${baseName}.jpg`,
            watermarkedPath: `/uploads/watermarked/watermarked_${baseName}${ext}`,
            success: true
        };

    } catch (error) {
        console.error('❌ Image processing error:', error);
        throw new Error(`Image processing failed: ${error.message}`);
    }
}

/**
 * Create a simple thumbnail from an image
 * @param {string} imagePath - Path to the image
 * @param {number} width - Thumbnail width
 * @param {number} height - Thumbnail height
 * @returns {Promise<Buffer>} - Thumbnail buffer
 */
async function createThumbnail(imagePath, width = 300, height = 300) {
    try {
        return await sharp(imagePath)
            .resize(width, height, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80 })
            .toBuffer();
    } catch (error) {
        console.error('❌ Thumbnail creation error:', error);
        throw new Error(`Thumbnail creation failed: ${error.message}`);
    }
}

/**
 * Add watermark to an image
 * @param {string} imagePath - Path to the image
 * @param {string} watermarkText - Text to use as watermark
 * @returns {Promise<Buffer>} - Watermarked image buffer
 */
async function addWatermark(imagePath, watermarkText = 'Special Stocks') {
    try {
        const metadata = await sharp(imagePath).metadata();
        const watermarkSize = Math.floor(metadata.width / 15);

        const svgWatermark = Buffer.from(`
            <svg width="${metadata.width}" height="${metadata.height}">
                <style>
                    .watermark { 
                        fill: rgba(255, 255, 255, 0.3);
                        font-size: ${watermarkSize}px;
                        font-family: Arial, sans-serif;
                        font-weight: bold;
                    }
                </style>
                <text x="50%" y="50%" 
                      text-anchor="middle" 
                      dominant-baseline="middle"
                      class="watermark"
                      transform="rotate(-45 ${metadata.width / 2} ${metadata.height / 2})">
                    ${watermarkText}
                </text>
            </svg>
        `);

        return await sharp(imagePath)
            .composite([
                {
                    input: svgWatermark,
                    top: 0,
                    left: 0
                }
            ])
            .toBuffer();

    } catch (error) {
        console.error('❌ Watermark error:', error);
        throw new Error(`Watermarking failed: ${error.message}`);
    }
}

/**
 * Get image metadata
 * @param {string} imagePath - Path to the image
 * @returns {Promise<Object>} - Image metadata
 */
async function getImageMetadata(imagePath) {
    try {
        return await sharp(imagePath).metadata();
    } catch (error) {
        console.error('❌ Metadata error:', error);
        throw new Error(`Failed to get image metadata: ${error.message}`);
    }
}

module.exports = {
    processImage,
    createThumbnail,
    addWatermark,
    getImageMetadata
};
