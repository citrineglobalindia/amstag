import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Laptop,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: HeartPulse, title: "Family health cover", body: "Comprehensive medical for you, partner, kids and parents, from day one." },
  { icon: GraduationCap, title: "Learning budget", body: "₹60,000/year for certifications, conferences and books, pre-approved." },
  { icon: Laptop, title: "Best-in-class kit", body: "MacBook Pro / Dell Precision, dual monitors, ergonomic chair, work-from-home setup." },
  { icon: Plane, title: "Earned sabbatical", body: "Four weeks of paid sabbatical after every four years. Use them, don't bank them." },
  { icon: ShieldCheck, title: "Senior on-call respect", body: "Real comp days for after-hours work. We protect engineering focus time." },
  { icon: Sparkles, title: "Ownership", body: "Quarterly performance bonuses + ESOP for senior roles. We share the upside." },
];

const openings = [
  { title: "Senior SOC Analyst (Tier 3)", team: "Cybersecurity", location: "Bangalore", type: "Full-time" },
  { title: "Cloud Solutions Architect, AWS/Azure", team: "Cloud", location: "Bangalore / Remote India", type: "Full-time" },
  { title: "Network Engineer, SD-WAN/SASE", team: "Networking", location: "Bangalore / Mumbai", type: "Full-time" },
  { title: "Site Reliability Engineer", team: "Platform", location: "Bangalore", type: "Full-time" },
  { title: "Customer Success Manager, BFSI", team: "Customer Success", location: "Mumbai", type: "Full-time" },
  { title: "Service Desk Analyst (24×7 rotation)", team: "Managed Services", location: "Bangalore", type: "Full-time" },
];

const principles = [
  { title: "Senior accountability", body: "We don't hide behind queues. Every account, every incident, has a named owner." },
  { title: "Engineered, not assembled", body: "We solve root causes. Tools serve the design, never the other way around." },
  { title: "Customer outcomes > internal output", body: "We measure ourselves by their uptime, audits, and threat posture." },
  { title: "Curiosity over hierarchy", body: "Best argument wins. Most senior person speaks last." },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers, Amstag | Engineer mission-critical IT for India" },
      { name: "description", content: "Join the engineering team running enterprise IT for 250+ Indian businesses. Open roles in SOC, cloud, networking and SRE." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build the systems{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              India's enterprises depend on.
            </span>
          </>
        }
        description="We're a senior-heavy engineering team that runs production for 250+ companies. The work is real, the on-call is fair, and the upside is shared."
      >
        <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg group">
          <a href="#openings">
            See open roles <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Button>
      </PageHero>

      {/* Principles */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="How we work" title="Four principles, posted on the wall." />
          </Reveal>
          <StaggerContainer stagger={0.08} className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--brand)]">
                    Principle 0{i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--ink)]">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-[var(--surface)] border-y border-border py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Benefits" title="The package, in plain language." />
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <StaggerItem key={p.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl border border-border bg-card p-6"
                >
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-[var(--innovation)]/10 text-[var(--innovation)]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[var(--ink)]">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Open roles */}
      <section id="openings" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Open roles" title="Six teams hiring right now." />
          </Reveal>
          <StaggerContainer stagger={0.05} className="mt-12 grid gap-3">
            {openings.map((o) => (
              <StaggerItem key={o.title}>
                <Link to="/contact" className="block group">
                  <motion.div
                    whileHover={{ x: 4, borderColor: "var(--brand)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="rounded-xl border border-border bg-card p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                        {o.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
                        <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {o.team}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {o.location}</span>
                        <span className="font-mono uppercase tracking-widest text-[var(--brand)]">{o.type}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-foreground/60">
              Don't see your role? Email{" "}
              <a href="mailto:careers@amstag.in" className="text-[var(--brand)] hover:underline">
                careers@amstag.in
              </a>{" "}
             , we hire opportunistically for senior engineers.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
