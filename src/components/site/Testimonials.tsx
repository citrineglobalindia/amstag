// Testimonials — single auto-cycling stage with avatar reel.
// One large quote occupies centre stage; a row of avatars below acts as a
// dot-style selector. The active testimonial cross-fades on a 6s timer.
// Signature animation: AnimatePresence cross-fade + active-avatar ring pulse.
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeader } from "./Offerings";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  toneClass: string; // gradient avatar tone
};

const items: Testimonial[] = [
  {
    quote:
      "AMSTAG runs our DC like clockwork. Their NOC catches incidents before our internal teams even page.",
    name: "Rajiv Menon",
    title: "CTO",
    company: "Aarav Capital",
    industry: "BFSI",
    toneClass: "from-[var(--brand)] to-[var(--ink-soft)]",
  },
  {
    quote:
      "They didn't just migrate workloads — they rebuilt our resilience model. We sleep better.",
    name: "Dr. Priya Iyer",
    title: "CIO",
    company: "Suvarna Hospitals",
    industry: "Healthcare",
    toneClass: "from-rose-400 to-rose-700",
  },
  {
    quote:
      "Pragmatic, senior, accountable. AMSTAG fits in like an in-house team and ships like a product company.",
    name: "Vikram Shetty",
    title: "Head of IT",
    company: "NorthStar Logistics",
    industry: "Logistics",
    toneClass: "from-emerald-400 to-emerald-700",
  },
  {
    quote:
      "RBI audits used to take quarters. With AMSTAG's posture, we close them in weeks.",
    name: "Anjali Krishnan",
    title: "Head of InfoSec",
    company: "Pragati Bank",
    industry: "BFSI",
    toneClass: "from-amber-400 to-amber-700",
  },
  {
    quote:
      "Their SOC stopped a credential-stuffing wave on our portal in real time. Real proof, not promises.",
    name: "Karthik R.",
    title: "VP Engineering",
    company: "Sahyadri Retail",
    industry: "Retail",
    toneClass: "from-violet-400 to-violet-700",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => window.clearInterval(t);
  }, [paused]);

  const active = items[idx];

  return (
    <section
      className="bg-[var(--surface)] py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Testimonials
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              What enterprise leaders say.
            </h2>
          </div>
        </Reveal>

        {/* Stage */}
        <div className="relative mt-12 mx-auto max-w-3xl">
          {/* Halo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-[var(--brand)]/15 via-transparent to-[var(--innovation)]/15 blur-2xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative rounded-2xl border border-border bg-card p-6 md:p-10 shadow-[0_24px_60px_rgba(10,22,40,0.08)] min-h-[280px]">
            <Quote className="h-8 w-8 text-[var(--brand)]/30" strokeWidth={1.5} />
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="mt-2 font-display text-xl md:text-2xl leading-relaxed text-[var(--ink)] text-balance">
                  "{active.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={`grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br ${active.toneClass} text-white font-display font-bold text-base shrink-0`}
                  >
                    {active.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div>
                    <div className="font-display text-base font-semibold text-[var(--ink)]">
                      {active.name}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {active.title} · {active.company}
                    </div>
                  </div>
                  <span className="ml-auto text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                    {active.industry}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* Avatar selector reel */}
        <div className="mt-8 flex items-center justify-center gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`relative grid place-items-center shrink-0 rounded-full transition-all ${
                i === idx ? "h-12 w-12" : "h-10 w-10 opacity-60 hover:opacity-100"
              }`}
            >
              <span
                className={`grid place-items-center h-full w-full rounded-full bg-gradient-to-br ${t.toneClass} text-white font-display font-bold text-xs`}
              >
                {t.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              {i === idx && (
                <motion.span
                  aria-hidden
                  className="absolute -inset-1 rounded-full ring-2 ring-[var(--brand)]"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </button>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] group"
            >
              Read the case studies behind these quotes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
