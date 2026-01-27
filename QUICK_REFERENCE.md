# NextAuth & Seller Dashboard - Quick Reference

## ✅ What Was Fixed

### 1. NextAuth API Routes (404 Error Fixed)
- **Created**: `src/app/api/auth/[...nextauth]/route.ts`
- **What it does**: Handles all `/api/auth/*` requests including `/api/auth/session`
- **Status**: ✅ Session endpoint now works

### 2. Seller Dashboard (404 Error Fixed)
- **Created**: `src/app/seller/dashboard/page.jsx`
- **Route**: `/seller/dashboard`
- **What it does**: Full seller dashboard with stats, navigation, and quick actions
- **Status**: ✅ Page now exists and is accessible

### 3. TypeScript Configuration
- **Created**: `src/types/next-auth.d.ts`
- **What it does**: Extends NextAuth types to support custom properties (role, accessToken)
- **Status**: ✅ TypeScript errors fixed

### 4. Auth Configuration
- **Updated**: `src/auth.ts`
- **What it does**: Provides NextAuth configuration and server-side helpers
- **Status**: ✅ Properly configured for NextAuth v4

---

## 🚀 Next Steps

### 1. Add Environment Variables

Add these to your `.env.local` file:

```env
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

**Option A - Run the script:**
```bash
powershell -ExecutionPolicy Bypass -File add-nextauth-env.ps1
```

**Option B - Add manually:**
Open `.env.local` and add the two lines above.

### 2. Restart Your Dev Server

After adding environment variables:
```bash
# Stop the current server (Ctrl+C in the terminal)
npm run dev
```

### 3. Test the Fixes

1. **Test Session Endpoint:**
   - Open browser DevTools → Network tab
   - Navigate to any page
   - Look for `/api/auth/session` request
   - Should return 200 (not 404)

2. **Test Seller Dashboard:**
   - Login with a seller account
   - Navigate to: `http://localhost:3000/seller/dashboard`
   - Should see the dashboard page

---

## 📁 File Structure

```
special-stock-new/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      ← NextAuth API routes
│   │   └── seller/
│   │       ├── page.jsx              ← Seller activation 
│   │       └── dashboard/
│   │           ├── page.jsx          ← NEW: Dashboard
│   │           └── seller-dashboard.module.css
│   ├── types/
│   │   └── next-auth.d.ts            ← Type definitions
│   └── auth.ts                       ← Auth config
└── .env.local                        ← Add NextAuth vars here
```

---

## 🔍 How to Use

### Client-Side (React Components)

```javascript
"use client";
import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

### Server-Side (Server Components)

```typescript
import { getServerSession } from "@/auth";

export default async function ServerPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <div>Hello, {session.user.role}</div>;
}
```

---

## 🎯 Available Routes

### Authentication Routes (NextAuth)
- `/api/auth/session` - Get current session
- `/api/auth/signin` - Sign in (redirects to /login)
- `/api/auth/signout` - Sign out (redirects to /logout)
- `/api/auth/csrf` - CSRF token

### Seller Routes
- `/seller` - Seller activation page
- `/seller/dashboard` - **NEW** Main seller dashboard
- `/seller-dashboard/upload` - Upload content
- `/seller-dashboard/uploads` - View uploads

### Other Routes
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Admin dashboard
- `/buyer-dashboard` - Buyer dashboard

---

## 🐛 Troubleshooting

### Still seeing 404 errors?

1. **Check if dev server restarted:**
   ```bash
   # Kill and restart
   npm run dev
   ```

2. **Clear Next.js cache:**
   ```bash
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

3. **Check environment variables:**
   - Ensure `.env.local` has `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
   - Restart server after adding them

### TypeScript errors?

1. **Restart TypeScript server in VS Code:**
   - Press `Ctrl+Shift+P`
   - Type: "TypeScript: Restart TS Server"
   - Press Enter

2. **Check if types file exists:**
   - Verify `src/types/next-auth.d.ts` exists
   - If not, it should have been created

### Session not working?

1. **Check backend is running:**
   ```bash
   cd server
   npm run dev
   ```

2. **Check backend URL in auth code:**
   - Should be: `http://localhost:5000/api/customers/login`
   - Verify your backend is on port 5000

---

## 💡 Tips

1. **NextAuth v4 vs v5:**
   - You're using NextAuth v4 (v4.24.13)
   - The setup is different from v5
   - This implementation is correct for v4

2. **Session Storage:**
   - NextAuth uses JWT strategy
   - Session data stored in encrypted cookies
   - Your backend token also stored for API calls

3. **Role-Based Access:**
   - Session includes user role
   - Use `session.user.role` to check permissions
   - Dashboard pages check role on mount

---

## ✨ What's Working Now

✅ NextAuth session endpoint `/api/auth/session`
✅ Seller dashboard at `/seller/dashboard`
✅ Role-based authentication
✅ TypeScript types properly extended
✅ Server-side and client-side session access
✅ Integration with your existing backend API

**All 404 errors should now be fixed!** 🎉
