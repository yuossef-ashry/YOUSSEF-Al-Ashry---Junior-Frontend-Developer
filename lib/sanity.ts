import { isProjectList, type Milestone, type Project } from "./portfolio-types";

// Public, read-only content from Sanity (project "Youssef El-Ashry", dataset "production").
// The site always ships with built-in content (lib/portfolio-data.ts). Content from Sanity
// replaces it in the visitor's browser when available, so no redeploy is needed for edits.
const projectId = "yre6gmbc";
const dataset = "production";
const endpoint = `https://${projectId}.apicdn.sanity.io/v2025-01-01/data/query/${dataset}`;

const projectsQuery = `*[_type == "project" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc) {
  title, kind, category, description, tags, previewTitle, previewRows, liveUrl, sourceUrl,
  "image": image.asset->url,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height
}`;

const milestonesQuery = `*[_type == "milestone" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc) {
  title, where, year, label, description, outcome, href,
  "certificateImage": certificateImage.asset->url
}`;

async function query<T>(groq: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const response = await fetch(`${endpoint}?query=${encodeURIComponent(groq)}`, { signal });
    if (!response.ok) return null;
    const body = (await response.json()) as { result?: T };
    return body.result ?? null;
  } catch {
    return null;
  }
}

const clean = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== null && entry !== undefined)) as T;

export async function fetchSanityProjects(signal?: AbortSignal): Promise<Project[] | null> {
  const rows = await query<Array<Record<string, unknown>>>(projectsQuery, signal);
  if (!rows || rows.length === 0) return null;
  const projects = rows.map((row) => clean({
    ...row,
    tags: Array.isArray(row.tags) ? row.tags : [],
    previewTitle: typeof row.previewTitle === "string" && row.previewTitle ? row.previewTitle : String(row.title ?? ""),
    previewRows: Array.isArray(row.previewRows) ? row.previewRows : [],
    sourceUrl: typeof row.sourceUrl === "string" ? row.sourceUrl : "",
  }));
  return isProjectList(projects) ? projects : null;
}

export async function fetchSanityMilestones(signal?: AbortSignal): Promise<Milestone[] | null> {
  const rows = await query<Array<Record<string, unknown>>>(milestonesQuery, signal);
  if (!rows || rows.length === 0) return null;
  const milestones = rows.map((row) => clean(row));
  return milestones.every((item) => ["title", "where", "year", "label", "description", "outcome"].every((key) => typeof item[key] === "string"))
    ? (milestones as unknown as Milestone[])
    : null;
}
