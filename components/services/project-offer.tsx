"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Code2, Globe2, MessageCircle, Smartphone } from "lucide-react";
import { packageSelectionEvent, type Project, type ServicePackage } from "@/lib/portfolio-types";
import ProjectDetails from "@/components/projects/project-details";

type Offer = ServicePackage & {
  example: Project;
};

export default function ProjectOffer({ offers, whatsappUrl }: { offers: Offer[]; whatsappUrl: string }) {
  const [selectedId, setSelectedId] = useState(offers[0].id);
  const [exampleOpen, setExampleOpen] = useState(false);
  const closeExample = useCallback(() => setExampleOpen(false), []);
  const selected = offers.find((offer) => offer.id === selectedId) ?? offers[0];
  const whatsappDraft = new URL(whatsappUrl);
  whatsappDraft.searchParams.set("text", `Hi Youssef, I'm interested in the ${selected.name} package (${selected.price}). Can we discuss my project?`);

  function selectPackage() {
    window.dispatchEvent(new CustomEvent(packageSelectionEvent, { detail: { id: selected.id } }));
  }

  return (
    <div className="project-offer">
      <div className="offer-story">
        <p className="label"><b>(08)</b> — Your next launch</p>
        <h2 className="display offer-title" id="offer-title">Your idea.<br />Built to<br /><span className="red">stand out.</span></h2>
        <p className="offer-intro">A personal portfolio, a business website, or a React application. Let&apos;s turn what you have in mind into an experience people enjoy using.</p>
        <div className="offer-actions">
          <a className="btn btn-red" href={whatsappDraft.href} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />Let&apos;s talk<ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="offer-work-link" href="#work">Explore my work <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="offer-principles" aria-label="Built around your project">
          <span><Globe2 size={16} aria-hidden="true" />Your identity</span>
          <span><Smartphone size={16} aria-hidden="true" />Every screen</span>
          <span><Code2 size={16} aria-hidden="true" />Thoughtful code</span>
        </div>
        <button className="offer-example" type="button" onClick={() => setExampleOpen(true)} aria-label={`View ${selected.example.title} project example`} key={selected.example.title}>
          <span className="offer-example-image">
            {selected.example.image && <Image src={selected.example.image} alt="" fill sizes="120px" />}
          </span>
          <span><span className="offer-caption">A look at the work</span><strong>{selected.example.title}</strong><span className="offer-example-link">Explore this project <ArrowUpRight size={14} aria-hidden="true" /></span></span>
          <span className="offer-example-number" aria-hidden="true">0{offers.indexOf(selected) + 1}</span>
        </button>
      </div>

      <div className="offer-panel">
        <div className="offer-window-bar"><span className="offer-window-dots" aria-hidden="true"><i /><i /><i /></span><span>YOUR NEXT CHAPTER / BUILD 01</span><Code2 size={15} aria-hidden="true" /></div>
        <div className="offer-panel-inner">
          <div className="offer-selector" role="group" aria-label="Choose a project package">
            {offers.map((offer) => <button type="button" aria-pressed={offer.id === selected.id} onClick={() => setSelectedId(offer.id)} key={offer.id}>{offer.label}</button>)}
          </div>
          <div className="offer-package" key={selected.id}>
            <div className="offer-package-heading"><h3>{selected.name}</h3><span className="offer-caption">Built around you ↗</span></div>
            <p className="offer-price" aria-live="polite"><span>Starting at · EGP</span><strong>{selected.startingPrice.toLocaleString("en-US")}<em>{selected.openEnded ? "+" : "."}</em></strong></p>
            <p className="offer-description">{selected.description}</p>
            <ul className="offer-features">{selected.features.map((feature) => <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
          </div>
          <a className="btn offer-start" href="#contact-project-form" onClick={selectPackage}>Start with {selected.name}<ArrowUpRight size={19} aria-hidden="true" /></a>
          <p className="offer-note">One-time starting prices. Scope and final quote agreed before work begins.</p>
        </div>
        <div className="offer-panel-footer"><span className="offer-status-dot" aria-hidden="true" /><span>From the first idea to the final handover.</span><span aria-hidden="true">YA.</span></div>
      </div>
      {exampleOpen && <ProjectDetails project={selected.example} onClose={closeExample} />}
    </div>
  );
}
