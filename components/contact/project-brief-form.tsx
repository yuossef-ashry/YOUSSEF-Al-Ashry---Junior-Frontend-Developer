"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { packageSelectionEvent, type ServicePackage } from "@/lib/portfolio-types";

type PackageChoice = Pick<ServicePackage, "id" | "name" | "projectType" | "budget">;

export default function ProjectBriefForm({ whatsappUrl, packageChoices }: { whatsappUrl: string; packageChoices: PackageChoice[] }) {
  const [draftUrl, setDraftUrl] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const selectPackage = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const choice = packageChoices.find((item) => item.id === event.detail?.id);
      const form = formRef.current;
      if (!choice || !form) return;
      const projectType = form.elements.namedItem("projectType") as HTMLSelectElement | null;
      const budget = form.elements.namedItem("budget") as HTMLSelectElement | null;
      if (projectType) projectType.value = choice.projectType;
      if (budget) budget.value = choice.budget;
      setSelectedPackage(choice.name);
      setDraftUrl(null);
    };
    window.addEventListener(packageSelectionEvent, selectPackage);
    return () => window.removeEventListener(packageSelectionEvent, selectPackage);
  }, [packageChoices]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const requiredFields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]');
    for (const field of requiredFields) {
      field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
    }
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const fieldValue = (name: string) => String(formData.get(name) ?? "").trim();
    const details = [
      "Hi Youssef, I'd like to discuss a project.",
      ...(selectedPackage ? [`Package: ${selectedPackage}`] : []),
      `Name: ${fieldValue("name")}`,
      `Email or phone: ${fieldValue("contact")}`,
      `Project type: ${fieldValue("projectType")}`,
      `Budget: ${fieldValue("budget") || "Not sure yet"}`,
      `Details: ${fieldValue("details")}`,
    ].join("\n");

    const url = `${whatsappUrl}?text=${encodeURIComponent(details)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setDraftUrl(url);
  }

  return (
    <form className="contact-brief" id="contact-project-form" ref={formRef} onSubmit={handleSubmit} onInput={(event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
      if (field instanceof HTMLSelectElement) setSelectedPackage(null);
      setDraftUrl(null);
    }}>
      <div className="brief-heading">
        <p className="label"><b>PROJECT BRIEF</b> — 01 / 01</p>
        <h2 className="display">What are you building?</h2>
        <p>This opens WhatsApp with a draft for you to review before sending.</p>
      </div>
      {selectedPackage && <p className="brief-selection" role="status"><span>Selected package</span><strong>{selectedPackage}</strong><span>You can adjust the details below.</span></p>}
      <div className="brief-grid">
        <label>Your name<input autoComplete="name" name="name" maxLength={100} required /></label>
        <label>Email or phone<input autoComplete="email" name="contact" maxLength={200} required /></label>
        <label>Project type
          <select defaultValue="" name="projectType" required>
            <option disabled value="">Choose a project type</option>
            <option>Personal website or portfolio</option>
            <option>Business website</option>
            <option>React application or dashboard</option>
            <option>Junior Frontend Developer role</option>
            <option>Collaboration</option>
            <option>Something else</option>
          </select>
        </label>
        <label>Budget range <span>(optional)</span>
          <select defaultValue="" name="budget">
            <option value="">Choose a range</option>
            <option>Under EGP 2,500</option>
            <option>EGP 2,500–5,000</option>
            <option>EGP 5,000–10,000</option>
            <option>EGP 10,000+</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="brief-details">Project details<textarea name="details" rows={4} maxLength={2000} required /></label>
      </div>
      <button className="btn btn-dark" type="submit">Prepare WhatsApp brief <span>↗</span></button>
      {draftUrl && <p className="brief-status" role="status">Your brief is ready. <a href={draftUrl} target="_blank" rel="noreferrer">Open WhatsApp ↗</a></p>}
    </form>
  );
}
