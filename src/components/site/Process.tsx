// Process, SVG line-drawing timeline.
// Each phase node sits on a curved SVG path that draws itself in as the
// section enters the viewport. Nodes pop on scroll progress, and a moving
// "build pulse" travels along the path on a loop.
// Signature animation: pathLength tween + travelling glow.
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeader } from "./Offerings";

const steps = [
  { icon: Search, title: "Discover", desc: "Architecture + risk assessment." },
  { icon: PenTool, title: "Design", desc: "Reference architecture, BoM, runbook." },
  { icon: Rocket, title: "Deploy", desc: "Phased rollouts. Zero-downtime cutovers." },
  { icon: Activity, title: "Operate", desc: "24×7 NOC, ITIL-aligned SLAs." },
  { icon: TrendingUp, title: "Optimise", desc: "Quarterly reviews · FinOps · capacity." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  // Stroke draw progress mapped from scroll
  const drawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="How we deliver"
            title="Five phases. One accountable team."
            desc="Every engagement runs through the same playbook, from discovery to continuous optimisation."
          />
        </Reveal>

        {/* Timeline stage */}
        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* SVG line, desktop only */}
          <div className="hidden md:block absolute inset-x-0 top-12 h-32 pointer-events-none" aria-hidden>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.58 0.22 258 / 0)" />
                  <stop offset="20%" stopColor="oklch(0.58 0.22 258)" />
                  <stop offset="80%" stopColor="oklch(0.78 0.16 175)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.16 175 / 0)" />
                </linearGradient>
                <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Main curved path through all 5 nodes */}
              <motion.path
                d="M 60 60 C 200 -20, 360 140, 500 60 S 800 -20, 940 60 S 1140 140, 1180 60"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="0 1"
                style={{ pathLength: drawProgress }}
              />

              {/* Travelling pulse */}
              {inView && (
                <motion.circle
                  r="4"
                  fill="white"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                  style={{
                    offsetPath: "path('M 60 60 C 200 -20, 360 140, 500 60 S 800 -20, 940 60 S 1140 140, 1180 60')",
                    filter: "drop-shadow(0 0 8px white)",
                  }}
                />
              )}
            </svg>
          </div>

          {/* Mobile vertical guide rail */}
          <div aria-hidden className="md:hidden absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand)]/40 via-[var(--innovation)]/40 to-transparent" />

          {/* Nodes */}
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center"
              >
                {/* Pulsing dot */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.25 + i * 0.12 }}
                  className="relative grid place-items-center h-14 w-14 shrink-0 rounded-full bg-white border-2 border-[var(--brand)]/40 z-10 shadow-[0_8px_24px_rgba(0,102,255,0.25)]"
                >
                  <s.icon className="h-5 w-5 text-[var(--brand)]" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-2 ring-[var(--brand)]/30"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                  />
                </motion.span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand)]">
                    Phase 0{i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-base md:text-lg font-bold text-[var(--ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-foreground/65 leading-snug">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] group"
            >
              Read how each phase works in detail
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
