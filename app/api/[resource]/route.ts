import { portfolioData, type PortfolioResource } from "@/lib/portfolio-data";

export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ resource: string }>;
};

function isPortfolioResource(resource: string): resource is PortfolioResource {
  return resource in portfolioData;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { resource } = await params;

  if (!isPortfolioResource(resource)) {
    return Response.json({ error: "Portfolio resource not found." }, { status: 404 });
  }

  return Response.json(portfolioData[resource], {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
