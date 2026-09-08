import fs from 'fs';
import path from 'path';

describe('Fullscreen Portal Overlay Architectural & Functional Tests (Sub-phase 1.3)', () => {
  const overlayComponentPath = path.resolve(process.cwd(), 'src/components/ui/FullscreenPortalOverlay.tsx');
  const globalPortalPath = path.resolve(process.cwd(), 'src/components/ui/GlobalPortalIgnition.tsx');

  test('FullscreenPortalOverlay component exists in src/components/ui', () => {
    expect(fs.existsSync(overlayComponentPath)).toBe(true);
  });

  test('FullscreenPortalOverlay exports the component and typescript interface', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain('export interface FullscreenPortalOverlayProps');
    expect(content).toContain('export const FullscreenPortalOverlay');
  });

  test('FullscreenPortalOverlay implements #0B0E14 dark cosmic background and backdrop-blur-2xl layer', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain('#0B0E14');
    expect(content).toContain('backdrop-blur-2xl');
    expect(content).toContain('fixed inset-0');
  });

  test('FullscreenPortalOverlay locks background body scroll and interactions when active', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain("document.body.style.overflow = 'hidden'");
    expect(content).toContain("document.body.style.touchAction = 'none'");
    expect(content).toContain('document.body.style.overflow = originalOverflow');
    expect(content).toContain('document.body.style.touchAction = originalTouchAction');
  });

  test('FullscreenPortalOverlay implements ESC keyboard dismissal listener', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain("e.key === 'Escape'");
    expect(content).toContain("window.addEventListener('keydown', handleKeyDown)");
    expect(content).toContain("window.removeEventListener('keydown', handleKeyDown)");
  });

  test('FullscreenPortalOverlay includes minimalist Close/Esc button with ESC badge and audio feedback', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain('ESC');
    expect(content).toContain('დახურვა');
    expect(content).toContain('soundEngine.playClose()');
    expect(content).toContain('soundEngine.playHover()');
    expect(content).toContain('data-testid="portal-close-button"');
  });

  test('FullscreenPortalOverlay implements A11y dialog standards', () => {
    const content = fs.readFileSync(overlayComponentPath, 'utf-8');
    expect(content).toContain('role="dialog"');
    expect(content).toContain('aria-modal="true"');
    expect(content).toContain('aria-label="Fullscreen Portal Overlay"');
  });

  test('GlobalPortalIgnition integrates FullscreenPortalOverlay as root portal wrapper', () => {
    const content = fs.readFileSync(globalPortalPath, 'utf-8');
    expect(content).toContain("import { FullscreenPortalOverlay } from './FullscreenPortalOverlay'");
    expect(content).toContain('<FullscreenPortalOverlay');
    expect(content).toContain('isOpen={isIgniting}');
    expect(content).toContain('showCloseButton={false}');
  });
});

