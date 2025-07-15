import bcrypt from 'bcryptjs';
import pool from './db';

export async function seedDatabase() {
    const client = await pool.connect();

    try {
        // Check if demo user already exists
        const existingUser = await client.query(
            'SELECT id FROM users WHERE email = $1',
            ['demo@plantshop.com']
        );

        if (existingUser.rows.length === 0) {
            // Create demo user
            const hashedPassword = await bcrypt.hash('password123', 12);

            await client.query(
                `INSERT INTO users (name, email, password_hash, created_at) 
         VALUES ($1, $2, $3, NOW())`,
                ['Demo User', 'demo@plantshop.com', hashedPassword]
            );

            console.log('✅ Demo user created: demo@plantshop.com / password123');
        } else {
            console.log('✅ Demo user already exists');
        }

        // You can add more seed data here (plants, categories, etc.)

    } catch (error) {
        console.error('❌ Seeding error:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Allow running this script directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('✅ Database seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Database seeding failed:', error);
            process.exit(1);
        });
}
