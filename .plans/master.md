# Master Plan — Testimonials, Review Backend, and Modernization Facelift

Project: `the-total-experience-web` (Nuxt 3 + Tailwind + PrimeVue, currently a static marketing site for BLS/ACLS training).

This plan adds three capabilities while preserving the existing brand vibe:
1. A public **Testimonials section** on the landing page.
2. A **backend** that lets an admin invite customers by email to submit a star-rating + comment + name review via a tokenized link, and lets the admin **flag** which reviews are publicly displayed.
3. A site-wide **modernization facelift** (typography, spacing, motion, components).

Tasks are numbered `P<phase>.<task>` so they can be referenced individually (e.g. `/execute-task P2.3`).

---

## Vibe Baseline (captured during P0.1)

Source files audited: [app.vue](../app.vue), [nuxt.config.ts](../nuxt.config.ts), [tailwind.config.js](../tailwind.config.js), [pages/index.vue](../pages/index.vue), and all [components/](../components/) (Navigation, HeroSection, CoursesSection, BenefitsSection, InstructorSection, TrainingSection, FloatingActions, SquareBookingModal).

**Stack**
- Nuxt 3 (`^3.8.0`) with `ssr: true` and `/` prerendered via Nitro.
- Tailwind via `@nuxtjs/tailwindcss` (`^6.8.4`).
- PrimeVue (`^3.45.0`) with **aura-light-green** theme (`primevue/resources/themes/aura-light-green/theme.css`) + `primeicons` (`^6.0.1`). PrimeVue is in `build.transpile`. **No PrimeVue plugin file present in [plugins/](../plugins/) — components like `Button` / `Card` are referenced in templates with no visible global registration; investigate before adding new PrimeVue usage in later phases.**
- No `@nuxt/image`, no Google Fonts module, no motion library installed.
- Dark mode driven by `prefers-color-scheme` (Tailwind `dark:` classes); toggled in [app.vue:180-201](../app.vue) by adding `dark` class to `<html>`.

**Color palette (Tailwind theme — [tailwind.config.js:13-26](../tailwind.config.js))**
- `primary` = green ramp (50→900), `500=#22c55e`, `600=#16a34a`, `700=#15803d`. Brand is green.
- Heavy use of stock Tailwind `gray-50/100/300/600/700/800/900` for surfaces and text, and accent `blue-*`, `green-*`, `yellow-*` for trust/skill indicators.
- Hero override CSS uses emerald hex literals `#10b981 / #059669 / #047857` (hardcoded in [HeroSection.vue:149](../components/HeroSection.vue#L149)) — slightly out of step with the `primary` ramp; flag for P5.2.

**Typography**
- System font stack (no custom families loaded).
- Scale in use: section H2 `text-3xl md:text-4xl font-bold`, hero H1 `text-4xl md:text-6xl lg:text-7xl font-bold`, card H3 `text-xl/2xl font-bold`, body `text-base`, captions `text-sm`. Center-aligned section headers are standard.

**Spacing & layout rhythm**
- Section wrapper: `<section class="py-16 ...">` with `<div class="container mx-auto px-4">` (Navigation/footer use `lg:px-20`). Hero uses `min-h-screen` + `pt-32 pb-16 lg:pt-40 lg:pb-24`.
- Section inner max widths: `max-w-7xl mx-auto` for grids, `max-w-3xl/4xl/5xl` for prose blocks.
- Cards: PrimeVue `<Card>` with `shadow-lg hover:shadow-xl/2xl`, `transition-all duration-300/500`, `transform hover:-translate-y-2/3`, `border-2 border-transparent hover:border-primary-300/blue-300`. No explicit `rounded-2xl` — relies on PrimeVue default radii.
- Gradient surfaces are common: `bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700` on alternating sections.

**Motion & interactivity**
- Custom keyframe animations inside [HeroSection.vue](../components/HeroSection.vue): `slideInDown / slideInLeft / slideInUp`, staggered `animation-delay-200…1000`, `floatAnimation` on decorative shapes, `pulseGlow` on hero CTA, `gradientShift` on hero text gradient, `bounce` on scroll indicator.
- Hover micro-interactions everywhere: `hover:scale-105`, `hover:-translate-y-2`, `group-hover:translate-x-1`, `group-hover:scale-110`.
- No `prefers-reduced-motion` guards anywhere — gap to address in P5.4.
- Manual scroll handlers in [app.vue:204-234](../app.vue#L204) (sticky nav hide/show, active-section tracking) and parallax in [HeroSection.vue:115-132](../components/HeroSection.vue#L115).

**Iconography**
- Exclusively `primeicons` (`<i class="pi pi-...">`). Do NOT mix in lucide / heroicons / nuxt-lucide-icons during the facelift — supersedes the "pick one" wording in P5.7: **keep primeicons**.

**Navigation pattern**
- Floating pill nav with active state, mobile drawer, CTA button. Class hooks `floating-nav`, `floating-nav--scrolled`, `floating-nav--hidden`, `nav-pill--active`. Driven by props from [app.vue](../app.vue), not internal state.

**Content / config pattern**
- All marketing copy, instructor list, contact info, social links, asset paths live in [config/site.js](../config/site.js), exposed through the [composables/useSiteConfig.js](../composables/useSiteConfig.js) composable. **New sections (testimonials, admin labels) should follow this same config-driven pattern** when copy is editable.

**Recommended testimonial insertion point** — between `InstructorSection` and `TrainingSection` in [pages/index.vue:22-25](../pages/index.vue#L22-L25) (matches the P4.6 hypothesis; note the original guess said "before BookingSection" but there is no `BookingSection` mounted in `index.vue` — `SquareBookingModal` is mounted instead). Update P4.6 accordingly.

**Constraints to respect going forward**
- Keep primary brand = green ramp; do not retheme to a new hue.
- Keep PrimeVue + primeicons; do not introduce a second UI lib or icon set.
- Replace hardcoded hex emeralds in `HeroSection.vue` with the `primary` ramp during P5.2 (don't drop them in new code).
- Add `prefers-reduced-motion` guards to any animations introduced in P4.5 / P5.4.
- Section padding standard is currently `py-16`; P5.3's `py-20 md:py-28` is an intentional uplift — apply uniformly, not piecemeal.

---

## Phase 0 — Discovery & Decisions

**Goal:** lock the stack and contracts before writing code.

- **P0.1** ✅ Audit current site: read [app.vue](app.vue), [nuxt.config.ts](nuxt.config.ts), [tailwind.config.js](tailwind.config.js), every component in [components/](components/), and [pages/index.vue](pages/index.vue) to capture the existing color palette, type scale, spacing rhythm, and motion patterns. Record findings inline at the top of this file under "Vibe Baseline".
- **P0.2** ✅ **LOCKED — Backend hosting: Nuxt Nitro server routes** in `server/api/**`, same repo. Deploy target confirmed as a **Node server (`nuxt build` → Nitro runtime)**, not `nuxt generate` static export. Action items this unlocks: (a) remove or repurpose the `nuxt generate` step in [README.md](../README.md) before launch so contributors don't deploy statically by accident; (b) the existing `nitro.prerender.routes: ['/']` in [nuxt.config.ts:14-18](../nuxt.config.ts#L14-L18) stays — prerendered home + dynamic API routes coexist fine on a Node runtime.
- **P0.3** ✅ **LOCKED — Datastore: SQLite via `better-sqlite3`.** DB file at `server/data/reviews.db` (gitignored). Schema source of truth: `server/db/schema.sql`, applied on first boot via `db.exec(...)` from a Nitro plugin. Rationale: single-admin, low-write, single-host workload; no separate DB infra needed. Caveats to enforce in P1: (a) ensure the host's filesystem is writable and persistent (ephemeral filesystems like default Fly machines without a volume will lose data — mount a volume); (b) add `server/data/` to `.gitignore`; (c) if the host is later swapped to a serverless target, plan to migrate to Turso/libsql or Postgres — keep SQL in `schema.sql` portable (avoid SQLite-only syntax beyond what's necessary).
- **P0.4** ✅ **LOCKED — Email transport: `nodemailer` over generic SMTP.** Env vars (added to `.env.example` in P1.7): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` (`true`/`false`), `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`. Dev fallback: when any of `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` is missing, `sendInviteEmail` logs the rendered email + review link to the server console instead of attempting to send. **Provider choice (Resend / Postmark / SES / Gmail / etc.) is deferred to P6.7 deploy time** — nodemailer's generic SMTP transport works with any of them; no code change needed when picking one.
- **P0.5** ✅ **LOCKED — Admin auth: single admin, signed-cookie session.** Env vars: `ADMIN_PASSWORD` (plaintext compared via `crypto.timingSafeEqual`), `ADMIN_SESSION_SECRET` (random 32+ byte string used as HMAC key). Cookie: `admin_session`, `HttpOnly`, `Secure` (in prod), `SameSite=Lax`, `Path=/`, 7-day max-age. Cookie value = `payload.signature` where payload is `base64url({ iat, exp })` and signature is HMAC-SHA256 with `ADMIN_SESSION_SECRET`. No DB-backed sessions, no user table, no password hashing (single static credential, rotated by changing env var). If the admin model ever grows past one user, swap to argon2 + a `users` table — explicitly out of scope now.
- **P0.6** ✅ **LOCKED — Review-link tokens: 32 random bytes, base64url-encoded, single-use, 14-day expiry, stored as SHA-256 hash.** Token issued via `randomBytes(32).toString('base64url')` → emailed to customer in URL path `${SITE_URL}/review/<token>`. Server stores only `sha256(token)` in `invites.token_hash` (UNIQUE). Validation: hash the inbound token and look up by `token_hash`; reject if missing, if `expires_at < now`, or if `used_at IS NOT NULL`. `used_at` is set in the same transaction as the `reviews` INSERT in P2.2. No JWT, no rotation — single-use, plain-bearer-by-hash design.

Deliverable: this file updated with Vibe Baseline + locked decisions.

---

## Phase 1 — Backend Foundations

**Goal:** stand up the DB, schema, and shared server utilities.

- **P1.1** Add deps: `better-sqlite3`, `nodemailer`, `zod`. (h3 helpers already ship with Nuxt.)
- **P1.2** Create `server/db/index.ts` exporting a singleton `Database` instance; auto-run migrations from `server/db/schema.sql` on boot.
- **P1.3** Author `server/db/schema.sql`:
  - `invites(id TEXT PK, email TEXT, customer_name TEXT NULL, token_hash TEXT UNIQUE, created_at, expires_at, used_at NULL)`
  - `reviews(id TEXT PK, invite_id TEXT FK, name TEXT, rating INTEGER CHECK 1..5, comment TEXT, created_at, is_published INTEGER DEFAULT 0, published_at NULL)`
  - Indexes on `reviews.is_published`, `invites.token_hash`.
- **P1.4** Add `server/utils/auth.ts` — admin session create/verify.
- **P1.5** Add `server/utils/tokens.ts` — generate + hash + verify single-use tokens.
- **P1.6** Add `server/utils/mail.ts` — `sendInviteEmail` with console-fallback transport when SMTP creds are absent.
- **P1.7** Add `.env.example` documenting all new env vars.

Exit check: `npm run dev` boots; DB file is created; no runtime errors.

---

## Phase 2 — Public Review Submission Flow

**Goal:** a customer who clicks the email link can submit a review.

- **P2.1** `GET /api/reviews/validate?token=...` → returns `{ valid, email, customer_name }` or 404/410.
- **P2.2** `POST /api/reviews/submit` → body `{ token, name, rating, comment }`, zod-validated, marks invite used, inserts review with `is_published=0`. Idempotent on used token (returns 409).
- **P2.3** Create page [pages/review/[token].vue](pages/review/[token].vue) — validates token on mount; shows friendly expired/used state on failure.
- **P2.4** Build the review form: name (prefilled if known), 1–5 star picker (accessible, keyboard + ARIA), comment textarea (max 1000 chars, live counter), submit.
- **P2.5** Success state thanking the reviewer; ensure no PII leakage in errors.
- **P2.6** Style review page to reuse existing typography/colors — must read as the same site, not a bolt-on.

Exit check: manual flow with a hand-inserted invite row submits a review row.

---

## Phase 3 — Admin Backend UI

**Goal:** owner can log in, invite customers, and flag reviews to publish.

- **P3.1** `POST /api/admin/login` (password → session cookie) and `POST /api/admin/logout`.
- **P3.2** `requireAdmin` middleware applied to all `/api/admin/**` and `/admin/**` page routes.
- **P3.3** `POST /api/admin/invites` `{ email, customer_name? }` → creates invite, sends email containing `${SITE_URL}/review/${token}`. Returns invite row (without raw token).
- **P3.4** `GET /api/admin/invites` → list with status (pending / submitted / expired).
- **P3.5** `GET /api/admin/reviews` → list all reviews with rating, comment, name, published flag, timestamps; supports `?published=1`.
- **P3.6** `PATCH /api/admin/reviews/:id` `{ is_published }` → toggles publish flag.
- **P3.7** `DELETE /api/admin/reviews/:id` — hard delete (soft-delete is out of scope for now).
- **P3.8** Build [pages/admin/login.vue](pages/admin/login.vue) — password form.
- **P3.9** Build [pages/admin/index.vue](pages/admin/index.vue) — dashboard tabs: **Invites** (add email + name, list with resend) and **Reviews** (table with star rating, comment preview, toggle to publish, view full).
- **P3.10** Use PrimeVue components already in repo (DataTable, InputText, Button, Toast) — no new UI lib.

Exit check: full loop — admin invites self → receives/sees link → submits review → flips publish toggle.

---

## Phase 4 — Public Testimonials Section

**Goal:** show published reviews on the landing page; hide entirely when none.

- **P4.1** `GET /api/reviews/public` → returns `[{ id, name, rating, comment, created_at }]` where `is_published=1`, ordered by `published_at DESC`. Cache 60s via Nitro route rules.
- **P4.2** Create [components/TestimonialsSection.vue](components/TestimonialsSection.vue); fetch via `useFetch` server-side for SEO.
- **P4.3** **If list is empty → component renders nothing** (`v-if="items.length"`).
- **P4.4** Layout: responsive card grid (1/2/3 cols), star row, quote, name, optional initial avatar.
- **P4.5** Subtle entrance animation (respect `prefers-reduced-motion`).
- **P4.6** Insert into [pages/index.vue](pages/index.vue) between `InstructorSection` and `TrainingSection` (confirmed during P0.1 — there is no `BookingSection` mounted in `index.vue`; booking is a modal).

Exit check: with 0 published reviews the section is absent from DOM; with ≥1 it appears and is responsive.

---

## Phase 5 — Modernization Facelift

**Goal:** lift the visual quality across the whole site without changing brand identity.

- **P5.1 — Type system:** introduce a refined pair via `@nuxtjs/google-fonts` (e.g. display: `Sora` or `Space Grotesk`; body: `Inter`). Wire into Tailwind theme; replace ad-hoc font sizes with a consistent scale (`text-display`, `text-h1`…`text-body`, `text-caption`).
- **P5.2 — Color & surfaces:** keep current brand hue but introduce a tuned neutral ramp, a subtle gradient accent, and consistent dark/elevated surface tokens in `tailwind.config.js`.
- **P5.3 — Spacing & rhythm:** standardize section padding (`py-20 md:py-28`), container (`max-w-7xl mx-auto px-6`), and card radii (`rounded-2xl`) across all sections.
- **P5.4 — Motion:** add `@vueuse/motion` (or a tiny IntersectionObserver composable) for on-scroll fade/slide on section headers and cards; honor `prefers-reduced-motion`.
- **P5.5 — Navigation:** sticky translucent nav with backdrop blur, active-link indicator, refined mobile drawer.
- **P5.6 — Hero:** modern asymmetric layout, gradient mesh or subtle noise bg, clearer primary CTA hierarchy.
- **P5.7 — Cards (Courses / Training / Benefits):** unified card primitive with hover lift, iconography pass (lucide via `nuxt-lucide-icons` or kept primeicons — pick one and be consistent).
- **P5.8 — Footer:** rebuild with structured columns, social, legal, and a quiet CTA.
- **P5.9 — Accessibility pass:** focus rings, color contrast ≥ AA, semantic landmarks, alt text audit.

Exit check: visual diff review — site feels modern and cohesive; Lighthouse a11y ≥ 95, performance not regressed.

---

## Phase 6 — Hardening & Launch

- **P6.1** Rate-limit `/api/reviews/submit` and `/api/admin/login` (simple in-memory token bucket keyed by IP).
- **P6.2** Add CSRF protection on admin mutations (double-submit cookie).
- **P6.3** Sanitize review comments on render (escape only — no HTML allowed).
- **P6.4** Seed script `server/scripts/seed-demo.ts` for local testing.
- **P6.5** README section documenting env vars, admin login, and DB location.
- **P6.6** Manual QA checklist: invite → email → submit → publish → visible on home; expired token; used token; empty-state hidden section; mobile breakpoints; reduced-motion.
- **P6.7** Deploy: confirm SQLite path is writable on target host (or swap to Postgres if hosting requires) and SMTP creds set.

Exit check: full end-to-end run on a staging URL.

---

## Out of Scope (explicit)
- Multi-admin / role-based access.
- Public review browsing page beyond the homepage section.
- Review editing by customers after submit.
- i18n.

## Open Questions for User
1. ~~Confirm Nuxt server routes + SQLite is acceptable~~ — **resolved in P0.2/P0.3: Node-server runtime, Nitro + SQLite.**
2. ~~SMTP provider preference~~ — **deferred to P6.7: any provider works via nodemailer SMTP. Decide at deploy time.**
3. Any brand assets (new logo, palette) for the facelift, or work from current?
