/**
 * Procedural Web Audio Engine for ARTRON Ennea Ecosystem
 * Zero external audio assets — pure mathematical oscillator synthesis.
 */

const STORAGE_KEY = "artron-sound-on";

export class EnneaAudioEngine {
  private enabled: boolean = false;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private send: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem(STORAGE_KEY) === "1";
    }
  }

  public isSoundEnabled(): boolean {
    return this.enabled;
  }

  public setSoundEnabled(on: boolean): void {
    this.enabled = on;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
    }
    if (this.ctx) {
      const t = this.ctx.currentTime;
      this.master?.gain.cancelScheduledValues(t);
      this.master?.gain.setTargetAtTime(this.enabled ? 0.9 : 0.0, t, 0.05);
    }
  }

  public toggleSound(): boolean {
    this.setSoundEnabled(!this.enabled);
    if (this.enabled) {
      this.cue("click");
    }
    return this.enabled;
  }

  private initCtx(): AudioContext | null {
    if (this.ctx) return this.ctx;
    if (typeof window === "undefined") return null;

    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;

    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = this.enabled ? 0.9 : 0.0;

    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -10;
    lim.knee.value = 12;
    lim.ratio.value = 8;

    master.connect(lim).connect(ctx.destination);
    this.master = master;

    // Atmospheric tail feedback delay
    const send = ctx.createGain();
    send.gain.value = 0.28;
    const d1 = ctx.createDelay(1);
    d1.delayTime.value = 0.113;
    const d2 = ctx.createDelay(1);
    d2.delayTime.value = 0.187;
    const fb = ctx.createGain();
    fb.gain.value = 0.32;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 3200;

    send.connect(d1);
    send.connect(d2);
    d1.connect(fb);
    d2.connect(fb);
    fb.connect(tone);
    tone.connect(d1);
    tone.connect(d2);

    const wet = ctx.createGain();
    wet.gain.value = 0.5;
    d1.connect(wet);
    d2.connect(wet);
    wet.connect(master);
    this.send = send;

    // Procedural noise buffer
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }
    this.noiseBuffer = buf;

    return ctx;
  }

  public cue(type: "click" | "filter" | "beacon" | "enter" | "exit" | "venue" | "core" | "zoom" | "reset"): void {
    if (!this.enabled && type !== "click") return;
    const ctx = this.initCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const m = this.master;
    if (!m) return;

    switch (type) {
      case "click": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1600, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.03);
        g.gain.setValueAtTime(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.04);
        break;
      }
      case "filter": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.07);
        break;
      }
      case "beacon": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(920, t);
        osc.frequency.exponentialRampToValueAtTime(1840, t + 0.12);
        g.gain.setValueAtTime(0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(g).connect(m);
        if (this.send) g.connect(this.send);
        osc.start(t);
        osc.stop(t + 0.24);
        break;
      }
      case "enter": {
        // Sub sonic dive into Georgia
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(55, t + 0.5);
        g.gain.setValueAtTime(0.35, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.65);

        // High shimmer ping
        const ping = ctx.createOscillator();
        const pg = ctx.createGain();
        ping.type = "sine";
        ping.frequency.setValueAtTime(2200, t + 0.1);
        ping.frequency.exponentialRampToValueAtTime(1100, t + 0.45);
        pg.gain.setValueAtTime(0.15, t + 0.1);
        pg.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        ping.connect(pg).connect(m);
        if (this.send) pg.connect(this.send);
        ping.start(t + 0.1);
        ping.stop(t + 0.52);
        break;
      }
      case "exit": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.35);
        g.gain.setValueAtTime(0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.42);
        break;
      }
      case "venue": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(1800, t + 0.08);
        g.gain.setValueAtTime(0.22, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(g).connect(m);
        if (this.send) g.connect(this.send);
        osc.start(t);
        osc.stop(t + 0.16);
        break;
      }
      case "core": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(550, t);
        osc.frequency.exponentialRampToValueAtTime(780, t + 0.06);
        g.gain.setValueAtTime(0.16, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.12);
        break;
      }
      case "zoom":
      case "reset": {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(700, t);
        osc.frequency.exponentialRampToValueAtTime(950, t + 0.04);
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(g).connect(m);
        osc.start(t);
        osc.stop(t + 0.06);
        break;
      }
    }
  }
}

export const soundEngine = new EnneaAudioEngine();
