const db = require("../models");
const User = db.user;
const Customer = db.customer;
const bcrypt = require("bcryptjs");

module.exports = async () => {
    // Super Admin
    const adminPhone = "0716507009";
    const adminPassword = "123456";

    const admin = await User.findOne({ where: { phone: adminPhone } });
    if (!admin) {
        await User.create({
            phone: adminPhone,
            password: bcrypt.hashSync(adminPassword, 8),
            role: "super_admin"
        });
        console.log("Super Admin created.");
    }

    // Test Customer
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
        console.log("Test Customer created.");
    }
};
