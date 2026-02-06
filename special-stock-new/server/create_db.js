const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDb() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    console.log(`Connecting to MySQL at ${DB_HOST} as ${DB_USER}...`);

    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        console.log(`Creating database '${DB_NAME}' if it does not exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);

        console.log(`Database '${DB_NAME}' checked/created successfully.`);
        await connection.end();
    } catch (error) {
        console.error('Error creating database:', error.message);
        process.exit(1);
    }
}

createDb();
