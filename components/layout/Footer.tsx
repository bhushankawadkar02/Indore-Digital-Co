"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AGENCY_CONFIG } from "@/data/agency";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050608] border-t border-white/[0.06] pt-16 pb-12 select-none overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#2878F8]/[0.05] rounded-full blur-[140px] -z-10" />

      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Identity */}
          <div className="flex flex-col gap-2">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group"
            >
              <span className="w-8 h-8 rounded-lg bg-[#101114] border border-[#2878F8]/40 flex items-center justify-center font-mono text-sm text-[#2878F8] shadow-[0_0_15px_rgba(40,120,248,0.3)]">
                IDC
              </span>
              <span className="font-mono">{AGENCY_CONFIG.name}</span>
            </Link>
            <p className="text-xs font-mono text-[#989FA8] max-w-sm mt-1">
              {AGENCY_CONFIG.tagline} {AGENCY_CONFIG.subtext}
            </p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-[#989FA8]">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a
              href={AGENCY_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2878F8] transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={`https://wa.me/${AGENCY_CONFIG.socials.whatsapp.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white transition-all ml-auto md:ml-4"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#989FA8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2878F8] animate-pulse" />
            <span>
              Engineered with precision in {AGENCY_CONFIG.location} for global scale.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 {AGENCY_CONFIG.name}. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
