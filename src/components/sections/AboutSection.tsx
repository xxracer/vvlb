import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Heart, Shield, Zap } from 'lucide-react';

const features = [
  { icon: Heart, text: 'Personalized Care' },
  { icon: Shield, text: 'Hygienic Standards' },
  { icon: Zap, text: 'Speed & Precision' },
];

export default function AboutSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#D8006E]/3 blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Image side - asymmetric */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="https://static.wixstatic.com/media/c5947c_76dc43206651421fae1dee0ed1b30a5b~mv2.jpg"
                alt="Viva La Beauty Salon Interior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Glass card overlay */}
            <div className="absolute -bottom-8 -right-4 lg:right-[-2rem] bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-2xl max-w-[260px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8006E] to-[#7400D8] flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a]">Vanessa</p>
                  <p className="text-xs text-gray-500">Founder & Lead Esthetician</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                "I believe every client deserves to feel confident and radiant."
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#D8006E]/20 rounded-[2rem] -z-10" />
          </div>

          {/* Text side */}
          <div className="lg:col-span-7 lg:pl-12">
            <span className="text-[#D8006E] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-[#1a1a1a] mb-6 leading-[1.1]">
              Beauty is an
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#7400D8]">
                Art Form
              </span>
            </h2>
            <p className="text-lg text-gray-500 mb-6 font-body leading-relaxed">
              Nestled in the heart of Sugar Land, Viva La Beauty is more than a salon — it's a sanctuary where expertise meets passion. With over a decade of experience, Vanessa has perfected the art of waxing, combining speed, comfort, and flawless results in every session.
            </p>
            <p className="text-lg text-gray-500 mb-10 font-body leading-relaxed">
              Whether you're preparing for a competition, a special occasion, or simply treating yourself, you'll leave feeling refreshed, empowered, and undeniably beautiful.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 px-4 py-2 bg-[#ffe5ec] rounded-full">
                  <feature.icon className="h-4 w-4 text-[#D8006E]" />
                  <span className="text-sm font-medium text-[#1a1a1a]">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 text-gray-600 mb-8 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <MapPin className="h-5 w-5 text-[#D8006E] flex-shrink-0 mt-0.5" />
              <a
                href="https://www.google.com/maps/place/Viva+La+Beauty/@29.6033214,-95.6124699,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#D8006E] transition-colors"
              >
                15315 Southwest Fwy ste. 192, Sugar Land, TX 77478
              </a>
            </div>

            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-[#D8006E] to-[#b8005e] hover:from-[#e61a7d] hover:to-[#c90069] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-full px-8"
            >
              <Link href="/book">Book Your Visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
