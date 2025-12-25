
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { 
  BookOpen, 
  X, 
  ArrowRight, 
  Zap, 
  ShoppingBag, 
  Fingerprint, 
  Send, 
  CheckCircle2, 
  Lightbulb,
  ArrowDownCircle,
  TrendingDown
} from 'lucide-react';
import { trackLead } from '../utils/analytics';

export const ShoppingGuides: React.FC<{ language: Language }> = ({ language }) => {
  const [activeGuide, setActiveGuide] = useState<any>(null);
  const t = translations[language].guides;

  useEffect(() => {
    if (activeGuide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeGuide]);

  const getIcon = (id: string, size = 24) => {
    switch(id) {
      case '1688': return <Zap size={size} className="text-orange-500" />;
      case 'poizon': return <Fingerprint size={size} className="text-cyan-500" />;
      case 'taobao': return <ShoppingBag size={size} className="text-brand-blue" />;
      default: return <BookOpen size={size} />;
    }
  };

  const handleBuyForMe = () => {
    trackLead('telegram', 'contact_section', 'click');
    window.open('https://t.me/HappyBoxDan', '_blank');
  };

  return (
    <section className="py-24 bg-brand-light/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 font-bold max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.cards.map((card: any) => (
            <div 
              key={card.id}
              onClick={() => setActiveGuide(card)}
              className="bg-white p-8 rounded-[35px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col h-full border border-transparent hover:border-brand-blue/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {getIcon(card.id, 32)}
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-3 leading-tight">{card.title}</h3>
              <p className="text-gray-500 font-bold mb-8 flex-grow">{card.desc}</p>
              <div className="flex items-center gap-2 text-brand-blue font-black uppercase text-xs tracking-widest">
                {language === 'en' ? 'Expert Advice' : 'Советы эксперта'} <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {activeGuide && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveGuide(null)}
          >
            <div 
              className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 pb-4 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {getIcon(activeGuide.id)}
                   </div>
                   <div>
                    <h2 className="text-2xl font-black text-brand-dark leading-none mb-1">{activeGuide.title}</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{language === 'en' ? 'Expert Advice' : 'Советы эксперта'}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 pt-6 overflow-y-auto space-y-8">
                {/* Steps Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-brand-blue uppercase tracking-widest flex items-center gap-2">
                    <ArrowDownCircle size={16} /> {language === 'en' ? 'Step-by-Step' : 'Пошагово'}
                  </h4>
                  <ul className="space-y-4">
                    {activeGuide.steps.map((step: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mt-1">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-brand-dark font-semibold leading-relaxed">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tip Section */}
                <div className="bg-brand-yellow/10 border-2 border-brand-yellow/30 p-6 rounded-[30px] relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-brand-dark font-black mb-3 uppercase text-xs tracking-widest">
                      <Lightbulb size={16} className="text-brand-dark" /> Pro Tip
                    </div>
                    <p className="text-brand-dark font-bold leading-relaxed italic">
                      "{activeGuide.tip}"
                    </p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                    <Lightbulb size={80} />
                  </div>
                </div>

                {/* Savings Section */}
                <div className="flex items-center justify-between p-6 bg-brand-blue/5 rounded-[30px] border border-brand-blue/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-blue shadow-sm">
                      <TrendingDown size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{activeGuide.compare.label}</p>
                      <p className="text-brand-dark font-black">{language === 'en' ? 'Local Price:' : 'Локальная цена:'} <span className="line-through text-gray-400">{activeGuide.compare.local}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-blue font-black text-2xl">{activeGuide.compare.china}</p>
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-tighter">Direct from China</p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 pt-4 mt-auto border-t border-gray-100 bg-gray-50/50 space-y-4">
                <button 
                  onClick={handleBuyForMe}
                  className="w-full bg-brand-blue text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
                >
                  <Send size={22} />
                  {t.buyForMe}
                </button>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="w-full text-gray-400 py-2 font-black text-sm uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
