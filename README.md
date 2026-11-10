# Viva La Beauty Wax

This is a Next.js web application for Viva La Beauty Wax, a private speed-waxing studio in Sugar Land, Texas.

The site is a faithful rebuild of the standalone `Viva-La-Beauty-Wax-HTML` template. Layout, copy, images, fonts and iconography match the original template; the markup is rendered through the Next.js App Router.

## Pages

-   `/` — Home
-   `/about` — Meet Vanessa
-   `/terms-of-service` — Terms of Service
-   `/privacy-policy` — Privacy Policy

## Project structure

-   `src/app/(main)/` — page routes and the shared header/footer layout
-   `src/components/site/` — shared header, footer and icon components
-   `src/app/globals.css` — the original template stylesheet (fonts, layout, responsive rules)
-   `public/assets/` — images, local fonts (`Cormorant Garamond`, `DM Sans`) and the SVG icon sprite

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The application should now be running at [http://localhost:9002](http://localhost:9002).

### 3. Build for production

```bash
npm run build
npm start
```

## Booking

Booking and membership links point directly to the studio's public GlossGenius pages. Those links require internet access and are opened outside the site.
