"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowUpRight,
  Film,
  RotateCcw,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cinematicEase } from "@/lib/animations/variants";

export interface DemoVideo {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  badge: string;
  description: string;
  tags: string[];
  src: string;
  durationString: string;
}

const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: "reel-01",
    number: "01",
    title: "Next-Gen 3D Motion & Visual FX",
    category: "3D Motion Worlds",
    client: "Global Brand Concept",
    badge: "Cinema 4K",
    description:
      "Photorealistic particle physics, fluid dynamic simulations, and spatial kinetic motion built for commercial luxury launches and international campaigns.",
    tags: ["3D CGI", "Unreal Engine", "Fluid Dynamics", "Spatial Audio"],
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    durationString: "01:45",
  },
  {
    id: "reel-02",
    number: "02",
    title: "Cinematic Brand Identity & Film",
    category: "Commercial Film Direction",
    client: "Horizon Marine Lab",
    badge: "10M+ Reach",
    description:
      "Expansive aerial cinematography, brand world storytelling, and high-conversion commercial video pacing crafted to position brands as industry leaders.",
    tags: ["Brand Narrative", "Color Grading", "Commercials", "Sound Design"],
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    durationString: "00:46",
  },
  {
    id: "reel-03",
    number: "03",
    title: "Kinetic Motion Art & Character Worlds",
    category: "Art Direction & 3D Art",
    client: "Sintel Creative Studio",
    badge: "Design Award",
    description:
      "Bespoke motion languages, emotional character arcs, and expressive 3D animation environments that transform brand stories into visual spectacles.",
    tags: ["3D Character", "Art Direction", "Storyboarding", "Kinetic Typography"],
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    durationString: "00:52",
  },
  {
    id: "reel-04",
    number: "04",
    title: "Fluid Web Interfaces & Creative Tech",
    category: "Interactive Digital Experience",
    client: "Next.js Flagship Ecosystem",
    badge: "< 0.8s LCP",
    description:
      "Cinematic micro-interactions, responsive WebGL shaders, zero-latency transitions, and full-stack performance engineering built for modern scale.",
    tags: ["Next.js 15", "Micro-Interactions", "Fluid UI", "WebGL Graphics"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    durationString: "00:05",
  },
];

export function VideoShowcase() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Sound disabled at start as requested
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  const activeVideo = DEMO_VIDEOS[activeVideoIndex];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Audio Toggle (Unmute / Mute)
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Fullscreen Toggle
  const toggleFullscreen = async () => {
    if (!playerWrapperRef.current) return;

    try {
      if (!document.fullscreenElement) {
        if (playerWrapperRef.current.requestFullscreen) {
          await playerWrapperRef.current.requestFullscreen();
        } else if ((playerWrapperRef.current as any).webkitRequestFullscreen) {
          await (playerWrapperRef.current as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch {
      // Fullscreen not permitted or failed
    }
  };

  // Listen for fullscreen change events (e.g. user hits ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Lusion-Style Scroll Trigger: Start playing when scrolled into view, pause when scrolled away
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setHasScrolledIntoView(true);
            if (videoRef.current) {
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Handled if browser restricts
                });
            }
          } else {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5],
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Switch Video
  const handleSelectVideo = (index: number) => {
    if (index === activeVideoIndex) return;
    setActiveVideoIndex(index);
    setProgress(0);
    setCurrentTime("0:00");
  };

  // When active video changes, reload and autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [activeVideoIndex, isMuted]);

  // Handle Video Time Updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((curr / dur) * 100);
      setCurrentTime(formatTime(curr));
      setDuration(formatTime(dur));
    }
  };

  // Handle Video Ended -> Auto-advance to next video for a continuous reel experience
  const handleVideoEnded = () => {
    const nextIndex = (activeVideoIndex + 1) % DEMO_VIDEOS.length;
    handleSelectVideo(nextIndex);
  };

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(pct * 100);
  };

  // Auto-hide controls during playback
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2600);
    }
  };

  return (
    <section
      id="work"
      ref={containerRef}
      aria-label="Cinematic Video Showreel & Work Showcase"
      className="relative w-full bg-[#050608] pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden border-t border-white/[0.06] select-none"
    >
      {/* Background Cinematic Glow Elements */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#2878F8]/10 rounded-full blur-[170px] -z-10" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit text-xs font-mono uppercase tracking-widest text-[#989FA8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] shadow-[0_0_8px_#2878F8]" />
              <span>Cinematic Showreel • Visual Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Motion that leaves a mark
              <span className="text-[#2878F8]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#989FA8] max-w-xl">
              Immerse yourself in our recent work. 3D spatial worlds, brand films, and high-performance digital products engineered to captivate.
            </p>
          </div>

          {/* Quick Reel Counter & Mute Notice */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300">
              REEL {activeVideo.number} / 04
            </span>

            {isMuted && (
              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2878F8]/15 border border-[#2878F8]/30 text-[#2878F8] text-xs font-mono hover:bg-[#2878F8]/25 transition-all shadow-[0_0_15px_rgba(40,120,248,0.25)]"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Audio Muted (Click to Unmute)</span>
              </button>
            )}
          </div>
        </div>

        {/* LUSION-INSPIRED CINEMATIC VIDEO THEATER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: cinematicEase }}
          className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#0A0C10] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(40,120,248,0.12)] overflow-hidden"
        >
          {/* Main Video Player Container */}
          <div
            ref={playerWrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setControlsVisible(false)}
            className="group relative w-full aspect-[16/9] md:aspect-[21/9] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={togglePlay}
          >
            {/* HTML5 Video Component (Muted initially, auto-plays on scroll) */}
            <video
              ref={videoRef}
              key={activeVideo.src}
              src={activeVideo.src}
              playsInline
              muted={isMuted}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Video Vignette & Cinematic Dark Overlay Gradients */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* TOP BAR: HUD Display */}
            <AnimatePresence>
              {controlsVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 pointer-events-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-xs text-white">
                      <span className="w-2 h-2 rounded-full bg-[#2878F8] animate-pulse" />
                      <span>{activeVideo.category}</span>
                    </span>
                    <span className="hidden sm:inline-block font-mono text-xs text-zinc-400">
                      // {activeVideo.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.08] backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
                      {activeVideo.badge}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CENTER PLAY/PAUSE BIG OVERLAY ICON (Fades out when playing) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_40px_rgba(40,120,248,0.4)] group-hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTTOM CONTROLS HUD */}
            <AnimatePresence>
              {controlsVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()} // Prevent player click
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 flex flex-col gap-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                >
                  {/* Interactive Scrub Timeline */}
                  <div
                    onClick={handleSeek}
                    className="group/timeline relative w-full h-1.5 sm:h-2 rounded-full bg-white/20 cursor-pointer overflow-hidden transition-all hover:h-2.5"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="absolute left-0 top-0 bottom-0 bg-[#2878F8] shadow-[0_0_12px_#2878F8] rounded-full transition-all"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Left: Play/Pause, Replay & Timestamps */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 flex items-center justify-center text-white transition-all"
                        aria-label={isPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5 fill-white" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                        className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/5 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                        aria-label="Restart Video"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Time display */}
                      <span className="font-mono text-xs text-zinc-300 tracking-wider">
                        {currentTime} <span className="text-zinc-600">/</span> {duration}
                      </span>
                    </div>

                    {/* Right: Sound Toggle & Fullscreen Option */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Audio Mute/Unmute */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                          isMuted
                            ? "bg-rose-500/15 border-rose-500/30 text-rose-300 hover:bg-rose-500/25"
                            : "bg-[#2878F8]/20 border-[#2878F8]/40 text-[#2878F8] hover:bg-[#2878F8]/30 shadow-[0_0_15px_rgba(40,120,248,0.3)]"
                        }`}
                        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-4 h-4 text-rose-400" />
                            <span className="hidden sm:inline">Muted</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-[#2878F8]" />
                            <span className="hidden sm:inline">Sound On</span>
                          </>
                        )}
                      </button>

                      {/* Fullscreen (Entire Screen) Toggle */}
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-[#2878F8] hover:text-white border border-white/10 flex items-center justify-center text-white transition-all"
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        title="Play in Entire Screen"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LOWER CONTROLS & 4 DEMO VIDEO SWITCHER TABS */}
          <div className="p-6 sm:p-8 bg-[#0D0F14] border-t border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
              {/* Active Video Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#2878F8] font-bold">
                    REEL {activeVideo.number}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">•</span>
                  <span className="text-xs font-mono text-zinc-400">{activeVideo.client}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#989FA8] max-w-2xl leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {activeVideo.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2878F8] hover:text-white transition-colors"
                >
                  <span>Commission Similar Motion</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4 Demo Videos Navigation Switcher */}
            <div className="pt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 block">
                SELECT DEMO REEL TO PLAY (3-4 SHOWCASE DEMOS)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DEMO_VIDEOS.map((demo, idx) => {
                  const isSelected = idx === activeVideoIndex;
                  return (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleSelectVideo(idx)}
                      className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#2878F8]/10 border-[#2878F8] shadow-[0_0_20px_rgba(40,120,248,0.25)]"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span
                          className={`font-mono text-[11px] font-bold ${
                            isSelected ? "text-[#2878F8]" : "text-zinc-500"
                          }`}
                        >
                          REEL {demo.number}
                        </span>

                        <span className="font-mono text-[10px] text-zinc-500">
                          {demo.durationString}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-semibold tracking-tight truncate ${
                          isSelected ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {demo.title}
                      </span>

                      <span className="text-[10px] font-mono text-[#989FA8] mt-1 truncate">
                        {demo.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
