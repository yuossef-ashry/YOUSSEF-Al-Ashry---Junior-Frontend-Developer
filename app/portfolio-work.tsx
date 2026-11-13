"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/portfolio-data";
import ProjectPreview from "./project-preview";

type Filter = "all" | "website" | "app";

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
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const preconnectedOrigins = useRef(new Set<string>());

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

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { signal: controller.signal });
        if (!response.ok) return;
        const apiProjects: Project[] = await response.json();
        setProjects(apiProjects);
      } catch (error) {
        if ((error as Error).name !== "AbortError") return;
      }
    }

    void loadProjects();
    return () => controller.abort();
  }, []);
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.kind === filter),
    [filter, projects],
  );
  const selectedProject = projects.find((project) => project.title === selectedTitle);

  useEffect(() => {
    const work = document.querySelector<HTMLElement>("#work");
    work?.style.setProperty("--n", String(visibleProjects.length));
    window.dispatchEvent(new Event("portfolio:filter-change"));
  }, [visibleProjects.length]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTitle(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const projectModal = selectedProject ? createPortal(
    <div
      className="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) setSelectedTitle(null);
      }}
    >
      <section className="project-modal">
        <button ref={closeButtonRef} aria-label="Close project details" className="project-modal-close" onClick={() => setSelectedTitle(null)} type="button">×</button>
        <p className="p-kicker">{selectedProject.category}</p>
        <h2 className="display" id="project-modal-title">{selectedProject.title}</h2>
        <p className="project-modal-description">{selectedProject.description}</p>
        {(selectedProject.liveUrl || selectedProject.image) && <ProjectPreview key={selectedProject.title} project={selectedProject} />}
        <h3>Highlights</h3>
        <ul className="project-modal-highlights">
          {selectedProject.previewRows.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ul className="tags project-modal-tags">{selectedProject.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-modal-links">
          {selectedProject.liveUrl && <a className="btn btn-red" href={selectedProject.liveUrl} rel="noreferrer" target="_blank">Live demo ↗</a>}
          <a className="btn btn-ghost" href={selectedProject.sourceUrl} rel="noreferrer" target="_blank">Source code ↗</a>
        </div>
      </section>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {filters.map((item) => {
          const count = item.id === "all" ? projects.length : projects.filter((project) => project.kind === item.id).length;
          const active = filter === item.id;
          return (
            <button
              aria-pressed={active}
              className={`work-filter${active ? " is-active" : ""}`}
              key={item.id}
              onClick={() => setFilter(item.id)}
              type="button"
            >
              {item.label}<span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="projects">
        {visibleProjects.map((project, index) => (
          <article className={`project${index === 0 ? " is-active" : ""}`} data-i={index} key={project.title}>
            <div className="p-copy">
              <p className="p-kicker">{project.category}</p>
              <h3 className="display p-title">{project.title}</h3>
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
              <div className="device">
                <div className="d-bar"><i /><i /><i /><span>{project.title.toLowerCase()}</span></div>
                <div className="d-body">
                  {project.image ? (
                    <Image className="shot" src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 999px) 100vw, 50vw" />
                  ) : (
                    <div className="project-fallback">
                      <span>Project preview</span>
                      <strong>{project.previewTitle}</strong>
                      <p>{project.previewRows.join(" · ")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {projectModal}
    </>
  );
}
