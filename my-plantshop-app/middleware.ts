import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value;

    // Public routes that don't require authentication
    const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/customer', '/profile', '/orders'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // If accessing a protected route without a token, redirect to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If accessing auth pages while already authenticated, redirect to dashboard
    if (isPublicRoute && token && pathname !== '/auth/logout') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and api routes
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
    ],
};
