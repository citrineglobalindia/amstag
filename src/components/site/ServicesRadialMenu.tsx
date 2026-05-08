// ServicesRadialMenu — a Mac-Dock-meets-orbital mega-menu.
// Eight service icons sit on a circle around a central focal element. Each
// icon springs in from the centre on open with a per-icon delay, hovers up
// when targeted, and pulses on the centre to indicate "pick one".
//
// Used inside <Header> as a hover-revealed dropdown beneath the "Services"
// nav item. Click-outside / Escape close it.
import { useEffect, useId, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Cpu,
  Database,
  HeadphonesIcon,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

type Service = {
  label: string;
  slug: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Tailwind classes for the icon tile background + border + glow. */
  tone: string;
  /** Tailwind class for the label text colour. */
  text: string;
};

const services: Service[] = [
  { label: "Data Center",  slug: "data-center",  icon: Server,         tone: "from-sky-500/20 to-sky-500/5 border-sky-400/40 shadow-[0_0_20px_-6px_oklch(0.7_0.18_240/0.6)]",        text: "text-sky-200" },
  { label: "Networking",   slug: "networking",   icon: Network,        tone: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/40 shadow-[0_0_20px_-6px_oklch(0.78_0.16_200/0.6)]",     text: "text-cyan-200" },
  { label: "Cloud",        slug: "cloud",        icon: Cloud,          tone: "from-violet-500/20 to-violet-500/5 border-violet-400/40 shadow-[0_0_20px_-6px_oklch(0.7_0.2_290/0.6)]", text: "text-violet-200" },
  { label: "Cybersecurity", slug: "cybersecurity", icon: ShieldCheck, tone: "from-rose-500/20 to-rose-500/5 border-rose-400/40 shadow-[0_0_20px_-6px_oklch(0.7_0.2_15/0.6)]",         text: "text-rose-200" },
  { label: "Managed IT",   slug: "managed-it",   icon: HeadphonesIcon, tone: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/40 shadow-[0_0_20px_-6px_oklch(0.78_0.16_165/0.6)]", text: "text-emerald-200" },
  { label: "Compliance",   slug: "compliance",   icon: Workflow,       tone: "from-amber-500/20 to-amber-500/5 border-amber-400/40 shadow-[0_0_20px_-6px_oklch(0.78_0.18_75/0.6)]",   text: "text-amber-200" },
  { label: "Backup & DR",  slug: "backup-dr",    icon: Database,       tone: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-400/40 shadow-[0_0_20px_-6px_oklch(0.72_0.2_330/0.6)]", text: "text-fuchsia-200" },
  { label: "Workplace",    slug: "workplace",    icon: Cpu,            tone: "from-teal-500/20 to-teal-500/5 border-teal-400/40 shadow-[0_0_20px_-6px_oklch(0.78_0.14_185/0.6)]",     text: "text-teal-200" },
];

const RADIUS = 180; // px from centre to icon tile

export function ServicesRadialMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const titleId = useId();

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(e.target as Node)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // delay attach so the click that opened us doesn't immediately close it
    const t = window.setTimeout(() => document.addEventListener("pointerdown", onPointer), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="radial-menu"
          ref={containerRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          // Defensive: this is a desktop-only mega-menu — even if state
          // somehow leaks across viewport changes, hide on mobile.
          className="hidden lg:block fixed left-1/2 top-20 z-40 -translate-x-1/2 w-[min(96vw,720px)] rounded-3xl border border-white/10 bg-[var(--ink)]/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          {/* Ambient violet/blue glow background like the screenshot */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/35 blur-[100px]"
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/20 blur-[100px]"
            animate={reduce ? undefined : { scale: [1.05, 1, 1.05], opacity: [0.4, 0.7, 0.4] }}
            transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

          {/* Title */}
          <div className="relative z-10 px-6 pt-5 pb-2">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">
              Eight practices
            </div>
            <h2 id={titleId} className="mt-1 font-display text-lg font-bold text-white">
              Pick a service to explore
            </h2>
          </div>

          {/* Stage */}
          <div className="relative z-10 mx-auto h-[460px] w-full max-w-[640px]">
            {/* Concentric guide rings */}
            <svg
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="460"
              height="460"
              viewBox="0 0 460 460"
            >
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.58 0.22 258)" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="oklch(0.58 0.22 258)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="oklch(0.58 0.22 258)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="230" cy="230" r="120" fill="url(#centerGlow)" />
              <circle cx="230" cy="230" r="180" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" fill="none" strokeDasharray="2 6" />
              <circle cx="230" cy="230" r="140" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" fill="none" />
              <circle cx="230" cy="230" r="100" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" fill="none" />
            </svg>

            {/* Slow rotating outer ring (purely decorative) */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Centre focal element — AMSTAG glyph */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
            >
              <motion.div
                animate={reduce ? undefined : { scale: [1, 1.06, 1], boxShadow: [
                  "0 0 30px oklch(0.58 0.22 258 / 0.4)",
                  "0 0 60px oklch(0.78 0.16 175 / 0.55)",
                  "0 0 30px oklch(0.58 0.22 258 / 0.4)",
                ] }}
                transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="grid place-items-center w-28 h-28 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white"
              >
                <Zap className="h-10 w-10" strokeWidth={2.4} />
              </motion.div>
              <div className="mt-3 text-center">
                <div className="font-display text-sm font-bold text-white">AMSTAG</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">Engineered IT</div>
              </div>
            </motion.div>

            {/* Orbiting service icons */}
            {services.map((s, i) => {
              const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2; // start at top
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                    delay: 0.05 + i * 0.045,
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={onClose}
                    className="group flex flex-col items-center gap-2 outline-none"
                  >
                    <motion.div
                      whileHover={{ y: -6, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      className={`grid place-items-center w-14 h-14 rounded-2xl border bg-gradient-to-br backdrop-blur-sm ${s.tone}`}
                    >
                      <s.icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                    </motion.div>
                    <span className={`text-xs font-medium ${s.text} group-hover:text-white transition-colors`}>
                      {s.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 px-6 py-3">
            <span className="text-xs text-white/50">
              Hover an icon to focus · click to open
            </span>
            <Link
              to="/services"
              onClick={onClose}
              className="text-xs font-medium text-[var(--innovation)] hover:underline"
            >
              See all services →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
