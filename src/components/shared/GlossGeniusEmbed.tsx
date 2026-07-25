"use client";

import { CalendarDays, ExternalLink, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GLOSSGENIUS_URL = 'https://vivalabeautywax.glossgenius.com/';

/**
 * Booking entry point for /book.
 *
 * We tried embedding https://vivalabeautywax.glossgenius.com/ via an
 * <iframe>, but GlossGenius blocks framing from third-party origins
 * (via X-Frame-Options / CSP frame-ancestors), so the iframe rendered
 * blank. As a fallback, this page opens the GlossGenius site in a new
 * tab where the client can pick services, dates, and times natively.
 *
 * If GlossGenius later changes its framing policy, you can swap the
 * <Button asChild><a> below for an <iframe src={GLOSSGENIUS_URL} />.
 */
export default function GlossGeniusEmbed() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <CardTitle>Book Your Appointment</CardTitle>
          </div>
          <CardDescription>
            You&apos;ll be taken to our GlossGenius booking site to pick your service, date, and time.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-[#D8006E]/15 bg-gradient-to-br from-[#ffe5ec]/60 to-white p-8 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-[#D8006E] mb-4" />
            <h2 className="text-2xl font-headline font-semibold text-[#1a1a1a] mb-2">
              Ready to book your glow-up?
            </h2>
            <p className="text-gray-600 font-body mb-6 max-w-md mx-auto">
              Choose from Brazilian wax, full leg, brow shaping, facials, and more — all in one place.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-10 py-7 text-lg shadow-xl shadow-[#D8006E]/30 hover:shadow-2xl hover:shadow-[#D8006E]/40 hover:-translate-y-0.5 transition-all"
            >
              <a href={GLOSSGENIUS_URL} target="_blank" rel="noopener noreferrer">
                Book Now on GlossGenius
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Opens in a new tab · secured by GlossGenius
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#ffe5ec]/40 border border-[#D8006E]/10">
              <Clock className="h-5 w-5 text-[#D8006E] mb-2" />
              <p className="text-sm font-semibold text-[#1a1a1a]">Real-time availability</p>
              <p className="text-xs text-gray-500 mt-1">See open times instantly</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#ffe5ec]/40 border border-[#D8006E]/10">
              <ShieldCheck className="h-5 w-5 text-[#7400D8] mb-2" />
              <p className="text-sm font-semibold text-[#1a1a1a]">Secure checkout</p>
              <p className="text-xs text-gray-500 mt-1">Cards, Apple Pay &amp; more</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#ffe5ec]/40 border border-[#D8006E]/10">
              <Sparkles className="h-5 w-5 text-[#ff4da6] mb-2" />
              <p className="text-sm font-semibold text-[#1a1a1a]">Gift cards &amp; packages</p>
              <p className="text-xs text-gray-500 mt-1">Available at booking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
