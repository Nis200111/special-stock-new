const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger Setup
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Special Stocks API - Image Marketplace' });
});

// Import Routes
require('./routes/auth.routes')(app);
require('./routes/seller.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/public.routes')(app);
require('./routes/ffmpeg.routes')(app);

module.exports = app;
