const db = require('./src/models');

async function applyFix() {
    try {
        console.log('--- Applying Database Schema Fix ---');

        // 1. Update status column in seller_images
        console.log('Updating seller_images status ENUM...');
        await db.sequelize.query(`
            ALTER TABLE seller_images 
            MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'deleted') NOT NULL DEFAULT 'pending'
        `);
        console.log('✅ Updated status column successfully.');

        // 2. Update role column in users
        console.log('Updating users role ENUM...');
        await db.sequelize.query(`
            ALTER TABLE users
            MODIFY COLUMN role ENUM('super_admin', 'admin', 'manager') NOT NULL DEFAULT 'admin'
        `);
        console.log('✅ Updated users role successfully.');

        // 3. Update role column in customers
        console.log('Ensuring customers role column is flexible...');
        await db.sequelize.query(`
            ALTER TABLE customers
            MODIFY COLUMN role VARCHAR(50) DEFAULT 'buyer'
        `);
        console.log('✅ Updated customers role successfully.');

        console.log('--- All fixes applied successfully! ---');
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to apply database fix:');
        console.error(error.message);
        process.exit(1);
    }
}

applyFix();
