const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// කෙලින්ම මෙතනම Client එක හදපං, එතකොට credentials ෂුවර් එකටම වැඩ
const s3 = new S3Client({
    endpoint: `https://${process.env.B2_ENDPOINT}`,
    region: "us-east-005",
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID?.trim(),
        secretAccessKey: process.env.B2_APP_KEY?.trim(),
    },
});

/**
 * Uploads local file to Backblaze.
 * Using Buffer to fix the 'IncompleteBody' error once and for all.
 */
const uploadFileFromPath = async (localPath, destinationFolder = 'uploads') => {
    try {
        if (!fs.existsSync(localPath)) return null;

        const fileBuffer = fs.readFileSync(localPath);
        const stats = fs.statSync(localPath);
        const fileName = path.basename(localPath);
        const key = `${destinationFolder}/${Date.now()}-${fileName}`;

        console.log(`🚀 B2 Uploading: ${key} (${stats.size} bytes)`);

        const params = {
            Bucket: process.env.B2_BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
            ContentLength: stats.size,
            ContentType: 'image/jpeg'
        };

        await s3.send(new PutObjectCommand(params));

        const url = `https://${process.env.B2_BUCKET_NAME}.${process.env.B2_ENDPOINT}/${key}`;
        console.log(`✅ B2 Success: ${url}`);
        return url;

    } catch (error) {
        console.error("❌ B2 Service Error:", error);
        throw error;
    }
};

module.exports = { uploadFileFromPath };