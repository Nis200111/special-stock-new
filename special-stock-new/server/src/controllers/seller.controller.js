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

        const { title, description, category, tags, price, sellerId, contentType } = req.body;

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
            contentType: contentType || 'image',
            status: 'pending',
            processingStatus: (contentType === 'video') ? 'completed' : 'processing'
        });

        // Process all content types (image and video)
        if (true) {
            // Process media in background (thumbnail + watermark)
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
            }
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
            where: {
                sellerId: parseInt(sellerId),
                status: { [db.Sequelize.Op.ne]: 'deleted' }
            },
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
            where: {
                sellerId: parseInt(sellerId),
                status: { [db.Sequelize.Op.ne]: 'deleted' }
            },
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'totalUploads'],
                [db.sequelize.fn('SUM', db.sequelize.col('views')), 'totalViews'],
                [db.sequelize.fn('SUM', db.sequelize.col('downloads')), 'totalDownloads'],
            ],
            raw: true
        });

        const statusCounts = await SellerImage.findAll({
            where: {
                sellerId: parseInt(sellerId),
                status: { [db.Sequelize.Op.ne]: 'deleted' }
            },
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
 * Delete seller image (Soft Delete)
 * DELETE /api/seller/image/:imageId
 */
exports.deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const { sellerId, role } = req.body;

        console.log("Delete Request Params:", { imageId, sellerId, role });

        const image = await SellerImage.findByPk(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        // Administrative roles that can delete any image
        const adminRoles = ['admin', 'super_admin', 'manager'];
        const isAdmin = role && adminRoles.includes(role.toLowerCase().trim());

        console.log("Authorization Check:", { isAdmin, imageSellerId: image.sellerId, requestSellerId: sellerId, role });

        // Authorization: Check if seller matches or if user is an administrator
        if (isAdmin) {
            console.log("Admin access granted for deletion");
        } else if (image.sellerId === parseInt(sellerId)) {
            console.log("Owner access granted for deletion");
        } else {
            console.error("Authorization failed for deletion");
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this image. Only the owner or an administrator can perform this action.'
            });
        }

        // Perform Soft Delete
        console.log(`Starting update for image ID: ${image.id} to status: deleted`);
        await image.update({ status: 'deleted' });
        console.log(`Update successful for image ID: ${image.id}`);

        res.json({
            success: true,
            message: 'Image removed successfully'
        });

    } catch (error) {
        // Detailed error logging for terminal debugging
        console.error('❌ DATABASE_UPDATE_ERROR:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            imageId: req.params.imageId,
            body: req.body
        });

        res.status(500).json({
            success: false,
            message: 'Failed to remove image',
            error: error.message,
            detail: 'Check server logs for DATABASE_UPDATE_ERROR'
        });
    }
};

module.exports = exports;
