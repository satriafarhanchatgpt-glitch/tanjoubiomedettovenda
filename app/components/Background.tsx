"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BackgroundVariant = "sunset" | "twilight" | "night";

const gradients: Record<BackgroundVariant, string> = {
  sunset:
    "from-[#f6c28b] via-[#c97c63] to-[#2e3352]",
  twilight:
    "from-[#2e3352] via-[#1f1c3a] to-[#0c0d1d]",
  night:
    "from-[#1d1d3b] via-[#0f0f1f] to-[#05050b]",
};

type BackgroundProps = {
  variant?: BackgroundVariant;
  children?: ReactNode;
  className?: string;
};

export function Background({
  variant = "sunset",
  children,
  className = "",
}: BackgroundProps) {
  return (
    <div
      className={`grain pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradients[variant]} transition-[background-image] duration-1000`}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff22,transparent_55%)]" />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-x-0 bottom-0 h-5/6 bg-gradient-to-t from-[#050306] via-[#120c19] to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-2/3">
          <div className="absolute bottom-12 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-[#0d0b16] blur-3xl opacity-70" />
          <MountainStrip />
          {(variant === "night" || variant === "twilight") && (
            <KyotoCityscape variant={variant} />
          )}
          <ToriiGate />
        </div>
      </motion.div>

      {children}
    </div>
  );
}

function MountainStrip() {
  const ridges = Array.from({ length: 6 });
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-4">
      {ridges.map((_, index) => (
        <motion.div
          key={index}
          className="h-3/5 rounded-[40%_40%_0_0] bg-gradient-to-t from-[#090610] via-[#120f1d] to-[#1f1f30]"
          style={{
            width: `${25 + index * 10}%`,
            opacity: 0.35 + index * 0.08,
            filter: "blur(0.5px)",
          }}
          initial={{ y: 80 - index * 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, delay: 0.3 + index * 0.1 }}
        />
      ))}
    </div>
  );
}

function ToriiGate() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 w-32 -translate-x-1/2 text-[#130d18]"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 0.9, scale: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.8 }}
    >
      <div className="mx-auto h-2 w-24 rounded-full bg-[#2a1e2c]" />
      <div className="mx-auto h-3 w-28 rounded-full bg-[#2a1e2c] -translate-y-1" />
      <div className="flex items-end justify-between px-2">
        <div className="h-12 w-2 rounded-full bg-[#2a1e2c]" />
        <div className="h-12 w-2 rounded-full bg-[#2a1e2c]" />
      </div>
      <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-[#2a1e2c]" />
      <LanternGlow />
    </motion.div>
  );
}

function LanternGlow() {
  const lanterns = [-36, 36];
  return (
    <>
      {lanterns.map((offset) => (
        <motion.span
          key={offset}
          className="absolute -bottom-6 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#f7d99d] to-[#c26f2d] blur-[1px]"
          style={{ transform: `translate(calc(-50% + ${offset}px), 0)` }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: offset < 0 ? 0.6 : 1.2,
          }}
        />
      ))}
    </>
  );
}

function KyotoCityscape({ variant }: { variant: BackgroundVariant }) {
  const buildings = [
    { left: "3%", width: "14%", height: "45%", windows: [20, 45, 70] },
    { left: "18%", width: "12%", height: "52%", windows: [25, 50, 75] },
    { left: "31%", width: "16%", height: "48%", windows: [15, 40, 65, 85] },
    { left: "48%", width: "13%", height: "55%", windows: [20, 50, 80] },
    { left: "62%", width: "15%", height: "50%", windows: [25, 55, 75] },
    { left: "78%", width: "12%", height: "43%", windows: [30, 60] },
    { left: "91%", width: "14%", height: "48%", windows: [20, 45, 70] },
  ];

  const isNight = variant === "night";

  return (
    <div className="absolute inset-x-0 bottom-0 h-1/2 z-20">
      {buildings.map((building, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0"
          style={{
            left: building.left,
            width: building.width,
            height: building.height,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
        >
          <div className="relative h-full w-full">
            <div
              className={`absolute inset-0 rounded-t-[8%_8%_0_0] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] ${
                isNight
                  ? "bg-gradient-to-t from-[#0a0812] via-[#1a1525] to-[#2a2035]"
                  : "bg-gradient-to-t from-[#0f0d18] via-[#1f1a2d] to-[#2f2540]"
              }`}
            />
            <div
              className={`absolute top-0 h-1 w-full bg-gradient-to-r from-transparent ${
                isNight ? "via-[#3a2f45]" : "via-[#4a3f55]"
              } to-transparent opacity-60`}
            />
            {building.windows.map((windowTop, wIndex) => {
              const delay = (index * 0.3 + wIndex * 0.4) % 2;
              const duration = 2.5 + (index + wIndex) * 0.2;
              return (
                <motion.div
                  key={wIndex}
                  className="absolute left-1/2 h-3 w-2 -translate-x-1/2 rounded-sm bg-gradient-to-b from-[#f7d99d] via-[#e8a85c] to-[#c26f2d] shadow-[0_0_12px_rgba(247,217,157,0.9)]"
                  style={{ top: `${windowTop}%` }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
      <div
        className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t ${
          isNight ? "from-[#1a1525]/60" : "from-[#2a1f35]/50"
        } to-transparent`}
      />
    </div>
  );
}

