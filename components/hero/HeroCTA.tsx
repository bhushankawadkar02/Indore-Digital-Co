"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cinematicEase } from "@/lib/animations/variants";
import { AGENCY_CONFIG } from "@/data/agency";

/**
 * Client Component: Interactive CTA buttons & agency availability indicator.
 * Strict color compliance:
 * - Primary CTA: Electric Blue (#2878F8)
 * - Secondary CTA: Transparent with #282B30 border
 * - Availability badge: Electric Blue pulsing light (#2878F8), #101114 bg, #282B30 border
 */
export function HeroCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 24 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.95,
        ease: cinematicEase,
      }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2"
    >
      {/* Primary CTA (Electric Blue) */}
      <Button
        href="#work"
        variant="primary"
        size="lg"
        icon={<ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />}
        className="w-full sm:w-auto"
      >
        Explore Selected Work
      </Button>

      {/* Secondary CTA (Transparent with #282B30 border) */}
      <Button
        href="#contact"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        Initiate Project
      </Button>

      {/* Live Availability Badge (Electric Blue Pulsing Light) */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#101114] border border-[#282B30] text-xs text-[#989FA8] mt-2 sm:mt-0 sm:ml-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2878F8] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2878F8]" />
        </span>
        <span className="font-mono tracking-tight text-[#989FA8]">
          {AGENCY_CONFIG.availabilityStatus}
        </span>
      </div>
    </motion.div>
  );
}
