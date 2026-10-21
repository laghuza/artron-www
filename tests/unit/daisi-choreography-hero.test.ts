import { buildDaisiClusters, evaluateTimeline, calculateDaisiAnchor } from '@/components/landing/kinetic/daisi/daisiModels';

describe('Phase 59: Daisi Choreography Hero System Architecture', () => {
  it('should initialize all 11 3D sport models across 4 alternating clusters', () => {
    const { clusters, loop } = buildDaisiClusters();
    expect(clusters.length).toBe(4);
    expect(loop).toBeGreaterThan(0);

    // Cluster 0: Kinetic Spheres (Football, Basket, Rugby)
    expect(clusters[0].side).toBe(-1);
    expect(clusters[0].s.length).toBe(3);
    clusters[0].s.forEach((model) => {
      expect(model.pts.length).toBeGreaterThan(500);
      expect(model.rb).toBeGreaterThan(50);
    });

    // Cluster 1: Precision & Summit (Epee, Driver, Axe)
    expect(clusters[1].side).toBe(1);
    expect(clusters[1].s.length).toBe(3);

    // Cluster 2: Combat (Glove, Belt)
    expect(clusters[2].side).toBe(-1);
    expect(clusters[2].s.length).toBe(2);

    // Cluster 3: Speed (Skate, Helmet, Wheel)
    expect(clusters[3].side).toBe(1);
    expect(clusters[3].s.length).toBe(3);
  });

  it('should evaluate timeline states accurately during intro and loop', () => {
    const { clusters, loop } = buildDaisiClusters();

    // Intro orbit phase (T < 2.4)
    const tIntro = evaluateTimeline(1.0, clusters, loop);
    expect(tIntro.st).toBe(0);

    // Intro condensation phase (2.4 <= T < 4.3)
    const tCond = evaluateTimeline(3.0, clusters, loop);
    expect(tCond.st).toBe(1);
    expect(tCond.p).toBeDefined();

    // Active morph / cluster cycle (T >= 4.3)
    const tActive = evaluateTimeline(6.0, clusters, loop);
    expect([2, 3]).toContain(tActive.st);
    expect(tActive.A).toBeDefined();
    expect(tActive.B).toBeDefined();
  });

  it('should anchor 3D sports equipment to left (-1) and right (+1) flanks of ARTRON wordmark', () => {
    // Desktop scenario: 1440x900, center cx = 720
    const desktopBounds = { left: 280, right: 1160, top: 380, bottom: 520, width: 880, height: 140 };
    
    // Left flank anchor (side: -1)
    const leftAnchor = calculateDaisiAnchor(-1, 1440, 900, 120, 1.0, desktopBounds);
    expect(leftAnchor.x).toBeLessThan(720);
    expect(leftAnchor.rs).toBeGreaterThan(0);
    expect(leftAnchor.y).toBeLessThan(desktopBounds.top);

    // Right flank anchor (side: +1)
    const rightAnchor = calculateDaisiAnchor(1, 1440, 900, 120, 1.0, desktopBounds);
    expect(rightAnchor.x).toBeGreaterThan(720);
    expect(rightAnchor.rs).toBeGreaterThan(0);
    expect(rightAnchor.y).toBeLessThan(desktopBounds.top);

    // Mobile scenario: 390x844, center cx = 195
    const mobileBounds = { left: 20, right: 370, top: 390, bottom: 450, width: 350, height: 60 };
    const mobileLeft = calculateDaisiAnchor(-1, 390, 844, 120, 0.45, mobileBounds);
    const mobileRight = calculateDaisiAnchor(1, 390, 844, 120, 0.45, mobileBounds);

    expect(mobileLeft.x).toBeLessThanOrEqual(195);
    expect(mobileRight.x).toBeGreaterThanOrEqual(195);
    expect(mobileLeft.y).toBeLessThan(mobileBounds.top);
    expect(mobileRight.y).toBeLessThan(mobileBounds.top);
  });
});

