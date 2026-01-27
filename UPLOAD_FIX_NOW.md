# 🔧 Quick Fix for Upload Error

## Problem
The upload is failing because the database table `seller_images` doesn't have the new columns for the approval workflow.

## Solution (2 Steps)

### Step 1: Run Database Migration

**Option A: Using MySQL Workbench or phpMyAdmin**
1. Open MySQL Workbench or phpMyAdmin
2. Select your `special_stocks` database
3. Copy and paste this SQL:

```sql
-- Add new columns for approval workflow
ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS thumbnail_path VARCHAR(255) DEFAULT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS rejection_reason TEXT DEFAULT NULL;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_status ON seller_images(status);
CREATE INDEX IF NOT EXISTS idx_seller_status ON seller_images(seller_id, status);

-- Verify
SELECT 'Migration completed successfully!' AS message;
```

4. Click "Execute" or "Go"

**Option B: Using Command Line**
```bash
cd server
mysql -u root -p special_stocks < fix-database.sql
```

### Step 2: Restart Backend Server

Your backend server should  automatically restart if using nodemon. If not:

1. In your server terminal, press `Ctrl+C`
2. Run: `npm run dev`

## Test the Fix

1. Go back to `/seller-dashboard/upload`
2. Upload the same image again
3. You should see: ✅ "Image uploaded successfully"

---

## What Was Fixed

I've updated the upload route to include:
- ✅ `status: 'pending'` - Images need admin approval
- ✅ `processingStatus: 'completed'` - Tracks processing
- ✅ `thumbnailPath` - Stores 300x300 thumbnail
- ✅ Both watermark AND thumbnail generation

---

## Verification

After migration, you should see in backend console:
```
Row inserted successfully
Image uploaded successfully
```

And the upload form should show success!

---

**File to check:** `server/fix-database.sql` (already created for you)
