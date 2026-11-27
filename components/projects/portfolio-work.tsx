"use client";

import { type CSSProperties, useCallback, useEffect, useMemo, useLayoutEffect, useRef, useState } from "react";
import { isProjectList, type Project } from "@/lib/portfolio-types";
import { fetchSanityProjects } from "@/lib/sanity";
import ProjectDetails from "./project-details";
import ProjectDevice from "./project-device";

type Filter = "all" | "website" | "app";

const initialProjectLimit = 4;

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All work" },
  { id: "website", label: "Websites" },
  { id: "app", label: "Web applications" },
];

type PortfolioWorkProps = {
  initialProjects: Project[];
};

export default function PortfolioWork({ initialProjects }: PortfolioWorkProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const closeProject = useCallback(() => setSelectedTitle(null), []);
  const preconnectedOrigins = useRef(new Set<string>());
  const workRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const pendingReveal = useRef<{ visibleCount: number; scrollTop: number } | null>(null);

  function prefetchLiveProject(liveUrl?: string) {
    if (!liveUrl) return;

    const origin = new URL(liveUrl).origin;
    if (preconnectedOrigins.current.has(origin)) return;

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = origin;
    preconnect.crossOrigin = "anonymous";
    document.head.append(preconnect);
    preconnectedOrigins.current.add(origin);
  }

  function openProject(project: Project) {
    prefetchLiveProject(project.liveUrl);
    setSelectedTitle(project.title);
  }

  function selectFilter(nextFilter: Filter) {
    if (nextFilter === filter) return;

    const work = workRef.current;
    if (work && window.matchMedia("(min-width: 1000px)").matches) {
      // Reset before the shorter collection changes the sticky section height.
      window.scrollTo({ top: work.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    }
    setFilter(nextFilter);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      // Content edited in Sanity wins; the built-in list is the fallback.
      const sanityProjects = await fetchSanityProjects(controller.signal);
      if (sanityProjects && !controller.signal.aborted) {
        setProjects(sanityProjects);
        return;
      }
      try {
        const response = await fetch("/api/projects", { signal: controller.signal });
        if (!response.ok) return;
        const apiProjects: unknown = await response.json();
        if (isProjectList(apiProjects) && !controller.signal.aborted) setProjects(apiProjects);
      } catch {
        return;
      }
    }

    void loadProjects();
    return () => controller.abort();
  }, []);
  const matchingProjects = useMemo(
    () => projects
      .map((project, index) => ({ project, position: index + 1 }))
      .filter(({ project }) => filter === "all" || project.kind === filter),
    [filter, projects],
  );
  const visibleProjects = useMemo(
    () => expanded ? matchingProjects : matchingProjects.slice(0, initialProjectLimit),
    [expanded, matchingProjects],
  );
  const canReveal = visibleProjects.length < matchingProjects.length;
  const selectedProject = projects.find((project) => project.title === selectedTitle);

  useLayoutEffect(() => {
    const reveal = pendingReveal.current;
    if (reveal) {
      // Appending projects can move the browser's scroll anchor as the focused button is removed.
      window.scrollTo({ top: reveal.scrollTop, behavior: "instant" });
    }

    // Refresh the existing stepper after React has updated the height and project list.
    window.dispatchEvent(new Event("portfolio:work-change"));
    if (!reveal) return;

    const headings = showcaseRef.current?.querySelectorAll<HTMLElement>(".p-title");
    const desktop = window.matchMedia("(min-width: 1000px)").matches;
    const focusIndex = reveal.visibleCount - (desktop ? 1 : 0);
    headings?.[focusIndex]?.focus({ preventScroll: true });
    pendingReveal.current = null;
  }, [visibleProjects]);

  function revealProjects() {
    pendingReveal.current = { visibleCount: visibleProjects.length, scrollTop: window.scrollY };
    setExpanded(true);
  }

  return (
    <section id="work" ref={workRef} className="scene work" data-scene="work" style={{ "--n": visibleProjects.length } as CSSProperties}>
      <div className="work-sticky">
        <div className="work-head">
          <p className="label"><b>(02)</b> — Selected work</p>
          <div className="w-counter display" aria-hidden="true">
            <span className="w-cur"><span>{String(visibleProjects[0]?.position ?? 0).padStart(2, "0")}</span></span>
            <span className="w-tot">/ {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="w-bar"><i /></div>
        </div>

        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => {
            const count = item.id === "all" ? projects.length : projects.filter((project) => project.kind === item.id).length;
            const active = filter === item.id;
            return (
              <button
                aria-pressed={active}
                className={`work-filter${active ? " is-active" : ""}`}
                key={item.id}
                onClick={() => selectFilter(item.id)}
                type="button"
              >
                {item.label}<span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div className="projects" id="work-projects" ref={showcaseRef}>
          {visibleProjects.map(({ project, position }, index) => (
            <article className={`project${index === 0 ? " is-active" : ""}`} data-project-position={position} key={project.title}>
              <div className="p-copy">
                <p className="p-kicker">{project.category}</p>
                <h3 className="display p-title" tabIndex={-1}>{project.title}</h3>
                <p className="p-desc">{project.description}</p>
                <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <div className="p-links">
                  <button className="project-detail-link" onClick={() => openProject(project)} type="button">Project details ↗</button>
                  {project.liveUrl && <a className="live" href={project.liveUrl} rel="noreferrer" target="_blank">Live demo ↗</a>}
                  <a href={project.sourceUrl} rel="noreferrer" target="_blank">Source code ↗</a>
                </div>
              </div>
              <div
                aria-label={`Open ${project.title} project details`}
                className="p-visual p-visual--interactive"
                onClick={() => openProject(project)}
                onFocus={() => prefetchLiveProject(project.liveUrl)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
                onPointerEnter={() => prefetchLiveProject(project.liveUrl)}
                role="button"
                tabIndex={0}
              >
                <ProjectDevice project={project} sizes="(max-width: 999px) calc(100vw - 40px), 38vw" />
              </div>
            </article>
          ))}
        </div>

        {canReveal && (
          <button
            aria-controls="work-projects"
            aria-expanded={expanded}
            className="btn btn-red work-more"
            onClick={revealProjects}
            type="button"
          >
            View more projects <span aria-hidden="true">↓</span>
          </button>
        )}
        <span className="work-status" role="status">
          {expanded ? `${visibleProjects.length} projects shown` : ""}
        </span>
      </div>
      {selectedProject && <ProjectDetails project={selectedProject} onClose={closeProject} />}
    </section>
  );
}
