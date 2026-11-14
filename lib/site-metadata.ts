import type { Metadata } from "next";
import { profile } from "@/lib/portfolio-data";
import { googleSiteVerification, siteUrl } from "@/lib/site-config";

const title = `${profile.name} | ${profile.role}`;
const description = `${profile.name} — ${profile.role} in ${profile.location}, building responsive websites and interactive interfaces with JavaScript, React, and TypeScript.`;
const portrait = "/images/profile/youssef-portrait.webp";
const websiteId = new URL("/#website", siteUrl).href;
const personId = new URL("/#person", siteUrl).href;
const imageId = new URL("/#portrait", siteUrl).href;
const alternateNames = [profile.nameArabic, "Youssef Al Ashry"];

export const portfolioMetadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  applicationName: profile.name,
  title,
  description,
  authors: [{ name: profile.name, url: siteUrl.href }],
  verification: { google: googleSiteVerification },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    images: [{ url: portrait, width: 1122, height: 1402, alt: `Portrait of ${profile.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: portrait, alt: `Portrait of ${profile.name}` }],
  },
  icons: { icon: "/favicon.png" },
  other: { "theme-color": "#E1121B" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl.href,
      name: profile.name,
      alternateName: [...alternateNames, `${profile.name} Portfolio`],
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": new URL("/#profile", siteUrl).href,
      url: siteUrl.href,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      primaryImageOfPage: { "@id": imageId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: alternateNames,
      url: siteUrl.href,
      jobTitle: profile.role,
      image: { "@id": imageId },
      sameAs: [profile.socialLinks.github, profile.socialLinks.linkedin, profile.socialLinks.instagram],
      knowsAbout: ["JavaScript", "React", "TypeScript", "Responsive web design"],
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: new URL(portrait, siteUrl).href,
      contentUrl: new URL(portrait, siteUrl).href,
      caption: `Portrait of ${profile.name}`,
      width: 1122,
      height: 1402,
    },
  ],
};

export const portfolioStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");
