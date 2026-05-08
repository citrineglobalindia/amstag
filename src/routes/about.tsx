import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  Compass,
  HeartHandshake,
  Linkedin,
  Mail,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Twitter,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/Offerings";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "2007", title: "Founded in Bangalore", body: "Started as a 4-person systems integration shop on the BHEL Layout campus." },
  { year: "2011", title: "First enterprise BFSI win", body: "Onboarded a top-15 NBFC; built our managed-services playbook around it." },
  { year: "2015", title: "ISO 27001 certified", body: "Formalised our security posture; opened the 24×7 NOC/SOC." },
  { year: "2018", title: "100th enterprise client", body: "Crossed the 100-customer mark; expanded coverage to South India + Mumbai." },
  { year: "2021", title: "Cloud Centre of Excellence", body: "Launched dedicated AWS, Azure, GCP and VMware practices." },
  { year: "2024", title: "CMMI Level 3", body: "Re-engineered delivery to a global maturity standard." },
];

const values = [
  { icon: ShieldCheck, title: "Resilience first", body: "We design for the worst case so your business never sees one." },
  { icon: HeartHandshake, title: "Senior accountability", body: "Every account has a senior owner — escalation isn't a queue." },
  { icon: Sparkles, title: "Engineered, not assembled", body: "We solve root causes with custom playbooks, not stitched-together tools." },
  { icon: Compass, title: "Outcome over output", body: "We measure success by your uptime, audits passed, threats blocked." },
];

type LeaderTone = "brand" | "innovation" | "rose" | "amber";

const leadership: Array<{
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  tone: LeaderTone;
  linkedin?: string;
  twitter?: string;
  email?: string;
}> = [
  {
    name: "Anand M.",
    role: "Founder & CEO",
    bio: "20+ years in enterprise IT. Architect of the AMSTAG operating model. Ex-IBM, ex-Wipro Infrastructure Services.",
    expertise: ["Strategy", "BFSI", "Operating model"],
    tone: "brand",
    linkedin: "#",
    email: "anand@amstag.in",
  },
  {
    name: "Sneha R.",
    role: "Chief Operating Officer",
    bio: "Runs delivery, NOC and customer success across 250+ accounts. Built our SLA framework from scratch.",
    expertise: ["Operations", "NOC", "CS"],
    tone: "innovation",
    linkedin: "#",
    email: "sneha@amstag.in",
  },
  {
    name: "Karthik V.",
    role: "CTO",
    bio: "Cloud, security and platform engineering. Ex-VMware, ex-Cisco. Holds 4 cloud-architect certifications.",
    expertise: ["Cloud", "Architecture", "Platform"],
    tone: "rose",
    linkedin: "#",
    twitter: "#",
    email: "karthik@amstag.in",
  },
  {
    name: "Priya N.",
    role: "VP Cybersecurity",
    bio: "Heads the SOC and incident response. CISA, CISSP. Led IR for three of India's largest breach investigations.",
    expertise: ["SOC", "IR", "Compliance"],
    tone: "amber",
    linkedin: "#",
    email: "priya@amstag.in",
  },
];

const TONE: Record<LeaderTone, { gradient: string; ring: string; chip: string }> = {
  brand: {
    gradient: "from-[var(--brand)] to-[var(--ink-soft)]",
    ring: "ring-[var(--brand)]/40",
    chip: "border-[var(--brand)]/40 text-[var(--brand)]",
  },
  innovation: {
    gradient: "from-[var(--innovation)] to-emerald-700",
    ring: "ring-[var(--innovation)]/40",
    chip: "border-[var(--innovation)]/40 text-emerald-600",
  },
  rose: {
    gradient: "from-rose-400 to-rose-700",
    ring: "ring-rose-400/40",
    chip: "border-rose-400/40 text-rose-600",
  },
  amber: {
    gradient: "from-amber-400 to-amber-700",
    ring: "ring-amber-400/40",
    chip: "border-amber-400/40 text-amber-600",
  },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AMSTAG — Bangalore IT infrastructure & managed services" },
      { name: "description", content: "Founded in 2007, AMSTAG runs mission-critical IT for India's enterprises. Meet the team, mission and milestones." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About AMSTAG"
        title={
          <>
            Engineering trust into{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              India's mission-critical IT.
            </span>
          </>
        }
        description="Eighteen years. 250+ enterprise customers. One mandate: keep the systems your business depends on running — quietly, securely, and faster than they did yesterday."
      />

      {/* Mission strip */}
      <section className="bg-[var(--surface)] border-b border-border py-16 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal direction="right">
            <SectionHeader eyebrow="Our mission" title="Make enterprise IT something you stop worrying about." />
          </Reveal>
          <Reveal direction="left">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              India's leaders in BFSI, healthcare, government and manufacturing don't have time for IT
              that needs babysitting. We design infrastructure, security and operations that compound in
              reliability — so your teams can ship the next thing instead of fighting the last incident.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Director Speech */}
      <DirectorSpeech />

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="What we believe" title="Four principles that show up on every account." />
          </Reveal>
          <StaggerContainer stagger={0.08} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="h-full rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)]"
                >
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[var(--ink)]">{v.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{v.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section id="story" className="bg-[var(--surface)] py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Our story" title="From 4 engineers to 250+ enterprise accounts." />
          </Reveal>
          <div className="mt-14 relative">
            <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            <ol className="space-y-8 md:space-y-12">
              {milestones.map((m, i) => (
                <Reveal key={m.year} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.05}>
                  <li className="relative md:grid md:grid-cols-2 md:gap-12">
                    <motion.span
                      aria-hidden
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-4 md:left-1/2 top-1.5 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-[var(--brand)] ring-4 ring-[var(--surface)]"
                    />
                    <div
                      className={`pl-12 md:pl-0 ${
                        i % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"
                      }`}
                    >
                      <div className="font-mono text-sm uppercase tracking-widest text-[var(--brand)]">{m.year}</div>
                      <h3 className="mt-1 font-display text-xl font-bold text-[var(--ink)]">{m.title}</h3>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{m.body}</p>
                    </div>
                    <div aria-hidden className="hidden md:block" />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team showcase */}
      <TeamShowcase />

      {/* Stats / proof strip */}
      <section className="bg-[var(--ink)] text-white py-16 md:py-20">
        <div className="container-x">
          <StaggerContainer stagger={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { icon: Building2, value: "18+", label: "Years engineering enterprise IT" },
              { icon: Users, value: "250+", label: "Enterprise customers" },
              { icon: Award, value: "ISO 27001", label: "And ISO 9001 + CMMI L3" },
              { icon: Target, value: "99.99%", label: "Average uptime SLA delivered" },
            ].map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center lg:text-left lg:px-4 lg:border-l lg:border-white/10 first:border-l-0">
                  <s.icon className="h-5 w-5 text-[var(--innovation)] mx-auto lg:mx-0" />
                  <div className="mt-3 font-mono text-3xl md:text-4xl font-bold">{s.value}</div>
                  <p className="mt-1 text-sm text-white/60">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PageShell>
  );
}

/* ───────────────────────── Director Speech ───────────────────────── */

function DirectorSpeech() {
  return (
    <section className="relative bg-[var(--ink)] text-white py-20 md:py-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/30 blur-[120px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/20 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        {/* Director card */}
        <Reveal direction="right" className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Halo */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand)]/30 via-transparent to-[var(--innovation)]/30 blur-3xl"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              whileHover={{ rotate: -1, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative aspect-[4/5] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-end overflow-hidden"
            >
              {/* Initials avatar — large */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="grid place-items-center h-40 w-40 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white shadow-[0_0_60px_oklch(0.58_0.22_258/0.5)]">
                  <span className="font-display text-5xl font-bold">AM</span>
                </div>
              </motion.div>

              {/* Concentric rings */}
              <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 400">
                <circle cx="160" cy="180" r="120" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" fill="none" strokeDasharray="2 6" />
                <circle cx="160" cy="180" r="160" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" fill="none" />
              </svg>

              {/* Name plate */}
              <div className="relative">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">Founder & CEO</div>
                <div className="mt-1 font-display text-2xl font-bold">Anand M.</div>
                <div className="mt-0.5 text-xs text-white/60">Bangalore, India · 18 years in enterprise IT</div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Speech */}
        <Reveal direction="left" delay={0.1} className="lg:col-span-7">
          <div className="relative">
            <Quote
              aria-hidden
              className="absolute -top-6 -left-2 h-16 w-16 text-[var(--brand)]/20"
              strokeWidth={1.5}
            />
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">
              Director's address
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold leading-tight text-balance">
              "When we started AMSTAG in 2007, we made one promise — that the
              business calling us at 2 a.m. would speak to a senior engineer,
              not a ticket queue."
            </h2>
            <div className="mt-6 space-y-4 text-white/75 leading-relaxed text-base md:text-lg">
              <p>
                Eighteen years on, that promise still anchors how we hire, how
                we structure our NOC, and how we measure ourselves. We've
                built our practice in plain sight of India's most demanding
                regulators — RBI, SEBI, MeitY, IRDAI — and we've earned the
                trust of CIOs by being painfully transparent on the days
                things get hard.
              </p>
              <p>
                What you'll find on this site is the work — the case studies,
                the certifications, the team. What you won't find on this
                site is the texture of how we operate day to day. For that,
                we'd love a conversation.
              </p>
            </div>

            {/* Signature block */}
            <div className="mt-8 flex items-center gap-4">
              <motion.svg
                viewBox="0 0 220 60"
                width="160"
                height="44"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M5 35 C 25 5, 50 50, 75 25 S 130 5, 155 35 S 200 15, 215 30"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
                />
              </motion.svg>
              <div>
                <div className="font-display text-base font-semibold">Anand M.</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-white/50">Founder & CEO, AMSTAG</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                <Link to="/contact">Talk to the team</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/case-studies">See selected work</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Team Showcase ───────────────────────── */

function TeamShowcase() {
  return (
    <section id="leadership" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Leadership"
            title="Senior owners on every account, including yours."
            desc="Each role is operationally accountable, not just titled. Our leads run delivery, sit on customer escalations, and ship the playbooks our team uses."
          />
        </Reveal>
        <StaggerContainer stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((p) => {
            const tone = TONE[p.tone];
            return (
              <StaggerItem key={p.name}>
                <motion.article
                  initial={false}
                  whileHover="hover"
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_24px_60px_rgba(10,22,40,0.12)]"
                >
                  {/* Top stage with avatar */}
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${tone.gradient}`}>
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
                      <div className={`grid place-items-center h-24 w-24 rounded-full bg-white/15 backdrop-blur-md ring-4 ${tone.ring} text-white`}>
                        <span className="font-display text-3xl font-bold">
                          {p.name.split(" ").map((s) => s[0]).join("")}
                        </span>
                      </div>
                    </motion.div>

                    {/* Social row — slides up on hover */}
                    <motion.div
                      variants={{
                        hover: { opacity: 1, y: 0 },
                      }}
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

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[var(--ink)]">{p.name}</h3>
                    <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">{p.role}</div>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-3">{p.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.expertise.map((x) => (
                        <span
                          key={x}
                          className={`inline-block rounded-full border bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${tone.chip}`}
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

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-foreground/60">
            Backed by a team of 60+ engineers, architects and analysts.{" "}
            <Link to="/careers" className="text-[var(--brand)] hover:underline">
              We're hiring
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
