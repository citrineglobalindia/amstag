// WhyAmstag, animated metric bars.
// Four "proof bars" that fill on scroll into view, each tied to an outcome
// metric (audit-finding reduction, MTTR, uptime, OEM partnerships). The
// bar percentages animate via framer-motion `whileInView` with eased fills.
// Signature animation: bars sweep left-to-right with a moving highlight.
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers, Target, Users } from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeader } from "./Offerings";

type Pillar = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
  /** 0–100, visualises the outcome strength. */
  fill: number;
  /** Numerator metric (the actual value beside the bar). */
  metric: string;
  /** What the metric represents. */
  metricLabel: string;
  /** Tailwind colour class for the fill. */
  color: string;
};

const pillars: Pillar[] = [
  {
    icon: Target,
    title: "Outcome-First AI Approach",
    blurb: "We design for measurable outcomes, not slideware. Every AI recommendation is backed by a runbook, live data, and a named engineer accountable for results.",
    fill: 92,
    metric: "−92%",
    metricLabel: "Audit findings vs. baseline",
    color: "bg-[var(--brand)]",
  },
  {
    icon: BookOpen,
    title: "AI-Augmented Domain Expertise",
    blurb: "Senior AI architects with 20+ years across BFSI, healthcare, and government — combining deep domain knowledge with intelligent automation.",
    fill: 87,
    metric: "9 min",
    metricLabel: "AI median threat detection",
    color: "bg-[var(--innovation)]",
  },
  {
    icon: Users,
    title: "Autonomous Ops, Human Accountability",
    blurb: "AI does the monitoring. Humans own the outcomes. Named senior engineers on every account — no queue hiding, no anonymous helpdesk.",
    fill: 99,
    metric: "99.99%",
    metricLabel: "Intelligent uptime SLA",
    color: "bg-rose-400",
  },
  {
    icon: Layers,
    title: "Modular AI Platform",
    blurb: "Start with a single AI-powered workload. Scale to a national intelligent infrastructure programme with commercial structures that adapt.",
    fill: 80,
    metric: "40+",
    metricLabel: "Technology partnerships",
    color: "bg-amber-400",
  },
];

export function WhyAmstag() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-border">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          <Reveal direction="right" className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why Amstag"
              title="Built for boards. Trusted by operators."
              desc="Four operating principles, each with a measurable proof point we publish to customers every quarter."
            />
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] group"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="lg:col-span-7 space-y-5">
            {pillars.map((p, i) => (
              <PillarRow key={p.title} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarRow({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.08)] transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <span className="grid place-items-center h-10 w-10 rounded-lg bg-[var(--ink)] text-white shrink-0">
            <pillar.icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--ink)]">{pillar.title}</h3>
            <p className="text-sm text-foreground/65 leading-snug">{pillar.blurb}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-lg md:text-xl font-bold text-[var(--ink)]">{pillar.metric}</div>
          <div className="text-[10px] uppercase tracking-widest text-foreground/45 mt-0.5">
            {pillar.metricLabel}
          </div>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-4 relative h-2 rounded-full bg-foreground/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pillar.fill}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.08 }}
          className={`relative h-full rounded-full ${pillar.color}`}
        >
          {/* Moving sheen */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -inset-x-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: "-200%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
              delay: 1 + index * 0.2,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
