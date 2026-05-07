import Image from 'next/image';
import type { AcuityAppointmentType, AcuityPackage } from '@/ai/flows/acuity-booking-flow';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlusCircle, CheckCircle, Gift, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: AcuityAppointmentType | AcuityPackage;
  onSelect: () => void;
  isSelected: boolean;
}

export default function ServiceCard({ service, onSelect, isSelected }: ServiceCardProps) {
  const imageHint = service.name.toLowerCase().split(' ').slice(0,2).join(' ') || 'beauty service';

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden transition-all duration-500 cursor-pointer group",
        "bg-white border-gray-100 hover:border-[#D8006E]/20 hover:shadow-xl hover:shadow-[#D8006E]/5 hover:-translate-y-1",
        isSelected && "ring-2 ring-[#D8006E] shadow-xl shadow-[#D8006E]/10 border-[#D8006E]/30"
      )}
      onClick={onSelect}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
          <Image
            src={service.image || `https://placehold.co/600x400/f3f4f6/D8006E?text=${encodeURIComponent(service.name)}`}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={imageHint}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {isSelected && (
            <div className="absolute top-4 right-4 bg-[#D8006E] rounded-full p-2 shadow-lg shadow-[#D8006E]/30">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-7">
        <CardTitle className="text-xl font-headline text-[#1a1a1a] mb-3 group-hover:text-[#D8006E] transition-colors duration-300">
          {service.name}
        </CardTitle>
        <p className="text-gray-500 text-sm mb-5 font-body line-clamp-3 leading-relaxed">
          {service.description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-xl text-[#D8006E]">${service.price}</span>
          {'duration' in service && service.duration && (
            <span className="flex items-center text-gray-400">
              <Clock className="mr-1.5 h-4 w-4" />
              {service.duration} min
            </span>
          )}
          {'kind' in service && (
            <span className="flex items-center text-gray-400 uppercase text-xs font-bold tracking-wider">
              {('isGiftCertificate' in service && service.isGiftCertificate) ? (
                <>
                  <Gift className="mr-1 h-4 w-4" />
                  Gift Card
                </>
              ) : (
                <>
                  <Box className="mr-1 h-4 w-4" />
                  {(service as AcuityPackage).kind}
                </>
              )}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-7 pt-0 mt-auto">
        <Button
          variant={isSelected ? "secondary" : "default"}
          className={cn(
            "w-full pointer-events-none rounded-xl transition-all duration-300",
            isSelected
              ? "bg-[#D8006E]/10 text-[#D8006E] border border-[#D8006E]/20"
              : "bg-gradient-to-r from-[#D8006E] to-[#b8005e] text-white border-0 hover:shadow-lg hover:shadow-[#D8006E]/20"
          )}
          aria-pressed={isSelected}
        >
          {isSelected ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Selected
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to Booking
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
