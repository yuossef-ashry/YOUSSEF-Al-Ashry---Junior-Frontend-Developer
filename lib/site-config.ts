import pagesConfig from "@/cloudflare-pages.json";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || pagesConfig.siteUrl,
);

// This is a public ownership tag, supplied by the site owner, not a secret.
export const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
  || "zCYx7VY-bClmwuU7ryei2TqaK7q33fT0wkZGaaBmji4";
