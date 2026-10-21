import fs from 'fs';
import path from 'path';

describe('Gold Rim Georgia Network Badge & Button Integration', () => {
  const globalsCssPath = path.resolve(__dirname, '../../src/app/globals.css');
  const enneaCanvasPath = path.resolve(
    __dirname,
    '../../src/components/landing/ecosystem/EnneaSceneCanvas.tsx'
  );
  const enneaDockPath = path.resolve(
    __dirname,
    '../../src/components/landing/ecosystem/EnneaDataDock.tsx'
  );

  it('defines gold-rim-beacon-card and gold-rim-beacon-btn in globals.css', () => {
    const cssContent = fs.readFileSync(globalsCssPath, 'utf8');
    expect(cssContent).toContain('.gold-rim-beacon-card');
    expect(cssContent).toContain('.gold-rim-beacon-btn');
    expect(cssContent).toContain('#FFE89E');
    expect(cssContent).toContain('#D4AF37');
  });

  it('applies gold-rim-beacon-card and gold-rim-beacon-btn to the Georgia active core badge in EnneaSceneCanvas.tsx', () => {
    const canvasContent = fs.readFileSync(enneaCanvasPath, 'utf8');
    expect(canvasContent).toContain('gold-rim-beacon-card');
    expect(canvasContent).toContain('gold-rim-beacon-btn');
    expect(canvasContent).toContain('{t.badgeTitle}');
    expect(canvasContent).toContain('{t.exploreGeorgia}');
  });

  it('applies gold-rim styling to the exploreGeorgia action in EnneaDataDock.tsx', () => {
    const dockContent = fs.readFileSync(enneaDockPath, 'utf8');
    expect(dockContent).toContain('gold-rim-pill');
    expect(dockContent).toContain('t.exploreGeorgia');
  });
});
