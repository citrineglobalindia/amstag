// Stats, animated progress-ring counters.
// Each stat draws an SVG arc + a counting number that synchronously fills
// from 0 → target value over 1.6s on first scroll into view. Each ring has
// its own tone, and the cards lift when hovered.
import { motion, useInView, useMotionValue, useTransform, animate, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Activity, Award, Building2, ShieldCheck } from "lucide-react";
import { Reveal } from "./motion";

type Stat = {
  /** Numeric target. */
  to: number;
  /** Decimals for `toFixed`. */
  decimals?: number;
  /** What to append after the count (e.g. "+", "%"). */
  suffix?: string;
  /** What goes before (e.g. "ISO " for non-numeric stats, see below). */
  prefix?: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Tailwind ring colour. */
  ring: string;
  /** SVG stroke colour. */
  stroke: string;
};

const stats: Stat[] = [
  {
    to: 8,
    suffix: "+",
    label: "Years of engineering",
    sub: "Since 2018 · Bangalore HQ",
    icon: Building2,
    ring: "text-[var(--brand)]",
    stroke: "oklch(0.58 0.22 258)",
  },
  {
    to: 250,
    suffix: "+",
    label: "Enterprise clients",
    sub: "BFSI · Healthcare · Gov · Mfg",
    icon: Award,
    ring: "text-violet-500",
    stroke: "oklch(0.65 0.2 290)",
  },
  {
    to: 99.99,
    decimals: 2,
    suffix: "%",
    label: "Avg uptime SLA",
    sub: "Tier-1 workload baseline",
    icon: Activity,
    ring: "text-[var(--innovation)]",
    stroke: "oklch(0.78 0.16 175)",
  },
  {
    to: 24,
    suffix: "×7",
    label: "NOC + SOC coverage",
    sub: "Bangalore-staffed, year-round",
    icon: ShieldCheck,
    ring: "text-rose-500",
    stroke: "oklch(0.7 0.2 15)",
  },
];

export function Stats() {
  return (
    <section className="bg-[var(--surface)] border-b border-border py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              By the numbers
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              Eight years, measured.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "-80px" });

  // Number that animates 0 → to
  const num = useMotionValue(0);
  const display = useTransform(num, (v) => v.toFixed(stat.decimals ?? 0));

  // Stroke offset that animates from full → 0 (full sweep)
  const offset = useMotionValue(RING_CIRCUMFERENCE);

  useEffect(() => {
    if (!inView) return;
    const a = animate(num, stat.to, { duration: 1.6, ease: "easeOut", delay: index * 0.06 });
    const b = animate(offset, 0, { duration: 1.6, ease: "easeOut", delay: index * 0.06 });
    return () => {
      a.stop();
      b.stop();
    };
  }, [inView, stat.to, num, offset, index]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)] transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* SVG progress ring + counter */}
        <div className="relative h-[112px] w-[112px] shrink-0">
          <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90">
            {/* Track */}
            <circle
              cx="56"
              cy="56"
              r={RING_RADIUS}
              stroke="oklch(0.93 0.005 250)"
              strokeWidth="6"
              fill="none"
            />
            {/* Animated stroke */}
            <RingArc offset={offset} stroke={stat.stroke} />
          </svg>
          {/* Counter centred over the ring */}
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <span className="font-mono font-bold text-2xl md:text-[26px] text-[var(--ink)]">
                <motion.span>{display}</motion.span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="min-w-0">
          <stat.icon className={`h-4 w-4 ${stat.ring}`} />
          <h3 className="mt-2 font-display text-sm md:text-base font-semibold text-[var(--ink)] leading-tight">
            {stat.label}
          </h3>
          <p className="mt-1 text-[11px] md:text-xs text-foreground/75 leading-snug">{stat.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Separate component because <motion.circle strokeDashoffset={...}> needs a
// MotionValue prop binding via `style` (Framer doesn't accept MV on the
// raw SVG attribute).
function RingArc({ offset, stroke }: { offset: MotionValue<number>; stroke: string }) {
  return (
    <motion.circle
      cx="56"
      cy="56"
      r={RING_RADIUS}
      stroke={stroke}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
      strokeDasharray={RING_CIRCUMFERENCE}
      style={{ strokeDashoffset: offset }}
    />
  );
}
