module.exports = (sequelize, DataTypes) => {
    const SellerImage = sequelize.define("seller_images", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seller_id'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        contentType: {
            type: DataTypes.ENUM('image', 'video'),
            defaultValue: 'image',
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'photography'
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filepath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnailPath: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'thumbnail_path'
        },
        watermarkedFilepath: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'watermarked_filepath'
        },
        originalName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'original_name'
        },
        fileSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'file_size'
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'deleted'),
            defaultValue: 'pending',
            allowNull: false
        },
        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'rejection_reason'
        },
        processingStatus: {
            type: DataTypes.ENUM('processing', 'completed', 'failed'),
            defaultValue: 'processing',
            allowNull: false,
            field: 'processing_status'
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        downloads: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return SellerImage;
};
