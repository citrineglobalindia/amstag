// LeadPopup — adaptive lead-capture surface.
//
// On mobile (< 640px) it's a bottom sheet that slides up from the safe-area
// edge — fills the width of the viewport, has a drag handle, and never
// overflows the screen because the form column scrolls internally.
// On tablet+ it's a centred modal card with the same content.
//
// Triggers: dwell timer (delayMs prop, default 25s) OR exit-intent.
//
// Dismissal model:
//   - SUBMITTED → localStorage 30-day cooldown (don't bother fresh leads)
//   - DISMISSED → sessionStorage only (resets per browser session, so
//     visitors get another chance on a fresh visit)
//
// Storage keys are version-suffixed; bumping invalidates older entries
// without us having to write any migration logic.
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUBMITTED_KEY = "amstag.leadPopup.submitted.v2";
const DISMISSED_KEY = "amstag.leadPopup.dismissed.v2";
const SUBMISSION_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Default dwell delay (used on secondary pages); home page overrides via prop.
const APPEAR_DELAY_MS = 25_000;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Enter your company").max(150),
  website: z.string().max(0).optional(), // honeypot
});
type FormData = z.infer<typeof schema>;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  // Check submission cooldown (localStorage, 30-day TTL)
  try {
    const raw = window.localStorage.getItem(SUBMITTED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { submittedAt: number };
      if (parsed?.submittedAt && Date.now() - parsed.submittedAt < SUBMISSION_COOLDOWN_MS) {
        return false;
      }
      // Cooldown elapsed → drop the entry
      window.localStorage.removeItem(SUBMITTED_KEY);
    }
  } catch {
    // ignore
  }
  // Check session dismissal (resets when browser tab closes)
  try {
    if (window.sessionStorage.getItem(DISMISSED_KEY)) return false;
  } catch {
    // ignore
  }
  return true;
}

function recordDismissed(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    // ignore privacy mode
  }
}

function recordSubmitted(email: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SUBMITTED_KEY,
      JSON.stringify({ submittedAt: Date.now(), email })
    );
  } catch {
    // ignore
  }
}

export function LeadPopup({ delayMs }: { delayMs?: number } = {}) {
  const [open, setOpen] = useState(false);
  const armedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shouldShow()) return;
    armedRef.current = true;

    const timer = window.setTimeout(() => {
      if (!armedRef.current) return;
      setOpen(true);
      armedRef.current = false;
    }, delayMs ?? APPEAR_DELAY_MS);

    const onMouseOut = (e: MouseEvent) => {
      if (!armedRef.current) return;
      if (e.relatedTarget !== null) return;
      if (e.clientY > 0) return;
      setOpen(true);
      armedRef.current = false;
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [delayMs]);

  const close = () => {
    setOpen(false);
    recordDismissed();
  };

  // Lock background scroll while open so the body doesn't peek past the sheet
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return <AnimatePresence>{open && <LeadPopupSurface onClose={close} />}</AnimatePresence>;
}

const trustBadges = [
  { icon: ShieldCheck, label: "ISO 27001" },
  { icon: CheckCircle2, label: "No commitment" },
  { icon: Sparkles, label: "30 minutes" },
];

function LeadPopupSurface({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    await new Promise((r) => setTimeout(r, 600));
    recordSubmitted(data.email);
    toast.success("Got it — a senior architect will reach out within one business day.");
    onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.button
        aria-label="Close"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[var(--ink)]/75 backdrop-blur-sm"
      />

      {/* Surface — bottom sheet on mobile, centred card on tablet+
          Layout: header (fixed) + scrollable body + sticky footer with CTA.
          The submit stays on screen even when the soft keyboard pushes
          content up. */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="
          relative z-10 w-full flex flex-col
          max-h-[88dvh] overflow-hidden
          rounded-t-3xl sm:rounded-2xl
          border-t border-white/10 sm:border
          bg-[var(--ink)] text-white
          shadow-[0_-20px_60px_rgba(0,0,0,0.45)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          sm:max-w-md sm:max-h-[88vh]
        "
      >
        {/* Ambient glows (clipped by overflow-hidden parent) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[var(--brand)]/40 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--innovation)]/35 blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div aria-hidden className="absolute inset-0 grid-mesh opacity-25 pointer-events-none" />

        {/* HEADER (fixed) */}
        <header className="relative z-[2] shrink-0 px-5 pt-4 pb-3 sm:px-7 sm:pt-6 sm:pb-4 border-b border-white/10">
          {/* Mobile drag handle (decorative) */}
          <div className="flex justify-center mb-3 sm:hidden" aria-hidden>
            <span className="block h-1 w-10 rounded-full bg-white/25" />
          </div>

          {/* Close button */}
          <button
            aria-label="Close popup"
            onClick={onClose}
            className="absolute right-3 top-3 sm:top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--innovation)]/40 bg-[var(--innovation)]/10 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
            <Sparkles className="h-3 w-3" />
            Free architecture review
          </div>

          <h2
            id="lead-popup-title"
            className="mt-2.5 font-display text-[1.35rem] leading-[1.15] text-balance sm:text-2xl md:text-[1.65rem] font-bold pr-10"
          >
            Get a 30-min review of your IT estate — on us.
          </h2>
        </header>

        {/* BODY (scrollable) */}
        <div className="relative z-[1] flex-1 min-h-0 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5">
          <p className="text-sm text-white/85 leading-relaxed">
            A senior architect walks through your setup and sends back a
            one-page resilience + security scorecard. No pitch.
          </p>

          {/* Trust badges row */}
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[11px] text-white/85"
              >
                <b.icon className="h-3 w-3 text-[var(--innovation)]" />
                {b.label}
              </li>
            ))}
          </ul>

          <form
            id="lead-popup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 space-y-3"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
              className="hidden"
              aria-hidden
            />
            <FormField label="Full name" error={errors.name?.message}>
              <Input
                {...register("name")}
                placeholder="Jane Doe"
                autoComplete="name"
                inputMode="text"
                className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/45 text-base"
              />
            </FormField>
            <FormField label="Work email" error={errors.email?.message}>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                {...register("email")}
                placeholder="jane@company.com"
                className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/45 text-base"
              />
            </FormField>
            <FormField label="Company" error={errors.company?.message}>
              <Input
                {...register("company")}
                placeholder="Company name"
                autoComplete="organization"
                className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/45 text-base"
              />
            </FormField>
          </form>
        </div>

        {/* FOOTER (sticky CTA) */}
        <footer
          className="relative z-[2] shrink-0 px-5 pt-3 pb-4 sm:px-7 sm:pt-4 sm:pb-6 border-t border-white/10 bg-[var(--ink)]/80 backdrop-blur-sm"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              form="lead-popup-form"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[var(--brand)] font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.45)] hover:bg-[var(--brand-hover)] group"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Booking your review…
                </span>
              ) : (
                <span className="inline-flex items-center">
                  Book my free review
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 block w-full text-center text-xs text-white/65 transition-colors hover:text-white/85"
          >
            No thanks — I'm just browsing
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/85">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 block text-xs text-red-300"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}
