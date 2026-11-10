import type { Metadata } from 'next';
import Icon from '@/components/site/Icon';

export const metadata: Metadata = {
  title: 'Privacy Policy | Viva La Beauty Wax',
  description:
    'This notice explains how Viva La Beauty Wax handles information when you visit our site, contact the studio, or book a service.',
};

export default function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>
          <p>
            This notice explains how Viva La Beauty Wax handles information when you visit our site,
            contact the studio, or book a service.
          </p>
          <span className="policy-draft">Draft for studio review</span>
        </div>
      </div>
      <div className="wrap policy-layout">
        <nav className="policy-index" aria-label="On this page">
          <p className="eyebrow">On This Page</p>
          <ul>
            <li>
              <a href="#collection">Information we receive</a>
            </li>
            <li>
              <a href="#use">How we use information</a>
            </li>
            <li>
              <a href="#providers">Service providers and links</a>
            </li>
            <li>
              <a href="#retention">Records and privacy choices</a>
            </li>
            <li>
              <a href="#contact">Contact us about privacy</a>
            </li>
          </ul>
        </nav>
        <article className="policy-body">
          <section id="collection">
            <h2>Information we receive</h2>
            <p>
              If you call or message us, we receive the contact information and details you choose to
              share. When you book through GlossGenius, we receive appointment and client details
              needed to provide your service, such as your name, contact details, selected service,
              and appointment time.
            </p>
            <p>
              GlossGenius and its payment providers collect card information used for online booking
              and deposits. This website directs you to GlossGenius to enter those details.
            </p>
          </section>
          <section id="use">
            <h2>How we use information</h2>
            <p>
              We use information to manage appointments and payments, send booking confirmations or
              reminders, respond to questions, and maintain records for studio operations.
            </p>
            <p>
              If you receive promotional messages from the studio, follow the opt-out instructions in
              the message or contact us to update your preferences.
            </p>
          </section>
          <section id="providers">
            <h2>Service providers and links</h2>
            <p>
              We use GlossGenius to manage online bookings and payments. Website hosting and security
              providers may receive technical information such as your IP address, browser type, and
              request logs to deliver and protect the site.
            </p>
            <p>
              When you visit GlossGenius, Google Maps, or social media through a link on this site,
              those services may collect information and use cookies under their own policies. See the{' '}
              <a href="https://glossgenius.com/legal/privacy">GlossGenius Privacy Policy</a> for details
              about its services.
            </p>
          </section>
          <section id="retention">
            <h2>Records and privacy choices</h2>
            <p>
              We keep information as needed to manage appointments, resolve questions or disputes, and
              meet recordkeeping obligations.
            </p>
            <p>
              You can contact us to ask about information you have shared with the studio or to request
              a correction or deletion. We may ask for details to verify your request and may retain
              records where required by law.
            </p>
          </section>
          <section id="contact">
            <h2>Contact us about privacy</h2>
            <p>
              Call <a href="tel:+18323161814">(832) 316-1814</a> or{' '}
              <a href="https://vivalabeautywax.glossgenius.com/contact">send the studio a message</a>{' '}
              about this policy or your information. Please leave payment card details out of messages.
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
            <a className="text-link" href="/terms-of-service">
              Read the Terms of Service <Icon name="arrow-right" />
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
