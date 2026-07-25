"use client";

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What types of waxing services do you offer?',
    answer:
      'We offer a full range of waxing services for both women and men, including Brazilian, bikini, full leg, half leg, underarm, arm, back, chest, stomach, brow, lip, chin, sideburn, and full face wax. We use premium hard wax that is gentle on sensitive skin.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book directly through our online scheduling site. Just click any "Book" or "Book Now" button on this page and you will be taken to our booking site where you can pick your service, provider, date, and time in real time.',
  },
  {
    question: 'Do you offer gift cards or packages?',
    answer:
      'Yes. Gift cards, waxing packages, and memberships are all available for purchase on our booking site under the "Gift Cards & Packages" section. They make a perfect gift for any occasion.',
  },
  {
    question: 'What should I do to prepare for my waxing appointment?',
    answer:
      'For best results, hair should be at least 1/4 inch long (about 2 weeks of growth). Gently exfoliate the area 24 hours before your appointment and avoid applying lotions or oils on the day of. Wear loose, comfortable clothing.',
  },
  {
    question: 'How long does a typical waxing service take?',
    answer:
      'Service times vary: a Brazilian or bikini takes about 20–30 minutes, a full leg takes about 45 minutes, and smaller services like lip, chin, or brows take 10–15 minutes. You will see the exact duration when you select your service online.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'We kindly ask for at least 24 hours notice for cancellations or reschedules. You can manage your appointment directly from the confirmation email we send — no need to call.',
  },
  {
    question: 'Where are you located?',
    answer:
      'We are located at 15315 Southwest Fwy ste. 192, Sugar Land, TX 77478. Free parking is available on site.',
  },
  {
    question: 'Do you take walk-ins?',
    answer:
      'We are by appointment only so we can give every client our full attention. Booking ahead guarantees your spot with your preferred provider.',
  },
];

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#D8006E]/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#D8006E] transition-colors font-headline">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#ffe5ec] group-hover:bg-[#D8006E] flex items-center justify-center transition-colors">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#D8006E] group-hover:text-white transition-colors" />
          ) : (
            <Plus className="h-4 w-4 text-[#D8006E] group-hover:text-white transition-colors" />
          )}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 font-body leading-relaxed pr-12">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 bg-gradient-to-b from-white to-[#ffe5ec]/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#7400D8]/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D8006E]/10 shadow-sm mb-6">
            <HelpCircle className="h-4 w-4 text-[#D8006E]" />
            <span className="text-sm text-[#D8006E] tracking-widest uppercase font-semibold">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#1a1a1a] leading-[1.1]">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8006E] to-[#7400D8]">
              Questions
            </span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto font-body">
            Everything you need to know before your visit. Can&apos;t find what you&apos;re looking
            for? Reach out — we&apos;re happy to help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-[#D8006E]/10 px-6 sm:px-8">
          {FAQS.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
