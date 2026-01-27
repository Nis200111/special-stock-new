/**
 * Fix Admin Role - Using Sequelize Models
 * Run: node fix_admin_role_sequelize.js
 */

const db = require('./src/models');
const Customer = db.customer;

async function fixAdminRole() {
    try {
        console.log('🔄 Updating admin roles...\n');

        const adminEmails = [
            'admin@stockmedia.com',
            'nisansalarasanjali512@gmail.com',
            'admin@example.com'
        ];

        for (const email of adminEmails) {
            const updated = await Customer.update(
                { role: 'admin' },
                {
                    where: { email: email },
                    returning: true
                }
            );

            if (updated[0] > 0) {
                const user = await Customer.findOne({
                    where: { email: email },
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                });

                if (user) {
                    console.log(`✅ Updated ${email} to admin role`);
                    console.log(`   User: ${user.firstName} ${user.lastName}\n`);
                }
            } else {
                console.log(`⚠️  User not found: ${email}\n`);
            }
        }

        // Show all users and their roles
        console.log('📊 Current user roles:');
        console.log('─'.repeat(80));

        const allUsers = await Customer.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
            order: [['role', 'ASC'], ['email', 'ASC']]
        });

        allUsers.forEach(user => {
            const roleColor = user.role === 'admin' ? '🔴' : user.role === 'seller' ? '🟢' : '🔵';
            console.log(`${roleColor} [${(user.role || 'buyer').toUpperCase()}] ${user.firstName} ${user.lastName} - ${user.email}`);
        });

        console.log('\n✅ Admin roles updated successfully!\n');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error updating admin roles:', error);
        process.exit(1);
    }
}

// Run the fix
fixAdminRole();
