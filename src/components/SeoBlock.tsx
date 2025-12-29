
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface SeoBlockProps {
  language: Language;
}

export const SeoBlock: React.FC<SeoBlockProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].seoBlock;

  return (
    <section className="bg-cream border-t border-brand-blue/10 py-10 md:py-12">
      <div className="container mx-auto px-6 xl:px-0">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={t.toggle}
          className="flex items-center gap-3 text-gray-500 hover:text-brand-blue transition-colors text-sm font-semibold uppercase tracking-wider mx-auto md:mx-0 outline-none"
        >
          {t.toggle}
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] mt-10' : 'max-h-0'}`}>
          <div className="grid md:grid-cols-3 gap-12 md:gap-14 text-sm pb-4">
            <div>
              <h4 className="font-bold text-brand-dark mb-5 text-base">{t.categories.destinations.title}</h4>
              <ul className="space-y-3">
                {t.categories.destinations.items.map((item, idx) => (
                  <li key={idx} className="text-gray-500 hover:text-brand-blue cursor-default transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-dark mb-5 text-base">{t.categories.services.title}</h4>
              <ul className="space-y-3">
                {t.categories.services.items.map((item, idx) => (
                  <li key={idx} className="text-gray-500 hover:text-brand-blue cursor-default transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-dark mb-5 text-base">{t.categories.platforms.title}</h4>
              <ul className="space-y-3">
                {t.categories.platforms.items.map((item, idx) => (
                  <li key={idx} className="text-gray-500 hover:text-brand-blue cursor-default transition-colors">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
