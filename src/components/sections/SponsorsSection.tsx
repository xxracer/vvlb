import Link from 'next/link';
import Image from 'next/image';

const sponsors = [
  {
    name: 'AlphaLand',
    logo: 'https://static.wixstatic.com/media/c5947c_d9ffd0de2d2343cd87bebb8830f160c9~mv2.png',
    url: 'https://officialalphaland.com/',
  },
  {
    name: 'Summer Shredding',
    logo: 'https://static.wixstatic.com/media/c5947c_02c14ec526d34acca8ba3fc922b08b37~mv2.png',
    url: 'https://summershredding.com/',
  },
  {
    name: 'HTX Posedown',
    logo: 'https://static.wixstatic.com/media/c5947c_1c4393227cf943bc88e3189cc5d8dce2~mv2.png',
    url: 'https://www.instagram.com/htx_posedown/',
  },
  {
    name: 'Muscle Beach',
    logo: 'https://musclebeachclassic.com/wp-content/uploads/2024/08/image2-e1723822876553.png',
    url: 'https://musclebeachclassic.com/',
  },
];

export default function SponsorsSection() {
  return (
    <section className="py-20 bg-[#ffe5ec] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#D8006E] text-sm font-semibold tracking-widest uppercase mb-4 block">
            Sponsors
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#1a1a1a] mb-3">
            Proud Sponsor of
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-500 hover:scale-110"
              title={sponsor.name}
            >
              <div className="relative w-[140px] h-[80px] md:w-[180px] md:h-[100px] flex items-center justify-center rounded-xl bg-white border border-gray-100 p-4 transition-all duration-500 group-hover:shadow-lg group-hover:border-[#D8006E]/20">
                {sponsor.logo ? (
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={160}
                    height={80}
                    className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg px-3">
                    <span className="text-[#1a1a1a] font-headline font-bold text-lg md:text-xl text-center leading-tight">
                      {sponsor.name}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-body font-medium text-gray-500 group-hover:text-[#D8006E] transition-colors duration-300">
                {sponsor.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
