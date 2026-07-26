import { redirect } from 'next/navigation';
import { GLOSSGENIUS_URL } from '@/lib/constants';

// Services are managed entirely on the GlossGenius booking site.
// Visiting /services redirects there instead of rendering a local
// services screen.
export default function ServicesPage() {
  redirect(GLOSSGENIUS_URL);
}