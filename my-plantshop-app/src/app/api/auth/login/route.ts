import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';

// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
    {
        id: '1',
        email: 'demo@plantshop.com',
        password: 'password123', // In real app, this would be hashed
        name: 'Demo User',
        role: 'customer'
    },
    {
        id: '2',
        email: 'admin@plantshop.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
    }
];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { email, password, rememberMe } = validationResult.data;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Find user
        const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user || user.password !== password) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // In a real app, you would:
        // 1. Hash the password and compare with stored hash
        // 2. Generate a JWT token or session
        // 3. Set secure HTTP-only cookies
        // 4. Return user data (without password)

        // Mock JWT token (in real app, use proper JWT library)
        const mockToken = `mock_jwt_${user.id}_${Date.now()}`;

        // Create response
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token: mockToken
        });

        // Set HTTP-only cookie for session management
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
            path: '/'
        };

        response.cookies.set('auth-token', mockToken, cookieOptions);

        return response;

    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
