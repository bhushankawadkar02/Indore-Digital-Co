"use client";

import { motion, useReducedMotion } from "motion/react";
import { cinematicEase } from "@/lib/animations/variants";

interface HeroHeadlineProps {
  line1?: string;
  line2?: string;
}

/**
 * Client Component: Editorial split-word masked reveal.
 * Color system:
 * - Pure white (#FFFFFF) for primary authority
 * - Electric Blue (#2878F8) selectively for the climax word "growth."
 */
export function HeroHeadline({
  line1 = "We build brands.",
  line2 = "We drive growth.",
}: HeroHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();

  const wordsLine1 = line1.split(" ");
  const wordsLine2 = line2.split(" ");

  return (
    <h1 className="text-[clamp(2.2rem,7.5vw,7.5rem)] font-extrabold tracking-[-0.04em] leading-[1.02] sm:leading-[0.95] text-white">
      {/* Line 1: Pure White (#FFFFFF) */}
      <span className="block">
        {wordsLine1.map((word, index) => (
          <span
            key={`l1-${word}-${index}`}
            className="overflow-hidden inline-block mr-[0.25em] align-top pb-[0.08em]"
          >
            <motion.span
              className="inline-block text-white"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { y: "115%", opacity: 0, rotateZ: 1.5 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { y: "0%", opacity: 1, rotateZ: 0 }
              }
              transition={{
                duration: 1.05,
                delay: 0.35 + index * 0.09,
                ease: cinematicEase,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>

      {/* Line 2: White with Electric Blue highlight on "growth." */}
      <span className="block mt-1 sm:mt-2">
        {wordsLine2.map((word, index) => {
          const isHighlight = word.toLowerCase().includes("growth");
          return (
            <span
              key={`l2-${word}-${index}`}
              className="overflow-hidden inline-block mr-[0.25em] align-top pb-[0.08em]"
            >
              <motion.span
                className={`inline-block ${
                  isHighlight
                    ? "text-[#2878F8] drop-shadow-[0_0_40px_rgba(40,120,248,0.45)]"
                    : "text-white"
                }`}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { y: "115%", opacity: 0, rotateZ: 1.5 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { y: "0%", opacity: 1, rotateZ: 0 }
                }
                transition={{
                  duration: 1.05,
                  delay: 0.65 + index * 0.09,
                  ease: cinematicEase,
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}
