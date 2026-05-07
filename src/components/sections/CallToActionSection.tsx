import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarCheck2, Sparkles } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8006E] via-[#a00050] to-[#7400D8]" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/10 blur-[150px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] rounded-full bg-white/10 blur-[180px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-10">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm text-white/90 tracking-widest uppercase font-medium">Start Your Journey</span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white mb-8 leading-[0.95]">
          Ready to
          <span className="block">Glow Up?</span>
        </h2>
        <p className="text-xl max-w-xl mx-auto mb-14 font-body text-white/80">
          Your best skin is one appointment away. Book now and experience why Sugar Land trusts Viva La Beauty.
        </p>
        <Button
          size="lg"
          asChild
          className="bg-white text-[#D8006E] hover:bg-gray-50 hover:scale-105 transition-all duration-500 shadow-2xl rounded-full px-12 py-8 text-lg font-bold"
        >
          <Link href="/book">
            <CalendarCheck2 className="mr-3 h-6 w-6" />
            Schedule Your Visit
          </Link>
        </Button>
      </div>
    </section>
  );
}
