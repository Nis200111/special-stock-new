const db = require('../src/models');

async function migrate() {
    try {
        console.log('Starting migration...');

        // Add contentType column to seller_images table
        // We use raw query because Sequelize sync() won't alter existing tables automatically in this setup
        // without { alter: true } which might be risky or not enabled.

        await db.sequelize.query(`
            ALTER TABLE seller_images 
            ADD COLUMN contentType ENUM('image', 'video') NOT NULL DEFAULT 'image' 
            AFTER description;
        `);

        console.log('Migration successful: Added contentType column.');
    } catch (error) {
        if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
            console.log('Column contentType already exists. Skipping.');
        } else {
            console.error('Migration failed:', error);
        }
    } finally {
        await db.sequelize.close();
    }
}

migrate();
