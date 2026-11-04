export interface NavigationItem {
  label: string;
  href: string;
}

export const AGENCY_CONFIG = {
  name: "Indore Digital Co",
  shortName: "IDC",
  tagline: "We build brands. We drive growth.",
  subtext:
    "A full-service creative digital agency powering brands through digital promotion, bespoke graphic design, strategic brand promotion, high-grade printing, viral social media reach, and high-performance web & app development.",
  location: "Indore, MP, India",
  timezone: "Asia/Kolkata",
  email: "hello@indoredigital.co",
  availabilityStatus: "Available for New Client Projects",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] as NavigationItem[],
  stats: [
    { label: "Client Reach", value: "10M+" },
    { label: "Core Services", value: "360° Scope" },
    { label: "Production Craft", value: "100% Bespoke" },
  ],
  services: [
    {
      id: "digital-promotion",
      number: "01",
      title: "Digital Promotion",
      subtitle: "Paid Ads & Performance Marketing",
      description:
        "Hyper-targeted advertising across Google, Meta, and performance ad networks designed to capture high-intent buyers, optimize ad spend, and scale inbound customer acquisition.",
      tags: ["Google Ads", "Meta Ads", "PPC Campaigns", "Lead Generation", "Conversion Funnels", "Performance Analytics"],
      metric: "High ROI & Conversions",
    },
    {
      id: "graphic-design",
      number: "02",
      title: "Graphic Design",
      subtitle: "Visual Identity & Marketing Creatives",
      description:
        "Stunning visual communication, high-converting ad creatives, corporate collateral, vector graphics, and packaging design crafted with pixel precision.",
      tags: ["Ad Creatives", "Social Media Graphics", "Packaging Design", "Vector Art", "Brand Style Guides", "Typography"],
      metric: "Pixel-Perfect Visuals",
    },
    {
      id: "brand-promotion",
      number: "03",
      title: "Brand Promotion",
      subtitle: "Strategic Branding & Market Positioning",
      description:
        "Transforming businesses into recognized industry leaders through powerful brand storytelling, positioning strategies, commercial launches, and cross-channel brand promotion.",
      tags: ["Brand Architecture", "Campaign Direction", "Market Positioning", "Authority Building", "Brand Guidelines", "PR Activations"],
      metric: "Unmistakable Presence",
    },
    {
      id: "printing",
      number: "04",
      title: "Printing Solutions",
      subtitle: "Commercial & Merchandise Print Media",
      description:
        "Flawless physical print execution from luxury packaging and corporate stationery to outdoor flex, vinyl banners, custom apparel, and promotional merchandise.",
      tags: ["Packaging & Boxes", "Business Stationery", "Brochures & Catalogs", "Outdoor Vinyl & Flex", "Custom Merchandise", "Offset & Digital"],
      metric: "High-Fidelity Color Output",
    },
    {
      id: "social-media-reach",
      number: "05",
      title: "Social Media Reach",
      subtitle: "Viral Growth & Community Engagement",
      description:
        "Expanding brand visibility and viral organic engagement across Instagram, YouTube, and LinkedIn through trend-setting short-form reels and strategic community growth.",
      tags: ["Instagram Reach", "Trending Reels & Shorts", "Content Calendar", "Audience Growth", "Influencer Collabs", "Engagement Strategy"],
      metric: "Viral Scale & Retention",
    },
    {
      id: "web-app-development",
      number: "06",
      title: "Web & App Development",
      subtitle: "Full-Stack Next.js & Mobile Engineering",
      description:
        "Engineering ultra-fast, modern websites and native cross-platform iOS & Android mobile applications with cinematic UI, fluid animations, and robust backend integrations.",
      tags: ["Next.js 15 Web Apps", "iOS & Android Apps", "UI/UX Architecture", "E-Commerce Systems", "API Integration", "Sub-second Speed"],
      metric: "< 0.8s Load & Scale",
    },
  ],
  socials: {
    instagram: {
      handle: "@indoredigitalco",
      username: "indoredigitalco",
      url: "https://www.instagram.com/indoredigitalco/",
      followers: "24.8K",
      followersCount: 24800,
      following: "192",
      followingCount: 192,
      posts: "148",
      postsCount: 148,
      bio: "Indore's 360° Creative Agency • Digital Promotion, Graphic Design, Brand Promotion, Printing, Social Media Reach & Web/App Development.",
      callToAction: "Let's connect on Instagram",
      tagline: "Daily Drops, Design & Client Case Studies",
      reels: [
        {
          id: "reel-1",
          title: "Viral Social Media Reach & Performance Ads",
          views: "52.4K",
          likes: "3,890",
          comments: "184",
          audio: "Indore Digital Co • Original Audio",
          previewImage: "/brand-showcase.png",
          permalink: "https://www.instagram.com/indoredigitalco/",
        },
        {
          id: "reel-2",
          title: "Brand Promotion, Graphic Design & Packaging Launch",
          views: "34.1K",
          likes: "2,410",
          comments: "98",
          audio: "Sound of Innovation • IDC Studios",
          previewImage: "/brand-showcase.jpg",
          permalink: "https://www.instagram.com/indoredigitalco/",
        },
      ],
    },
    whatsapp: {
      phoneNumber: "919876543210", // International format without '+' or spaces for wa.me link
      displayNumber: "+91 98765 43210",
      defaultMessage:
        "Hello Indore Digital Co! I have an inquiry regarding your Digital Promotion, Graphic Design, Brand Promotion, Printing, Social Media Reach, and Web/App Development services.",
      statusText: "Typically replies in minutes",
    },
  },
} as const;
