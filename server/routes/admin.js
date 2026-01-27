/**
 * Admin API Route - Add New Seller
 * Using Sequelize Models
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../src/models');
const Customer = db.customer;

// Middleware to verify admin authentication
const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

/**
 * @route   POST /api/admin/add-seller
 * @desc    Register a new seller (Admin only)
 * @access  Private (Admin only)
 */
router.post('/add-seller', verifyAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Check if email already exists
        const existingUser = await Customer.findOne({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create new seller
        const newSeller = await Customer.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'seller'
        });

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Seller registered successfully',
            seller: {
                id: newSeller.id,
                firstName: newSeller.firstName,
                lastName: newSeller.lastName,
                email: newSeller.email,
                role: newSeller.role,
                createdAt: newSeller.createdAt
            }
        });

    } catch (error) {
        console.error('Error adding seller:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/admin/sellers
 * @desc    Get all sellers (Admin only)
 * @access  Private (Admin only)
 */
router.get('/sellers', verifyAdmin, async (req, res) => {
    try {
        const sellers = await Customer.findAll({
            where: { role: 'seller' },
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: sellers.length,
            sellers: sellers
        });

    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   DELETE /api/admin/sellers/:id
 * @desc    Delete a seller (Admin only)
 * @access  Private (Admin only)
 */
router.delete('/sellers/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Find seller
        const seller = await Customer.findOne({
            where: { id: id, role: 'seller' }
        });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Delete seller
        await seller.destroy();

        res.status(200).json({
            success: true,
            message: 'Seller deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting seller:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   GET /api/admin/sellers/:id
 * @desc    Get single seller details (Admin only)
 * @access  Private (Admin only)
 */
router.get('/sellers/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const seller = await Customer.findOne({
            where: { id: id, role: 'seller' },
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt']
        });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        res.status(200).json({
            success: true,
            seller: seller
        });

    } catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * @route   PUT /api/admin/sellers/:id
 * @desc    Update seller details (Admin only)
 * @access  Private (Admin only)
 */
router.put('/sellers/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;

        // Find seller
        const seller = await Customer.findOne({
            where: { id: id, role: 'seller' }
        });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Validate email if changed
        if (email && email !== seller.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Check if new email already exists
            const existingUser = await Customer.findOne({
                where: { email: email.toLowerCase() }
            });

            if (existingUser && existingUser.id !== parseInt(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered'
                });
            }
        }

        // Update fields
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email.toLowerCase();
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters'
                });
            }
            updateData.password = bcrypt.hashSync(password, 8);
        }

        await seller.update(updateData);

        res.status(200).json({
            success: true,
            message: 'Seller updated successfully',
            seller: {
                id: seller.id,
                firstName: seller.firstName,
                lastName: seller.lastName,
                email: seller.email,
                role: seller.role
            }
        });

    } catch (error) {
        console.error('Error updating seller:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

module.exports = router;
