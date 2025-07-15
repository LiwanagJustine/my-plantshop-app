import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

// GET - Fetch all products/plants
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Simple query parameters
        const category = searchParams.get('category');
        const limit = searchParams.get('limit');
        const inStock = searchParams.get('inStock');
        const popular = searchParams.get('popular');

        const client = await pool.connect();

        let query = `
            SELECT 
                id, name, scientific_name, price, original_price, category,
                care_level, light_requirement, water_frequency, size,
                description, image, in_stock, stock_quantity, rating,
                review_count, features, is_popular, is_on_sale,
                created_at, updated_at
            FROM plants 
        `;

        const conditions = [];
        const values = [];

        // Add simple filters
        if (category) {
            conditions.push(`category = $${values.length + 1}`);
            values.push(category);
        }

        if (inStock === 'true') {
            conditions.push(`in_stock = true`);
        }

        if (popular === 'true') {
            conditions.push(`is_popular = true`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        query += ` ORDER BY created_at DESC`;

        if (limit) {
            query += ` LIMIT $${values.length + 1}`;
            values.push(parseInt(limit));
        }

        const result = await client.query(query, values);
        client.release();

        return NextResponse.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error('🚨 Error fetching products:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST - Create new product (admin only)
export async function POST(request: NextRequest) {
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
            console.log('🌱 Products API received data:', body);

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

            // Validate required fields
            if (!name || !price || !category || !description || !stockQuantity) {
                return NextResponse.json(
                    { error: 'Missing required fields: name, price, category, description, stockQuantity' },
                    { status: 400 }
                );
            }

            // Safely handle features array
            let featuresArray = [];
            try {
                if (Array.isArray(features)) {
                    // Ensure all features are strings and filter out empty ones
                    featuresArray = features
                        .filter(feature => feature && typeof feature === 'string' && feature.trim() !== '')
                        .map(feature => feature.toString().trim());
                } else {
                    featuresArray = [];
                }
            } catch (error) {
                console.error('Error processing features:', error);
                featuresArray = [];
            }

            console.log('🌱 Features Array:', featuresArray);

            // Insert new product
            const insertQuery = `
                INSERT INTO plants (
                    name, scientific_name, price, original_price, category,
                    care_level, light_requirement, water_frequency, size,
                    description, image, in_stock, stock_quantity, rating,
                    review_count, features, is_popular, is_on_sale
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
                ) RETURNING *
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
                0.0, // Default rating
                0,   // Default review count
                featuresArray, // Pass array directly for text[] column
                isPopular || false,
                isOnSale || false
            ];

            console.log('🌱 Final values for database:', values);
            console.log('🌱 Features value type:', typeof featuresArray, 'Array.isArray:', Array.isArray(featuresArray));
            console.log('🌱 Features content:', featuresArray);

            const result = await client.query(insertQuery, values);
            const insertedProduct = result.rows[0];

            console.log('🌱 Product successfully inserted:', insertedProduct);
            client.release();

            return NextResponse.json({
                success: true,
                message: 'Product created successfully',
                data: insertedProduct
            });

        } catch (dbError) {
            console.error('🚨 Database error:', dbError);
            client.release();
            throw dbError;
        }

    } catch (error) {
        console.error('🚨 General error creating product:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create product',
                details: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
