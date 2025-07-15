import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Create response
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });

        // Clear the auth cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            maxAge: 0, // Expire immediately
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Logout API error:', error);

        // Even if there's an error, clear the cookie
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });

        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            maxAge: 0,
            path: '/'
        });

        return response;
    }
}
