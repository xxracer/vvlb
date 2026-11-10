import type { Metadata } from 'next';
import Icon from '@/components/site/Icon';

export const metadata: Metadata = {
  title: '15-Minute Brazilian Wax in Sugar Land, TX | Viva La Beauty Wax',
  description:
    'Viva La Beauty Wax specializes in 15-minute women’s Brazilians, men’s waxing, and full-body waxing in Sugar Land. Houston’s Best Gold Winner in 2025 and 2026.',
};

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span></span> Speed waxing in Sugar Land, TX
            </p>
            <h1>
              15-minute
              <br />
              <em>Brazilians.</em>
            </h1>
            <p className="hero-description">
              Our signature women’s Brazilian takes just 15 minutes. Book women’s and men’s
              Brazilians, full-body waxing, and more with Vanessa in her private Sugar Land studio.
            </p>
            <div className="hero-actions">
              <a className="button" href="https://vivalabeautywax.glossgenius.com/services">
                Book an Appointment
                <Icon name="arrow-up-right" />
              </a>
              <a className="text-link" href="#services">
                Explore Services <Icon name="arrow-down" />
              </a>
            </div>
            <div className="hero-trust">
              <a href="https://www.google.com/maps/place/?q=place_id:ChIJK6tHHNTnQIYRcJ8W5BN6-jg">
                <span className="stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>5.0 on Google</span>
              </a>
              <span className="trust-divider" aria-hidden="true"></span>
              <span>12+ years of experience</span>
            </div>
          </div>
          <div className="studio-hero">
            <div className="carousel-track">
              <figure className="carousel-slide studio">
                <img
                  src="/assets/studio.jpg"
                  width="960"
                  height="1280"
                  alt="Waxing treatment room at Viva La Beauty in Sugar Land"
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption>
                  <span>Inside Viva La Beauty</span>The Sugar Land studio
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="award-band" id="awards" aria-labelledby="award-heading">
        <div className="wrap award-layout">
          <div className="award-main">
            <img
              className="award-logo"
              src="/assets/houstons-best-2025-winner.png"
              width="1344"
              height="672"
              alt="Houston’s Best 2025 Hair Removal Winner"
            />
            <div>
              <p className="eyebrow">Back-to-back Gold in Hair Removal</p>
              <h2 id="award-heading">Voted Houston’s Best</h2>
            </div>
          </div>
          <div className="award-years" aria-label="Official Houston’s Best results">
            <a
              href="https://houstonsbest.com/2025-houstons-best-winners/"
              aria-label="Houston’s Best 2025 award results"
            >
              <span>2025</span>
              <Icon name="arrow-up-right" />
            </a>
            <a href="https://houstonsbest.com/winners/" aria-label="Houston’s Best 2026 award results">
              <span>2026</span>
              <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services" aria-labelledby="services-heading">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span></span> The Wax Menu
              </p>
              <h2 id="services-heading">Most loved services</h2>
            </div>
            <a className="text-link" href="https://vivalabeautywax.glossgenius.com/services">
              View All Services
              <Icon name="arrow-up-right" />
            </a>
          </div>
          <div className="services-grid">
            <article className="service-card signature">
              <figure className="service-photo womens-coverage">
                <img
                  src="/assets/womens-brazilian-photo.webp"
                  width="1200"
                  height="1685"
                  loading="lazy"
                  decoding="async"
                  alt="Photo of a woman in black bikini briefs with an outline marking front Brazilian wax coverage"
                />
                <svg className="coverage-outline" viewBox="0 0 640 480" aria-hidden="true">
                  <path d="M 166 128 C 208 200 385 249 520 287 L 516 299 C 439 307 368 307 320 332 Q 300 343 291 321 C 251 255 185 215 164 177 Q 152 156 166 128 Z" />
                </svg>
                <span className="service-feature">Signature</span>
              </figure>
              <div className="service-content">
                <h3>Women’s Brazilian</h3>
                <p>Our signature speed wax with a butt strip included. First visits are $70.</p>
                <div className="service-meta">
                  <strong>$55+</strong>
                  <span>
                    <Icon name="clock" />
                    15 min
                  </span>
                </div>
                <a
                  href="https://vivalabeautywax.glossgenius.com/services"
                  aria-label="Open the booking menu for Women’s Brazilian"
                >
                  Book service
                  <Icon name="arrow-up-right" />
                </a>
              </div>
            </article>
            <article className="service-card">
              <figure className="service-photo mens-coverage">
                <img
                  src="/assets/mens-black-swimwear-v7.webp"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  decoding="async"
                  alt="AI-generated photo of an adult man in black swim shorts with a front coverage guide"
                />
                <svg className="coverage-outline" viewBox="0 0 1448 1086" aria-hidden="true">
                  <path d="M 616 497 Q 709 518 798 497 L 799 546 Q 752 565 724 617 Q 709 632 696 617 Q 665 565 613 546 Z" />
                </svg>
              </figure>
              <div className="service-content">
                <h3>Men’s Brazilian</h3>
                <p>Private, precise Brazilian waxing. First visits are $90.</p>
                <div className="service-meta">
                  <strong>$80+</strong>
                  <span>
                    <Icon name="clock" />
                    20 min
                  </span>
                </div>
                <a
                  href="https://vivalabeautywax.glossgenius.com/services"
                  aria-label="Open the booking menu for Men’s Brazilian"
                >
                  Book service
                  <Icon name="arrow-up-right" />
                </a>
              </div>
            </article>
            <article className="service-card">
              <figure className="service-photo">
                <img
                  src="/assets/full-leg-wax-service.webp"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  decoding="async"
                  alt="Legs shown from the thighs to the ankles"
                />
              </figure>
              <div className="service-content">
                <h3>Full Leg Wax</h3>
                <p>Smooth from upper thigh to ankle, with options for women and men.</p>
                <div className="service-meta">
                  <strong>$85+</strong>
                  <span>
                    <Icon name="clock" />
                    45 min
                  </span>
                </div>
                <a
                  href="https://vivalabeautywax.glossgenius.com/services"
                  aria-label="Open the booking menu for Full Leg Wax"
                >
                  Book service
                  <Icon name="arrow-up-right" />
                </a>
              </div>
            </article>
            <article className="service-card">
              <figure className="service-photo">
                <img
                  src="/assets/brow-wax-service.webp"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  decoding="async"
                  alt="Close-up of two naturally shaped brows"
                />
              </figure>
              <div className="service-content">
                <h3>Brow Wax</h3>
                <p>Shaped and cleaned up to complement your natural brows.</p>
                <div className="service-meta">
                  <strong>$15</strong>
                  <span>
                    <Icon name="clock" />
                    10 min
                  </span>
                </div>
                <a
                  href="https://vivalabeautywax.glossgenius.com/services"
                  aria-label="Open the booking menu for Brow Wax"
                >
                  Book service
                  <Icon name="arrow-up-right" />
                </a>
              </div>
            </article>
          </div>
          <p className="service-note">
            Explore the full menu for underarms, bikini, chest, back, and face waxing. Dashed outlines
            show front Brazilian wax coverage. See your booking option for butt strip details.
          </p>
        </div>
      </section>

      <section
        className="memberships section-pad"
        id="memberships"
        aria-labelledby="memberships-heading"
      >
        <div className="wrap membership-layout">
          <div className="membership-intro">
            <p className="eyebrow">
              <span></span> For Your Regular Wax
            </p>
            <h2 id="memberships-heading">
              Waxing <em>memberships.</em>
            </h2>
            <p>
              If you book the same services regularly, browse the studio’s memberships to find a plan
              that fits your routine.
            </p>
            <a
              className="text-link"
              href="https://vivalabeautywax.glossgenius.com/shop/memberships?tab=explore"
            >
              Explore All Memberships <Icon name="arrow-up-right" />
            </a>
          </div>
          <article
            className="membership-feature"
            id="brazilian-bestie"
            aria-labelledby="bestie-heading"
          >
            <p className="eyebrow">
              <Icon name="sparkle" /> Featured Monthly Membership
            </p>
            <h3 id="bestie-heading">The Brazilian Bestie</h3>
            <ul className="membership-includes" aria-label="Included waxes">
              <li>
                <Icon name="check" /> Brazilian
              </li>
              <li>
                <Icon name="check" /> Underarms
              </li>
              <li>
                <Icon name="check" /> Upper lip
              </li>
            </ul>
            <div className="membership-card-bottom">
              <p className="membership-price">
                <strong>$59</strong>
                <span> / month</span>
              </p>
              <a
                className="button"
                href="https://vivalabeautywax.glossgenius.com/shop/memberships?tab=explore"
              >
                View Membership <Icon name="arrow-up-right" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="about section-pad" id="about" aria-labelledby="about-heading">
        <div className="wrap about-layout">
          <figure className="about-photo studio-action">
            <img
              src="/assets/vanessa-preparing-wax.webp"
              width="1242"
              height="2208"
              alt="Vanessa preparing wax at Viva La Beauty"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <Icon name="pin" /> Sugar Land, Texas <span>Suite 192</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">
              <span></span> Meet Vanessa
            </p>
            <h2 id="about-heading">
              Beauty is an <em>art form.</em>
            </h2>
            <p>
              Vanessa Avellaneda, founder and licensed esthetician, has spent more than 12 years
              refining her waxing technique. She brings a quick, thorough approach and one-on-one care
              to every visit.
            </p>
            <p>
              Whether it’s your first Brazilian, your regular wax, or prep for a competition, Vanessa
              will walk you through what to expect.
            </p>
            <ul className="about-details">
              <li>
                <Icon name="check" /> Personalized care
              </li>
              <li>
                <Icon name="check" /> Premium hard wax
              </li>
              <li>
                <Icon name="check" /> Speed and precision
              </li>
            </ul>
            <a className="text-link" href="/about">
              More About Vanessa <Icon name="arrow-right" />
            </a>
          </div>
        </div>
      </section>

      <section className="reviews section-pad" id="testimonials" aria-labelledby="reviews-heading">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span></span> Client Reviews
              </p>
              <h2 id="reviews-heading">What clients say</h2>
            </div>
            <a
              className="text-link"
              href="https://www.google.com/maps/place/?q=place_id:ChIJK6tHHNTnQIYRcJ8W5BN6-jg"
            >
              Read Google Reviews
              <Icon name="arrow-up-right" />
            </a>
          </div>
          <div className="reviews-grid">
            <figure className="review-card">
              <span className="stars" aria-label="5 stars">
                ★★★★★
              </span>
              <blockquote>“The experience was great”</blockquote>
              <figcaption>
                <strong>Kyle Leinen</strong>
                <span>Google review</span>
              </figcaption>
            </figure>
            <figure className="review-card">
              <span className="stars" aria-label="5 stars">
                ★★★★★
              </span>
              <blockquote>“She is so kind and professional.”</blockquote>
              <figcaption>
                <strong>Stuti B</strong>
                <span>Google review</span>
              </figcaption>
            </figure>
            <figure className="review-card">
              <span className="stars" aria-label="5 stars">
                ★★★★★
              </span>
              <blockquote>“Vanessa is thorough and provides the cleanest, most professional wax experience.”</blockquote>
              <figcaption>
                <strong>Zahra Rajpoot</strong>
                <span>Google review</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="faq section-pad" id="faq" aria-labelledby="faq-heading">
        <div className="wrap faq-layout">
          <div>
            <p className="eyebrow">
              <span></span> Before Your Visit
            </p>
            <h2 id="faq-heading">Good to know</h2>
            <p className="faq-intro">Have a question about your appointment?</p>
            <a className="text-link" href="https://vivalabeautywax.glossgenius.com/contact">
              Ask Vanessa
              <Icon name="arrow-up-right" />
            </a>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                <span>What waxing services do you offer?</span>
                <Icon name="plus" />
              </summary>
              <p>
                We offer Brazilian, bikini, leg, underarm, arm, back, chest, stomach, brow and face
                waxing for women and men. See the booking menu for the full list.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>How do I book an appointment?</span>
                <Icon name="plus" />
              </summary>
              <p>
                <a href="https://vivalabeautywax.glossgenius.com/services">Book through GlossGenius</a>{' '}
                to select your service and see available times.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>Do you offer gift cards, packages or memberships?</span>
                <Icon name="plus" />
              </summary>
              <p>
                Packages and{' '}
                <a href="https://vivalabeautywax.glossgenius.com/shop/memberships?tab=explore">
                  waxing memberships
                </a>{' '}
                are available through GlossGenius. Contact the studio to ask about gift cards.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>How should I prepare for my wax?</span>
                <Icon name="plus" />
              </summary>
              <p>
                Let your hair grow to about ¼ inch. Gently exfoliate the day before your visit, skip
                lotions and oils on the day of, and wear loose, comfortable clothing.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>How long does a Brazilian take?</span>
                <Icon name="plus" />
              </summary>
              <p>
                The signature women’s Brazilian is booked for 15 minutes and the standard men’s
                Brazilian for 20 minutes. Add-ons and other services have their own appointment
                lengths in GlossGenius.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>What is your cancellation policy?</span>
                <Icon name="plus" />
              </summary>
              <p>
                Please give at least 24 hours’ notice if you need to cancel. Cancellations with less
                than 24 hours’ notice and no-shows are subject to a fee of 100% of the scheduled
                service price. See the <a href="/terms-of-service">Terms of Service</a> for booking and
                deposit details.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>Where is the studio?</span>
                <Icon name="plus" />
              </summary>
              <p>
                Find us at{' '}
                <a href="https://www.google.com/maps/place/Viva+La+Beauty/@29.6033214,-95.6124699,17z">
                  15315 Southwest Fwy, Suite 192, Sugar Land, TX 77478
                </a>
                . Free parking is available on site.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span>Do you take walk-ins?</span>
                <Icon name="plus" />
              </summary>
              <p>Visits are by appointment only. Book online to see the available times.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="sponsors" aria-labelledby="sponsors-heading">
        <div className="wrap sponsors-layout">
          <h2 className="eyebrow" id="sponsors-heading">
            Proud Sponsor Of
          </h2>
          <div className="sponsor-links">
            <a href="https://officialalphaland.com/">
              <img src="/assets/alphaland.png" alt="" loading="lazy" />
              <span>AlphaLand</span>
            </a>
            <a href="https://summershredding.com/">
              <img src="/assets/summer-shredding.png" alt="" loading="lazy" />
              <span>Summer Shredding</span>
            </a>
            <a href="https://www.instagram.com/htx_posedown/">
              <img src="/assets/htx-posedown.png" alt="" loading="lazy" />
              <span>HTX Posedown</span>
            </a>
            <a href="https://musclebeachclassic.com/">
              <span>Muscle Beach Classic</span>
            </a>
          </div>
        </div>
      </section>

      <section className="visit" aria-labelledby="visit-heading">
        <div className="wrap visit-layout">
          <div>
            <p className="eyebrow">
              <span></span> Viva La Beauty Wax
            </p>
            <h2 id="visit-heading">Ready for your next wax?</h2>
            <p>15315 Southwest Fwy, Suite 192, Sugar Land, TX 77478</p>
          </div>
          <div className="visit-actions">
            <a className="button" href="https://vivalabeautywax.glossgenius.com/services">
              Book an Appointment
              <Icon name="arrow-up-right" />
            </a>
            <a
              className="text-link"
              href="https://www.google.com/maps/place/Viva+La+Beauty/@29.6033214,-95.6124699,17z"
            >
              Get Directions
              <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
