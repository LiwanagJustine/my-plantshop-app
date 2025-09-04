import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log(`🔥 MIDDLEWARE RUNNING: ${pathname}`);

    // Protect admin routes - redirect to login if not authenticated
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            console.log('🚫 No auth token found, redirecting to login');
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // Allow dashboard routes for backward compatibility (will redirect to admin)
    if (pathname.startsWith('/dashboard')) {
        const newPath = pathname.replace('/dashboard', '/admin');
        console.log(`📍 Redirecting ${pathname} to ${newPath}`);
        return NextResponse.redirect(new URL(newPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and api routes  
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
    ],
};
