import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-scene="home">
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
