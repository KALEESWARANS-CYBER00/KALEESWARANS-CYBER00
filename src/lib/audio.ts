'use client';

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private userMuted: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private initialized: boolean = false;
  private gestureListenersAttached: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = sessionStorage.getItem('audio_user_muted');
      if (storedMute === 'true') {
        this.userMuted = true;
      }
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      this.audio = new Audio('/beats.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.38;
      this.audio.preload = 'auto';
      this.audio.autoplay = true;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      // 1. Immediate attempt to play automatically on page load
      this.play(false);

      // 2. Attach pervasive global gesture unlockers for instant playback on first touch/scroll/click
      this.setupGestureUnlock();
    } catch {
      // Audio initialization fallback
    }
  }

  private setupGestureUnlock() {
    if (typeof window === 'undefined' || this.gestureListenersAttached) return;
    this.gestureListenersAttached = true;

    const unlock = () => {
      if (this.userMuted) {
        removeGestureListeners();
        return;
      }

      this.play(false).then(() => {
        if (this.isPlaying) {
          removeGestureListeners();
        }
      });
    };

    const events = [
      'pointerdown',
      'touchstart',
      'touchend',
      'mousedown',
      'mouseup',
      'click',
      'scroll',
      'wheel',
      'keydown',
    ];

    const removeGestureListeners = () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, unlock, { capture: true } as any);
        document.removeEventListener(ev, unlock, { capture: true } as any);
      });
    };

    events.forEach((ev) => {
      window.addEventListener(ev, unlock, { capture: true, passive: true });
      document.addEventListener(ev, unlock, { capture: true, passive: true });
    });
  }

  public play(force: boolean = false): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();
    if (!this.initialized) this.initAudio();
    if (!this.audio) return Promise.resolve();

    // If user explicitly chose to mute, do not auto-play unless forced (e.g. toggle button click)
    if (this.userMuted && !force) return Promise.resolve();

    if (force) {
      this.userMuted = false;
      try {
        sessionStorage.setItem('audio_user_muted', 'false');
      } catch {}
    }

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // Autoplay will be unlocked by the gesture listener on first touch/scroll
          this.isPlaying = false;
          this.notify();
        });
    }
    return Promise.resolve();
  }

  public pause(byUser: boolean = true) {
    if (!this.audio) return;
    if (byUser) {
      this.userMuted = true;
      try {
        sessionStorage.setItem('audio_user_muted', 'true');
      } catch {}
    }
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause(true);
      return false;
    } else {
      this.play(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(callback: (playing: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((callback) => {
      try {
        callback(this.isPlaying);
      } catch {}
    });
  }
}

export const audioManager = new AudioManager();

export const playAudioOnInteraction = () => {
  audioManager.play(false);
};
