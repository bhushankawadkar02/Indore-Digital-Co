import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroTopBadge, HeroNarrative } from "@/components/hero/HeroMeta";
import { HeroCTA } from "@/components/hero/HeroCTA";
import { BrandShowcase } from "@/components/hero/BrandShowcase";
import { AGENCY_CONFIG } from "@/data/agency";

/**
 * SERVER COMPONENT: Hero Section with Interactive Brand Showcase.
 * Color System:
 * - Dominant background: #050608
 * - Headings: #FFFFFF
 * - Accent: #2878F8 (Electric Blue)
 * - Muted text: #989FA8
 * - Borders: #282B30
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-[#050608]"
    >
      {/* Anchor for backward compatibility with #hero */}
      <div id="hero" className="absolute top-0 left-0 pointer-events-none" />
      {/* Client Island: Electric Blue Ambient Lighting & Grid */}
      <HeroVisual />

      <Container className="relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Brand Typography, Narrative, and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6">
            {/* Category Pill Badge */}
            <HeroTopBadge />

            {/* Split-Word Masked Headline Reveal */}
            <HeroHeadline
              line1="We build brands."
              line2="We drive growth."
            />

            {/* Supporting Copy */}
            <div className="pt-2 sm:pt-3">
              <HeroNarrative />
            </div>

            {/* Interactive CTAs & Live Status */}
            <div className="pt-3 sm:pt-5 w-full">
              <HeroCTA />
            </div>

            {/* Server-Rendered Metrics & Agency Signals */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-10 mt-4 sm:mt-6 border-t border-[#282B30] w-full max-w-xl">
              {AGENCY_CONFIG.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#989FA8] uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Brand Identity Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-4 lg:mt-0">
            <BrandShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
}