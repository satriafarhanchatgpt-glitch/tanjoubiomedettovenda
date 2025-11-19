"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type LanternProps = {
  message: ReactNode;
  delay?: number;
  onReachSky?: () => void;
};

export function Lantern({
  message,
  delay = 0,
  onReachSky,
}: LanternProps) {
  return (
    <motion.div
      className="relative flex w-full justify-center py-8"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.8, ease: "easeOut" }}
    >
      <div className="relative flex flex-col items-center">
        <TopRing />
        <motion.div
          className="relative flex h-48 w-36 flex-col items-center justify-center rounded-[60px] border border-[#f6dea9]/40 bg-gradient-to-b from-[#f9e6bc] via-[#f7d38f] to-[#e9a25c] text-center font-poetic text-base text-[#5b3315] shadow-[0_0_40px_rgba(248,219,150,0.45)]"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: [0, 1, 0.95, 1], y: 0 }}
          transition={{
            delay,
            duration: 2.5,
            ease: "easeOut",
          }}
          onAnimationComplete={onReachSky}
        >
          {message}
          <motion.span
            className="absolute bottom-0 h-10 w-[2px] bg-gradient-to-b from-[#f4c989] to-transparent"
            style={{ transform: "translateY(100%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4] }}
            transition={{ delay: delay + 0.5, duration: 2, ease: "easeOut" }}
          />
        </motion.div>
        <BottomGlow delay={delay} />
      </div>
    </motion.div>
  );
}

function TopRing() {
  return (
    <div className="relative -mb-0.5 h-1.5 w-12 rounded-full bg-[#8b4b2d] shadow-[0_2px_6px_rgba(0,0,0,0.35)] z-10" />
  );
}

function BottomGlow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="relative -mt-12 h-24 w-24 rounded-full bg-[#f7d795]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: [0, 0.6, 0.3], scale: [0.9, 1.2, 1] }}
      transition={{ delay: delay + 0.8, duration: 2.5, ease: "easeOut" }}
      style={{ filter: "blur(30px)" }}
    />
  );
}

