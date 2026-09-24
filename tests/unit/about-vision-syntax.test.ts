import {
  VISION_NODES,
  MATRIX_RING_ORDER,
  FRAGMENTED_ACTORS,
  FRAGMENTED_CONSEQUENCES,
  RELIABILITY_VAULT_CARDS,
  UNITY_CTAS,
} from '@/app/about/data/aboutVisionData';

describe('About & Vision (Sports Digital Syntax) Architecture', () => {
  test('should define exactly 9 ecosystem nodes with proper IDs and codes', () => {
    expect(VISION_NODES).toHaveLength(9);
    expect(VISION_NODES[0].id).toBe('01');
    expect(VISION_NODES[0].code).toBe('SPACES');
    expect(VISION_NODES[8].id).toBe('09');
    expect(VISION_NODES[8].code).toBe('ARTRON CORE');
  });

  test('should have valid 3x3 matrix ring ordering for HUD', () => {
    expect(MATRIX_RING_ORDER).toEqual([0, 1, 2, 7, 8, 3, 6, 5, 4]);
    expect(MATRIX_RING_ORDER).toHaveLength(9);
    // Center node is index 8 (ARTRON CORE)
    expect(MATRIX_RING_ORDER[4]).toBe(8);
  });

  test('should define 4 fragmented world actors with coordinates', () => {
    expect(FRAGMENTED_ACTORS).toHaveLength(4);
    expect(FRAGMENTED_ACTORS[0].coord).toContain('0.12');
    expect(FRAGMENTED_ACTORS[3].text).toContain('ფედერაცია');
  });

  test('should list 3 consequences of sector fragmentation', () => {
    expect(FRAGMENTED_CONSEQUENCES).toHaveLength(3);
    expect(FRAGMENTED_CONSEQUENCES[0].num).toBe('— 01');
    expect(FRAGMENTED_CONSEQUENCES[2].text).toContain('ადამიანის ყოველდღიური შრომა');
  });

  test('should provide 4 reliability vault cards with key parameters', () => {
    expect(RELIABILITY_VAULT_CARDS).toHaveLength(4);
    expect(RELIABILITY_VAULT_CARDS[0].value).toBe('99.99%');
    expect(RELIABILITY_VAULT_CARDS[1].value).toBe('AES-256');
    expect(RELIABILITY_VAULT_CARDS[2].value).toBe('№01-15/ნ');
    expect(RELIABILITY_VAULT_CARDS[3].value).toBe('GLOBAL');
  });

  test('should define 3 B2B/B2C unity call to action portals', () => {
    expect(UNITY_CTAS).toHaveLength(3);
    expect(UNITY_CTAS[0].badge).toBe('[ A // CLUBS ]');
    expect(UNITY_CTAS[1].badge).toBe('[ B // ATHLETES ]');
    expect(UNITY_CTAS[2].badge).toBe('[ C // PARTNERS ]');
  });
});
