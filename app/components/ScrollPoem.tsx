"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

type PoemLine = {
  jp?: string;
  romaji?: string;
  en: string;
};

type ScrollPoemProps = {
  poemLines: PoemLine[];
  visible: boolean;
  onComplete?: () => void;
  hold?: number;
};

export function ScrollPoem({
  poemLines,
  visible,
  onComplete,
  hold = 6,
}: ScrollPoemProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onComplete?.();
    }, (hold + 5) * 1000);
    return () => clearTimeout(timer);
  }, [visible, hold, onComplete]);

  return (
    <div className="relative flex w-full justify-center">
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.96,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-4 w-4 rounded-full bg-gradient-to-b from-[#b07b2f] to-[#7a4a18] shadow-inner" />
        <div className="absolute inset-y-0 right-4 w-4 rounded-full bg-gradient-to-b from-[#b07b2f] to-[#7a4a18] shadow-inner" />
        <motion.div
          className="relative mx-8 my-6 rounded-2xl bg-[#fdf6e2] p-8 text-center font-poetic leading-relaxed text-[#4a2f1a] shadow-[inset_0_1px_6px_rgba(0,0,0,0.2)] sm:p-10"
          initial={{ height: 0 }}
          animate={{
            height: visible ? "auto" : 0,
          }}
          transition={{
            duration: 2.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.35, delayChildren: 1.2 },
              },
            }}
          >
            {poemLines.map((line, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="py-2"
              >
                {line.jp && (
                  <p className="text-xl font-medium sm:text-2xl">{line.jp}</p>
                )}
                {line.romaji && (
                  <p className="mt-1 text-sm text-[#6a4b3b]/80 sm:text-base">
                    {line.romaji}
                  </p>
                )}
                <p className="mt-1.5 text-sm text-[#4a2f1a]/90 sm:text-base">
                  {line.en}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

