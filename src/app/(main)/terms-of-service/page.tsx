import type { Metadata } from 'next';
import Icon from '@/components/site/Icon';

export const metadata: Metadata = {
  title: 'Terms of Service | Viva La Beauty Wax',
  description:
    'These terms explain how to book a service with Viva La Beauty Wax and what to expect if your plans change.',
};

export default function TermsOfServicePage() {
  return (
    <main className="policy" id="main">
      <div className="policy-hero">
        <div className="wrap">
          <a className="text-link policy-back" href="/">
            <Icon name="arrow-left" /> Back to Home
          </a>
          <p className="eyebrow">
            <span></span> Studio Policies
          </p>
          <h1>Terms of Service</h1>
          <p>
            These terms explain how to book a service with Viva La Beauty Wax and what to expect if
            your plans change.
          </p>
          <span className="policy-draft">Draft for studio review</span>
        </div>
      </div>
      <div className="wrap policy-layout">
        <nav className="policy-index" aria-label="On this page">
          <p className="eyebrow">On This Page</p>
          <ul>
            <li>
              <a href="#booking">Booking and pricing</a>
            </li>
            <li>
              <a href="#deposits">Deposits and payments</a>
            </li>
            <li>
              <a href="#cancellations">Cancellations and no-shows</a>
            </li>
            <li>
              <a href="#appointments">Your appointment</a>
            </li>
            <li>
              <a href="#third-party">Online booking and third-party sites</a>
            </li>
            <li>
              <a href="#contact">Contact the studio</a>
            </li>
          </ul>
        </nav>
        <article className="policy-body">
          <section id="booking">
            <h2>Booking and pricing</h2>
            <p>
              Viva La Beauty Wax offers waxing services by appointment in Sugar Land, Texas. Use{' '}
              <a href="https://vivalabeautywax.glossgenius.com/services">
                our GlossGenius booking page
              </a>{' '}
              to see current prices, estimated service times, and availability.
            </p>
            <p>
              Prices and service options can change. Review your selected service, any required
              deposit, and the amount shown at checkout before confirming.
            </p>
          </section>
          <section id="deposits">
            <h2>Deposits and payments</h2>
            <p>
              GlossGenius displays the required deposit, if any, for the service you select. The
              amount varies by service. Review the payment and deposit terms presented during booking
              before you confirm.
            </p>
            <p>
              If you have questions about how a deposit is handled after a cancellation or reschedule,{' '}
              <a href="https://vivalabeautywax.glossgenius.com/contact">contact the studio</a> before
              booking.
            </p>
          </section>
          <section id="cancellations">
            <h2>Cancellations and no-shows</h2>
            <p>
              Please give at least 24 hours’ notice to cancel or reschedule. Cancellations with less
              than 24 hours’ notice and missed appointments are subject to a fee of 100% of the
              scheduled service price.
            </p>
            <p>
              Use the link in your booking confirmation to manage your appointment, or call the studio
              if you need help.
            </p>
          </section>
          <section id="appointments">
            <h2>Your appointment</h2>
            <p>
              Let Vanessa know before your wax about any sensitivities or skin concerns that could
              affect your service. If you’re running late or need an accommodation, contact the studio.
            </p>
            <p>Waxing is a cosmetic service. Timing can vary with the service you select and any add-ons.</p>
          </section>
          <section id="third-party">
            <h2>Online booking and third-party sites</h2>
            <p>
              The website links to GlossGenius for scheduling and payments. GlossGenius has its own{' '}
              <a href="https://glossgenius.com/legal/user-terms">terms of use</a> and{' '}
              <a href="https://glossgenius.com/legal/privacy">privacy policy</a>.
            </p>
          </section>
          <section id="contact">
            <h2>Contact the studio</h2>
            <p>
              For questions about a booking or these terms, call{' '}
              <a href="tel:+18323161814">(832) 316-1814</a> or{' '}
              <a href="https://vivalabeautywax.glossgenius.com/contact">send Vanessa a message</a>.
            </p>
            <p>
              Viva La Beauty Wax
              <br />
              15315 Southwest Fwy, Suite 192
              <br />
              Sugar Land, TX 77478
            </p>
          </section>
          <p className="policy-other">
            <a className="text-link" href="/privacy-policy">
              Read the Privacy Policy <Icon name="arrow-right" />
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
