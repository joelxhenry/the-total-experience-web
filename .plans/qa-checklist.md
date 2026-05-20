# Manual QA Checklist — Reviews Backend + Facelift (P6.6)

Run through this list against a fresh build (`npm run build && npm run preview`)
before shipping. Tick boxes as you go; do not mark a section done until **every**
item passes.

---

## 0. Setup

- [ ] `.env` has `SITE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` set.
- [ ] SMTP vars set (or intentionally blank to use the dev console fallback).
- [ ] `server/data/reviews.db` exists and is writable (created on first boot).
- [ ] Optional: `npx tsx server/scripts/seed-demo.ts` ran without error and
      printed an invite/review summary.

## 1. Public landing page

- [ ] `/` renders without console errors in the browser devtools.
- [ ] Hero, courses, benefits, instructor, training, navigation, floating
      actions all render and stay on-brand (green primary ramp, primeicons).
- [ ] **Testimonials section** appears between `InstructorSection` and
      `TrainingSection` **only if** there is ≥1 published review.
- [ ] With zero published reviews, the testimonials section is **absent from
      the DOM** (not just hidden via CSS).
- [ ] With ≥3 published reviews, the grid responsively shows 1 / 2 / 3 columns
      at sm / md / lg breakpoints.
- [ ] Each card shows a star row matching the rating, the comment, and the
      reviewer name.

## 2. Invite → review submission flow

- [ ] From `/admin`, send an invite to a real address you can read (or watch
      the dev console for the rendered email when SMTP is unconfigured).
- [ ] Email contains a link of the form `${SITE_URL}/review/<token>`.
- [ ] Opening the link loads `/review/[token]` and shows the review form
      prefilled with the customer name (if provided on the invite).
- [ ] Submitting the form with a 1–5 star rating and a comment ≤1000 chars
      returns the success state.
- [ ] The new review appears in the admin **Reviews** tab with
      `published = false`.

## 3. Token edge cases

- [ ] Reloading `/review/<token>` after a successful submission shows the
      "already used" friendly state — no PII leaked in errors.
- [ ] Hand-expiring an invite (set `expires_at` in the past via `sqlite3`)
      shows the "expired" state.
- [ ] An unknown token shows the "invalid / not found" state.

## 4. Admin dashboard

- [ ] `/admin` redirects to `/admin/login` when there is no session cookie.
- [ ] Wrong password → 401 with "Incorrect password." message.
- [ ] Correct password → redirected to `/admin`, both `admin_session` (HttpOnly)
      and `csrf_token` (readable by JS) cookies are set.
- [ ] Invites tab: create, then **Resend** — both succeed and the table
      refreshes.
- [ ] Reviews tab: toggle **Published** on → the review appears on `/` within
      ~60s (Nitro public cache window).
- [ ] Reviews tab: toggle **Published** off → review disappears from `/` after
      cache expiry.
- [ ] Reviews tab: **Delete** removes the row after confirm dialog.
- [ ] Sign out: `admin_session` and `csrf_token` cookies are cleared.

## 5. Security hardening (P6.1–P6.3)

- [ ] Hit `POST /api/admin/login` >5 times within 5 minutes from the same IP →
      6th call returns **429** with a `Retry-After` header.
- [ ] Hit `POST /api/reviews/submit` >5 times within 1 minute from the same IP
      → 6th call returns **429**.
- [ ] From a signed-in admin browser, manually `fetch('/api/admin/invites', { method: 'POST', body: JSON.stringify({email:'x@y.z'}), headers: { 'content-type':'application/json' } })`
      **without** an `x-csrf-token` header → **403 Missing CSRF token**.
- [ ] Same request with a wrong header value → **403 Invalid CSRF token**.
- [ ] Same request with the header value copied from the `csrf_token` cookie →
      **200 OK**.
- [ ] Submit a review with `<script>alert(1)</script>` and zero-width chars in
      the comment → the stored row has no control/zero-width chars, the
      testimonials card renders the literal text (not executed HTML), and
      DevTools shows the `<` / `>` as escaped entities.

## 6. Public testimonials caching

- [ ] First request to `/api/reviews/public` is `200`; immediate refetch within
      60s returns the cached payload (verified via response timing or by
      toggling publish then waiting for cache to expire before the change
      shows on `/`).

## 7. Responsive + mobile

- [ ] At 360px width, the landing page, `/review/[token]`, and `/admin` are
      usable: no horizontal scroll, tap targets ≥44px, modals/drawers
      reachable.
- [ ] At 768px and 1280px, the layouts match the desktop design.

## 8. Motion + accessibility

- [ ] In OS settings, enable "Reduce motion" → reload `/` and confirm hero
      animations, testimonial entrance, and section reveals collapse to
      static (no slide/fade keyframes running).
- [ ] Tab through `/` from the top: every link, button, and the booking modal
      are reachable in a logical order with a visible focus ring.
- [ ] Tab through the review form: star picker is operable by arrow keys
      and `Space`/`Enter`, textarea announces its character counter via
      `aria-describedby`.
- [ ] Screen reader (VoiceOver / NVDA): testimonials cards announce
      "<n> out of 5 stars" before the comment text.

## 9. Smoke tests after deploy (P6.7)

- [ ] `curl -i https://<host>/` returns 200 and the HTML includes the
      testimonials section markup (or omits it cleanly when empty).
- [ ] `curl -i https://<host>/api/reviews/public` returns 200 with JSON.
- [ ] Send an invite from `/admin` on the deployed host → email arrives in a
      real inbox (not just the server console).
- [ ] Restart the host → admin session still valid (cookie survives), DB rows
      still present (volume mounted correctly).

---

When every box above is checked, the release is ready. If any item fails,
stop and file a follow-up before shipping.
