"use client";

import { motion } from "framer-motion";
import { memo } from "react";

export type LeafDatum = {
  id: string;
  x: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
  hue: number;
  rare: boolean;
};

type LeafProps = {
  leaf: LeafDatum;
  onCollect: (leaf: LeafDatum) => void;
};

const paths = [
  // Classic 5-lobed momiji (Japanese maple leaf) - stem at top, 5 pointed lobes
  "M50 2 L50 20 L60 35 L75 40 L68 55 L72 80 L50 65 L28 80 L32 55 L25 40 L40 35 L50 20 L50 2 Z",
  // Golden rare leaf - refined 5-lobed shape
  "M50 1 L50 18 L58 32 L72 37 L66 51 L70 77 L50 63 L30 77 L34 51 L28 37 L42 32 L50 18 L50 1 Z",
];

export const Leaf = memo(({ leaf, onCollect }: LeafProps) => {
  const sparkleId = `${leaf.id}-sparkle`;
  return (
    <motion.button
      aria-label={leaf.rare ? "kin iro no leaf" : "momiji leaf"}
      className="pointer-events-auto absolute origin-center rounded-full border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aki-ginkgo"
      onClick={() => onCollect(leaf)}
      style={{
        left: `${leaf.x}%`,
        top: "-10%",
      }}
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["-10%", "110%"],
        x: [`${leaf.x}%`, `calc(${leaf.x}% + ${leaf.drift}vw)`],
        rotate: leaf.drift * 2,
      }}
      transition={{
        duration: leaf.duration,
        ease: [0.42, 0, 0.58, 1],
        delay: leaf.delay,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={leaf.size}
        height={leaf.size}
        className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient
            id={`${leaf.id}-gradient`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={`hsl(${leaf.hue},70%,70%)`} />
            <stop
              offset="100%"
              stopColor={
                leaf.rare
                  ? "hsl(48, 92%, 76%)"
                  : `hsl(${leaf.hue - 20},65%,45%)`
              }
            />
          </linearGradient>
          <radialGradient id={sparkleId}>
            <stop offset="0%" stopColor="#fff6c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f5d547" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d={paths[leaf.rare ? 1 : 0]}
          fill={`url(#${leaf.id}-gradient)`}
          opacity={leaf.rare ? 0.95 : 0.85}
          stroke={leaf.rare ? "#fdf0b2" : "#8a2c0a"}
          strokeWidth={leaf.rare ? 0.8 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {leaf.rare && (
          <circle
            cx="50"
            cy="50"
            r="20"
            fill={`url(#${sparkleId})`}
            opacity="0.6"
          />
        )}
      </svg>
    </motion.button>
  );
});

Leaf.displayName = "Leaf";

