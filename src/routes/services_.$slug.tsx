// Dynamic individual-service page. Resolves /services/:slug against the
// SERVICES catalogue and 404s if the slug isn't known. Renders a uniform
// deep-dive template (animated hero → overview → capabilities → methodology
// → tech stack → industries → stats → enquiry → related services).
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { ServiceEnquiry } from "@/components/site/ServiceEnquiry";
import {
  SERVICE_BY_SLUG,
  SERVICES,
  getRelatedServices,
  type Service,
} from "@/lib/services";

export const Route = createFileRoute("/services_/$slug")({
  // Loader returns only the slug. SERVICE_BY_SLUG entries contain React
  // component references (lucide icons), which can't be serialised across
  // the SSR -> client hydration boundary. Passing them through loader data
  // produces a hydration mismatch and React wipes the DOM (blank page).
  // The component resolves the full Service from the catalog itself.
  loader: ({ params }) => {
    if (!SERVICE_BY_SLUG[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug;
    const s = slug ? SERVICE_BY_SLUG[slug] : undefined;
    if (!s) return {};
    return {
      meta: [
        { title: `${s.title}, Amstag | ${s.tagline}` },
        { name: "description", content: s.description },
        { property: "og:title", content: `${s.title}, Amstag` },
        { property: "og:description", content: s.description },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData();
  const service = SERVICE_BY_SLUG[slug]!;
  return (
    <PageShell>
      <ServiceHero service={service} />
      <Overview service={service} />
      <Capabilities service={service} />
      <Methodology service={service} />
      <TechAndIndustries service={service} />
      <Stats service={service} />
      <ServiceEnquiry service={service} />
      <Related service={service} />
    </PageShell>
  );
}

/* ────────────────────────── Service Hero ────────────────────────── */

function ServiceHero({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <section className="relative bg-ink-gradient text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 grid-mesh opacity-50 pointer-events-none" />
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full blur-[100px] bg-gradient-to-br ${service.tone.gradient}`}
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
              to="/services"
              className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white"
            >
              ← All services
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--innovation)] animate-pulse" />
              {service.hero.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white text-balance">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl">
              {service.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-xl">
              {service.hero.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${service.tone.text}`} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg group">
                <a href="#enquire">
                  Enquire about {service.shortLabel}{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a href="#capabilities">See capabilities</a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right column, animated icon focal */}
        <Reveal direction="left" delay={0.15} className="lg:col-span-5">
          <div className="relative h-[320px] md:h-[420px] grid place-items-center">
            {/* Concentric guide rings */}
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
                background: `radial-gradient(circle, ${service.tone.glow}33 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`relative grid h-32 w-32 md:h-40 md:w-40 place-items-center rounded-3xl border bg-gradient-to-br ${service.tone.gradient} ${service.tone.chipBorder} backdrop-blur-md`}
              style={{ boxShadow: `0 30px 80px -20px ${service.tone.glow}66` }}
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

function Overview({ service }: { service: Service }) {
  return (
    <section className="bg-[var(--surface)] border-b border-border py-16 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <Reveal direction="right">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Overview
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              {service.overview.headline}
            </h2>
          </div>
        </Reveal>
        <Reveal direction="left">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {service.overview.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities({ service }: { service: Service }) {
  return (
    <section id="capabilities" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Capabilities
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            What we deliver in {service.shortLabel}.
          </h2>
        </Reveal>
        <StaggerContainer stagger={0.05} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c) => (
            <StaggerItem key={c.title}>
              <motion.div
                whileHover={{ y: -6, borderColor: "var(--brand)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="h-full rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
              >
                <CheckCircle2 className="h-5 w-5 text-[var(--innovation)]" />
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--ink)]">{c.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{c.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Methodology({ service }: { service: Service }) {
  return (
    <section className="bg-[var(--surface)] border-y border-border py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            How we engage
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Four phases. Senior owners on every one.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.methodology.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full rounded-xl border border-border bg-card p-6"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--brand)]">
                  Phase 0{i + 1}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{step.body}</p>
                {/* Connector arrow on md+ */}
                {i < service.methodology.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-border"
                  />
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechAndIndustries({ service }: { service: Service }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Tech stack
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
              Vendor-agnostic, OEM-certified.
            </h3>
            <StaggerContainer stagger={0.04} className="mt-6 flex flex-wrap gap-2">
              {service.stack.map((t) => (
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
        <Reveal direction="left">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Industries served
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
              Where this practice runs today.
            </h3>
            <StaggerContainer stagger={0.04} className="mt-6 grid grid-cols-2 gap-2">
              {service.industries.map((ind) => (
                <StaggerItem key={ind}>
                  <Link
                    to="/industries"
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 hover:border-[var(--brand)] transition-colors"
                  >
                    <span className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--brand)]">
                      {ind}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats({ service }: { service: Service }) {
  return (
    <section className="bg-[var(--ink)] text-white py-16 md:py-20">
      <div className="container-x">
        <StaggerContainer stagger={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {service.stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center sm:text-left sm:px-4 sm:border-l sm:border-white/10 first:sm:border-l-0">
                <div className={`font-mono text-3xl md:text-4xl font-bold ${service.tone.text}`}>
                  {s.value}
                </div>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Related({ service }: { service: Service }) {
  const related = getRelatedServices(service.slug);
  if (related.length === 0) return null;
  return (
    <section className="bg-[var(--surface)] border-t border-border py-16 md:py-20">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Related practices
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
            Often paired with {service.shortLabel}.
          </h3>
        </Reveal>
        <StaggerContainer stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <StaggerItem key={r.slug}>
              <Link to="/services/$slug" params={{ slug: r.slug }} className="block group h-full">
                <motion.article
                  whileHover={{ y: -6, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl border border-border bg-card p-6"
                >
                  <span className={`grid place-items-center w-11 h-11 rounded-lg border bg-gradient-to-br ${r.tone.gradient} ${r.tone.chipBorder}`}>
                    <r.icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </h4>
                  <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{r.tagline}</p>
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

// Pre-warm imports for SSR linking, TanStack tree-shakes these otherwise.
export const _allServices = SERVICES;
