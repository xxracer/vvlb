'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/components/site/Icon';

export default function SiteHeader() {
  const pathname = usePathname();
  const active = pathname === '/about' ? 'about' : undefined;
  const mobileNavRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!mobileNav) return;

    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a')) mobileNav.open = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileNav.open) {
        mobileNav.open = false;
        mobileNav.querySelector('summary')?.focus();
      }
    };

    mobileNav.addEventListener('click', handleClick);
    mobileNav.addEventListener('keydown', handleKeyDown);

    return () => {
      mobileNav.removeEventListener('click', handleClick);
      mobileNav.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement">
        <a href="/#awards">
          <Icon name="sparkle" /> Houston’s Best Gold Winner{' '}
          <span aria-hidden="true">·</span> 2025 &amp; 2026
        </a>
      </div>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href="/" aria-label="Viva La Beauty Wax home">
            <span className="brand-image">
              <img src="/assets/viva-la-beauty-logo.png" alt="" width="2048" height="2048" />
            </span>
            <span className="brand-wordmark">
              Viva La Beauty<span>Waxing Studio</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="/#services">Services</a>
            <a href="/#memberships">Memberships</a>
            <a href="/about" aria-current={active === 'about' ? 'page' : undefined}>
              Meet Vanessa
            </a>
            <a href="/#testimonials">Reviews</a>
            <a href="/#faq">FAQ</a>
          </nav>
          <a
            className="button button-small header-book"
            href="https://vivalabeautywax.glossgenius.com/services"
          >
            Book Now
            <Icon name="arrow-up-right" />
          </a>
          <details className="mobile-nav" ref={mobileNavRef}>
            <summary aria-label="Toggle navigation">
              <Icon name="menu" />
              <Icon name="close" />
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="/#services">Services</a>
              <a href="/#memberships">Memberships</a>
              <a href="/about" aria-current={active === 'about' ? 'page' : undefined}>
                Meet Vanessa
              </a>
              <a href="/#testimonials">Reviews</a>
              <a href="/#faq">FAQ</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
