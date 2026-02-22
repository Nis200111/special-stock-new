const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'test_result_list.log');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testList() {
    // Clear log
    fs.writeFileSync(logFile, '');
    log("🚀 Starting B2 List Buckets Test...");

    const s3 = new S3Client({
        endpoint: "https://s3.us-east-005.backblazeb2.com",
        region: "us-east-005",
        forcePathStyle: true,
        credentials: {
            accessKeyId: "005c0c8e6f3433f0000000001",
            secretAccessKey: "K005mLWcjwjBWe+o0ICX/CcOEbhZKgM",
        },
    });

    try {
        log("📂 Listing Buckets...");
        const data = await s3.send(new ListBucketsCommand({}));
        log("✅ Success! Buckets:");
        data.Buckets.forEach(b => log(` - ${b.Name}`));
    } catch (error) {
        log(`❌ List Failed: ${error.message}`);
        console.error(error);
    }
}

testList();
