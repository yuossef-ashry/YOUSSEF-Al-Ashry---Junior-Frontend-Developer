import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { siteUrl, googleSiteVerification } from "@/lib/site-config";
import { profile } from "@/lib/portfolio-data";
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
  authors: [{ name: profile.name, url: siteUrl.href }],
  verification: { google: googleSiteVerification },
  openGraph: {
    type: "website",
    url: "/",
    title: "Youssef Al-Ashry — Junior Frontend Developer",
    description: "Responsive, interactive interfaces with JavaScript, React, and TypeScript.",
    images: ["/images/profile/youssef-portrait.webp"],
  },
  twitter: {
    card: "summary_large_image",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: siteUrl.href,
            name: `${profile.name} — ${profile.role}`,
            mainEntity: {
              "@type": "Person",
              name: profile.name,
              alternateName: "يوسف العشري",
              url: siteUrl.href,
              jobTitle: profile.role,
              image: new URL("/images/profile/youssef-portrait.webp", siteUrl).href,
              sameAs: [profile.socialLinks.github, profile.socialLinks.linkedin, profile.socialLinks.instagram],
              knowsAbout: ["JavaScript", "React", "TypeScript", "Responsive web design"],
            },
          }).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
