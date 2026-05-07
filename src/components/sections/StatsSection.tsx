"use client";

import { useEffect, useRef, useState } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';

const stats = [
  { icon: Award, value: 12, suffix: '+', label: 'Years Experience', color: '#D8006E' },
  { icon: Star, value: 5.0, suffix: '', label: 'Google Rating', color: '#7400D8' },
  { icon: Clock, value: 15, suffix: ' min', label: 'Avg Service Time', color: '#D8006E' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Number((eased * value).toFixed(value < 10 ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-[#ffe5ec] rounded-3xl p-8 text-center hover:bg-white hover:shadow-xl hover:shadow-[#D8006E]/5 transition-all duration-500 border border-transparent hover:border-[#D8006E]/10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}10` }}
              >
                <stat.icon className="h-7 w-7" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
