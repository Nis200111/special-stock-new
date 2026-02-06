const ffmpegService = require('../services/ffmpeg.service');
const path = require('path');
const fs = require('fs');

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

        await ffmpegService.watermarkImage(inputPath, outputPath, watermarkPath);

        return res.json({
            success: true,
            message: 'Image processed successfully with Grid Watermark',
            path: `/uploads/watermarked/${filename}_watermarked.webp`
        });

    } catch (error) {
        console.error('Controller Error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
