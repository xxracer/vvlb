"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, ArrowRight, Sparkles, ShieldCheck, Award, Heart } from 'lucide-react';
import { getAcuityAppointmentTypes, type AcuityAppointmentType } from '@/ai/flows/acuity-booking-flow';
import { useToast } from '@/hooks/use-toast';

export default function FeaturedServicesSection() {
  const [featuredServices, setFeaturedServices] = useState<AcuityAppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const allServices = (await getAcuityAppointmentTypes()).filter(s => !s.private);

        const popularServiceKeywords = ["brazilian", "full leg", "under arm"];
        const featured = popularServiceKeywords.map(keyword => {
          return allServices.find(s => s.name.toLowerCase().includes(keyword));
        }).filter((service): service is AcuityAppointmentType => service !== undefined);

        setFeaturedServices(featured);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast({ title: "Error", description: "Could not load featured services.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, [toast]);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D8006E]/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D8006E]/10 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-[#D8006E]" />
            <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">Popular</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#1a1a1a] leading-[1.1]">
            Most Loved <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#7400D8]">Services</span>
          </h2>
          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/5 hover:border-[#1a1a1a]/30 rounded-full px-8 bg-white/50 backdrop-blur-sm"
            >
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-[#D8006E]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={() => router.push(`/book`)}
                isSelected={false}
              />
            ))}
          </div>
        )}

        {/* Why Choose Us */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#1a1a1a]">
              Why Clients Love Us
            </h3>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto font-body">
              Experience the difference of a studio that puts your comfort and confidence first.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#ffe5ec]/50 border border-[#D8006E]/10 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#D8006E]/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-[#D8006E]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">Expert Specialists</h4>
              <p className="text-sm text-gray-500 font-body">Certified professionals with 12+ years of hands-on waxing expertise.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#ffe5ec]/50 border border-[#D8006E]/10 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#7400D8]/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-[#7400D8]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">Gentle Technique</h4>
              <p className="text-sm text-gray-500 font-body">Premium hard wax and painless methods for sensitive skin.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#ffe5ec]/50 border border-[#D8006E]/10 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#ff4da6]/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#ff4da6]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">Houston&apos;s Best</h4>
              <p className="text-sm text-gray-500 font-body">Award-winning studio with 5.0 stars across hundreds of reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
