"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * Client Component: Interactive button primitive adhering to Indore Digital Co color system.
 * - Primary: Electric Blue (#2878F8) bg with white text & hover #4590FF
 * - Secondary / Outline: Transparent bg with #282B30 border & white text
 * - White: High-contrast white bg with black text (for navigation CTA)
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  target,
  rel,
  icon,
  iconPosition = "right",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-300 relative overflow-hidden select-none cursor-pointer group";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 min-h-[38px] gap-1.5",
    md: "text-sm sm:text-base px-6 py-3 min-h-[48px] gap-2",
    lg: "text-base sm:text-lg px-8 py-4 min-h-[56px] gap-2.5",
  };

  const variantStyles = {
    // Primary: Electric Blue (#2878F8) with hover #4590FF and subtle blue glow
    primary:
      "bg-[#2878F8] text-white font-semibold hover:bg-[#4590FF] shadow-[0_0_24px_rgba(40,120,248,0.35)] hover:shadow-[0_0_32px_rgba(69,144,255,0.55)] border border-[#2878F8]/40",

    // Secondary / Outline: Transparent with subtle dark grey border (#282B30)
    secondary:
      "bg-[#101114] text-white border border-[#282B30] hover:border-[#2878F8]/60 hover:bg-[#101114]/80",

    outline:
      "bg-transparent text-white border border-[#282B30] hover:border-[#2878F8]/60 hover:bg-[#2878F8]/[0.08] backdrop-blur-sm",

    // White: Navigation CTA (White background, black text)
    white:
      "bg-white text-black font-semibold hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:bg-zinc-300",

    ghost: "text-[#989FA8] hover:text-white hover:bg-white/[0.05]",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const motionTransition = { type: "spring" as const, stiffness: 400, damping: 25 };

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={motionTransition}
        className="inline-block"
      >
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={motionTransition}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {content}
    </motion.button>
  );
}
