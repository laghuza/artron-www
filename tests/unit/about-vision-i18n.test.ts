import { getAboutVisionData } from '@/app/about/data/aboutVisionData';
import { ABOUT_VISION_KA } from '@/app/about/data/aboutVisionKa';
import { ABOUT_VISION_EN } from '@/app/about/data/aboutVisionEn';
import { ABOUT_VISION_RU } from '@/app/about/data/aboutVisionRu';

describe('About & Vision 3-Language (KA / EN / RU) Integrity Tests', () => {
  const locales = ['ka', 'en', 'ru'] as const;

  test('Should return correct datasets for each locale', () => {
    expect(getAboutVisionData('ka')).toBe(ABOUT_VISION_KA);
    expect(getAboutVisionData('en')).toBe(ABOUT_VISION_EN);
    expect(getAboutVisionData('ru')).toBe(ABOUT_VISION_RU);
    // Fallback to KA
    expect(getAboutVisionData('de')).toBe(ABOUT_VISION_KA);
  });

  describe.each(locales)('Locale: %s', (locale) => {
    const data = getAboutVisionData(locale);

    test('Manifesto: Has valid header, Sulkhan-Saba citation, explanation and letters', () => {
      expect(data.manifesto.badge).toBeTruthy();
      expect(data.manifesto.tagline).toBeTruthy();
      expect(data.manifesto.quoteText).toBeTruthy();
      expect(data.manifesto.quoteAuthor).toBeTruthy();
      expect(data.manifesto.thinkWhatItMeans).toBeTruthy();
      expect(data.manifesto.lettersAloneText).toBeTruthy();
      expect(data.manifesto.artronTurnsText).toBeTruthy();
      expect(data.manifesto.assembleLetters.length).toBeGreaterThanOrEqual(6);
      expect(data.manifesto.syntaxClaim).toBeTruthy();
      expect(data.manifesto.actors.length).toBe(4);
      expect(data.manifesto.consequences.length).toBe(3);
      expect(data.manifesto.minusArtronText).toBeTruthy();
      expect(data.manifesto.plusArtronText).toBeTruthy();
    });

    test('Architecture: Exactly 9 nodes with non-empty titles and descriptions', () => {
      expect(data.nodes.length).toBe(9);
      data.nodes.forEach((node, idx) => {
        expect(node.id).toBe(String(idx + 1).padStart(2, '0'));
        expect(node.code).toBeTruthy();
        expect(node.title.trim().length).toBeGreaterThan(0);
        expect(node.description.trim().length).toBeGreaterThan(20);
      });
      expect(data.architecture.kineticCore).toBeTruthy();
      expect(data.architecture.linked).toBeTruthy();
      expect(data.architecture.activeNode).toBeTruthy();
      expect(data.architecture.jumpTo).toBeTruthy();
    });

    test('Reliability: Exactly 4 vault cards with valid values', () => {
      expect(data.vaultCards.length).toBe(4);
      expect(data.vaultCards[0].value).toBe('99.99%');
      expect(data.vaultCards[1].value).toBe('AES-256');
      expect(data.vaultCards[2].value).toContain('01-15');
      expect(data.vaultCards[3].value).toBe('GLOBAL');

      data.vaultCards.forEach((card) => {
        expect(card.title.trim().length).toBeGreaterThan(0);
        expect(card.description.trim().length).toBeGreaterThan(20);
      });
    });

    test('Unity: 3 CTAs with valid hrefs and finale statements', () => {
      expect(data.unityCtas.length).toBe(3);
      data.unityCtas.forEach((cta) => {
        expect(cta.badge).toBeTruthy();
        expect(cta.title).toBeTruthy();
        expect(cta.desc).toBeTruthy();
        expect(cta.action).toBeTruthy();
        expect(cta.href.startsWith('/')).toBe(true);
      });

      expect(data.unity.finalBadge).toBeTruthy();
      expect(data.unity.finalTitleLine1).toBeTruthy();
      expect(data.unity.finalTitleLine2).toBeTruthy();
      expect(data.unity.finalParagraphBold).toBe('ARTRON');
      expect(data.unity.footnote1).toBeTruthy();
      expect(data.unity.footnote2).toBeTruthy();
    });
  });

  test('Assemble letters match linguistic specifics', () => {
    expect(ABOUT_VISION_KA.manifesto.assembleLetters).toEqual(['ა', 'რ', 'თ', 'რ', 'ო', 'ნ', 'ი']);
    expect(ABOUT_VISION_EN.manifesto.assembleLetters).toEqual(['A', 'R', 'T', 'R', 'O', 'N']);
    expect(ABOUT_VISION_RU.manifesto.assembleLetters).toEqual(['A', 'R', 'T', 'R', 'O', 'N']);
  });
});
