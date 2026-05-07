import type { GoogleReview } from '@/lib/google-reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  review: GoogleReview;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const isFilled = i < rating;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
          />
        );
      })}
    </div>
  );
};

export default function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <Card className="bg-white border-gray-100 shadow-lg h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <CardContent className="p-8 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#ffe5ec]">
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  fill
                  sizes="48px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <p className="font-semibold font-headline text-[#1a1a1a] text-sm">{review.author_name}</p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <Quote className="h-8 w-8 text-[#D8006E]/10" />
          </div>
          <p className="text-gray-600 italic font-body mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 font-medium">{review.relative_time_description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
