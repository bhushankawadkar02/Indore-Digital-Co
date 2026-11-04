"use client";

import React, { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  Flame,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
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

/**
 * Dedicated WhatsApp SVG Icon
 */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const AVAILABLE_SERVICES = [
  "Digital Promotion & Ads",
  "Graphic Design & Visuals",
  "Brand Promotion & Strategy",
  "Commercial Printing & Packaging",
  "Social Media Reach & Growth",
  "Web & Mobile App Development",
];

const TIMELINE_OPTIONS = ["1–2 Weeks", "3–5 Weeks", "2+ Months", "Flexible"];

interface FormErrors {
  name?: string;
  email?: string;
  services?: string;
}

/**
 * Theme-matching custom helper and error message component.
 * Features:
 * - Glowing pulse indicator matching IDC electric dark theme
 * - Animated height and opacity transition
 * - Consistent monospace typography
 */
function FormHelperMessage({
  error,
  helper,
}: {
  error?: string;
  helper?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {error ? (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2, ease: cinematicEase }}
          className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-[11px] shadow-[0_0_14px_rgba(244,63,94,0.15)]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </motion.div>
      ) : helper ? (
        <p className="text-[11px] font-mono text-[#989FA8] mt-1.5 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#2878F8]/60" />
          <span>{helper}</span>
        </p>
      ) : null}
    </AnimatePresence>
  );
}

export function Contact() {
  const [activeTab, setActiveTab] = useState<"inquiry" | "calendar">("inquiry");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State & Validation
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Digital Promotion & Ads",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const nameInputId = useId();
  const emailInputId = useId();
  const companyInputId = useId();
  const messageInputId = useId();

  // Validate specific field
  const validateField = (field: "name" | "email" | "services", value?: any) => {
    let error = "";
    if (field === "name") {
      const val = (value !== undefined ? value : formData.name).trim();
      if (!val) {
        error = "Please provide your name or brand.";
      } else if (val.length < 2) {
        error = "Name must be at least 2 characters.";
      }
    } else if (field === "email") {
      const val = (value !== undefined ? value : formData.email).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) {
        error = "Work email address is required.";
      } else if (!emailRegex.test(val)) {
        error = "Please enter a valid work email (e.g. name@brand.com).";
      }
    } else if (field === "services") {
      const val = value !== undefined ? value : selectedServices;
      if (!val || val.length === 0) {
        error = "Please select at least 1 service capability to continue.";
      }
    }
    return error;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));
    if (touched.name) {
      const err = validateField("name", val);
      setErrors((prev) => ({ ...prev, name: err || undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      const err = validateField("email", val);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
  };

  const handleBlur = (field: "name" | "email") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
  };

  // Calculate live Indore local time (IST)
  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone: AGENCY_CONFIG.timezone,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setCurrentTime(timeString);
      } catch {
        setCurrentTime("12:00 PM");
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(AGENCY_CONFIG.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service];
      if (touched.services) {
        const err = validateField("services", next);
        setErrors((e) => ({ ...e, services: err || undefined }));
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, services: true });

    const nameErr = validateField("name");
    const emailErr = validateField("email");
    const servicesErr = validateField("services");

    if (nameErr || emailErr || servicesErr) {
      setErrors({
        name: nameErr || undefined,
        email: emailErr || undefined,
        services: servicesErr || undefined,
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate high-fidelity processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  // Generate pre-filled WhatsApp link with the user's inquiry
  const getWhatsAppInquiryUrl = () => {
    const text = encodeURIComponent(
      `Hello Indore Digital Co!\n\n` +
        `👤 Name: ${formData.name || "Client"}\n` +
        `✉️ Email: ${formData.email || "Not specified"}\n` +
        `🏢 Company: ${formData.company || "Not specified"}\n` +
        `🎯 Services: ${selectedServices.join(", ")}\n` +
        `⏱️ Timeline: ${selectedTimeline}\n\n` +
        `📝 Brief: ${formData.message || "I'd like to commission a new project with your agency."}`
    );
    return `https://wa.me/${AGENCY_CONFIG.socials.whatsapp.phoneNumber}?text=${text}`;
  };

  return (
    <section
      id="contact"
      aria-label="Direct Commission Inquiry & Contact"
      className="relative w-full bg-[#050608] pt-24 sm:pt-32 pb-20 overflow-hidden border-t border-white/[0.06] select-none"
    >
      {/* Background Ambient Electric Blue Glows */}
      <div className="pointer-events-none absolute top-1/4 -left-40 w-[550px] h-[550px] bg-[#2878F8]/12 rounded-full blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/3 -right-40 w-[600px] h-[600px] bg-[#2878F8]/10 rounded-full blur-[160px] -z-10" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 text-xs font-mono uppercase tracking-widest text-[#989FA8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2878F8] shadow-[0_0_8px_#2878F8]" />
            <span>Initiate Direct Commission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let’s architect something iconic
            <span className="text-[#2878F8]">.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#989FA8] max-w-xl">
            Have an ambitious vision or project to build? Connect with our team directly or submit your brief below.
          </p>
        </div>

        {/* Command Center Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ================= LEFT COLUMN: AGENCY SIGNALS & DIRECT CHANNELS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Agency Status & Real-time IST Clock */}
            <div className="p-6 rounded-2xl bg-[#101114]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2878F8] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2878F8]" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-white tracking-wide">
                    {AGENCY_CONFIG.availabilityStatus}
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2878F8]/15 border border-[#2878F8]/30 text-[#2878F8] font-bold">
                  LIVE
                </span>
              </div>

              {/* Local Time in Indore, India */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#989FA8] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2878F8]" />
                  <span>HQ Time (Indore, IST):</span>
                </span>
                <span className="font-bold text-white tracking-wider">
                  {currentTime || "12:00 PM IST"}
                </span>
              </div>
            </div>

            {/* Direct Channel 1: WhatsApp Concierge */}
            <a
              href={`https://wa.me/${AGENCY_CONFIG.socials.whatsapp.phoneNumber}?text=${encodeURIComponent(
                AGENCY_CONFIG.socials.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#101114] to-[#101114]/60 backdrop-blur-xl border border-white/[0.08] hover:border-[#25D366]/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      WhatsApp Concierge
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#25D366]/15 text-[#25D366] font-semibold">
                      Fastest
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white tracking-tight mt-0.5">
                    {AGENCY_CONFIG.socials.whatsapp.displayNumber}
                  </span>
                  <span className="text-[11px] font-mono text-[#989FA8] mt-0.5">
                    {AGENCY_CONFIG.socials.whatsapp.statusText}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-[#25D366] group-hover:text-black flex items-center justify-center text-[#989FA8] transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* Direct Channel 2: Official Email with One-Tap Copy */}
            <div
              onClick={handleCopyEmail}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-[#101114]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#2878F8]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2878F8]/15 border border-[#2878F8]/30 flex items-center justify-center text-[#2878F8] group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Official Commissions Email
                  </span>
                  <span className="text-sm font-semibold text-white tracking-tight mt-0.5 font-mono">
                    {AGENCY_CONFIG.email}
                  </span>
                  <span className="text-[11px] font-mono text-[#989FA8] mt-0.5">
                    Click to copy address
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {copiedEmail ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="px-2.5 py-1 rounded-full bg-[#2878F8] text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(40,120,248,0.5)]"
                    >
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-[#2878F8] group-hover:text-white flex items-center justify-center text-[#989FA8] transition-all">
                      <Copy className="w-4 h-4" />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Direct Channel 3: Instagram Direct */}
            <a
              href={AGENCY_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-[#101114]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#dc2743]/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 border border-[#dc2743]/30 flex items-center justify-center text-[#dc2743] group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Instagram Studio
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-white font-semibold">
                      {AGENCY_CONFIG.socials.instagram.followers} Fans
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white tracking-tight mt-0.5 font-mono">
                    {AGENCY_CONFIG.socials.instagram.handle}
                  </span>
                  <span className="text-[11px] font-mono text-[#989FA8] mt-0.5">
                    {AGENCY_CONFIG.socials.instagram.tagline}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white flex items-center justify-center text-[#989FA8] transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* Agency Guarantee & SLA */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2878F8] shrink-0" />
              <p className="text-xs font-mono text-[#989FA8] leading-relaxed">
                <strong className="text-white font-semibold">Guaranteed Turnaround:</strong> Inquiries receive a direct personal response within <span className="text-[#2878F8]">30 minutes</span> during business hours.
              </p>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE SMART INQUIRY SUITE ================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#101114]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(40,120,248,0.12)]">
              {/* Top View Selector Tabs: Inquiry Form vs Schedule Discovery Call */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#050608] border border-white/[0.06] mb-8 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab("inquiry")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "inquiry"
                      ? "bg-[#2878F8] text-white font-semibold shadow-[0_0_15px_rgba(40,120,248,0.4)]"
                      : "text-[#989FA8] hover:text-white"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Project Brief Form</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("calendar")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "calendar"
                      ? "bg-[#2878F8] text-white font-semibold shadow-[0_0_15px_rgba(40,120,248,0.4)]"
                      : "text-[#989FA8] hover:text-white"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 15-Min Discovery Call</span>
                </button>
              </div>

              {/* VIEW 1: INTERACTIVE BRIEF FORM */}
              {activeTab === "inquiry" && (
                <div>
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-6"
                      >
                        {/* 1. Services Pills Selection */}
                        <div className="flex flex-col gap-2.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-white flex items-center justify-between">
                            <span>1. What capabilities do you require?</span>
                            <span className="text-[11px] text-[#989FA8] lowercase font-normal">
                              (select multiple)
                            </span>
                          </label>

                          <div className="flex flex-wrap gap-2">
                            {AVAILABLE_SERVICES.map((service) => {
                              const isSelected = selectedServices.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                                    isSelected
                                      ? "bg-[#2878F8] text-white border-[#2878F8] shadow-[0_0_14px_rgba(40,120,248,0.35)] font-semibold"
                                      : "bg-white/[0.03] text-zinc-300 border-white/[0.08] hover:border-[#2878F8]/50 hover:bg-white/[0.06]"
                                  }`}
                                >
                                  {isSelected && <span className="mr-1.5">✓</span>}
                                  {service}
                                </button>
                              );
                            })}
                          </div>
                          <FormHelperMessage error={errors.services} />
                        </div>

                        {/* 2. Timeline Selection */}
                        <div className="flex flex-col gap-2.5 pt-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-white">
                            2. Target Delivery Timeline
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINE_OPTIONS.map((timeline) => {
                              const isSelected = selectedTimeline === timeline;
                              return (
                                <button
                                  key={timeline}
                                  type="button"
                                  onClick={() => setSelectedTimeline(timeline)}
                                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                                    isSelected
                                      ? "bg-white text-black font-semibold border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                                      : "bg-white/[0.03] text-[#989FA8] border-white/[0.08] hover:text-white"
                                  }`}
                                >
                                  {timeline}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Client Contact Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor={nameInputId}
                              className="text-xs font-mono text-[#989FA8] flex items-center justify-between"
                            >
                              <span>Your Name / Brand *</span>
                              {formData.name.trim().length > 0 && !errors.name && (
                                <span className="text-[10px] text-[#2878F8] font-bold">✓ Ready</span>
                              )}
                            </label>
                            <input
                              id={nameInputId}
                              type="text"
                              value={formData.name}
                              onChange={handleNameChange}
                              onBlur={() => handleBlur("name")}
                              placeholder="e.g. Alex Mercer"
                              className={`w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all placeholder:text-[#989FA8]/40 font-mono ${
                                errors.name
                                  ? "bg-rose-500/[0.04] border border-rose-500/70 focus:border-rose-400 focus:shadow-[0_0_20px_rgba(244,63,94,0.3)] shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                                  : "bg-[#050608] border border-white/[0.08] focus:border-[#2878F8] focus:shadow-[0_0_20px_rgba(40,120,248,0.25)]"
                              }`}
                            />
                            <FormHelperMessage error={errors.name} />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor={emailInputId}
                              className="text-xs font-mono text-[#989FA8] flex items-center justify-between"
                            >
                              <span>Work Email *</span>
                              {formData.email.trim().length > 0 && !errors.email && (
                                <span className="text-[10px] text-[#2878F8] font-bold">✓ Ready</span>
                              )}
                            </label>
                            <input
                              id={emailInputId}
                              type="email"
                              value={formData.email}
                              onChange={handleEmailChange}
                              onBlur={() => handleBlur("email")}
                              placeholder="alex@brand.com"
                              className={`w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all placeholder:text-[#989FA8]/40 font-mono ${
                                errors.email
                                  ? "bg-rose-500/[0.04] border border-rose-500/70 focus:border-rose-400 focus:shadow-[0_0_20px_rgba(244,63,94,0.3)] shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                                  : "bg-[#050608] border border-white/[0.08] focus:border-[#2878F8] focus:shadow-[0_0_20px_rgba(40,120,248,0.25)]"
                              }`}
                            />
                            <FormHelperMessage error={errors.email} />
                          </div>
                        </div>

                        {/* 5. Message Brief */}
                        <div className="flex flex-col gap-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs font-mono text-[#989FA8]">
                            <label htmlFor={messageInputId}>
                              Brief Scope / Ambitions
                            </label>
                            <span>{formData.message.length}/500</span>
                          </div>
                          <textarea
                            id={messageInputId}
                            rows={3}
                            maxLength={500}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Tell us about the project goals, current challenges, inspiration links, or desired outcome..."
                            className="w-full px-4 py-3 rounded-xl bg-[#050608] border border-white/[0.08] text-white text-sm focus:border-[#2878F8] focus:shadow-[0_0_20px_rgba(40,120,248,0.25)] focus:outline-none transition-all placeholder:text-[#989FA8]/40 font-mono resize-none leading-relaxed"
                          />
                        </div>

                        {/* Top Error Summary Banner */}
                        <AnimatePresence>
                          {(errors.name || errors.email || errors.services) && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: cinematicEase }}
                              className="p-3.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/30 flex items-center gap-3 text-xs font-mono text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.12)]"
                            >
                              <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                              </span>
                              <span>Inquiry incomplete: please fill out the highlighted fields above.</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit Action & Instant WhatsApp Bridge */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2878F8] text-white font-mono text-sm font-bold shadow-[0_0_30px_rgba(40,120,248,0.4)] hover:bg-[#1f64d4] hover:shadow-[0_0_40px_rgba(40,120,248,0.6)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Encrypting & Dispatching...</span>
                              </>
                            ) : (
                              <>
                                <span>Transmit Project Inquiry</span>
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </button>

                          <a
                            href={getWhatsAppInquiryUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#25D366]/60 hover:bg-[#25D366]/10 text-white font-mono text-xs transition-all"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                            <span>Send via WhatsApp</span>
                          </a>
                        </div>
                      </motion.form>
                    ) : (
                      /* MORPHING SUCCESS RECEIPT STATE */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: cinematicEase }}
                        className="flex flex-col items-center text-center py-6 sm:py-8"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-[#2878F8]/15 border border-[#2878F8]/40 flex items-center justify-center text-[#2878F8] shadow-[0_0_35px_rgba(40,120,248,0.4)] mb-5">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <span className="text-xs font-mono uppercase tracking-widest text-[#2878F8] font-bold">
                          Inquiry Dispatched Successfully
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                          Thank you, {formData.name || "Client"}
                          <span className="text-[#2878F8]">.</span>
                        </h3>

                        <p className="text-sm text-[#989FA8] max-w-md mt-2 leading-relaxed">
                          Your commission request has been logged. Our leadership team in Indore will review your scope and follow up within <strong className="text-white">30 minutes</strong>.
                        </p>

                        {/* Brief Summary Receipt Card */}
                        <div className="w-full max-w-md my-6 p-4 rounded-xl bg-[#050608] border border-white/[0.08] text-left font-mono text-xs flex flex-col gap-2">
                          <div className="flex justify-between text-[#989FA8]">
                            <span>Target Timeline:</span>
                            <span className="text-white font-semibold">{selectedTimeline}</span>
                          </div>
                          <div className="flex justify-between text-[#989FA8]">
                            <span>Capabilities:</span>
                            <span className="text-[#2878F8] font-semibold truncate max-w-[200px]">
                              {selectedServices.join(", ")}
                            </span>
                          </div>
                        </div>

                        {/* Quick WhatsApp Forward Button */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                          <a
                            href={getWhatsAppInquiryUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#25D366] text-black font-mono font-bold text-xs shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#20ba59] transition-all"
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                            <span>Instant Reply on WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              setIsSubmitted(false);
                              setFormData({ name: "", email: "", company: "", message: "" });
                            }}
                            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white font-mono text-xs hover:bg-white/[0.1] transition-all"
                          >
                            Send Another
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* VIEW 2: BOOK 15-MIN DISCOVERY CALL */}
              {activeTab === "calendar" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2878F8]/15 border border-[#2878F8]/30 flex items-center justify-center text-[#2878F8] mb-4">
                    <Calendar className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-[#2878F8] font-bold">
                    One-on-One Discovery Call
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                    Schedule a 15-minute Strategy Session
                  </h3>

                  <p className="text-xs sm:text-sm text-[#989FA8] max-w-md mt-2 leading-relaxed">
                    Direct video consultation with our Lead Architect to dissect technical feasibility, design direction, timeline, and scope.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full my-6 text-left font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-[#050608] border border-white/[0.06] flex flex-col gap-1">
                      <Clock className="w-4 h-4 text-[#2878F8]" />
                      <span className="text-white font-semibold">15 Minutes</span>
                      <span className="text-[#989FA8] text-[10px]">Laser-focused discussion</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#050608] border border-white/[0.06] flex flex-col gap-1">
                      <PhoneCall className="w-4 h-4 text-[#2878F8]" />
                      <span className="text-white font-semibold">Google Meet</span>
                      <span className="text-[#989FA8] text-[10px]">Instant calendar invite</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#050608] border border-white/[0.06] flex flex-col gap-1">
                      <Flame className="w-4 h-4 text-[#2878F8]" />
                      <span className="text-white font-semibold">Zero Pitch</span>
                      <span className="text-[#989FA8] text-[10px]">Architecture & strategy only</span>
                    </div>
                  </div>

                  {/* Calendar Action Button */}
                  <a
                    href={`https://wa.me/${AGENCY_CONFIG.socials.whatsapp.phoneNumber}?text=${encodeURIComponent(
                      "Hello! I would like to schedule a 15-minute Discovery Call with Indore Digital Co."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-sm flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2878F8] text-white font-mono text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(40,120,248,0.4)] hover:bg-[#1f64d4] transition-all"
                  >
                    <span>Confirm Slot on WhatsApp / Cal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
