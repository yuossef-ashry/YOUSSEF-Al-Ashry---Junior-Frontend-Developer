"use client";

import { useEffect, useRef, useState } from "react";
import CertificateViewer from "@/components/certificates/certificate-viewer";
import type { Milestone } from "@/lib/portfolio-types";
import { fetchSanityMilestones } from "@/lib/sanity";

export default function JourneySteps({ initialMilestones }: { initialMilestones: Milestone[] }) {
  const [milestones, setMilestones] = useState(initialMilestones);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetchSanityMilestones(controller.signal).then((items) => {
      if (items && !controller.signal.aborted) setMilestones(items);
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // Steps added from Sanity appear after the scroll-reveal observer has started, so show them directly.
    listRef.current?.querySelectorAll(".rv:not(.in)").forEach((element) => element.classList.add("in"));
  }, [milestones]);

  return (
    <ol className="j-steps" ref={listRef}>
      {milestones.map((milestone, index) => (
        <li className="j-step rv" data-year={milestone.year} key={`${milestone.title}-${index}`}>
          <span className="j-when">{milestone.label}</span>
          <h3>{milestone.title}</h3>
          <p className="j-where">{milestone.where}</p>
          <p>{milestone.description}</p>
          <p className="j-score">{milestone.outcome}</p>
          {milestone.certificateImage && <CertificateViewer image={milestone.certificateImage} title={milestone.title} />}
          {milestone.href && <p className="j-where"><a href={milestone.href} target="_blank" rel="noreferrer">Verify certificate ↗</a></p>}
        </li>
      ))}
    </ol>
  );
}
