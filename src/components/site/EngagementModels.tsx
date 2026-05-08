// EngagementModels — three commercial tiers showing how customers buy from
// AMSTAG. Each tier ships its inclusions, ideal-fit conditions, and a CTA.
// The middle tier is highlighted as the most-chosen option (visual anchor).
//
// Layout: 1-col on mobile, 3-col on lg. Featured card is full-width on mobile
// (not styled larger) so the visual hierarchy doesn't break.
// Animation: stagger reveal + per-tier hover lift + animated check-draw on
// inclusion bullets.
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

type Tier = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  name: string;
  tagline: string;
  bestFor: string;
  inclusions: string[];
  duration: string;
  ctaLabel: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    icon: Rocket,
    name: "Project Engagement",
    tagline: "Defined scope. Fixed milestones. Senior delivery.",
    bestFor: "One-off transformations: data-centre builds, cloud migrations, VAPT, audit prep.",
    inclusions: [
      "Discovery + scoping in 2 weeks",
      "Reference architecture + BoM",
      "Phased rollout with senior owners",
      "Runbook + knowledge transfer",
      "30-day post-launch hypercare",
    ],
    duration: "4–24 weeks",
    ctaLabel: "Start a project",
  },
  {
    icon: HeartHandshake,
    name: "Managed Services",
    tagline: "We run it. You report on it.",
    bestFor: "Ongoing operations of infra, security or full-stack IT under measurable SLAs.",
    inclusions: [
      "24×7 NOC + SOC coverage",
      "Tier 1 → 3 service desk",
      "Endpoint, server, network, identity",
      "Monthly KPI report + QBRs",
      "Continuous improvement backlog",
    ],
    duration: "12 months+",
    ctaLabel: "Get a quote",
    highlight: true,
  },
  {
    icon: Sparkles,
    name: "Strategic Partner",
    tagline: "CIO-level architecture + custom programmes.",
    bestFor: "Multi-year transformation programmes with dedicated team allocation.",
    inclusions: [
      "Dedicated architect-led team",
      "Quarterly business + tech reviews",
      "Joint roadmap + governance forum",
      "Priority access to senior engineers",
      "Custom commercial structure",
    ],
    duration: "Multi-year",
    ctaLabel: "Explore partnership",
  },
];

export function EngagementModels() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-border">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              How we engage
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              Three ways to work with AMSTAG.
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/70">
              From a single project to a multi-year programme — the commercial
              shape adapts to the work, not the other way around.
            </p>
          </div>
        </Reveal>

        <StaggerContainer
          stagger={0.08}
          delayChildren={0.1}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {tiers.map((t) => (
            <StaggerItem key={t.name}>
              <TierCard tier={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-foreground/60">
            Not sure which fits?{" "}
            <Link to="/contact" className="text-[var(--brand)] hover:underline">
              Talk to a senior architect
            </Link>{" "}
            — we'll help you scope it on a 30-min call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const Icon = tier.icon;
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative h-full rounded-2xl border p-6 md:p-7 flex flex-col ${
        tier.highlight
          ? "border-[var(--brand)] bg-card shadow-[0_24px_60px_rgba(0,102,255,0.12)]"
          : "border-border bg-card shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
      }`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[var(--brand)] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white shadow">
          <ShieldCheck className="h-3 w-3" /> Most chosen
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid place-items-center h-11 w-11 rounded-xl ${
            tier.highlight
              ? "bg-[var(--brand)] text-white"
              : "bg-[var(--brand)]/10 text-[var(--brand)]"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">
          {tier.duration}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-bold text-[var(--ink)]">{tier.name}</h3>
      <p className="mt-1 text-sm text-foreground/65">{tier.tagline}</p>

      <div className="mt-5 rounded-lg bg-[var(--surface)] border border-border px-3 py-2.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">
          Best for
        </span>
        <p className="mt-0.5 text-xs text-foreground/75 leading-relaxed">{tier.bestFor}</p>
      </div>

      <ul className="mt-5 space-y-2.5">
        {tier.inclusions.map((line, i) => (
          <motion.li
            key={line}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            className="flex items-start gap-2 text-sm text-foreground/85 leading-snug"
          >
            <span
              className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                tier.highlight ? "bg-[var(--brand)] text-white" : "bg-[var(--innovation)]/15 text-[var(--innovation)]"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {line}
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          to="/contact"
          className={`inline-flex items-center gap-1 text-sm font-medium group ${
            tier.highlight ? "text-[var(--brand)]" : "text-foreground/80 hover:text-[var(--brand)]"
          }`}
        >
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
