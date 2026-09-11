import fs from 'fs';
import path from 'path';
import { GeorgianId3DMockup } from '@/components/gateway/widgets/live/multimodal-ai/GeorgianId3DMockup';

describe('Phase 42: Georgian 3D ID Card Simulation for AI Assistant OCR', () => {
  it('should verify that the Georgian ID card assets exist in public/video', () => {
    const rawPath = path.join(process.cwd(), 'public/video/georgian ID.png');
    const slugPath = path.join(process.cwd(), 'public/video/georgian-id.png');

    expect(fs.existsSync(rawPath)).toBe(true);
    expect(fs.existsSync(slugPath)).toBe(true);

    const stat = fs.statSync(rawPath);
    expect(stat.size).toBeGreaterThan(10000); // Valid image
  });

  it('should verify that GeorgianId3DMockup is exported as a React functional component', () => {
    expect(GeorgianId3DMockup).toBeDefined();
    expect(typeof GeorgianId3DMockup).toBe('function');
  });

  it('should verify that SimplifiedAiShowcase imports and uses GeorgianId3DMockup', () => {
    const showcasePath = path.join(
      process.cwd(),
      'src/components/gateway/widgets/live/multimodal-ai/SimplifiedAiShowcase.tsx'
    );
    const content = fs.readFileSync(showcasePath, 'utf-8');

    expect(content).toContain("import { GeorgianId3DMockup } from './GeorgianId3DMockup';");
    expect(content).toContain('<GeorgianId3DMockup ocrStep={ocrStep} locale={locale} />');
  });

  it('should verify that GeorgianId3DMockup satisfies the 400-line hard cap (soft target < 300)', () => {
    const idCardPath = path.join(
      process.cwd(),
      'src/components/gateway/widgets/live/multimodal-ai/GeorgianId3DMockup.tsx'
    );
    const lines = fs.readFileSync(idCardPath, 'utf-8').split('\n').length;
    expect(lines).toBeLessThanOrEqual(300);
  });

  it('should verify that SimplifiedAiShowcase satisfies the 400-line hard cap', () => {
    const showcasePath = path.join(
      process.cwd(),
      'src/components/gateway/widgets/live/multimodal-ai/SimplifiedAiShowcase.tsx'
    );
    const lines = fs.readFileSync(showcasePath, 'utf-8').split('\n').length;
    expect(lines).toBeLessThanOrEqual(400);
  });
});
