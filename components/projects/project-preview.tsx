"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Laptop, Tablet, Smartphone } from "lucide-react";
import type { Project } from "@/lib/portfolio-types";
import { previewDevices, type PreviewDevice } from "@/lib/preview-devices";

const deviceIcons = { laptop: Laptop, tablet: Tablet, phone: Smartphone };

type ProjectPreviewProps = {
  project: Pick<Project, "title" | "liveUrl" | "image">;
};

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const [deviceId, setDeviceId] = useState<PreviewDevice>("laptop");
  const [previewState, setPreviewState] = useState<"loading" | "slow" | "ready">(project.liveUrl ? "loading" : "ready");
  const [attempt, setAttempt] = useState(0);
  const liveProjectLinkRef = useRef<HTMLAnchorElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const device = previewDevices.find((item) => item.id === deviceId) ?? previewDevices[0];

  function retryPreview() {
    liveProjectLinkRef.current?.focus({ preventScroll: true });
    setPreviewState("loading");
    setAttempt((current) => current + 1);
  }

  useEffect(() => {
    if (!project.liveUrl) return;
    const timeout = window.setTimeout(() => {
      setPreviewState((current) => current === "loading" ? "slow" : current);
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, [project.liveUrl, attempt]);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const updateScale = () => {
      screen.style.setProperty("--preview-scale", String(screen.getBoundingClientRect().width / device.width));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(screen);
    return () => observer.disconnect();
  }, [device.width]);

  return (
    <div className="project-modal-preview">
      <div className="project-preview-toolbar">
        <div className="project-device-switch" role="group" aria-label="Preview device">
          {previewDevices.map((option) => {
            const Icon = deviceIcons[option.id];
            const disabled = !project.liveUrl && option.id !== "laptop";
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={option.id === deviceId}
                disabled={disabled}
                title={disabled ? "Live preview unavailable" : `${option.label} (${option.width} x ${option.height})`}
                onClick={() => setDeviceId(option.id)}
              >
                <Icon size={17} aria-hidden="true" /><span>{option.label}</span>
              </button>
            );
          })}
        </div>
        <span className="project-preview-size" aria-live="polite">{project.liveUrl ? `${device.width} × ${device.height}` : "Screenshot"}</span>
        {project.liveUrl && <a ref={liveProjectLinkRef} className="project-preview-open" href={project.liveUrl} target="_blank" rel="noreferrer">Open live project ↗</a>}
      </div>
      {project.liveUrl && previewState !== "ready" && (
        <div className="project-preview-loading">
          <p role="status">{previewState === "loading" ? "Loading preview…" : "The preview is taking longer than expected."}</p>
          {previewState !== "loading" && <>
            <a className="project-preview-open" href={project.liveUrl} target="_blank" rel="noreferrer">Open live project ↗</a>
            <button type="button" onClick={retryPreview}>Retry preview</button>
          </>}
        </div>
      )}
      <div className={`project-device project-device--${device.id}`} style={{
        "--preview-width": `${device.width}px`,
        "--preview-height": `${device.height}px`,
        "--preview-ratio": `${device.width} / ${device.height}`,
      } as CSSProperties}>
        <div className="project-device__frame">
          <div className="project-device__screen" ref={screenRef}>
            {project.liveUrl ? (
              <iframe
                key={attempt}
                className="project-device__viewport"
                src={project.liveUrl}
                title={`${project.title} live preview`}
                width={device.width}
                height={device.height}
                loading="eager"
                onLoad={() => setPreviewState("ready")}
                onError={() => setPreviewState("slow")}
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
        <div className="project-device__base" aria-hidden="true" hidden={device.id !== "laptop"} />
      </div>
    </div>
  );
}
