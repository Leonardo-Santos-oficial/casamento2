type EventCategory = 'engagement' | 'navigation' | 'error';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  trackEvent(
    category: EventCategory,
    action: string,
    label?: string,
    value?: number
  ): void {
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      timestamp: new Date()
    };

    this.events.push(event);
    console.log('[Analytics]', event);

    // Aqui você pode integrar com Google Analytics, Mixpanel, etc
    // Exemplo: gtag('event', action, { event_category: category, event_label: label });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analytics = AnalyticsService.getInstance();
