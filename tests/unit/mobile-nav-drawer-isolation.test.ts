import fs from 'fs';
import path from 'path';

describe('MobileNavDrawer Full-Height Isolation Architecture', () => {
  const drawerPath = path.resolve(__dirname, '../../src/components/header/MobileNavDrawer.tsx');
  const headerPath = path.resolve(__dirname, '../../src/components/Header.tsx');
  const widgetPath = path.resolve(__dirname, '../../src/components/FloatingContactWidget.tsx');

  it('MobileNavDrawer adheres to 400-line hard ceiling and 250-300 soft target', () => {
    const drawerContent = fs.readFileSync(drawerPath, 'utf8');
    const lineCount = drawerContent.split('\n').length;
    expect(lineCount).toBeLessThanOrEqual(300);
    expect(lineCount).toBeGreaterThanOrEqual(200);
  });

  it('implements full-height 100dvh container with solid zero bleed-through background', () => {
    const drawerContent = fs.readFileSync(drawerPath, 'utf8');
    expect(drawerContent).toContain('h-[calc(100vh-57px)]');
    expect(drawerContent).toContain('h-[calc(100dvh-57px)]');
    expect(drawerContent).toContain('bg-[#080B10]');
    expect(drawerContent).toContain('overscroll-contain');
  });

  it('enforces background scroll-locking and mobile menu event signaling', () => {
    const drawerContent = fs.readFileSync(drawerPath, 'utf8');
    expect(drawerContent).toContain("document.body.style.overflow = 'hidden'");
    expect(drawerContent).toContain('artron-mobile-menu-state');
  });

  it('contains dedicated Action Footer with dark-futurist contact dock without demo booking', () => {
    const drawerContent = fs.readFileSync(drawerPath, 'utf8');
    expect(drawerContent).toContain('MOBILE ACTION FOOTER');
    expect(drawerContent).not.toContain('/#booking');
    expect(drawerContent).toContain('CONTACT_CONFIG.telegram.url');
    expect(drawerContent).toContain('CONTACT_CONFIG.whatsapp.getUrl(locale)');
    expect(drawerContent).toContain('CONTACT_CONFIG.phone.dialUrl');
    expect(drawerContent).toContain('ECOSYSTEM LIVE');
  });

  it('FloatingContactWidget listens to artron-mobile-menu-state and hides during open menu', () => {
    const widgetContent = fs.readFileSync(widgetPath, 'utf8');
    expect(widgetContent).toContain('artron-mobile-menu-state');
    expect(widgetContent).toContain('chatbotOpen || mobileMenuOpen');
  });

  it('Header maintains solid background and zero y-displacement when mobile menu is open', () => {
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    expect(headerContent).toContain('isMobileMenuOpen ? 0 : kinematics.headerY');
    expect(headerContent).toContain("'bg-[#080B10] border-b border-white/[0.08]'");
  });
});
