/* ARTRON // Ennea sonic layer — fully procedural Web Audio, no assets.
   Palette: ice-blue telemetry. Short sine clicks, titanium plucks, sub sweeps.
   Never louder than -12 dBFS; every cue is < 1.2 s except the country dive. */

const KEY = 'artron-sound-on';

class ArtronAudioEngine {
  constructor() {
    this.enabled = localStorage.getItem(KEY) === '1';
    this.ctx = null;
    this._last = new Map();
  }

  /* ── graph ── */
  _init() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.0;
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -10; lim.knee.value = 12; lim.ratio.value = 8;
    master.connect(lim).connect(ctx.destination);
    this.master = master;

    // airy tail: short feedback delay, low-passed — reads as a cold hangar
    const send = ctx.createGain(); send.gain.value = 0.28;
    const d1 = ctx.createDelay(1); d1.delayTime.value = 0.113;
    const d2 = ctx.createDelay(1); d2.delayTime.value = 0.187;
    const fb = ctx.createGain(); fb.gain.value = 0.32;
    const tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3200;
    send.connect(d1); send.connect(d2);
    d1.connect(fb); d2.connect(fb); fb.connect(tone);
    tone.connect(d1); tone.connect(d2);
    const wet = ctx.createGain(); wet.gain.value = 0.5;
    d1.connect(wet); d2.connect(wet); wet.connect(master);
    this.send = send;

    this.noise = this._noiseBuffer(ctx);
    return ctx;
  }

  _noiseBuffer(ctx) {
    const len = ctx.sampleRate * 2;
    const b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.8;
    return b;
  }

  unlock() {
    const ctx = this._init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    this._ramp();
  }

  _ramp() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(this.enabled ? 0.9 : 0.0, t, 0.05);
  }

  setEnabled(on) {
    this.enabled = !!on;
    localStorage.setItem(KEY, this.enabled ? '1' : '0');
    if (this.enabled) this.unlock(); else this._ramp();
    window.dispatchEvent(new CustomEvent('artron-sound', { detail: { on: this.enabled } }));
    if (this.enabled) this.play('power');
  }

  toggle() { this.setEnabled(!this.enabled); return this.enabled; }

  /* ── voices ── */
  _tone({ type = 'sine', f0, f1, t0 = 0, dur = 0.18, gain = 0.2, curve = 'exp', wet = 0.3, detune = 0 }) {
    const ctx = this.ctx, t = ctx.currentTime + t0;
    const o = ctx.createOscillator();
    o.type = type;
    o.detune.value = detune;
    o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) {
      if (curve === 'exp') o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
      else o.frequency.linearRampToValueAtTime(f1, t + dur);
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + Math.min(0.02, dur * 0.25));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    if (wet > 0) { const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(this.send); }
    o.start(t); o.stop(t + dur + 0.05);
  }

  _air({ t0 = 0, dur = 0.5, gain = 0.12, f0 = 400, f1 = 5000, q = 1.2, wet = 0.5 }) {
    const ctx = this.ctx, t = ctx.currentTime + t0;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = q;
    bp.frequency.setValueAtTime(f0, t);
    bp.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp).connect(g); g.connect(this.master);
    const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(this.send);
    src.start(t); src.stop(t + dur + 0.05);
  }

  /* ── cue table ── */
  play(name) {
    if (!this.enabled) return;
    const ctx = this._init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    // de-bounce identical cues fired in the same frame burst
    const now = performance.now();
    const guard = name === 'hover' ? 40 : 55;
    if (now - (this._last.get(name) || 0) < guard) return;
    this._last.set(name, now);

    switch (name) {
      case 'hover':
        this._tone({ f0: 2640, f1: 2640, dur: 0.045, gain: 0.035, wet: 0.18 });
        break;
      case 'tick': // list rows, breadcrumbs, zoom buttons
        this._tone({ f0: 1760, f1: 1320, dur: 0.075, gain: 0.09, wet: 0.22 });
        break;
      case 'select': // core isolate, region select
        this._tone({ f0: 880, f1: 1320, dur: 0.11, gain: 0.13, wet: 0.35 });
        this._tone({ type: 'triangle', f0: 2640, f1: 2640, t0: 0.055, dur: 0.09, gain: 0.05, wet: 0.4 });
        break;
      case 'deselect':
        this._tone({ f0: 1320, f1: 740, dur: 0.12, gain: 0.1, wet: 0.3 });
        break;
      case 'filter':
        this._tone({ type: 'triangle', f0: 1174, f1: 1174, dur: 0.09, gain: 0.09, wet: 0.28 });
        this._air({ dur: 0.16, gain: 0.045, f0: 2200, f1: 5200, q: 2.2, wet: 0.3 });
        break;
      case 'enter': // ── country dive: sub thrust + doppler air + ice chord ──
        this._tone({ type: 'sine', f0: 46, f1: 132, dur: 1.15, gain: 0.3, curve: 'exp', wet: 0.1 });
        this._air({ dur: 1.0, gain: 0.13, f0: 240, f1: 5600, q: 0.9, wet: 0.6 });
        [0, 0.09, 0.18].forEach((d, i) => this._tone({
          type: 'triangle', f0: [587, 880, 1174][i], f1: [587, 880, 1174][i],
          t0: 0.42 + d, dur: 0.9, gain: 0.07, wet: 0.75,
        }));
        this._tone({ f0: 3520, f1: 2640, t0: 0.62, dur: 0.3, gain: 0.05, wet: 0.6 });
        break;
      case 'exit': // pull back out to orbit
        this._tone({ type: 'sine', f0: 150, f1: 42, dur: 0.85, gain: 0.22, wet: 0.12 });
        this._air({ dur: 0.7, gain: 0.1, f0: 5200, f1: 320, q: 0.9, wet: 0.55 });
        this._tone({ type: 'triangle', f0: 880, f1: 587, t0: 0.3, dur: 0.5, gain: 0.06, wet: 0.7 });
        break;
      case 'open': // venue card in
        this._tone({ type: 'triangle', f0: 1046, f1: 1568, dur: 0.14, gain: 0.1, wet: 0.45 });
        this._tone({ f0: 2093, f1: 3136, t0: 0.06, dur: 0.2, gain: 0.05, wet: 0.6 });
        this._air({ dur: 0.3, gain: 0.05, f0: 900, f1: 4200, q: 1.6, wet: 0.5 });
        break;
      case 'close':
        this._tone({ type: 'triangle', f0: 1046, f1: 660, dur: 0.13, gain: 0.08, wet: 0.35 });
        break;
      case 'ready': // ADM1 geometry resolved
        [0, 0.1, 0.2].forEach((d, i) => this._tone({
          f0: [1174, 1568, 2093][i], f1: [1174, 1568, 2093][i], t0: d, dur: 0.1, gain: 0.06, wet: 0.45,
        }));
        break;
      case 'error':
        this._tone({ type: 'square', f0: 220, f1: 165, dur: 0.22, gain: 0.045, wet: 0.2 });
        break;
      case 'power': // sound switched on
        this._tone({ type: 'sine', f0: 660, f1: 1320, dur: 0.22, gain: 0.1, wet: 0.4 });
        this._tone({ type: 'triangle', f0: 1980, f1: 1980, t0: 0.13, dur: 0.16, gain: 0.05, wet: 0.55 });
        break;
      default:
        break;
    }
  }
}

const engine = new ArtronAudioEngine();
window.ArtronAudio = engine;

/* first gesture anywhere primes the context (browser autoplay policy) */
const prime = () => { if (engine.enabled) engine.unlock(); };
window.addEventListener('pointerdown', prime, { capture: true });
window.addEventListener('keydown', prime, { capture: true });

/* stage events sonify themselves, so the 3D layer needs no audio code */
window.addEventListener('viewmode', (e) => {
  const m = e.detail && e.detail.mode;
  engine.play(m === 'GEORGIA_DETAIL' ? 'enter' : 'exit');
});
window.addEventListener('venueselect', (e) => {
  engine.play(e.detail && e.detail.venue ? 'open' : 'close');
});
window.addEventListener('regionselect', (e) => {
  engine.play(e.detail && e.detail.id ? 'select' : 'deselect');
});
window.addEventListener('mapstatus', (e) => {
  const s = e.detail && e.detail.status;
  if (s === 'READY') engine.play('ready');
  if (s === 'ERROR') engine.play('error');
});

export default engine;
