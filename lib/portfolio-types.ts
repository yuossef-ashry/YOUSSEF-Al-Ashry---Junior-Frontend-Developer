export type Project = {
  kind: "website" | "app";
  category: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  previewTitle: string;
  previewRows: string[];
  liveUrl?: string;
  sourceUrl: string;
};

export type ServicePackage = {
  id: string;
  name: string;
  label: string;
  startingPrice: number;
  openEnded: boolean;
  price: string;
  description: string;
  features: string[];
  projectType: string;
  budget: string;
  exampleTitle: string;
};

export const packageSelectionEvent = "portfolio:package-select";

export function isProjectList(value: unknown): value is Project[] {
  if (!Array.isArray(value)) return false;

  return value.every((project: unknown) => {
    if (typeof project !== "object" || project === null) return false;
    const item = project as Record<string, unknown>;
    return (item.kind === "website" || item.kind === "app")
      && [item.category, item.title, item.description, item.previewTitle, item.sourceUrl].every((field) => typeof field === "string")
      && Array.isArray(item.tags) && item.tags.every((tag: unknown) => typeof tag === "string")
      && Array.isArray(item.previewRows) && item.previewRows.every((row: unknown) => typeof row === "string")
      && (item.image === undefined || typeof item.image === "string")
      && (item.liveUrl === undefined || typeof item.liveUrl === "string");
  });
}
