import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

// GET - Fetch user's wishlist items
export async function GET(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        const client = await pool.connect();

        try {
            // Fetch wishlist items with plant details
            const query = `
                SELECT 
                    w.id as wishlist_id,
                    w.plant_name,
                    w.added_at,
                    p.id as plant_id,
                    p.name,
                    p.scientific_name,
                    p.price,
                    p.original_price,
                    p.image,
                    p.in_stock,
                    p.stock_quantity,
                    p.rating,
                    p.review_count,
                    p.is_on_sale
                FROM wishlist w
                JOIN plants p ON w.plant_id = p.id
                WHERE w.user_id = $1
                ORDER BY w.added_at DESC
            `;

            const result = await client.query(query, [decoded.userId]);

            return NextResponse.json({
                success: true,
                count: result.rows.length,
                data: result.rows
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error fetching wishlist:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST - Add item to wishlist
export async function POST(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        const body = await request.json();

        const { plantId } = body;

        if (!plantId) {
            return NextResponse.json(
                { error: 'Plant ID is required' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            // Check if plant exists
            const plantQuery = 'SELECT id, name FROM plants WHERE id = $1';
            const plantResult = await client.query(plantQuery, [plantId]);

            if (plantResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Plant not found' },
                    { status: 404 }
                );
            }

            const plant = plantResult.rows[0];

            // Check if item already exists in wishlist
            const existingQuery = `
                SELECT id FROM wishlist 
                WHERE user_id = $1 AND plant_id = $2
            `;
            const existingResult = await client.query(existingQuery, [decoded.userId, plantId]);

            if (existingResult.rows.length > 0) {
                return NextResponse.json(
                    { error: 'Plant already in wishlist' },
                    { status: 400 }
                );
            }

            // Insert new wishlist item with plant name
            const insertQuery = `
                INSERT INTO wishlist (user_id, plant_id, plant_name)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const result = await client.query(insertQuery, [decoded.userId, plantId, plant.name]);

            return NextResponse.json({
                success: true,
                message: `${plant.name} added to wishlist`,
                data: result.rows[0]
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error adding to wishlist:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// DELETE - Remove item from wishlist
export async function DELETE(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        const { searchParams } = new URL(request.url);
        const plantId = searchParams.get('plantId');

        if (!plantId) {
            return NextResponse.json(
                { error: 'Plant ID is required' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            // Delete wishlist item (ensure it belongs to the user)
            const deleteQuery = `
                DELETE FROM wishlist 
                WHERE user_id = $1 AND plant_id = $2
                RETURNING *
            `;
            const result = await client.query(deleteQuery, [decoded.userId, plantId]);

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Item not found in wishlist' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Item removed from wishlist'
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error removing from wishlist:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
