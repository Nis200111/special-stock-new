# 🔧 Troubleshooting Upload Errors

## Error: "Connection failed try again later"

This error means the frontend can't reach the backend. Here's how to fix it:

---

## ✅ **Step-by-Step Fix:**

### **1. Check if Backend is Running**
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

**If nothing shows**: Backend is NOT running
**If you see output**: Backend IS running

---

### **2. Restart Backend** (If needed)
```powershell
# Kill all node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Navigate to server folder
cd f:\nisansala-E-folder\new-special-stock-my\special-stock-new\server

# Start server
npm run dev
```

**Wait for**:
```
✓ Database synced successfully
✓ Server is running on port 5000
```

---

### **3. Test Backend API**

**Open browser and go to**:
```
http://localhost:5000/api/seller/check-role
```

**Should see**:
```json
{
  "success": false,
  "message": "Authentication required"
}
```

If you see this, backend is working! ✅

---

### **4. Check Browser Console**

1. Open upload page: `http://localhost:3000/seller-dashboard/upload`
2. Press `F12` to open DevTools
3. Go to "Console" tab
4. Try uploading an image
5. Look for errors in red

**Common Errors**:
- `Failed to fetch` → Backend not running
- `CORS error` → Backend needs CORS configured
- `401 Unauthorized` → Login again

---

### **5. Verify File Upload**

**Backend terminal should show**:
```
POST /api/seller/upload-image
```

**If you see error in backend**:
- Check the error message
- Look for "Error uploading image:"
- Copy the full error and send it

---

## 🎯 **Quick Test Upload:**

### **Step 1**: Login as Seller
```
Email: testseller@example.com
Password: test123
```

### **Step 2**: Go to Upload
```
http://localhost:3000/seller-dashboard/upload
```

### **Step 3**: Upload Image
1. Click "Select Image"
2. Choose any image (< 10MB)
3. Fill form:
   - Title: "Test Image"
   - Price: 5
4. Click "Upload Image"

### **Step 4**: Check Result
- ✅ Success → Should redirect to dashboard
- ❌ Error → Check browser console (F12)

---

## 🐛 **Common Issues & Fixes:**

### **Issue 1: Port Already in Use**
**Error**: `EADDRINUSE: address already in use :::5000`

**Fix**:
```powershell
Get-Process -Name node | Stop-Process -Force
npm run dev
```

---

### **Issue 2: Module Not Found**
**Error**: `Cannot find module 'sharp'` or `'multer'`

**Fix**:
```powershell
cd server
npm install sharp multer
```

---

### **Issue 3: Database Error**
**Error**: `Database sync failed`

**Fix**:
1. Check if MySQL is running
2. Verify database credentials in `.env`
3. Restart backend

---

### **Issue 4**: CORS Error
**Error**: Browser shows CORS policy error

**Fix**: Already fixed in `server/src/app.js` with `cors()`

---

### **Issue 5: File Too Large**
**Error**: "File size must be less than 10MB"

**Fix**: Use smaller image or increase limit in:
- `server/routes/seller.js` → `fileSize: 10 * 1024 * 1024`
- `frontend/upload/page.jsx` → file validation

---

##Process checklist:

**Before uploading**:
- [ ] Backend server running (port 5000)
- [ ] Frontend server running  (port 3000)
- [ ] Logged in as seller
- [ ] On upload page

**During upload**:
- [ ] Image selected (< 10MB)
- [ ] Title filled
- [ ] Price filled
- [ ] Click "Upload Image"

**After upload**:
- [ ] Check backend terminal for logs
- [ ] Check browser console (F12)
- [ ] Check for success/error message

---

## 📝 **Get Detailed Error Info:**

**Backend logs**:
Look for these in backend terminal:
```
Error uploading image: [error details]
Error stack: [stack trace]
```

**Frontend logs**:
Browser console (F12) → Console tab:
```
Upload error: [error details]
```

---

## 🆘 **Still Not Working?**

### **Check:**
1. Is MySQL running?
2. Is `seller_images` table created?
3. Is `/uploads` folder exists?
4. Is `/uploads/watermarked` folder exists?

### **Create folders manually**:
```powershell
cd server
mkdir uploads
mkdir uploads\watermarked
```

---

## ✅ **Expected Behavior:**

**Upload Success Flow**:
```
1. Click "Upload Image"
2. Shows "Uploading..." with spinner
3. Backend creates watermarked version
4. Saves to database
5. Shows "Image Uploaded Successfully!"
6. Redirects to dashboard after 2 seconds
```

**Backend logs**:
```
POST /api/seller/upload-image 200
(no errors)
```

---

## 📂 **Check File Structure:**
```
server/
  ├── uploads/               ← Should exist
  │   ├── image-123.jpg      ← Original files here
  │   └── watermarked/       ← Should exist
  │       └── watermarked-image-123.jpg
  ├── routes/
  │   └── seller.js
  └── src/
      └── models/
          └── sellerImage.model.js
```

---

**If still having issues, send me:**
1. Backend terminal output (full error)
2. Browser console output (F12 → Console)
3. Screenshot of error message

**I'll help you fix it!** 🚀
