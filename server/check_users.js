require('dotenv').config();
const db = require('./src/models');

async function checkUsers() {
    try {
        console.log('Connecting to database...');
        await db.sequelize.authenticate();
        console.log('Connection established successfully.');

        console.log('\n--- checking "users" table (Staff/Admins) ---');
        const users = await db.user.findAll();
        if (users.length === 0) {
            console.log('No users found in "users" table.');
        } else {
            users.forEach(u => {
                console.log(`ID: ${u.id}, Phone: ${u.phone}, Role: ${u.role}`);
            });
        }

        console.log('\n--- checking "customers" table (for Admins) ---');
        const customers = await db.customer.findAll({
            where: {
                role: 'admin'
            }
        });

        if (customers.length === 0) {
            console.log('No customers with role "admin" found.');
        } else {
            customers.forEach(c => {
                console.log(`ID: ${c.id}, Email: ${c.email}, Role: ${c.role}, Password(hash): ${c.password.substring(0, 10)}...`);
            });
        }

        console.log('\n--- checking "customers" table (Test Customer) ---');
        const testCustomer = await db.customer.findAll({
            where: {
                email: 'test@customer.com'
            }
        });

        if (testCustomer.length === 0) {
            console.log('Test Customer not found.');
        } else {
            testCustomer.forEach(c => {
                console.log(`ID: ${c.id}, Email: ${c.email}, Role: ${c.role}`);
            });
        }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await db.sequelize.close();
    }
}

checkUsers();
