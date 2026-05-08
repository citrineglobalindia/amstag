import { motion } from "framer-motion";
import {
  Cpu, Landmark, Building2, HeartPulse, Factory, GraduationCap, ShoppingBag,
  Antenna, Home, Hotel, Zap, Truck, Tv, ArrowRight, Plus,
} from "lucide-react";
import { SectionHeader } from "./Offerings";

const industries = [
  { icon: Cpu, name: "IT / ITES" },
  { icon: Landmark, name: "BFSI" },
  { icon: Building2, name: "Government" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Factory, name: "Manufacturing" },
  { icon: GraduationCap, name: "Education" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Antenna, name: "Telecom" },
  { icon: Home, name: "Real Estate" },
  { icon: Hotel, name: "Hospitality" },
  { icon: Zap, name: "Energy" },
  { icon: Truck, name: "Logistics" },
  { icon: Tv, name: "Media" },
];

export function Industries() {
  return (
    <section id="industries" className="bg-[var(--surface)] py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Industries"
          title="Domain depth across 13 industries."
          desc="Patterns we've already shipped — adapted to your regulatory, scale and uptime realities."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {industries.map((it, i) => (
            <motion.a
              key={it.name}
              href="#contact"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              className="group relative rounded-xl border border-border bg-card p-5 hover:border-[var(--brand)]/40 hover:shadow-[var(--shadow-soft)] transition-all"
            >
              <div className="w-9 h-9 grid place-items-center rounded-md bg-[var(--surface)] text-[var(--brand)] border border-border">
                <it.icon className="h-4.5 w-4.5" />
              </div>
              <div className="mt-3 font-display font-semibold text-[var(--ink)]">{it.name}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-[var(--brand)] transition-colors">
                View solutions <ArrowRight className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="group relative rounded-xl border border-dashed border-[var(--brand)]/30 bg-card/40 p-5 hover:bg-[var(--brand)] hover:text-white transition-all flex flex-col justify-between"
          >
            <Plus className="h-5 w-5 text-[var(--brand)] group-hover:text-white" />
            <div>
              <div className="font-display font-semibold">See all 13 industries</div>
              <div className="text-xs opacity-70 mt-1">Tailored playbooks →</div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
