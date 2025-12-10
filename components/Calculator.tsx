
import React, { useState, useMemo } from 'react';
import { Language, translations } from '../utils/translations';

// Rates per kg in USD (logic remains the same, only UI text changes)
const RATES: Record<string, number> = {
  'us': 19, 'ca': 15.5, 'au': 15, 'ae': 20,
  'eng': 16, 'sct': 16, 'wls': 16, 'nir': 16,
  'no': 20, 'is': 20,
  'at': 16, 'be': 16, 'bg': 16, 'hr': 16, 'cy': 16, 'cz': 16, 'dk': 16, 'ee': 16,
  'fi': 16, 'fr': 16, 'de': 16, 'gr': 16, 'hu': 16, 'ie': 16, 'it': 16, 'lv': 16,
  'lt': 16, 'lu': 16, 'mt': 16, 'nl': 16, 'pl': 16, 'pt': 16, 'ro': 16, 'sk': 16,
  'si': 16, 'es': 16, 'se': 16,
};

// Use codes to map to translated names
const COUNTRY_CODES = [
  'us', 'ca', 'au', 'ae',
  'eng', 'sct', 'wls', 'nir',
  'no', 'is',
  'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 
  'ie', 'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
  'other'
];

type CalculationResult = {
  isOther: boolean;
  price?: number;
  time?: string;
  weightKg?: number;
};

interface CalculatorProps {
  language: Language;
}

export const Calculator: React.FC<CalculatorProps> = ({ language }) => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg'); 
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const t = translations[language].calculator;

  // Dynamically sort countries based on their translated names
  const sortedCountries = useMemo(() => {
    const list = COUNTRY_CODES.map(code => ({
      code,
      name: t.countries[code as keyof typeof t.countries]
    }));

    return list.sort((a, b) => {
      if (a.code === 'other') return 1;
      if (b.code === 'other') return -1;
      return a.name.localeCompare(b.name);
    });
  }, [t.countries]);

  const handleCalculate = () => {
    if (!weight || !country) {
      setError(true);
      return;
    }
    setError(false);

    if (country === 'other') {
        setResult({ isOther: true });
        return;
    }

    let weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) return;

    let weightInKg = weightNum;
    if (unit === 'pound') {
        weightInKg = weightNum * 0.453592;
    }

    const rate = RATES[country] || 20;
    const totalCost = Math.ceil(weightInKg * rate);
    
    let timeEstimate = `10-18 ${t.timeDays}`;
    if (['us', 'ca', 'eng', 'sct', 'wls', 'nir', 'au', 'de', 'fr', 'nl', 'be'].includes(country)) {
        timeEstimate = `8-15 ${t.timeDays}`;
    } else if (country === 'ae') {
        timeEstimate = `7-12 ${t.timeDays}`;
    }

    setResult({
      isOther: false,
      price: Math.max(20, totalCost),
      time: timeEstimate,
      weightKg: weightInKg
    });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto">
        <div className="bg-white rounded-[30px] p-8 lg:p-16 max-w-[1000px] mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue mb-4 tracking-tight">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-semibold max-w-3xl">
              {t.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={t.weightPlaceholder}
                  min="0"
                  step="0.1"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-brand-blue outline-none transition-colors bg-white text-brand-dark placeholder-gray-400"
                />
                <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-brand-blue outline-none bg-white text-brand-dark cursor-pointer"
                >
                  <option value="kg">{t.kg}</option>
                  <option value="pound">{t.lb}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-brand-blue outline-none bg-white text-brand-dark cursor-pointer appearance-none"
                  style={{ backgroundImage: 'none' }} 
                >
                  <option value="">{t.selectCountry}</option>
                  {sortedCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {error && <span className="text-brand-blue text-sm font-bold animate-pulse">{t.error}</span>}
              </div>

              <input 
                type="text" 
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                placeholder={t.postalPlaceholder}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-brand-blue outline-none bg-white text-brand-dark placeholder-gray-400"
              />

              <button 
                onClick={handleCalculate}
                className="w-full bg-brand-blue text-white font-bold text-lg p-4 rounded-2xl hover:bg-blue-600 transition-colors mt-2 shadow-lg shadow-blue-200 active:scale-[0.98]"
              >
                {t.button}
              </button>
            </div>

            {/* Visual / Result */}
            <div>
              {result ? (
                <div className="text-center p-12 bg-gradient-to-br from-brand-blue to-blue-400 rounded-[30px] text-white shadow-xl animate-fade-in relative overflow-hidden h-full flex flex-col justify-center">
                  <div className="relative z-10">
                    
                    {result.isOther ? (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold leading-tight">
                                {t.contactQuote}
                            </h3>
                            <p className="text-blue-100 font-medium leading-relaxed">
                                {t.contactDesc}
                            </p>
                            <button 
                                onClick={handleScrollToContact}
                                className="inline-block bg-white text-brand-blue px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                {t.contactBtn}
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-blue-100 font-medium mb-1 text-lg uppercase tracking-wider">{t.airRate}</p>
                            <h3 className="text-7xl font-black mb-4 tracking-tight">${result.price}</h3>
                            
                            <div className="inline-block bg-white/20 rounded-xl px-6 py-3 backdrop-blur-sm mb-6">
                                <p className="text-lg font-semibold">{t.time}: {result.time}</p>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-sm opacity-80 max-w-[90%] mx-auto leading-snug">
                                    {t.note.replace('{weight}', result.weightKg?.toFixed(2) || '0')}
                                </p>
                                <div className="border-t border-white/20 pt-4 mt-4">
                                    <p className="text-sm font-medium text-white/90">
                                        {t.altDelivery}
                                        <br/>
                                        <button onClick={handleScrollToContact} className="underline hover:text-white mt-1">{t.altContact}</button>
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    <button 
                        onClick={() => setResult(null)} 
                        className="mt-8 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition text-sm font-bold border border-white/30"
                    >
                        {t.recalculate}
                    </button>
                  </div>
                  
                  {/* Decorative Circle */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-[30px] overflow-hidden flex items-center justify-center min-h-[300px] lg:min-h-[400px] border border-gray-100">
                   <img 
                    src="https://i.ibb.co/YTffLPLR/happyboxcalc.png" 
                    alt="Calculator Visual" 
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80";
                      e.currentTarget.onerror = null;
                    }}
                   />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
