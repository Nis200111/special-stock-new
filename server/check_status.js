require('dotenv').config();
const db = require('./src/models');

async function checkImages() {
    try {
        console.log("Checking image statuses...");
        const images = await db.sellerImage.findAll({
            where: {
                title: {
                    [db.Sequelize.Op.or]: [
                        { [db.Sequelize.Op.like]: '%Waraka%' },
                        { [db.Sequelize.Op.like]: '%Dog%' }
                    ]
                }
            },
            attributes: ['id', 'title', 'status', 'processingStatus', 'contentType'],
            raw: true
        });
        console.log(JSON.stringify(images, null, 2));
    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Close connection if needed, though for a script it will exit
        process.exit();
    }
}

checkImages();
