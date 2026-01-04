import React, { useState } from 'react';
import { X, PackageSearch } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface TrackingProps {
  language: Language;
}

export const Tracking: React.FC<TrackingProps> = ({ language }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResult, setShowResult] = useState(false);
  const t = translations[language].tracking;

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    setShowResult(true);
    setTimeout(() => {
      document.getElementById('tracking-frame')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleClose = () => {
    setShowResult(false);
    setTrackingNumber('');
  };

  return (
    <section className="py-14 md:py-18 lg:py-20 bg-cream my-16 md:my-20 lg:my-24">
      <div className="container mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-8 tracking-tight">{t.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t.subtitle} <span className="font-bold text-brand-blue">{t.carriers}</span> {t.subtitle2}
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-5 mb-12">
          <div className="relative flex-1">
            <label htmlFor="track-number" className="sr-only">{t.placeholder}</label>
            <PackageSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              id="track-number"
              type="text" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder={t.placeholder} 
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-brand-blue outline-none transition-colors bg-white text-brand-dark placeholder-gray-400"
            />
          </div>
          <button 
            onClick={handleTrack}
            className="bg-brand-blue text-white font-bold text-lg px-10 py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200 active:scale-95 transform duration-200"
          >
            {t.button}
          </button>
        </div>

        {showResult && (
          <div id="tracking-frame" className="max-w-5xl mx-auto bg-white rounded-[20px] overflow-hidden shadow-2xl animate-fade-in mx-4 lg:mx-auto border border-gray-100 mb-12">
            <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{t.result}</h3>
                <span className="bg-white/20 px-3 py-0.5 rounded-full text-sm font-medium text-white/90 hidden sm:inline-block">
                   {t.powered}
                </span>
              </div>
              <button 
                onClick={handleClose}
                aria-label="Close tracking result"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors hover:rotate-90 duration-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="w-full h-[600px] bg-gray-50 relative">
                <iframe 
                  src={`https://t.17track.net/${language}#nums=${trackingNumber}`}
                  className="w-full h-full border-0"
                  title="Tracking Result Frame"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};