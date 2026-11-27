"use client";

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectDevice from "@/components/projects/project-device";
import ProjectDetails from "@/components/projects/project-details";
import type { Project, ServiceDetail } from "@/lib/portfolio-types";

type ServiceWithExample = ServiceDetail & { example?: Project };

const serviceExampleSizes = "(max-width: 480px) calc(100vw - 88px), 400px";

function ServicePanelContent({ service, titleId, onOpenExample }: {
  service: ServiceWithExample;
  titleId: string;
  onOpenExample: (project: Project) => void;
}) {
  const { example } = service;
  const clientProjectTag = service.id === "websites" && example?.image
    ? example.tags.find((tag) => tag === "Client project")
    : undefined;
  const exampleCaption = service.id === "web-apps" ? "Skills demo · live-data dashboard" : undefined;
  const exampleNoteId = `${titleId}-example-note`;
  return (
    <>
      <div className="service-detail-content">
        <div className="service-detail-intro">
          <p className="service-detail-kicker">{service.layer}</p>
          <h3 className="display" id={titleId}>{service.title}</h3>
          <p className="service-detail-description">{service.description}</p>
          <ul className="service-detail-features">
            {service.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {example && (
          <button
            aria-haspopup="dialog"
            aria-label={`Open ${example.title} project example`}
            aria-describedby={clientProjectTag || exampleCaption ? exampleNoteId : undefined}
            className="service-example"
            onClick={() => onOpenExample(example)}
            type="button"
          >
            {exampleCaption && <small className="offer-note" id={exampleNoteId}>{exampleCaption}</small>}
            {clientProjectTag && example.image ? (
              <span className="device">
                <span className="d-bar">
                  <span>{example.title}</span>
                  <span className="cert-ok" id={exampleNoteId}>{clientProjectTag}</span>
                  <b aria-hidden="true">↗</b>
                </span>
                <span className="d-body">
                  <Image
                    className="shot"
                    src={example.image}
                    alt={`${example.title} project preview`}
                    width={example.imageWidth ?? 1535}
                    height={example.imageHeight ?? 862}
                    sizes={serviceExampleSizes}
                  />
                </span>
              </span>
            ) : <ProjectDevice project={example} sizes={serviceExampleSizes} />}
          </button>
        )}
      </div>
      {service.details?.length ? (
        <div className="service-detail-more">
          {service.details.map((detail) => (
            <article className="service-detail-card" key={detail.title}>
              <h4>{detail.title}</h4>
              <p>{detail.description}</p>
              {detail.items?.length ? (
                <ul>
                  {detail.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
      <div className="service-detail-footer">
        <a className="btn btn-red service-detail-cta" href="#contact-project-form">
          {service.id === "commerce" ? "Discuss a custom solution" : "Discuss this service"}
          <i aria-hidden="true">↗</i>
        </a>
      </div>
    </>
  );
}

export default function ServiceExplorer({ services }: { services: ServiceWithExample[] }) {
  const [pinned, setPinned] = useState(false);
  const [openExample, setOpenExample] = useState<Project | null>(null);
  const closeExample = useCallback(() => setOpenExample(null), []);
  const [selection, setSelection] = useState({ index: 0, previousIndex: -1 });
  const explorerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const topInsetRef = useRef(100);

  useLayoutEffect(() => {
    const explorer = explorerRef.current;
    const stack = stackRef.current;
    if (!explorer || !stack) return;

    const header = document.querySelector<HTMLElement>(".nav");
    const canAnimate = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(stack.children) as HTMLElement[];

    function measure() {
      if (!explorer) return;
      const top = (header?.offsetHeight ?? 86) + 14;
      const tallestCard = Math.max(0, ...cards.map((card) => card.offsetHeight));
      // Leave space below the card for its entrance animation and a bottom gutter.
      const availableHeight = window.innerHeight - top - 40;

      topInsetRef.current = top;
      explorer.style.setProperty("--service-top", `${top}px`);
      explorer.style.setProperty("--service-card-height", `${tallestCard}px`);
      setPinned(canAnimate.matches && cards.length > 1 && tallestCard <= availableHeight);
    }

    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("resize", measure);
    canAnimate.addEventListener("change", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      canAnimate.removeEventListener("change", measure);
    };
  }, [services]);

  useEffect(() => {
    const panels = panelsRef.current;
    const stack = stackRef.current;
    if (!panels || !stack) return;

    const cards = Array.from(stack.children);
    let frame: number | null = null;

    function syncSelection() {
      frame = null;
      if (!panels || !stack) return;

      let index = 0;
      if (pinned) {
        const travel = panels.offsetHeight - stack.offsetHeight;
        const distance = topInsetRef.current - panels.getBoundingClientRect().top;
        const progress = travel > 0 ? distance / travel : 0;
        index = Math.max(0, Math.min(cards.length - 1, Math.floor(progress * cards.length)));
      } else {
        const availableHeight = window.innerHeight - topInsetRef.current;
        const readingLine = topInsetRef.current + Math.min(120, availableHeight / 4);
        cards.forEach((card, cardIndex) => {
          if (card.getBoundingClientRect().top <= readingLine) index = cardIndex;
        });
      }

      setSelection((current) => current.index === index
        ? current
        : { index, previousIndex: pinned ? current.index : -1 });
    }

    function scheduleSync() {
      if (frame === null) frame = window.requestAnimationFrame(syncSelection);
    }

    syncSelection();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    const observer = new ResizeObserver(scheduleSync);
    observer.observe(panels);
    observer.observe(stack);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [pinned, services]);

  function scrollToService(index: number) {
    const panels = panelsRef.current;
    const stack = stackRef.current;
    if (!panels || !stack) return;

    const travel = panels.offsetHeight - stack.offsetHeight;
    const sectionTop = window.scrollY + panels.getBoundingClientRect().top;
    const distance = travel * (index + 0.12) / services.length;
    window.scrollTo({ top: sectionTop - topInsetRef.current + distance, behavior: "smooth" });
  }

  if (services.length === 0) return null;

  return (
    <div
      className="service-explorer"
      data-pinned={pinned}
      ref={explorerRef}
      style={{ "--service-count": services.length } as CSSProperties}
    >
      <div className="service-rail">
        <nav className="service-timeline" aria-label="Service areas">
          {services.map((service, index) => {
            const active = index === selection.index;
            const panelId = `service-${service.id}`;
            const className = `service-step-button${active ? " is-selected" : ""}`;
            const label = (
              <>
                <span className="service-step-number" aria-hidden="true">{service.number}</span>
                <span className="service-step-copy">
                  <span className="service-step-title">{service.title}</span>
                  <span className="service-step-summary">{service.summary}</span>
                </span>
              </>
            );

            return pinned ? (
              <button
                aria-label={service.title}
                aria-controls={panelId}
                aria-pressed={active}
                className={className}
                key={service.id}
                onClick={() => scrollToService(index)}
                type="button"
              >
                {label}
              </button>
            ) : (
              <a aria-label={service.title} aria-current={active ? "location" : undefined} className={className} href={`#${panelId}`} key={service.id}>
                {label}
              </a>
            );
          })}
        </nav>
        <a className="service-work-link" href="#work">
          View selected work <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="service-panels" ref={panelsRef}>
        <div className="service-panel-stack" ref={stackRef}>
          {services.map((service, index) => {
            const active = index === selection.index;
            const hidden = pinned && !active;
            const leaving = hidden && index === selection.previousIndex;
            const panelId = `service-${service.id}`;
            const titleId = `${panelId}-title`;

            return (
              <article
                aria-hidden={hidden || undefined}
                aria-labelledby={titleId}
                className={`service-detail-panel${active ? " is-active" : ""}${leaving ? " is-leaving" : ""}`}
                id={panelId}
                inert={hidden}
                key={service.id}
              >
                <ServicePanelContent service={service} titleId={titleId} onOpenExample={setOpenExample} />
              </article>
            );
          })}
        </div>
      </div>
      {openExample && <ProjectDetails project={openExample} onClose={closeExample} />}
    </div>
  );
}
