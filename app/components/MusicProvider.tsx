"use client";

import { BackgroundMusic } from "./BackgroundMusic";

type MusicProviderProps = {
  children: React.ReactNode;
};

export function MusicProvider({ children }: MusicProviderProps) {
  return (
    <>
      <BackgroundMusic
        src="/music/ambient-autumn.mp3"
        volume={0.25}
      />
      {children}
    </>
  );
}

