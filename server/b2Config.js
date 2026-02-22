const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();

// Ensure B2 Endpoint is correct (remove https:// if present in env to avoid double protocol)
const endpoint = process.env.B2_ENDPOINT?.replace('https://', '') || 's3.us-east-005.backblazeb2.com';

const s3 = new S3Client({
    endpoint: `https://${endpoint}`,
    region: "us-east-005",
    forcePathStyle: true, // Required for Backblaze B2
    credentials: {
        accessKeyId: process.env.B2_KEY_ID?.trim(),
        secretAccessKey: process.env.B2_APP_KEY?.trim(),
    },
    // Disable checksums to prevent "IncompleteBody" or "InvalidSignature" on some S3-compat services
    requestChecksumCalculation: "when_required",
    responseChecksumValidation: "when_required"
});

module.exports = s3;