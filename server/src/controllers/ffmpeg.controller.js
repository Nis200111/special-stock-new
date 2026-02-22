const ffmpegService = require('../services/ffmpeg.service');
const path = require('path');
const fs = require('fs');
const b2Service = require('../services/b2.service');

exports.processImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const inputPath = req.file.path;
        const filename = path.parse(req.file.filename).name; // Filename without extension
        const outputDir = path.join(process.cwd(), 'uploads', 'watermarked');
        const outputPath = path.join(outputDir, `${filename}_watermarked.webp`);
        const watermarkPath = path.join(process.cwd(), 'public', 'watermark.png');

        // Ensure output directory exists (service handles file writing but directory creation is good practice)
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Ensure watermark file exists
        if (!fs.existsSync(watermarkPath)) {
            console.warn('Watermark file missing at', watermarkPath);
        }

        console.log('Processing watermark for:', inputPath);
        await ffmpegService.watermarkImage(inputPath, outputPath, watermarkPath);

        // Try Uploading to B2
        try {
            console.log('Uploading watermarked image to B2...');
            const b2Url = await b2Service.uploadFileFromPath(outputPath, 'watermarked');
            console.log('B2 Upload successful:', b2Url);

            // Cleanup local files only on success
            try {
                await fs.promises.unlink(inputPath);
                await fs.promises.unlink(outputPath);
                console.log('Local temporary files cleaned up');
            } catch (err) {
                console.warn('Failed to cleanup temp files:', err);
            }

            return res.json({
                success: true,
                message: 'Image processed successfully with Grid Watermark',
                path: b2Url
            });

        } catch (b2Error) {
            console.error('⚠️ B2 Upload failed, returning local path:', b2Error.message);

            // Return local path so the frontend still works
            return res.json({
                success: true,
                message: 'Image processed locally (B2 Upload Failed)',
                path: `/uploads/watermarked/${filename}_watermarked.webp`
            });
        }

    } catch (error) {
        console.error('Controller Error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
