
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
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6 md:px-0">
        <div className="bg-white rounded-[30px] p-8 lg:p-16 shadow-sm border border-gray-100 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8 leading-tight tracking-tight">
                {t.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                {renderText(t.text)}
            </p>
        </div>
      </div>
    </section>
  );
};
