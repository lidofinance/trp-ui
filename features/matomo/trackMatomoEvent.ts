import { trackEvent } from '@lidofinance/analytics-matomo';
import { MATOMO_CLICK_EVENTS, MATOMO_EVENT } from './events';

export const trackMatomoEvent = (eventType: MATOMO_EVENT) => {
  eventType && trackEvent(...MATOMO_CLICK_EVENTS[eventType]);
};
