# Pilgrimaide MVP — Demo App

This is a clickable product demo of the Pilgrimaide platform: onboarding,
dashboard, store, puja booking, pilgrimage discovery, astrology guidance,
Vastu/dosha preview, content hub, and membership — all wired into the same
shared profile so personalisation is visible end to end.

It is a frontend-only demo. There is no backend, no database, no payment
processing. All data (products, temples, pandits, packages) is hard-coded
in `src/App.jsx`. This is intentional — it is built to demonstrate the
product model to investors, not to take real orders. The full backend
build is scoped separately in the MVP Developer Specification document.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Deploy to Vercel

**Option A — fastest, no GitHub needed:**

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects this as a Vite project and deploys
it in under two minutes. It will give you a live URL immediately.

**Option B — via GitHub (recommended for ongoing iteration):**

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → New Project → Import the repo.
3. Vercel auto-detects the Vite framework preset. No configuration needed.
4. Click Deploy.

Every time you push a change to the repo, Vercel redeploys automatically.

## Project structure

```
/index.html         — HTML entry point
/src/main.jsx        — mounts the React app
/src/App.jsx          — the entire product demo (all pages, all data)
/package.json         — dependencies (react, react-dom, lucide-react)
/vite.config.js        — build configuration
```

## What to edit for a quick refresh

- Product catalogue, prices, temple list, pandit list, package list — all
  live as plain arrays near the top of `src/App.jsx` (PRODUCTS, TEMPLES,
  PACKAGES, PANDITS, CONTENT). Easy to swap before a specific investor demo.
- Brand colours — the `T` object near the top of `App.jsx` controls every
  colour used across the app.

## Known gaps (see pressure-test notes from Claude)

This demo intentionally does not include a real backend, auth, payments,
or live data. See the accompanying pressure-test summary for the full list
of what is demo-only versus what still needs real engineering before this
can take a live order or a live booking.
