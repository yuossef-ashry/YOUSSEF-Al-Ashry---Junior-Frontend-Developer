"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-types";

type ProjectDeviceProps = { project: Project; sizes: string };

function ProjectShot({ project, src, sizes, onError }: ProjectDeviceProps & {
  src: string;
  onError?: () => void;
}) {
  return (
    <Image
      className="shot"
      src={src}
      alt={`${project.title} project preview`}
      width={project.imageWidth ?? 1535}
      height={project.imageHeight ?? 862}
      sizes={sizes}
      onError={onError}
    />
  );
}

function CosmosProjectShot({ project, sizes }: ProjectDeviceProps) {
  const [failed, setFailed] = useState(false);

  if (project.image && !failed) {
    return <ProjectShot project={project} src={project.image} sizes={sizes} onError={() => setFailed(true)} />;
  }

  return (
    <span className="project-fallback project-fallback--neutral">
      <span>Project preview</span>
      <strong>Preview unavailable</strong>
      <span className="project-fallback-description">Open project details for more information.</span>
    </span>
  );
}

export default function ProjectDevice({ project, sizes }: ProjectDeviceProps) {
  const isCosmos = project.title === "Cosmos Space Dashboard";
  const aspectRatio = isCosmos ? `${project.imageWidth ?? 1535} / ${project.imageHeight ?? 862}` : undefined;

  return (
    <span className="device">
      <span className="d-bar">
        <span>{project.title}</span>
        <b aria-hidden="true">↗</b>
      </span>
      <span className="d-body" style={aspectRatio ? { aspectRatio } : undefined}>
        {isCosmos ? (
          <CosmosProjectShot key={project.image} project={project} sizes={sizes} />
        ) : project.image ? (
          <ProjectShot project={project} src={project.image} sizes={sizes} />
        ) : (
          <span className="project-fallback">
            <span>Project preview</span>
            <strong>{project.previewTitle}</strong>
            <span className="project-fallback-description">{project.previewRows.join(" · ")}</span>
          </span>
        )}
      </span>
    </span>
  );
}
