import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/lib/industries";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries, Amstag | BFSI, Healthcare, Government, Manufacturing & more" },
      { name: "description", content: "Industry-specific IT engineering for BFSI, healthcare, government, manufacturing, retail, telecom, logistics and hospitality." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Industry-shaped engineering.{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              Same operational rigor.
            </span>
          </>
        }
        description="Each sector brings its own regulators, peak loads and failure modes. We bring the playbooks, refined across 250+ enterprise accounts, and adapt them to yours. Pick a sector below to go deeper."
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Where we deliver" title="Eight sectors. Specialist teams in each." />
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind) => (
              <StaggerItem key={ind.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: ind.slug }}
                  className="block h-full group outline-none"
                >
                  <motion.article
                    whileHover={{ y: -8, borderColor: "var(--brand)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="relative h-full rounded-xl border border-border bg-card p-6 overflow-hidden"
                  >
                    {/* Tone-tinted hover glow */}
                    <motion.div
                      aria-hidden
                      className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br ${ind.tone.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative grid place-items-center w-11 h-11 rounded-lg border bg-gradient-to-br ${ind.tone.gradient} ${ind.tone.chipBorder} text-white`}
                      style={{ boxShadow: `0 0 24px -6px ${ind.tone.glow}` }}
                    >
                      <ind.icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="relative mt-5 font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                      {ind.shortLabel}
                    </h3>
                    <p className="relative mt-2 text-sm text-[var(--brand)] font-medium">{ind.tagline}</p>
                    <ul className="relative mt-4 space-y-1.5 text-sm text-foreground/75">
                      {ind.hero.bullets.slice(0, 3).map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-foreground/55">
                        Explore sector
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

      <section className="bg-[var(--ink)] text-white py-16 md:py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-balance">
              Operating in a sector we haven't listed?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/75 max-w-2xl mx-auto">
              Our engineering disciplines transfer. Tell us your operating
              environment and the outcomes you need; we'll show you which
              playbooks apply.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                <Link to="/contact">Start a conversation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/services">See all services <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
