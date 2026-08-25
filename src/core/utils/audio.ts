/**
 * ARTRON SPORTS OS // WEB AUDIO API SOUND SYNTHESIS ENGINE
 * High-tech, subtle, tactile Sci-Fi UI audio feedback (PlayStation-grade haptic click).
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * Deep, subtle tactile Sci-Fi haptic pulse (Plays ONLY on user click).
   */
  public playPulseNode() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Deep sub-frequency sine pulse dropping smoothly (140Hz -> 50Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  /**
   * Elegant system activation chime for main CTA action click.
   */
  public playSystemAccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  /**
   * Subtle soft click on chip / tab selection
   */
  public playHoverChip() {
    this.playPulseNode();
  }

  /**
   * Subtle card interaction pulse
   */
  public playCardHover() {
    this.playPulseNode();
  }

  /**
   * Soft Sci-Fi cybernetic hum on button hover
   */
  public playHover() {
    this.playPulseNode();
  }

  /**
   * High-energy shockwave ignition detonation sound
   */
  public playIgnition() {
    this.playSystemAccess();
  }

  /**
   * Crisp downward pitch haptic sound for dismissing dialogs/portals
   */
  public playClose() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /**
   * 0-1s: Deep sub-bass tension drone building up (50Hz -> 110Hz).
   */
  public playBootCoreTension() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 1.0);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.95);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.05);
  }

  /**
   * 1-3s: Violent electronic core burst whoosh and resonance detonation.
   */
  public playCoreBurst() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // 1. Explosive frequency sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(380, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);

    // 2. High-frequency crackle/whoosh burst
    const highOsc = this.ctx.createOscillator();
    const highGain = this.ctx.createGain();
    highOsc.type = 'triangle';
    highOsc.frequency.setValueAtTime(800, this.ctx.currentTime);
    highOsc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.6);

    highGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    highGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

    highOsc.connect(highGain);
    highGain.connect(this.ctx.destination);

    highOsc.start();
    highOsc.stop(this.ctx.currentTime + 0.65);
  }

  /**
   * 3-5s: Soft descending harmonic digital tone during gravitational inward pull.
   */
  public playParticleCoalesce() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.25);
  }

  /**
   * 5-6s: Crisp crystalline metallic chime as ARTRON logo resolves against black.
   */
  public playLogoChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const frequencies = [880, 1320, 1760];
    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.03);

      gain.gain.setValueAtTime(0.035 / (idx + 1), this.ctx.currentTime + idx * 0.03);
      osc.start(this.ctx.currentTime + idx * 0.03);
      osc.stop(this.ctx.currentTime + 0.95);
    });
  }

  /**
   * ვარიანტი 1: Quantum Genesis & Harmonic Materialization
   * თითქოს ენერგია ნულიდან წარმოიქმნება, იკრიბება და იშლება
   */
  public playQuantumGenesis() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Sub-harmonic warm swell
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(80, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 2.5);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 1.2);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 3.1);

    // Harmonic crystalline shimmer notes (Materialization arpeggio)
    [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.4 + idx * 0.25);
      gain.gain.setValueAtTime(0.0001, now + 0.4 + idx * 0.25);
      gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), now + 0.5 + idx * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.4 + idx * 0.25);
      osc.stop(now + 2.0 + idx * 0.25);
    });
  }

  /**
   * ვარიანტი 2: Deep Plasma Vortex & Swell
   * პლაზმური გრიგალი და ენერგიის კონცენტრაცია
   */
  public playPlasmaVortex() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 1.5);
    osc.frequency.exponentialRampToValueAtTime(88, now + 3.0);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 3.3);
  }

  /**
   * ვარიანტი 3: PS5 Ambient Boot Chord
   * PlayStation 5-ის სტილის თბილი, სასიამოვნო აკორდი
   */
  public playPS5BootChord() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    [110, 220, 329.63, 440, 659.25].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.06 / (idx * 0.5 + 1), now + 0.3 + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5 + idx * 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + 2.6 + idx * 0.05);
    });
  }

  /**
   * ვარიანტი 4: Holographic Light Sparkle & Shimmer
   * მინისებრი, კრისტალური ჰოლოგრამის გაშლის ნაზი ხმა
   */
  public playHologramSparkle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.75);
    });
  }
}

export const soundEngine = new SoundEngine();
