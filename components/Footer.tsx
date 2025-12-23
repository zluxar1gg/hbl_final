
import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { trackLead } from '../utils/analytics';

// Social Media Icons Components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface SocialLinkProps {
  href: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  platform?: 'instagram' | 'telegram' | 'whatsapp' | 'facebook';
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label, platform }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => {
        if (platform && (platform === 'telegram' || platform === 'whatsapp')) {
            trackLead(platform, 'footer', 'click');
        }
    }}
    className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const t = translations[language].footer;

  // Email obfuscation
  const emailUser = 'support';
  const emailDomain = 'happyboxlogistics.com';
  const fullEmail = `${emailUser}@${emailDomain}`;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <footer className="bg-brand-light pt-16 pb-8 overflow-hidden relative">
        <div className="container mx-auto relative z-10">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-12 px-6 md:px-0 items-start">
            
            {/* Left Column: Brand & Socials */}
            <div className="space-y-6">
              <div className="text-4xl font-black text-brand-blue tracking-tighter">
                HappyBox
              </div>
              <div className="flex gap-4 ml-2">
                <SocialLink href="https://instagram.com/happybox_dan" icon={InstagramIcon} label="Instagram Profile" platform="instagram" />
                <SocialLink href="https://t.me/happyboxlogistics" icon={TelegramIcon} label="Telegram Channel" platform="telegram" />
                <SocialLink href="https://wa.me/8613048875834" icon={WhatsAppIcon} label="WhatsApp Contact" platform="whatsapp" />
                <SocialLink href="https://www.facebook.com/HappyBoxLogistics" icon={FacebookIcon} label="Facebook Page" platform="facebook" />
                
                <a 
                    href={`mailto:${fullEmail}`}
                    onClick={() => trackLead('email', 'footer', 'click')}
                    className="flex w-11 h-11 bg-white rounded-full items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                    aria-label={language === 'en' ? 'Email Support' : 'Написать в поддержку'}
                >
                    <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Center Column: Links and Mobile Image */}
            <div className="flex flex-row justify-between items-end w-full md:w-auto md:block">
                <div className="text-left relative z-10">
                    <h3 className="font-bold text-lg mb-5 text-black">{t.support}</h3>
                    <ul className="space-y-3">
                        <li>
                        <a href="#contacts" onClick={(e) => handleScroll(e, 'contacts')} className="text-gray-800 hover:text-brand-blue transition-colors cursor-pointer font-medium text-base">
                            {t.contact}
                        </a>
                        </li>
                        <li>
                        <button 
                            onClick={() => setActiveModal('privacy')}
                            className="text-gray-800 hover:text-brand-blue transition-colors cursor-pointer font-medium text-base"
                        >
                            {t.privacy}
                        </button>
                        </li>
                        <li>
                        <button 
                            onClick={() => setActiveModal('terms')}
                            className="text-gray-800 hover:text-brand-blue transition-colors cursor-pointer font-medium text-base"
                        >
                            {t.terms}
                        </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile/Tablet Mascot */}
                <div className="block lg:hidden -mb-4 -mr-4">
                    <img 
                        src="https://i.ibb.co/TBF1tWsQ/happyboxbottom-r.webp" 
                        alt="Happy Box Mascot Mascot" 
                        width="300"
                        height="300"
                        loading="lazy"
                        decoding="async"
                        className="w-[150px] h-auto object-contain drop-shadow-lg"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* Right Column: Desktop Mascot */}
            <div className="hidden lg:block ml-auto self-end mr-10 -mb-8">
                 <img 
                    src="https://i.ibb.co/TBF1tWsQ/happyboxbottom-r.webp" 
                    alt="Happy Box Mascot" 
                    width="300"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    className="w-[250px] h-auto object-contain drop-shadow-xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                 />
            </div>
          </div>
          
          <div className="pt-8 text-center text-gray-600 text-sm font-medium relative z-10">
            © {new Date().getFullYear()} {t.rights}
          </div>
        </div>
      </footer>

      {/* Modals Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl max-h-[80vh] rounded-[30px] shadow-2xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-brand-dark">
                {activeModal === 'privacy' ? t.privacyTitle : t.termsTitle}
              </h2>
              <button 
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-brand-dark" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto leading-relaxed text-gray-600 space-y-4">
              {activeModal === 'privacy' ? (
                <>
                  <p><strong>1. Introduction</strong><br/>Welcome to HappyBox. We respect your privacy and are committed to protecting your personal data.</p>
                  <p><strong>2. The Data We Collect</strong><br/>We may collect, use, store and transfer different kinds of personal data about you including identity and contact data.</p>
                  <p><strong>3. How We Use Your Data</strong><br/>We will only use your personal data when the law allows us to, primarily to fulfill shipping contracts.</p>
                  <p><strong>4. Data Security</strong><br/>We have put in place appropriate security measures to prevent your personal data from being accidentally lost or accessed in an unauthorized way.</p>
                </>
              ) : (
                <>
                  <p><strong>1. General Provisions</strong><br/>By using HappyBox, you agree to be bound by these Terms of Service.</p>
                  <p><strong>2. Order Processing</strong><br/>HappyBox acts as your agent to purchase and ship products. We are not the manufacturer.</p>
                  <p><strong>3. Prohibited Items</strong><br/>Users agree not to order items prohibited for export or import (explosives, drugs, etc.).</p>
                  <p><strong>4. Shipping & Liability</strong><br/>Delivery times are estimates. HappyBox is not liable for customs delays.</p>
                </>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                {t.iUnderstand}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
