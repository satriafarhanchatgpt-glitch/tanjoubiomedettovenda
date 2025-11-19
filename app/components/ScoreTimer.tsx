"use client";

import { motion } from "framer-motion";

type ScoreTimerProps = {
  score: number;
  timeLeft: number;
};

export function ScoreTimer({ score, timeLeft }: ScoreTimerProps) {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-40 flex w-full justify-between px-5 py-4 text-xs uppercase tracking-[0.35em] text-aki-ink/80 sm:text-sm">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {String(timeLeft).padStart(2, "0")}s
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {score.toString().padStart(3, "0")} pt
      </motion.span>
    </div>
  );
}

