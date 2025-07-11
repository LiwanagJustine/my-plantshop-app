import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // In a real app, you might want to:
        // 1. Blacklist the JWT token
        // 2. Clear session from database
        // 3. Log the logout event

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
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
