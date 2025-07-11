import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // In a real app, you would:
        // 1. Verify the JWT token
        // 2. Check if token is blacklisted
        // 3. Get user data from database

        // Mock verification (extract user ID from mock token)
        if (!token.startsWith('mock_jwt_')) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const userId = token.split('_')[2];

        // Mock user data - in real app, fetch from database
        const mockUser = {
            id: userId,
            email: userId === '1' ? 'demo@plantshop.com' : 'admin@plantshop.com',
            name: userId === '1' ? 'Demo User' : 'Admin User',
            role: userId === '1' ? 'customer' : 'admin'
        };

        return NextResponse.json({
            success: true,
            user: mockUser
        });

    } catch (error) {
        console.error('Auth check API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
