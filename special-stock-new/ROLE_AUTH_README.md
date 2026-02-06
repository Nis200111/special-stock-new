# Role-Based Authentication Setup

## Overview
This project uses NextAuth v5 with role-based authentication. Users are automatically redirected based on their role:
- **Admins** → `/dashboard`
- **Buyers** → `/buyer-dashboard`

## Features Implemented

### 1. **auth.ts** - Authentication Configuration
- ✅ JWT callback: Adds user role to token
- ✅ Session callback: Passes role to session object
- ✅ Redirect callback: Routes users based on role after login

### 2. **middleware.ts** - Route Protection
- ✅ Protects all routes except public ones
- ✅ Redirects unauthenticated users to login
- ✅ Prevents buyers from accessing admin dashboard
- ✅ Prevents admins from accessing buyer dashboard

### 3. **useUserRole Hook** - Easy Role Access
Custom React hook for accessing user role in components

## How It Works

### Role Assignment
Currently, roles are assigned based on email in `auth.ts`:

```typescript
const adminEmails = ['admin@example.com', 'nisansalarasanjali512@gmail.com'];
token.role = adminEmails.includes(user.email || '') ? 'admin' : 'buyer';
```

**To connect to your database:**

Replace the role assignment in `auth.ts` with your database query:

```typescript
// Example with Prisma
const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { role: true }
});
token.role = dbUser?.role || 'buyer';
```

### Using the Role in Components

```typescript
import { useUserRole } from '@/hooks/useUserRole'

export default function MyComponent() {
    const { role, isAdmin, isBuyer, isLoading } = useUserRole()
    
    if (isLoading) return <div>Loading...</div>
    
    if (isAdmin) {
        return <div>Admin Content</div>
    }
    
    return <div>Buyer Content</div>
}
```

### Server-side Role Check

```typescript
import { auth } from '@/auth'

export default async function ServerComponent() {
    const session = await auth()
    const userRole = session?.user?.role
    
    if (userRole === 'admin') {
        // Show admin content
    }
}
```

## Route Protection

The middleware automatically protects these routes:
- `/dashboard` - Admin only
- `/buyer-dashboard` - Buyer only

### Adding More Protected Routes

Edit `middleware.ts` to add more role-based restrictions:

```typescript
// Example: Protect /admin/* routes
if (userRole === 'buyer' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/buyer-dashboard', req.url))
}
```

## Testing

### Admin Login
Use email: `nisansalarasanjali512@gmail.com` or `admin@example.com`
- Will redirect to `/dashboard`

### Buyer Login
Use any other Google account
- Will redirect to `/buyer-dashboard`

## Files Modified/Created

1. ✅ `src/auth.ts` - Authentication config with roles
2. ✅ `src/middleware.ts` - Route protection
3. ✅ `src/hooks/useUserRole.ts` - Custom hook for role access
4. ✅ `src/app/buyer-dashboard/page.jsx` - Buyer dashboard

## Next Steps

1. **Connect to Database**:
   - Update the role assignment in `auth.ts` to fetch from your database
   - Store user roles in your database schema

2. **Add Role to User Model**:
   ```prisma
   model User {
       id    String @id @default(cuid())
       email String @unique
       role  String @default("buyer") // "admin" or "buyer"
   }
   ```

3. **Update Registration**:
   - When users register, set their default role to "buyer"
   - Create an admin panel to change user roles

## Troubleshooting

### Users not redirecting correctly?
- Check the `adminEmails` array in `auth.ts`
- Ensure the email matches exactly

### Middleware not working?
- Make sure `middleware.ts` is in the `src` folder
- Check the `matcher` config in middleware

### Role not showing in session?
- Clear browser cookies and sign in again
- Check browser dev tools → Application → Cookies
