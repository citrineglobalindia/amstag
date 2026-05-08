import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919945645909"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with AMSTAG on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40 animate-ping" />
    </a>
  );
}
