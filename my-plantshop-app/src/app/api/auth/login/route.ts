import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Login attempt for email:', body.email);

        // Validate request body
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            console.log('Login validation failed:', validationResult.error.issues);
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { email, password, rememberMe } = validationResult.data;

        // Get database client
        const client = await pool.connect();

        try {
            // Find user in database with user_role column
            const userQuery = 'SELECT id, email, name, password_hash, user_role, created_at FROM users WHERE email = $1';
            const userResult = await client.query(userQuery, [email.toLowerCase()]);

            if (userResult.rows.length === 0) {
                console.log('User not found:', email);
                return NextResponse.json(
                    { error: 'Invalid email or password' },
                    { status: 401 }
                );
            }

            const user = userResult.rows[0];
            console.log('User found:', { id: user.id, email: user.email, name: user.name, role: user.user_role });

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                console.log('Invalid password for user:', email);
                return NextResponse.json(
                    { error: 'Invalid email or password' },
                    { status: 401 }
                );
            }

            // Use user_role from database instead of email-based determination
            const role = user.user_role;
            console.log('User role from database:', role);

            // Generate JWT token
            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET is not configured');
                throw new Error('JWT_SECRET is not configured');
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: rememberMe ? '30d' : '1d'
                }
            );

            console.log('JWT token generated successfully for user:', user.id);

            // Create response with role information
            const response = NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: role
                },
                token: token
            });

            // Set HTTP-only cookie for session management
            const cookieOptions = {
                httpOnly: true,
                secure: false, // Set to false for localhost development
                sameSite: 'lax' as const,
                maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
                path: '/'
            };

            response.cookies.set('auth-token', token, cookieOptions);
            console.log('🔥 Cookie set with options:', cookieOptions);

            console.log('Login successful for user:', { id: user.id, email: user.email, role: role });
            return response;

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}