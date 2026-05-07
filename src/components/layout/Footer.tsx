import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const iconUrl = "https://static.wixstatic.com/media/c5947c_105b98aad40c4d4c8ca7de374634e9fa~mv2.png";

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white mb-4">
              <Image src={iconUrl} alt="Sparkle" width={32} height={32} className="h-8 w-8" />
              <span className="text-2xl font-headline font-semibold">Viva La Beauty</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your premier destination for waxing and beauty services in Sugar Land, Texas.
            </p>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#D8006E]" />
              <span>15315 Southwest Fwy ste. 192, Sugar Land, TX 77478</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone className="h-4 w-4 text-[#D8006E]" />
              <span>(832) 316-1814</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-headline font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#D8006E] transition-colors duration-300">Services</Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-[#D8006E] transition-colors duration-300">Book Appointment</Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-[#D8006E] transition-colors duration-300">Testimonials</Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-400 hover:text-[#D8006E] transition-colors duration-300">Training</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-headline font-semibold mb-6 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/vivalabeautywax2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D8006E] hover:border-[#D8006E]/30 hover:bg-[#D8006E]/10 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://www.facebook.com/vanessa.avellaneda.257916"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D8006E] hover:border-[#D8006E]/30 hover:bg-[#D8006E]/10 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.tiktok.com/@vivalabeautywax2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D8006E] hover:border-[#D8006E]/30 hover:bg-[#D8006E]/10 transition-all duration-300"
              >
                <TiktokIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Viva La Beauty. All rights reserved.</p>
          <p className="mt-2">Designed with <HeartIcon className="inline h-4 w-4 text-[#D8006E]" /> in Sugar Land, TX</p>
        </div>
      </div>
    </footer>
  );
}

function TiktokIcon({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
