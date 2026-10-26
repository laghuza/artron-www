import fs from 'fs';
import path from 'path';

describe('FloatingContactWidget Mobile Action Sheet Overhaul', () => {
  const widgetPath = path.resolve(__dirname, '../../src/components/FloatingContactWidget.tsx');
  const sheetPath = path.resolve(__dirname, '../../src/components/contact/ContactActionSheet.tsx');
  const dataPath = path.resolve(__dirname, '../../src/components/contact/contactWidgetData.ts');

  it('all files exist and are strictly under 250 lines (adheres to Soft Target)', () => {
    const widgetContent = fs.readFileSync(widgetPath, 'utf8');
    const sheetContent = fs.readFileSync(sheetPath, 'utf8');
    const dataContent = fs.readFileSync(dataPath, 'utf8');

    expect(widgetContent.split('\n').length).toBeLessThanOrEqual(250);
    expect(sheetContent.split('\n').length).toBeLessThanOrEqual(250);
    expect(dataContent.split('\n').length).toBeLessThanOrEqual(100);
  });

  it('includes frosted glass backdrop scrim and mobile action sheet modal', () => {
    const sheetContent = fs.readFileSync(sheetPath, 'utf8');
    expect(sheetContent).toContain('contact-backdrop');
    expect(sheetContent).toContain('contact-sheet');
    expect(sheetContent).toContain('backdrop-blur-md');
    expect(sheetContent).toContain('role="dialog"');
    expect(sheetContent).toContain('aria-modal="true"');
  });

  it('includes all 4 communication channels with touch targets >= 56px', () => {
    const sheetContent = fs.readFileSync(sheetPath, 'utf8');
    expect(sheetContent).toContain('CONTACT_CONFIG.telegram.url');
    expect(sheetContent).toContain('CONTACT_CONFIG.whatsapp.getUrl(lang)');
    expect(sheetContent).toContain('CONTACT_CONFIG.phone.dialUrl');
    expect(sheetContent).toContain('onOpenChatbot');
    expect(sheetContent).toContain("minHeight: '56px'");
  });

  it('supports 3 languages (KA, EN, RU) with clear titles and subtitles', () => {
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    expect(dataContent).toContain('სწრაფი კომუნიკაცია');
    expect(dataContent).toContain('Quick Communication');
    expect(dataContent).toContain('Быстрая связь');
    expect(dataContent).toContain('დახურვა');
    expect(dataContent).toContain('Close');
    expect(dataContent).toContain('Закрыть');
  });

  it('preserves audio manager click feedback and custom events in widget', () => {
    const widgetContent = fs.readFileSync(widgetPath, 'utf8');
    expect(widgetContent).toContain('audioManager.playClick()');
    expect(widgetContent).toContain('artron-chatbot-state');
    expect(widgetContent).toContain('artron-open-omnichannel');
  });
});
