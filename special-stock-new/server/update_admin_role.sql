-- SQL Script to Update Admin Email Roles

-- Update admin@stockmedia.com to admin role
UPDATE customers 
SET role = 'admin' 
WHERE email = 'admin@stockmedia.com';

-- Update other admin emails (if they exist)
UPDATE customers 
SET role = 'admin' 
WHERE email IN ('nisansalarasanjali512@gmail.com', 'admin@example.com');

-- Verify the update
SELECT id, first_name, last_name, email, role 
FROM customers 
WHERE email IN ('admin@stockmedia.com', 'nisansalarasanjali512@gmail.com', 'admin@example.com');

-- If admin user doesn't exist, insert them
-- (Replace with your actual password - this is hashed version of "1234567")
INSERT INTO customers (first_name, last_name, email, password, role, created_at)
VALUES (
    'Admin',
    'User',
    'admin@stockmedia.com',
    '$2a$08$YourHashedPasswordHere', -- You need to hash "1234567" with bcrypt
    'admin',
    NOW()
)
ON CONFLICT (email) DO UPDATE 
SET role = 'admin';

-- Show all users and their roles
SELECT id, first_name, last_name, email, role 
FROM customers 
ORDER BY role, email;
