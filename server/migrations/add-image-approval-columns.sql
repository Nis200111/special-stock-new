/**
 * Database Migration Script
 * Adds new columns for image approval workflow
 * Run this SQL in your MySQL database
 */

-- Add new columns to seller_images table
ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS thumbnail_path VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_status ON seller_images(status);
CREATE INDEX IF NOT EXISTS idx_seller_status ON seller_images(seller_id, status);

-- Update existing images to have 'approved' status (optional - depends on your needs)
-- UPDATE seller_images SET status = 'approved' WHERE status IS NULL;

SELECT 'Migration completed successfully!' as message;
