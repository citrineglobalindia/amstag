// Insights — 1 featured article with rotating gradient + 2 mini articles.
// Replaces the dense card grid with a compact teaser pattern that links
// straight to /insights for the rest.
// Signature animation: slow-rotating mesh gradient on the featured cover,
// hover-slide on the mini cards.
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { SectionHeader } from "./Offerings";

const featured = {
  category: "Cybersecurity",
  title: "The first 90 days of an enterprise SOC: what actually moves the needle",
  excerpt:
    "Most SOC programs spend their first quarter assembling tools. The ones that work spend it agreeing on what 'normal' looks like.",
  date: "Apr 24, 2026",
  read: "11 min",
};

const mini = [
  {
    category: "Cloud",
    title: "FinOps in Indian enterprises: where the rupee actually leaks",
    date: "Apr 12, 2026",
    read: "8 min",
  },
  {
    category: "BFSI",
    title: "RBI cyber-resilience: a checklist that holds up in audit week",
    date: "Mar 29, 2026",
    read: "13 min",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Insights"
            title="Field notes from production."
            desc="Practical writing from AMSTAG architects on cybersecurity, cloud, networking and operations. The deep archive lives on the Insights page."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured */}
          <Reveal direction="right" className="lg:col-span-7">
            <Link to="/insights" className="block group h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_24px_60px_rgba(10,22,40,0.10)] transition-shadow"
              >
                {/* Cover with rotating mesh */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--ink)]">
                  <motion.div
                    aria-hidden
                    className="absolute -inset-20 bg-[radial-gradient(circle_at_25%_30%,oklch(0.58_0.22_258/0.55),transparent_55%),radial-gradient(circle_at_75%_70%,oklch(0.78_0.16_175/0.5),transparent_55%)]"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  />
                  <div aria-hidden className="absolute inset-0 grid-mesh opacity-30" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/65">
                      Featured · {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--ink)] text-balance group-hover:text-[var(--brand)] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-foreground/50">
                    <span className="inline-flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.read}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-[var(--brand)]">
                      Read article
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </Reveal>

          {/* Mini articles */}
          <StaggerContainer stagger={0.08} className="lg:col-span-5 grid gap-4">
            {mini.map((m) => (
              <StaggerItem key={m.title}>
                <Link to="/insights" className="block group">
                  <motion.article
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="rounded-xl border border-border bg-card p-5 hover:border-[var(--brand)] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--brand)]">
                        {m.category}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--brand)]" />
                    </div>
                    <h4 className="mt-2 font-display text-base md:text-lg font-bold text-[var(--ink)] text-balance">
                      {m.title}
                    </h4>
                    <div className="mt-3 flex items-center gap-3 text-xs text-foreground/50">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {m.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {m.read}</span>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] group transition-colors"
            >
              Read all insights
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
