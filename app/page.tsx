"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Background } from "./components/Background";
import { Fireflies } from "./components/Fireflies";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120d1c] text-aki-ink">
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 pb-16 pt-20 sm:px-10">
        <section className="flex w-full max-w-2xl flex-1 flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <p className="text-lg font-medium text-aki-ink">秋の贈り物</p>
            <p className="text-xs text-aki-mist/70">aki no okurimono</p>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-poetic leading-tight text-aki-ink sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Momiji no Toki
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base text-aki-mist/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6 }}
          >
            A gentle Kyoto-evening tribute. Collect drifting momiji, listen to
            furin wind, and reveal a birthday scroll woven with wishful light.
          </motion.p>
          <motion.div
            className="mt-32 inline-flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/game"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-aki-maple via-aki-persimmon to-aki-ginkgo px-12 py-3 font-poetic text-lg uppercase tracking-[0.3em] text-[#2a0f0a] shadow-[0_15px_25px_rgba(186,45,11,0.45)] transition-all duration-300 active:scale-95 active:from-aki-persimmon active:via-aki-ginkgo active:to-aki-maple"
            >
              <motion.span
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="inline-block"
              >
                hajimeru · begin
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </Link>
          </motion.div>
        </section>
      </div>
      <Background variant="sunset">
        <Fireflies count={12} className="opacity-40" />
      </Background>
    </main>
  );
}
