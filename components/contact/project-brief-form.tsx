"use client";

import { useState, type FormEvent } from "react";

export default function ProjectBriefForm({ whatsappUrl }: { whatsappUrl: string }) {
  const [draftUrl, setDraftUrl] = useState<string | null>(null);

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
    <form className="contact-brief" id="contact-project-form" onSubmit={handleSubmit} onInput={(event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
      setDraftUrl(null);
    }}>
      <div className="brief-heading">
        <p className="label"><b>PROJECT BRIEF</b> — 01 / 01</p>
        <h2 className="display">What are you building?</h2>
        <p>This opens WhatsApp with a draft for you to review before sending.</p>
      </div>
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
