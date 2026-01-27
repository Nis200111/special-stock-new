/**
 * Public Controller
 * Handles public-facing API endpoints
 * Only serves approved images
 */

const db = require('../models');
const SellerImage = db.sellerImage;
const { Op } = require('sequelize');

/**
 * Get all approved images for public display
 * GET /api/public/images
 */
exports.getApprovedImages = async (req, res) => {
    try {
        const { page = 1, limit = 20, category, search, sortBy = 'recent' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {
            status: 'approved', // ONLY APPROVED IMAGES
            processingStatus: 'completed' // Only fully processed images
        };

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

        // Determine sort order
        let order = [['created_at', 'DESC']]; // Default: recent
        if (sortBy === 'popular') {
            order = [['views', 'DESC']];
        } else if (sortBy === 'downloads') {
            order = [['downloads', 'DESC']];
        } else if (sortBy === 'price-low') {
            order = [['price', 'ASC']];
        } else if (sortBy === 'price-high') {
            order = [['price', 'DESC']];
        }

        const { count, rows: images } = await SellerImage.findAndCountAll({
            where: whereClause,
            order: order,
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: {
                exclude: ['filepath'] // Don't expose original file path to public
            }
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
        console.error('❌ Error fetching approved images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images',
            error: error.message
        });
    }
};

/**
 * Get a single approved image by ID
 * GET /api/public/image/:imageId
 */
exports.getImageById = async (req, res) => {
    try {
        const { imageId } = req.params;

        const image = await SellerImage.findOne({
            where: {
                id: imageId,
                status: 'approved', // ONLY APPROVED
                processingStatus: 'completed'
            },
            attributes: {
                exclude: ['filepath'] // Don't expose original file
            }
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        // Increment view count
        await image.increment('views');

        res.json({
            success: true,
            data: image
        });

    } catch (error) {
        console.error('❌ Error fetching image:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch image',
            error: error.message
        });
    }
};

/**
 * Get featured/trending images
 * GET /api/public/featured-images
 */
exports.getFeaturedImages = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const images = await SellerImage.findAll({
            where: {
                status: 'approved',
                processingStatus: 'completed'
            },
            order: [
                ['views', 'DESC'],
                ['downloads', 'DESC']
            ],
            limit: parseInt(limit),
            attributes: {
                exclude: ['filepath']
            }
        });

        res.json({
            success: true,
            count: images.length,
            data: images
        });

    } catch (error) {
        console.error('❌ Error fetching featured images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch featured images',
            error: error.message
        });
    }
};

/**
 * Get categories with image counts
 * GET /api/public/categories
 */
exports.getCategories = async (req, res) => {
    try {
        const categories = await SellerImage.findAll({
            where: {
                status: 'approved',
                processingStatus: 'completed'
            },
            attributes: [
                'category',
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
            ],
            group: ['category'],
            raw: true
        });

        res.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

module.exports = exports;
