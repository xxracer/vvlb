"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/shared/ServiceCard';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getAcuityAppointmentTypes, type AcuityAppointmentType, type AcuityPackage } from '@/ai/flows/acuity-booking-flow';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Gift, Box, User, UserPlus } from 'lucide-react';

type SubCategory = 'Face' | 'Mid Body' | 'Lower Body';

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<AcuityAppointmentType[]>([]);
  const [allPackages, setAllPackages] = useState<AcuityPackage[]>([]);
  const [displayedServices, setDisplayedServices] = useState<(AcuityAppointmentType | AcuityPackage)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<'women' | 'men' | 'gift-package' | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [servicesRes, packagesRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/packages')
        ]);

        if (!servicesRes.ok || !packagesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const fetchedServices = await servicesRes.json();
        const fetchedPackages = await packagesRes.json();

        console.log("Fetched Services:", fetchedServices.length);
        console.log("Fetched Packages:", fetchedPackages.length);

        setAllServices(fetchedServices.filter((s: AcuityAppointmentType) => !s.private));
        setAllPackages(fetchedPackages);
      } catch (error) {
        console.error("Failed to fetch services or packages:", error);
        toast({
          title: "Error",
          description: "Could not load services. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  useEffect(() => {
    let servicesToDisplay: (AcuityAppointmentType | AcuityPackage)[] = [];
    const menKeywords = ["men's", "gentleman’s", "the gentleman's"];

    const categories: Record<SubCategory, string[]> = {
      'Face': ['nose', 'lip', 'chin', 'brow', 'eyebrow', 'face', 'sideburn', 'ear', 'facial'],
      'Mid Body': ['back', 'chest', 'stomach', 'underarm', 'arm'],
      'Lower Body': ['brazilian', 'bikini', 'leg', 'butt'],
    };

    if (category === 'women' || category === 'men') {
      let genderSpecificServices = allServices;
      if (category === 'men') {
        genderSpecificServices = allServices.filter(service =>
          menKeywords.some(kw => service.name.toLowerCase().includes(kw))
        );
      } else { // women
        genderSpecificServices = allServices.filter(service =>
          !menKeywords.some(kw => service.name.toLowerCase().includes(kw))
        );
      }

      if (activeSubCategory) {
        const keywords = categories[activeSubCategory] || [];
        servicesToDisplay = genderSpecificServices.filter(service =>
          keywords.some(kw => service.name.toLowerCase().includes(kw))
        );
      } else {
        servicesToDisplay = genderSpecificServices;
      }
    } else if (category === 'gift-package') {
      servicesToDisplay = allPackages;
    } else {
      // No category selected: show ALL services by default
      servicesToDisplay = allServices;
    }

    setDisplayedServices(servicesToDisplay);
  }, [category, activeSubCategory, allServices, allPackages]);

  const handleServiceSelect = (service: AcuityAppointmentType | AcuityPackage) => {
    const isPackage = 'kind' in service;
    if (isPackage) {
      // Gift cards y packages se navegan directamente
      toast({
        title: service.isGiftCertificate ? "Buying Gift Card..." : "Buying Package...",
        description: `You are booking for ${service.name}.`,
      });
      router.push(`/schedule?package=${service.id}`);
      return;
    }

    // Servicio regular: ir directo al iframe de Acuity
    toast({
      title: "Booking...",
      description: `You are booking ${service.name}.`,
    });
    router.push(`/schedule?appointmentType=${service.id}`);
  };

  const selectCategory = (selectedCategory: 'women' | 'men' | 'gift-package') => {
    setCategory(selectedCategory);
    setActiveSubCategory(null);
  };

  const selectSubCategory = (category: SubCategory) => {
    setActiveSubCategory(category);
  };

  const hasServices = displayedServices.length > 0;
  const subCategories: SubCategory[] = ['Face', 'Mid Body', 'Lower Body'];

  return (
    <div className="bg-[#ffe5ec] py-12 md:py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#D8006E] text-sm font-semibold tracking-widest uppercase mb-4 block">Services</span>
          <h1 className="text-5xl font-headline font-bold text-[#1a1a1a] mb-4">
            Our Beauty & Waxing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
            Discover a comprehensive range of treatments designed to make you look and feel your best.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            onClick={() => selectCategory('women')}
            variant={category === 'women' ? 'default' : 'outline'}
            className={category === 'women' ? 'bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-6' : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#D8006E]/30 hover:text-[#D8006E]'}
          >
            <User className="h-4 w-4" /> Women
          </Button>
          <Button
            onClick={() => selectCategory('men')}
            variant={category === 'men' ? 'default' : 'outline'}
            className={category === 'men' ? 'bg-gradient-to-r from-[#7400D8] to-[#5e00b0] text-white border-0 rounded-full px-6' : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#7400D8]/30 hover:text-[#7400D8]'}
          >
            <UserPlus className="h-4 w-4" /> Men
          </Button>
          <Button
            onClick={() => selectCategory('gift-package')}
            variant={category === 'gift-package' ? 'default' : 'outline'}
            className={category === 'gift-package' ? 'bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 rounded-full px-6' : 'rounded-full px-6 border-gray-200 text-gray-700 hover:border-[#D8006E]/30 hover:text-[#D8006E]'}
          >
            <Gift className="h-4 w-4" /> Gift Cards & Packages
          </Button>
        </div>

        {(category === 'women' || category === 'men') && (
          <div className="flex justify-center gap-3 mb-12">
            {subCategories.map(subCat => (
              <Button
                key={subCat}
                onClick={() => selectSubCategory(subCat)}
                variant={activeSubCategory === subCat ? 'secondary' : 'outline'}
                className={activeSubCategory === subCat ? 'bg-[#D8006E]/10 text-[#D8006E] border-[#D8006E]/20 rounded-full' : 'rounded-full border-gray-200 text-gray-600 hover:border-[#D8006E]/20'}
              >
                {subCat}
              </Button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : category === 'gift-package' ? (
          <>
            {/* Sección Gift Cards */}
            {(() => {
              const giftCards = allPackages.filter(p => p.isGiftCertificate);
              return giftCards.length > 0 ? (
                <div className="mb-12">
                  <h2 className="text-3xl font-headline font-semibold text-primary mb-6 flex items-center gap-2">
                    <Gift className="h-7 w-7" /> Gift Cards
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {giftCards.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onSelect={() => handleServiceSelect(service)}
                        isSelected={false}
                      />
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Sección Packages & Subscriptions */}
            {(() => {
              const packages = allPackages.filter(p => p.kind === 'package' || p.kind === 'subscription');
              return packages.length > 0 ? (
                <div>
                  <h2 className="text-3xl font-headline font-semibold text-primary mb-6 flex items-center gap-2">
                    <Box className="h-7 w-7" /> Packages & Subscriptions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onSelect={() => handleServiceSelect(service)}
                        isSelected={false}
                      />
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Mensaje si no hay nada */}
            {allPackages.length === 0 && (
              <p className="text-center text-muted-foreground font-body text-lg">
                No gift cards or packages found. Please check back soon or contact us!
              </p>
            )}
          </>
        ) : (
          hasServices ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={() => handleServiceSelect(service)}
                  isSelected={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body text-lg">
              No services found for this category. Please check back soon or contact us!
            </p>
          )
        )}
      </div>
    </div>
  );
}
