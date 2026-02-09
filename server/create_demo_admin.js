require('dotenv').config();
const db = require('./src/models');
const bcrypt = require('bcryptjs');

async function createDemoAdmins() {
    try {
        console.log('Connecting to database...');
        await db.sequelize.authenticate();
        console.log('Connection established successfully.');

        // 1. Create System Admin (User model)
        const adminPhone = "0716507009";
        const adminPassword = "password123"; // Using a stronger password than seeder

        const existingUser = await db.user.findOne({ where: { phone: adminPhone } });
        if (existingUser) {
            console.log(`System Admin (User) with phone ${adminPhone} already exists.`);
            // Update password just in case
            await existingUser.update({
                password: bcrypt.hashSync(adminPassword, 8),
                role: 'admin'
            });
            console.log(`Updated System Admin password to: ${adminPassword}`);
        } else {
            await db.user.create({
                phone: adminPhone,
                password: bcrypt.hashSync(adminPassword, 8),
                role: 'admin' // Using 'admin' to be safe with role checks
            });
            console.log(`\n✅ Created System Admin (User):`);
            console.log(`   Phone: ${adminPhone}`);
            console.log(`   Password: ${adminPassword}`);
            console.log(`   Role: admin`);
            console.log(`   Login URL: /api/users/login`);
        }

        // 2. Create Customer Admin (Customer model)
        const customerEmail = "admin@stockmedia.com";
        const customerPassword = "password123";

        const existingCustomer = await db.customer.findOne({ where: { email: customerEmail } });
        if (existingCustomer) {
            console.log(`\nCustomer Admin with email ${customerEmail} already exists.`);
            await existingCustomer.update({
                password: bcrypt.hashSync(customerPassword, 8),
                role: 'admin'
            });
            console.log(`Updated Customer Admin password to: ${customerPassword} and role to 'admin'.`);
        } else {
            await db.customer.create({
                firstName: "Demo",
                lastName: "Admin",
                email: customerEmail,
                phone: "0770000000",
                password: bcrypt.hashSync(customerPassword, 8),
                role: 'admin',
                status: 'active'
            });
            console.log(`\n✅ Created Customer Admin (Customer):`);
            console.log(`   Email: ${customerEmail}`);
            console.log(`   Password: ${customerPassword}`);
            console.log(`   Role: admin`);
            console.log(`   Login URL: /api/customers/login`);
        }

    } catch (error) {
        console.error('Error creating demo admins:', error);
    } finally {
        await db.sequelize.close();
    }
}

createDemoAdmins();
