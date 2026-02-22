require('dotenv').config(); // Load environment variables at the very beginning
const app = require('./src/app');
const db = require('./src/models');

// Backblaze Configuration and Image Upload Setup
const s3 = require("./b2Config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");

// Configure multer to store files in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 5000;

// Route to handle image uploads to Backblaze B2
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        // Generate a unique filename using the current timestamp
        const fileName = `${Date.now()}-${file.originalname}`;

        const params = {
            Bucket: process.env.B2_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        // Send the file to Backblaze B2 bucket
        await s3.send(new PutObjectCommand(params));

        // Construct the public URL for the uploaded image
        const imageUrl = `https://${process.env.B2_BUCKET_NAME}.${process.env.B2_ENDPOINT}/${fileName}`;

        res.json({
            success: true,
            message: "Uploaded successfully!",
            url: imageUrl
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Sync database and start server
db.sequelize.sync().then(async () => {
    console.log('Database synced successfully.');
    await require('./src/seeders')();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch((err) => {
    console.error('Failed to sync database:', err);
});