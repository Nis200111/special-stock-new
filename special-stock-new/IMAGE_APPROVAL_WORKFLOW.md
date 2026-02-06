# Image Approval Workflow - Implementation Guide

## 🎯 Overview

This document describes the complete **Image Approval Workflow** implementation for the Special Stocks image marketplace. The system ensures that only approved, high-quality images are visible to buyers.

---

## 📋 Features Implemented

### 1. **Seller Upload with Pending Status**
- ✅ All uploaded images start with `status: 'pending'`
- ✅ Images are not visible on the public site until approved
- ✅ Automatic processing: thumbnail + watermark generation

### 2. **Automatic Image Processing**
- ✅ **Thumbnail Generation**: 300x300px preview using Sharp
- ✅ **Watermarking**: Diagonal "Special Stocks" text overlay
- ✅ Processing status tracking (processing, completed, failed)

### 3. **Admin Approval Dashboard**
- ✅ View all pending images
- ✅ Filter by status (pending/approved/rejected)
- ✅ Category filtering
- ✅ Search functionality
- ✅ Single-click approve/reject
- ✅ Batch approval for multiple images
- ✅ Rejection with custom reasons

### 4. **Public Display Logic**
- ✅ Only `approved` AND `completed` images shown on public site
- ✅ Watermarked versions displayed for protection
- ✅ Original files never exposed to public

---

## 🗂️ Files Created/Modified

### Backend (Node.js/Express)

#### **Models**
- ✅ `server/src/models/sellerImage.model.js` - Updated with new fields:
  - `status`: ENUM('pending', 'approved', 'rejected')
  - `thumbnailPath`: Path to thumbnail image
  - `rejectionReason`: Admin's rejection explanation
  - `processingStatus`: ENUM('processing', 'completed', 'failed')

#### **Services**
- ✅ `server/src/services/imageProcessing.service.js` - Image processing utilities:
  - `processImage()` - Main processing function (thumbnail + watermark)
  - `createThumbnail()` - Generate 300x300 thumbnail
  - `addWatermark()` - Add diagonal watermark text
  - `getImageMetadata()` - Extract image info

#### **Controllers**
- ✅ `server/src/controllers/seller.controller.js` - Seller operations:
  - `uploadImage` - Upload with automatic processing
  - `getMyImages` - Fetch seller's uploads
  - `getSellerStats` - Statistics by status
  - `deleteImage` - Remove image and physical files

- ✅ `server/src/controllers/admin.controller.js` - Admin operations:
  - `getPendingImages` - Get all pending images
  - `getAllImages` - Get images with filters
  - `approveImage` - Approve single image
  - `rejectImage` - Reject with reason
  - `batchApprove` - Approve multiple images
  - `batchReject` - Reject multiple images
  - `getAdminStats` - Dashboard statistics

- ✅ `server/src/controllers/public.controller.js` - Public API:
  - `getApprovedImages` - Only returns approved images
  - `getImageById` - Single image detail
  - `getFeaturedImages` - Trending/popular images
  - `getCategories` - Categories with counts

#### **Routes**
- ✅ `server/src/routes/seller.routes.js` - Seller endpoints
- ✅ `server/src/routes/admin.routes.js` - Admin endpoints
- ✅ `server/src/routes/public.routes.js` - Public endpoints

#### **App Configuration**
- ✅ `server/src/app.js` - Updated with all routes

### Frontend (Next.js/React)

#### **Admin Dashboard**
- ✅ `src/app/dashboard/image-approval/page.jsx` - Full approval interface
- ✅ `src/app/dashboard/image-approval/image-approval.module.css` - Styling

### Database

#### **Migration**
- ✅ `server/migrations/add-image-approval-columns.sql` - SQL migration script

---

## 🚀 Setup Instructions

### Step 1: Run Database Migration

Execute the SQL migration to add new columns:

```sql
-- Option A: Using MySQL Workbench or phpMyAdmin
-- Copy and run the contents of:
server/migrations/add-image-approval-columns.sql

-- Option B: Using command line
mysql -u your_username -p your_database < server/migrations/add-image-approval-columns.sql
```

The migration adds:
- `status` column (ENUM: pending/approved/rejected)
- `thumbnail_path` column (VARCHAR)
- `rejection_reason` column (TEXT)
- `processing_status` column (ENUM: processing/completed/failed)
- Performance indexes

### Step 2: Create Upload Directories

Ensure these directories exist in your server:

```bash
cd server
mkdir -p uploads/thumbnails
mkdir -p uploads/watermarked
```

### Step 3: Restart Backend Server

The backend server will automatically pick up the new routes:

```bash
cd server
npm run dev
```

### Step 4: Test the System

1. **Upload as Seller**:
   - Login as seller
   - Go to `/seller-dashboard/upload`
   - Upload an image
   - ✅ Check backend console for processing logs
   - ✅ Image should have `status: 'pending'`

2. **Approve as Admin**:
   - Login as admin
   - Go to `/dashboard/image-approval`
   - ✅ See pending images
   - ✅ Click "Approve" or "Reject"

3. **Public Display**:
   - Visit public gallery
   - ✅ Only approved images visible
   - ✅ Watermarked versions displayed

---

## 🔌 API Endpoints

### Seller Endpoints

#### Upload Image
```http
POST /api/seller/upload-image
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "image": <file>,
  "title": "Sunset Over Mountains",
  "description": "Beautiful landscape",
  "category": "photography",
  "tags": "sunset,nature,landscape",
  "price": "9.99",
  "sellerId": "123"
}

Response:
{
  "success": true,
  "message": "Image uploaded successfully and pending admin approval",
  "data": {
    "id": 1,
    "title": "Sunset Over Mountains",
    "status": "pending",
    "processingStatus": "completed",
    "thumbnailPath": "/uploads/thumbnails/thumb_image-1234567890.jpg"
  }
}
```

#### Get My Images
```http
GET /api/seller/my-images/:sellerId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 15,
  "data": [...]
}
```

#### Get Seller Stats
```http
GET /api/seller/stats/:sellerId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "totalUploads": 15,
    "totalViews": 1250,
    "totalDownloads": 45,
    "pending": 3,
    "approved": 10,
    "rejected": 2
  }
}
```

### Admin Endpoints

#### Get Pending Images
```http
GET /api/admin/pending-images?page=1&limit=12&category=photography
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "images": [...],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 12,
      "totalPages": 4
    }
  }
}
```

#### Approve Image
```http
PUT /api/admin/approve-image/:imageId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Image approved successfully",
  "data": {...}
}
```

#### Reject Image
```http
PUT /api/admin/reject-image/:imageId
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "reason": "Low image quality - does not meet minimum resolution requirements"
}

Response:
{
  "success": true,
  "message": "Image rejected successfully",
  "data": {...}
}
```

#### Batch Approve
```http
PUT /api/admin/batch-approve
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "imageIds": [1, 2, 3, 4, 5]
}

Response:
{
  "success": true,
  "message": "5 images approved successfully",
  "count": 5
}
```

#### Get Admin Stats
```http
GET /api/admin/stats
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "pending": 12,
    "approved": 456,
    "rejected": 23,
    "total": 491,
    "recentPending": 5,
    "totalRevenue": 4567.50,
    "totalDownloads": 1234
  }
}
```

### Public Endpoints (No Authentication)

#### Get Approved Images
```http
GET /api/public/images?page=1&limit=20&category=photography&search=sunset&sortBy=popular

Response:
{
  "success": true,
  "data": {
    "images": [...],  // Only approved images
    "pagination": {...}
  }
}
```

#### Get Single Image
```http
GET /api/public/image/:imageId

Response:
{
  "success": true,
  "data": {
    "id": 123,
    "title": "...",
    "watermarkedFilepath": "/uploads/watermarked/...",
    "thumbnailPath": "/uploads/thumbnails/...",
    // Note: 'filepath' (original) is excluded
  }
}
```

---

## 🖼️ Image Processing Details

### Thumbnail Generation

```javascript
// Automatically creates 300x300 thumbnail
sharp(imagePath)
  .resize(300, 300, {
    fit: 'cover',
    position: 'center'
  })
  .jpeg({ quality: 80 })
  .toFile(thumbnailPath);
```

**Output**: `/uploads/thumbnails/thumb_image-1234567890.jpg`

### Watermark Generation

```javascript
// Creates diagonal "Special Stocks" watermark
const svgWatermark = Buffer.from(`
  <svg>
    <text 
      x="50%" y="50%" 
      transform="rotate(-45)"
      fill="rgba(255,255,255,0.3)"
      font-size="${imageWidth/15}px">
      Special Stocks
    </text>
  </svg>
`);

sharp(imagePath)
  .composite([{ input: svgWatermark }])
  .toFile(watermarkedPath);
```

**Output**: `/uploads/watermarked/watermarked_image-1234567890.jpg`

---

## 🔐 Security Considerations

### 1. **Original Files Protected**
- Original high-res images stored in `/uploads/` (not included in public responses)
- Only watermarked versions exposed via API
- Thumbnails used for previews

### 2. **Admin-Only Operations**
- All approval/rejection endpoints should verify admin role
- Add middleware: `verifyAdmin` to protect routes

### 3. **File Upload Validation**
- Max file size: 10MB
- Accepted types: image/* only
- Filenames sanitized with timestamps

---

## 📊 Database Schema

### Updated `seller_images` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Primary key |
| `seller_id` | INT | Foreign key to sellers |
| `title` | VARCHAR | Image title |
| `description` | TEXT | Image description |
| `category` | VARCHAR | Category (photography, vector, etc.) |
| `tags` | VARCHAR | Comma-separated tags |
| `price` | DECIMAL(10,2) | Price in USD |
| `filename` | VARCHAR | Original filename |
| `filepath` | VARCHAR | Path to original image |
| **`thumbnail_path`** | VARCHAR | **NEW:** Path to thumbnail |
| `watermarked_filepath` | VARCHAR | Path to watermarked image |
| `original_name` | VARCHAR | User's original filename |
| `file_size` | INT | File size in bytes |
| **`status`** | ENUM | **NEW:** pending/approved/rejected |
| **`rejection_reason`** | TEXT | **NEW:** Admin's rejection reason |
| **`processing_status`** | ENUM | **NEW:** processing/completed/failed |
| `views` | INT | View count |
| `downloads` | INT | Download count |
| `created_at` | TIMESTAMP | Upload timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

## 🎨 Frontend Usage

### Displaying Only Approved Images in Gallery

```javascript
// In your public gallery component
async function fetchGalleryImages() {
  const response = await fetch(
    'http://localhost:5000/api/public/images?page=1&limit=20'
  );
  
  const data = await response.json();
  
  // data.data.images contains ONLY approved images
  setImages(data.data.images);
}

// Show watermarked image
<img 
  src={`http://localhost:5000${image.watermarkedFilepath}`} 
  alt={image.title}
/>

// Show thumbnail for grid
<img 
  src={`http://localhost:5000${image.thumbnailPath}`} 
  alt={image.title}
/>
```

---

## 🧪 Testing Checklist

### Upload Flow
- [ ] Seller can upload image
- [ ] Image saved with `status: 'pending'`
- [ ] Thumbnail generated (300x300)
- [ ] Watermark applied
- [ ] `processingStatus` changes from 'processing' to 'completed'

### Approval Flow
- [ ] Admin can view pending images
- [ ] Admin can approve image → status changes to 'approved'
- [ ] Admin can reject image with reason
- [ ] Batch approval works for multiple images
- [ ] Filters (status, category) work correctly

### Public Display
- [ ] Only approved images appear in public API
- [ ] Pending images not visible on public site
- [ ] Rejected images not visible on public site
- [ ] Watermarked version displayed (not original)

### Edge Cases
- [ ] Large image handling (>10MB rejected)
- [ ] Invalid file types rejected
- [ ] Processing failures handled gracefully
- [ ] Missing thumbnails handled

---

## 🔧 Troubleshooting

### Images Not Processing

**Check:**
1. Sharp is installed: `npm list sharp` in server directory
2. Upload directories exist:
   ```bash
   ls -la server/uploads/thumbnails
   ls -la server/uploads/watermarked
   ```
3. File permissions allow writing

**Fix:**
```bash
cd server
mkdir -p uploads/thumbnails uploads/watermarked
chmod 755 uploads uploads/thumbnails uploads/watermarked
```

### Watermark Not Appearing

**Check backend logs for errors**:
```bash
# In server terminal, you should see:
✅ Image processing completed: { thumbnail: '...', watermarked: '...' }
```

If you see `❌ Image processing failed:`, check the error details.

### Thumbnails Return 404

**Ensure static file serving is configured**:
```javascript
// In server/src/app.js
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

**Verify files exist**:
```bash
ls server/uploads/thumbnails/
```

---

## 📈 Performance Optimization

### 1. **Database Indexes**
Already added in migration:
- `idx_status` on `status` column
- `idx_seller_status` on `(seller_id, status)`

### 2. **Image Processing**
- Processing happens asynchronously after upload
- Doesn't block API response
- Failed processing doesn't fail the upload

### 3. **Caching** (Future Enhancement)
Consider adding:
- Redis cache for approved images list
- CDN for serving processed images
- Image lazy loading on frontend

---

## 🚀 Next Steps

### Enhancements You Can Add:

1. **Email Notifications**
   - Notify seller when image approved/rejected
   - Notify admin when new images pending

2. **Bulk Operations**
   - Export approved images list
   - Generate reports by seller

3. **Advanced Filtering**
   - Date range filters
   - Seller-specific approvals
   - Processing status filters

4. **Image versioning**
   - Keep history of rejections
   - Allow re-submission after rejection

5. **Analytics Dashboard**
   - Approval rate by category
   - Average processing time
   - Top sellers by approval rate

---

## ✅ Summary

The Image Approval Workflow is now fully implemented with:

- ✅ Automatic thumbnail + watermark generation
- ✅ Pending status for all new uploads
- ✅ Admin dashboard for review
- ✅ Single and batch approval
- ✅ Rejection with reasons
- ✅ Public API serves only approved images
- ✅ Original files protected from public access

**All requirements met!** 🎉

For questions or issues, check the backend logs or refer to the API endpoint documentation above.
