/**
 * Admin Routes
 * Routes for admin operations including image approval
 */

const controller = require('../controllers/admin.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    // Get pending images for review
    app.get(
        "/api/admin/pending-images",
        controller.getPendingImages
    );

    // Get all images with filters
    app.get(
        "/api/admin/all-images",
        controller.getAllImages
    );

    // Approve image
    app.put(
        "/api/admin/approve-image/:imageId",
        controller.approveImage
    );

    // Reject image
    app.put(
        "/api/admin/reject-image/:imageId",
        controller.rejectImage
    );

    // Batch approve
    app.put(
        "/api/admin/batch-approve",
        controller.batchApprove
    );

    // Batch reject
    app.put(
        "/api/admin/batch-reject",
        controller.batchReject
    );

    // Get admin statistics
    app.get(
        "/api/admin/stats",
        controller.getAdminStats
    );

    // Get all sellers
    app.get(
        "/api/admin/sellers",
        controller.getAllSellers
    );

    // Delete seller
    app.delete(
        "/api/admin/sellers/:id",
        controller.deleteSeller
    );
    // Create seller
    app.post(
        "/api/admin/add-seller",
        controller.createSeller
    );
};
