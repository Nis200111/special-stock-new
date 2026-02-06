const app = require('./src/app');
const db = require('./src/models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize.sync().then(async () => {
    console.log('Database synced successfully.');
    await require('./src/seeders')();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch((err) => {
    console.error('Failed to sync database:', err);
});
