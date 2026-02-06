# ✅ ADMIN LOGIN FIX - Complete Guide

## 🔴 **Problem:**
Admin credentials (`admin@stockmedia.com`) redirecting to Buyer Dashboard instead of Admin Dashboard.

## 🎯 **Root Cause:**
The user's `role` field in the database is set to `'buyer'` instead of `'admin'`.

---

## 🔧 **Solution - 3 Methods:**

### **Method 1: Run Node.js Script (Recommended)** ✅

1. **Navigate to server directory:**
```bash
cd server
```

2. **Run the fix script:**
```bash
node fix_admin_role.js
```

This will:
- Update all admin emails to have `role = 'admin'`
- Show all users and their current roles
- Display confirmation

**Admin Emails Updated:**
- `admin@stockmedia.com`
- `nisansalarasanjali512@gmail.com`
- `admin@example.com`

---

### **Method 2: Manual SQL Query**

1. **Connect to PostgreSQL:**
```bash
psql -U postgres -d your_database_name
```

2. **Run this query:**
```sql
UPDATE customers 
SET role = 'admin' 
WHERE email = 'admin@stockmedia.com';
```

3. **Verify:**
```sql
SELECT id, first_name, last_name, email, role 
FROM customers 
WHERE email = 'admin@stockmedia.com';
```

Should show:
```
 id | first_name | last_name |         email          | role
----+------------+-----------+----------------------+-------
  1 | Admin      | User      | admin@stockmedia.com | admin
```

---

### **Method 3: Using PGAdmin**

1. Open PGAdmin
2. Connect to your database
3. Navigate to: `Databases → your_db_name → Schemas → public → Tables → customers`
4. Right-click customers → View/Edit Data → All Rows
5. Find row with email `admin@stockmedia.com`
6. Change `role` column from `buyer` to `admin`
7. Save

---

## 🧪 **Testing:**

### **After Updating Database:**

1. **Clear Browser Data:**
   - Press `Ctrl + Shift + Delete`
   - Clear cookies and cached data
   - Or open Incognito/Private window

2. **Login Again:**
```
Email: admin@stockmedia.com
Password: 1234567
```

3. **Check Console Logs:**
Open Browser Console (F12) and look for:
```javascript
Login successful! User role: admin Email: admin@stockmedia.com
Redirecting to admin dashboard...
```

4. **Expected Result:**
- ✅ Redirected to `/dashboard` (Admin Dashboard)
- ✅ See "Admin Dashboard" title
- ✅ See admin features (Add Seller button, etc.)

---

## 🔍 **How Login Works:**

```
User Login (admin@stockmedia.com / 1234567)
    ↓
POST /api/customers/login
    ↓
Backend finds user in database
    ↓
Backend returns: { email, firstName, role: 'admin', ... }
    ↓
Frontend stores role in localStorage
    ↓
Frontend checks role:
    - If role === 'admin' → /dashboard
    - If role === 'seller' → /seller-dashboard  
    - Else → /buyer-dashboard
```

---

## 📝 **Backend Response Format:**

**Current Login Response:**
```json
{
  "id": 1,
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@stockmedia.com",
  "role": "admin",  ← THIS IS KEY!
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ⚠️ **Common Issues:**

### **Issue 1: Still redirecting to buyer dashboard**
**Solution:**
- Clear browser cache completely
- Check localStorage in DevTools (F12 → Application → Local Storage)
- Delete `userRole` key from localStorage
- Login again

### **Issue 2: Role still shows 'buyer' in database**
**Solution:**
- Verify you're running the script/query on the correct database
- Check if email is exactly `admin@stockmedia.com` (case-sensitive)
- Run: `SELECT * FROM customers WHERE LOWER(email) = 'admin@stockmedia.com';`

### **Issue 3: Script fails to run**
**Solution:**
- Check `.env` file has correct DB credentials
- Ensure PostgreSQL is running
- Check that `pg` package is installed: `npm install pg`

---

## 🎯 **Quick Checklist:**

- [ ] Database role updated to 'admin'
- [ ] Browser cache cleared
- [ ] Logged in with admin credentials
- [ ] Console shows "User role: admin"
- [ ] Redirected to `/dashboard`
- [ ] See Admin Dashboard interface

---

## 🚀 **Quick Fix Commands:**

```bash
# Navigate to server directory
cd server

# Run the fix
node fix_admin_role.js

# You should see:
# ✅ Updated admin@stockmedia.com to admin role
# ✅ Admin roles updated successfully!
```

Then test login!

---

## 📊 **Database Schema:**

Make sure your database has this structure:

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'buyer',  -- 'admin', 'seller', or 'buyer'
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ✅ **Expected Roles:**

| Email | Password | Role | Dashboard |
|-------|----------|------|-----------|
| admin@stockmedia.com | 1234567 | admin | /dashboard |
| nisansalarasanjali512@gmail.com | (yours) | admin | /dashboard |
| seller@example.com | (any) | seller | /seller-dashboard |
| buyer@example.com | (any) | buyer | /buyer-dashboard |

---

## 🔧 **Files Created:**

1. **`server/fix_admin_role.js`** - Automated fix script
2. **`server/update_admin_role.sql`** - Manual SQL queries
3. **This guide** - Complete documentation

---

## ✅ **Final Test:**

1. Run: `node fix_admin_role.js`
2. Clear browser cache
3. Login with `admin@stockmedia.com / 1234567`
4. Should go to Admin Dashboard (`/dashboard`)

---

**Status: ✅ FIX READY - Run the script and test!** 🎉
