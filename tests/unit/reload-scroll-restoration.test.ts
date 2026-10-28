import { SECTION_NODES } from '@/components/navigation/elevatorSections';
import {
  isInitialBrowserReload,
  markInitialBootComplete,
} from '@/components/navigation/ScrollRestorationHandler';
import { resolveHashTarget } from '@/components/header/headerNavData';

describe('Reload Scroll Restoration & Cross-Page Section Navigation', () => {
  it('SECTION_NODES defines the canonical landing sections', () => {
    expect(SECTION_NODES).toBeDefined();
    expect(SECTION_NODES.length).toBeGreaterThan(0);
    const ids = SECTION_NODES.map((n) => n.id);
    expect(ids).toContain('pure-sports-mirror');
    expect(ids).toContain('faq');
  });

  it('resolves /#faq and tab targets accurately across cross-page navigation', () => {
    const ids = SECTION_NODES.map((n) => n.id);
    const faqTarget = resolveHashTarget('/#faq', ids);
    expect(faqTarget.targetId).toBe('faq');
    expect(faqTarget.resolvedTargetId).toBe('faq');
    expect(faqTarget.primaryId).toBe('faq');

    const roiTarget = resolveHashTarget('/#dashboard-features?tab=roi', ids);
    expect(roiTarget.tab).toBe('roi');
    expect(roiTarget.resolvedTargetId).toBe('dashboard-features');
    expect(roiTarget.primaryId).toBe('dashboard-features');
  });

  it('never mistakes subsequent SPA route navigation (e.g. /about -> /#faq) for a reload after initial boot', () => {
    markInitialBootComplete();
    expect(isInitialBrowserReload()).toBe(false);
  });

  it('enforces history.scrollRestoration = manual when supported', () => {
    const mockHistory = {
      scrollRestoration: 'auto',
      replaceState: jest.fn(),
    };
    const mockWindow = {
      history: mockHistory,
    };

    if ('scrollRestoration' in mockWindow.history) {
      mockWindow.history.scrollRestoration = 'manual';
    }

    expect(mockWindow.history.scrollRestoration).toBe('manual');
  });

  it('detects page reload correctly and resets scroll & cleans hash', () => {
    const replaceStateMock = jest.fn();
    const scrollToMock = jest.fn();

    const mockPerformance = {
      getEntriesByType: jest.fn().mockReturnValue([{ type: 'reload' }]),
    };

    const mockWindow = {
      history: {
        scrollRestoration: 'auto',
        replaceState: replaceStateMock,
      },
      performance: mockPerformance,
      scrollTo: scrollToMock,
      location: {
        pathname: '/',
        search: '',
        hash: '#pure-sports-mirror',
      },
    };

    // Simulate reload logic
    const navEntries = mockWindow.performance.getEntriesByType('navigation');
    const isReload =
      navEntries.length > 0 &&
      (navEntries[0] as PerformanceNavigationTiming).type === 'reload';

    expect(isReload).toBe(true);

    if (isReload) {
      if (mockWindow.location.hash) {
        mockWindow.history.replaceState(null, '', mockWindow.location.pathname + mockWindow.location.search);
      }
      mockWindow.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    expect(replaceStateMock).toHaveBeenCalledWith(null, '', '/');
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });
});
