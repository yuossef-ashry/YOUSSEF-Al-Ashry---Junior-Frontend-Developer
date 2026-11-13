"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

type ProjectPreviewProps = {
  project: Pick<Project, "title" | "liveUrl" | "image">;
};

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const updateScale = () => {
      screen.style.setProperty("--preview-scale", String(screen.clientWidth / DESKTOP_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-modal-preview">
      <div className="project-laptop">
        <div className="project-laptop__lid">
          <div className="project-laptop__screen" ref={screenRef}>
            {project.liveUrl ? (
              <iframe
                className="project-laptop__viewport"
                src={project.liveUrl}
                title={`${project.title} live preview`}
                width={DESKTOP_WIDTH}
                height={DESKTOP_HEIGHT}
                loading="eager"
              />
            ) : project.image ? (
              <Image
                className="project-modal-image"
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 1120px) 90vw, 1000px"
              />
            ) : null}
          </div>
        </div>
        <div className="project-laptop__base" aria-hidden="true" />
      </div>
    </div>
  );
}
