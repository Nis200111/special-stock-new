require('dotenv').config();
const b2Service = require('./src/services/b2.service');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'test_result_v3.log');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testUpload() {
    // Clear previous log
    fs.writeFileSync(logFile, '');

    log("🚀 Starting B2 Upload Test V3...");

    // Create a dummy file
    const testFileName = `test-b2-${Date.now()}.txt`;
    const testFilePath = path.join(__dirname, testFileName);
    fs.writeFileSync(testFilePath, "This is a test file for Backblaze B2 integration (V3).");
    log(`📝 Created dummy file: ${testFilePath}`);

    try {
        log("📤 Uploading to B2...");
        const url = await b2Service.uploadFileFromPath(testFilePath, 'tests');
        log("✅ Upload Successful!");
        log(`🔗 File URL: ${url}`);

        // Cleanup
        fs.unlinkSync(testFilePath);
        log("🧹 Cleaned up local dummy file.");

    } catch (error) {
        log(`❌ Upload Failed: ${error.message}`);
        console.error(error);
    }
}

testUpload();
