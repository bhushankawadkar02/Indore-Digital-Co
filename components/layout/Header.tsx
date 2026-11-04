"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cinematicEase } from "@/lib/animations/variants";
import { AGENCY_CONFIG } from "@/data/agency";

/**
 * Client Component: Professional sticky navigation header adhering to Indore Digital Co color system.
 * - Zero box outline
 * - Solid opaque background on scroll to prevent content bleed-through
 * - Seamless sticky behavior on scroll up/down
 * - Electric Blue highlights (#2878F8)
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth back-to-top handler for Home and Logo
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#home" || href === "#hero" || href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        history.pushState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: cinematicEase }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 outline-none ${
          scrolled
            ? "bg-[#050608]/98 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-b border-white/[0.06] py-3.5 sm:py-4"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5 group cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F8] rounded-full px-1"
              aria-label="Indore Digital Co Homepage"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-black text-xs sm:text-sm tracking-tighter group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                ID
              </div>
              <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                Indore Digital Co
                <span className="text-[#2878F8] font-mono text-sm ml-0.5">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links (No harsh outline) */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md"
              aria-label="Primary Navigation"
            >
              {AGENCY_CONFIG.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[#989FA8] hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <Button
                href="#contact"
                variant="white"
                size="sm"
                className="hidden sm:inline-flex text-xs font-semibold shadow-none border-none outline-none focus:outline-none"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Let&apos;s Talk
              </Button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-[#989FA8] hover:text-white hover:bg-white/10 transition-colors outline-none focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Fullscreen Mobile Curtain Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050608]/98 backdrop-blur-2xl flex flex-col justify-center px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
              <p className="text-xs font-mono uppercase tracking-widest text-[#989FA8]">
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {AGENCY_CONFIG.navigation.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="text-2xl font-semibold tracking-tight text-white hover:text-[#2878F8] transition-colors block py-2 border-b border-white/[0.08]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <Button
                  href="#contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Initiate Project
                </Button>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                  <span className="text-xs text-[#989FA8] font-mono">
                    {AGENCY_CONFIG.location}
                  </span>
                  <a
                    href={AGENCY_CONFIG.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2878F8] font-mono hover:underline flex items-center gap-1"
                  >
                    <span>{AGENCY_CONFIG.socials.instagram.handle}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
