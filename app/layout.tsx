import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indore Digital Co — Digital Promotion, Design, Printing & Web Development",
  description:
    "We build brands. We drive growth. Full-service agency in Indore delivering Digital Promotion, Graphic Design, Brand Promotion, Commercial Printing, Social Media Reach, and Web & App Development.",
  keywords: [
    "digital promotion",
    "graphic designer Indore",
    "graphic design agency",
    "brand promotion",
    "printing services Indore",
    "social media reach",
    "web development Indore",
    "app development",
    "creative digital agency",
    "Indore Digital Co",
  ],
  authors: [{ name: "Indore Digital Co" }],
  openGraph: {
    title: "Indore Digital Co — Full-Service Creative & Digital Agency",
    description:
      "Digital Promotion, Graphic Design, Brand Promotion, Printing, Social Media Reach & Web/App Development.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
