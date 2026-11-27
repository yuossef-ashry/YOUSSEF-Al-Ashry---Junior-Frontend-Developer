"use client";

export default function DownloadCvButton({ className }: { className: string }) {
  // TODO(Youssef): Attach the CV PDF, add the download attribute, and remove the placeholder state.
  return (
    <a
      href="#"
      className={`btn btn-ghost cv-placeholder ${className}`}
      title="CV coming soon"
      aria-label="Download CV (coming soon)"
      aria-disabled="true"
      tabIndex={-1}
      onClick={(event) => event.preventDefault()}
    >
      Download CV
    </a>
  );
}
