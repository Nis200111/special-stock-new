const ffmpegService = require('./src/services/ffmpeg.service');
const path = require('path');
const fs = require('fs');

async function test() {
    console.log('--- Starting Watermark Test ---');

    // 1. Create a dummy image
    const inputPath = path.join(__dirname, 'waterMarked2.png');
    const outputPath = path.join(__dirname, 'test_output.webp');
    const watermarkPath = path.join(__dirname, 'public', 'waterMark2.png');

    console.log('Input:', inputPath);
    console.log('Output:', outputPath);
    console.log('Watermark:', watermarkPath);

    // Create a simple red square if input doesn't exist, using ffmpeg to generate it is complex, 
    // so we assume user has uploaded something or we use a known file.
    // Let's actually assume we can pick one from uploads if it exists.

    // Fallback: Copy watermark to input just to have a valid image file
    if (!fs.existsSync(inputPath)) {
        console.log('Creating dummy input...');
        fs.copyFileSync(watermarkPath, inputPath);
    }

    try {
        console.log('Calling watermarkImage...');
        await ffmpegService.watermarkImage(inputPath, outputPath, watermarkPath);
        console.log('✅ Success! Output created at:', outputPath);

        const stats = fs.statSync(outputPath);
        console.log('Output Size:', stats.size);
    } catch (err) {
        console.error('❌ Failed:', err);
    }
}

test();
