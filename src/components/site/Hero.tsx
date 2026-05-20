import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  TicketCheck,
  Cloud,
  Cpu,
  Database,
  HeadphonesIcon,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-ink-gradient text-white overflow-hidden min-h-[100svh] flex items-center pt-24">
      <div className="absolute inset-0 grid-mesh pointer-events-none" />
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 400px at 80% 30%, rgba(0,102,255,0.25), transparent 70%), radial-gradient(500px 350px at 20% 70%, rgba(0,217,166,0.18), transparent 70%)",
        }}
      />
      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-xs font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--innovation)] animate-pulse" />
            Act · Accelerate · Ace
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.05] text-white text-balance">
            Mission-critical IT,{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              engineered for India's most demanding enterprises.
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl">
            Managed services, cybersecurity, cloud and 24×7 support, delivered with the rigor, partnerships, and uptime
            India's leaders in BFSI, healthcare, government and manufacturing depend on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 px-6 rounded-lg font-medium group">
              <a href="#contact">
                Book a Consultation <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 px-6 rounded-lg text-white border border-white/20 hover:bg-white/10 hover:text-white">
              <a href="#offerings">Explore Offerings</a>
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/60">
            <div><dt className="opacity-70">Uptime SLA</dt><dd className="font-mono text-white">99.99%</dd></div>
            <div><dt className="opacity-70">NOC/SOC</dt><dd className="font-mono text-white">24×7×365</dd></div>
            <div><dt className="opacity-70">OEM Partnerships</dt><dd className="font-mono text-white">40+</dd></div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative h-[420px] lg:h-[520px]"
        >
          <ServicesOrbit />
          <FloatingStat
            className="top-6 left-2 lg:left-0"
            icon={<Activity className="h-4 w-4 text-[var(--innovation)]" />}
            label="Uptime (rolling 90d)"
            value="99.992%"
            delay={0.4}
          />
          <FloatingStat
            className="top-1/2 right-0 -translate-y-1/2"
            icon={<ShieldCheck className="h-4 w-4 text-[var(--innovation)]" />}
            label="Threats blocked / 24h"
            value="1,284,317"
            delay={0.6}
          />
          <FloatingStat
            className="bottom-4 left-6"
            icon={<TicketCheck className="h-4 w-4 text-[var(--innovation)]" />}
            label="Tickets resolved today"
            value="312"
            delay={0.8}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingStat({
  icon, label, value, className = "", delay = 0,
}: { icon: React.ReactNode; label: string; value: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay } }}
      className={`absolute z-10 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60 font-mono">
        {icon} {label}
      </div>
      <div className="mt-1 font-mono text-xl font-bold text-white">{value}</div>
    </motion.div>
  );
}

/* ───────────────────── ServicesOrbit ─────────────────────
 * Replaces the abstract NetworkMesh with a services-themed orbital system.
 * 8 service icons orbit a central Amstag core; each icon counter-rotates so
 * it stays upright. Pulses, dashed orbital paths, and a beating brand-glow
 * on the core sell the "always-on, multi-discipline" story without being
 * literal about any one product.
 */

const ORBIT_SERVICES = [
  { icon: ShieldCheck, color: "rgb(244 114 182)" },   // pink
  { icon: Cloud, color: "rgb(167 139 250)" },         // violet
  { icon: Server, color: "rgb(56 189 248)" },         // sky
  { icon: HeadphonesIcon, color: "rgb(52 211 153)" },// emerald
  { icon: Network, color: "rgb(34 211 238)" },        // cyan
  { icon: Workflow, color: "rgb(251 191 36)" },       // amber
  { icon: Database, color: "rgb(217 70 239)" },       // fuchsia
  { icon: Cpu, color: "rgb(45 212 191)" },            // teal
];

function ServicesOrbit() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      {/* Concentric orbital rings */}
      <svg
        viewBox="0 0 480 480"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.16 175)" stopOpacity="0.6" />
            <stop offset="40%" stopColor="oklch(0.58 0.22 258)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.58 0.22 258)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Soft core glow */}
        <circle cx="240" cy="240" r="160" fill="url(#coreGlow)" />

        {/* Three orbital rings */}
        <circle cx="240" cy="240" r="100" fill="none" stroke="url(#ringStroke)" strokeWidth="1" />
        <circle cx="240" cy="240" r="160" fill="none" stroke="url(#ringStroke)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="240" cy="240" r="220" fill="none" stroke="url(#ringStroke)" strokeWidth="1" />

        {/* Particle dots that drift along the inner ring */}
        {!reduce &&
          Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            return (
              <motion.circle
                key={`p-${i}`}
                cx="240"
                cy="240"
                r="2"
                fill="oklch(0.78 0.16 175)"
                style={{ transformOrigin: "240px 240px" }}
                initial={{ rotate: angle, scale: 0.5, opacity: 0.2 }}
                animate={{ rotate: angle + 360, scale: [0.5, 1.2, 0.5], opacity: [0.2, 0.9, 0.2] }}
                transition={{
                  rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                  opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                }}
                cy={140}
              />
            );
          })}
      </svg>

      {/* Centre core, pulses through brand and innovation glow */}
      <motion.div
        className="relative grid place-items-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white"
        animate={
          reduce
            ? undefined
            : {
                boxShadow: [
                  "0 0 30px oklch(0.58 0.22 258 / 0.45)",
                  "0 0 70px oklch(0.78 0.16 175 / 0.6)",
                  "0 0 30px oklch(0.58 0.22 258 / 0.45)",
                ],
                scale: [1, 1.04, 1],
              }
        }
        transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="h-10 w-10" strokeWidth={2.4} />
        {/* Inner orbiting halo */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full ring-2 ring-white/20"
          animate={reduce ? undefined : { scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      {/* Two orbiting rings of service icons (4 each, opposite directions) */}
      <Orbit
        radius={140}
        duration={28}
        services={ORBIT_SERVICES.slice(0, 4)}
        startAngle={0}
        reverse={false}
        reduce={reduce ?? false}
      />
      <Orbit
        radius={210}
        duration={42}
        services={ORBIT_SERVICES.slice(4, 8)}
        startAngle={45}
        reverse
        reduce={reduce ?? false}
      />
    </div>
  );
}

function Orbit({
  radius,
  duration,
  services,
  startAngle,
  reverse,
  reduce,
}: {
  radius: number;
  duration: number;
  services: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; color: string }[];
  startAngle: number;
  reverse: boolean;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: radius * 2, height: radius * 2, transformOrigin: "center" }}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={reduce ? undefined : { duration, repeat: Infinity, ease: "linear" }}
    >
      {services.map((s, i) => {
        const angle = ((i / services.length) * 360 + startAngle) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            {/* Counter-rotate so the icon stays upright while the orbit rotates */}
            <motion.div
              animate={reduce ? undefined : { rotate: reverse ? 360 : -360 }}
              transition={reduce ? undefined : { duration, repeat: Infinity, ease: "linear" }}
              className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md text-white shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
              style={{ boxShadow: `0 0 24px -6px ${s.color}` }}
            >
              <s.icon className="h-5 w-5" strokeWidth={1.8} />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
