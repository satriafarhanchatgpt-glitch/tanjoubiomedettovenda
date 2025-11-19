"use client";

import { useCallback, useEffect, useRef } from "react";

type AmbientNodes = {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  intervals: number[];
};

export function useSoundscape() {
  const contextRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<AmbientNodes | null>(null);

  const stopAmbient = useCallback(() => {
    ambientRef.current?.oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // ignore
      }
    });
    ambientRef.current?.intervals.forEach((intervalId) =>
      clearInterval(intervalId)
    );
    ambientRef.current = null;
  }, []);

  const startAmbient = useCallback((ctx: AudioContext) => {
    stopAmbient();
    const master = ctx.createGain();
    master.gain.value = 0.03; // Much quieter master volume
    master.connect(ctx.destination);

    // Very quiet background pad
    const padOsc = ctx.createOscillator();
    padOsc.type = "sine";
    padOsc.frequency.setValueAtTime(220, ctx.currentTime);

    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.015, ctx.currentTime); // Much quieter
    padGain.connect(master);
    padOsc.connect(padGain);
    padOsc.start();

    // Chime sounds - multiple bell-like tones
    const playChime = (frequency: number, delay: number) => {
      const now = ctx.currentTime + delay;
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      
      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(frequency, now);
      
      chimeGain.gain.setValueAtTime(0, now);
      chimeGain.gain.linearRampToValueAtTime(0.02, now + 0.05); // Quiet chime
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      
      chimeOsc.connect(chimeGain);
      chimeGain.connect(master);
      chimeOsc.start(now);
      chimeOsc.stop(now + 2.5);
    };

    // Regular gentle chimes
    const chimes = window.setInterval(() => {
      const baseFreq = 523; // C5
      playChime(baseFreq, 0);
      playChime(baseFreq * 1.25, 0.1); // E5
      playChime(baseFreq * 1.5, 0.2); // G5
    }, 4500); // Less frequent, more spaced out

    // Occasional higher chimes
    const highChimes = window.setInterval(() => {
      const highFreq = 880; // A5
      playChime(highFreq, 0);
      playChime(highFreq * 1.2, 0.15);
    }, 7000);

    ambientRef.current = {
      oscillators: [padOsc],
      gains: [padGain],
      intervals: [chimes, highChimes],
    };
  }, [stopAmbient]);

  useEffect(() => {
    const unlock = () => {
      if (!contextRef.current) {
        contextRef.current = new AudioContext();
      }
      if (contextRef.current.state === "suspended") {
        contextRef.current.resume();
      }
      startAmbient(contextRef.current);
      window.removeEventListener("pointerdown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      stopAmbient();
      contextRef.current?.close();
    };
  }, [stopAmbient, startAmbient]);

  const playTap = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(360, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime); // Quieter tap
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, []);

  return { playTap };
}

