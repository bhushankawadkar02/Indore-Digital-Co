import type { Variants, Transition } from "motion/react";

/**
 * Standard cubic-bezier easing curve for cinematic agency motion.
 * Matches iOS / UIKit fluid deceleration curves.
 */
export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.6,
};

/**
 * Container variant to orchestrate staggered children entrance
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0.2
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Split word / headline reveal variant using clip-path masking
 * (Sliding from bottom behind overflow-hidden container)
 */
export const textMaskReveal: Variants = {
  initial: {
    y: "115%",
    opacity: 0,
    rotateZ: 2,
  },
  animate: {
    y: "0%",
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 1.0,
      ease: cinematicEase,
    },
  },
};

/**
 * Subtle fade-up variant for supporting copy and badges
 */
export const fadeUpVariant: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    },
  },
};

/**
 * Ambient glow scale-in variant
 */
export const ambientGlowVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.85,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: cinematicEase,
    },
  },
};
