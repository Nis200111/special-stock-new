/**
 * Script to update admin user role in database
 * Run this with: node fix_admin_role.js
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

async function fixAdminRole() {
    const client = await pool.connect();

    try {
        console.log('🔄 Updating admin roles...\n');

        // Admin emails list
        const adminEmails = [
            'admin@stockmedia.com',
            'nisansalarasanjali512@gmail.com',
            'admin@example.com'
        ];

        // Update all admin emails to have admin role
        for (const email of adminEmails) {
            const result = await client.query(
                `UPDATE customers 
                 SET role = 'admin' 
                 WHERE email = $1 
                 RETURNING id, first_name, last_name, email, role`,
                [email]
            );

            if (result.rows.length > 0) {
                console.log(`✅ Updated ${email} to admin role`);
                console.log(`   User: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
            } else {
                console.log(`⚠️  User not found: ${email}`);
            }
        }

        // Display all users and their roles
        console.log('\n📊 Current user roles:');
        console.log('─'.repeat(80));

        const allUsers = await client.query(
            `SELECT id, first_name, last_name, email, role, created_at 
             FROM customers 
             ORDER BY role, email`
        );

        allUsers.rows.forEach(user => {
            const roleColor = user.role === 'admin' ? '🔴' : user.role === 'seller' ? '🟢' : '🔵';
            console.log(`${roleColor} [${user.role.toUpperCase()}] ${user.first_name} ${user.last_name} - ${user.email}`);
        });

        console.log('\n✅ Admin roles updated successfully!\n');

    } catch (error) {
        console.error('❌ Error updating admin roles:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

// Run the fix
fixAdminRole();
