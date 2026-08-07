export type VisualEffectId =
  | 'PARTICLE_ENTROPY'
  | 'NEON_GRID_PULSE'
  | 'CYBER_SCANLINES'
  | 'GLASSMORPHIC_HUD'
  | 'SYNTHESIZER_AUDIO_TELEMETRY';

export interface VisualEffectPreset {
  id: VisualEffectId;
  name: string;
  description: string;
  defaultEnabled: boolean;
  intensity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CYBER_OVERDRIVE';
  cssClass: string;
  params: { particleDensity?: number; pulseSpeedMs?: number; scanlineOpacity?: number; blurPx?: number; audioFrequencyRange?: [number, number]; };
}

export const VISUAL_EFFECTS_REGISTRY: Record<VisualEffectId, VisualEffectPreset> = {
  PARTICLE_ENTROPY: {
    id: 'PARTICLE_ENTROPY', name: 'Particle Entropy', description: 'Dynamic quantum particle background movement',
    defaultEnabled: true, intensity: 'MEDIUM', cssClass: 'effect-particle-entropy', params: { particleDensity: 42, pulseSpeedMs: 3000 },
  },
  NEON_GRID_PULSE: {
    id: 'NEON_GRID_PULSE', name: 'Neon Grid Pulse', description: 'PlayStation cyber grid wave animation',
    defaultEnabled: true, intensity: 'HIGH', cssClass: 'effect-neon-grid-pulse', params: { pulseSpeedMs: 1500 },
  },
  CYBER_SCANLINES: {
    id: 'CYBER_SCANLINES', name: 'Cyber Scanlines', description: 'Retro-futuristic CRT scanline overlay',
    defaultEnabled: false, intensity: 'LOW', cssClass: 'effect-cyber-scanlines', params: { scanlineOpacity: 0.15 },
  },
  GLASSMORPHIC_HUD: {
    id: 'GLASSMORPHIC_HUD', name: 'Glassmorphic HUD', description: 'Ultra-thin translucent cyber cards with backdrop blur',
    defaultEnabled: true, intensity: 'HIGH', cssClass: 'effect-glass-hud', params: { blurPx: 16 },
  },
  SYNTHESIZER_AUDIO_TELEMETRY: {
    id: 'SYNTHESIZER_AUDIO_TELEMETRY', name: 'Synthesizer Audio Telemetry', description: 'Reactive audio frequency visualizer wave',
    defaultEnabled: true, intensity: 'MEDIUM', cssClass: 'effect-synth-audio', params: { audioFrequencyRange: [20, 20000] },
  },
};

export interface PageNodeEffectsConfig {
  pageId: string;
  activeEffects: VisualEffectId[];
  ambientGlowColor: string;
}

export const DEFAULT_PAGE_EFFECTS: Record<string, PageNodeEffectsConfig> = {
  dashboard: {
    pageId: 'dashboard',
    activeEffects: ['PARTICLE_ENTROPY', 'NEON_GRID_PULSE', 'GLASSMORPHIC_HUD', 'SYNTHESIZER_AUDIO_TELEMETRY'],
    ambientGlowColor: '#00E676',
  },
  onboarding: {
    pageId: 'onboarding',
    activeEffects: ['PARTICLE_ENTROPY', 'NEON_GRID_PULSE', 'CYBER_SCANLINES', 'GLASSMORPHIC_HUD'],
    ambientGlowColor: '#00FF87',
  },
  node_01: {
    pageId: 'node_01',
    activeEffects: ['NEON_GRID_PULSE', 'GLASSMORPHIC_HUD'],
    ambientGlowColor: '#00E676',
  },
};

export const getActiveEffectsForPage = (pageId: string): VisualEffectPreset[] => {
  const config = DEFAULT_PAGE_EFFECTS[pageId] || DEFAULT_PAGE_EFFECTS.dashboard;
  return config.activeEffects.map((id) => VISUAL_EFFECTS_REGISTRY[id]);
};
