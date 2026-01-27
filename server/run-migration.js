const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = require('./src/config/db.config.js');

async function runMigration() {
    console.log('🔄 Starting database migration (Retry)...');

    let connection;
    try {
        console.log(`Connecting to database: ${dbConfig.DB}...`);

        connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        console.log('✅ Connected.');

        // Simple ALTER TABLE statements without IF NOT EXISTS (for compatibility)
        const queries = [
            "ALTER TABLE seller_images ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL;",
            "ALTER TABLE seller_images ADD COLUMN thumbnail_path VARCHAR(255) DEFAULT NULL;",
            "ALTER TABLE seller_images ADD COLUMN rejection_reason TEXT DEFAULT NULL;",
            "ALTER TABLE seller_images ADD COLUMN processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;",
            "ALTER TABLE seller_images ADD COLUMN watermarked_filepath VARCHAR(255) DEFAULT NULL;",
            "CREATE INDEX idx_status ON seller_images(status);",
            "CREATE INDEX idx_seller_status ON seller_images(seller_id, status);"
        ];

        for (const query of queries) {
            try {
                await connection.query(query);
                console.log(`✅ Executed: ${query.substring(0, 50)}...`);
            } catch (err) {
                // Ignore duplicate column/key errors
                if (err.code === 'ER_DUP_FIELDNAME' || err.code === 'ER_DUP_KEYNAME' || err.message.includes("Duplicate column name")) {
                    console.log(`ℹ️ Already exists: ${query.substring(0, 50)}...`);
                } else {
                    console.error(`❌ Error executing query: ${query}`);
                    console.error(`   Message: ${err.message}`);
                }
            }
        }

        console.log('🎉 Migration completed!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Connection closed.');
        }
    }
}

runMigration();
