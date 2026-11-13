import { portfolioData } from "@/lib/portfolio-data";

export const revalidate = 3600;

export function GET() {
  return Response.json(portfolioData, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
