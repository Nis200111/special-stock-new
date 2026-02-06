-- Database Fix for Soft Delete and Admin Roles
USE corporate_ecosystem;

-- 1. Update status column in seller_images to include 'deleted'
ALTER TABLE seller_images 
MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'deleted') NOT NULL DEFAULT 'pending';

-- 2. Update role column in users to include 'super_admin' and 'manager'
ALTER TABLE users
MODIFY COLUMN role ENUM('super_admin', 'admin', 'manager') NOT NULL DEFAULT 'admin';

-- 3. Update role column in customers to ensure consistency
ALTER TABLE customers
MODIFY COLUMN role VARCHAR(50) DEFAULT 'buyer';

SELECT 'Database schema updated successfully for soft-deletion and administrative roles.' AS message;
