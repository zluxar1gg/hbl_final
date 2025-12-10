
import React from 'react';
import { 
  Warehouse
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

const GlobeIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
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
    { icon: GlobeIcon, text: t.features.worldwide },
    { icon: HeartIcon, text: t.features.appreciate },
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto">
        {/* Title moved out of grid to span full width on desktop */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] mb-10 lg:mb-16 text-brand-dark lg:text-center lg:max-w-6xl lg:mx-auto tracking-tight">
          {t.title}
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column (Features + Stats) */}
          <div className="flex flex-col">

            {/* Mobile Only Image: Placed between Headline and Features */}
            <div className="lg:hidden mb-12 flex justify-center">
                <img 
                  src="https://i.ibb.co/23T2k8rr/happyboxtop.png" 
                  alt="Happy Box Services" 
                  className="w-full max-w-[600px] h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=800&q=80";
                    e.currentTarget.onerror = null;
                  }}
                />
            </div>

            {/* Features Grid: Now 2 columns on all sizes (grid-cols-2) */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-6 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 pt-1">
                    <feature.icon size={40} strokeWidth={1.5} className="text-brand-blue w-10 h-10" />
                  </div>
                  {/* Slightly smaller text on mobile to fit the 2-column layout better */}
                  <p className="text-sm md:text-base font-semibold leading-snug text-gray-700">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-brand-yellow rounded-[25px] px-8 py-6 inline-block self-start shadow-sm">
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark mb-1 tracking-tight">86200+</h3>
              <p className="font-bold text-brand-dark text-sm md:text-base">{t.stats}</p>
            </div>
          </div>

          {/* Desktop Only Image: Right Column */}
          <div className="hidden lg:flex justify-center">
            <img 
              src="https://i.ibb.co/23T2k8rr/happyboxtop.png" 
              alt="Happy Box Services" 
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
