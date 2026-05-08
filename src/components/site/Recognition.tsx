// Recognition — three rolled-up trust signals on one section:
//   1. Partner tier strip (40+ OEM partnerships, 12 highlighted)
//   2. Award timeline (selected industry recognition)
//   3. Press / media-mentions row
// Designed to be scan-friendly: every block has its own column on desktop,
// stacks on mobile in the same order.
//
// Animation: tile-by-tile stagger reveal, hover lift + tone tint on partners,
// timeline dot pop and connecting line draw on awards, marquee-style press
// row that pauses on hover.
import { motion } from "framer-motion";
import { Award, BadgeCheck, Newspaper, Star, Trophy } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const PARTNERS: Array<{ name: string; tier?: "platinum" | "gold" | "silver" }> = [
  { name: "Cisco", tier: "platinum" },
  { name: "Microsoft", tier: "platinum" },
  { name: "Dell", tier: "gold" },
  { name: "HPE", tier: "gold" },
  { name: "AWS", tier: "gold" },
  { name: "Fortinet", tier: "platinum" },
  { name: "VMware", tier: "gold" },
  { name: "Palo Alto", tier: "gold" },
  { name: "Veeam", tier: "silver" },
  { name: "Juniper", tier: "silver" },
  { name: "Sophos", tier: "silver" },
  { name: "Lenovo", tier: "silver" },
];

const TIER_TONE: Record<NonNullable<typeof PARTNERS[number]["tier"]>, string> = {
  platinum: "bg-gradient-to-br from-[var(--brand)]/20 to-[var(--innovation)]/15 border-[var(--brand)]/40 text-[var(--brand)]",
  gold: "bg-gradient-to-br from-amber-100/60 to-amber-50 border-amber-300/60 text-amber-700",
  silver: "bg-gradient-to-br from-slate-100 to-slate-50 border-slate-300/70 text-slate-700",
};

const AWARDS = [
  { year: "2024", title: "CMMI Maturity Level 3", body: "Re-certified — global delivery maturity benchmark." },
  { year: "2023", title: "AWS Partner — Advanced Tier", body: "Promoted from Select Tier after 200+ certifications." },
  { year: "2022", title: "Microsoft Solutions Partner", body: "Modern Work + Security + Azure Infrastructure." },
  { year: "2021", title: "Best Managed Service Provider · South India", body: "Awarded by CIO Tech Asia — Enterprise IT Awards." },
];

const PRESS = [
  { quote: "...redefined what 'managed' means for the Indian mid-market.", outlet: "CIO Tech Asia" },
  { quote: "Their SOC stopped a credential-stuffing wave in real time.", outlet: "ETCISO Quarterly" },
  { quote: "Senior accountability without enterprise-consultancy bloat.", outlet: "Express Computer" },
  { quote: "RBI cyber-resilience scoring 87/100 — top-decile for an NBFC.", outlet: "Financial Express" },
];

export function Recognition() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-border">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Recognition
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              Partnerships, awards, and what the press says.
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/70">
              The trust signals worth checking before a 30-minute call.
            </p>
          </div>
        </Reveal>

        {/* 12-col layout: Partners (8) | Awards (4) on desktop */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Partners */}
          <Reveal direction="right" className="lg:col-span-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--ink)]">OEM Partners</h3>
                <p className="text-sm text-foreground/60">
                  12 of our 40+ OEM partnerships shown — tiers reflect certification depth.
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-foreground/60">
                <BadgeCheck className="h-3 w-3 text-[var(--brand)]" /> 40+ partnerships
              </span>
            </div>
            <StaggerContainer
              stagger={0.04}
              delayChildren={0.1}
              className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {PARTNERS.map((p) => (
                <StaggerItem key={p.name}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`relative h-16 rounded-xl border bg-card grid place-items-center font-display font-bold text-sm md:text-base ${
                      p.tier ? TIER_TONE[p.tier] : "border-border text-[var(--ink)]"
                    }`}
                  >
                    {p.name}
                    {p.tier && (
                      <span className="absolute top-1.5 right-1.5 text-[8px] font-mono uppercase tracking-widest opacity-70">
                        {p.tier}
                      </span>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>

          {/* Awards timeline */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-4">
            <h3 className="font-display text-xl font-bold text-[var(--ink)]">Awards & Tiers</h3>
            <p className="text-sm text-foreground/60">Selected recognition since 2021.</p>
            <div className="mt-6 relative">
              <div aria-hidden className="absolute left-3.5 top-1 bottom-1 w-px bg-border" />
              <ol className="space-y-5">
                {AWARDS.map((a, i) => (
                  <motion.li
                    key={a.year}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative pl-12"
                  >
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.1 + i * 0.08 }}
                      className="absolute left-0 top-0.5 grid h-7 w-7 place-items-center rounded-full bg-[var(--brand)] text-white shadow-[0_8px_20px_rgba(0,102,255,0.3)]"
                    >
                      {i === 0 ? <Trophy className="h-3.5 w-3.5" /> : i === AWARDS.length - 1 ? <Star className="h-3.5 w-3.5" /> : <Award className="h-3.5 w-3.5" />}
                    </motion.span>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand)]">
                      {a.year}
                    </div>
                    <h4 className="mt-0.5 font-display text-sm font-semibold text-[var(--ink)] leading-tight">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-xs text-foreground/65 leading-relaxed">{a.body}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Press strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 md:px-7 py-4 border-b border-border">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
                <Newspaper className="h-4 w-4" /> In the press
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                Selected mentions · 2023–2024
              </span>
            </div>
            <StaggerContainer
              stagger={0.06}
              delayChildren={0.1}
              className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-border"
            >
              {PRESS.map((p) => (
                <StaggerItem key={p.outlet}>
                  <motion.figure
                    whileHover={{ y: -2 }}
                    className="bg-card p-5 md:p-6 h-full"
                  >
                    <blockquote className="text-sm md:text-base text-foreground/85 leading-relaxed">
                      "{p.quote}"
                    </blockquote>
                    <figcaption className="mt-3 text-[10px] font-mono uppercase tracking-widest text-[var(--brand)]">
                      — {p.outlet}
                    </figcaption>
                  </motion.figure>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
