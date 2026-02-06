const db = require("../models");
const config = process.env;
const User = db.user;
const Customer = db.customer;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register Customer
exports.registerCustomer = async (req, res) => {
    try {
        // Create Customer
        const customer = await Customer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role || "buyer"
        });

        res.send({ message: "Customer registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Login Customer
exports.loginCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!customer) {
            return res.status(404).send({ message: "Customer Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            customer.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: customer.id, role: customer.role }, config.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            role: customer.role,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Login Admin/User
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                phone: req.body.phone
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            phone: user.phone,
            role: user.role,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
