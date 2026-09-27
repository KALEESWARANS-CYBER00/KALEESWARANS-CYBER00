import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleeswaran.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KALEESWARAN S | Cybersecurity, Cloud Security & Full-Stack Engineer",
    template: "%s | KALEESWARAN S",
  },
  description:
    "Official portfolio of KALEESWARAN S — Red Team Security Specialist, Penetration Tester, Cloud Security Architect, and Full-Stack Software Engineer. Ranked Top 4% Globally on TryHackMe. Specializing in offensive security, vulnerability assessment, exploit development, and resilient cloud-native systems.",
  keywords: [
    "KALEESWARAN S",
    "Kaleeswaran",
    "Cybersecurity Engineer",
    "Cloud Security Specialist",
    "Full-Stack Software Engineer",
    "Red Team Security Specialist",
    "Penetration Tester",
    "Vulnerability Researcher",
    "Bug Bounty Researcher",
    "Exploit Development",
    "TryHackMe Top 4%",
    "Application Security",
    "Cloud Infrastructure Security",
    "Linux Security",
    "AWS Container Security",
    "Docker Hardening",
    "Offensive Security Engineer",
    "EDR Engineering",
  ],
  authors: [{ name: "KALEESWARAN S", url: siteUrl }],
  creator: "KALEESWARAN S",
  publisher: "KALEESWARAN S",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    title: "KALEESWARAN S | Cybersecurity, Cloud Security & Full-Stack Engineer",
    description:
      "Red Team Security Specialist, Penetration Tester, Cloud Security Architect & Full-Stack Software Engineer. Ranked Top 4% Globally on TryHackMe.",
    siteName: "KALEESWARAN S Portfolio",
    images: [
      {
        url: "/hero-portrait.png",
        width: 1200,
        height: 630,
        alt: "KALEESWARAN S — Cybersecurity, Cloud & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KALEESWARAN S | Cybersecurity, Cloud Security & Full-Stack Engineer",
    description:
      "Red Team Security Specialist, Penetration Tester, Cloud Security Architect & Full-Stack Software Engineer. TryHackMe Top 4% Global.",
    images: ["/hero-portrait.png"],
    creator: "@KALEESWARANS",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/hero-portrait.png",
    shortcut: "/hero-portrait.png",
    apple: "/hero-portrait.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#09090b] text-[#f7f4ee]">
        <LoadingWrapper>{children}</LoadingWrapper>
      </body>
    </html>
  );
}