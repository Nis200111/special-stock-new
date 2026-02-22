require('dotenv').config();
const db = require('./src/models');
const bcrypt = require('bcryptjs');

async function fixAdminLogin() {
    try {
        console.log('Connecting to database...');
        await db.sequelize.authenticate();
        console.log('Connection established successfully.');

        const email = "admin@stockmedia.com";
        const password = "1234567"; // The password user is trying to use
        const hashedPassword = bcrypt.hashSync(password, 8);

        // 1. Fix Customer Table (Frontend uses this)
        const customer = await db.customer.findOne({ where: { email: email } });
        if (customer) {
            console.log(`Found Customer with email ${email}. Updating password...`);
            customer.password = hashedPassword;
            customer.role = 'admin'; // Ensure role is admin
            await customer.save();
            console.log('✅ Customer Admin password updated to "1234567".');
        } else {
            console.log(`Customer ${email} not found. Creating...`);
            await db.customer.create({
                firstName: "System",
                lastName: "Admin",
                email: email,
                phone: "0716507009",
                password: hashedPassword,
                role: "admin",
                status: "active"
            });
            console.log('✅ Customer Admin created with password "1234567".');
        }

        // 2. Fix User Table (Backend admin uses this, just in case)
        const user = await db.user.findOne({ where: { email: email } });
        if (user) {
            console.log(`Found User with email ${email}. Updating password...`);
            user.password = hashedPassword;
            await user.save();
            console.log('✅ User Admin password updated to "1234567".');
        } else {
            console.log(`User ${email} not found. (Seeder handles this usually)`);
        }

    } catch (error) {
        console.error('Error fixing admin login:', error);
    } finally {
        await db.sequelize.close();
    }
}

fixAdminLogin();
