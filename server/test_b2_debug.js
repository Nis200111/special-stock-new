const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'test_result_debug.log');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testDebug() {
    fs.writeFileSync(logFile, '');
    log("🚀 Starting B2 Debug Test...");

    const s3 = new S3Client({
        endpoint: "https://s3.us-east-005.backblazeb2.com",
        region: "us-east-005",
        forcePathStyle: true,
        credentials: {
            accessKeyId: "005c0c8e6f3433f0000000001",
            secretAccessKey: "K005mLWcjwjBWe+o0ICX/CcOEbhZKgM",
        },
    });

    s3.middlewareStack.add(
        (next, context) => async (args) => {
            log("Middleware: Requesting...");
            const result = await next(args);
            return result;
        },
        {
            step: "build",
        }
    );

    // Add a middleware to log the HTTP request
    s3.middlewareStack.add(
        (next, context) => async (args) => {
            const request = args.request;
            if (request.headers) {
                log(`URL: ${request.protocol}//${request.hostname}${request.path}`);
                log(`Headers: ${JSON.stringify(request.headers, null, 2)}`);
            }
            return next(args);
        },
        {
            step: "finalizeRequest",
        }
    );

    try {
        log("📂 Listing Buckets...");
        const data = await s3.send(new ListBucketsCommand({}));
        log("✅ Success!");
    } catch (error) {
        log(`❌ Failed: ${error.message}`);
    }
}

testDebug();
