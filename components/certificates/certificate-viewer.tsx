"use client";

import { useCallback, useId, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Modal from "@/components/ui/modal";

type CertificateViewerProps = {
  image: string;
  title: string;
};

export default function CertificateViewer({ image, title }: CertificateViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeCertificate = useCallback(() => setIsOpen(false), []);
  const titleId = useId();

  return (
    <>
      <button className="j-certificate" type="button" onClick={() => setIsOpen(true)}>
        View certificate <span aria-hidden="true">↗</span>
      </button>
      <Modal open={isOpen} onClose={closeCertificate} titleId={titleId} backdropClassName="certificate-modal" className="certificate-modal__panel">
        <header className="certificate-modal__header">
          <div>
            <span>Credential</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button data-modal-close className="certificate-modal__close" type="button" onClick={closeCertificate} aria-label="Close certificate" title="Close certificate">
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="certificate-modal__image-wrap">
          <Image src={image} alt={`${title} certificate`} width={1280} height={960} sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
      </Modal>
    </>
  );
}
