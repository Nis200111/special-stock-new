-- Quick Database Fix for Upload Error
-- Run this in your MySQL client to add missing columns

USE corporate_ecosystem;

-- Check current table structure
DESCRIBE seller_images;

-- Add missing columns if they don't exist
ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS thumbnail_path VARCHAR(255) DEFAULT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS rejection_reason TEXT DEFAULT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_status ON seller_images(status);
CREATE INDEX IF NOT EXISTS idx_seller_status ON seller_images(seller_id, status);

-- Verify the changes
DESCRIBE seller_images;

SELECT 'Migration completed! New columns added.' AS message;
