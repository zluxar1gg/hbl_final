
export type MessengerPlatform = 'telegram' | 'whatsapp' | 'wechat' | 'email';
export type ClickLocation = 'header' | 'hero' | 'contact_section' | 'footer';
export type InteractionType = 'click' | 'hover' | 'copy';

/**
 * Tracks a lead generation event with detailed metadata.
 * Optimized for GA4 'generate_lead' event.
 */
export const trackLead = (
  platform: MessengerPlatform, 
  location: ClickLocation, 
  action: InteractionType = 'click'
) => {
  // 1. Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      'messenger_platform': platform,
      'interaction_type': action,
      'click_location': location,
      'event_category': 'conversion'
    });
    console.debug(`[GA4] lead: ${platform} | ${action} | ${location}`);
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
