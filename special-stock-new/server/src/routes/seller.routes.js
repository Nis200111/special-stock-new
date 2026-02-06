/**
 * Seller Routes
 * Routes for seller operations
 */

const multer = require('multer');
const path = require('path');
const controller = require('../controllers/seller.controller');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    // Upload image with automatic processing
    app.post(
        "/api/seller/upload-image",
        (req, res, next) => {
            upload.single('media')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
                } else if (err) {
                    return res.status(500).json({ success: false, message: `Unknown upload error: ${err.message}` });
                }
                next();
            });
        },
        controller.uploadImage
    );

    // Get seller's images
    app.get(
        "/api/seller/my-images/:sellerId",
        controller.getMyImages
    );

    // Get seller statistics
    app.get(
        "/api/seller/stats/:sellerId",
        controller.getSellerStats
    );

    // Delete image
    app.delete(
        "/api/seller/image/:imageId",
        controller.deleteImage
    );
};
