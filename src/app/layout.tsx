import type { Metadata, Viewport } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

export const metadata: Metadata = {
  title: '15-Minute Brazilian Wax in Sugar Land, TX | Viva La Beauty Wax',
  description:
    'Viva La Beauty Wax specializes in 15-minute women’s Brazilians, men’s waxing, and full-body waxing in Sugar Land. Houston’s Best Gold Winner in 2025 and 2026.',
  icons: {
    icon: '/assets/viva-la-beauty-logo.png',
  },
  openGraph: {
    title: '15-Minute Brazilian Wax in Sugar Land, TX | Viva La Beauty Wax',
    description:
      'Viva La Beauty Wax specializes in 15-minute women’s Brazilians, men’s waxing, and full-body waxing in Sugar Land. Houston’s Best Gold Winner in 2025 and 2026.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vivalabeauty.com',
    siteName: 'Viva La Beauty',
  },
};

export const viewport: Viewport = {
  themeColor: '#fbf6f2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="preload"
          href="/assets/cormorant-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
