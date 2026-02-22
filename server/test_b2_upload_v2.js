require('dotenv').config();
const b2Service = require('./src/services/b2.service');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    console.log("🚀 Starting B2 Upload Test...");

    // Create a dummy file
    const testFileName = `test-b2-${Date.now()}.txt`;
    const testFilePath = path.join(__dirname, testFileName);
    fs.writeFileSync(testFilePath, "This is a test file for Backblaze B2 integration.");
    console.log(`📝 Created dummy file: ${testFilePath}`);

    try {
        console.log("📤 Uploading to B2...");
        const url = await b2Service.uploadFileFromPath(testFilePath, 'tests');
        console.log("✅ Upload Successful!");
        console.log("🔗 File URL:", url);

        // Cleanup
        fs.unlinkSync(testFilePath);
        console.log("🧹 Cleaned up local dummy file.");

    } catch (error) {
        console.error("❌ Upload Failed:", error);
    }
}

testUpload();
