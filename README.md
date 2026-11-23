# National Fibre Glass

A responsive corporate website that helps prospective customers explore fiberglass products and contact the business. It presents water tanks, doors, windows, and car porch shades alongside company and brand information.

[View the live website](https://nationalfiberglass.netlify.app/)

## What to explore

- Start at the homepage and browse the Products and Our Brands sections.
- Use the homepage order action or the Contact page to see the customer enquiry entry points.
- The React application uses Vite, React Router, and a Supabase client integration.

## Run locally

Use Node.js 22 LTS (22.13 or later in the 22.x series) or Node.js 24 LTS with npm. Install dependencies with `npm ci`.

For Supabase-backed features, create a `.env.local` file with the browser-safe values for a development project you control.

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_BROWSER_SAFE_ANON_KEY
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build and preview

```bash
npm run lint
npm run build
npm run preview
```

Vite writes the static build to `dist/`. The Netlify redirect rule in `public/_redirects` sends deep links to the application entry point so React Router can handle them. For a different static host, configure the equivalent fallback.
