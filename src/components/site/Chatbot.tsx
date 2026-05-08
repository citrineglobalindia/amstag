// Chatbot — branded support assistant for AMSTAG.
//
// Implementation: a deterministic, scripted dialog tree with smart quick-reply
// branches. Every leaf either provides an answer or escalates to a human via
// WhatsApp / phone / contact form. We intentionally avoid runtime LLM calls
// here — no API key, no per-message cost, no PII leaving the page, and zero
// cold-start latency. The conversation state lives entirely in the browser.
//
// To upgrade to a live LLM later, replace `findReply()` with an API call to
// /api/chat (Vercel function) and stream the response into `messages`.
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ExternalLink,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "amstag.chatbot.v1";

type Action =
  | { kind: "reply"; nodeId: string }
  | { kind: "link"; href: string; external?: boolean };

type QuickReply = {
  label: string;
  action: Action;
};

type Node = {
  id: string;
  body: string | string[];
  quickReplies?: QuickReply[];
};

const NODES: Record<string, Node> = {
  welcome: {
    id: "welcome",
    body: [
      "Hi 👋 I'm Amstag's assistant.",
      "I can answer quick questions about our services, pricing, support, or get you straight to a human. What would you like to know?",
    ],
    quickReplies: [
      { label: "What services do you offer?", action: { kind: "reply", nodeId: "services" } },
      { label: "Industries you work in", action: { kind: "reply", nodeId: "industries" } },
      { label: "Pricing & engagement", action: { kind: "reply", nodeId: "pricing" } },
      { label: "Talk to a human", action: { kind: "reply", nodeId: "human" } },
    ],
  },

  services: {
    id: "services",
    body: [
      "We run eight service practices, each with senior accountable owners:",
      "• Data center engineering · Networking · Cloud & hosting",
      "• Cybersecurity (24×7 SOC) · Managed IT · Compliance",
      "• Backup & resilience · Modern workplace",
      "Want a closer look at any of these?",
    ],
    quickReplies: [
      { label: "Tell me about Cybersecurity", action: { kind: "reply", nodeId: "cyber" } },
      { label: "Cloud & migration", action: { kind: "reply", nodeId: "cloud" } },
      { label: "Managed IT services", action: { kind: "reply", nodeId: "managed" } },
      { label: "See the full Services page", action: { kind: "link", href: "/services" } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },

  cyber: {
    id: "cyber",
    body: [
      "Our cybersecurity practice runs a 24×7 SOC out of Bangalore — covering EDR/XDR, SIEM, identity, vulnerability management and incident response.",
      "We're ISO 27001 certified and align with RBI cyber-resilience, SEBI, HIPAA and PCI DSS depending on your sector.",
    ],
    quickReplies: [
      { label: "I need an audit / VAPT", action: { kind: "reply", nodeId: "audit" } },
      { label: "We're under attack right now", action: { kind: "reply", nodeId: "incident" } },
      { label: "Book a security review", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to services", action: { kind: "reply", nodeId: "services" } },
    ],
  },

  cloud: {
    id: "cloud",
    body: [
      "We design landing zones and run operations on AWS, Azure, GCP and VMware Cloud — including FinOps, modernisation and full 24×7 managed cloud.",
      "Most engagements start with either a migration assessment or a cost-optimisation review.",
    ],
    quickReplies: [
      { label: "Migration assessment", action: { kind: "reply", nodeId: "human" } },
      { label: "Cost optimisation", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to services", action: { kind: "reply", nodeId: "services" } },
    ],
  },

  managed: {
    id: "managed",
    body: [
      "Managed IT means full-stack ITSM with senior on-call ownership: endpoint, server, network, identity and user support — all under measurable SLAs.",
      "Coverage runs 24×7×365 from our NOC and we publish quarterly business reviews to every customer.",
    ],
    quickReplies: [
      { label: "What's the SLA?", action: { kind: "reply", nodeId: "sla" } },
      { label: "Pricing", action: { kind: "reply", nodeId: "pricing" } },
      { label: "Talk to sales", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to services", action: { kind: "reply", nodeId: "services" } },
    ],
  },

  sla: {
    id: "sla",
    body: [
      "Standard SLAs across managed services:",
      "• Critical incident response: ≤ 15 min · resolution target: 4 h",
      "• High: 30 min response · 8 h resolution",
      "• Average uptime delivered: 99.99%+",
      "We tighten these on a per-customer basis depending on your risk tier.",
    ],
    quickReplies: [
      { label: "Talk to a human", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },

  industries: {
    id: "industries",
    body: [
      "We engineer for BFSI, healthcare, government, manufacturing, retail, telecom, logistics and hospitality.",
      "Each sector has its own specialist team and compliance posture.",
    ],
    quickReplies: [
      { label: "BFSI", action: { kind: "reply", nodeId: "bfsi" } },
      { label: "Healthcare", action: { kind: "reply", nodeId: "healthcare" } },
      { label: "Manufacturing", action: { kind: "reply", nodeId: "manufacturing" } },
      { label: "See all industries", action: { kind: "link", href: "/industries" } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },

  bfsi: {
    id: "bfsi",
    body: "For BFSI we run continuous compliance pipelines aligned to RBI cyber-resilience and SEBI, plus 24×7 SOC and NBFC-grade DR. Most of our oldest customers are NBFCs and small banks.",
    quickReplies: [
      { label: "See BFSI case study", action: { kind: "link", href: "/case-studies" } },
      { label: "Talk to a BFSI architect", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to industries", action: { kind: "reply", nodeId: "industries" } },
    ],
  },

  healthcare: {
    id: "healthcare",
    body: "We run HIS / PACS / LIS uptime for hospital networks, with bedside-grade endpoint posture and HIPAA-aligned data handling. Our healthcare team specialises in multi-campus deployments.",
    quickReplies: [
      { label: "Healthcare case study", action: { kind: "link", href: "/case-studies" } },
      { label: "Talk to a healthcare lead", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to industries", action: { kind: "reply", nodeId: "industries" } },
    ],
  },

  manufacturing: {
    id: "manufacturing",
    body: "For manufacturing we bring IT and OT onto a single network plan — passive OT monitoring, segmentation, and resilient WAN across plants. Zero line stoppages on cutover.",
    quickReplies: [
      { label: "Manufacturing case study", action: { kind: "link", href: "/case-studies" } },
      { label: "Talk to an OT specialist", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to industries", action: { kind: "reply", nodeId: "industries" } },
    ],
  },

  pricing: {
    id: "pricing",
    body: [
      "Pricing depends on scope, SLA tier and number of users / endpoints / sites.",
      "Most engagements start with a free 30-min architecture review where we scope and propose. No commitment.",
    ],
    quickReplies: [
      { label: "Book the free review", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },

  audit: {
    id: "audit",
    body: "We run VAPT, red-team and cloud security assessments — typically 2 to 4 weeks depending on scope. Reports are delivered with prioritised remediation plans, not just findings.",
    quickReplies: [
      { label: "Get a quote", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Back to cybersecurity", action: { kind: "reply", nodeId: "cyber" } },
    ],
  },

  incident: {
    id: "incident",
    body: [
      "⚠ For an active incident, please call our 24×7 SOC immediately:",
      "📞 +91 99456 45909 (Support)",
      "We can also engage on WhatsApp if you can't talk.",
    ],
    quickReplies: [
      {
        label: "Open WhatsApp now",
        action: { kind: "link", href: "https://wa.me/919945645909?text=Active%20incident%20-%20need%20help", external: true },
      },
      { label: "Email the SOC", action: { kind: "link", href: "mailto:contact@amstag.in?subject=Active%20incident", external: true } },
    ],
  },

  human: {
    id: "human",
    body: [
      "Pick the channel that suits — we'll get the right person on the call:",
      "📞 Sales · +91 90357 38956",
      "📞 Support · +91 99456 45909",
      "✉ sales@amstag.in",
    ],
    quickReplies: [
      { label: "Open the contact form", action: { kind: "link", href: "/contact" } },
      { label: "Chat on WhatsApp", action: { kind: "link", href: "https://wa.me/919945645909", external: true } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },

  fallback: {
    id: "fallback",
    body: "I can't answer that one directly — but a human can. Want me to point you at the team?",
    quickReplies: [
      { label: "Yes, talk to a human", action: { kind: "reply", nodeId: "human" } },
      { label: "↩ Start over", action: { kind: "reply", nodeId: "welcome" } },
    ],
  },
};

// Tiny intent classifier for free-form text input. If we don't match anything,
// we route to the fallback node which offers escalation.
function classifyIntent(text: string): string {
  const t = text.toLowerCase();
  if (/(price|pricing|cost|how much|quote)/.test(t)) return "pricing";
  if (/(security|cyber|soc|threat|attack|breach|malware|ransom)/.test(t)) {
    if (/(active|happening|right now|under attack|breach)/.test(t)) return "incident";
    return "cyber";
  }
  if (/(cloud|aws|azure|gcp|migrate|migration)/.test(t)) return "cloud";
  if (/(managed|ITSM|helpdesk|noc|support)/.test(t)) return "managed";
  if (/(sla|uptime|response time)/.test(t)) return "sla";
  if (/(bfsi|bank|nbfc|finance|rbi|sebi)/.test(t)) return "bfsi";
  if (/(health|hospital|his|pacs|hipaa)/.test(t)) return "healthcare";
  if (/(manufactur|plant|factory|ot)/.test(t)) return "manufacturing";
  if (/(industry|industries|sector)/.test(t)) return "industries";
  if (/(service|offering|what.*do)/.test(t)) return "services";
  if (/(contact|talk|human|call|sales|email|whatsapp)/.test(t)) return "human";
  if (/(audit|vapt|pen.?test|red.?team)/.test(t)) return "audit";
  if (/^(hi|hello|hey|namaste)/.test(t)) return "welcome";
  return "fallback";
}

type Message =
  | { id: string; role: "bot"; nodeId: string }
  | { id: string; role: "user"; text: string };

const greetingMessage: Message = { id: "init", role: "bot", nodeId: "welcome" };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([greetingMessage]);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const titleId = useId();

  // Restore prior conversation (if any) from localStorage.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { messages: Message[] };
      if (Array.isArray(saved.messages) && saved.messages.length > 0) {
        setMessages(saved.messages);
      }
    } catch {
      // ignore corrupted state
    }
  }, []);

  // Persist conversation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto-scroll to latest.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Clear "unread" pulse when opened.
  useEffect(() => {
    if (open) setHasUnread(false);
  }, [open]);

  const addUser = (text: string) => setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
  const addBot = (nodeId: string) =>
    setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", nodeId }]);

  const onQuickReply = (qr: QuickReply) => {
    if (qr.action.kind === "link") {
      if (qr.action.external) {
        window.open(qr.action.href, "_blank", "noopener,noreferrer");
      } else {
        // soft-navigate via location (we're not using router programmatically here)
        window.location.href = qr.action.href;
      }
      return;
    }
    addUser(qr.label);
    // small natural pause before bot responds
    window.setTimeout(() => addBot(qr.action.nodeId), 250);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput("");
    const nodeId = classifyIntent(text);
    window.setTimeout(() => addBot(nodeId), 400);
  };

  const reset = () => {
    setMessages([greetingMessage]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <>
      {/* Launcher — positioning is owned by <FloatingActions> so it sits
          in a clean flex row alongside the WhatsApp FAB. Same exact size
          (h-14 w-14) as the WhatsApp button for visual symmetry. */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with AMSTAG assistant"}
        title={open ? "Close chat" : "Chat with AMSTAG"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--ink-soft)] text-white shadow-[0_10px_30px_rgba(0,102,255,0.40)] outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="inline-block"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="inline-block"
            >
              <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {hasUnread && !open && (
          <motion.span
            aria-hidden
            className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--innovation)] text-[10px] font-bold text-[var(--ink)]"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.2, 1] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            1
          </motion.span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{
              right: "max(1.25rem, env(safe-area-inset-right))",
              // Panel sits above the FAB column. Mobile column ≈ 108px tall,
              // desktop ≈ 124px tall — both clear with bottom: 9.5rem (152px).
              bottom: "max(9.5rem, calc(9.5rem + env(safe-area-inset-bottom)))",
            }}
            className="fixed z-50 flex h-[calc(100dvh-11rem)] max-h-[640px] w-[min(96vw,400px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_rgba(10,22,40,0.25)]"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[var(--ink)] text-white">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[var(--brand)]/40 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </span>
                  <div>
                    <h3 id={titleId} className="font-display text-sm font-semibold">
                      AMSTAG Assistant
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 font-mono">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--innovation)] opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--innovation)]" />
                      </span>
                      Online · Replies instantly
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--surface)] p-4">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <MessageRow key={m.id} message={m} onQuickReply={onQuickReply} />
                ))}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <form onSubmit={onSubmit} className="border-t border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  aria-label="Type a message"
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)]"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label="Send message"
                  disabled={!input.trim()}
                  className="grid h-9 w-9 place-items-center rounded-md bg-[var(--brand)] text-white transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-foreground/50">
                <span>
                  Powered by AMSTAG ·{" "}
                  <button type="button" onClick={reset} className="underline-offset-2 hover:underline">
                    reset
                  </button>
                </span>
                <Link to="/contact" className="inline-flex items-center gap-1 hover:text-[var(--brand)]">
                  Talk to human <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageRow({
  message,
  onQuickReply,
}: {
  message: Message;
  onQuickReply: (qr: QuickReply) => void;
}) {
  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--brand)] px-3 py-2 text-sm text-white shadow-sm">
          {message.text}
        </div>
      </motion.div>
    );
  }

  const node = NODES[message.nodeId] ?? NODES.fallback;
  const lines = useMemo(() => (Array.isArray(node.body) ? node.body : [node.body]), [node]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="flex gap-2"
    >
      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white">
        <Bot className="h-3.5 w-3.5" />
      </span>
      <div className="flex max-w-[85%] flex-col gap-2">
        <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm">
          {lines.map((line, i) => (
            <p key={i} className={i > 0 ? "mt-1.5" : undefined}>
              {line}
            </p>
          ))}
        </div>
        {node.quickReplies && node.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {node.quickReplies.map((qr) => {
              const isExternal = qr.action.kind === "link" && qr.action.external;
              return (
                <motion.button
                  key={qr.label}
                  type="button"
                  onClick={() => onQuickReply(qr)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/5 px-3 py-1.5 text-xs font-medium text-[var(--brand)] hover:bg-[var(--brand)]/10"
                >
                  {qr.label}
                  {isExternal && <ExternalLink className="h-3 w-3" />}
                  {qr.action.kind === "link" && !isExternal && <ArrowRight className="h-3 w-3" />}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Re-export the icon used in WhatsAppFab for context (no functional purpose here).
export { MessageCircle };
