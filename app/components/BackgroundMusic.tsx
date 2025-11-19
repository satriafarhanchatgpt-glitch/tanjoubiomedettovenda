"use client";

import { useEffect } from "react";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";

type BackgroundMusicProps = {
  src?: string;
  volume?: number;
};

export function BackgroundMusic({
  src = "/music/ambient-autumn.mp3",
  volume = 0.25,
}: BackgroundMusicProps) {
  const { play, isLoaded } = useBackgroundMusic({
    src,
    volume,
    loop: true,
    autoplay: false,
  });

  useEffect(() => {
    if (!isLoaded || !src) return;

    const handleFirstInteraction = () => {
      play().catch(() => {
        // Audio file not found or play failed - existing soundscape will continue
      });
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isLoaded, play, src]);

  return null;
}

