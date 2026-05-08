import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Cpu,
  Database,
  HeadphonesIcon,
  Network,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Server,
    title: "Data Center Engineering",
    body: "Greenfield + brownfield builds, capacity planning, hyperconverged infrastructure, DR engineering and migrations. We've moved petabytes without downtime.",
    bullets: ["Tier III/IV reference designs", "VxRail / Nutanix / vSphere", "DR site design + runbooks"],
  },
  {
    icon: Network,
    title: "Networking",
    body: "Campus, branch, data-center fabric and SD-WAN — designed, deployed and run. From core switches to last-mile failover.",
    bullets: ["Cisco / Juniper / Aruba", "Zero-trust segmentation", "SD-WAN + SASE rollouts"],
  },
  {
    icon: Cloud,
    title: "Cloud & Hosting",
    body: "AWS, Azure, GCP and VMware Cloud — landing zones, FinOps, lift-shift-modernise, and full managed cloud operations.",
    bullets: ["Landing-zone architecture", "Cost optimisation", "24×7 cloud operations"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    body: "Vulnerability management, EDR/XDR, SIEM, identity, and a 24×7 SOC. Red-team validated, RBI/SEBI/HIPAA aligned.",
    bullets: ["24×7 SOC + IR", "EDR / XDR / SIEM", "VAPT + red team"],
  },
  {
    icon: HeadphonesIcon,
    title: "Managed IT Services",
    body: "Full-stack ITSM with senior on-call ownership. We handle endpoint, server, network, identity, and user support — by SLA.",
    bullets: ["Tiered support, senior owners", "Endpoint / server / identity", "Quarterly business reviews"],
  },
  {
    icon: Workflow,
    title: "Compliance & Governance",
    body: "ISO 27001, RBI, SEBI, HIPAA, PCI DSS — gap analysis, controls implementation, audit prep and continuous compliance.",
    bullets: ["Gap analysis + remediation", "Controls + evidence pipelines", "Auditor-ready reporting"],
  },
  {
    icon: Database,
    title: "Backup & Resilience",
    body: "Veeam / Commvault / Rubrik backed by immutable storage and tested DR. Recovery objectives that hold up under audit.",
    bullets: ["Immutable backups", "RTO/RPO design + drills", "Ransomware recovery"],
  },
  {
    icon: Cpu,
    title: "Modern Workplace",
    body: "Microsoft 365, Google Workspace, Intune/MDM, identity federation, and zero-trust device posture for distributed teams.",
    bullets: ["M365 + Entra ID", "Intune / MDM", "Conditional access"],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AMSTAG | Data Center, Cloud, Cybersecurity, Managed IT" },
      { name: "description", content: "End-to-end IT services: data center, networking, cloud, cybersecurity, managed services, compliance and modern workplace." },
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
        description="From racks to runbooks, identity to incident response — every service comes with a senior owner, a measurable SLA, and the engineers to back it up."
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
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <motion.article
                  whileHover={{ y: -8, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group h-full rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
                >
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white transition-colors">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--ink)]">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.body}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--innovation)] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.article>
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
