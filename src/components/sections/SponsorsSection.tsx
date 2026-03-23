import Link from 'next/link';

const sponsors = [
  {
    name: 'AlphaLand',
    logo: 'https://officialalphaland.com/cdn/shop/t/6/assets/alphaland-logo-light_300x.png?v=51314615508447147621680285684',
    darkBg: true,
    url: 'https://officialalphaland.com/',
  },
  {
    name: 'Summer Shredding',
    logo: 'https://cdn.shopify.com/s/files/1/0166/9385/4272/files/SSC-Logo-White_x320.png?v=1702411826',
    darkBg: true,
    url: 'https://summershredding.com/',
  },
  {
    name: 'HTX Posedown',
    logo: null, // No direct logo available - uses text fallback
    darkBg: false,
    url: 'https://www.instagram.com/htx_posedown/',
  },
  {
    name: 'Muscle Beach',
    logo: 'https://musclebeachclassic.com/wp-content/uploads/2024/08/image2-e1723822876553.png',
    darkBg: false,
    url: 'https://musclebeachclassic.com/',
  },
];

export default function SponsorsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-3">
            Proud to Sponsor and Partner with&hellip;
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Supporting the best in fitness and beauty communities.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
              title={sponsor.name}
            >
              <div className={`relative w-[140px] h-[80px] md:w-[180px] md:h-[100px] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 rounded-lg ${sponsor.darkBg ? 'bg-gray-900 p-3' : ''}`}>
                {sponsor.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg px-3">
                    <span className="text-white font-headline font-bold text-lg md:text-xl text-center leading-tight">
                      {sponsor.name}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-body font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {sponsor.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
