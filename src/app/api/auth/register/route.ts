import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { z } from 'zod';

// Validation schema for registration
const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Registration request received:', { ...body, password: '***' });

        // Validate request body
        const validationResult = registerSchema.safeParse(body);
        if (!validationResult.success) {
            console.log('Validation failed:', validationResult.error.issues);
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { name, email, password } = validationResult.data;

        // Get database client
        const client = await pool.connect();

        try {
            // Check if user already exists
            const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
            const existingUserResult = await client.query(existingUserQuery, [email.toLowerCase()]);

            if (existingUserResult.rows.length > 0) {
                return NextResponse.json(
                    { error: 'User with this email already exists' },
                    { status: 409 }
                );
            }

            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user with user_role defaulting to 'customer'
            const insertUserQuery = `
                INSERT INTO users (name, email, password_hash, user_role, created_at) 
                VALUES ($1, $2, $3, $4, NOW()) 
                RETURNING id, name, email, user_role, created_at
            `;
            console.log('Inserting user with:', { name, email: email.toLowerCase(), user_role: 'customer' });
            const insertResult = await client.query(insertUserQuery, [
                name,
                email.toLowerCase(),
                hashedPassword,
                'customer'
            ]);

            const newUser = insertResult.rows[0];
            console.log('User created successfully:', { id: newUser.id, email: newUser.email, role: newUser.user_role });

            // Return success WITHOUT auto-login (no JWT token or cookie)
            return NextResponse.json({
                success: true,
                message: 'Account created successfully. Please log in with your credentials.',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.user_role,
                    createdAt: newUser.created_at
                }
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Register API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}