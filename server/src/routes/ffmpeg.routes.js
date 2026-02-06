const express = require('express');
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/ffmpeg.controller');

const router = express.Router();

// Configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), 'uploads');
        // Ensure uploads directory exists (usually does)
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'temp-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

module.exports = function (app) {
    app.post(
        '/api/ffmpeg/watermark',
        upload.single('image'),
        controller.processImage
    );
};
