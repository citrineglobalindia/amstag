// LeadPopup, service-aware lead capture surface.
//
// Surfaces three things in a tight, scrollable card:
//   1. A short prompt ("What can we help with?")
//   2. A service picker, 8 colour-coded tiles drawn from the SERVICES
//      catalogue. The selected tile becomes the "I want to talk about ___"
//      context that's submitted with the lead.
//   3. A compact 3-field form (name + work email + phone) with a sticky CTA
//      so the submit button never scrolls off, even when the soft keyboard
//      pushes content up on mobile.
//
// Layout: bottom sheet on mobile, centred card on tablet+. Three regions:
// fixed header, scrollable body, sticky footer.
//
// Dismissal model: SUBMITTED → 30-day localStorage cooldown.
//                  DISMISSED → sessionStorage only (resets per browser tab).
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVICES, type Service } from "@/lib/services";

const SUBMITTED_KEY = "amstag.leadPopup.submitted.v3";
const DISMISSED_KEY = "amstag.leadPopup.dismissed.v3";
const SUBMISSION_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const APPEAR_DELAY_MS = 25_000;

const schema = z.object({
  service: z.string().min(1, "Pick a service first"),
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  website: z.string().max(0).optional(), // honeypot
});
type FormData = z.infer<typeof schema>;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(SUBMITTED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { submittedAt: number };
      if (parsed?.submittedAt && Date.now() - parsed.submittedAt < SUBMISSION_COOLDOWN_MS) {
        return false;
      }
      window.localStorage.removeItem(SUBMITTED_KEY);
    }
  } catch {
    /* ignore */
  }
  try {
    if (window.sessionStorage.getItem(DISMISSED_KEY)) return false;
  } catch {
    /* ignore */
  }
  return true;
}

function recordDismissed(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function recordSubmitted(payload: { email: string; service: string }): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SUBMITTED_KEY,
      JSON.stringify({ submittedAt: Date.now(), ...payload })
    );
  } catch {
    /* ignore */
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

  // Lock background scroll while open
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

function LeadPopupSurface({ onClose }: { onClose: () => void }) {
  const [serviceSlug, setServiceSlug] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "" },
  });

  const onPickService = (slug: string) => {
    setServiceSlug(slug);
    setValue("service", slug, { shouldValidate: true });
  };

  const selected = useMemo<Service | undefined>(
    () => SERVICES.find((s) => s.slug === serviceSlug),
    [serviceSlug]
  );

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    await new Promise((r) => setTimeout(r, 600));
    recordSubmitted({ email: data.email, service: data.service });
    toast.success(
      `Thanks, a senior ${selected?.shortLabel ?? "Amstag"} architect will reach out within one business day.`
    );
    reset();
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

      {/* Surface */}
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
          sm:max-w-lg sm:max-h-[88vh]
        "
      >
        {/* Ambient glows */}
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
          <div className="flex justify-center mb-3 sm:hidden" aria-hidden>
            <span className="block h-1 w-10 rounded-full bg-white/25" />
          </div>

          <button
            aria-label="Close popup"
            onClick={onClose}
            className="absolute right-3 top-3 sm:top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--innovation)]/40 bg-[var(--innovation)]/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
            <Sparkles className="h-3 w-3" />
            Talk to an architect
          </div>

          <h2
            id="lead-popup-title"
            className="mt-2.5 font-display text-[1.25rem] sm:text-2xl leading-[1.15] font-bold pr-10 text-white"
          >
            Get a senior architect on the call.
          </h2>
        </header>

        {/* BODY (scrollable) */}
        <div className="relative z-[1] flex-1 min-h-0 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5">
          {/* Service dropdown, custom select with icon + tagline per option.
              Replaces the previous 8-tile grid; saves vertical space and is
              easier to scan on mobile. */}
          <FormField label="What can we help with?" error={errors.service?.message}>
            <ServiceSelect selectedSlug={serviceSlug} onPick={onPickService} />
          </FormField>

          {/* Compact form */}
          <form
            id="lead-popup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 space-y-3"
            noValidate
          >
            {/* Honeypot + hidden service field for RHF */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
              className="hidden"
              aria-hidden
            />
            <input type="hidden" {...register("service")} />

            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Full name" error={errors.name?.message}>
                <Input
                  {...register("name")}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base"
                />
              </FormField>
              <FormField label="Phone" error={errors.phone?.message}>
                <Input
                  type="tel"
                  inputMode="tel"
                  {...register("phone")}
                  placeholder="+91 ..."
                  className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base"
                />
              </FormField>
            </div>
            <FormField label="Work email" error={errors.email?.message}>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                {...register("email")}
                placeholder="jane@company.com"
                className="h-12 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base"
              />
            </FormField>

            {/* Trust micro-row */}
            <ul className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/65">
              <li className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[var(--innovation)]" />
                ISO 27001
              </li>
              <li className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-[var(--innovation)]" />
                1-day reply
              </li>
              <li className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[var(--innovation)]" />
                No commitment
              </li>
            </ul>
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
                  Sending…
                </span>
              ) : (
                <span className="inline-flex items-center">
                  {selected
                    ? `Send ${selected.shortLabel} enquiry`
                    : "Send enquiry"}
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
            No thanks, I'm just browsing
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────── ServiceSelect ─────────────────────
 * Custom dropdown, semantically a button + listbox so keyboard users get
 * Enter/Escape/click-outside, and so we can render the selected service
 * with its icon + tone gradient (a native <select> can't show inline
 * artwork). Each option in the open panel shows the service icon,
 * short label, and tagline.
 */

function ServiceSelect({
  selectedSlug,
  onPick,
}: {
  selectedSlug: string;
  onPick: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = SERVICES.find((s) => s.slug === selectedSlug);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Defer attaching pointer listener so the click that opened us
    // doesn't immediately close.
    const t = window.setTimeout(() => document.addEventListener("pointerdown", onPointer), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className={`group w-full h-12 flex items-center gap-2.5 rounded-md border px-3 text-left transition-colors ${
          open
            ? "border-[var(--innovation)] bg-white/[0.10]"
            : "border-white/20 bg-white/[0.07] hover:bg-white/[0.10]"
        }`}
      >
        {selected ? (
          <>
            <span
              className={`grid place-items-center h-8 w-8 rounded-lg border bg-gradient-to-br ${selected.tone.gradient} ${selected.tone.chipBorder} text-white shrink-0`}
            >
              <selected.icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-base font-medium text-white truncate leading-tight">
                {selected.title}
              </span>
              <span className="block text-[11px] text-white/65 truncate leading-tight">
                {selected.tagline}
              </span>
            </span>
          </>
        ) : (
          <span className="flex-1 text-base text-white/55">Select a service…</span>
        )}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-white/65"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            key="select-panel"
            id={listboxId}
            role="listbox"
            aria-label="Select a service"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-white/15 bg-[var(--ink)]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] py-1.5"
          >
            {SERVICES.map((s) => {
              const isSelected = s.slug === selectedSlug;
              return (
                <li key={s.slug} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onPick(s.slug);
                      setOpen(false);
                    }}
                    className={`group w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      isSelected ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`grid place-items-center h-9 w-9 shrink-0 rounded-lg border bg-gradient-to-br ${s.tone.gradient} ${s.tone.chipBorder} text-white`}
                    >
                      <s.icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-white truncate leading-tight">
                        {s.title}
                      </span>
                      <span className="block text-[11px] text-white/65 truncate leading-tight mt-0.5">
                        {s.tagline}
                      </span>
                    </span>
                    {isSelected && (
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--innovation)] text-[var(--ink)]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
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
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/85">
        {label}
      </span>
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
