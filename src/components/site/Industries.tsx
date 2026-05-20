// Industries, horizontal auto-scrolling marquee.
// A continuous-scroll reel of industry chips with a pinned featured card on
// the left. The reel pauses on hover (CSS-driven) and links to /industries.
// Signature animation: continuous translateX loop on a duplicated track.
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Radio,
  ShoppingBag,
  Truck,
  Tv,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeader } from "./Offerings";

type Industry = { icon: LucideIcon; name: string };

const industries: Industry[] = [
  { icon: Landmark, name: "BFSI" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Building2, name: "Government" },
  { icon: Factory, name: "Manufacturing" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Radio, name: "Telecom" },
  { icon: Truck, name: "Logistics" },
  { icon: Hotel, name: "Hospitality" },
  { icon: Cpu, name: "IT / ITES" },
  { icon: GraduationCap, name: "Education" },
  { icon: Zap, name: "Energy" },
  { icon: Home, name: "Real Estate" },
  { icon: Tv, name: "Media" },
];

export function Industries() {
  const reduce = useReducedMotion();
  // Duplicate the list once so the marquee can loop seamlessly.
  const reel = [...industries, ...industries];

  return (
    <section id="industries" className="relative py-20 md:py-28 overflow-hidden bg-[var(--surface)] border-y border-border">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <Reveal direction="right" className="lg:col-span-5">
            <SectionHeader
              eyebrow="Industries"
              title="Built for India's most regulated sectors."
              desc="13 industries, specialist teams in each. We bring the playbooks; we adapt them to your regulators."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/industries"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] group"
              >
                Read more on every sector
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Reel, desktop. On mobile we stack a compact wrap layout instead. */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-7">
            {/* Mobile: condensed wrap of chips (no marquee, feels janky on small screens) */}
            <div className="md:hidden flex flex-wrap gap-2">
              {industries.slice(0, 9).map((it) => (
                <Link
                  key={it.name}
                  to="/industries"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-[0.98] transition-all"
                >
                  <it.icon className="h-4 w-4 text-[var(--brand)]" />
                  {it.name}
                </Link>
              ))}
              <Link
                to="/industries"
                className="inline-flex items-center gap-1 rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm font-medium text-white"
              >
                +{industries.length - 9} more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Desktop: continuous marquee with edge fades */}
            <div className="hidden md:block relative">
              {/* Two stacked rows scrolling in opposite directions for visual texture */}
              <ReelRow rows={reel} reverse={false} duration={36} reduce={reduce ?? false} />
              <div className="mt-4">
                <ReelRow rows={[...reel].reverse()} reverse={true} duration={44} reduce={reduce ?? false} />
              </div>
              {/* Edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--surface)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--surface)] to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ReelRow({
  rows,
  reverse,
  duration,
  reduce,
}: {
  rows: Industry[];
  reverse: boolean;
  duration: number;
  reduce: boolean;
}) {
  return (
    <div className="overflow-hidden group">
      <motion.div
        className="flex gap-2 w-max"
        animate={
          reduce
            ? undefined
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={
          reduce
            ? undefined
            : { duration, repeat: Infinity, ease: "linear" }
        }
        style={{
          // Pause marquee on hover via inline style + group-hover
          animationPlayState: "running",
        }}
      >
        {rows.map((it, i) => (
          <Link
            key={`${it.name}-${i}`}
            to="/industries"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-[var(--ink)] whitespace-nowrap hover:border-[var(--brand)] hover:text-[var(--brand)] hover:-translate-y-0.5 transition-all"
          >
            <it.icon className="h-4 w-4 text-[var(--brand)] shrink-0" />
            {it.name}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
