// Dynamic individual-industry page. Resolves /industries/:slug against the
// INDUSTRIES catalogue and 404s if the slug isn't known. Renders a uniform
// deep-dive template (hero, overview, sector challenges, solutions linking
// to services, regulators + tech stack, stats, enquiry, related industries).
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { IndustryEnquiry } from "@/components/site/IndustryEnquiry";
import {
  INDUSTRY_BY_SLUG,
  INDUSTRIES,
  getRelatedIndustries,
  type Industry,
} from "@/lib/industries";
import { SERVICE_BY_SLUG } from "@/lib/services";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRY_BY_SLUG[params.slug];
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const ind = loaderData?.industry;
    if (!ind) return {};
    return {
      meta: [
        { title: `${ind.title}, Amstag | ${ind.tagline}` },
        { name: "description", content: ind.description },
        { property: "og:title", content: `${ind.title}, Amstag` },
        { property: "og:description", content: ind.description },
      ],
    };
  },
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { industry } = Route.useLoaderData();
  return (
    <PageShell>
      <IndustryHero industry={industry} />
      <Overview industry={industry} />
      <Challenges industry={industry} />
      <Solutions industry={industry} />
      <Regulators industry={industry} />
      <Stats industry={industry} />
      <IndustryEnquiry industry={industry} />
      <Related industry={industry} />
    </PageShell>
  );
}

/* ────────────────────────── Industry Hero ────────────────────────── */

function IndustryHero({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <section className="relative bg-ink-gradient text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 grid-mesh opacity-50 pointer-events-none" />
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full blur-[100px] bg-gradient-to-br ${industry.tone.gradient}`}
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-[var(--innovation)]/20 blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.2em] text-white/65 hover:text-white"
            >
              ← All industries
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--innovation)] animate-pulse" />
              {industry.hero.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white text-balance">
              {industry.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              {industry.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-xl">
              {industry.hero.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${industry.tone.text}`} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg group">
                <a href="#enquire">
                  Enquire about {industry.shortLabel}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a href="#challenges">See sector challenges</a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right column, animated icon focal */}
        <Reveal direction="left" delay={0.15} className="lg:col-span-5">
          <div className="relative h-[320px] md:h-[420px] grid place-items-center">
            <svg
              aria-hidden
              viewBox="0 0 420 420"
              className="absolute inset-0 w-full h-full"
            >
              <circle cx="210" cy="210" r="80" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" />
              <circle cx="210" cy="210" r="130" fill="none" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" strokeDasharray="2 6" />
              <circle cx="210" cy="210" r="180" fill="none" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" />
            </svg>
            <motion.div
              aria-hidden
              className="absolute inset-0 m-auto h-[260px] w-[260px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${industry.tone.glow}33 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`relative grid h-32 w-32 md:h-40 md:w-40 place-items-center rounded-3xl border bg-gradient-to-br ${industry.tone.gradient} ${industry.tone.chipBorder} backdrop-blur-md`}
              style={{ boxShadow: `0 30px 80px -20px ${industry.tone.glow}66` }}
            >
              <Icon className="h-14 w-14 md:h-20 md:w-20 text-white" strokeWidth={1.6} />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────── Sections ────────────────────────── */

function Overview({ industry }: { industry: Industry }) {
  return (
    <section className="bg-[var(--surface)] border-b border-border py-16 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <Reveal direction="right">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Overview
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              {industry.overview.headline}
            </h2>
          </div>
        </Reveal>
        <Reveal direction="left">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {industry.overview.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Challenges({ industry }: { industry: Industry }) {
  return (
    <section id="challenges" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Sector challenges
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            What we keep hearing in {industry.shortLabel} rooms.
          </h2>
        </Reveal>
        <StaggerContainer stagger={0.05} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industry.challenges.map((c) => (
            <StaggerItem key={c.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="h-full rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--brand)]">
                  Challenge
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--ink)]">{c.title}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{c.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Solutions({ industry }: { industry: Industry }) {
  return (
    <section className="bg-[var(--surface)] border-y border-border py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            How we solve them
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Solutions paired with the services that drive them.
          </h2>
        </Reveal>
        <StaggerContainer stagger={0.05} className="mt-12 grid gap-5 md:grid-cols-2">
          {industry.solutions.map((s) => {
            const svc = s.serviceSlug ? SERVICE_BY_SLUG[s.serviceSlug] : undefined;
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-display text-lg font-bold text-[var(--ink)]">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{s.body}</p>
                  {svc && (
                    <Link
                      to="/services/$slug"
                      params={{ slug: svc.slug }}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] group transition-colors"
                    >
                      <span className={`grid place-items-center w-5 h-5 rounded border bg-gradient-to-br ${svc.tone.gradient} ${svc.tone.chipBorder} text-white`}>
                        <svc.icon className="h-3 w-3" strokeWidth={2} />
                      </span>
                      Powered by {svc.shortLabel}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Regulators({ industry }: { industry: Industry }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Regulators & frameworks
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
              Aligned to what your auditors check.
            </h3>
            <StaggerContainer stagger={0.04} className="mt-6 flex flex-wrap gap-2">
              {industry.regulators.map((r) => (
                <StaggerItem key={r}>
                  <motion.span
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors cursor-default"
                  >
                    <ShieldCheck className="h-3 w-3 text-[var(--innovation)]" />
                    {r}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
        <Reveal direction="left">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Tech stack we deploy
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
              Vendor-agnostic, sector-tested.
            </h3>
            <StaggerContainer stagger={0.04} className="mt-6 flex flex-wrap gap-2">
              {industry.stack.map((t) => (
                <StaggerItem key={t}>
                  <motion.span
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="inline-block rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats({ industry }: { industry: Industry }) {
  return (
    <section className="bg-[var(--ink)] text-white py-16 md:py-20">
      <div className="container-x">
        <StaggerContainer stagger={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {industry.stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center sm:text-left sm:px-4 sm:border-l sm:border-white/10 first:sm:border-l-0">
                <div className={`font-mono text-3xl md:text-4xl font-bold ${industry.tone.text}`}>
                  {s.value}
                </div>
                <p className="mt-1 text-sm text-white/65">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Related({ industry }: { industry: Industry }) {
  const related = getRelatedIndustries(industry.slug);
  if (related.length === 0) return null;
  return (
    <section className="bg-[var(--surface)] border-t border-border py-16 md:py-20">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Related sectors
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
            Other industries we serve.
          </h3>
        </Reveal>
        <StaggerContainer stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <StaggerItem key={r.slug}>
              <Link to="/industries/$slug" params={{ slug: r.slug }} className="block group h-full">
                <motion.article
                  whileHover={{ y: -6, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl border border-border bg-card p-6"
                >
                  <span className={`grid place-items-center w-11 h-11 rounded-lg border bg-gradient-to-br ${r.tone.gradient} ${r.tone.chipBorder} text-white`}>
                    <r.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </h4>
                  <p className="mt-1 text-sm text-foreground/75 leading-relaxed">{r.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--brand)]">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Pre-warm imports so TanStack tree-shaking doesn't drop them
export const _allIndustries = INDUSTRIES;
