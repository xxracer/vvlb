import { redirect } from 'next/navigation';
import { GLOSSGENIUS_URL } from '@/lib/constants';

// GlossGenius blocks framing from third-party origins (X-Frame-Options / CSP
// frame-ancestors), so /book cannot host the booking site in an iframe.
// Instead, visiting /book redirects the user directly to the GlossGenius
// site where they complete the booking.
export default function BookingPage() {
  redirect(GLOSSGENIUS_URL);
}
