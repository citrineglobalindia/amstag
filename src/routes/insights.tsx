import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const featured = {
  category: "Cybersecurity",
  title: "The first 90 days of an enterprise SOC: what actually moves the needle",
  excerpt:
    "Most SOC programs spend their first quarter assembling tools. The ones that work spend it agreeing on what 'normal' looks like, and how the business will be told when it isn't.",
  date: "Apr 24, 2026",
  read: "11 min",
};

const articles = [
  {
    category: "Cloud",
    title: "FinOps in Indian enterprises: where the rupee actually leaks",
    excerpt: "Six waste patterns we keep finding inside AWS, Azure and GCP estates, and the controls that stop them.",
    date: "Apr 12, 2026",
    read: "8 min",
  },
  {
    category: "BFSI",
    title: "RBI cyber-resilience: a checklist that holds up in audit week",
    excerpt: "How to translate the master direction into measurable, evidence-able controls without the spreadsheet circus.",
    date: "Mar 29, 2026",
    read: "13 min",
  },
  {
    category: "Networking",
    title: "SD-WAN to SASE: when the upgrade actually pays back",
    excerpt: "A simple model for sizing the SASE business case against your existing MPLS + firewall spend.",
    date: "Mar 18, 2026",
    read: "9 min",
  },
  {
    category: "Healthcare",
    title: "HIS uptime is a network problem before it's an application problem",
    excerpt: "Why the bedside experience usually breaks at layer 2, and the network designs that prevent it.",
    date: "Mar 6, 2026",
    read: "7 min",
  },
  {
    category: "Compliance",
    title: "From annual audits to continuous controls",
    excerpt: "The evidence pipelines that turn audit week into a non-event.",
    date: "Feb 21, 2026",
    read: "10 min",
  },
  {
    category: "Operations",
    title: "What a senior on-call rotation actually looks like",
    excerpt: "How Amstag's NOC structures its first-30-minute response, and why most outages don't reach a customer notification.",
    date: "Feb 8, 2026",
    read: "6 min",
  },
];

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights, Amstag | Field notes from enterprise IT" },
      { name: "description", content: "Practical writing from Amstag engineers and architects on cybersecurity, cloud, networking and operations." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Field notes from{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              the people running the systems.
            </span>
          </>
        }
        description="No vendor talking points. Just what we're seeing in production, across 250+ enterprise accounts, written by the architects and operators inside the work."
      />

      {/* Featured article */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <Link to="/insights" className="block">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center rounded-2xl border border-border bg-card p-8 md:p-10 shadow-[0_4px_20px_rgba(10,22,40,0.06)]"
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--brand)]/15 via-[var(--ink)]/5 to-[var(--innovation)]/15 grid place-items-center text-xs uppercase tracking-widest font-mono text-foreground/40 relative overflow-hidden">
                  <motion.div
                    aria-hidden
                    className="absolute -inset-10 bg-gradient-to-tr from-[var(--brand)]/30 via-transparent to-[var(--innovation)]/30 blur-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative">Featured</span>
                </div>
                <div>
                  <span className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                    Featured · {featured.category}
                  </span>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[var(--ink)] text-balance">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-foreground/70 leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-5 text-xs text-foreground/50">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.read} read</span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                    Read the article <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.article>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Article grid */}
      <section className="bg-[var(--surface)] border-y border-border py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Recent writing" title="Practical, from production." />
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <StaggerItem key={a.title}>
                <Link to="/insights" className="block h-full">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="group h-full rounded-xl border border-border bg-card p-6 flex flex-col"
                  >
                    <span className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                      {a.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-[var(--ink)] text-balance">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed flex-1">{a.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-foreground/50">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {a.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {a.read}</span>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
                Quarterly insights for IT leaders.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-foreground/70">One issue every quarter. Architecture deep-dives, post-incident notes, and the playbooks we wish we'd had earlier. No spam.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 mx-auto flex max-w-md gap-2"
              >
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="h-11 flex-1"
                />
                <Button type="submit" className="h-11 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                  Subscribe
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
