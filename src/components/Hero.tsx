
import React from 'react';
import { 
  Warehouse,
  Globe
} from 'lucide-react';
import { Language, translations } from '../utils/translations';

// Custom Icons provided by user
const CalendarIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <line x1="9" y1="10" x2="9" y2="22"></line>
    <line x1="15" y1="10" x2="15" y2="22"></line>
    <line x1="3" y1="16" x2="21" y2="16"></line>
  </svg>
);

const CartIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const PackageIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 7L12 4L22 7L12 10L2 7z"></path>
    <path d="M2 7V17L12 20V10"></path>
    <path d="M22 7V17L12 20"></path>
    <line x1="4" y1="13.5" x2="8" y2="14.8" strokeWidth="1"></line>
    <line x1="4" y1="15.5" x2="9" y2="16.8" strokeWidth="1"></line>
    <line x1="7" y1="5.5" x2="17" y2="8.5"></line>
  </svg>
);

const PaymentIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M6 12h.01M18 12h.01"></path>
  </svg>
);

const SupportIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 8a7 7 0 0 1 14 0"></path>
    <rect x="3" y="8" width="4" height="6" rx="1"></rect>
    <rect x="17" y="8" width="4" height="6" rx="1"></rect>
    <path d="M19 14v4a2 2 0 0 1-2 2h-4"></path>
    <rect x="9" y="19" width="4" height="3" rx="1"></rect>
  </svg>
);

const HeartIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;

  const features = [
    { icon: CalendarIcon, text: t.features.operating },
    { icon: Warehouse, text: t.features.warehouse },
    { icon: CartIcon, text: t.features.buy },
    { icon: PackageIcon, text: t.features.packaging },
    { icon: PaymentIcon, text: t.features.payment },
    { icon: SupportIcon, text: t.features.support },
    { icon: Globe, text: t.features.worldwide },
    { icon: HeartIcon, text: t.features.appreciate },
  ];

  return (
    <section className="pt-80 pb-80 bg-cream">
      <div className="container mx-auto">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center mb-12 lg:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] mb-8 text-brand-dark lg:max-w-6xl tracking-tight">
                {t.title}
            </h1>
            
            <div className="bg-brand-yellow px-6 py-3 rounded-2xl shadow-sm border border-brand-yellow/30 animate-fade-in flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                </span>
                <span className="font-bold text-brand-dark text-sm md:text-base lg:text-lg tracking-tight">
                    {t.minWeightBadge}
                </span>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col">
            <div className="lg:hidden mb-16 flex justify-center">
                <img 
                  src="https://i.ibb.co/cS2GvWht/happyboxtop.webp" 
                  alt="Happy Box Services Mascot" 
                  width="800"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full max-w-[600px] h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=800&q=80";
                    e.currentTarget.onerror = null;
                  }}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 lg:gap-x-10 mb-16">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 pt-1">
                    <feature.icon size={40} strokeWidth={1.5} className="text-brand-blue w-10 h-10" />
                  </div>
                  <p className="text-sm md:text-base font-semibold leading-snug text-gray-700">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-brand-yellow rounded-[25px] px-10 py-7 inline-block self-start shadow-sm">
              <div className="text-3xl md:text-4xl font-black text-brand-dark mb-2 tracking-tight">86200+</div>
              <p className="font-bold text-brand-dark text-sm md:text-base">{t.stats}</p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <img 
              src="https://i.ibb.co/cS2GvWht/happyboxtop.webp" 
              alt="Happy Box Services Mascot" 
              width="800"
              height="800"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-[600px] h-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=800&q=80";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
