
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface Review {
  name: string;
  location: string;
  text: string;
  image: string;
}

interface ReviewCardProps {
  review: Review;
  compact?: boolean;
}

interface ReviewsProps {
  language: Language;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact }) => (
  <div className={`bg-white rounded-[30px] flex flex-col items-center text-center shadow-sm animate-fade-in transition-all ${
    compact ? 'p-4 h-auto' : 'p-8 lg:p-10 h-full'
  }`}>
    {/* Product Image / Avatar */}
    <div className={`rounded-3xl overflow-hidden shadow-md border-4 border-gray-50 flex-shrink-0 relative ${
      compact ? 'w-[80px] h-[80px] mb-2' : 'w-[120px] h-[120px] mb-4'
    }`}>
        <img 
            src={review.image} 
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80";
            }}
        />
    </div>
    
    <h3 className={`${
      compact ? 'text-lg' : 'text-xl'
    } font-bold text-brand-dark leading-tight`}>
      {review.name}
    </h3>

    {/* Location */}
    <div className={`flex items-center justify-center gap-1 mt-0.5 text-brand-blue font-bold text-xs uppercase tracking-wide ${
      compact ? 'mb-2' : 'mb-4 text-sm'
    }`}>
        <MapPin size={compact ? 12 : 14} className="fill-current" />
        {review.location}
    </div>
    
    <p className={`text-gray-600 leading-relaxed font-medium ${
      compact ? 'text-sm mb-2' : 'text-[15px] mb-6 flex-grow'
    }`}>
      "{review.text}"
    </p>
    
    <div className={`${compact ? 'text-base' : 'text-xl'} text-yellow-400 tracking-widest ${compact ? 'mt-0' : 'mt-auto'}`}>
      ★★★★★
    </div>
  </div>
);

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const t = translations[language].reviews;

  // Chunk the flat data into pages of 3 for desktop view
  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < t.data.length; i += 3) {
      pages.push(t.data.slice(i, i + 3));
    }
    return pages;
  }, [t.data]);

  const allTestimonials = t.data;

  const nextDesktop = () => {
    setDesktopPage((prev) => (prev + 1) % testimonialPages.length);
  };
  const prevDesktop = () => {
    setDesktopPage((prev) => (prev - 1 + testimonialPages.length) % testimonialPages.length);
  };

  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % allTestimonials.length);
  };
  const prevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  return (
    <section className="pb-8 md:pb-20 pt-0 bg-cream">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 md:mb-12 text-brand-dark text-center mx-auto tracking-tight">
          {t.title}
        </h2>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block bg-brand-light rounded-[40px] p-12 lg:p-16 relative">
          <div className="overflow-hidden">
             <div className="grid grid-cols-3 gap-6 lg:gap-8">
                {testimonialPages[desktopPage].map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))}
             </div>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={prevDesktop}
              className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <button 
              onClick={nextDesktop}
              className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110"
              aria-label="Next reviews"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="md:hidden bg-brand-light rounded-[30px] p-4 relative">
          <div className="overflow-hidden">
            <div className="w-full">
               <ReviewCard review={allTestimonials[mobileIndex]} compact={true} />
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <button 
              onClick={prevMobile}
              className="w-10 h-10 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-2">
              {allTestimonials.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === mobileIndex ? 'bg-brand-blue w-6' : 'bg-brand-blue/20 w-2'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextMobile}
              className="w-10 h-10 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
