// Standalone /leadership page. Promotes the leadership team beyond the
// /about#leadership anchor with deeper bios, advisory board, culture
// principles and a careers CTA.
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Compass,
  HeartHandshake,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { Button } from "@/components/ui/button";

type Tone = "brand" | "innovation" | "rose" | "amber" | "violet" | "emerald";

const TONE: Record<Tone, { gradient: string; ring: string; chip: string }> = {
  brand: { gradient: "from-[var(--brand)] to-[var(--ink-soft)]", ring: "ring-[var(--brand)]/40", chip: "border-[var(--brand)]/40 text-[var(--brand)]" },
  innovation: { gradient: "from-[var(--innovation)] to-emerald-700", ring: "ring-[var(--innovation)]/40", chip: "border-[var(--innovation)]/40 text-emerald-600" },
  rose: { gradient: "from-rose-400 to-rose-700", ring: "ring-rose-400/40", chip: "border-rose-400/40 text-rose-600" },
  amber: { gradient: "from-amber-400 to-amber-700", ring: "ring-amber-400/40", chip: "border-amber-400/40 text-amber-600" },
  violet: { gradient: "from-violet-400 to-violet-700", ring: "ring-violet-400/40", chip: "border-violet-400/40 text-violet-600" },
  emerald: { gradient: "from-emerald-400 to-emerald-700", ring: "ring-emerald-400/40", chip: "border-emerald-400/40 text-emerald-600" },
};

type Leader = {
  name: string;
  role: string;
  blurb: string;
  bio: string;
  expertise: string[];
  tone: Tone;
  linkedin?: string;
  twitter?: string;
  email?: string;
};

const EXEC_TEAM: Leader[] = [
  {
    name: "Anand M.",
    role: "Founder & CEO",
    blurb: "Architect of the Amstag operating model.",
    bio: "20+ years in enterprise IT. Ex-IBM, ex-Wipro Infrastructure Services. Sets the operating model and sits on every major customer's escalation list.",
    expertise: ["Strategy", "BFSI", "Operating model"],
    tone: "brand",
    linkedin: "#",
    email: "anand@amstag.in",
  },
  {
    name: "Sneha R.",
    role: "Chief Operating Officer",
    blurb: "Runs delivery across 250+ accounts.",
    bio: "Built our SLA framework from scratch and runs the 24×7 NOC. Customer success leadership accountable for every QBR.",
    expertise: ["Operations", "NOC", "Customer Success"],
    tone: "innovation",
    linkedin: "#",
    email: "sneha@amstag.in",
  },
  {
    name: "Karthik V.",
    role: "Chief Technology Officer",
    blurb: "Cloud, security and platform engineering.",
    bio: "Ex-VMware, ex-Cisco. Holds 4 cloud-architect certifications. Owns the reference architectures every engagement starts from.",
    expertise: ["Cloud", "Architecture", "Platform"],
    tone: "rose",
    linkedin: "#",
    twitter: "#",
    email: "karthik@amstag.in",
  },
  {
    name: "Priya N.",
    role: "VP Cybersecurity",
    blurb: "Heads the SOC and incident response.",
    bio: "CISA, CISSP. Led IR for three of India's largest breach investigations. Runs the red team and threat-intel programmes.",
    expertise: ["SOC", "Incident Response", "Compliance"],
    tone: "amber",
    linkedin: "#",
    email: "priya@amstag.in",
  },
  {
    name: "Rohit S.",
    role: "VP Cloud Practice",
    blurb: "AWS / Azure / GCP / VMware Cloud lead.",
    bio: "AWS Hero alumnus. Designed landing zones for 60+ enterprise customers. Drives the FinOps practice.",
    expertise: ["AWS", "Azure", "FinOps"],
    tone: "violet",
    linkedin: "#",
    email: "rohit@amstag.in",
  },
  {
    name: "Meera J.",
    role: "VP Customer Success",
    blurb: "Senior owner on top-tier accounts.",
    bio: "20+ years in service delivery. Acts as the named senior owner on Amstag's most demanding accounts; reports directly to the COO on customer-health metrics.",
    expertise: ["Account leadership", "BFSI", "Healthcare"],
    tone: "emerald",
    linkedin: "#",
    email: "meera@amstag.in",
  },
];

const ADVISORY = [
  { name: "Vivek N.", role: "Advisor · Cybersecurity", note: "Former CISO of a top-5 NBFC." },
  { name: "Shalini A.", role: "Advisor · Healthcare IT", note: "Former CIO of a 1,400-bed hospital chain." },
  { name: "R. Mahesh", role: "Advisor · Public Sector", note: "Ex-MeitY senior consultant; 30 years in e-Gov." },
  { name: "Anita B.", role: "Advisor · GTM & FinOps", note: "Founded one of India's first cloud cost-optimisation practices." },
];

const PRINCIPLES = [
  { icon: HeartHandshake, title: "Senior accountability", body: "Every account has a named senior owner. Escalation isn't a queue." },
  { icon: ShieldCheck, title: "Resilience first", body: "We design for the worst case so your business never sees one." },
  { icon: Sparkles, title: "Engineered, not assembled", body: "Custom playbooks for the problem in front of us, not stitched-together tools." },
  { icon: Compass, title: "Outcome over output", body: "We measure ourselves by your uptime, audits passed, threats blocked." },
];

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership · Amstag | Senior owners on every account" },
      { name: "description", content: "Meet the Amstag leadership team. Operationally accountable, named on every account, sit on every customer escalation list." },
    ],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Leadership"
        title={
          <>
            Senior owners on every account.{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              Including yours.
            </span>
          </>
        }
        description="Our leads run delivery, sit on customer escalations, and ship the playbooks our team uses. Each role is operationally accountable, not just titled."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg group">
            <Link to="/contact">
              Talk to leadership <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to="/careers">Join the team</Link>
          </Button>
        </div>
      </PageHero>

      {/* Exec team */}
      <ExecGrid />

      {/* Operating principles */}
      <Principles />

      {/* Advisory board */}
      <Advisory />

      {/* Stats strip */}
      <StatsStrip />

      {/* Final CTA */}
      <FinalCta />
    </PageShell>
  );
}

function ExecGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Executive team
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Six leads. Each named on customer escalation paths.
          </h2>
        </Reveal>
        <StaggerContainer stagger={0.07} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXEC_TEAM.map((p) => {
            const t = TONE[p.tone];
            return (
              <StaggerItem key={p.name}>
                <motion.article
                  whileHover="hover"
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_24px_60px_rgba(10,22,40,0.12)]"
                >
                  {/* Top stage with avatar */}
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${t.gradient}`}>
                    <div aria-hidden className="absolute inset-0 grid-mesh opacity-30" />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/30 blur-3xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      variants={{ hover: { scale: 1.06, y: -4 } }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <div className={`grid place-items-center h-24 w-24 rounded-full bg-white/15 backdrop-blur-md ring-4 ${t.ring} text-white`}>
                        <span className="font-display text-3xl font-bold">
                          {p.name.split(" ").map((s) => s[0]).join("")}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{ hover: { opacity: 1, y: 0 } }}
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2"
                    >
                      {p.linkedin && (
                        <a aria-label={`${p.name} on LinkedIn`} href={p.linkedin} className="grid h-8 w-8 place-items-center rounded-md bg-black/30 text-white hover:bg-black/50">
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.twitter && (
                        <a aria-label={`${p.name} on Twitter`} href={p.twitter} className="grid h-8 w-8 place-items-center rounded-md bg-black/30 text-white hover:bg-black/50">
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.email && (
                        <a aria-label={`Email ${p.name}`} href={`mailto:${p.email}`} className="grid h-8 w-8 place-items-center rounded-md bg-black/30 text-white hover:bg-black/50">
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </motion.div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[var(--ink)]">{p.name}</h3>
                    <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">{p.role}</div>
                    <p className="mt-2 text-sm font-medium text-foreground/85">{p.blurb}</p>
                    <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{p.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.expertise.map((x) => (
                        <span
                          key={x}
                          className={`inline-block rounded-full border bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${t.chip}`}
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="bg-[var(--surface)] border-y border-border py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            How we operate
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Four principles, posted on the wall.
          </h2>
        </Reveal>
        <StaggerContainer stagger={0.07} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <StaggerItem key={p.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="h-full rounded-xl border border-border bg-card p-6"
              >
                <div className="grid place-items-center w-11 h-11 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--brand)]">
                  Principle 0{i + 1}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-[var(--ink)]">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Advisory() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
            Advisory board
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Sector-veterans who keep us honest.
          </h2>
          <p className="mt-3 text-base text-foreground/75 max-w-2xl">
            Independent advisors with deep operating experience in the
            industries we serve. They sit on our quarterly strategy reviews
            and act as a customer-facing escalation path when needed.
          </p>
        </Reveal>
        <StaggerContainer stagger={0.06} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ADVISORY.map((a) => (
            <StaggerItem key={a.name}>
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-[var(--ink)] to-[var(--ink-soft)] text-white font-display text-base font-bold">
                  {a.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-[var(--ink)]">{a.name}</h3>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--brand)]">{a.role}</div>
                <p className="mt-2 text-xs text-foreground/75 leading-relaxed">{a.note}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="bg-[var(--ink)] text-white py-16 md:py-20">
      <div className="container-x">
        <StaggerContainer stagger={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {[
            { icon: Users, value: "6", label: "Executive owners" },
            { icon: Award, value: "60+", label: "Engineers + architects" },
            { icon: ShieldCheck, value: "100%", label: "Accounts with named senior owner" },
            { icon: Sparkles, value: "4.8 / 5", label: "Average customer CSAT" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center lg:text-left lg:px-4 lg:border-l lg:border-white/10 first:border-l-0">
                <s.icon className="h-5 w-5 text-[var(--innovation)] mx-auto lg:mx-0" />
                <div className="mt-3 font-mono text-3xl md:text-4xl font-bold">{s.value}</div>
                <p className="mt-1 text-sm text-white/65">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[var(--surface)] border-y border-border py-16 md:py-20">
      <div className="container-x text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
            Get one of these names on your account.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-foreground/75 max-w-2xl mx-auto">
            Every Amstag engagement starts with a 30-minute call with one of
            our senior architects. No triage queue, no pre-call qualification.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 inline-flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
              <Link to="/contact">Book the call</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Read our story</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
