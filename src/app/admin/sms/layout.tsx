import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'SMS Admin - Viva La Beauty',
  description: 'Admin panel for sending SMS to Acuity contacts.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function AdminSmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-neutral-50 text-neutral-900">
      {children}
    </div>
  );
}
