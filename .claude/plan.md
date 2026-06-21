# Plan: Secure `/admin/sms` with password, rate limits, and XSS hardening

## Current state
- `/admin/sms` exists and works but has **no authentication** (only a warning banner).
- API routes `/api/admin/contacts` and `/api/admin/sms/send` are publicly accessible.
- There is basic Zod validation and some mobile styling, but no security controls.

## Goal
Add production-grade (but lightweight) security:
1. Password login using env variable `ADMIN_SMS_PASSWORD=Vanessavvlb`.
2. Session cookie that protects both the page and the API routes.
3. Rate limiting on API routes (per-IP and global).
4. XSS / input hardening (sanitization, output escaping, security headers).
5. Keep the admin UI usable on mobile.

## Security approach

### Password & session
- Env var: `ADMIN_SMS_PASSWORD=Vanessavvlb`.
- Login API: `POST /api/admin/auth` validates password and sets an **httpOnly, secure, SameSite=strict** cookie named `admin_sms_session`.
- Session value: timestamp + HMAC signed with the password (server-only), with a 24-hour expiry.
- Logout API: `DELETE /api/admin/auth` clears the cookie.
- Server components and API routes read the cookie via `next/headers` and verify the HMAC.
- If not authenticated, the page renders a login form instead of the admin dashboard.

### Route-level protection
- `src/app/api/admin/auth/route.ts`: login/logout.
- `src/app/api/admin/contacts/route.ts`: require valid session; rate-limit contacts fetching.
- `src/app/api/admin/sms/send/route.ts`: require valid session; rate-limit sends; validate and sanitize payload.

### Rate limiting (in-memory)
- Per-IP limits using `x-forwarded-for` / `x-real-ip`.
- Defaults (overridable via env):
  - `ADMIN_SMS_MAX_CONTACTS_PER_MINUTE` = 30
  - `ADMIN_SMS_MAX_SEND_PER_MINUTE` = 10
  - `ADMIN_SMS_MAX_SEND_PER_HOUR` = 100
  - `ADMIN_SMS_MAX_SEND_PER_DAY` = 500
  - `ADMIN_SMS_MAX_RECIPIENTS_PER_REQUEST` = 100
- Exceeding limits returns `429 Too Many Requests`.

### XSS / input hardening
- Server-side sanitization of message and first name: strip `<`, `>`, and control characters.
- No `dangerouslySetInnerHTML`; React text nodes already escape.
- Contacts data rendered with `truncate` and text nodes only.
- Zod schema enforces E.164-like phone format and max length.
- Send endpoint requires an opt-out phrase (`STOP`, `opt out`, or `unsubscribe`) before sending.

### Security headers
- Add a `headers()` function in `next.config.ts` for all routes:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` baseline
  - `Cache-Control: no-store` for `/admin/*`
- Skip a strict CSP for now because the public site relies on external scripts/images; we can add a targeted CSP later if requested.

### Mobile UX
- Login form uses full-width inputs and large tap targets.
- Admin page already has mobile card view; keep it and slightly improve spacing/touch sizes.
- Add `robots` metadata `noindex, nofollow` in `/admin/sms/layout.tsx`.

## Files to create
1. `src/lib/admin-auth.ts` — password check, signed session cookie helpers, rate limiter, SMS text sanitizer.
2. `src/app/api/admin/auth/route.ts` — login/logout.
3. `src/app/admin/sms/_components/LoginForm.tsx` — password form.

## Files to modify
1. `.env` — add `ADMIN_SMS_PASSWORD=Vanessavvlb` and optional rate-limit vars.
2. `next.config.ts` — add security headers.
3. `src/app/admin/sms/layout.tsx` — add `robots` noindex.
4. `src/app/admin/sms/page.tsx` — require session; render login form when unauthenticated.
5. `src/app/api/admin/contacts/route.ts` — require session + rate limit.
6. `src/app/api/admin/sms/send/route.ts` — require session + rate limit + stricter validation + opt-out check.
7. `src/components/ui/...` if needed for login form (reuse existing `Input`, `Button`, `Card`).

## Verification
1. Start dev server and open `/admin/sms` in an incognito window: should show only a password form.
2. Enter wrong password: error, no cookie set.
3. Enter `Vanessavvlb`: admin dashboard loads.
4. Try `/api/admin/contacts` without cookie: `401`.
5. Try `/api/admin/sms/send` without cookie: `401`.
6. Send a message with no opt-out: `400`.
7. Run `npm run typecheck`.
8. Capture a 375 px mobile screenshot of `/admin/sms` to confirm layout is usable.
