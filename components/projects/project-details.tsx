"use client";

import { X } from "lucide-react";
import type { Project } from "@/lib/portfolio-types";
import Modal from "@/components/ui/modal";
import ProjectPreview from "./project-preview";

type ProjectDetailsProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <Modal open onClose={onClose} titleId="project-modal-title" backdropClassName="project-modal-backdrop" className="project-modal">
      <header className="project-modal-header">
        <div>
          <p className="p-kicker">{project.category}</p>
          <h2 className="display" id="project-modal-title">{project.title}</h2>
        </div>
        <button data-modal-close aria-label="Close project details" title="Close project details" className="project-modal-close" onClick={onClose} type="button"><X size={22} aria-hidden="true" /></button>
      </header>
      <div className="project-modal-content">
        <p className="project-modal-description">{project.description}</p>
        {(project.liveUrl || project.image) && <ProjectPreview key={project.title} project={project} />}
        <h3>Highlights</h3>
        <ul className="project-modal-highlights">{project.previewRows.map((item) => <li key={item}>{item}</li>)}</ul>
        <ul className="tags project-modal-tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-modal-links">
          {project.liveUrl && <a className="btn btn-red" href={project.liveUrl} rel="noreferrer" target="_blank">Live demo ↗</a>}
          <a className="btn btn-ghost" href={project.sourceUrl} rel="noreferrer" target="_blank">Source code ↗</a>
        </div>
      </div>
    </Modal>
  );
}
