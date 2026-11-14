import { MessageCircle } from "lucide-react";

export default function FloatingContact({ whatsappUrl }: { whatsappUrl: string }) {
  const draft = new URL(whatsappUrl);
  draft.searchParams.set("text", "Hi Youssef, I'd like to discuss a project with you.");

  return (
    <aside className="floating-contact" aria-label="Quick contact">
      <a href={draft.href} target="_blank" rel="noreferrer" aria-label="Chat with Youssef on WhatsApp (opens in a new tab)">
        <MessageCircle size={26} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
        <span className="floating-contact-label" aria-hidden="true">Chat on WhatsApp ↗</span>
      </a>
    </aside>
  );
}
