import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const displayFont = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-anton" });
const bodyFont = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const monoFont = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], display: "swap", preload: false, variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  title: "Youssef Al-Ashry — Junior Frontend Developer",
  description:
    "Youssef Al-Ashry — Junior Frontend Developer building responsive, interactive interfaces with JavaScript, React, and TypeScript.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Youssef Al-Ashry — Junior Frontend Developer",
    description: "Responsive, interactive interfaces with JavaScript, React, and TypeScript.",
    images: ["/images/profile/youssef-portrait.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
  other: {
    "theme-color": "#E1121B",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body data-scene="home">
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
