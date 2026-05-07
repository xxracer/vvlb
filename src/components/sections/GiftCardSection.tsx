"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/shared/ServiceCard';
import { Loader2, Gift } from 'lucide-react';
import type { AcuityPackage } from '@/ai/flows/acuity-booking-flow';
import { useToast } from '@/hooks/use-toast';

export default function GiftCardSection() {
  const [giftCards, setGiftCards] = useState<AcuityPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchGiftCards() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/packages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        const packages: AcuityPackage[] = await res.json();
        setGiftCards(packages.filter(p => p.isGiftCertificate));
      } catch (error) {
        console.error("Failed to fetch gift cards:", error);
        toast({ title: "Error", description: "Could not load gift cards.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchGiftCards();
  }, [toast]);

  const handleSelect = (giftCard: AcuityPackage) => {
    toast({ title: "Buying Gift Card...", description: `You selected ${giftCard.name}. Redirecting to purchase.` });
    router.push(`/schedule?package=${giftCard.id}`);
  };

  if (!isLoading && giftCards.length === 0) return null;

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#D8006E]/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffe5ec] border border-[#D8006E]/10 mb-6">
            <Gift className="h-4 w-4 text-[#D8006E]" />
            <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">Gifts</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-[#1a1a1a] mb-6 leading-[1.1]">
            Give the Gift of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#ff4da6]">
              Beauty
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto font-body">
            Perfect for birthdays, anniversaries, or just because. Let them choose their own glow-up.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-[#D8006E]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {giftCards.map((giftCard) => (
              <ServiceCard
                key={giftCard.id}
                service={giftCard}
                onSelect={() => handleSelect(giftCard)}
                isSelected={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
