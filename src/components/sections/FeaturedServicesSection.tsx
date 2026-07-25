"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, ShieldCheck, Award, Heart, Clock, PlusCircle } from 'lucide-react';

import { getPopularServices } from '@/lib/services-catalog';
import { GLOSSGENIUS_URL } from '@/lib/constants';

export default function FeaturedServicesSection() {
  const popularServices = getPopularServices();

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D8006E]/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D8006E]/10 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-[#D8006E]" />
            <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">
              Popular
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#1a1a1a] leading-[1.1]">
            Most Loved{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#7400D8]">
              Services
            </span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularServices.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col h-full overflow-hidden transition-all duration-500 group bg-white border-gray-100 hover:border-[#D8006E]/20 hover:shadow-xl hover:shadow-[#D8006E]/5 hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-xl font-headline text-[#1a1a1a] mb-2 group-hover:text-[#D8006E] transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-sm mb-4 line-clamp-3">
                  {service.description}
                </CardDescription>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-xl text-[#D8006E]">${service.price}</span>
                  <span className="flex items-center text-gray-400">
                    <Clock className="mr-1.5 h-4 w-4" />
                    {service.duration} min
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Button
                  asChild
                  className="w-full rounded-xl bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 hover:shadow-lg hover:shadow-[#D8006E]/20"
                >
                  <a href={GLOSSGENIUS_URL} target="_blank" rel="noopener noreferrer">
                    <PlusCircle className="mr-2 h-4 w-4" /> Book This Service
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

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
              <p className="text-sm text-gray-500 font-body">
                Certified professionals with 12+ years of hands-on waxing expertise.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#ffe5ec]/50 border border-[#D8006E]/10 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#7400D8]/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-[#7400D8]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">Gentle Technique</h4>
              <p className="text-sm text-gray-500 font-body">
                Premium hard wax and painless methods for sensitive skin.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#ffe5ec]/50 border border-[#D8006E]/10 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#ff4da6]/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#ff4da6]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">Houston&apos;s Best</h4>
              <p className="text-sm text-gray-500 font-body">
                Award-winning studio with 5.0 stars across hundreds of reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
