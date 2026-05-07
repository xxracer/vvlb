import TestimonialCard from '@/components/shared/TestimonialCard';
import { getGoogleReviews } from '@/lib/google-reviews';
import { Quote } from 'lucide-react';

export default async function TestimonialsSection() {
  const reviews = await getGoogleReviews();
  const displayedReviews = reviews.slice(0, 3);

  return (
    <section id="testimonials" className="py-28 bg-[#ffe5ec] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#D8006E]/3 blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D8006E]/10 shadow-sm mb-6">
            <Quote className="h-4 w-4 text-[#D8006E]" />
            <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">Reviews</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-[#1a1a1a] mb-6 leading-[1.1]">
            Loved by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#7400D8]">
              Hundreds
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto font-body">
            Real stories from real clients who keep coming back.
          </p>
        </div>

        {displayedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedReviews.map((review, index) => (
              <TestimonialCard key={index} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            <p>Could not load reviews at this time. Please check our Google Business Profile for the latest testimonials!</p>
          </div>
        )}
      </div>
    </section>
  );
}
