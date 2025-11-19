"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Background } from "../components/Background";
import { Fireflies } from "../components/Fireflies";
import { ScrollPoem } from "../components/ScrollPoem";
import { Lantern } from "../components/Lantern";

const POEM_LINES = [
  { jp: "風が運ぶ君の朝、", romaji: "Kaze ga hakobu kimi no asa,", en: "The wind carries your morning," },
  { jp: "紅葉の音が揺れる夜、", romaji: "momiji no oto ga yureru yoru,", en: "the night where maple leaves rustle," },
  { jp: "この秋の季節に、", romaji: "kono aki no kisetsu ni,", en: "in this autumn season," },
  { jp: "僕は祈る。", romaji: "boku wa inoru.", en: "I pray." },
  { jp: "誕生日おめでとう。", romaji: "Tanjoubi omedetou.", en: "Happy birthday." },
  { jp: "風が運ぶ君の朝、", romaji: "Kaze ga hakobu kimi no asa,", en: "The wind carries your morning," },
  { jp: "紅葉の音が揺れる夜、", romaji: "momiji no oto ga yureru yoru,", en: "the night where maple leaves rustle," },
  { jp: "この秋の季節に、", romaji: "kono aki no kisetsu ni,", en: "in this autumn season," },
  { jp: "僕は祈る。", romaji: "boku wa inoru.", en: "I pray." },
  { jp: "誕生日おめでとう。", romaji: "Tanjoubi omedetou.", en: "Happy birthday." },
  { en: "May your days flow soft as warm light,", 
    jp: "温かい光のように、君の日々がやわらかく流れますように。",
    romaji: "Atatakai hikari no you ni, kimi no hibi ga yawarakaku nagaremasu you ni."
  }, 
  {
    en: "and your steps be guided by autumn's lantern light.",
    jp: "秋の灯火に、君の歩みが導かれますように。",
    romaji: "Aki no tomoshibi ni, kimi no ayumi ga michibikaremasu you ni."
  }  
  
];

export default function EndingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const score = Number(params.get("score") ?? 0);
  const [showScroll, setShowScroll] = useState(false);
  const [showLantern, setShowLantern] = useState(false);

  useEffect(() => {
    const intro = setTimeout(() => setShowScroll(true), 800);
    return () => clearTimeout(intro);
  }, []);


  const blessing = useMemo(
    () =>
      score > 40
        ? "Your palms are glowing with lantern light."
        : "You gathered light at a gentle, mindful pace.",
    [score]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07060f] text-aki-ink">
      <section className="relative z-20 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-between px-5 pb-16 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="mt-3 text-3xl font-poetic">
            light rests in your hands
          </h2>
          <p className="mt-4 text-sm text-aki-mist/80">
            {blessing} {score.toString().padStart(2, "0")} petals of light were
            collected tonight.
          </p>
        </motion.div>

        <div className="w-full flex-1 py-10">
          <AnimatePresence mode="wait">
            {showLantern ? (
              <motion.div
                key="lantern"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center gap-6"
              >
                <Lantern
                  message={
                    <p className="px-3 text-sm leading-relaxed">
                      For you, on this quiet night of falling leaves.
                    </p>
                  }
                />
                <div className="text-xs uppercase tracking-[0.4em] text-aki-mist/60">
                  guided by hotaru glow
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScrollPoem
                  poemLines={POEM_LINES}
                  visible={showScroll}
                  onComplete={() => setShowLantern(true)}
                  hold={7}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4 text-sm font-poetic uppercase tracking-[0.3em] sm:flex-row">
          <button
            onClick={() => router.push("/game")}
            className="rounded-full border border-white/30 px-8 py-3 text-aki-ink/80 transition hover:border-white hover:text-white active:bg-white/15 active:text-white active:scale-95"
          >
            play again
          </button>
        </div>
      </section>
      <Background variant={showLantern ? "night" : "twilight"}>
        <Fireflies count={30} color="#f7f2c9" />
      </Background>
    </main>
  );
}

