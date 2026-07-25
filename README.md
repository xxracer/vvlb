# Viva La Beauty

This is a Next.js web application for Viva La Beauty, a waxing salon. The site lets users browse services and book appointments through an embedded iframe of the salon's public GlossGenius site.

## Features

-   **Service Listings**: Browse available beauty and waxing services.
-   **Integrated Booking**: A picker-based flow on `/book` that hands off to the public GlossGenius site (`https://vivalabeautywax.glossgenius.com/`) via an iframe.
-   **Responsive Design**: A modern, mobile-friendly interface built with Next.js, Tailwind CSS, and shadcn/ui.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:9002](http://localhost:9002).

### How the booking flow works

1.  The user lands on `/book` and sees a service picker (gender → body area → service).
2.  When the user picks a service, the picker is replaced by an `<iframe>` that loads `https://vivalabeautywax.glossgenius.com/`.
3.  The user completes the booking inside that iframe (cross-origin, GlossGenius handles availability, payments, and confirmations).
4.  A "Back to services" button returns the user to the picker.

The iframe URL is hard-coded in `src/components/shared/GlossGeniusEmbed.tsx`. If GlossGenius ever blocks framing from our domain (via `X-Frame-Options` or CSP `frame-ancestors`), the iframe will appear blank — replace it with a styled call-to-action linking to the same URL.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Scheduling**: [GlossGenius](https://www.glossgenius.com/) (public site embedded via iframe)
