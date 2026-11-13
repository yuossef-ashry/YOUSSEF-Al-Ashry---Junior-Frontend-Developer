"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type CertificateViewerProps = {
  image: string;
  title: string;
};

export default function CertificateViewer({ image, title }: CertificateViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const modal = isOpen ? createPortal(
    <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title" onClick={(event) => {
      if (event.target === event.currentTarget) setIsOpen(false);
    }}>
      <section className="certificate-modal__panel">
        <header className="certificate-modal__header">
          <div>
            <span>Credential</span>
            <h2 id="certificate-title">{title}</h2>
          </div>
          <button ref={closeButtonRef} className="certificate-modal__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close certificate" title="Close certificate">
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="certificate-modal__image-wrap">
          <Image src={image} alt={`${title} certificate`} width={1280} height={960} sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
      </section>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <button className="j-certificate" type="button" onClick={() => setIsOpen(true)}>
        View certificate <span aria-hidden="true">↗</span>
      </button>
      {modal}
    </>
  );
}
