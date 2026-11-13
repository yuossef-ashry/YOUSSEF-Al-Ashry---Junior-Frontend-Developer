"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTitle(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

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
                <button className="project-detail-link" onClick={() => setSelectedTitle(project.title)} type="button">Project details ↗</button>
                {project.liveUrl && <a className="live" href={project.liveUrl} rel="noreferrer" target="_blank">Live demo ↗</a>}
                <a href={project.sourceUrl} rel="noreferrer" target="_blank">Source code ↗</a>
              </div>
            </div>
            <div className="p-visual">
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

      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedTitle(null)} role="presentation">
          <section
            aria-labelledby="project-modal-title"
            aria-modal="true"
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button aria-label="Close project details" className="project-modal-close" onClick={() => setSelectedTitle(null)} type="button">×</button>
            <p className="p-kicker">{selectedProject.category}</p>
            <h2 className="display" id="project-modal-title">{selectedProject.title}</h2>
            <p className="project-modal-description">{selectedProject.description}</p>
            {selectedProject.image && <Image className="project-modal-image" src={selectedProject.image} alt={`${selectedProject.title} project preview`} width={1200} height={800} sizes="(max-width: 760px) 100vw, 760px" />}
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
        </div>
      )}
    </>
  );
}
