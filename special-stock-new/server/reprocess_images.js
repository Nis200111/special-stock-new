const db = require('./src/models');
const imageProcessingService = require('./src/services/imageProcessing.service');
const path = require('path');
const fs = require('fs');

async function reprocessAllImages() {
    try {
        console.log("🔄 Starting batch reprocessing of all images...");

        // 1. Fetch all images (excluding videos)
        const images = await db.sellerImage.findAll({
            where: {
                contentType: 'image'
            }
        });

        console.log(`Found ${images.length} images to reprocess.`);

        for (const image of images) {
            const originalPath = path.join(__dirname, image.filepath);

            // Check if original file exists
            if (!fs.existsSync(originalPath)) {
                console.error(`⚠️ Original file missing for ID ${image.id}: ${originalPath}`);
                continue;
            }

            console.log(`Processing ID ${image.id}: ${image.title}...`);

            try {
                // Determine upload directory based on original path
                const uploadDir = path.dirname(originalPath);
                const filename = path.basename(originalPath);

                // Run the NEW processing logic (this overwrites the old watermarked file)
                const result = await imageProcessingService.processImage(
                    originalPath,
                    uploadDir,
                    filename
                );

                // Update DB (just in case paths changed, though they shouldn't)
                await image.update({
                    thumbnailPath: result.thumbnailPath,
                    watermarkedFilepath: result.watermarkedPath,
                    processingStatus: 'completed'
                });

                console.log(`✅ Successfully reprocessed ID ${image.id}`);

            } catch (err) {
                console.error(`❌ Failed to reprocess ID ${image.id}:`, err.message);
            }
        }

        console.log("\n🎉 All images have been reprocessed with the NEW watermark style.");

    } catch (error) {
        console.error("Fatal error:", error);
    } finally {
        process.exit();
    }
}

reprocessAllImages();
