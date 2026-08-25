import fs from 'fs';
import path from 'path';

describe('Video Asset Engineering & Preload Tests (Sub-stage 1.2)', () => {
  const publicVideoDir = path.resolve(process.cwd(), 'public/video');
  const mp4Path = path.join(publicVideoDir, 'portal-blast.mp4');
  const maxSizeBytes = 3.5 * 1024 * 1024; // 3.5 MB maximum constraint for high-fidelity 1080p

  test('portal-blast.mp4 exists in public/video directory', () => {
    expect(fs.existsSync(mp4Path)).toBe(true);
  });

  test('portal-blast.mp4 file size is compressed under 3.5 MB target', () => {
    const stats = fs.statSync(mp4Path);
    expect(stats.size).toBeGreaterThan(100 * 1024); // at least 100KB
    expect(stats.size).toBeLessThanOrEqual(maxSizeBytes);
  });

  test('useVideoPreloader hook source file exists and contains preloadPortalVideo export', () => {
    const hookPath = path.resolve(process.cwd(), 'src/hooks/useVideoPreloader.ts');
    expect(fs.existsSync(hookPath)).toBe(true);
    const content = fs.readFileSync(hookPath, 'utf-8');
    expect(content).toContain('export function useVideoPreloader');
    expect(content).toContain('export const preloadPortalVideo');
  });

  test('GlobalPortalIgnition integrates useVideoPreloader and video tag', () => {
    const ignitionPath = path.resolve(process.cwd(), 'src/components/ui/GlobalPortalIgnition.tsx');
    expect(fs.existsSync(ignitionPath)).toBe(true);
    const content = fs.readFileSync(ignitionPath, 'utf-8');
    expect(content).toContain('useVideoPreloader');
    expect(content).toContain('<video');
    expect(content).toContain('autoPlay');
    expect(content).toContain('playsInline');
    expect(content).toContain('muted');
  });

  test('RootLayout head contains high-priority video preload tags', () => {
    const layoutPath = path.resolve(process.cwd(), 'src/app/layout.tsx');
    expect(fs.existsSync(layoutPath)).toBe(true);
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('rel="preload" href="/video/portal-blast.mp4" as="video"');
  });
});
