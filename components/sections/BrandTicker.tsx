"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Palette,
  Sparkles,
  Printer,
  Share2,
  Code2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cinematicEase } from "@/lib/animations/variants";

/**
 * CLIENT DELIVERABLES & CORE SERVICES
 * 1. Digital Promotion
 * 2. Graphic Design
 * 3. Brand Promotion
 * 4. Printing Solutions
 * 5. Social Media Reach
 * 6. Web & App Development
 */
const SERVICES = [
  {
    id: "digital-promotion",
    number: "01",
    category: "PERFORMANCE ADS & ROI",
    title: "Targeted Digital Promotion & Paid Advertising",
    shortTitle: "Digital Promotion",
    description:
      "Hyper-targeted ad campaigns across Google, Meta, and high-conversion networks engineered to capture high-intent buyers, lower CPA, and rapidly scale customer acquisition.",
    tags: [
      "Google Ads (PPC)",
      "Meta Ads & Retargeting",
      "Lead Generation",
      "Performance Marketing",
      "Conversion Rate Optimization",
      "Funnel Tracking",
    ],
    metric: "High ROI & Conversions",
    icon: TrendingUp,
    gradient: "from-[#2878F8]/20 via-[#2878F8]/5 to-transparent",
  },
  {
    id: "graphic-design",
    number: "02",
    category: "VISUAL CRAFT & BRAND ASSETS",
    title: "Bespoke Graphic Design & Creative Direction",
    shortTitle: "Graphic Design",
    description:
      "Striking visual communication, high-converting social media creatives, corporate collateral, vector graphics, and packaging design crafted with obsessive aesthetic precision.",
    tags: [
      "Social Media Creatives",
      "Ad Creative Sets",
      "Packaging Design",
      "Vector Graphics",
      "Brand Guidelines",
      "Corporate Stationery",
    ],
    metric: "Pixel-Perfect Visuals",
    icon: Palette,
    gradient: "from-[#2878F8]/20 via-blue-500/5 to-transparent",
  },
  {
    id: "brand-promotion",
    number: "03",
    category: "STRATEGY & MARKET POSITIONING",
    title: "Strategic Brand Promotion & Authority Building",
    shortTitle: "Brand Promotion",
    description:
      "Elevating businesses into recognized market leaders through compelling brand storytelling, visual identity positioning, commercial launches, and cross-channel promotion.",
    tags: [
      "Brand Architecture",
      "Market Positioning",
      "Campaign Strategy",
      "Authority Building",
      "Brand Identity Systems",
      "PR & Media Activations",
    ],
    metric: "Unmistakable Presence",
    icon: Sparkles,
    gradient: "from-[#2878F8]/20 via-purple-500/5 to-transparent",
  },
  {
    id: "printing",
    number: "04",
    category: "COMMERCIAL & MERCHANDISE PRINT",
    title: "High-Grade Commercial & Merchandise Printing",
    shortTitle: "Printing Solutions",
    description:
      "Flawless physical print execution from premium corporate stationery and luxury product packaging to large-format outdoor flex, vinyl banners, and custom branded merchandise.",
    tags: [
      "Custom Packaging & Boxes",
      "Brochures & Catalogs",
      "Business Cards & Stationery",
      "Outdoor Flex & Vinyl Banners",
      "Promotional Merchandise",
      "Offset & Digital Print",
    ],
    metric: "High-Fidelity Color Output",
    icon: Printer,
    gradient: "from-[#2878F8]/20 via-cyan-500/5 to-transparent",
  },
  {
    id: "social-media-reach",
    number: "05",
    category: "VIRAL GROWTH & ENGAGEMENT",
    title: "Viral Social Media Reach & Organic Growth",
    shortTitle: "Social Media Reach",
    description:
      "Exploding brand visibility, follower acquisition, and community engagement across Instagram, YouTube, and LinkedIn through trend-setting short-form reels and strategic distribution.",
    tags: [
      "Viral Instagram Reels",
      "Audience Growth Strategy",
      "Community Engagement",
      "Influencer Outreach",
      "Content Calendar & Copy",
      "Trend Capitalization",
    ],
    metric: "Viral Scale & Retention",
    icon: Share2,
    gradient: "from-[#2878F8]/20 via-rose-500/5 to-transparent",
  },
  {
    id: "web-app-development",
    number: "06",
    category: "FULL-STACK DIGITAL TECH",
    title: "High-Performance Web & Mobile App Development",
    shortTitle: "Web & App Dev",
    description:
      "Engineering ultra-fast, modern Next.js websites and cross-platform iOS & Android mobile applications featuring cinematic UI, responsive precision, and robust integrations.",
    tags: [
      "Next.js 15 Web Apps",
      "iOS & Android Mobile Apps",
      "Fluid UI/UX Architecture",
      "E-Commerce Solutions",
      "Custom API Integrations",
      "Sub-second Load Times",
    ],
    metric: "< 0.8s Load & Scale",
    icon: Code2,
    gradient: "from-[#2878F8]/20 via-indigo-500/5 to-transparent",
  },
];

/**
 * Continuous Rotating Ticker Pills
 */
const TICKER_ITEMS = [
  { label: "DIGITAL PROMOTION", tag: "PAID ADS & ROI" },
  { label: "GRAPHIC DESIGN", tag: "VISUAL CRAFT" },
  { label: "BRAND PROMOTION", tag: "STRATEGY" },
  { label: "PRINTING SOLUTIONS", tag: "PACKAGING & PRINT" },
  { label: "SOCIAL MEDIA REACH", tag: "VIRAL SCALE" },
  { label: "WEB & APP DEVELOPMENT", tag: "NEXT.JS & APPS" },
  { label: "INDORE DIGITAL CO.", tag: "360° AGENCY" },
];

export function BrandTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const ROTATION_INTERVAL = 4500; // 4.5 seconds per service rotation

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    setProgress(0);
  }, []);

  // Smooth auto-rotation loop with live progress tracking
  useEffect(() => {
    if (isPaused) return;

    const stepTime = 50; // update progress every 50ms
    const stepIncrement = (stepTime / ROTATION_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          return 100;
        }
        return prev + stepIncrement;
      });
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, activeIndex]);

  // When progress reaches 100%, advance cleanly to the next service (01 -> 02 -> ... -> 06)
  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress, nextSlide]);

  return (
    <section
      id="services"
      aria-label="Core Services & Client Deliverables"
      className="relative w-full bg-[#050608] pt-16 sm:pt-20 pb-12 overflow-hidden border-t border-white/[0.06] select-none"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2878F8]/10 rounded-full blur-[140px] -z-10" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] w-fit text-[11px] font-mono uppercase tracking-widest text-[#989FA8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] shadow-[0_0_8px_#2878F8]" />
              <span>Full-Spectrum Capabilities • How We Scale Brands</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              End-to-end digital services engineered for growth
              <span className="text-[#2878F8]">.</span>
            </h2>
          </div>

          {/* Interactive Rotation Controls & Status */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Auto-rotation pause/play button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#989FA8] hover:text-white transition-colors outline-none"
              aria-label={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#2878F8] fill-[#2878F8]" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-[#2878F8]" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Prev / Next Slide Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#989FA8] hover:text-white transition-colors outline-none"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#989FA8] hover:text-white transition-colors outline-none"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Interactive Service Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {SERVICES.map((service, idx) => {
            const isActive = activeIndex === idx;
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setProgress(0);
                }}
                className={`relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl text-left transition-all duration-300 outline-none ${
                  isActive
                    ? "bg-[#101114] text-white shadow-[0_0_25px_rgba(40,120,248,0.18)]"
                    : "bg-[#101114]/40 hover:bg-[#101114]/80 text-[#989FA8] hover:text-white"
                }`}
              >
                {/* Active Electric Blue Highlight Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeServiceTabIndicator"
                    className="absolute inset-0 rounded-xl border border-[#2878F8]/60 pointer-events-none"
                    transition={{ duration: 0.3, ease: cinematicEase }}
                  />
                )}

                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-[#2878F8] text-white shadow-[0_0_12px_rgba(40,120,248,0.5)]"
                        : "bg-white/[0.04] text-[#989FA8]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#2878F8]">
                    {service.number}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-widest text-[#989FA8] uppercase">
                    SERVICE {service.number}
                  </span>
                  <span className="text-xs font-semibold tracking-tight text-white line-clamp-1">
                    {service.shortTitle}
                  </span>
                </div>

                {/* Progress bar line for active item */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-2 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#2878F8]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Rotating Service Spotlight Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative mb-14"
        >
          <AnimatePresence mode="wait">
            {SERVICES.map((service, idx) => {
              if (idx !== activeIndex) return null;
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: cinematicEase }}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#101114]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(40,120,248,0.12)]"
                >
                  {/* Subtle Electric Blue Corner Accent Light */}
                  <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#2878F8]/20 via-[#2878F8]/5 to-transparent rounded-full blur-3xl -z-10" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Service Details & Narrative */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                      {/* Meta Pill */}
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#2878F8]/15 border border-[#2878F8]/30 text-[#2878F8] text-[10px] font-mono font-bold tracking-widest uppercase">
                          SERVICE {service.number} / 06
                        </span>
                        <span className="text-xs font-mono text-[#989FA8] uppercase tracking-wider">
                          {service.category}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>

                      {/* Narrative */}
                      <p className="text-sm sm:text-base text-[#989FA8] leading-relaxed max-w-2xl">
                        {service.description}
                      </p>

                      {/* Capability Pills */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-zinc-300 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#2878F8]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Technical Deliverables Badge & Direct CTA */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-6 lg:border-l lg:border-white/[0.08] lg:pl-8">
                      <div className="flex flex-col items-start lg:items-end gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#989FA8]">
                          BENCHMARK METRIC
                        </span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2878F8] shadow-[0_0_10px_#2878F8]" />
                          {service.metric}
                        </span>
                      </div>

                      <a
                        href="#contact"
                        className="group flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-[#2878F8] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(40,120,248,0.5)]"
                      >
                        <span>Initiate Project with {service.shortTitle}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>

      {/* Deluxe Infinite Continuous Rotating Marquee Ticker */}
      <div className="relative w-full overflow-hidden py-4 sm:py-5 border-y border-white/[0.06] bg-[#050608]/95 backdrop-blur-xl">
        {/* Left & Right Soft Fade Gradients for Seamless Infinite Looping */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#050608] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#050608] to-transparent z-10" />

        {/* Continuous Marquee Track */}
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-6 sm:gap-10 w-max cursor-default whitespace-nowrap"
        >
          {/* Double array for seamless infinite marquee loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-4 sm:gap-6 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04] hover:border-[#2878F8]/40 hover:bg-white/[0.05] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] shadow-[0_0_10px_#2878F8]" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.16em] text-zinc-300">
                {item.label}
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#2878F8]/15 border border-[#2878F8]/30 text-[#2878F8] font-bold">
                {item.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}