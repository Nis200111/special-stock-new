# Image Approval Workflow - Quick Start

## 🚀 Quick Setup (5 Minutes)

### 1. Run Database Migration

```sql
-- Run this in your MySQL database
ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS thumbnail_path VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;

CREATE INDEX IF NOT EXISTS idx_status ON seller_images(status);
CREATE INDEX IF NOT EXISTS idx_seller_status ON seller_images(seller_id, status);
```

### 2. Create Upload Directories

```bash
cd server
mkdir -p uploads/thumbnails
mkdir -p uploads/watermarked
```

### 3. Restart Server

```bash
# Backend (if not running)
cd server
npm run dev

# Frontend (if not running)
cd ..
npm run dev
```

---

## 🎯 How It Works

### For Sellers:
1. Upload image at `/seller-dashboard/upload`
2. Image status: **Pending** (not visible to public)
3. Wait for admin approval

### For Admins:
1. Go to `/dashboard/image-approval`
2. Review pending images
3. Click **Approve** or **Reject**
4. Approved images instantly visible to buyers

### For Public:
- Only **approved** images shown in gallery
- Watermarked versions prevent theft
- Thumbnails for fast loading

---

## 📁 Key Files

**Backend:**
- `server/src/services/imageProcessing.service.js` - Sharp processing
- `server/src/controllers/seller.controller.js` - Upload logic
- `server/src/controllers/admin.controller.js` - Approval logic
- `server/src/controllers/public.controller.js` - Public images

**Frontend:**
- `src/app/dashboard/image-approval/page.jsx` - Admin UI

**Database:**
- `server/migrations/add-image-approval-columns.sql` - Migration

---

## 🔌 API Quick Reference

### Seller Upload
```http
POST /api/seller/upload-image
Content-Type: multipart/form-data
Authorization: Bearer {token}

{
  "image": <file>,
  "title": "...",
  "price": "9.99"
}
```

### Admin Approve
```http
PUT /api/admin/approve-image/:imageId
Authorization: Bearer {token}
```

### Admin Reject
```http
PUT /api/admin/reject-image/:imageId
Authorization: Bearer {token}

{
  "reason": "Low quality"
}
```

### Public Images (Only Approved)
```http
GET /api/public/images?page=1&limit=20
```

---

## ✅ Testing

1. **Upload Test:**
   - Login as seller
   - Upload image
   - Check status = 'pending'

2. **Approval Test:**
   - Login as admin
   - Go to `/dashboard/image-approval`
   - Approve/reject image

3. **Public Test:**
   - Visit gallery
   - Only approved images visible

---

## 🎨 Features

✅ Automatic thumbnail generation (300x300)
✅ Automatic watermarking (diagonal text)
✅ Pending status on upload
✅ Admin approval dashboard
✅ Single & batch approval
✅ Rejection with reasons
✅ Only approved images on public site

---

## 📖 Full Documentation

See `IMAGE_APPROVAL_WORKFLOW.md` for complete details.

---

## 🆘 Troubleshooting

**Images not processing?**
```bash
# Check Sharp is installed
cd server
npm list sharp

# Create directories
mkdir -p uploads/thumbnails uploads/watermarked
```

**Thumbnails 404?**
```javascript
// Verify in server/src/app.js:
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

**Admin page not showing images?**
- Check userRole in localStorage is 'admin'
- Check backend server is running
- Check browser console for errors

---

## 🎉 That's It!

Your image approval workflow is ready. Upload an image as a seller and approve it as an admin to test!
