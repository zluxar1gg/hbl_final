
import React, { useEffect } from 'react';

const GA_ID = 'G-JXMNGZQXGY';
const YM_ID = 105783207;

export const Analytics: React.FC = () => {
  useEffect(() => {
    // Check if running in browser
    if (typeof window === 'undefined') return;

    const initAnalytics = () => {
      // --- Google Analytics ---
      if (!document.getElementById('ga-script')) {
        // Main script
        const script = document.createElement('script');
        script.id = 'ga-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        // Config script
        const configScript = document.createElement('script');
        configScript.id = 'ga-config-script';
        configScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `;
        document.head.appendChild(configScript);
      }

      // --- Yandex Metrica ---
      if (!document.getElementById('ym-script')) {
         const ymScript = document.createElement('script');
         ymScript.id = 'ym-script';
         ymScript.type = 'text/javascript';
         ymScript.innerHTML = `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });
         `;
         document.head.appendChild(ymScript);
      }
    };

    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => initAnalytics(), { timeout: 2000 });
    } else {
      setTimeout(initAnalytics, 2000);
    }
  }, []);

  return null;
};
