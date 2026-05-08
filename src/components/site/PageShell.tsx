// Shared page wrapper for non-home pages: Header + main slot + Footer +
// FloatingActions (chatbot + WhatsApp in a row) + LeadPopup + Toaster.
// Keeps every route consistent with the home page chrome.
import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { LeadPopup } from "./LeadPopup";
import { Toaster } from "@/components/ui/sonner";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground antialiased">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
      <LeadPopup />
      <Toaster richColors position="top-right" />
    </div>
  );
}
