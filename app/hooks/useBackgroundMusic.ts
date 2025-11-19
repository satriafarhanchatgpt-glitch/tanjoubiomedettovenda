"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundMusicOptions = {
  src?: string;
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
};

export function useBackgroundMusic({
  src,
  volume = 0.3,
  loop = true,
  autoplay = false,
}: BackgroundMusicOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audio.preload = "auto";

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (autoplay) {
        audio.play().catch(() => {
          // Autoplay blocked, will need user interaction
        });
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, [src, volume, loop, autoplay]);

  const play = async () => {
    try {
      await audioRef.current?.play();
    } catch {
      // Play failed, likely needs user interaction
    }
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  return {
    play,
    pause,
    setVolume,
    isPlaying,
    isLoaded,
  };
}

