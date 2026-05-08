import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, ShieldCheck, Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";

const cases = [
  {
    industry: "BFSI",
    title: "From quarterly RBI scrambles to weekly green dashboards",
    client: "Top-15 NBFC, ₹40,000 Cr AUM",
    metrics: [
      { icon: ShieldCheck, label: "Audit findings", value: "−92%" },
      { icon: Clock, label: "Audit prep time", value: "12w → 3w" },
      { icon: TrendingUp, label: "Posture score", value: "87/100" },
    ],
    body: "Replaced an evidence-by-screenshot regime with continuous control collection across endpoint, identity, network and cloud. RBI cyber-resilience audits now close in weeks, not quarters.",
  },
  {
    industry: "Healthcare",
    title: "ICU-grade uptime for a 1,400-bed hospital network",
    client: "Multi-specialty hospital chain, 6 locations",
    metrics: [
      { icon: Clock, label: "HIS uptime", value: "99.992%" },
      { icon: ShieldCheck, label: "MTTR critical", value: "47 min" },
      { icon: TrendingUp, label: "Helpdesk CSAT", value: "4.8/5" },
    ],
    body: "Re-engineered the network and identity stack across six campuses, layered in 24×7 monitoring of HIS/PACS/LIS, and rebuilt the bedside endpoint posture. Wards no longer page IT during incidents.",
  },
  {
    industry: "Manufacturing",
    title: "Plant-floor visibility without forklift upgrades",
    client: "Auto-component supplier, 4 plants",
    metrics: [
      { icon: TrendingUp, label: "OT incidents seen", value: "+340%" },
      { icon: ShieldCheck, label: "Segmentation gaps", value: "−100%" },
      { icon: Clock, label: "Time to detect", value: "31s avg" },
    ],
    body: "Deployed passive OT monitoring + IT/OT segmentation across all four plants without a single line stoppage. Plant managers now get the same dashboards as the corporate SOC.",
  },
  {
    industry: "Retail",
    title: "Black-Friday-grade infra on a year-round budget",
    client: "Omnichannel retailer, 320 stores",
    metrics: [
      { icon: TrendingUp, label: "Peak orders/sec", value: "12,400" },
      { icon: Clock, label: "POS downtime", value: "0 min" },
      { icon: ShieldCheck, label: "PCI findings", value: "Zero" },
    ],
    body: "Right-sized cloud infra with autoscaling and edge POS resilience. Stores stayed online during the year's largest sale weekend; PCI audit closed clean.",
  },
  {
    industry: "Government",
    title: "Citizen-portal modernisation, audit-trail intact",
    client: "State-level e-Gov platform",
    metrics: [
      { icon: TrendingUp, label: "Concurrent users", value: "180k" },
      { icon: Clock, label: "Page TTFB", value: "−68%" },
      { icon: ShieldCheck, label: "CERT-In aligned", value: "Yes" },
    ],
    body: "Migrated a legacy monolith to a sovereign-cloud landing zone with full audit trails, ensuring CERT-In and MeitY guidelines were satisfied end-to-end.",
  },
  {
    industry: "Logistics",
    title: "Stopped a credential-stuffing wave in real time",
    client: "Last-mile logistics, 8M monthly orders",
    metrics: [
      { icon: ShieldCheck, label: "Attempts blocked", value: "1.2M/24h" },
      { icon: Clock, label: "Time to mitigate", value: "9 min" },
      { icon: TrendingUp, label: "Account takeovers", value: "−99%" },
    ],
    body: "Our SOC detected an anomaly in login patterns within minutes, deployed adaptive rate-limits and bot-defense rules, and prevented an account-takeover wave from landing.",
  },
];

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — AMSTAG | Real outcomes for India's enterprises" },
      { name: "description", content: "Selected engagements across BFSI, healthcare, government, manufacturing, retail and logistics." },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Selected work.{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              Real outcomes, named clients.
            </span>
          </>
        }
        description="A representative slice of engagements — most of our work is under NDA. Numbers are the client's, methodology is ours."
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Engagements" title="Six stories from the last 18 months." />
          </Reveal>
          <StaggerContainer stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2">
            {cases.map((c) => (
              <StaggerItem key={c.title}>
                <motion.article
                  whileHover={{ y: -6, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group h-full rounded-xl border border-border bg-card p-6 md:p-8 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                      {c.industry}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="mt-3 font-display text-xl md:text-2xl font-bold text-[var(--ink)] text-balance">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/60">{c.client}</p>
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{c.body}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <m.icon className="mx-auto h-4 w-4 text-[var(--innovation)]" />
                        <dd className="mt-1 font-mono text-base md:text-lg font-bold text-[var(--ink)]">
                          {m.value}
                        </dd>
                        <dt className="text-[10px] uppercase tracking-widest text-foreground/50">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-[var(--surface)] border-y border-border py-16 md:py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              Want a closer look — under NDA?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
              We'll walk through the architecture, runbooks and SLAs of any engagement that maps to
              your environment. Most of our customer references happen on a 30-minute call.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                <Link to="/contact">Request a deep-dive</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
