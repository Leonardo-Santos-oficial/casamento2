import { useCallback } from 'react';
import { analytics } from '@/services/AnalyticsService';

type EventCategory = 'engagement' | 'navigation' | 'error';

interface UseAnalyticsReturn {
  trackEvent: (action: string, label?: string, value?: number) => void;
  trackEngagement: (action: string, label?: string) => void;
  trackNavigation: (action: string, label?: string) => void;
  trackError: (action: string, label?: string) => void;
}

export const useAnalytics = (defaultCategory: EventCategory = 'engagement'): UseAnalyticsReturn => {
  const trackEvent = useCallback(
    (action: string, label?: string, value?: number) => {
      analytics.trackEvent(defaultCategory, action, label, value);
    },
    [defaultCategory]
  );

  const trackEngagement = useCallback((action: string, label?: string) => {
    analytics.trackEvent('engagement', action, label);
  }, []);

  const trackNavigation = useCallback((action: string, label?: string) => {
    analytics.trackEvent('navigation', action, label);
  }, []);

  const trackError = useCallback((action: string, label?: string) => {
    analytics.trackEvent('error', action, label);
  }, []);

  return {
    trackEvent,
    trackEngagement,
    trackNavigation,
    trackError
  };
};
