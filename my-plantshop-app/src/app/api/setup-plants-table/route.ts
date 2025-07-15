import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();

        // Create plants table if it doesn't exist
        const createPlantsTable = `
            CREATE TABLE IF NOT EXISTS plants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                scientific_name VARCHAR(255),
                price DECIMAL(10, 2) NOT NULL,
                original_price DECIMAL(10, 2),
                category VARCHAR(100) NOT NULL,
                care_level VARCHAR(20) DEFAULT 'Easy',
                light_requirement VARCHAR(20) DEFAULT 'Medium',
                water_frequency VARCHAR(20) DEFAULT 'Weekly',
                size VARCHAR(20) DEFAULT 'Medium',
                description TEXT NOT NULL,
                image VARCHAR(500) DEFAULT '/images/plants/default.png',
                in_stock BOOLEAN DEFAULT true,
                stock_quantity INTEGER DEFAULT 0,
                rating DECIMAL(3, 2) DEFAULT 0.0,
                review_count INTEGER DEFAULT 0,
                features JSONB DEFAULT '[]',
                is_popular BOOLEAN DEFAULT false,
                is_on_sale BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await client.query(createPlantsTable);

        // Check if table has data, if not insert some sample data
        const countResult = await client.query('SELECT COUNT(*) FROM plants');
        const plantCount = parseInt(countResult.rows[0].count);

        if (plantCount === 0) {
            // Insert sample plants one by one
            const samplePlants = [
                {
                    name: 'Monstera Deliciosa',
                    scientific_name: 'Monstera deliciosa',
                    price: 45.99,
                    original_price: 59.99,
                    category: 'Tropical',
                    care_level: 'Easy',
                    light_requirement: 'Medium',
                    water_frequency: 'Weekly',
                    size: 'Large',
                    description: 'The iconic Swiss Cheese Plant with stunning split leaves. Perfect for beginners and plant enthusiasts alike.',
                    image: '/images/plants/plant1.png',
                    in_stock: true,
                    stock_quantity: 25,
                    rating: 4.8,
                    review_count: 156,
                    features: ["Pet-friendly", "Air-purifying", "Fast-growing"],
                    is_popular: true,
                    is_on_sale: true
                },
                {
                    name: 'Snake Plant',
                    scientific_name: 'Sansevieria trifasciata',
                    price: 28.99,
                    original_price: null,
                    category: 'Succulent',
                    care_level: 'Easy',
                    light_requirement: 'Low',
                    water_frequency: 'Monthly',
                    size: 'Medium',
                    description: 'Nearly indestructible plant that thrives in low light. Perfect for busy plant parents.',
                    image: '/images/plants/plant2.jpg',
                    in_stock: true,
                    stock_quantity: 40,
                    rating: 4.9,
                    review_count: 203,
                    features: ["Low maintenance", "Air-purifying", "Drought-tolerant"],
                    is_popular: true,
                    is_on_sale: false
                }
            ];

            for (const plant of samplePlants) {
                const insertQuery = `
                    INSERT INTO plants (
                        name, scientific_name, price, original_price, category,
                        care_level, light_requirement, water_frequency, size,
                        description, image, in_stock, stock_quantity, rating,
                        review_count, features, is_popular, is_on_sale
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
                `;

                const values = [
                    plant.name,
                    plant.scientific_name,
                    plant.price,
                    plant.original_price,
                    plant.category,
                    plant.care_level,
                    plant.light_requirement,
                    plant.water_frequency,
                    plant.size,
                    plant.description,
                    plant.image,
                    plant.in_stock,
                    plant.stock_quantity,
                    plant.rating,
                    plant.review_count,
                    JSON.stringify(plant.features),
                    plant.is_popular,
                    plant.is_on_sale
                ];

                await client.query(insertQuery, values);
            }
        }

        client.release();

        return NextResponse.json({
            success: true,
            message: 'Plants table created and initialized successfully!',
            data: {
                plantsCount: plantCount
            }
        });
    } catch (error) {
        console.error('Database setup error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown database error'
        }, { status: 500 });
    }
}
