"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, PlusCircle, User, UserPlus, Gift, Box } from 'lucide-react';

import { SERVICES_CATALOG, type Gender } from '@/lib/services-catalog';
import { GLOSSGENIUS_URL } from '@/lib/constants';

type ServiceCategory = 'women' | 'men' | 'gift-package' | 'all';
type SubCategory = 'Face' | 'Mid Body' | 'Lower Body';

const AREA_TO_SUBCATEGORY: Record<string, SubCategory> = {
  face: 'Face',
  mid: 'Mid Body',
  low: 'Lower Body',
};

const subCategories: SubCategory[] = ['Face', 'Mid Body', 'Lower Body'];

export default function ServicesPage() {
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);

  const selectCategory = (selectedCategory: ServiceCategory) => {
    setCategory(selectedCategory);
    setActiveSubCategory(null);
  };

  const filteredServices = (() => {
    if (category === 'women' || category === 'men') {
      const gender: Gender = category === 'women' ? 'female' : 'male';
      let services = SERVICES_CATALOG.filter((s) => s.gender === gender);
      if (activeSubCategory) {
        services = services.filter((s) => AREA_TO_SUBCATEGORY[s.area] === activeSubCategory);
      }
      return services;
    }
    if (category === 'all') {
      return SERVICES_CATALOG;
    }
    return [];
  })();

  return (
    <div className="bg-[#ffe5ec] py-12 md:py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#D8006E] text-sm font-semibold tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h1 className="text-5xl font-headline font-bold text-[#1a1a1a] mb-4">
            Our Beauty & Waxing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
            Discover a comprehensive range of treatments designed to make you look and feel your
            best.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            onClick={() => selectCategory('women')}
            variant={category === 'women' ? 'default' : 'outline'}
            className={
              category === 'women'
                ? 'bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-6'
                : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#D8006E]/30 hover:text-[#D8006E]'
            }
          >
            <User className="h-4 w-4" /> Women
          </Button>
          <Button
            onClick={() => selectCategory('men')}
            variant={category === 'men' ? 'default' : 'outline'}
            className={
              category === 'men'
                ? 'bg-gradient-to-r from-[#7400D8] to-[#5e00b0] text-white border-0 rounded-full px-6'
                : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#7400D8]/30 hover:text-[#7400D8]'
            }
          >
            <UserPlus className="h-4 w-4" /> Men
          </Button>
          <Button
            onClick={() => selectCategory('gift-package')}
            variant={category === 'gift-package' ? 'default' : 'outline'}
            className={
              category === 'gift-package'
                ? 'bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-6'
                : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#D8006E]/30 hover:text-[#D8006E]'
            }
          >
            <Gift className="h-4 w-4" /> Gift Cards & Packages
          </Button>
          <Button
            onClick={() => selectCategory('all')}
            variant={category === 'all' ? 'default' : 'outline'}
            className={
              category === 'all'
                ? 'bg-gradient-to-r from-[#1a1a1a] to-[#333333] text-white border-0 rounded-full px-6'
                : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#1a1a1a]/30 hover:text-[#1a1a1a]'
            }
          >
            View All
          </Button>
        </div>

        {(category === 'women' || category === 'men') && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {subCategories.map((subCat) => (
              <Button
                key={subCat}
                onClick={() => setActiveSubCategory(subCat)}
                variant={activeSubCategory === subCat ? 'secondary' : 'outline'}
                className={
                  activeSubCategory === subCat
                    ? 'bg-[#D8006E]/10 text-[#D8006E] border-[#D8006E]/20 rounded-full'
                    : 'rounded-full border-gray-200 text-gray-600 hover:border-[#D8006E]/20'
                }
              >
                {subCat}
              </Button>
            ))}
          </div>
        )}

        {category === 'gift-package' ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6">
              <Box className="h-10 w-10 text-[#D8006E]" />
            </div>
            <h3 className="text-2xl font-headline font-semibold text-[#1a1a1a] mb-3">
              Gift cards available at booking
            </h3>
            <p className="text-gray-500 max-w-md mx-auto font-body mb-6">
              Browse and purchase gift cards, packages, and memberships through our booking
              experience. You can pick one up as a gift or treat yourself.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-6"
            >
              <a href={GLOSSGENIUS_URL} target="_blank" rel="noopener noreferrer">View Gift Options</a>
            </Button>
          </div>
        ) : category === null ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6">
              <User className="h-10 w-10 text-[#D8006E]" />
            </div>
            <h3 className="text-2xl font-headline font-semibold text-[#1a1a1a] mb-3">
              Select a Category
            </h3>
            <p className="text-gray-500 max-w-md mx-auto font-body">
              Tap Women, Men, Gift Cards &amp; Packages, or View All above to browse our services.
            </p>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col h-full overflow-hidden transition-all duration-500 group bg-white border-gray-100 hover:border-[#D8006E]/20 hover:shadow-xl hover:shadow-[#D8006E]/5 hover:-translate-y-1"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                    {/* Using a plain <img> here intentionally: the Wix CDN
                        already allows the host, and we want lazy, native
                        loading without next/image's optimization for the
                        catalog. */}
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
        ) : (
          <p className="text-center text-muted-foreground font-body text-lg">
            No services found for this category. Please check back soon or contact us!
          </p>
        )}
      </div>
    </div>
  );
}
