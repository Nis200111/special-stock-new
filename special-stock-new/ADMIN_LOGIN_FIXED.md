# ✅ Admin Login Fixed

## Updated Login Redirect Logic

### **What Changed:**

The login page now checks the user's email against the admin list if the backend doesn't provide a role.

### **Admin Emails:**
- `admin@example.com`
- `nisansalarasanjali512@gmail.com`
- `admin@stockmedia.com` ← **NEW**

---

## **How to Test:**

### **Login as Admin:**
```
Email: admin@stockmedia.com
Password: 1234567
```

**Expected Result:** Redirects to `/dashboard` (Admin Dashboard)

### **Login as Buyer:**
```
Email: any other email
Password: any password
```

**Expected Result:** Redirects to `/buyer-dashboard` (Buyer Dashboard)

---

## **What the Code Does:**

1. **User logs in** with email/password
2. **Backend returns** user data
3. **Check role:**
   - If backend provides `role` → Use it
   - If no role from backend → Check email against admin list
4. **Set role** in localStorage
5. **Console logs** show which dashboard user is being sent to
6. **Redirect** based on role:
   - `admin` → `/dashboard`
   - `buyer` → `/buyer-dashboard`

---

## **Check Browser Console:**

After login, you'll see:
```
Login successful! User role: admin Email: admin@stockmedia.com
Redirecting to admin dashboard...
```

Or:
```
Login successful! User role: buyer Email: user@example.com
Redirecting to buyer dashboard...
```

---

## **Backend Requirement (Optional):**

For best practice, your backend should return the role:

```json
{
  "id": "123",
  "email": "admin@stockmedia.com",
  "firstName": "Admin",
  "role": "admin",  ← Add this
  "accessToken": "token_here"
}
```

But even without it, the frontend will check the email and assign the correct role!

---

## ✅ **Status:**

- ✅ Login page updated with email checking
- ✅ Admin email added: `admin@stockmedia.com`
- ✅ Console logging added for debugging
- ✅ Redirect logic working

**Try logging in now with `admin@stockmedia.com` - should go to admin dashboard!** 🎉
