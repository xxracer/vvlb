import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowUpRight } from 'lucide-react';

export default function TrainingPromoSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7400D8]/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7400D8]/10 border border-[#7400D8]/20 text-[#7400D8] text-sm font-semibold uppercase tracking-wide">
              <GraduationCap className="h-4 w-4" />
              New Offering
            </div>

            <h2 className="text-5xl md:text-6xl font-headline font-bold text-[#1a1a1a] leading-[1.1]">
              Master the Art of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7400D8] to-[#D8006E]">
                Waxing
              </span>
            </h2>

            <p className="text-lg text-gray-500 font-body leading-relaxed max-w-lg">
              Unlock professional waxing education focused on speed, client comfort, and luxury add-on services. Customized classes for beauty schools, salons, and individual estheticians ready to grow.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#7400D8] to-[#5e00b0] hover:from-[#8a1ae6] hover:to-[#7200c9] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-full px-8 group"
            >
              <Link href="/training">
                Explore Training
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/trainingimage.png"
                alt="Hands-on waxing training session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-[#7400D8]/20 rounded-[2rem] -z-10" />
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#7400D8]/10 rounded-[1.5rem] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
