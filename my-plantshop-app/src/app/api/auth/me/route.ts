import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        console.log('🔥 /api/auth/me called');

        // Get the token from cookie first
        let token = request.cookies.get('auth-token')?.value;
        console.log('🔥 Token from cookie:', token ? 'present' : 'missing');

        // If no cookie token, try Authorization header (for localStorage fallback)
        if (!token) {
            const authHeader = request.headers.get('authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
                console.log('🔥 Token from Authorization header:', token ? 'present' : 'missing');
            }
        }

        if (!token) {
            console.log('🚨 No token provided in cookie or header');
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            );
        }

        // Verify JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        console.log('🔥 Token decoded successfully for user:', decoded.userId);

        // Get user from database
        const client = await pool.connect();

        try {
            const userQuery = 'SELECT id, email, name, user_role, created_at FROM users WHERE id = $1';
            const userResult = await client.query(userQuery, [decoded.userId]);

            if (userResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const user = userResult.rows[0];

            // Use user_role from database
            const role = user.user_role;

            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: role
                }
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}