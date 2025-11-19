"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type FirefliesProps = {
  count?: number;
  color?: string;
  className?: string;
};

type Firefly = {
  id: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  scale: number;
};

function generateFireflies(count: number): Firefly[] {
  return Array.from({ length: count }).map((_, index) => ({
    id: `hotaru-${index}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 4,
    scale: 0.5 + Math.random() * 0.8,
  }));
}

export function Fireflies({
  count = 16,
  color = "#f7f5c9",
  className = "",
}: FirefliesProps) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    setFireflies(generateFireflies(count));
  }, [count]);

  if (fireflies.length === 0) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}
      aria-hidden
      style={{ zIndex: 5 }}
    >
      {fireflies.map((firefly) => (
        <motion.span
          key={firefly.id}
          className="absolute rounded-full blur-[0.5px] z-10"
          style={{
            backgroundColor: color,
            width: `${Math.max(6, firefly.scale * 10)}px`,
            height: `${Math.max(6, firefly.scale * 10)}px`,
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            boxShadow: `0 0 ${Math.max(15, firefly.scale * 25)}px ${color}`,
          }}
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.4, 1, 0.4],
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

