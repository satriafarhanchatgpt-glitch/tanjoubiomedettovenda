"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type FirefliesProps = {
  count?: number;
  color?: string;
  className?: string;
};

export function Fireflies({
  count = 16,
  color = "#f7f5c9",
  className = "",
}: FirefliesProps) {
  const [fireflies, setFireflies] = useState<
    { id: string; x: number; y: number; delay: number; duration: number; scale: number }[]
  >([]);

  useEffect(() => {
    setFireflies(
      Array.from({ length: count }).map((_, index) => ({
        id: `hotaru-${index}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 4,
        scale: 0.5 + Math.random() * 0.8,
      }))
    );
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {fireflies.map((firefly) => (
        <motion.span
          key={firefly.id}
          className="absolute rounded-full blur-[0.5px]"
          style={{
            backgroundColor: color,
            width: `${firefly.scale * 6}px`,
            height: `${firefly.scale * 6}px`,
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            boxShadow: `0 0 18px ${color}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-6, -20, -6],
            x: [0, 1.5, -1.5, 0],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: firefly.delay,
          }}
        />
      ))}
    </div>
  );
}

