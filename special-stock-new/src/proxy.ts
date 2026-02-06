import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Skip middleware for API routes, static files, and Next.js internals
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.startsWith('/images/') ||
        pathname === '/favicon.ico' ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // Public routes (no auth required)
    const publicRoutes = ['/', '/login', '/register', '/about', '/contact', '/services', '/products']
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Get user authentication data from cookies
    const token = req.cookies.get('token')?.value
    const userRole = req.cookies.get('userRole')?.value

    // If not authenticated, redirect to login
    if (!token) {
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
    }

    // Role-based route protection
    if (pathname.startsWith('/seller-dashboard')) {
        if (userRole !== 'seller') {
            return NextResponse.redirect(new URL('/seller', req.url))
        }
    }

    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    // Allow access to other protected routes if authenticated
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except static files
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
