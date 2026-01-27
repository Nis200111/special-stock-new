/**
 * Seller Controller
 * Handles seller operations including image uploads and management
 */

const db = require('../models');
const imageProcessingService = require('../services/imageProcessing.service');
const path = require('path');
const fs = require('fs').promises;

const SellerImage = db.sellerImage;

/**
 * Upload and process seller image
 * POST /api/seller/upload-image
 */
exports.uploadImage = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const { title, description, category, tags, price, sellerId } = req.body;

        // Validate required fields
        if (!title || !price || !sellerId) {
            return res.status(400).json({
                success: false,
                message: 'Title, price, and seller ID are required'
            });
        }

        // Get uploaded file info
        const uploadedFile = req.file;
        const originalFilepath = uploadedFile.path;
        const filename = uploadedFile.filename;

        console.log('📤 Processing image upload:', {
            filename,
            size: uploadedFile.size,
            seller: sellerId
        });

        // Create database entry with 'pending' status
        const imageRecord = await SellerImage.create({
            sellerId: parseInt(sellerId),
            title,
            description: description || '',
            category: category || 'photography',
            tags: tags || '',
            price: parseFloat(price),
            filename,
            filepath: `/uploads/${filename}`,
            originalName: uploadedFile.originalname,
            fileSize: uploadedFile.size,
            status: 'pending',
            processingStatus: 'processing'
        });

        // Process image in background (thumbnail + watermark)
        try {
            const uploadDir = path.dirname(originalFilepath);
            const processResult = await imageProcessingService.processImage(
                originalFilepath,
                uploadDir,
                filename
            );

            // Update record with processed image paths
            await imageRecord.update({
                thumbnailPath: processResult.thumbnailPath,
                watermarkedFilepath: processResult.watermarkedPath,
                processingStatus: 'completed'
            });

            console.log('✅ Image processing completed for:', title);

        } catch (processingError) {
            console.error('❌ Image processing failed:', processingError);

            // Update status to failed but keep the original image
            await imageRecord.update({
                processingStatus: 'failed'
            });

            // Don't fail the upload - image is still pending admin approval
        }

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully and pending admin approval',
            data: {
                id: imageRecord.id,
                title: imageRecord.title,
                status: imageRecord.status,
                processingStatus: imageRecord.processingStatus,
                filepath: imageRecord.filepath,
                thumbnailPath: imageRecord.thumbnailPath
            }
        });

    } catch (error) {
        console.error('❌ Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message
        });
    }
};

/**
 * Get all images for a specific seller
 * GET /api/seller/my-images/:sellerId
 */
exports.getMyImages = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const images = await SellerImage.findAll({
            where: { sellerId: parseInt(sellerId) },
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            count: images.length,
            data: images
        });

    } catch (error) {
        console.error('❌ Error fetching seller images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images',
            error: error.message
        });
    }
};

/**
 * Get seller statistics
 * GET /api/seller/stats/:sellerId
 */
exports.getSellerStats = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const stats = await SellerImage.findAll({
            where: { sellerId: parseInt(sellerId) },
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'totalUploads'],
                [db.sequelize.fn('SUM', db.sequelize.col('views')), 'totalViews'],
                [db.sequelize.fn('SUM', db.sequelize.col('downloads')), 'totalDownloads'],
            ],
            raw: true
        });

        const statusCounts = await SellerImage.findAll({
            where: { sellerId: parseInt(sellerId) },
            attributes: [
                'status',
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const statusMap = statusCounts.reduce((acc, item) => {
            acc[item.status] = parseInt(item.count);
            return acc;
        }, {});

        res.json({
            success: true,
            data: {
                totalUploads: parseInt(stats[0]?.totalUploads || 0),
                totalViews: parseInt(stats[0]?.totalViews || 0),
                totalDownloads: parseInt(stats[0]?.totalDownloads || 0),
                pending: statusMap.pending || 0,
                approved: statusMap.approved || 0,
                rejected: statusMap.rejected || 0
            }
        });

    } catch (error) {
        console.error('❌ Error fetching seller stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
};

/**
 * Delete seller image
 * DELETE /api/seller/image/:imageId
 */
exports.deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const { sellerId } = req.body;

        const image = await SellerImage.findOne({
            where: {
                id: parseInt(imageId),
                sellerId: parseInt(sellerId)
            }
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found or unauthorized'
            });
        }

        // Delete physical files
        const uploadsDir = path.join(__dirname, '../../uploads');

        try {
            if (image.filepath) {
                const fullPath = path.join(uploadsDir, path.basename(image.filepath));
                await fs.unlink(fullPath).catch(() => { });
            }
            if (image.thumbnailPath) {
                const thumbPath = path.join(uploadsDir, 'thumbnails', path.basename(image.thumbnailPath));
                await fs.unlink(thumbPath).catch(() => { });
            }
            if (image.watermarkedFilepath) {
                const watermarkPath = path.join(uploadsDir, 'watermarked', path.basename(image.watermarkedFilepath));
                await fs.unlink(watermarkPath).catch(() => { });
            }
        } catch (fileError) {
            console.warn('⚠️ Error deleting physical files:', fileError.message);
        }

        // Delete database record
        await image.destroy();

        res.json({
            success: true,
            message: 'Image deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete image',
            error: error.message
        });
    }
};

module.exports = exports;
