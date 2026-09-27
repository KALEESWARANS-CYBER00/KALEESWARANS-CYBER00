'use client';

import { ReactNode, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import { playAudioOnInteraction } from '@/lib/audio';

export const requestFullscreenMode = () => {
  if (typeof document === 'undefined') return;

  const doc = document as any;
  const isFs =
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement;

  if (isFs) return;

  const targetEl = doc.documentElement || doc.body;
  if (!targetEl) return;

  const req =
    targetEl.requestFullscreen ||
    targetEl.webkitRequestFullscreen ||
    targetEl.webkitRequestFullScreen ||
    targetEl.mozRequestFullScreen ||
    targetEl.msRequestFullscreen ||
    doc.body?.requestFullscreen ||
    doc.body?.webkitRequestFullscreen;

  if (req) {
    try {
      const p = req.call(targetEl);
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Handled silently if browser activation token was not satisfied
        });
      }
    } catch {
      // Handled silently
    }
  }
};

export default function LoadingWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    let activated = false;

    // Auto-attempt playback at page load
    playAudioOnInteraction();

    const handleGesture = () => {
      playAudioOnInteraction();
      if (activated) return;
      requestFullscreenMode();
    };

    // When fullscreen successfully engages, detach global listeners
    const onFsChange = () => {
      const doc = document as any;
      const isFs =
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement;

      if (isFs) {
        activated = true;
        removeListeners();
      }
    };

    const listeners: Array<{
      target: EventTarget;
      type: string;
      handler: EventListenerOrEventListenerObject;
      options?: AddEventListenerOptions | boolean;
    }> = [
      { target: window, type: 'scroll', handler: handleGesture, options: { passive: true } },
      { target: document, type: 'scroll', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'wheel', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'touchstart', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'touchmove', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'touchend', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'pointerdown', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'pointerup', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'click', handler: handleGesture, options: { passive: true } },
      { target: window, type: 'keydown', handler: handleGesture, options: { passive: true } },
    ];

    const addListeners = () => {
      listeners.forEach(({ target, type, handler, options }) => {
        target.addEventListener(type, handler, options);
      });
      document.addEventListener('fullscreenchange', onFsChange);
      document.addEventListener('webkitfullscreenchange', onFsChange);
      document.addEventListener('mozfullscreenchange', onFsChange);
      document.addEventListener('MSFullscreenChange', onFsChange);
    };

    const removeListeners = () => {
      listeners.forEach(({ target, type, handler, options }) => {
        target.removeEventListener(type, handler, options);
      });
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
      document.removeEventListener('mozfullscreenchange', onFsChange);
      document.removeEventListener('MSFullscreenChange', onFsChange);
    };

    // Attempt automatic fullscreen on initial mount (for PWAs, webviews, and permissive browsers)
    requestFullscreenMode();

    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  return (
    <>
      <SplashScreen />
      {children}
    </>
  );
}
