
import React, { useState, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { Calculator } from './components/Calculator';
import { DeliveryPath } from './components/DeliveryPath';
import { ShoppingGuides } from './components/ShoppingGuides';
// Remove static import
// import { Quiz } from './components/Quiz';
import { Tracking } from './components/Tracking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SeoBlock } from './components/SeoBlock';
import { ClientDashboard } from './components/ClientDashboard';
import { Analytics } from './components/Analytics';
import { FloatingContact } from './components/FloatingContact';
import { Language } from './utils/translations';
import { Loader2 } from 'lucide-react';

// Lazy load the Quiz component
// Since Quiz is a named export, we need to handle the import promise specifically
const Quiz = React.lazy(() => import('./components/Quiz').then(module => ({ default: module.Quiz })));

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

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
          <DeliveryPath language={language} />
          <div id="services" className="scroll-mt-28">
            <Services language={language} />
          </div>
          <div id="about" className="scroll-mt-28">
            <About language={language} />
          </div>
          <ShoppingGuides language={language} />
          <div id="reviews" className="scroll-mt-28">
            <Reviews language={language} />
          </div>
          <div id="cost" className="scroll-mt-28">
            <Calculator language={language} onOpenQuiz={() => setIsQuizOpen(true)} />
          </div>
          
          {/* Quiz is now Lazy Loaded. It won't affect initial page load time. */}
          <Suspense fallback={
            isQuizOpen ? (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="bg-white p-4 rounded-full shadow-lg">
                   <Loader2 className="animate-spin text-brand-blue" size={32} />
                </div>
              </div>
            ) : null
          }>
            {isQuizOpen && (
              <Quiz 
                language={language} 
                isOpen={isQuizOpen} 
                onClose={() => setIsQuizOpen(false)} 
              />
            )}
          </Suspense>

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
