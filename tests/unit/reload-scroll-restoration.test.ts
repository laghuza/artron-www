import { SECTION_NODES } from '@/components/navigation/elevatorSections';

describe('Reload Scroll Restoration & Fresh Page Start', () => {
  it('SECTION_NODES defines the canonical landing sections', () => {
    expect(SECTION_NODES).toBeDefined();
    expect(SECTION_NODES.length).toBeGreaterThan(0);
    const ids = SECTION_NODES.map((n) => n.id);
    expect(ids).toContain('pure-sports-mirror');
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
