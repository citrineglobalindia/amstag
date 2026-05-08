import { motion } from "framer-motion";
import { Cpu, Radio, BarChart3 } from "lucide-react";
import { SectionHeader } from "./Offerings";

const points = [
  { icon: Cpu, title: "AI in operations", desc: "Predictive ops, intelligent ticket routing, and anomaly detection that catches incidents before users do." },
  { icon: Radio, title: "IoT at scale", desc: "Edge gateways, secure MQTT brokers and lifecycle management for fleets in the millions." },
  { icon: BarChart3, title: "Analytics that ship", desc: "From data lakes to executive dashboards — productionized in weeks, not quarters." },
];

export function Innovation() {
  return (
    <section className="relative bg-ink-gradient text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-mesh pointer-events-none opacity-50" />
      <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <SectionHeader
            light
            eyebrow="Innovation Driven"
            title="AI, IoT and advanced analytics — productionized."
            desc="We don't pilot for years. AMSTAG ships modern workloads on production rails, with security, governance and SRE built in from day one."
          />
          <ul className="mt-10 space-y-6">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 grid place-items-center rounded-lg bg-white/10 border border-white/15 text-[var(--innovation)]">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white">{p.title}</div>
                  <p className="text-white/70">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <DataFlowVisual />
        </motion.div>
      </div>
    </section>
  );
}

function DataFlowVisual() {
  return (
    <div className="relative aspect-square max-w-[520px] mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 overflow-hidden">
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00D9A6" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx="200" cy="200" r={40 + i * 20} fill="none" stroke="url(#flow)" strokeOpacity={0.15 + i * 0.04} strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" from={`0 200 200`} to={`${i % 2 ? -360 : 360} 200 200`} dur={`${20 + i * 4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <g key={i} transform={`rotate(${deg} 200 200)`}>
            <circle cx="200" cy="60" r="6" fill="url(#flow)">
              <animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          </g>
        ))}
        <circle cx="200" cy="200" r="32" fill="url(#flow)" opacity="0.85" />
        <text x="200" y="206" textAnchor="middle" fill="white" fontFamily="JetBrains Mono" fontSize="14" fontWeight="700">AI/Edge</text>
      </svg>
    </div>
  );
}
