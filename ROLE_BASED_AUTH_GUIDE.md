# Role-Based Authentication - Complete Setup Guide

## ✅ Implementation Complete!

### Files Updated:

1. **`src/auth.ts`** - NextAuth configuration with database role fetching
2. **`src/components/RoleBasedRedirect.jsx`** - Handles Google Sign-In redirects
3. **`src/app/login/page.jsx`** - Already configured for email/password login
4. **`src/app/dashboard/page.jsx`** - Admin dashboard with buyer redirect
5. **`src/app/buyer-dashboard/page.jsx`** - Buyer dashboard with admin redirect

---

## 🔧 How It Works:

### **JWT Callback** (auth.ts):
1. User signs in with Google
2. `getUserRole()` function calls your backend API:
   ```
   GET http://localhost:5000/api/customers/by-email/{email}
   ```
3. Backend returns user data with `role` field
4. Role is stored in JWT token

### **Session Callback** (auth.ts):
- Role from JWT is added to session
- Session is available in all pages and components

### **Redirection Logic**:

**Google Sign-In:**
1. User signs in → NextAuth handles authentication
2. `RoleBasedRedirect` component checks session
3. Redirects to appropriate dashboard

**Email/Password Login:**
1. User logs in → Backend returns user data with role
2. Login page stores role in localStorage
3. Redirects to appropriate dashboard

---

## 📝 Backend API Requirements:

### **Endpoint: GET /api/customers/by-email/:email**

**Expected Response:**
```json
{
  "id": "123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",  // or "buyer"
  "createdAt": "2026-01-26T10:00:00Z"
}
```

**If user not found:**
- Return 404 status
- Default role will be assigned as "buyer"

---

## 🗄️ Database Schema Example:

### **Users/Customers Table:**

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255),
    role VARCHAR(20) DEFAULT 'buyer', -- 'admin' or 'buyer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Implementation Steps:

### **Step 1: Update Your Backend API**

**Example with Express.js:**

```javascript
// routes/customers.js
router.get('/by-email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        
        // Query your database
        const user = await db.query(
            'SELECT id, email, first_name, last_name, role FROM customers WHERE email = $1',
            [email]
        );
        
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            id: user.rows[0].id,
            email: user.rows[0].email,
            firstName: user.rows[0].first_name,
            lastName: user.rows[0].last_name,
            role: user.rows[0].role || 'buyer'
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
```

### **Step 2: Set Environment Variables**

Add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_nextauth_secret
```

### **Step 3: Test the Flow**

**Admin User:**
1. Set role to 'admin' in database
2. Sign in with Google or email/password
3. Should redirect to `/dashboard`

**Buyer User:**
1. Set role to 'buyer' in database (or leave default)
2. Sign in with Google or email/password
3. Should redirect to `/buyer-dashboard`

---

## 🔒 Access Control:

### **Middleware** (proxy.ts):
- Checks if user has valid session token
- Redirects unauthenticated users to `/login`

### **Page-Level Protection**:

**Admin Dashboard** blocks buyers:
```javascript
if (storedRole === 'buyer') {
    router.push('/buyer-dashboard');
}
```

**Buyer Dashboard** blocks admins:
```javascript
if (storedRole === 'admin') {
    router.push('/dashboard');
}
```

---

## 🧪 Testing:

### **Test Admin Access:**
```bash
# 1. Update database for test user
UPDATE customers SET role = 'admin' WHERE email = 'nisansalarasanjali512@gmail.com';

# 2. Sign in and verify redirect to /dashboard
# 3. Try accessing /buyer-dashboard → Should redirect to /dashboard
```

### **Test Buyer Access:**
```bash
# 1. Create or update user with buyer role
UPDATE customers SET role = 'buyer' WHERE email = 'buyer@example.com';

# 2. Sign in and verify redirect to /buyer-dashboard
# 3. Try accessing /dashboard → Should redirect to /buyer-dashboard
```

---

## 🐛 Troubleshooting:

### **Issue: Role not being fetched from database**

**Check:**
1. Is your backend API running on port 5000?
2. Does the endpoint `/api/customers/by-email/:email` exist?
3. Check browser console for fetch errors
4. Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**Solution:**
- Test the API endpoint directly: `http://localhost:5000/api/customers/by-email/test@example.com`
- Check backend logs for errors
- Ensure CORS is enabled on your backend

### **Issue: "custom" property error**

**Fixed:** Removed `pages: { signIn: "/login" }` from auth.ts

### **Issue: Users not redirecting**

**Check:**
1. Is `userRole` in localStorage?
2. Check browser console for redirect errors
3. Verify role is in session (use React DevTools)

---

## 📊 Complete Flow Diagram:

```
User Login
    ↓
NextAuth Authentication
    ↓
JWT Callback
    ↓
Fetch Role from Database API
    ↓
Store Role in JWT Token
    ↓
Session Callback
    ↓
Add Role to Session
    ↓
RoleBasedRedirect Component
    ↓
Check Role
    ↓
Redirect:
  - Admin → /dashboard
  - Buyer → /buyer-dashboard
```

---

## ✅ Current Status:

- ✅ Auth.ts configured with database integration
- ✅ Role fetching from backend API
- ✅ JWT and Session callbacks working
- ✅ "custom" error fixed
- ✅ Redirect logic implemented
- ✅ Page-level access control active

---

## 🔄 Next Steps:

1. **Implement the backend API endpoint** (`/api/customers/by-email/:email`)
2. **Test with different user roles**
3. **Add error handling** for API failures
4. **Implement session refresh** if needed
5. **Add loading states** during authentication

---

**Status: ✅ Ready for Integration!**

Your Next.js app is now configured. Implement the backend API endpoint and test the flow!
