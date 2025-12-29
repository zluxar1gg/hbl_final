
import React from 'react';
import { Language, translations } from '../utils/translations';

interface AboutProps {
  language: Language;
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language].about;

  const renderText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <span key={index} className="font-bold text-brand-dark">{part}</span> : part
    );
  };

  return (
    <section className="py-24 md:py-28 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 xl:px-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <div className="flex justify-center lg:justify-end order-last lg:order-first">
                <img 
                  src="https://i.ibb.co/C55Gbh27/happyboxdelivery.webp" 
                  alt="Happy Box Delivery Illustration" 
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[600px] object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=800&q=80";
                  }}
                />
            </div>

            {/* Text Column */}
            <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-10 leading-tight tracking-tight">
                    {t.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                    {renderText(t.text)}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};
