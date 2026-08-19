// Native Web Audio API Synthesizer for Terminal Mechanical & Tactile Feedback
// Generates realistic, non-intrusive mechanical key clicks and soft synth blips without any external audio files.

class CliSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastKeyTime: number = 0;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_cli_sound');
        if (saved !== null) {
          this.isMuted = saved === 'false';
        }
      } catch {
        this.isMuted = false;
      }
    }
  }

  /**
   * Lazily initialize and resume AudioContext on legitimate user interaction.
   */
  public initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      if (this.ctx && !this.noiseBuffer) {
        // Pre-create a shared 50ms white noise buffer for efficient click synthesis
        const sampleRate = this.ctx.sampleRate || 44100;
        const length = Math.floor(sampleRate * 0.05);
        this.noiseBuffer = this.ctx.createBuffer(1, length, sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }
    } catch {
      // Graceful fallback if Web Audio is unsupported
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('portfolio_cli_sound', (!this.isMuted).toString());
    } catch {}
    if (!this.isMuted) {
      this.playSuccess();
    }
    return !this.isMuted;
  }

  public getSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public setSoundEnabled(enabled: boolean) {
    this.isMuted = !enabled;
    try {
      localStorage.setItem('portfolio_cli_sound', enabled.toString());
    } catch {}
  }

  /**
   * Primary mechanical keystroke click ('tck').
   * Subtle, short (12-18ms), non-fatiguing, with slight pitch/gain randomization.
   */
  public playKeyClick() {
    if (this.isMuted) return;
    const now = Date.now();
    // Throttle fast typing to prevent acoustic fatigue
    if (now - this.lastKeyTime < 18) return;
    this.lastKeyTime = now;

    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      // Slight subtle randomization for organic feel
      const freqRand = (Math.random() - 0.5) * 180; // +/- 90Hz
      const gainRand = 1 + (Math.random() - 0.5) * 0.2; // +/- 10%
      const baseFreq = 1250 + freqRand;

      // Layer 1: Filtered Noise Transient Snap (12ms)
      if (this.noiseBuffer) {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq, audioTime);
        filter.Q.setValueAtTime(4.2, audioTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.028 * gainRand, audioTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.014);

        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noiseSource.start(audioTime);
        noiseSource.stop(audioTime + 0.014);
      }

      // Layer 2: Subtle bottom-out body thud (180Hz -> 75Hz)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thud.type = 'sine';
      thud.frequency.setValueAtTime(220 + freqRand * 0.2, audioTime);
      thud.frequency.exponentialRampToValueAtTime(75, audioTime + 0.016);

      thudGain.gain.setValueAtTime(0.022 * gainRand, audioTime);
      thudGain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.016);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);

      thud.start(audioTime);
      thud.stop(audioTime + 0.016);
    } catch {}
  }

  /**
   * Space key click ('tok').
   * Slightly deeper, larger switch body sound.
   */
  public playSpaceClick() {
    if (this.isMuted) return;
    const now = Date.now();
    if (now - this.lastKeyTime < 18) return;
    this.lastKeyTime = now;

    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;

      // Deep thud
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thud.type = 'sine';
      thud.frequency.setValueAtTime(170, audioTime);
      thud.frequency.exponentialRampToValueAtTime(55, audioTime + 0.024);

      thudGain.gain.setValueAtTime(0.035, audioTime);
      thudGain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.024);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);

      thud.start(audioTime);
      thud.stop(audioTime + 0.024);

      // Muted snap
      if (this.noiseBuffer) {
        const noise = ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, audioTime);
        filter.Q.setValueAtTime(3.0, audioTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.025, audioTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.018);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(audioTime);
        noise.stop(audioTime + 0.018);
      }
    } catch {}
  }

  /**
   * Backspace key click ('tck' release snap).
   */
  public playBackspaceClick() {
    if (this.isMuted) return;
    const now = Date.now();
    if (now - this.lastKeyTime < 18) return;
    this.lastKeyTime = now;

    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, audioTime);
      osc.frequency.exponentialRampToValueAtTime(95, audioTime + 0.016);

      gain.gain.setValueAtTime(0.026, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.016);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.016);
    } catch {}
  }

  /**
   * Enter / Command submission click ('thk').
   * Deeper mechanical confirmation sound (40-60ms).
   */
  public playEnterClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;

      // Low mechanical thud (160Hz -> 48Hz)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thud.type = 'sine';
      thud.frequency.setValueAtTime(160, audioTime);
      thud.frequency.exponentialRampToValueAtTime(48, audioTime + 0.045);

      thudGain.gain.setValueAtTime(0.04, audioTime);
      thudGain.gain.exponentialRampToValueAtTime(0.0008, audioTime + 0.045);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);

      thud.start(audioTime);
      thud.stop(audioTime + 0.045);

      // Relay snap
      if (this.noiseBuffer) {
        const noise = ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, audioTime);
        filter.Q.setValueAtTime(2.8, audioTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.03, audioTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.025);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(audioTime);
        noise.stop(audioTime + 0.025);
      }
    } catch {}
  }

  /**
   * Successful command feedback ('tik' / soft analog synth blip, 70-110ms).
   */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, audioTime);
      osc.frequency.exponentialRampToValueAtTime(720, audioTime + 0.07);

      gain.gain.setValueAtTime(0.025, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.08);
    } catch {}
  }

  /**
   * Unknown command / Error feedback ('duk' / soft low blip, 50-80ms).
   */
  public playError() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, audioTime);
      osc.frequency.exponentialRampToValueAtTime(75, audioTime + 0.055);

      gain.gain.setValueAtTime(0.035, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0008, audioTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.06);
    } catch {}
  }

  /**
   * Autocomplete Tab sound ('tip').
   */
  public playTab(matched: boolean = true) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = matched ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(matched ? 760 : 440, audioTime);
      osc.frequency.exponentialRampToValueAtTime(matched ? 1120 : 280, audioTime + 0.028);

      gain.gain.setValueAtTime(0.02, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.03);
    } catch {}
  }

  /**
   * Command history navigation tick (Arrow Up / Arrow Down).
   */
  public playHistoryTick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, audioTime);
      osc.frequency.exponentialRampToValueAtTime(280, audioTime + 0.012);

      gain.gain.setValueAtTime(0.016, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.012);
    } catch {}
  }

  /**
   * CLI Open startup sound ('thm', 120-160ms).
   * Soft mechanical activation pulse.
   */
  public playOpen() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, audioTime);
      osc.frequency.exponentialRampToValueAtTime(240, audioTime + 0.09);

      gain.gain.setValueAtTime(0.025, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.11);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.11);
    } catch {}
  }

  /**
   * CLI Close deactivation sound (60-90ms).
   */
  public playClose() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const audioTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioTime + 0.06);

      gain.gain.setValueAtTime(0.02, audioTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, audioTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(audioTime);
      osc.stop(audioTime + 0.07);
    } catch {}
  }
}

export const cliSounds = new CliSoundEngine();
