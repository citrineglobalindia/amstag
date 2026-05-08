// Certifications — animated badge / medal reveals.
// Each cert renders as a circular medallion with a rotating dashed ring,
// a check-mark that draws itself in, and a moving sheen on the badge face.
// OEM partners are a smaller secondary row of stagger-fade chips.
// Signature animation: rotating dashed orbit + drawing tick + sheen sweep.
import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const certs = [
  { label: "ISO 27001", sub: "Info security", icon: ShieldCheck },
  { label: "ISO 9001", sub: "Quality", icon: Award },
  { label: "CMMI L3", sub: "Process maturity", icon: Workflow },
  { label: "MSME", sub: "Registered", icon: Sparkles },
];

const oems = [
  "Cisco",
  "Dell",
  "HPE",
  "Microsoft",
  "AWS",
  "Fortinet",
  "VMware",
  "Palo Alto",
  "Veeam",
  "Sophos",
];

export function Certifications() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="container-x text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
            Certifications
          </p>
        </Reveal>

        <StaggerContainer
          stagger={0.12}
          delayChildren={0.1}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {certs.map((c) => (
            <StaggerItem key={c.label}>
              <CertBadge label={c.label} sub={c.sub} icon={c.icon} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.25}>
          <p className="mt-14 text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
            OEM Partners · 40+
          </p>
        </Reveal>
        <StaggerContainer stagger={0.04} delayChildren={0.3} className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {oems.map((o) => (
            <StaggerItem key={o} direction="up" distance={8}>
              <motion.span
                whileHover={{ y: -2, color: "var(--brand)" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-block font-display text-base font-medium text-muted-foreground/70 transition-colors cursor-default"
              >
                {o}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CertBadge({
  label,
  sub,
  icon: Icon,
}: {
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="flex flex-col items-center"
    >
      <div className="relative h-24 w-24">
        {/* Rotating dashed ring */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="oklch(0.58 0.22 258 / 0.5)"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            fill="none"
          />
        </motion.svg>

        {/* Inner medallion */}
        <div className="absolute inset-2 rounded-full border-2 border-[var(--brand)]/30 bg-gradient-to-br from-white to-[var(--surface)] grid place-items-center overflow-hidden">
          {/* Sheen sweep */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -inset-x-4 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            initial={{ x: "-200%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
          />
          <Icon className="relative h-7 w-7 text-[var(--brand)]" strokeWidth={2} />
        </div>

        {/* Tick badge — top-right corner */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[var(--innovation)] text-white shadow-md p-1"
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.3 }}
          fill="none"
          stroke="currentColor"
        >
          <motion.path
            d="M5 12 l4 4 l10 -10"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <div className="mt-4 font-display text-base font-bold text-[var(--ink)]">{label}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-foreground/50">{sub}</div>
    </motion.div>
  );
}
