import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { BrandTicker } from "@/components/sections/BrandTicker";
import { Contact } from "@/components/sections/Contact";
import { BrandIntroLoader } from "@/components/ui/BrandIntroLoader";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

/**
 * SERVER COMPONENT: Root Homepage Route.
 * Adheres to the Official Indore Digital Co Color System:
 * - Dominant background: #050608
 * - Electric Blue highlights: #2878F8
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050608] text-white flex flex-col selection:bg-[#2878F8]/30 selection:text-white">
      {/* Opening Intro Loader: Center Brand Logo Animation with Graceful Exit */}
      <BrandIntroLoader />

      {/* Floating navigation header */}
      <Header />

      {/* Main landmark */}
      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />
        <VideoShowcase />
        <BrandTicker />
        <Contact />
      </main>

      {/* Global Agency Footer */}
      <Footer />

      {/* Direct WhatsApp Concierge Widget */}
      <FloatingWhatsApp />
    </div>
  );
}