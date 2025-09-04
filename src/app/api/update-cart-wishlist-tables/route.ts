import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const client = await pool.connect();

        try {
            // Drop existing tables to recreate with plant_name column
            await client.query(`DROP TABLE IF EXISTS cart CASCADE;`);
            await client.query(`DROP TABLE IF EXISTS wishlist CASCADE;`);

            // Create cart table with plant_name column
            await client.query(`
                CREATE TABLE IF NOT EXISTS cart (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    plant_id INTEGER NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
                    plant_name VARCHAR(255) NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
                    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, plant_id)
                );
            `);

            // Create wishlist table with plant_name column
            await client.query(`
                CREATE TABLE IF NOT EXISTS wishlist (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    plant_id INTEGER NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
                    plant_name VARCHAR(255) NOT NULL,
                    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, plant_id)
                );
            `);

            // Create indexes for better performance
            await client.query(`
                CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
                CREATE INDEX IF NOT EXISTS idx_cart_plant_id ON cart(plant_id);
                CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
                CREATE INDEX IF NOT EXISTS idx_wishlist_plant_id ON wishlist(plant_id);
            `);

            console.log('✅ Cart and wishlist tables recreated with plant_name column');

            return NextResponse.json({
                success: true,
                message: 'Cart and wishlist tables recreated with plant_name column'
            });

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('🚨 Error recreating cart and wishlist tables:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
