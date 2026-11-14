import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { portfolioMetadata, portfolioStructuredData } from "@/lib/site-metadata";
import "./globals.css";

const displayFont = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-anton" });
const bodyFont = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const monoFont = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], display: "swap", preload: false, variable: "--font-jetbrains" });

export const metadata = portfolioMetadata;

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
          dangerouslySetInnerHTML={{ __html: portfolioStructuredData }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
