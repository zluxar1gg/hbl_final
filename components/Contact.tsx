
import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { Send, Copy, Check, Mail } from 'lucide-react';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language].contact;
  const [copied, setCopied] = useState(false);

  // Email obfuscation parts
  const emailUser = 'support';
  const emailDomain = 'happyboxlogistics.com';
  const fullEmail = `${emailUser}@${emailDomain}`;

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('HappyBoxLogistics');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-12 pb-20 bg-cream">
      <div className="container mx-auto">
        <div className="bg-white rounded-[30px] p-8 lg:p-16 text-center shadow-sm max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-8 tracking-tight">
            {t.title} <span className="text-brand-blue">HappyBox</span>!
          </h2>
          
          <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto mb-12 font-medium">
            {t.text}
          </p>
          
          <div className="text-center mt-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-brand-dark tracking-tight">{t.contactUs}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto mt-4 mb-12">
            {/* Telegram */}
            <div className="flex flex-col items-center group">
              <div className="aspect-square w-full max-w-[300px] rounded-[30px] overflow-hidden shadow-sm bg-white mb-6 border-2 border-transparent group-hover:border-brand-blue/20 transition-all">
                <img 
                  src="https://i.ibb.co/KpGd8jJ3/happybox-telegram.jpg" 
                  alt="Telegram QR Code" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-4">Telegram</h4>
              <a 
                href="https://t.me/HappyBoxDan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto justify-center"
              >
                <Send size={20} />
                {language === 'en' ? 'Open Telegram' : 'Открыть Telegram'}
              </a>
            </div>

            {/* WeChat */}
            <div className="flex flex-col items-center group">
              <div className="aspect-square w-full max-w-[300px] rounded-[30px] overflow-hidden shadow-sm bg-white mb-6 border-2 border-transparent group-hover:border-[#07C160]/20 transition-all">
                <img 
                  src="https://i.ibb.co/93pK51G9/happybox-wechat.jpg" 
                  alt="WeChat QR Code" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-4">WeChat</h4>
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <button 
                    onClick={handleCopyWeChat}
                    className="flex items-center gap-2 bg-[#07C160] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#06ad56] transition-all shadow-lg shadow-green-200 active:scale-95 w-full justify-center"
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied 
                        ? (language === 'en' ? 'Copied!' : 'Скопировано!') 
                        : (language === 'en' ? 'Copy ID' : 'Скопировать ID')
                    }
                </button>
                <p className="text-sm text-gray-400 font-medium">
                    ID: HappyBoxLogistics
                </p>
              </div>
            </div>
          </div>

          {/* Email Block */}
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-[25px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 hover:border-brand-blue/30 transition-colors">
            <div className="flex items-center gap-5">
                <div className="hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center text-brand-blue shadow-sm">
                    <Mail size={32} />
                </div>
                <div className="text-left">
                    <h4 className="text-2xl font-bold text-brand-dark">Email</h4>
                    {/* Rendered via JS to prevent simple scraping - font size reduced on mobile to prevent ugly breaking */}
                    <p className="text-gray-500 font-medium text-sm sm:text-base">{fullEmail}</p>
                </div>
            </div>
            <a 
                href={`mailto:${fullEmail}`}
                className="bg-white text-brand-dark border-2 border-gray-200 px-8 py-3 rounded-xl font-bold hover:border-brand-blue hover:text-brand-blue transition-all active:scale-95 w-full md:w-auto"
            >
                {language === 'en' ? 'Send Email' : 'Написать письмо'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
