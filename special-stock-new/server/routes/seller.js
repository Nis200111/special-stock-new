/**
 * Seller API Routes
 * Handles seller verification and activation
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const db = require('../src/models');
const Customer = db.customer;
const SellerImage = db.sellerImage;

// Create uploads and watermarked directories
const uploadsDir = path.join(__dirname, '../uploads');
const watermarkedDir = path.join(__dirname, '../uploads/watermarked');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(watermarkedDir)) {
    fs.mkdirSync(watermarkedDir, { recursive: true });
}

// Function to add watermark to image
async function addWatermark(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Create watermark text SVG
        const watermarkText = 'SPECIAL STOCKS';
        const fontSize = Math.min(metadata.width, metadata.height) / 15;

        const watermarkSvg = Buffer.from(`
            <svg width="${metadata.width}" height="${metadata.height}">
                <defs>
                    <pattern id="watermark" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
                        <text 
                            x="200" 
                            y="200" 
                            font-family="Arial, sans-serif" 
                            font-size="${fontSize}" 
                            font-weight="bold"
                            fill="rgba(255, 255, 255, 0.3)" 
                            text-anchor="middle"
                            transform="rotate(-45 200 200)"
                        >${watermarkText}</text>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#watermark)"/>
            </svg>
        `);

        await image
            .composite([{
                input: watermarkSvg,
                blend: 'over'
            }])
            .toFile(outputPath);

        return true;
    } catch (error) {
        console.error('Error adding watermark:', error);
        return false;
    }
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|webp|gif|mp4|mov|quicktime/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = /image|video/.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'));
        }
    }
});

// Middleware to verify authentication
const verifyAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

/**
 * @route   POST /api/seller/verify-and-activate
 * @desc    Verify if user has seller role and activate seller dashboard access
 * @access  Private (Authenticated users only)
 */
router.post('/verify-and-activate', verifyAuth, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find user in database
        const user = await Customer.findOne({
            where: { email: email.toLowerCase() },
            attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user has seller role
        if (user.role !== 'seller') {
            return res.status(403).json({
                success: false,
                message: 'You do not have seller privileges. Please contact an administrator to become a seller.'
            });
        }

        // User is already a seller, allow activation
        res.status(200).json({
            success: true,
            message: 'Seller account verified successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error verifying seller:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   GET /api/seller/profile
 * @desc    Get seller profile information
 * @access  Private (Seller only)
 */
router.get('/profile', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        const seller = await Customer.findOne({
            where: { id: userId, role: 'seller' },
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'createdAt']
        });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller profile not found'
            });
        }

        res.status(200).json({
            success: true,
            seller: seller
        });

    } catch (error) {
        console.error('Error fetching seller profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   GET /api/seller/check-role
 * @desc    Quick check if user is a seller
 * @access  Private (Authenticated users)
 */
router.get('/check-role', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Customer.findOne({
            where: { id: userId },
            attributes: ['id', 'role']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            isSeller: user.role === 'seller',
            role: user.role
        });

    } catch (error) {
        console.error('Error checking role:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   POST /api/seller/upload-image
 * @desc    Upload a new image
 * @access  Private (Seller only)
 */
router.post('/upload-image', verifyAuth, (req, res) => {
    upload.single('media')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            console.error('Unknown upload error:', err);
            return res.status(500).json({
                success: false,
                message: `Upload failed: ${err.message}`
            });
        }

        try {
            const { title, description, category, tags, price, sellerId, contentType } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please select a file to upload'
                });
            }

            if (!title || !price) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and price are required'
                });
            }

            // Create necessary directories
            const thumbnailsDir = path.join(__dirname, '../uploads/thumbnails');
            if (!fs.existsSync(thumbnailsDir)) {
                fs.mkdirSync(thumbnailsDir, { recursive: true });
            }

            // Create watermarked version
            const watermarkedFilename = 'watermarked-' + req.file.filename;
            const watermarkedPath = path.join(watermarkedDir, watermarkedFilename);
            const originalPath = path.join(uploadsDir, req.file.filename);

            // Create thumbnail version (300x300)
            const thumbnailFilename = 'thumb-' + req.file.filename;
            const thumbnailPath = path.join(thumbnailsDir, thumbnailFilename);

            let watermarkSuccess = false;
            let thumbnailSuccess = false;

            // Only process images
            if (contentType !== 'video') {
                try {
                    // Generate watermark
                    watermarkSuccess = await addWatermark(originalPath, watermarkedPath);

                    // Generate thumbnail
                    await sharp(originalPath)
                        .resize(300, 300, {
                            fit: 'cover',
                            position: 'center'
                        })
                        .jpeg({ quality: 80 })
                        .toFile(thumbnailPath);
                    thumbnailSuccess = true;
                } catch (processingError) {
                    console.error('Error processing image:', processingError);
                }
            } else {
                // For video, we treat processing as "successful" or unnecessary for now
                // Future: Generate video thumbnail
                watermarkSuccess = true;
                thumbnailSuccess = true;
            }

            // Save to database with new approval workflow fields
            const newImage = await SellerImage.create({
                sellerId: sellerId || req.user.id,
                title,
                description: description || '',
                category: category || 'photography',
                tags: tags || '',
                price: parseFloat(price),
                filename: req.file.filename,
                filepath: `/uploads/${req.file.filename}`,
                watermarkedFilepath: (contentType !== 'video' && watermarkSuccess) ? `/uploads/watermarked/${watermarkedFilename}` : null,
                thumbnailPath: (contentType !== 'video' && thumbnailSuccess) ? `/uploads/thumbnails/${thumbnailFilename}` : null,
                originalName: req.file.originalname,
                fileSize: req.file.size,
                contentType: contentType || 'image',
                status: 'pending',
                processingStatus: ((contentType === 'video') || (watermarkSuccess && thumbnailSuccess)) ? 'completed' : 'failed'
            });

            res.status(200).json({
                success: true,
                message: 'Image uploaded successfully',
                image: newImage
            });

        } catch (error) {
            console.error('Error uploading image:', error);
            console.error('Error stack:', error.stack);

            // If file was uploaded but processing failed, try to clean up
            if (req.file && req.file.filename) {
                const uploadedFile = path.join(uploadsDir, req.file.filename);
                if (fs.existsSync(uploadedFile)) {
                    try {
                        fs.unlinkSync(uploadedFile);
                    } catch (cleanupError) {
                        console.error('Failed to cleanup file:', cleanupError);
                    }
                }
            }

            return res.status(500).json({
                success: false,
                message: error.message || 'Server error. Please try again later.'
            });
        }
    }); // End of upload callback
});

// Multer error handling middleware
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        console.error('Multer error:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    } else if (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'File upload failed'
        });
    }
    next();
});

/**
 * @route   GET /api/seller/my-uploads
 * @desc    Get all uploads by seller
 * @access  Private (Seller only)
 */
router.get('/my-uploads', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch uploads from database
        const uploads = await SellerImage.findAll({
            where: { sellerId: userId },
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            uploads: uploads
        });

    } catch (error) {
        console.error('Error fetching uploads:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   GET /api/seller/download/:filename
 * @desc    Download an image
 * @access  Public (for demo)
 */
router.get('/download/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filepath = path.join(uploadsDir, filename);

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Send file
        res.download(filepath, filename, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({
                    success: false,
                    message: 'Error downloading file'
                });
            }
        });

    } catch (error) {
        console.error('Error in download:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

module.exports = router;
