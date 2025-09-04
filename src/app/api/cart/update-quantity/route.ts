import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { cart_id, quantity } = await req.json();
        if (!cart_id || typeof quantity !== 'number' || quantity < 1) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }
        const client = await pool.connect();
        try {
            await client.query(
                'UPDATE cart SET quantity = $1 WHERE id = $2',
                [quantity, cart_id]
            );
            return NextResponse.json({ success: true });
        } finally {
            client.release();
        }
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
