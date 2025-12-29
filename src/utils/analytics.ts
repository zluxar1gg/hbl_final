
export type MessengerPlatform = 'telegram' | 'whatsapp' | 'wechat' | 'email';
export type ClickLocation = 'header' | 'hero' | 'contact_section' | 'footer' | 'floating';
export type InteractionType = 'click' | 'hover' | 'copy';

/**
 * Tracks a lead generation event with detailed metadata.
 * Optimized for GA4 'contact_interaction' event.
 */
export const trackLead = (
  platform: MessengerPlatform, 
  location: ClickLocation, 
  action: InteractionType = 'click'
) => {
  // Styles for console debugging
  const colors = {
    click: 'background: #2397d0; color: white',
    hover: 'background: #fff176; color: black',
    copy: 'background: #07C160; color: white'
  };

  // 1. Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'contact_interaction', {
      'messenger_platform': platform,
      'interaction_type': action,
      'click_location': location,
      'event_category': 'conversion',
      // Value helps GA4 identify importance
      'value': action === 'click' ? 1.0 : 0.2 
    });
    
    console.log(
      `%c[GA4 Event]%c ${platform.toUpperCase()} | ${action.toUpperCase()} | ${location}`,
      colors[action] || '',
      'font-weight: bold; color: inherit'
    );
  }

  // 2. Yandex Metrica (ID: 105783207)
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(105783207, 'reachGoal', 'messenger_click', {
      platform,
      action,
      location
    });
  }
};
