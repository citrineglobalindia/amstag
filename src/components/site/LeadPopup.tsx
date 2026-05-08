// LeadPopup — adaptive lead-capture surface.
//
// On mobile (< 640px) it's a bottom sheet that slides up from the safe-area
// edge — fills the width of the viewport, has a drag handle, and never
// overflows the screen because the form column scrolls internally.
// On tablet+ it's a centred modal card with the same content.
//
// Triggers: 25-second dwell timer OR exit-intent (cursor leaves the top of
// the viewport). Dismissal AND submission both persist in localStorage so
// the popup is shown at most once per browser, ever.
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "amstag.leadPopup.v1";
// Default dwell delay (used on secondary pages); home page overrides via prop.
const APPEAR_DELAY_MS = 25_000;

type Stored =
  | { dismissedAt: number }
  | { submittedAt: number; email: string }
  | undefined;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Enter your company").max(150),
  website: z.string().max(0).optional(), // honeypot
});
type FormData = z.infer<typeof schema>;

function readStored(): Stored {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : undefined;
  } catch {
    return undefined;
  }
}

function writeStored(value: Stored): void {
  if (typeof window === "undefined" || !value) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore quota / privacy mode
  }
}

export function LeadPopup({ delayMs }: { delayMs?: number } = {}) {
  const [open, setOpen] = useState(false);
  const armedRef = useRef<boolean>(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) return; // already dismissed or submitted
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
    writeStored({ dismissedAt: Date.now() });
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
    writeStored({ submittedAt: Date.now(), email: data.email });
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
        className="absolute inset-0 bg-[var(--ink)]/70 backdrop-blur-sm"
      />

      {/* Surface — bottom sheet on mobile, centred card on tablet+ */}
      <motion.div
        // mobile: slide up from bottom
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        // override on sm+ to scale-in (no slide)
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="
          relative z-10 w-full
          max-h-[92dvh] overflow-hidden
          rounded-t-3xl sm:rounded-2xl
          border-t border-white/10 sm:border
          bg-[var(--ink)] text-white
          shadow-[0_-20px_60px_rgba(0,0,0,0.45)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          sm:max-w-md
          pb-[env(safe-area-inset-bottom)]
        "
      >
        {/* Mobile drag handle (decorative) */}
        <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden>
          <span className="block h-1 w-10 rounded-full bg-white/20" />
        </div>

        {/* Ambient glows */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[var(--brand)]/35 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--innovation)]/30 blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

        {/* Close button — larger tap target on mobile */}
        <button
          aria-label="Close popup"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9 sm:rounded-md sm:bg-transparent"
        >
          <X className="h-5 w-5 sm:h-4 sm:w-4" />
        </button>

        {/* Scrollable body */}
        <div className="relative z-[1] overflow-y-auto px-5 pt-4 pb-6 sm:px-7 sm:py-7 max-h-[92dvh]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
            <Sparkles className="h-3 w-3" />
            Free architecture review
          </div>

          <h2
            id="lead-popup-title"
            className="mt-3 font-display text-xl leading-tight text-balance sm:text-2xl md:text-3xl font-bold"
          >
            Get a 30-min review of your IT estate — on us.
          </h2>
          <p className="mt-2 text-sm text-white/70 leading-relaxed sm:mt-3">
            A senior AMSTAG architect walks through your current setup and
            sends back a one-page resilience + security scorecard. No pitch.
          </p>

          {/* Trust badges row */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
              >
                <b.icon className="h-3 w-3 text-[var(--innovation)]" />
                {b.label}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3" noValidate>
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
                className="h-12 sm:h-11 bg-white/5 border-white/15 text-white placeholder:text-white/40 text-base sm:text-sm"
              />
            </FormField>
            <FormField label="Work email" error={errors.email?.message}>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                {...register("email")}
                placeholder="jane@company.com"
                className="h-12 sm:h-11 bg-white/5 border-white/15 text-white placeholder:text-white/40 text-base sm:text-sm"
              />
            </FormField>
            <FormField label="Company" error={errors.company?.message}>
              <Input
                {...register("company")}
                placeholder="Company name"
                autoComplete="organization"
                className="h-12 sm:h-11 bg-white/5 border-white/15 text-white placeholder:text-white/40 text-base sm:text-sm"
              />
            </FormField>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 h-12 w-full rounded-lg bg-[var(--brand)] font-medium text-white hover:bg-[var(--brand-hover)] group"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Booking…
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    Book my review
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </motion.div>
            <button
              type="button"
              onClick={onClose}
              className="block w-full py-2 text-center text-xs text-white/50 transition-colors hover:text-white/80"
            >
              No thanks — I'm just browsing
            </button>
          </form>
        </div>
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
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/70">{label}</span>
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
