'use client';

import React, { useState, useRef, useEffect } from 'react';
...
export const Header: React.FC<HeaderProps> = ({ language, onLoginClick, isDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = translations[language].nav;

  const headerRef = useRef<HTMLElement | null>(null);

  // set CSS variable --header-height to real header height (keeps offset correct)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeaderHeight = () => {
      const height = el.offsetHeight || 80;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    return () => window.removeEventListener('resize', setHeaderHeight);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isDashboard) {
        window.location.href = href;
        return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // get header height from CSS variable if set, otherwise fallback to ref
      const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '';
      const headerOffset = cssVar ? parseInt(cssVar, 10) : (headerRef.current?.offsetHeight || 80);
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header ref={headerRef} className="py-5 bg-cream fixed top-0 left-0 w-full z-50 transition-all shadow-sm border-b border-gray-100/50 backdrop-blur-md bg-cream/90">
      ...
    </header>
  );
};
