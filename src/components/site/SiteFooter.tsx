'use client';

import { usePathname } from 'next/navigation';

export default function SiteFooter() {
  const pathname = usePathname();
  const active =
    pathname === '/about'
      ? 'about'
      : pathname === '/terms-of-service'
        ? 'terms'
        : pathname === '/privacy-policy'
          ? 'privacy'
          : undefined;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="brand" href="/" aria-label="Viva La Beauty Wax home">
              <span className="brand-image">
                <img src="/assets/viva-la-beauty-logo.png" alt="" width="2048" height="2048" />
              </span>
              <span className="brand-wordmark">
                Viva La Beauty<span>Waxing Studio</span>
              </span>
            </a>
            <p>Private waxing studio in Sugar Land, Texas. By appointment only.</p>
          </div>
          <div className="footer-column">
            <h2>Visit the Studio</h2>
            <a href="https://www.google.com/maps/place/Viva+La+Beauty/@29.6033214,-95.6124699,17z">
              15315 Southwest Fwy, Suite 192<br />Sugar Land, TX 77478
            </a>
            <a href="tel:+18323161814">(832) 316-1814</a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="https://vivalabeautywax.glossgenius.com/services">Services &amp; Booking</a>
            <a href="/#memberships">Memberships</a>
            <a href="/about" aria-current={active === 'about' ? 'page' : undefined}>
              Meet Vanessa
            </a>
            <a href="/#testimonials">Client Reviews</a>
          </div>
          <div className="footer-column">
            <h2>Follow Us</h2>
            <a href="https://www.instagram.com/vivalabeautywax/">Instagram</a>
            <a href="https://www.facebook.com/vanessa.avellaneda.257916">Facebook</a>
            <a href="https://www.tiktok.com/@vivalabeautywax2025">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© 2026 Viva La Beauty. All rights reserved.</small>
          <nav aria-label="Policies">
            <a href="/terms-of-service" aria-current={active === 'terms' ? 'page' : undefined}>
              Terms of Service
            </a>
            <a href="/privacy-policy" aria-current={active === 'privacy' ? 'page' : undefined}>
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
