"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cinematicEase } from "@/lib/animations/variants";

/**
 * BrandIntroLoader Component
 *
 * Displays a fullscreen intro sequence on initial site load:
 * 1. Center brand mark & typography reveal with electric blue pulse
 * 2. High-precision percentage counter (00 -> 100)
 * 3. Cinematic curtain lift / iris exit revealing the website
 */
export function BrandIntroLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, skip intro quickly
    if (shouldReduceMotion) {
      const quickTimer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(quickTimer);
    }

    // Lock page scroll during intro
    document.body.style.overflow = "hidden";

    // Progress counter simulation (0 -> 100% over ~1.6s)
    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Small delay at 100% before exit transition
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 320);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="brand-intro-overlay"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.95,
              ease: [0.77, 0, 0.175, 1], // Smooth cinematic curtain wipe
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608] select-none overflow-hidden"
          aria-live="polite"
          aria-label="Loading Indore Digital Co"
        >
          {/* Subtle architectural grid texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(40, 120, 248, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(40, 120, 248, 0.4) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Electric Blue ambient bloom pulsating behind the logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.8, 1.25, 1],
              opacity: [0.2, 0.55, 0.35],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(40, 120, 248, 0.4) 0%, rgba(40, 120, 248, 0.12) 45%, transparent 70%)",
            }}
          />

          {/* Center Content Container */}
          <div className="relative flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Animated Logo Monogram Badge */}
            <motion.div
              initial={{ scale: 0.65, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.9,
                ease: cinematicEase,
              }}
              className="relative mb-6"
            >
              {/* Outer rotating neon halo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-3 rounded-2xl border border-dashed border-[#2878F8]/40"
              />

              {/* Main Badge */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#101114] border border-[#2878F8]/60 flex items-center justify-center shadow-[0_0_35px_rgba(40,120,248,0.35)]">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tighter text-white">
                  ID
                </span>
                {/* Electric Blue glowing accent corner */}
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2878F8] shadow-[0_0_8px_#2878F8]" />
              </div>
            </motion.div>

            {/* Brand Title with Masked Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.25,
                  ease: cinematicEase,
                }}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5"
              >
                <span>Indore Digital Co</span>
                <span className="text-[#2878F8] font-mono">.</span>
              </motion.h1>
            </div>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: cinematicEase }}
              className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#989FA8] mb-8"
            >
              Brand & Digital Experience
            </motion.p>

            {/* Progress Bar & Numeric Telemetry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="w-48 sm:w-56 flex flex-col gap-2.5"
            >
              {/* Progress track */}
              <div className="relative h-1 w-full bg-[#282B30] rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#2878F8] to-white rounded-full shadow-[0_0_10px_#2878F8]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#989FA8]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] animate-pulse" />
                  INITIALIZING
                </span>
                <span className="font-semibold text-white tracking-wider">
                  {progress.toString().padStart(2, "0")}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom subtle agency watermark */}
          <div className="absolute bottom-6 sm:bottom-8 font-mono text-[10px] text-[#989FA8]/60 uppercase tracking-widest">
            INDORE, MP, INDIA // 2026 EDITION
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}