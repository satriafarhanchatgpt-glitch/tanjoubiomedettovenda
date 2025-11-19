"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Background } from "../components/Background";
import { Fireflies } from "../components/Fireflies";
import { Leaf, type LeafDatum } from "../components/Leaf";
import { ScoreTimer } from "../components/ScoreTimer";
import { useSoundscape } from "../hooks/useSoundscape";

type ActiveLeaf = LeafDatum & { createdAt: number; lifespan: number };
type Spark = { id: string; x: number; y: number; value: number };

const GAME_DURATION = 30;

export default function GamePage() {
  const router = useRouter();
  const [leaves, setLeaves] = useState<ActiveLeaf[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [sparkles, setSparkles] = useState<Spark[]>([]);
  const { playTap } = useSoundscape();
  const scoreRef = useRef(0);
  const ids = useRef(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const createLeaf = useCallback((): ActiveLeaf => {
    ids.current += 1;
    const rare = Math.random() < 0.15;
    const duration = 5 + Math.random() * 3;
    return {
      id: `leaf-${ids.current}`,
      x: 10 + Math.random() * 80,
      delay: 0,
      duration,
      drift: Math.random() * 4 - 2,
      size: rare ? 70 : 54,
      hue: rare ? 48 : 15 + Math.random() * 30,
      rare,
      createdAt: Date.now(),
      lifespan: duration * 1000,
    };
  }, []);

  useEffect(() => {
    setLeaves(Array.from({ length: 8 }, createLeaf));
  }, [createLeaf]);

  useEffect(() => {
    if (!isPlaying) return;
    const spawnInterval = window.setInterval(() => {
      setLeaves((prev) => {
        if (prev.length >= 18) {
          return prev;
        }
        return [...prev, createLeaf()];
      });
    }, 1200);
    return () => clearInterval(spawnInterval);
  }, [createLeaf, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const cleanup = window.setInterval(
      () =>
        setLeaves((prev) =>
          prev.filter((leaf) => Date.now() - leaf.createdAt < leaf.lifespan)
        ),
      1000
    );
    return () => clearInterval(cleanup);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setTimeout(
            () => router.push(`/ending?score=${scoreRef.current}`),
            1600
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, router]);

  const handleCollect = useCallback(
    (leaf: ActiveLeaf) => {
      setLeaves((prev) => prev.filter((item) => item.id !== leaf.id));
      const value = leaf.rare ? 5 : 1;
      scoreRef.current += value;
      setScore(scoreRef.current);
      playTap();
      const sparkle: Spark = {
        id: `spark-${leaf.id}`,
        x: leaf.x,
        y: Math.random() * 40 + 20,
        value,
      };
      setSparkles((prev) => [...prev, sparkle]);
      setTimeout(
        () =>
          setSparkles((prev) =>
            prev.filter((spark) => spark.id !== sparkle.id)
          ),
        900
      );
    },
    [playTap]
  );

  const guidance = useMemo(
    () => ["tap softly", "gold leaf +5", "30s calm"],
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0f1c] text-aki-ink">
      <ScoreTimer score={score} timeLeft={timeLeft} />
      <div className="relative z-20 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-between px-5 pb-16 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="mt-3 text-3xl font-poetic">autumn breeze run</h2>
          <p className="mt-4 text-sm text-aki-mist/80">
            Tap drifting leaves to collect them.
          </p>
        </motion.div>

        <div className="relative flex w-full flex-1 items-center justify-center">
          <div className="absolute inset-0">
            {leaves.map((leaf) => (
              <Leaf key={leaf.id} leaf={leaf} onCollect={handleCollect} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0">
            {sparkles.map((spark) => (
              <Sparkle key={spark.id} spark={spark} />
            ))}
          </div>
          <Legend items={guidance} />
        </div>
      </div>

      <Background variant="twilight">
        <Fireflies count={20} color="#f7f3c5" />
      </Background>
    </main>
  );
}

function Sparkle({ spark }: { spark: Spark }) {
  return (
    <motion.div
      className="absolute text-sm font-poetic text-aki-ginkgo drop-shadow-[0_0_10px_rgba(245,213,71,0.8)]"
      style={{
        left: `${spark.x}%`,
        top: `${spark.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1.2, y: -10 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.9 }}
    >
      +{spark.value}
    </motion.div>
  );
}

function Legend({ items }: { items: string[] }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-4 text-[0.65rem] uppercase tracking-[0.4em] text-aki-mist/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1.2 }}
    >
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </motion.div>
  );
}


