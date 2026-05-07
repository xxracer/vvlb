"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/training', label: 'Training' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const iconUrl = "https://static.wixstatic.com/media/c5947c_105b98aad40c4d4c8ca7de374634e9fa~mv2.png";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 text-[#1a1a1a] hover:text-[#D8006E] transition-colors duration-300">
            <Image src={iconUrl} alt="Sparkle" width={32} height={32} className="h-8 w-8" />
            <span className="text-2xl font-headline font-semibold">Viva La Beauty</span>
          </Link>

          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#D8006E] transition-colors duration-300 font-medium text-sm uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-[#D8006E] to-[#b8005e] hover:from-[#e61a7d] hover:to-[#c90069] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-full px-6"
            >
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-[#1a1a1a] hover:bg-gray-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white border-gray-100 p-6">
                <div className="flex flex-col space-y-8">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image src={iconUrl} alt="Sparkle" width={28} height={28} className="h-7 w-7" />
                      <span className="text-xl font-headline font-semibold">Viva La Beauty</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" aria-label="Close menu" className="text-[#1a1a1a] hover:bg-gray-100">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="text-lg text-gray-700 hover:text-[#D8006E] transition-colors py-3 block border-b border-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#D8006E] to-[#b8005e] hover:from-[#e61a7d] hover:to-[#c90069] text-white border-0 rounded-full"
                    >
                      <Link href="/book">Book Now</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
