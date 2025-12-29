
import React, { useEffect, useState, useRef } from 'react';
import { Language, translations } from '../utils/translations';
import { Warehouse, PackageCheck, ShieldCheck, Truck } from 'lucide-react';

export const DeliveryPath: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].deliveryPath;
  const [scrollPercent, setScrollPercent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentIsMobile = window.innerWidth < 768;
      
      setIsMobile(currentIsMobile);

      const startTrigger = currentIsMobile ? windowHeight * 0.4 : windowHeight * 0.8; 
      const endTrigger = currentIsMobile ? -windowHeight * 1.2 : -windowHeight * 0.2; 

      let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      progress = Math.min(Math.max(progress, 0), 1);
      
      setScrollPercent(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const icons = [Warehouse, PackageCheck, ShieldCheck, Truck];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-cream overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark mb-16 md:mb-20 lg:mb-24 text-center tracking-tight">
          {t.title}
        </h2>

        <div className="relative flex flex-col lg:flex-row justify-between items-center gap-20 lg:gap-6 max-w-6xl mx-auto min-h-[500px] lg:min-h-0">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-2 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-blue transition-all duration-300 ease-out"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>

          {/* Connecting Line (Mobile) */}
          <div className="lg:hidden absolute left-1/2 top-0 h-full w-2 bg-gray-200 -translate-x-1/2 rounded-full overflow-hidden">
            <div 
              className="w-full bg-brand-blue transition-all duration-300 ease-out"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>

          {t.steps.map((step, idx) => {
            const activationThreshold = idx * 25; 
            const isActive = scrollPercent >= activationThreshold;
            const Icon = icons[idx];
            
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center lg:w-1/4">
                <div 
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-[30px] flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${
                    isActive 
                      ? 'bg-brand-blue text-white scale-110 border-brand-blue' 
                      : 'bg-white text-gray-300 border-white'
                  }`}
                >
                  <Icon size={isMobile ? 36 : 44} />
                </div>
                <div className={`mt-10 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-6'}`}>
                  <h3 className="font-black text-xl md:text-2xl text-brand-dark leading-tight mb-3">{step.title}</h3>
                  <p className="text-gray-500 font-bold text-sm md:text-base">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
