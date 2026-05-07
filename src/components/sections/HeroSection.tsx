"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Star, Clock, MapPin, Quote } from 'lucide-react';

type ReviewData = {
  text: string;
  author_name: string;
  rating: number;
};

export default function HeroSection({ review }: { review?: ReviewData }) {
  const googlePlaceId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const googleMapsUrl = googlePlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`
    : undefined;

  const floatingReview: ReviewData = review || {
    text: "The best Brazilian wax I've ever had. Minimal pain and super smooth results. The salon is clean and inviting. Five stars!",
    author_name: "Emily R.",
    rating: 5,
  };

  const truncatedText = floatingReview.text.length > 120
    ? floatingReview.text.slice(0, 120) + "..."
    : floatingReview.text;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#ffe5ec]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[40%] -right-[20%] w-[900px] h-[900px] rounded-full bg-[#D8006E]/20 blur-[120px] animate-[spin_20s_linear_infinite]"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div
          className="absolute -bottom-[30%] -left-[20%] w-[800px] h-[800px] rounded-full bg-[#7400D8]/15 blur-[140px] animate-[spin_25s_linear_infinite_reverse]"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div className="absolute top-[20%] left-[50%] w-[500px] h-[500px] rounded-full bg-[#ff4da6]/10 blur-[100px]" />
      </div>

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-[1000px] h-[2500px] md:w-[1060px] md:h-[1100px] lg:w-[1500px] lg:h-[2000px] max-w-[70000px] max-h-[500000px] md:max-w-[100000px] md:max-h-[70000px] lg:max-w-[100400px] lg:max-h-[90000px] opacity-[0.4]">
          <Image
            src="https://static.wixstatic.com/media/c5947c_105b98aad40c4d4c8ca7de374634e9fa~mv2.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-160px)]">
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-[#D8006E]/10 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-[#D8006E] animate-pulse" />
              <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">Houston&apos;s Best Waxing Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-[6.5rem] font-headline font-bold text-[#1a1a1a] leading-[0.9] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Viva La
              <span className="block bg-gradient-to-r from-[#D8006E] via-[#ff4da6] to-[#7400D8] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(216,0,110,0.3)]">
                Beauty
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 max-w-lg mb-8 font-body leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Sugar Land&apos;s premier destination for luxury waxing & beauty. Book your glow-up today.
            </p>

            {/* Service Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              {['Brazilian Wax', 'Full Leg', 'Underarm', 'Brow & Face'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-[#D8006E]/10 text-sm text-[#D8006E] font-medium shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                asChild
                className="relative bg-gradient-to-r from-[#D8006E] to-[#b8005e] hover:from-[#e61a7d] hover:to-[#c90069] text-white border-0 shadow-xl shadow-[#D8006E]/30 hover:shadow-2xl hover:shadow-[#D8006E]/40 transition-all duration-500 px-10 py-7 text-lg rounded-full hover:-translate-y-1 overflow-hidden group"
              >
                <Link href="/book">
                  <span className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                  <CalendarDays className="mr-2 h-5 w-5 relative z-10" />
                  <span className="relative z-10">Book Appointment</span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#1a1a1a]/15 text-[#1a1a1a] hover:bg-white/60 hover:border-[#1a1a1a]/25 transition-all duration-300 px-10 py-7 text-lg rounded-full bg-white/30 backdrop-blur-md hover:-translate-y-1"
              >
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-[#D8006E]/10 flex items-center justify-center">
                  <Star className="h-4 w-4 text-[#D8006E] fill-[#D8006E]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider leading-none">Google Rating</p>
                  <p className="text-sm font-bold text-[#1a1a1a] leading-tight">5.0 Stars</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-[#7400D8]/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-[#7400D8]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider leading-none">Experience</p>
                  <p className="text-sm font-bold text-[#1a1a1a] leading-tight">12+ Years</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-[#ff4da6]/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#ff4da6]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider leading-none">Location</p>
                  <p className="text-sm font-bold text-[#1a1a1a] leading-tight">Sugar Land, TX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards (desktop only) */}
          <div className="hidden lg:flex relative items-center justify-center h-full min-h-[500px]">
            {/* Floating Review Card */}
            <a
              href={googleMapsUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[10%] right-[5%] bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-xl shadow-[#D8006E]/5 max-w-[260px] animate-fade-in-up cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-[#D8006E]/30 transition-all duration-300 group"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < floatingReview.rating ? 'text-[#D8006E] fill-[#D8006E]' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 font-body mb-3 leading-relaxed">
                <Quote className="inline h-3 w-3 text-[#D8006E] mr-1" />
                {truncatedText}
              </p>
              <p className="text-xs font-semibold text-[#1a1a1a]">— {floatingReview.author_name}</p>
              <p className="text-[10px] text-[#D8006E] mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">View all reviews →</p>
            </a>

            {/* Floating Award Card */}
            <div className="absolute bottom-[15%] left-[0%] bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-xl shadow-[#7400D8]/5 inline-flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <Image
                src="https://static.wixstatic.com/media/285fa5_0b0d21708449487b8104e8d671332e56~mv2.png/v1/fill/w_610,h_304,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/houstonsbest.png"
                alt="Houston's Best"
                width={80}
                height={40}
                className="h-auto w-[70px]"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-[#1a1a1a]">Houston&apos;s Best</p>
                <p className="text-xs text-gray-500">Award Winning Studio</p>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#D8006E]/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#7400D8]/10 animate-[spin_25s_linear_infinite_reverse]" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-[#D8006E]/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-[#D8006E] animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
