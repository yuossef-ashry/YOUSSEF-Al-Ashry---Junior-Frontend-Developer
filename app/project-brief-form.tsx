"use client";

import type { FormEvent } from "react";

export default function ProjectBriefForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const details = [
      "Hi Youssef, I'd like to discuss a project.",
      `Name: ${formData.get("name")}`,
      `Email or phone: ${formData.get("contact")}`,
      `Project type: ${formData.get("projectType")}`,
      `Budget: ${formData.get("budget") || "Not sure yet"}`,
      `Details: ${formData.get("details")}`,
    ].join("\n");

    window.open(`https://wa.me/201214858840?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-brief" id="contact-project-form" onSubmit={handleSubmit}>
      <div className="brief-heading">
        <p className="label"><b>PROJECT BRIEF</b> — 01 / 01</p>
        <h2 className="display">What are you building?</h2>
        <p>This opens WhatsApp with a draft for you to review before sending.</p>
      </div>
      <div className="brief-grid">
        <label>Your name<input autoComplete="name" name="name" required /></label>
        <label>Email or phone<input autoComplete="email" name="contact" required /></label>
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
        <label className="brief-details">Project details<textarea name="details" rows={4} required /></label>
      </div>
      <button className="btn btn-dark" type="submit">Prepare WhatsApp brief <span>↗</span></button>
    </form>
  );
}
