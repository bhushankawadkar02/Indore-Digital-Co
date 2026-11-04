"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Sparkles,
  Music2,
  ExternalLink,
  Film,
  Grid,
  Play,
  Eye,
  Radio,
} from "lucide-react";
import { AGENCY_CONFIG } from "@/data/agency";
import { cinematicEase } from "@/lib/animations/variants";

/**
 * Dedicated Instagram SVG Icon
 */
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramDataState {
  username: string;
  handle: string;
  url: string;
  followers: string;
  following: string;
  posts: string;
  bio: string;
  reels: Array<{
    id: string;
    title: string;
    views: string;
    likes: string;
    comments: string;
    audio: string;
    previewImage: string;
    permalink: string;
  }>;
  isLive: boolean;
}

/**
 * BrandShowcase Component
 *
 * Dynamic Instagram & Creative Reel Showcase:
 * - Fetches real-time followers, following, post counts & reels via /api/instagram
 * - Interactive Tabs: Feed View & Reels View with play counts and audio
 * - Highlighted "Let's connect on Instagram" client focus
 * - 3D Spring Tilt physics on desktop & instantaneous touch redirect on mobile
 * - Deep dark (#050608) and Electric Blue (#2878F8) aesthetic
 */
export function BrandShowcase() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"feed" | "reels">("reels");
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { instagram } = AGENCY_CONFIG.socials;

  // Instagram metrics state (initialized with agency defaults, updated via /api/instagram)
  const [igData, setIgData] = useState<InstagramDataState>({
    username: instagram.username,
    handle: instagram.handle,
    url: instagram.url,
    followers: instagram.followers,
    following: instagram.following,
    posts: instagram.posts,
    bio: instagram.bio,
    reels: [...instagram.reels],
    isLive: false,
  });

  // Fetch real-time Instagram metrics & reels from Next.js API route
  useEffect(() => {
    let isMounted = true;
    async function fetchInstagramMetrics() {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && json.data && isMounted) {
          setIgData({
            username: json.data.username || instagram.username,
            handle: json.data.handle || instagram.handle,
            url: json.data.url || instagram.url,
            followers: json.data.followers || instagram.followers,
            following: json.data.following || instagram.following,
            posts: json.data.posts || instagram.posts,
            bio: json.data.bio || instagram.bio,
            reels: json.data.reels?.length ? json.data.reels : instagram.reels,
            isLive: !!json.data.live,
          });
        }
      } catch (err) {
        console.warn("Using offline brand metrics for Instagram showcase");
      }
    }

    fetchInstagramMetrics();
    return () => {
      isMounted = false;
    };
  }, [instagram]);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight coordinates
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-9, 9]),
    springConfig
  );

  const badge1X = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-14, 14]),
    springConfig
  );
  const badge1Y = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  const badge2X = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [16, -16]),
    springConfig
  );
  const badge2Y = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    mouseX.set(currentX / width - 0.5);
    mouseY.set(currentY / height - 0.5);

    spotlightX.set((currentX / width) * 100);
    spotlightY.set((currentY / height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    spotlightX.set(50);
    spotlightY.set(50);
  };

  const currentReel = igData.reels[activeReelIndex] || igData.reels[0];

  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none lg:w-full select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Pulsing Glow behind card */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : [1, 1.04, 1],
          opacity: isHovered ? 0.65 : [0.25, 0.42, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#2878F8]/30 via-[#2878F8]/12 to-purple-600/10 rounded-3xl blur-3xl pointer-events-none -z-10"
      />

      {/* Main 3D Interactive Anchor Card: Redirects to Instagram on touch & click */}
      <motion.a
        ref={containerRef}
        href={igData.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Connect with ${AGENCY_CONFIG.name} on Instagram (${igData.handle})`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: cinematicEase }}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="block relative group rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-[#101114]/90 backdrop-blur-xl border border-[#282B30] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(40,120,248,0.14)] transition-colors duration-500 hover:border-[#2878F8]/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F8]"
      >
        {/* Dynamic Electric Blue Spotlight reflection tracking mouse */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 320px at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(40, 120, 248, 0.22), transparent 75%)`,
          }}
        />

        {/* Client Focus: Prominent 'Let's Connect on Instagram' Highlight Ribbon */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-[#2878F8]/20 via-[#2878F8]/10 to-transparent border border-[#2878F8]/40 mb-3 shadow-[0_0_15px_rgba(40,120,248,0.15)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2878F8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2878F8]" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide text-white flex items-center gap-1.5">
              <span>{instagram.callToAction}</span>
              <span className="text-[#2878F8]">✦</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#2878F8] font-semibold group-hover:translate-x-0.5 transition-transform duration-200">
            <span>Open Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Instagram Profile Header Mockup */}
        <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-[#282B30]/70">
          {/* Avatar with Story Gradient Ring */}
          <div className="flex items-center gap-3">
            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] shadow-[0_0_12px_rgba(220,39,67,0.35)]">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#050608] flex items-center justify-center border-2 border-[#101114]">
                <span className="font-mono text-xs sm:text-sm font-black tracking-tighter text-[#2878F8]">
                  IDC
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight">
                  {igData.username}
                </span>
                <BadgeCheck className="w-4 h-4 text-[#2878F8] fill-[#2878F8]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#989FA8]">
                  {AGENCY_CONFIG.name}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#050608] border border-[#282B30] text-[#2878F8]">
                  {igData.isLive ? "● LIVE SYNC" : "OFFICIAL"}
                </span>
              </div>
            </div>
          </div>

          {/* Connect / Follow Pill Button */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2878F8] text-white font-mono text-xs font-semibold shadow-[0_0_16px_rgba(40,120,248,0.4)] group-hover:bg-[#1f62d1] group-hover:shadow-[0_0_24px_rgba(40,120,248,0.6)] transition-all duration-300">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
        </div>

        {/* Dynamic Metrics Row: Posts, Followers, Following */}
        <div className="grid grid-cols-3 gap-2 px-1 pb-3 text-center font-mono text-[11px]">
          <div className="flex flex-col py-1.5 rounded-lg bg-[#050608]/50 border border-[#282B30]/40 transition-colors group-hover:border-[#2878F8]/30">
            <span className="font-bold text-white text-xs sm:text-sm">{igData.posts}</span>
            <span className="text-[10px] text-[#989FA8]">posts</span>
          </div>
          <div className="flex flex-col py-1.5 rounded-lg bg-[#050608]/50 border border-[#282B30]/40 transition-colors group-hover:border-[#2878F8]/30">
            <span className="font-bold text-white text-xs sm:text-sm">{igData.followers}</span>
            <span className="text-[10px] text-[#2878F8] font-medium">followers</span>
          </div>
          <div className="flex flex-col py-1.5 rounded-lg bg-[#050608]/50 border border-[#282B30]/40 transition-colors group-hover:border-[#2878F8]/30">
            <span className="font-bold text-white text-xs sm:text-sm">{igData.following}</span>
            <span className="text-[10px] text-[#989FA8]">following</span>
          </div>
        </div>

        {/* Interactive View Selector Tabs: Reels vs Feed */}
        <div className="flex items-center justify-between px-1 mb-2.5">
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#050608] border border-[#282B30]/80">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab("reels");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                activeTab === "reels"
                  ? "bg-[#2878F8] text-white font-semibold shadow-[0_0_10px_rgba(40,120,248,0.4)]"
                  : "text-[#989FA8] hover:text-white"
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Trending Reels ({igData.reels.length})</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab("feed");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                activeTab === "feed"
                  ? "bg-[#2878F8] text-white font-semibold shadow-[0_0_10px_rgba(40,120,248,0.4)]"
                  : "text-[#989FA8] hover:text-white"
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Feed Post</span>
            </button>
          </div>

          {activeTab === "reels" && igData.reels.length > 1 && (
            <div className="flex items-center gap-1">
              {igData.reels.map((_, idx) => (
                <button
                  key={`reel-dot-${idx}`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveReelIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeReelIndex === idx
                      ? "bg-[#2878F8] w-4"
                      : "bg-[#282B30] hover:bg-[#989FA8]"
                  }`}
                  aria-label={`Switch to Reel ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Visual Viewport: Reels / Feed Visual Display */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/10] bg-[#050608] border border-[#282B30]/80 group/image">
          {/* Animated Scanning Beam Effect */}
          <motion.div
            animate={{
              y: ["-100%", "260%"],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-[#2878F8]/15 to-transparent z-10"
          />

          {/* Technical Corner Crosshairs */}
          <span className="absolute top-2 left-2 z-20 font-mono text-xs text-[#2878F8]/70 select-none">
            +
          </span>
          <span className="absolute top-2 right-2 z-20 font-mono text-xs text-[#2878F8]/70 select-none">
            +
          </span>
          <span className="absolute bottom-2 left-2 z-20 font-mono text-xs text-[#2878F8]/70 select-none">
            +
          </span>
          <span className="absolute bottom-2 right-2 z-20 font-mono text-xs text-[#2878F8]/70 select-none">
            +
          </span>

          {/* Media Image */}
          <Image
            src={activeTab === "reels" ? currentReel.previewImage : "/brand-showcase.png"}
            alt="Indore Digital Co Instagram Showcase & Reels"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/95 via-[#050608]/30 to-transparent pointer-events-none z-10" />

          {/* Reel-Specific Play Icon & Views Pill */}
          {activeTab === "reels" && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050608]/90 backdrop-blur-md border border-[#2878F8]/50 text-[10px] font-mono text-white shadow-[0_0_12px_rgba(40,120,248,0.3)]">
              <Eye className="w-3 h-3 text-[#2878F8]" />
              <span className="font-bold">{currentReel.views}</span>
              <span className="text-[#989FA8]">views</span>
            </div>
          )}

          {/* Audio Tag Badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050608]/85 backdrop-blur-md border border-[#282B30] text-[10px] font-mono text-white">
            <Music2
              className="w-3 h-3 text-[#2878F8] animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span className="truncate max-w-[160px] sm:max-w-[200px]">
              {activeTab === "reels" ? currentReel.audio : `${igData.username} • Original Audio`}
            </span>
          </div>

          {/* Hover Prompt Pill: 'Tap to view on Instagram' */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050608]/90 backdrop-blur-xl border border-[#2878F8] text-white font-mono text-xs font-semibold shadow-[0_0_30px_rgba(40,120,248,0.5)]">
              {activeTab === "reels" ? (
                <Play className="w-4 h-4 text-[#2878F8] fill-[#2878F8]" />
              ) : (
                <InstagramIcon className="w-4 h-4 text-[#2878F8]" />
              )}
              <span>
                {activeTab === "reels" ? "Watch Reel on Instagram" : "Open Instagram Profile"}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#2878F8]" />
            </div>
          </div>

          {/* Bottom Bar inside image: Post / Reel Interactions */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#050608]/85 backdrop-blur-md border border-[#282B30] text-white">
              <div
                className="flex items-center gap-1 cursor-pointer transition-colors hover:text-rose-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isLiked ? "fill-rose-500 text-rose-500" : "text-white"
                  }`}
                />
                <span className="font-mono text-[10px]">
                  {activeTab === "reels" ? currentReel.likes : isLiked ? "2,841" : "2,840"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#989FA8]">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">
                  {activeTab === "reels" ? currentReel.comments : "142"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#989FA8]">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050608]/85 backdrop-blur-md border border-[#282B30] text-[#989FA8] font-mono text-[10px]">
              <Sparkles className="w-3 h-3 text-[#2878F8]" />
              <span className="text-white font-semibold">{igData.handle}</span>
            </div>
          </div>
        </div>

        {/* Bio / Title Narrative Bar */}
        <div className="pt-3 px-1">
          <p className="text-[11px] sm:text-xs text-[#989FA8] leading-relaxed line-clamp-2">
            <span className="text-white font-semibold mr-1.5">
              {igData.username}
            </span>
            {activeTab === "reels" ? currentReel.title : igData.bio}
          </p>
        </div>
      </motion.a>

      {/* Floating Parallax Badge 1: Top Right */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : badge1X,
          y: shouldReduceMotion ? 0 : badge1Y,
        }}
        animate={{
          translateY: shouldReduceMotion ? 0 : [-4, 4, -4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#101114]/95 backdrop-blur-xl border border-[#2878F8]/40 shadow-[0_12px_28px_rgba(0,0,0,0.7),0_0_20px_rgba(40,120,248,0.25)] pointer-events-none"
      >
        <span className="p-1 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
          <InstagramIcon className="w-3 h-3" />
        </span>
        <span className="font-mono text-xs font-semibold text-white tracking-wide">
          Connect on Instagram
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#2878F8]" />
      </motion.div>

      {/* Floating Parallax Badge 2: Bottom Left */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : badge2X,
          y: shouldReduceMotion ? 0 : badge2Y,
        }}
        animate={{
          translateY: shouldReduceMotion ? 0 : [4, -4, 4],
        }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="absolute -bottom-5 -left-2 sm:-bottom-7 sm:-left-5 z-40 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#101114]/95 backdrop-blur-xl border border-[#282B30] shadow-[0_12px_28px_rgba(0,0,0,0.75)] pointer-events-none"
      >
        <div className="w-7 h-7 rounded-lg bg-[#2878F8]/15 border border-[#2878F8]/30 flex items-center justify-center text-[#2878F8]">
          <Film className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase text-[#989FA8] tracking-wider">
            {igData.handle}
          </span>
          <span className="text-xs font-mono font-semibold text-white">
            Daily Reels & Case Studies
          </span>
        </div>
      </motion.div>
    </div>
  );
}
