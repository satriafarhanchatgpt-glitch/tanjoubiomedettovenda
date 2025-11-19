"use client";

import { useEffect, useRef } from "react";

type BackgroundMusicProps = {
  src?: string;
  volume?: number;
};

export function BackgroundMusic({
  src = "/music/ambient-autumn.mp3",
  volume = 0.25,
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const srcRef = useRef(src);
  const volumeRef = useRef(volume);

  // Keep refs updated
  useEffect(() => {
    srcRef.current = src;
    volumeRef.current = volume;
  }, [src, volume]);

  useEffect(() => {
    if (!src) return;

    const handleFirstInteraction = async () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      try {
        // Create audio element in response to user interaction (required for iOS)
        const audio = new Audio(srcRef.current);
        audio.volume = volumeRef.current;
        audio.loop = true;
        audio.playsInline = true; // Critical for iOS
        audio.crossOrigin = "anonymous";

        // Play immediately within the user interaction context
        await audio.play();
        audioRef.current = audio;

        // Remove listeners after successful play
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
        window.removeEventListener("touchend", handleFirstInteraction);
      } catch (error) {
        // Play failed, reset flag so user can try again
        hasStartedRef.current = false;
      }
    };

    // Listen for various interaction types (iOS needs touchstart/touchend)
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("touchend", handleFirstInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("touchend", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [src]);

  return null;
}

