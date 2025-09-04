import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

// GET - Fetch user's cart items
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
            // Fetch cart items with plant details
            const query = `
                SELECT 
                    c.id as cart_id,
                    c.plant_name,
                    c.quantity,
                    c.added_at,
                    p.id as plant_id,
                    p.name,
                    p.scientific_name,
                    p.price,
                    p.image,
                    p.in_stock,
                    p.stock_quantity
                FROM cart c
                JOIN plants p ON c.plant_id = p.id
                WHERE c.user_id = $1
                ORDER BY c.added_at DESC
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
        console.error('🚨 Error fetching cart:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST - Add item to cart
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

        const { plantId, quantity = 1 } = body;

        if (!plantId) {
            return NextResponse.json(
                { error: 'Plant ID is required' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            // Check if plant exists and is in stock
            const plantQuery = 'SELECT id, name, in_stock, stock_quantity FROM plants WHERE id = $1';
            const plantResult = await client.query(plantQuery, [plantId]);

            if (plantResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Plant not found' },
                    { status: 404 }
                );
            }

            const plant = plantResult.rows[0];
            if (!plant.in_stock) {
                return NextResponse.json(
                    { error: 'Plant is out of stock' },
                    { status: 400 }
                );
            }

            if (plant.stock_quantity < quantity) {
                return NextResponse.json(
                    { error: `Only ${plant.stock_quantity} items available` },
                    { status: 400 }
                );
            }

            // Check if item already exists in cart
            const existingQuery = `
                SELECT id, quantity FROM cart 
                WHERE user_id = $1 AND plant_id = $2
            `;
            const existingResult = await client.query(existingQuery, [decoded.userId, plantId]);

            let result;
            if (existingResult.rows.length > 0) {
                // Update existing cart item
                const newQuantity = existingResult.rows[0].quantity + quantity;
                if (newQuantity > plant.stock_quantity) {
                    return NextResponse.json(
                        { error: `Maximum ${plant.stock_quantity} items can be added` },
                        { status: 400 }
                    );
                }

                const updateQuery = `
                    UPDATE cart 
                    SET quantity = $1, added_at = CURRENT_TIMESTAMP
                    WHERE id = $2
                    RETURNING *
                `;
                result = await client.query(updateQuery, [newQuantity, existingResult.rows[0].id]);
            } else {
                // Insert new cart item with plant name
                const insertQuery = `
                    INSERT INTO cart (user_id, plant_id, plant_name, quantity)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *
                `;
                result = await client.query(insertQuery, [decoded.userId, plantId, plant.name, quantity]);
            }

            return NextResponse.json({
                success: true,
                message: `${plant.name} added to cart`,
                data: result.rows[0]
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error adding to cart:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// DELETE - Remove item from cart
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
        const cartId = searchParams.get('cartId');

        if (!cartId) {
            return NextResponse.json(
                { error: 'Cart ID is required' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            // Delete cart item (ensure it belongs to the user)
            const deleteQuery = `
                DELETE FROM cart 
                WHERE id = $1 AND user_id = $2
                RETURNING *
            `;
            const result = await client.query(deleteQuery, [cartId, decoded.userId]);

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Cart item not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Item removed from cart'
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error removing from cart:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
