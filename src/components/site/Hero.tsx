import { motion } from "framer-motion";
import { ArrowRight, Shield, Activity, TicketCheck } from "lucide-react";
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
          <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.05] text-white text-balance">
            Mission-critical IT,{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              engineered for India's most demanding enterprises.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            Managed services, cybersecurity, cloud and 24×7 support — delivered with the rigor, partnerships, and uptime
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
          <NetworkMesh />
          <FloatingStat
            className="top-6 left-2 lg:left-0"
            icon={<Activity className="h-4 w-4 text-[var(--innovation)]" />}
            label="Uptime (rolling 90d)"
            value="99.992%"
            delay={0.4}
          />
          <FloatingStat
            className="top-1/2 right-0 -translate-y-1/2"
            icon={<Shield className="h-4 w-4 text-[var(--innovation)]" />}
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

function NetworkMesh() {
  // Animated SVG nodes/edges
  const nodes = [
    { x: 50, y: 50 }, { x: 200, y: 80 }, { x: 340, y: 60 },
    { x: 100, y: 200 }, { x: 240, y: 220 }, { x: 380, y: 180 },
    { x: 60, y: 360 }, { x: 200, y: 380 }, { x: 360, y: 340 },
  ];
  const edges = [
    [0,1],[1,2],[0,3],[1,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,8],[6,7],[7,8],
  ];
  return (
    <svg viewBox="0 0 420 440" className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D9A6" />
          <stop offset="100%" stopColor="#0066FF" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="url(#node)" opacity="0.15">
            <animate attributeName="r" values="14;22;14" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="4" fill="url(#node)" />
        </g>
      ))}
    </svg>
  );
}
