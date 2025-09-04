import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

// Helper to get ID from URL
function getIdFromRequest(request: NextRequest) {
    const urlParts = request.url.split('/');
    return urlParts[urlParts.length - 2] === '[id]'
        ? urlParts[urlParts.length - 1]
        : urlParts[urlParts.length - 2];
}

// GET - Fetch single product
export async function GET( request: NextRequest) {
     const id = getIdFromRequest(request);
    try {
        const client = await pool.connect();

        const query = `
            SELECT 
                id,
                name,
                scientific_name,
                price,
                original_price,
                category,
                care_level,
                light_requirement,
                water_frequency,
                size,
                description,
                image,
                in_stock,
                stock_quantity,
                rating,
                review_count,
                features,
                is_popular,
                is_on_sale,
                created_at,
                updated_at
            FROM plants 
            WHERE id = $1
        `;

        const result = await client.query(query, [id]);
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch product'
            },
            { status: 500 }
        );
    }
}

// PUT - Update product (admin only)
export async function PUT(request: NextRequest) {
    const id = getIdFromRequest(request);
    try {
        // Check authentication
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token and check if user is admin
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        const client = await pool.connect();

        try {
            // Check if user is admin by checking user_role
            const userQuery = 'SELECT email, user_role FROM users WHERE id = $1';
            const userResult = await client.query(userQuery, [decoded.userId]);

            if (userResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const user = userResult.rows[0];
            if (user.user_role !== 'admin') {
                return NextResponse.json(
                    { error: 'Admin access required' },
                    { status: 403 }
                );
            }

            // Parse request body
            const body = await request.json();
            const {
                name,
                scientificName,
                price,
                originalPrice,
                category,
                careLevel,
                lightRequirement,
                waterFrequency,
                size,
                description,
                image,
                stockQuantity,
                features,
                isPopular,
                isOnSale
            } = body;

            // Update product
            const updateQuery = `
                UPDATE plants SET
                    name = $1,
                    scientific_name = $2,
                    price = $3,
                    original_price = $4,
                    category = $5,
                    care_level = $6,
                    light_requirement = $7,
                    water_frequency = $8,
                    size = $9,
                    description = $10,
                    image = $11,
                    in_stock = $12,
                    stock_quantity = $13,
                    features = $14,
                    is_popular = $15,
                    is_on_sale = $16,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $17
                RETURNING *
            `;

            const values = [
                name,
                scientificName || '',
                parseFloat(price),
                originalPrice ? parseFloat(originalPrice) : null,
                category,
                careLevel || 'Easy',
                lightRequirement || 'Medium',
                waterFrequency || 'Weekly',
                size || 'Medium',
                description,
                image || '/images/plants/default.png',
                stockQuantity > 0,
                parseInt(stockQuantity),
                JSON.stringify(features || []),
                isPopular || false,
                isOnSale || false,
                id
            ];

            const result = await client.query(updateQuery, values);
            client.release();

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Product not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Product updated successfully',
                data: result.rows[0]
            });

        } catch (dbError) {
            client.release();
            throw dbError;
        }

    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update product'
            },
            { status: 500 }
        );
    }
}

// DELETE - Delete product (admin only)
export async function DELETE(request: NextRequest) {
    const id = getIdFromRequest(request);
    try {
        // Check authentication
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token and check if user is admin
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        const client = await pool.connect();

        try {
            // Check if user is admin by checking user_role  
            const userQuery = 'SELECT email, user_role FROM users WHERE id = $1';
            const userResult = await client.query(userQuery, [decoded.userId]);

            if (userResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const user = userResult.rows[0];
            if (user.user_role !== 'admin') {
                return NextResponse.json(
                    { error: 'Admin access required' },
                    { status: 403 }
                );
            }

            // Delete product
            const deleteQuery = 'DELETE FROM plants WHERE id = $1 RETURNING id, name';
            const result = await client.query(deleteQuery, [id]);
            client.release();

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Product not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                message: `Product "${result.rows[0].name}" deleted successfully`
            });

        } catch (dbError) {
            client.release();
            throw dbError;
        }

    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to delete product'
            },
            { status: 500 }
        );
    }
}
