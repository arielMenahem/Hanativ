import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { full_name, email, phone, address, city, zip_code } = req.body;

    // Validate required fields
    if (!full_name || !email || !phone || !address || !city) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to Neon database
    const sql = neon(process.env.DATABASE_URL);

    // Insert order into database
    await sql`
      INSERT INTO orders (full_name, email, phone, address, city, zip_code)
      VALUES (${full_name}, ${email}, ${phone}, ${address}, ${city}, ${zip_code || ''})
    `;

    return res.status(200).json({
      success: true,
      paymentPhone: process.env.PAYMENT_PHONE_NUMBER || '0500000000',
      bookPrice: process.env.BOOK_PRICE || '100',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
