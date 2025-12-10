import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { name: t.services, href: '#services' },
    { name: t.reviews, href: '#reviews' },
    { name: t.cost, href: '#cost' },
    { name: t.tracking, href: '#tracking' },
    { name: t.contacts, href: '#contacts' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  // Opens a new window with a "Coming Soon" page
  const handleLoginClick = () => {
    const title = language === 'en' ? 'Client Area - HappyBox' : 'Личный Кабинет - HappyBox';
    const heading = language === 'en' ? 'Client Dashboard' : 'Личный Кабинет';
    const subHeading = language === 'en' ? 'Coming Soon' : 'Скоро Открытие';
    const message = language === 'en' 
      ? 'We are currently building a powerful personal area for you to track shipments, manage orders, and view photos. Stay tuned!' 
      : 'Мы прямо сейчас разрабатываем удобный личный кабинет, где вы сможете управлять посылками, видеть фото и статусы. Скоро запуск!';
    const backBtn = language === 'en' ? 'Close Window' : 'Закрыть окно';

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="${language}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Plus Jakarta Sans', sans-serif;
              background-color: #f5f5f0;
              color: #1a1a1a;
              height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }
            .container {
              padding: 40px;
              max-width: 600px;
            }
            .logo {
              font-size: 3rem;
              font-weight: 800;
              color: #2397d0;
              margin-bottom: 2rem;
              letter-spacing: -0.05em;
            }
            .badge {
              background: #fff176;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: 700;
              font-size: 0.9rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              display: inline-block;
              margin-bottom: 1.5rem;
            }
            h1 {
              font-size: 2.5rem;
              margin: 0 0 1rem 0;
              line-height: 1.2;
            }
            p {
              font-size: 1.1rem;
              line-height: 1.6;
              color: #666;
              margin-bottom: 2.5rem;
            }
            .btn {
              background: #1a1a1a;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 12px;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: transform 0.2s;
            }
            .btn:hover {
              transform: scale(1.05);
            }
            .construction-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">HappyBox</div>
            <div class="construction-icon">🚀</div>
            <div class="badge">${subHeading}</div>
            <h1>${heading}</h1>
            <p>${message}</p>
            <button class="btn" onclick="window.close()">${backBtn}</button>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <header className="py-5 bg-cream fixed top-0 left-0 w-full z-50 transition-all shadow-sm border-b border-gray-100/50 backdrop-blur-md bg-cream/90">
      <div className="container mx-auto flex justify-between items-center px-4 xl:px-0">
        <div 
          onClick={scrollToTop}
          className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight cursor-pointer"
        >
          HappyBox
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <ul className="flex gap-6 xl:gap-8 list-none">
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-brand-dark font-semibold text-sm hover:text-brand-blue transition-colors cursor-pointer tracking-wide"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6 border-l border-gray-200 pl-6 h-8">
            <div 
                onClick={toggleLanguage}
                className="text-gray-500 font-bold text-sm cursor-pointer hover:text-brand-blue tracking-wide select-none"
            >
                {language.toUpperCase()} ▼
            </div>

            <button 
                onClick={handleLoginClick}
                className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-blue transition-colors shadow-lg shadow-gray-200 active:scale-95"
            >
                <User size={16} />
                {language === 'en' ? 'Sign In' : 'Войти'}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
            <div 
                onClick={toggleLanguage}
                className="text-gray-500 font-bold text-sm cursor-pointer hover:text-brand-blue tracking-wide select-none"
            >
                {language.toUpperCase()} ▼
            </div>
            
            {/* Mobile Login Icon */}
            <button 
                onClick={handleLoginClick}
                className="w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center active:scale-95"
            >
                <User size={20} />
            </button>

            <button 
              className="text-brand-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col gap-4 lg:hidden border-t border-gray-100 animate-fade-in">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)} 
                className="text-lg font-bold py-3 border-b border-gray-100 last:border-0 text-center text-brand-dark"
              >
                {item.name}
              </a>
            ))}
             <button 
                onClick={() => { handleLoginClick(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 bg-brand-dark text-white px-5 py-4 rounded-xl font-bold text-lg mt-2 active:scale-95"
            >
                <User size={20} />
                {language === 'en' ? 'Sign In' : 'Личный кабинет'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};