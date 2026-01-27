# 🎨 Image Approval Workflow - Visual Guide

## 📊 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     SELLER UPLOADS IMAGE                         │
│                  /seller-dashboard/upload                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              POST /api/seller/upload-image                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 1. Save original → /uploads/image-{timestamp}.jpg        │   │
│  │ 2. Generate thumbnail → /uploads/thumbnails/thumb-...   │   │
│  │ 3. Generate watermark → /uploads/watermarked/...        │   │
│  │ 4. Save to DB with status: 'pending'                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE: seller_images                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ id: 123                                                  │   │
│  │ title: "Beautiful Sunset"                               │   │
│  │ filepath: /uploads/image-123.jpg                        │   │
│  │ thumbnailPath: /uploads/thumbnails/thumb-image-123.jpg  │   │
│  │ watermarkedFilepath: /uploads/watermarked/...           │   │
│  │ status: 'pending' ⏳                                     │   │
│  │ processingStatus: 'completed' ✅                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
    ┌─────────────────────┐       ┌─────────────────────┐
    │  PUBLIC GALLERY     │       │  ADMIN DASHBOARD    │
    │                     │       │  /dashboard/        │
    │ ❌ NOT VISIBLE      │       │  image-approval     │
    │    (pending)        │       │                     │
    └─────────────────────┘       └──────────┬──────────┘
                                             │
                                             ▼
                             ┌───────────────────────────────┐
                             │  Admin Reviews Image          │
                             │  ┌───────────┐  ┌──────────┐ │
                             │  │ APPROVE ✅│  │ REJECT ❌│ │
                             │  └─────┬─────┘  └────┬─────┘ │
                             └────────┼────────────┼────────┘
                                     │            │
                  ┌──────────────────┘            └──────────────────┐
                  │                                                  │
                  ▼                                                  ▼
    ┌──────────────────────────┐                    ┌──────────────────────────┐
    │ PUT /api/admin/          │                    │ PUT /api/admin/          │
    │     approve-image/:id    │                    │     reject-image/:id     │
    │                          │                    │                          │
    │ ✅ status: 'approved'    │                    │ ❌ status: 'rejected'    │
    └──────────┬───────────────┘                    └──────────┬───────────────┘
               │                                               │
               ▼                                               ▼
    ┌──────────────────────────┐                    ┌──────────────────────────┐
    │   PUBLIC GALLERY         │                    │   SELLER NOTIFICATION    │
    │   GET /api/public/images │                    │   (Future: Email)        │
    │                          │                    │                          │
    │   ✅ NOW VISIBLE!        │                    │   "Image rejected:       │
    │   (watermarked version)  │                    │    Low quality"          │
    └──────────────────────────┘                    └──────────────────────────┘
```

---

## 🖼️ Image Processing Details

### When Seller Uploads:

```
Original Image                    Thumbnail (300x300)              Watermarked Version
┌─────────────┐                  ┌──────────┐                    ┌─────────────┐
│             │   ──Sharp──▶     │  THUMB   │                    │   /   / /   │
│   4000 x    │   resize()       │          │                    │  S P E C I  │
│   3000      │                  │  300x300 │                    │ A L   / / / │
│   2.5 MB    │   ──Sharp──▶     │  50 KB   │                    │ S T O C K S │
│             │   composite()    │          │                    │  / / /   /  │
│             │                  │          │                    │             │
└─────────────┘                  └──────────┘                    └─────────────┘
      │                                │                                │
      ▼                                ▼                                ▼
/uploads/                    /uploads/thumbnails/            /uploads/watermarked/
image-123.jpg                thumb-image-123.jpg             watermarked-image-123.jpg
```

### Storage Strategy:

```
📁 server/uploads/
├── 📁 thumbnails/           ← For grid displays (fast loading)
│   └── thumb-image-123.jpg  (300x300, 50 KB)
│
├── 📁 watermarked/          ← For public previews (protected)
│   └── watermarked-123.jpg  (Original size, with watermark)
│
└── 📄 image-123.jpg         ← Original (NOT exposed to public)
```

---

## 🔐 Security Layers

```
┌──────────────────────────────────────────────────────────────┐
│  PUBLIC REQUEST: GET /api/public/images                      │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Filter:       │
                    │  status =      │
                    │  'approved'    │
                    └────────┬───────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  SELECT:                     │
              │  - id, title, description    │
              │  - thumbnailPath ✅          │
              │  - watermarkedFilepath ✅    │
              │  - price, category, etc.     │
              │                              │
              │  EXCLUDE:                    │
              │  - filepath ❌ (original)    │
              └──────────────┬───────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│  RESPONSE: Only approved images, only watermarked versions   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ {                                                      │  │
│  │   "id": 123,                                          │  │
│  │   "title": "Beautiful Sunset",                        │  │
│  │   "thumbnailPath": "/uploads/thumbnails/...",  ✅     │  │
│  │   "watermarkedFilepath": "/uploads/watermarked/...",✅│  │
│  │   "status": "approved"                               │  │
│  │   // Note: "filepath" NOT included ❌                 │  │
│  │ }                                                      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📱 Admin Dashboard UI Flow

```
┌──────────────────────────────────────────────────────────────┐
│  /dashboard/image-approval                                    │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │ Filter:    │  │ Category:    │  │ Search: [_______]   │  │
│  │ [Pending▼] │  │ [All      ▼] │  │                     │  │
│  └────────────┘  └──────────────┘  └─────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  ☐  [IMAGE]     │  │  ☐  [IMAGE]     │  │ ☐  [IMAGE]   │ │
│  │  Title: ...     │  │  Title: ...     │  │ Title: ...   │ │
│  │  Price: $9.99   │  │  Price: $14.99  │  │ Price: $7.99 │ │
│  │  Status: ⏳     │  │  Status: ⏳     │  │ Status: ⏳   │ │
│  │                 │  │                 │  │              │ │
│  │  [✅ Approve]   │  │  [✅ Approve]   │  │ [✅ Approve] │ │
│  │  [❌ Reject]    │  │  [❌ Reject]    │  │ [❌ Reject]  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 3 images selected                                    │    │
│  │ [✅ Approve All Selected]                            │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 API Endpoints Hierarchy

```
/api
├── /seller (Authenticated - Seller Role)
│   ├── POST /upload-image
│   │   → Upload with auto-processing
│   │   → Returns: { status: 'pending', thumbnailPath, ... }
│   │
│   ├── GET /my-uploads
│   │   → Get seller's own images (all statuses)
│   │
│   └── GET /stats/:sellerId
│       → { pending: 3, approved: 10, rejected: 2 }
│
├── /admin (Authenticated - Admin Role)
│   ├── GET /pending-images
│   │   → List all pending images
│   │
│   ├── PUT /approve-image/:id
│   │   → Change status to 'approved'
│   │
│   ├── PUT /reject-image/:id
│   │   → Change status to 'rejected' + reason
│   │
│   ├── PUT /batch-approve
│   │   → Approve multiple: { imageIds: [1,2,3] }
│   │
│   └── GET /stats
│       → Dashboard stats
│
└── /public (No Authentication)
    ├── GET /images
    │   → Only approved images ✅
    │   → Query: ?category=photography&page=1
    │
    ├── GET /image/:id
    │   → Single approved image
    │
    └── GET /featured-images
        → Trending/popular approved images
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE seller_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    
    -- Image Info
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    tags VARCHAR(255),
    price DECIMAL(10,2),
    
    -- File Paths
    filename VARCHAR(255),
    filepath VARCHAR(255),              -- Original (protected)
    thumbnail_path VARCHAR(255),        -- 300x300 preview
    watermarked_filepath VARCHAR(255),  -- Watermarked version
    
    -- Metadata
    original_name VARCHAR(255),
    file_size INT,
    
    -- Approval Workflow ⭐ NEW
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    processing_status ENUM('processing', 'completed', 'failed'),
    rejection_reason TEXT,
    
    -- Stats
    views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_status (status),
    INDEX idx_seller_status (seller_id, status)
);
```

---

## ✅ Implementation Checklist

### Backend
- ✅ Image processing service (Sharp)
- ✅ Thumbnail generation (300x300)
- ✅ Watermark generation (diagonal text)
- ✅ Seller upload endpoint
- ✅ Admin approval endpoints
- ✅ Public images endpoint (filtered)
- ✅ Database model with new fields
- ✅ Routes configured

### Frontend
- ✅ Admin approval dashboard UI
- ✅ Filter & search functionality
- ✅ Single-click approve/reject
- ✅ Batch operations
- ✅ Rejection modal with reason
- ✅ Responsive design

### Database
- ⏳ Migration SQL ready (`fix-database.sql`)
- ⏳ Need to run migration ← **YOU ARE HERE**

### Testing
- ⏳ Test upload → pending
- ⏳ Test thumbnail generation
- ⏳ Test watermark generation
- ⏳ Test admin approval
- ⏳ Test public display (approved only)

---

## 🚀 Next Action

**RUN THE MIGRATION!**

```sql
-- Copy this into MySQL Workbench:
USE special_stocks;

ALTER TABLE seller_images
ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS thumbnail_path VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS processing_status ENUM('processing', 'completed', 'failed') DEFAULT 'processing' NOT NULL;

CREATE INDEX IF NOT EXISTS idx_status ON seller_images(status);
CREATE INDEX IF NOT EXISTS idx_seller_status ON seller_images(seller_id, status);
```

**Then:**
1. Upload an image as seller
2. Approve it as admin
3. See it in public gallery
4. ✅ Done!

---

## 📚 Documentation Files

- **COMPLETE_STATUS.md** ← Start here
- **WORKFLOW_ALREADY_COMPLETE.md** ← Feature list
- **IMAGE_APPROVAL_WORKFLOW.md** ← Complete technical docs
- **IMAGE_APPROVAL_QUICKSTART.md** ← Quick setup
- **UPLOAD_FIX_NOW.md** ← Migration guide
- **This file** ← Visual guide

---

**Everything is ready! Just run the migration and test!** 🎉
