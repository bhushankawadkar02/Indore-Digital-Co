"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AGENCY_CONFIG } from "@/data/agency";
import { ArrowUpRight } from "lucide-react";

/**
 * Custom WhatsApp SVG Icon for crisp high-resolution rendering
 */
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
        stroke="#050608"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Floating WhatsApp Widget
 *
 * Minimal, theme-matched luxury dark button:
 * - Direct wa.me redirect with pre-filled inquiry message
 * - Pulsing green live beacon
 * - Non-intrusive hover tooltip on desktop
 * - Strict adherence to #050608 / #101114 obsidian theme
 */
export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const { whatsapp } = AGENCY_CONFIG.socials;

  const whatsappUrl = `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(
    whatsapp.defaultMessage
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-xl group-hover:bg-[#25D366]/35 transition-all duration-500 -z-10" />

        {/* Desktop Hover Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex flex-col items-end mr-3 pointer-events-none"
            >
              <div className="px-3.5 py-2 rounded-xl bg-[#101114]/95 backdrop-blur-xl border border-[#282B30] shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-[11px] font-mono font-semibold text-white tracking-wide">
                    Connect on WhatsApp
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-[#25D366]" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#989FA8]">
                    {whatsapp.statusText}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with Indore Digital Co on WhatsApp"
          className="relative flex items-center gap-2.5 p-3.5 sm:p-4 rounded-full bg-[#101114]/95 text-white border border-[#25D366]/50 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(37,211,102,0.22)] hover:border-[#25D366] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F8]"
        >
          {/* Animated Green Pulse Ping */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border-2 border-[#101114]" />
          </span>

          {/* WhatsApp Icon */}
          <div className="w-6 h-6 text-[#25D366] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon className="w-6 h-6 fill-[#25D366]" />
          </div>

          {/* Inline Label on mobile */}
          <span className="text-xs font-mono font-medium text-white tracking-wide pr-1 sm:hidden">
            WhatsApp
          </span>
        </a>
      </motion.div>
    </div>
  );
}
