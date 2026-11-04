"use client";

import { motion } from "motion/react";
import { ambientGlowVariant } from "@/lib/animations/variants";

/**
 * Client Component: Electric Blue ambient background visuals, particle glows, and subtle architectural grid.
 * Strict adherence to Indore Digital Co color system:
 * - Dominant background: #050608
 * - Electric Blue ambient blooms (#2878F8)
 * - Zero purple, green, or orange
 */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 bg-[#050608]"
    >
      {/* 1. Electric Blue radial bloom centered behind the primary headline */}
      <motion.div
        variants={ambientGlowVariant}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[900px] h-[340px] sm:h-[600px] lg:h-[700px] rounded-full opacity-45 blur-[100px] sm:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(40, 120, 248, 0.22) 0%, rgba(40, 120, 248, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* 2. Secondary soft electric blue glow behind the showcase card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.3 }}
        className="absolute top-1/2 right-10 sm:right-24 w-[320px] sm:w-[560px] h-[320px] sm:h-[560px] rounded-full blur-[110px] sm:blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(40, 120, 248, 0.24) 0%, rgba(16, 17, 20, 0.08) 55%, transparent 75%)",
        }}
      />

      {/* 3. Subtle architectural grid lines with dark border hue (#282B30) */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `linear-gradient(rgba(40, 120, 248, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40, 120, 248, 0.35) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* 4. Subtle floating electric blue accent with smooth continuous breathing */}
      <motion.div
        animate={{
          y: [-14, 14, -14],
          x: [-8, 8, -8],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-[18%] w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-[#2878F8]/[0.08] blur-3xl"
      />

      {/* 5. Lower left floating ambient aura */}
      <motion.div
        animate={{
          y: [12, -12, 12],
          x: [6, -6, 6],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-16 left-[10%] w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-[#2878F8]/[0.06] blur-3xl"
      />
    </div>
  );
}