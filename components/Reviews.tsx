
import React, { useState, useMemo, useEffect, useRef } from 'react';
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

const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact }) => {
  const [isReady, setIsReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // We only set isReady to false on the very first mount or if the image isn't loaded yet.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsReady(true);
    }
  }, [review.image]);

  return (
    <div className={`bg-white rounded-[30px] flex flex-col items-center text-center shadow-sm transition-all duration-300 ${
      compact ? 'p-4 h-auto' : 'p-8 lg:p-10 h-full'
    }`}>
      {/* Product Image Container */}
      <div className={`rounded-3xl overflow-hidden shadow-md border-4 border-gray-50 flex-shrink-0 relative bg-gray-100 ${
        compact ? 'w-[80px] h-[80px] mb-2' : 'w-[120px] h-[120px] mb-4'
      }`}>
          {!isReady && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
          )}
          
          <img 
              ref={imgRef}
              src={review.image} 
              alt={review.name}
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
              onLoad={() => setIsReady(true)}
              className={`relative z-10 w-full h-full object-cover transition-opacity duration-300 ${
                isReady ? 'opacity-100' : 'opacity-0'
              }`}
          />
      </div>
      
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-brand-dark leading-tight`}>
        {review.name}
      </h3>

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
};

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const t = translations[language].reviews;

  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < t.data.length; i += 3) {
      pages.push(t.data.slice(i, i + 3));
    }
    return pages;
  }, [t.data]);

  const allTestimonials = t.data;

  // Preloading images for seamless transitions
  useEffect(() => {
    const nextDeskPage = (desktopPage + 1) % testimonialPages.length;
    const prevDeskPage = (desktopPage - 1 + testimonialPages.length) % testimonialPages.length;
    
    [...testimonialPages[nextDeskPage], ...testimonialPages[prevDeskPage]].forEach(rev => {
      const img = new Image();
      img.src = rev.image;
    });

    const nextMob = (mobileIndex + 1) % allTestimonials.length;
    const prevMob = (mobileIndex - 1 + allTestimonials.length) % allTestimonials.length;
    
    [allTestimonials[nextMob], allTestimonials[prevMob]].forEach(rev => {
      const img = new Image();
      img.src = rev.image;
    });
  }, [desktopPage, mobileIndex, testimonialPages, allTestimonials]);

  const nextDesktop = () => setDesktopPage((prev) => (prev + 1) % testimonialPages.length);
  const prevDesktop = () => setDesktopPage((prev) => (prev - 1 + testimonialPages.length) % testimonialPages.length);
  const nextMobile = () => setMobileIndex((prev) => (prev + 1) % allTestimonials.length);
  const prevMobile = () => setMobileIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);

  return (
    <section className="pb-8 md:pb-20 pt-0 bg-cream">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 md:mb-12 text-brand-dark text-center mx-auto tracking-tight">
          {t.title}
        </h2>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block bg-brand-light rounded-[40px] p-12 lg:p-16 relative">
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {testimonialPages[desktopPage].map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <button onClick={prevDesktop} className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110 active:scale-95">
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <button onClick={nextDesktop} className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110 active:scale-95">
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="md:hidden bg-brand-light rounded-[30px] p-4 relative">
          <ReviewCard key="mobile" review={allTestimonials[mobileIndex]} compact={true} />
          <div className="flex justify-center gap-6 mt-4">
            <button onClick={prevMobile} className="w-10 h-10 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95">
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2">
              {allTestimonials.map((_, idx) => (
                <div key={idx} className={`h-2 rounded-full transition-all ${idx === mobileIndex ? 'bg-brand-blue w-6' : 'bg-brand-blue/20 w-2'}`} />
              ))}
            </div>
            <button onClick={nextMobile} className="w-10 h-10 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95">
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
