"use client";

class AudioManager {
  private humAudio: HTMLAudioElement | null = null;
  private muted = true;
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("artron_audio_muted");
      this.muted = saved !== "false";
    }
  }

  public subscribe(listener: (muted: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.muted));
  }

  public isMuted() {
    return this.muted;
  }

  public toggleMute() {
    this.setMuted(!this.muted);
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("artron_audio_muted", String(muted));
    }
    if (this.humAudio) {
      this.humAudio.muted = muted;
    }
    this.notify();
  }

  public playClick() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const click = new Audio("/click.mp3");
      click.volume = 0.08;
      click.play().catch(() => {});
    } catch (e) {
      console.warn("Click audio playback failed:", e);
    }
  }

  public playHapticClick() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const click = new Audio("/haptic-click.mp3");
      click.volume = 0.1; // volume cap = 0.1 (10%)
      click.play().catch(() => {});
    } catch (e) {
      console.warn("Haptic click playback failed:", e);
    }
  }

  public startHum() {
    if (typeof window === "undefined") return;
    try {
      if (!this.humAudio) {
        this.humAudio = new Audio("/ambient-hum.mp3");
        this.humAudio.loop = true;
        this.humAudio.volume = 0.03;
      }
      this.humAudio.muted = this.muted;
      this.humAudio.play().catch(() => {});
    } catch (e) {
      console.warn("Ambient hum playback failed:", e);
    }
  }

  public stopHum() {
    if (this.humAudio) {
      try {
        this.humAudio.pause();
        this.humAudio.currentTime = 0;
      } catch (e) {}
    }
  }

  public playAlert() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

export const audioManager = new AudioManager();
