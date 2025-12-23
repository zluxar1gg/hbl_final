
export type MessengerPlatform = 'telegram' | 'whatsapp' | 'wechat' | 'email';
export type ClickLocation = 'header' | 'hero' | 'contact_section' | 'footer' | 'floating';
export type InteractionType = 'click' | 'hover' | 'copy';

/**
 * Tracks interactions with contact methods.
 * Creates distinct event names like 'telegram_click' or 'whatsapp_hover'
 * so they are immediately visible in GA4 Top Events list.
 */
export const trackLead = (
  platform: MessengerPlatform, 
  location: ClickLocation, 
  action: InteractionType = 'click'
) => {
  if (typeof window === 'undefined') return;

  // Create a descriptive event name: e.g., "telegram_click", "whatsapp_hover"
  const eventName = `${platform}_${action}`;

  // 1. Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, {
      'messenger_platform': platform,
      'interaction_type': action,
      'click_location': location,
      'event_category': 'conversion',
      // Keep original parameters for advanced filtering, 
      // but the eventName itself now carries the main info.
      'value': action === 'click' ? 1.0 : 0.1,
      'currency': 'USD'
    });
  }

  // 2. Yandex Metrica
  if ((window as any).ym) {
    (window as any).ym(105783207, 'reachGoal', eventName, {
      platform,
      location,
      action
    });
  }

  // 3. Dev Console logging
  const styles = {
    click: 'background: #2397d0; color: white; padding: 2px 5px; border-radius: 4px;',
    hover: 'background: #fff176; color: black; padding: 2px 5px; border-radius: 4px;',
    copy: 'background: #07C160; color: white; padding: 2px 5px; border-radius: 4px;'
  };

  console.log(
    `%c${eventName.toUpperCase()}%c at ${location}`,
    styles[action as keyof typeof styles] || '',
    'font-weight: bold; margin-left: 10px;'
  );
};
