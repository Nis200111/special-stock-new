const { S3Client, HeadBucketCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'test_result_bucket.log');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testBucket() {
    fs.writeFileSync(logFile, '');
    log("🚀 Starting B2 Bucket Test...");

    const s3 = new S3Client({
        endpoint: "https://s3.us-east-005.backblazeb2.com",
        region: "us-east-005",
        credentials: {
            accessKeyId: "005c0c8e6f3433f0000000001",
            secretAccessKey: "K005mLWcjwjBWe+o0ICX/CcOEbhZKgM",
        },
    });

    const bucketName = "special-stock";

    try {
        log(`🔍 HeadBucket: ${bucketName}...`);
        await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
        log("✅ HeadBucket Success! Bucket exists and is accessible.");
    } catch (error) {
        log(`❌ HeadBucket Failed: ${error.message}`);
    }

    try {
        log(`📂 ListObjects: ${bucketName}...`);
        const data = await s3.send(new ListObjectsV2Command({ Bucket: bucketName }));
        log("✅ ListObjects Success!");
        if (data.Contents) {
            data.Contents.forEach(o => log(` - ${o.Key}`));
        } else {
            log("   (Bucket is empty)");
        }
    } catch (error) {
        log(`❌ ListObjects Failed: ${error.message}`);
    }
}

testBucket();
