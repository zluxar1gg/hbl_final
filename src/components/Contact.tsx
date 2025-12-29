
import React, { useState, useRef } from 'react';
import { Language, translations } from '../utils/translations';
import { Send, Copy, Check, Mail } from 'lucide-react';
import { trackLead, MessengerPlatform } from '../utils/analytics';

interface ContactProps {
  language: Language;
}

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language].contact;
  const [copied, setCopied] = useState(false);
  
  // Hover tracking logic
  const hoverTimers = useRef<Record<string, number>>({});
  const HOVER_DURATION = 2000; // 2 seconds delay as requested

  const startHover = (platform: MessengerPlatform) => {
    hoverTimers.current[platform] = window.setTimeout(() => {
      trackLead(platform, 'contact_section', 'hover');
      delete hoverTimers.current[platform];
    }, HOVER_DURATION);
  };

  const cancelHover = (platform: MessengerPlatform) => {
    if (hoverTimers.current[platform]) {
      clearTimeout(hoverTimers.current[platform]);
      delete hoverTimers.current[platform];
    }
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('HappyBoxLogistics');
    setCopied(true);
    trackLead('wechat', 'contact_section', 'copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const emailUser = 'support';
  const emailDomain = 'happyboxlogistics.com';
  const fullEmail = `${emailUser}@${emailDomain}`;

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-cream">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[30px] p-10 lg:p-16 xl:p-20 text-center shadow-sm max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-10 tracking-tight">
            {t.title} <span className="text-brand-blue">HappyBox</span>!
          </h2>
          
          <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto mb-16 font-medium">
            {t.text}
          </p>
          
          <div className="text-center mt-16 mb-4">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-brand-dark tracking-tight">{t.contactUs}</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12 max-w-6xl mx-auto mb-16">
            {/* Telegram */}
            <div className="flex flex-col items-center group">
              <div 
                className="aspect-square w-full max-w-[280px] rounded-[30px] overflow-hidden shadow-sm bg-white mb-8 border-2 border-transparent group-hover:border-brand-blue/20 transition-all cursor-pointer"
                onMouseEnter={() => startHover('telegram')}
                onMouseLeave={() => cancelHover('telegram')}
                onClick={() => trackLead('telegram', 'contact_section', 'click')}
              >
                <img 
                  src="https://i.ibb.co/wr46ZsJj/happybox-telegram.webp" 
                  alt="Telegram QR" 
                  width="300" height="300" loading="lazy" className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-5">Telegram</h4>
              <a 
                href="https://t.me/HappyBoxDan" 
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackLead('telegram', 'contact_section', 'click')}
                className="flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95 w-full justify-center"
              >
                <Send size={20} />
                {language === 'en' ? 'Open Telegram' : 'Открыть Telegram'}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center group">
              <div 
                className="aspect-square w-full max-w-[280px] rounded-[30px] overflow-hidden shadow-sm bg-white mb-8 border-2 border-transparent group-hover:border-[#25D366]/20 transition-all cursor-pointer"
                onMouseEnter={() => startHover('whatsapp')}
                onMouseLeave={() => cancelHover('whatsapp')}
                onClick={() => trackLead('whatsapp', 'contact_section', 'click')}
              >
                <img 
                  src="https://i.ibb.co/MK48T9C/happybox-wa.webp" 
                  alt="WhatsApp QR" 
                  width="300" height="300" loading="lazy" className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-5">WhatsApp</h4>
              <a 
                href="https://wa.me/8613048875834" 
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', 'contact_section', 'click')}
                className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#20ba57] transition-all shadow-lg active:scale-95 w-full justify-center"
              >
                <WhatsAppIcon size={20} />
                {language === 'en' ? 'Open WhatsApp' : 'Открыть WhatsApp'}
              </a>
            </div>

            {/* WeChat */}
            <div className="flex flex-col items-center group">
              <div 
                className="aspect-square w-full max-w-[280px] rounded-[30px] overflow-hidden shadow-sm bg-white mb-8 border-2 border-transparent group-hover:border-[#07C160]/20 transition-all cursor-pointer"
                onMouseEnter={() => startHover('wechat')}
                onMouseLeave={() => cancelHover('wechat')}
              >
                <img 
                  src="https://i.ibb.co/YFjhyYvW/happybox-wechat.webp" 
                  alt="WeChat QR" 
                  width="300" height="300" loading="lazy" className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-5">WeChat</h4>
              <button 
                onClick={handleCopyWeChat}
                className="flex items-center gap-2 bg-[#07C160] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#06ad56] transition-all shadow-lg active:scale-95 w-full justify-center"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? (language === 'en' ? 'Copied!' : 'Скопировано!') : (language === 'en' ? 'Copy ID' : 'Скопировать ID')}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-[25px] p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
            <div className="flex items-center gap-5">
              <div className="hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center text-brand-blue shadow-sm">
                <Mail size={32} />
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold text-brand-dark">Email</h4>
                <p className="text-gray-500 font-medium">{fullEmail}</p>
              </div>
            </div>
            <a 
              href={`mailto:${fullEmail}`}
              onClick={() => trackLead('email', 'contact_section', 'click')}
              className="bg-white text-brand-dark border-2 border-gray-200 px-8 py-3 rounded-xl font-bold hover:border-brand-blue hover:text-brand-blue transition-all active:scale-95 w-full md:w-auto text-center"
            >
              {language === 'en' ? 'Send Email' : 'Написать письмо'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
