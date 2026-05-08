import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  HeartPulse,
  Landmark,
  Radio,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";

const industries = [
  {
    icon: Wallet,
    name: "BFSI",
    headline: "RBI/SEBI-grade controls. Audit-week confidence.",
    points: ["Core banking + treasury support", "Continuous compliance pipelines", "24×7 SOC, RBI cyber resilience"],
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    headline: "HIS/EMR uptime that keeps wards moving.",
    points: ["HIS/PACS/LIS integrations", "HIPAA-aligned data handling", "Bedside-grade endpoint posture"],
  },
  {
    icon: Landmark,
    name: "Government",
    headline: "Citizen-scale systems with audit-grade trails.",
    points: ["e-Gov platform operations", "MeitY guidelines + CERT-In", "Sovereign cloud + on-prem hybrids"],
  },
  {
    icon: Factory,
    name: "Manufacturing",
    headline: "OT + IT, finally on the same network plan.",
    points: ["Plant-floor + ERP integrations", "OT segmentation + visibility", "Resilient WAN across plants"],
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    headline: "Storefront uptime, billion-event peak days.",
    points: ["POS + omnichannel platforms", "Edge networking at scale", "PCI DSS continuous compliance"],
  },
  {
    icon: Radio,
    name: "Telecom",
    headline: "Carrier-grade ops without carrier overhead.",
    points: ["BSS/OSS support", "Edge + core observability", "Resilient backhaul + peering"],
  },
  {
    icon: Truck,
    name: "Logistics",
    headline: "Track every parcel; protect every API.",
    points: ["WMS / TMS operations", "API gateway + bot defense", "Hub-and-spoke connectivity"],
  },
  {
    icon: Building2,
    name: "Real Estate & Hospitality",
    headline: "Distributed properties, centralised IT.",
    points: ["Property-level SD-WAN", "Guest Wi-Fi + PCI", "Centralised identity + helpdesk"],
  },
];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — AMSTAG | BFSI, Healthcare, Government, Manufacturing & more" },
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
        description="Each sector brings its own regulators, peak loads and failure modes. We bring the playbooks — refined across 250+ enterprise accounts — and adapt them to yours."
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Where we deliver" title="Eight industries. Specialist teams in each." />
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <StaggerItem key={ind.name}>
                <motion.article
                  whileHover={{ y: -8, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group h-full rounded-xl border border-border bg-card p-6"
                >
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-[var(--innovation)]/10 text-[var(--innovation)] group-hover:bg-[var(--innovation)] group-hover:text-white transition-colors">
                    <ind.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[var(--ink)]">{ind.name}</h3>
                  <p className="mt-2 text-sm text-[var(--brand)] font-medium">{ind.headline}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-foreground/70">
                    {ind.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.article>
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
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Our engineering disciplines transfer. Tell us your operating environment and the
              outcomes you need; we'll show you which playbooks apply.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                <Link to="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
