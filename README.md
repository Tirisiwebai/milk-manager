# Milk Manager

The simplest way to track milk for your cafe. Save time. Save money. Reduce waste.

## Tech Stack

- **Frontend:** Next.js 16 + React + TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Database:** Supabase (coming soon)
- **Auth:** Supabase Auth (coming soon)
- **Analytics:** Plausible (coming soon)

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Deployment to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create milk-manager --public --source=. --push
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with tirisiwebai@gmail.com
   - Click "Add New Project"
   - Select the milk-manager repository
   - Deploy

### Environment Variables (coming soon)

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
RESEND_API_KEY=your-resend-api-key
OPENAI_API_KEY=your-openai-api-key
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable components (coming soon)
└── lib/                  # Utilities (coming soon)
```

## Features

### Landing Page (Built)
- Hero section with value proposition
- How It Works (3 steps)
- Features grid
- Pricing (Free + Pro tiers)
- FAQ section
- Email signup form
- Footer with branding

### Coming Soon
- User authentication (Supabase)
- Dashboard for logged-in users
- Milk tracking with photo scanning
- Waste logging
- Cost analytics
- AI predictions
- Supplier management

## Design

The design follows The Way to Coffee aesthetic:
- Minimal, clean, content-focused
- Black (#1a1a1a) primary color
- Gray (#6b7280) secondary color
- Amber (#d97706) accent color
- System sans-serif typography

## License

MIT
