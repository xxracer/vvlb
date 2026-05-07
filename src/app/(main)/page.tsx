import HeroSection from '@/components/sections/HeroSection';
import FeaturedServicesSection from '@/components/sections/FeaturedServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GiftCardSection from '@/components/sections/GiftCardSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import WaveDivider from '@/components/shared/WaveDivider';
import { getGoogleReviews } from '@/lib/google-reviews';

export default async function HomePage() {
  const reviews = await getGoogleReviews();
  const firstReview = reviews.length > 0 ? reviews[0] : undefined;

  return (
    <>
      <HeroSection review={firstReview} />
      <div className="bg-white">
        <WaveDivider fill="#ffe5ec" />
      </div>
      <FeaturedServicesSection />
      <div className="bg-white">
        <WaveDivider fill="#ffe5ec" />
      </div>
      <AboutSection />
      <TestimonialsSection />
      <GiftCardSection />
      <SponsorsSection />
      <CallToActionSection />
    </>
  );
}
