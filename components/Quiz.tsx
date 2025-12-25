
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { Send, ArrowLeft, RefreshCw, X, Check, Star, Plane, Anchor, Truck, Train } from 'lucide-react';
import { trackLead } from '../utils/analytics';

interface QuizProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

type QuizStep = 'country' | 'category' | 'weight' | 'priority' | 'result';
type CountryKey = 'us_ca' | 'eu' | 'uae' | 'au';
type WeightKey = 'under30' | 'over30';
type PriorityKey = 'fast' | 'cheap';

interface QuizState {
  country?: CountryKey;
  category?: string;
  weight?: WeightKey;
  priority?: PriorityKey;
}

export const Quiz: React.FC<QuizProps> = ({ language, isOpen, onClose }) => {
  const [step, setStep] = useState<QuizStep>('country');
  const [state, setState] = useState<QuizState>({});
  const t = translations[language].quiz;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleCountrySelect = (c: CountryKey) => {
    setState(prev => ({ ...prev, country: c }));
    setStep('category');
  };

  const handleCategorySelect = (cat: string) => {
    setState(prev => ({ ...prev, category: cat }));
    setStep('weight');
  };

  const handleWeightSelect = (w: WeightKey) => {
    const newState = { ...state, weight: w };
    setState(newState);

    if (w === 'under30') {
      // Logic Skip: If under 30kg, skip priority, go straight to result (Air)
      setStep('result');
    } else {
      setStep('priority');
    }
  };

  const handlePrioritySelect = (p: PriorityKey) => {
    setState(prev => ({ ...prev, priority: p }));
    setStep('result');
  };

  const resetQuiz = () => {
    setStep('country');
    setState({});
  };

  const getResult = () => {
    const { country, weight, priority } = state;
    
    // Case 1: Light Weight -> Air
    if (weight === 'under30') {
      let desc = t.results.air.desc;
      if (country === 'us_ca' || country === 'au') desc = t.results.air.desc_us_light;
      if (country === 'uae') desc = t.results.air.desc_uae_light;
      
      return {
        title: t.results.air.title,
        desc: desc,
        icon: Plane,
        color: 'text-brand-blue'
      };
    }

    // Case 2: Heavy Weight + Speed -> Air
    if (priority === 'fast') {
      return {
        title: t.results.air.title,
        desc: t.results.air.desc_speed,
        icon: Plane,
        color: 'text-brand-blue'
      };
    }

    // Case 3: Heavy Weight + Cheap
    if (country === 'us_ca' || country === 'au') {
      return {
        title: t.results.sea.title,
        desc: t.results.sea.desc,
        icon: Anchor,
        color: 'text-blue-600'
      };
    }

    if (country === 'eu') {
      return {
        title: t.results.rail.title,
        desc: t.results.rail.desc,
        icon: Train, // Using Train icon for Rail/Multimodal
        color: 'text-emerald-600'
      };
    }

    if (country === 'uae') {
      return {
        title: t.results.truck.title,
        desc: t.results.truck.desc,
        icon: Truck,
        color: 'text-orange-600'
      };
    }

    // Fallback
    return {
      title: t.results.air.title,
      desc: t.results.air.desc,
      icon: Plane,
      color: 'text-brand-blue'
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 md:p-8 pb-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
           {step !== 'country' && step !== 'result' ? (
             <button onClick={() => {
                if(step === 'category') setStep('country');
                if(step === 'weight') setStep('category');
                if(step === 'priority') setStep('weight');
             }} className="p-2 -ml-2 text-gray-400 hover:text-brand-dark transition-colors">
               <ArrowLeft size={24} />
             </button>
           ) : <div className="w-10" />}

           <h3 className="font-black text-brand-dark uppercase tracking-widest text-sm opacity-50">
             {t.title}
           </h3>

           <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-brand-dark transition-colors">
             <X size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          
          {/* STEP 1: COUNTRY */}
          {step === 'country' && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-black text-brand-dark text-center leading-tight mb-8">
                {t.questions.country}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'us_ca', label: t.options.us_ca },
                  { id: 'eu', label: t.options.eu },
                  { id: 'uae', label: t.options.uae },
                  { id: 'au', label: t.options.au },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCountrySelect(item.id as CountryKey)}
                    className="w-full py-5 px-6 rounded-2xl bg-gray-50 border-2 border-gray-100 text-lg font-bold text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5 hover:scale-[1.02] transition-all text-left flex justify-between items-center group"
                  >
                    {item.label}
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <ArrowLeft size={16} className="rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY */}
          {step === 'category' && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-black text-brand-dark text-center leading-tight mb-8">
                {t.questions.category}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'clothing', label: t.options.clothing },
                  { id: 'electronics', label: t.options.electronics },
                  { id: 'cosmetics', label: t.options.cosmetics },
                  { id: 'furniture', label: t.options.furniture },
                  { id: 'other', label: t.options.other },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategorySelect(item.id)}
                    className="p-6 rounded-2xl bg-gray-50 border-2 border-gray-100 font-bold text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-center h-full flex items-center justify-center"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: WEIGHT */}
          {step === 'weight' && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-black text-brand-dark text-center leading-tight mb-8">
                {t.questions.weight}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => handleWeightSelect('under30')}
                  className="w-full py-8 px-6 rounded-3xl bg-gray-50 border-2 border-gray-100 text-xl font-black text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5 transition-all flex flex-col items-center gap-2"
                >
                   <span>{t.options.under30}</span>
                   <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full">Small packages, samples</span>
                </button>
                <button
                  onClick={() => handleWeightSelect('over30')}
                  className="w-full py-8 px-6 rounded-3xl bg-gray-50 border-2 border-gray-100 text-xl font-black text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5 transition-all flex flex-col items-center gap-2"
                >
                   <span>{t.options.over30}</span>
                   <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full">Commercial cargo, furniture</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PRIORITY (Conditional) */}
          {step === 'priority' && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-black text-brand-dark text-center leading-tight mb-8">
                {t.questions.priority}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <button
                  onClick={() => handlePrioritySelect('fast')}
                  className="w-full py-6 px-8 rounded-3xl bg-white border-2 border-gray-100 shadow-sm text-xl font-black text-brand-dark hover:border-brand-blue hover:ring-4 hover:ring-brand-blue/10 transition-all flex items-center justify-between"
                >
                   <span>🚀 {t.options.fast}</span>
                   <Check className="text-gray-200" />
                </button>
                <button
                  onClick={() => handlePrioritySelect('cheap')}
                  className="w-full py-6 px-8 rounded-3xl bg-white border-2 border-gray-100 shadow-sm text-xl font-black text-brand-dark hover:border-green-500 hover:ring-4 hover:ring-green-500/10 transition-all flex items-center justify-between"
                >
                   <span>💰 {t.options.cheap}</span>
                   <Check className="text-gray-200" />
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === 'result' && (() => {
            const result = getResult();
            const ResultIcon = result.icon;
            
            return (
              <div className="animate-fade-in text-center">
                 <div className="w-20 h-20 bg-brand-yellow rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
                    <ResultIcon size={40} className="text-brand-dark" />
                 </div>
                 
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                   {t.results.title}
                 </h4>
                 
                 <h2 className={`text-4xl font-black mb-6 ${result.color}`}>
                   {result.title}
                 </h2>
                 
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                   <p className="text-lg text-gray-700 font-medium leading-relaxed">
                     {result.desc}
                   </p>
                 </div>

                 <div className="space-y-3">
                    <a 
                      href="https://t.me/HappyBoxDan"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackLead('telegram', 'hero', 'click')}
                      className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      {t.contactBtn}
                    </a>
                    <button 
                      onClick={resetQuiz}
                      className="w-full py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 hover:text-brand-dark transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Restart
                    </button>
                 </div>
              </div>
            );
          })()}

        </div>
      </div>
    </div>
  );
};
