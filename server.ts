import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

// Initialize Neon SQL client
const sql = neon(process.env.DATABASE_URL!);

// Create table on startup
async function initDB() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS rsvp (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        attending BOOLEAN NOT NULL DEFAULT true,
        dietary_restrictions TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
        console.log('✅ Database initialized — rsvp table ready');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        console.error('👉 Make sure you have set DATABASE_URL in .env');
    }
}

// POST /api/rsvp — Save RSVP submission
app.post('/api/rsvp', async (req, res) => {
    try {
        const { firstName, lastName, email, attending, dietaryRestrictions } = req.body;

        // Validation
        if (!firstName) {
            return res.status(400).json({ error: 'Name is required.' });
        }

        const result = await sql`
      INSERT INTO rsvp (first_name, last_name, email, attending, dietary_restrictions)
      VALUES (${firstName}, ${lastName}, ${email}, ${attending}, ${dietaryRestrictions || ''})
      RETURNING id, first_name, last_name, email, attending, created_at
    `;

        console.log(`🎉 New RSVP: ${firstName} ${lastName} — ${attending ? 'Attending' : 'Not attending'}`);
        res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error('❌ Error saving RSVP:', error);
        res.status(500).json({ error: 'Failed to save RSVP. Please try again.' });
    }
});

// GET /api/rsvp — List all RSVPs (for your reference)
app.get('/api/rsvp', async (_req, res) => {
    try {
        const results = await sql`SELECT * FROM rsvp ORDER BY created_at DESC`;
        res.json({ success: true, data: results, count: results.length });
    } catch (error) {
        console.error('❌ Error fetching RSVPs:', error);
        res.status(500).json({ error: 'Failed to fetch RSVPs.' });
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    await initDB();
});
