/**
 * Public Routes
 * Public-facing API that serves only approved images
 */

const controller = require('../controllers/public.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Get all approved images
    app.get(
        "/api/public/images",
        controller.getApprovedImages
    );

    // Get single image by ID
    app.get(
        "/api/public/image/:imageId",
        controller.getImageById
    );

    // Get featured/trending images
    app.get(
        "/api/public/featured-images",
        controller.getFeaturedImages
    );

    // Get categories with counts
    app.get(
        "/api/public/categories",
        controller.getCategories
    );
};
