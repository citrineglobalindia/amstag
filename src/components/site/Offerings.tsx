// Offerings — featured-current showcase. One headline service occupies the
// large left tile and animates a focused inner illustration; three smaller
// tiles on the right surface the next-most-relevant practices. Hovering or
// tapping a small tile swaps it into the featured slot. A single "explore
// all 8 services" CTA replaces the old card grid.
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { SERVICES } from "@/lib/services";

const FEATURED_ORDER = ["cybersecurity", "cloud", "data-center", "managed-it"] as const;
const FEATURED = FEATURED_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)!).filter(Boolean);

export function Offerings() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURED[activeIdx];

  return (
    <section id="offerings" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Offerings"
            title="A full-stack IT partner — from copper to cloud."
            desc="Eight integrated practices, one accountable team. Browse the highlights here, then explore each one in depth."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured tile — animates on swap */}
          <Reveal direction="right" className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 h-full min-h-[420px] flex flex-col"
              >
                {/* Tone-tinted ambient blob */}
                <motion.div
                  aria-hidden
                  className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br ${active.tone.gradient}`}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={`grid place-items-center w-12 h-12 rounded-xl border bg-gradient-to-br ${active.tone.gradient} ${active.tone.chipBorder} text-white`}
                    style={{ boxShadow: `0 0 28px -6px ${active.tone.glow}` }}
                  >
                    <active.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                    Featured · {active.shortLabel}
                  </span>
                </div>
                <h3 className="relative mt-6 font-display text-2xl md:text-3xl font-bold text-[var(--ink)] text-balance">
                  {active.title}
                </h3>
                <p className="relative mt-2 text-foreground/70 leading-relaxed text-base">{active.tagline}</p>
                <ul className="relative mt-5 grid gap-2 sm:grid-cols-2 max-w-lg">
                  {active.hero.bullets.slice(0, 4).map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className={`mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--innovation)] shrink-0`} />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <div className="relative mt-auto pt-6 flex items-center justify-between gap-4">
                  <Link
                    to="/services/$slug"
                    params={{ slug: active.slug }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] group"
                  >
                    Read more about {active.shortLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {/* Tab indicators */}
                  <div className="flex items-center gap-1.5">
                    {FEATURED.map((s, i) => (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Show ${s.shortLabel}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeIdx
                            ? "w-8 bg-[var(--brand)]"
                            : "w-2 bg-foreground/15 hover:bg-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </Reveal>

          {/* Right column — selectable mini cards */}
          <div className="lg:col-span-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURED.map((s, i) => (
              <Reveal key={s.slug} direction="left" delay={i * 0.06}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  className={`group w-full text-left flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                    i === activeIdx
                      ? "border-[var(--brand)] bg-card shadow-[0_8px_30px_rgba(10,22,40,0.08)]"
                      : "border-border bg-card hover:border-[var(--brand)]/50"
                  }`}
                >
                  <span
                    className={`grid place-items-center w-10 h-10 rounded-lg border bg-gradient-to-br ${s.tone.gradient} ${s.tone.chipBorder} text-white shrink-0`}
                  >
                    <s.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-base font-semibold text-[var(--ink)] truncate">
                      {s.title}
                    </span>
                    <span className="block text-xs text-foreground/60 truncate">
                      {s.tagline}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={`h-4 w-4 shrink-0 transition-all ${
                      i === activeIdx
                        ? "text-[var(--brand)] translate-x-0.5 -translate-y-0.5"
                        : "text-foreground/30 group-hover:text-[var(--brand)]"
                    }`}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Single "explore all" CTA replaces the dump-it-all grid */}
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              Explore all 8 service practices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, desc, light = false }: { eyebrow: string; title: string; desc?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className={`inline-block text-xs uppercase tracking-[0.25em] font-mono ${light ? "text-[var(--innovation)]" : "text-[var(--brand)]"}`}>
        {eyebrow}
      </div>
      <h2 className={`mt-3 font-display text-3xl md:text-5xl font-bold text-balance ${light ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-4 text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{desc}</p>}
    </div>
  );
}
