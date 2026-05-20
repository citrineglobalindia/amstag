// CaseStudies, featured engagement + 3 thumbnail tiles.
// One large card with a generative gradient backdrop highlights the
// signature case; three compact tiles tease additional outcomes. A single
// "Read all case studies →" CTA goes to /case-studies.
// Signature animation: number counter + drifting gradient mesh on the
// featured card, hover lift on each thumbnail.
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { SectionHeader } from "./Offerings";

const featured = {
  industry: "BFSI",
  client: "Top-15 NBFC, ₹40,000 Cr AUM",
  title: "From quarterly RBI scrambles to weekly green dashboards.",
  body: "Replaced an evidence-by-screenshot regime with continuous control collection across endpoint, identity, network and cloud.",
  metrics: [
    { icon: ShieldCheck, label: "Audit findings", value: "−92%" },
    { icon: Clock, label: "Audit prep time", value: "12w → 3w" },
    { icon: TrendingUp, label: "Posture score", value: "87/100" },
  ],
};

const thumbs = [
  {
    industry: "Healthcare",
    title: "ICU-grade uptime for a 1,400-bed hospital network",
    metric: "99.992% HIS uptime",
  },
  {
    industry: "Manufacturing",
    title: "Plant-floor visibility without forklift upgrades",
    metric: "0 line stoppages on cutover",
  },
  {
    industry: "Retail",
    title: "Black-Friday-grade infra on a year-round budget",
    metric: "12,400 orders/sec peak",
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="bg-[var(--ink)] text-white py-20 md:py-28 overflow-hidden relative">
      <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/25 blur-[120px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative z-10">
        <Reveal>
          <SectionHeader eyebrow="Case studies" light title="Selected work. Real outcomes." />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured */}
          <Reveal direction="right" className="lg:col-span-7">
            <Link to="/case-studies" className="block group">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 h-full min-h-[380px] flex flex-col"
              >
                {/* Drifting gradient mesh */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_20%_30%,oklch(0.58_0.22_258/0.4),transparent_60%),radial-gradient(circle_at_80%_70%,oklch(0.78_0.16_175/0.3),transparent_60%)]"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--innovation)]">
                    Featured · {featured.industry}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/55 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="relative mt-4 font-display text-2xl md:text-3xl font-bold text-white text-balance">
                  {featured.title}
                </h3>
                <p className="relative mt-2 text-sm text-white/75">{featured.client}</p>
                <p className="relative mt-4 text-base text-white/80 leading-relaxed max-w-2xl">
                  {featured.body}
                </p>
                <dl className="relative mt-auto pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
                  {featured.metrics.map((m) => (
                    <div key={m.label}>
                      <m.icon className="h-4 w-4 text-[var(--innovation)]" />
                      <dd className="mt-2 font-mono text-base md:text-lg font-bold text-white">{m.value}</dd>
                      <dt className="text-[10px] uppercase tracking-widest text-white/65">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              </motion.article>
            </Link>
          </Reveal>

          {/* Thumbnails */}
          <StaggerContainer stagger={0.08} className="lg:col-span-5 grid gap-4">
            {thumbs.map((t) => (
              <StaggerItem key={t.title}>
                <Link to="/case-studies" className="block group">
                  <motion.article
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:bg-white/[0.07] hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--innovation)]">
                        {t.industry}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/55 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <h4 className="mt-2 font-display text-base font-semibold text-white text-balance">
                      {t.title}
                    </h4>
                    <div className="mt-2 inline-block text-xs font-mono text-white/70">{t.metric}</div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 group"
            >
              Read all 6 case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
