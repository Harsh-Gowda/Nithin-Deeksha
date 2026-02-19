import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, attending, dietaryRestrictions } = req.body;

  // Validation
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required.' });
  }

  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      return res.status(500).json({
        error: 'DATABASE_URL is undefined on Vercel. Please ensure you have added it to Settings -> Environment Variables and then RE-DEPLOYED.'
      });
    }

    if (dbUrl.includes('username:password')) {
      return res.status(500).json({
        error: 'DATABASE_URL still contains the placeholder "username:password". Please update it in Vercel Settings with your real Neon connection string.'
      });
    }

    const sql = neon(dbUrl);

    // Ensure table exists (safe but runs every time in serverless, 
    // better to run once manually, but this keeps it foolproof)
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

    const result = await sql`
      INSERT INTO rsvp (first_name, last_name, email, attending, dietary_restrictions)
      VALUES (${firstName}, ${lastName}, ${email}, ${attending}, ${dietaryRestrictions || ''})
      RETURNING id, first_name, last_name, email, attending, created_at
    `;

    return res.status(201).json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ error: 'Failed to save RSVP. ' + error.message });
  }
}
