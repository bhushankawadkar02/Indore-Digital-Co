"use client";

import { motion, useReducedMotion } from "motion/react";
import { cinematicEase } from "@/lib/animations/variants";
import { AGENCY_CONFIG } from "@/data/agency";

/**
 * Client Component: Category badge and narrative paragraph.
 * Colors:
 * - Badge dot: Electric Blue (#2878F8)
 * - Badge border: Dark Grey (#282B30)
 * - Badge bg: Secondary Dark (#101114)
 * - Narrative text: Muted Blue-Grey (#989FA8)
 */
export function HeroTopBadge() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101114] border border-[#282B30] text-xs font-mono tracking-wider uppercase text-[#989FA8] select-none mb-6"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] shadow-[0_0_8px_#2878F8]" />
      <span className="text-white font-medium">360° Creative & Digital Agency</span>
      <span className="text-[#282B30]">/</span>
      <span className="text-[#989FA8]">Indore, India</span>
    </motion.div>
  );
}

export function HeroNarrative() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.p
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.85, ease: cinematicEase }}
      className="max-w-2xl text-base sm:text-lg md:text-xl text-[#989FA8] font-normal leading-relaxed tracking-normal"
    >
      {AGENCY_CONFIG.subtext}
    </motion.p>
  );
}
