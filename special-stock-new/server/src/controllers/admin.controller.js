/**
 * Admin Controller
 * Handles admin operations including image approval/rejection
 */

const db = require('../models');
const bcrypt = require("bcryptjs");
const SellerImage = db.sellerImage;
const Customer = db.customer;
const { Op } = require('sequelize');

/**
 * Get all pending images for admin review
 * GET /api/admin/pending-images
 */
exports.getPendingImages = async (req, res) => {
    try {
        const { page = 1, limit = 20, category } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { status: 'pending' };

        if (category && category !== 'all') {
            whereClause.category = category;
        }

        const { count, rows: images } = await SellerImage.findAndCountAll({
            where: whereClause,
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: {
                images,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            }
        });

    } catch (error) {
        console.error('❌ Error fetching pending images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending images',
            error: error.message
        });
    }
};

/**
 * Get all images with filters (for admin dashboard)
 * GET /api/admin/all-images
 */
exports.getAllImages = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, category, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (status && status !== 'all') {
            whereClause.status = status;
        }

        if (category && category !== 'all') {
            whereClause.category = category;
        }

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { tags: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows: images } = await SellerImage.findAndCountAll({
            where: whereClause,
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: {
                images,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            }
        });

    } catch (error) {
        console.error('❌ Error fetching images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images',
            error: error.message
        });
    }
};

/**
 * Approve an image
 * PUT /api/admin/approve-image/:imageId
 */
exports.approveImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const image = await SellerImage.findByPk(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        if (image.status === 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Image is already approved'
            });
        }

        // Update status to approved and ensure processing is marked completed
        await image.update({
            status: 'approved',
            processingStatus: 'completed',
            rejectionReason: null
        });

        console.log(`✅ Image approved: ${image.title} (ID: ${imageId})`);

        res.json({
            success: true,
            message: 'Image approved successfully',
            data: image
        });

    } catch (error) {
        console.error('❌ Error approving image:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve image',
            error: error.message
        });
    }
};

/**
 * Reject an image
 * PUT /api/admin/reject-image/:imageId
 */
exports.rejectImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const { reason } = req.body;

        const image = await SellerImage.findByPk(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        if (image.status === 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Image is already rejected'
            });
        }

        // Update status to rejected
        await image.update({
            status: 'rejected',
            rejectionReason: reason || 'Does not meet quality standards'
        });

        console.log(`❌ Image rejected: ${image.title} (ID: ${imageId})`);

        res.json({
            success: true,
            message: 'Image rejected successfully',
            data: image
        });

    } catch (error) {
        console.error('❌ Error rejecting image:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject image',
            error: error.message
        });
    }
};

/**
 * Batch approve images
 * PUT /api/admin/batch-approve
 */
exports.batchApprove = async (req, res) => {
    try {
        const { imageIds } = req.body;

        if (!Array.isArray(imageIds) || imageIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of image IDs'
            });
        }

        const updated = await SellerImage.update(
            {
                status: 'approved',
                processingStatus: 'completed',
                rejectionReason: null
            },
            {
                where: {
                    id: { [Op.in]: imageIds },
                    status: 'pending'
                }
            }
        );

        res.json({
            success: true,
            message: `${updated[0]} images approved successfully`,
            count: updated[0]
        });

    } catch (error) {
        console.error('❌ Error in batch approve:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve images',
            error: error.message
        });
    }
};

/**
 * Batch reject images
 * PUT /api/admin/batch-reject
 */
exports.batchReject = async (req, res) => {
    try {
        const { imageIds, reason } = req.body;

        if (!Array.isArray(imageIds) || imageIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of image IDs'
            });
        }

        const updated = await SellerImage.update(
            {
                status: 'rejected',
                rejectionReason: reason || 'Does not meet quality standards'
            },
            {
                where: {
                    id: { [Op.in]: imageIds },
                    status: 'pending'
                }
            }
        );

        res.json({
            success: true,
            message: `${updated[0]} images rejected successfully`,
            count: updated[0]
        });

    } catch (error) {
        console.error('❌ Error in batch reject:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject images',
            error: error.message
        });
    }
};

/**
 * Get admin dashboard statistics
 * GET /api/admin/stats
 */
exports.getAdminStats = async (req, res) => {
    try {
        // Get counts by status
        const statusCounts = await SellerImage.findAll({
            attributes: [
                'status',
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const stats = statusCounts.reduce((acc, item) => {
            acc[item.status] = parseInt(item.count);
            return acc;
        }, {});

        // Get recent pending images count
        const recentPending = await SellerImage.count({
            where: {
                status: 'pending',
                created_at: {
                    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
                }
            }
        });

        // Get total revenue (approved images only)
        const revenueData = await SellerImage.findOne({
            where: { status: 'approved' },
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('price')), 'totalRevenue'],
                [db.sequelize.fn('SUM', db.sequelize.col('downloads')), 'totalDownloads']
            ],
            raw: true
        });

        res.json({
            success: true,
            data: {
                pending: stats.pending || 0,
                approved: stats.approved || 0,
                rejected: stats.rejected || 0,
                total: (stats.pending || 0) + (stats.approved || 0) + (stats.rejected || 0),
                recentPending,
                totalRevenue: parseFloat(revenueData?.totalRevenue || 0),
                totalDownloads: parseInt(revenueData?.totalDownloads || 0)
            }
        });

    } catch (error) {
        console.error('❌ Error fetching admin stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
};

// Assuming db, SellerImage, and Op are defined globally or imported at the very top of the file.
// Adding Customer import as requested.


/**
 * Get all sellers
 * GET /api/admin/sellers
 */
exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await Customer.findAll({
            where: {
                role: 'seller'
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt']
        });

        res.json({
            success: true,
            sellers
        });
    } catch (error) {
        console.error('❌ Error fetching sellers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sellers',
            error: error.message
        });
    }
};

/**
 * Delete a seller
 * DELETE /api/admin/sellers/:id
 */
exports.deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await Customer.findByPk(id);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        await seller.destroy();

        res.json({
            success: true,
            message: 'Seller deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting seller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete seller',
            error: error.message
        });
    }
};

/**
 * Create a new seller
 * POST /api/admin/add-seller
 */
exports.createSeller = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingCustomer = await Customer.findOne({
            where: { email: email }
        });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use"
            });
        }

        // Create new seller
        const seller = await Customer.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 8),
            role: 'seller',
            status: 'active'
        });

        res.json({
            success: true,
            message: "Seller created successfully",
            seller: {
                id: seller.id,
                firstName: seller.firstName,
                lastName: seller.lastName,
                email: seller.email,
                role: seller.role
            }
        });

    } catch (error) {
        console.error('❌ Error creating seller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create seller',
            error: error.message
        });
    }
};

module.exports = exports;
