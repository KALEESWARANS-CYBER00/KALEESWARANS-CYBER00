import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KALEESWARAN S | Cybersecurity Analyst & SOC Specialist",
  description:
    "Professional cybersecurity portfolio of KALEESWARAN S. Specializing in SOC operations, threat detection, and security research.",

  keywords: [
    "Cybersecurity",
    "SOC Analyst",
    "Security Researcher",
    "Ethical Hacking",
    "KALEESWARAN S",
  ],

  authors: [{ name: "KALEESWARAN S" }],

  openGraph: {
    title: "KALEESWARAN S | Cybersecurity Analyst & SOC Specialist",
    description:
      "Professional cybersecurity portfolio of KALEESWARAN S. Specializing in SOC operations, threat detection, and security research.",
    url: "https://yourdomain.com",
    siteName: "KALEESWARAN S Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/hacking.png",
  },
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
      <body className="min-h-full flex flex-col relative">
        <LoadingWrapper>{children}</LoadingWrapper>
      </body>
    </html>
  );
}