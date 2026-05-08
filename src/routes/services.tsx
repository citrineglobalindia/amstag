import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AMSTAG | Data Center, Cloud, Cybersecurity, Managed IT" },
      { name: "description", content: "Eight enterprise IT practices: data center, networking, cloud, cybersecurity, managed services, compliance, backup & DR, and modern workplace." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Eight practices.{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              One accountable team.
            </span>
          </>
        }
        description="From racks to runbooks, identity to incident response — every service comes with a senior owner, a measurable SLA, and the engineers to back it up. Each practice has its own deep-dive page below."
      >
        <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg group">
          <Link to="/contact">
            Talk to an architect <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="What we do" title="The full stack — engineered, not assembled." />
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="block h-full group outline-none"
                >
                  <motion.article
                    whileHover={{ y: -8, borderColor: "var(--brand)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="relative h-full rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)] overflow-hidden"
                  >
                    {/* Tone-tinted glow on hover */}
                    <motion.div
                      aria-hidden
                      className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br ${s.tone.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative grid place-items-center w-11 h-11 rounded-lg border bg-gradient-to-br ${s.tone.gradient} ${s.tone.chipBorder} text-white`}
                      style={{ boxShadow: `0 0 24px -6px ${s.tone.glow}` }}
                    >
                      <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="relative mt-5 font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                      {s.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-foreground/70 leading-relaxed">
                      {s.tagline}
                    </p>
                    <ul className="relative mt-4 space-y-1.5 text-sm text-foreground/80">
                      {s.hero.bullets.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--innovation)] shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-foreground/50">
                        Explore practice
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--brand)]" />
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--surface)] border-y border-border py-16 md:py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              Don't see your problem listed? Bring it anyway.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
              Our best engagements often start with "this isn't a packaged service." Tell us the
              outcome you need; we'll architect to it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 inline-flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                <Link to="/contact">Book a consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/case-studies">See case studies</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
