# BLS & ACLS Training Website

A static marketing website built with Nuxt 3 for a nurse offering BLS and ACLS certification training services.

## 🚀 Tech Stack

- **Nuxt 3** - Vue.js framework, rendered by a Nitro **Node server** (`/` is prerendered, API routes stay dynamic)
- **TailwindCSS** - Utility-first CSS framework
- **PrimeVue** - Vue UI component library
- **SQLite** (`better-sqlite3`) - Reviews + invites datastore at `server/data/reviews.db`
- **Nodemailer** - SMTP transport for invite emails (console-logs in dev when SMTP creds are absent)
- **Square Appointments** - Booking integration

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview the production build locally:
```bash
npm run preview
```

> ⚠️ Do **not** deploy with `npm run generate`. The reviews backend needs a live
> Nitro server runtime; a static export would ship the marketing pages without
> any of the `/api/**` routes or the SQLite-backed admin/review flow.

## 🎯 Features

### Page Sections
- **Hero Section** - Eye-catching intro with CTA button
- **BLS/ACLS Explanation** - Clear descriptions of both course types
- **Benefits** - 4 key benefits using PrimeVue Cards
- **Pricing Table** - Complete pricing structure with PrimeVue DataTable
- **Mobile Training Notice** - On-location service information
- **Booking Section** - Square Appointments integration
- **Contact Information** - Phone and email details

### Pricing Structure
- BLS First Time: $70
- BLS Renewal: $60
- Group (6 people): $50/person
- Large Groups (10+): $45/person
- ACLS First Time: $160
- ACLS Renewal: $140
- BLS + ACLS Renewal: $210
- BLS + ACLS First Time: $245

## 🎨 Design Features

- **Mobile-first responsive design**
- **Professional color scheme** with primary green theme
- **PrimeVue components only** for all UI elements
- **Smooth scrolling navigation**
- **Hover effects and transitions**

## ⚙️ Configuration

### Square Appointments Integration

To connect your actual Square Appointments booking:

1. Replace the placeholder URL in `pages/index.vue`:
```javascript
const openSquareBooking = () => {
  window.open('https://squareup.com/appointments/book/YOUR-ACTUAL-BOOKING-URL', '_blank')
}
```

### Contact Information

Update contact details in `pages/index.vue`:
```javascript
// Update phone and email in the contact section
Phone: (555) 123-4567
Email: info@blsaclstraining.com
```

## 🔐 Reviews backend

The site includes an invite-based review collection flow plus an admin dashboard
for managing invites and publishing reviews on the public testimonials section.

### Environment variables

All variables live in `.env` at the project root. `.env.example` is the canonical
list — copy it as a starting point:

```bash
cp .env.example .env
```

| Var | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | yes | Public origin used to build the review links emailed to customers (no trailing slash). |
| `ADMIN_PASSWORD` | yes | Plaintext admin password, compared with `timingSafeEqual`. Rotate by changing this value. |
| `ADMIN_SESSION_SECRET` | yes | 32+ byte random string used as the HMAC key for the `admin_session` cookie. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | prod | Generic SMTP transport for nodemailer. In dev, leave any of host/user/pass blank and `sendInviteEmail` will log the rendered email + review link to the server console instead of sending. |
| `MAIL_FROM` | prod | `From:` header on invite emails, e.g. `"The Total Experience <no-reply@example.com>"`. |

### Admin login

- Visit `/admin/login` and enter `ADMIN_PASSWORD`.
- Successful login sets an `HttpOnly` `admin_session` cookie (7-day max-age,
  HMAC-signed) plus a `csrf_token` cookie that the admin UI echoes back in the
  `x-csrf-token` header on every mutating call (double-submit CSRF).
- `/admin` exposes two tabs: **Invites** (send/resend) and **Reviews**
  (toggle publish, delete). Only published reviews appear on the public site.

### Database

- File: `server/data/reviews.db` (created on first boot, gitignored).
- Schema: `server/db/schema.sql` is re-applied on every boot (idempotent
  `CREATE TABLE IF NOT EXISTS …`).
- Local demo data: `npx tsx server/scripts/seed-demo.ts` inserts a pending
  invite plus four sample invite/review pairs (three published).

## 🌐 Deployment

This is a **Node server** deploy (Nitro runtime), not a static export.

1. `npm ci && npm run build` produces `.output/`.
2. Run `node .output/server/index.mjs` on the host (Node 18+).
3. Provide every variable from `.env.example` in the host's environment.
4. Mount a **persistent, writable volume** at `server/data/`. Ephemeral
   filesystems (e.g. default Fly.io machines without a volume, Vercel/Netlify
   serverless functions, Cloud Run without a mounted volume) will lose the
   SQLite database between deploys/restarts. If the chosen host can't satisfy
   that, swap SQLite for Postgres or Turso/libsql before launch — the SQL in
   `server/db/schema.sql` is intentionally portable.
5. Verify SMTP credentials by sending an invite to yourself from `/admin` and
   confirming the email arrives.

Hosting options that fit out of the box: a small VPS, Fly.io with an attached
volume, Render web service with a disk, or any Docker host.

### Pre-launch checklist

Walk through [`.plans/qa-checklist.md`](.plans/qa-checklist.md) before flipping
DNS. It covers the full invite → submit → publish loop, token edge cases, CSRF
and rate-limit checks, responsive/a11y, and post-deploy smoke tests.

## 📱 Mobile Training

The site highlights that training is offered on-location with a minimum $10 surcharge that may vary based on distance.

## 🎓 Certifications

All training provides official American Heart Association certification upon successful completion.