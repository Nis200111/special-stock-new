const db = require("../models");
const User = db.user;
const Customer = db.customer;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = async () => {
    // --- Super Admin Configuration ---
    const adminEmail = "admin@stockmedia.com";
    const adminPhone = "0716507009";
    const adminPassword = "1234567"; // Updated password as requested

    // Check if admin exists by email OR phone to avoid duplicate errors
    const admin = await User.findOne({
        where: {
            [Op.or]: [
                { email: adminEmail },
                { phone: adminPhone }
            ]
        }
    });

    if (!admin) {
        await User.create({
            email: adminEmail,
            phone: adminPhone,
            password: bcrypt.hashSync(adminPassword, 8),
            role: "super_admin"
        });
        console.log("✅ Super Admin created successfully.");
    } else {
        // If user exists, update credentials to ensure the new password is set
        admin.email = adminEmail;
        admin.password = bcrypt.hashSync(adminPassword, 8);
        await admin.save();
        console.log("✅ Admin record updated with current credentials.");
    }

    // --- Test Customer Configuration ---
    const customerEmail = "test@customer.com";
    const customer = await Customer.findOne({ where: { email: customerEmail } });

    if (!customer) {
        await Customer.create({
            firstName: "Test",
            lastName: "Customer",
            email: customerEmail,
            phone: "0771234567",
            password: bcrypt.hashSync("customer123", 8),
            status: "active"
        });
        console.log("✅ Test Customer created successfully.");
    } else {
        console.log("ℹ️ Test Customer already exists.");
    }
};