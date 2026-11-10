import type { Metadata } from 'next';
import Icon from '@/components/site/Icon';

export const metadata: Metadata = {
  title: 'Meet Vanessa Avellaneda | Viva La Beauty Wax, Sugar Land',
  description:
    'Meet Vanessa Avellaneda, the licensed esthetician behind Viva La Beauty Wax, a private speed waxing studio in Sugar Land, TX.',
};

export default function AboutPage() {
  return (
    <main id="main" className="vanessa-page">
      <section className="vanessa-hero" aria-labelledby="vanessa-heading">
        <div className="wrap vanessa-layout">
          <div className="vanessa-copy">
            <p className="eyebrow">
              <span></span> Founder &amp; Licensed Esthetician
            </p>
            <h1 id="vanessa-heading">
              Meet <em>Vanessa.</em>
            </h1>
            <p>
              I opened Viva La Beauty to give my Sugar Land clients a private studio where waxing
              feels personal, efficient, and comfortable.
            </p>
            <p>
              I’ve spent over 12 years refining my technique. My specialty is speed waxing, including
              my signature 15-minute women’s Brazilian. I also offer men’s Brazilians, full-body
              waxing, and brow shaping.
            </p>
            <div className="hero-actions">
              <a className="button" href="https://vivalabeautywax.glossgenius.com/services">
                Book with Vanessa <Icon name="arrow-up-right" />
              </a>
              <a className="text-link" href="/#services">
                Explore Services <Icon name="arrow-right" />
              </a>
            </div>
          </div>
          <figure className="vanessa-photo">
            <img
              src="/assets/vanessa-studio-portrait.webp"
              width="1320"
              height="1670"
              alt="Vanessa Avellaneda, founder and licensed esthetician at Viva La Beauty Wax"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              Vanessa Avellaneda <span>Owner, Viva La Beauty Wax</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about section-pad" aria-labelledby="vanessa-studio-heading">
        <div className="wrap about-layout">
          <figure className="about-photo">
            <img
              src="/assets/studio.jpg"
              width="960"
              height="1280"
              alt="The private Viva La Beauty Wax treatment room in Sugar Land"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <Icon name="pin" /> Sugar Land, Texas <span>Suite 192</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">
              <span></span> The Studio
            </p>
            <h2 id="vanessa-studio-heading">One-on-one care.</h2>
            <p>
              I started in esthetics because I loved beauty and skin care. Working in waxing studios
              around Sugar Land taught me how much a thoughtful, one-on-one visit matters, especially
              for a first wax.
            </p>
            <p>
              Bring your questions, tell me about any skin sensitivities, and I’ll walk you through
              what to expect before we get started.
            </p>
            <a className="text-link" href="/#testimonials">
              Read Client Reviews <Icon name="arrow-right" />
            </a>
          </div>
        </div>
      </section>

      <section className="visit" aria-labelledby="visit-vanessa-heading">
        <div className="wrap visit-layout">
          <div>
            <p className="eyebrow">
              <span></span> By Appointment
            </p>
            <h2 id="visit-vanessa-heading">Visit the Sugar Land studio</h2>
            <p>15315 Southwest Fwy, Suite 192, Sugar Land, TX 77478</p>
          </div>
          <div className="visit-actions">
            <a className="button" href="https://vivalabeautywax.glossgenius.com/services">
              Book an Appointment <Icon name="arrow-up-right" />
            </a>
            <a
              className="text-link"
              href="https://www.google.com/maps/place/Viva+La+Beauty/@29.6033214,-95.6124699,17z"
            >
              Get Directions <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
