# HanativMA – Project Instructions

## 🎯 Project Goal
Create a landing page for the book **"הנתיב לצופן הבורא"** by **מאיה אשרף**, with a purchase button that triggers a Hebrew registration/shipping form. Order data is saved to a Vercel Postgres DB, followed by manual payment instructions for Bit/PayBox.

---

## 🛠 Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Vercel Serverless Functions (Node.js)
- **Database:** Vercel Postgres
- **Deployment:** GitHub → Vercel

---

## 📁 Current Project Structure

```
src/
  App.jsx          ← Main landing page (RTL, Hebrew title + author)
  App.css
  index.css        ← Global styles + background image
  main.jsx
public/
  background.png   ← Teal book-cover background image
api/
  create-order.js  ← (TO BE CREATED) Vercel serverless function
.env               ← (TO BE CREATED) Environment variables
```

---

## 🎨 Design Conventions

- **Direction:** RTL (`dir="rtl"`) on all pages and forms
- **Language:** Hebrew UI labels throughout
- **Primary color:** `#D4AF37` (gold) for headings and accents
- **Font:** serif for titles
- **Background:** `public/background.png` — full-screen cover, fixed attachment
- **Site title (browser tab):** `HanativMA`

---

## 💾 Phase 1: Database Setup

Run the following SQL in the Vercel Postgres Console:

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(15),
    payment_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🖥 Phase 2: Frontend Components (Hebrew / RTL)

### 1. Landing Page — `src/App.jsx`
Current state:
- Title `הנתיב לצופן הבורא` in gold (`#D4AF37`), top-right corner
- Author name `מאיה אשרף` in gold below the title
- Full-screen teal background image

Next: Add a purchase button below the author name.

### 2. Purchase Button
- **Text:** `קנה את הספר`
- **Style:** Gold border + gold text, hover fills gold background with dark text
- **Action:** Opens a Modal or toggles the visibility of the Shipping Form

### 3. Registration / Shipping Form
RTL-aligned form (`dir="rtl"`) with the following fields:

| Hebrew Label | Field Name | Type | Required |
|---|---|---|---|
| שם מלא | `full_name` | text | ✅ |
| אימייל | `email` | email | ✅ |
| טלפון | `phone` | tel | ✅ |
| כתובת למשלוח | `address` | text | ✅ |
| עיר | `city` | text | ✅ |
| מיקוד | `zip_code` | text | ❌ |

- Submit button text: `שלח הזמנה`
- Show loading state while submitting
- Show validation errors inline in Hebrew

---

## ⚙️ Phase 3: Backend Logic (Vercel API)

**File:** `/api/create-order.js`

```js
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
      paymentPhone: process.env.PAYMENT_PHONE_NUMBER,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Required Environment Variables (Vercel Dashboard)
| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string (auto-set by Vercel) |
| `PAYMENT_PHONE_NUMBER` | Phone number for Bit/PayBox payment |

### Install dependency
```bash
npm install @neondatabase/serverless
```

---

## 🔗 Phase 4: Integration Workflow

1. User clicks `קנה את הספר` → form appears
2. User fills form and clicks `שלח הזמנה`
3. React sends `POST /api/create-order` with form JSON
4. On success, replace the form with:

```
הזמנתך נרשמה בהצלחה! 🎉

להשלמת הרכישה, אנא העבירו תשלום בביט או פייבוקס למספר:
[PAYMENT_PHONE_NUMBER]

לאחר ביצוע התשלום, הספר יישלח לכתובתך.
```

5. On error, show: `אירעה שגיאה, אנא נסה שנית.`

---

## 🚀 Deployment (GitHub → Vercel)

1. Push code to GitHub repository
2. Connect the repo to Vercel
3. In Vercel Dashboard → **Storage** → **Create Database**
   - Select **Neon** (Serverless Postgres) from the Marketplace
   - Vercel automatically sets `DATABASE_URL` environment variable
4. In Neon's SQL Editor (or via the Vercel dashboard), run:
   ```sql
   CREATE TABLE orders (
       id SERIAL PRIMARY KEY,
       full_name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       address TEXT NOT NULL,
       city VARCHAR(100) NOT NULL,
       zip_code VARCHAR(15),
       payment_status VARCHAR(20) DEFAULT 'pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
5. In Vercel Dashboard → **Settings** → **Environment Variables**, add:
   - Variable name: `PAYMENT_PHONE_NUMBER`
   - Value: Your Bit/PayBox phone number (e.g., `+333333`)
   - Environment: Production, Preview, Development
6. Deploy — Vercel auto-detects Vite and serverless functions in `/api`

---

## 🚀 GitHub Copilot Prompts

### Backend
> "Write a Vercel serverless function in `/api/create-order.js` that uses `@vercel/postgres` to insert a new order record with fields: full_name, email, phone, address, city, zip_code. Return a success JSON object including a phone number from `process.env.PAYMENT_PHONE_NUMBER`."

### Frontend – Purchase Button
> "Add a styled Hebrew purchase button `קנה את הספר` to `src/App.jsx` that toggles a shipping form modal with RTL layout and gold `#D4AF37` styling on a teal background."

### Frontend – Shipping Form
> "Build a React component `ShippingForm.jsx` for a shipping form in Hebrew with RTL styling (`dir='rtl'`). Include fields for שם מלא, אימייל, טלפון, כתובת למשלוח, עיר, and מיקוד. On submission, send a POST request to `/api/create-order` and display a success message with Bit/PayBox payment instructions including the phone number returned from the API."

### Success Message
> "Create a React component `OrderSuccess.jsx` that displays a Hebrew success message including the payment phone number received from the API response, instructing the user to pay via Bit or PayBox."
