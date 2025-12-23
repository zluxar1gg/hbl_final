
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { Calculator } from './components/Calculator';
import { Tracking } from './components/Tracking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SeoBlock } from './components/SeoBlock';
import { ClientDashboard } from './components/ClientDashboard';
import { Analytics } from './components/Analytics';
import { FloatingContact } from './components/FloatingContact';
import { Language } from './utils/translations';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  const handleLogout = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-brand-dark overflow-x-hidden pt-20">
      <Analytics />
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onLoginClick={() => setView('dashboard')}
        isDashboard={view === 'dashboard'}
      />
      
      {view === 'landing' ? (
        <main>
          <Hero language={language} />
          <div id="services" className="scroll-mt-28">
            <Services language={language} />
          </div>
          <div id="about" className="scroll-mt-28">
            <About language={language} />
          </div>
          <div id="reviews" className="scroll-mt-28">
            <Reviews language={language} />
          </div>
          <div id="cost" className="scroll-mt-28">
            <Calculator language={language} />
          </div>
          <div id="tracking" className="scroll-mt-28">
            <Tracking language={language} />
          </div>
          <div id="contacts" className="scroll-mt-28">
            <Contact language={language} />
          </div>
          <SeoBlock language={language} />
          <Footer language={language} />
          <FloatingContact />
        </main>
      ) : (
        <ClientDashboard language={language} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
