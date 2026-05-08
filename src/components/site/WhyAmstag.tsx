import { motion } from "framer-motion";
import { Target, BookOpen, Users, Layers } from "lucide-react";
import { SectionHeader } from "./Offerings";

const items = [
  { icon: Target, title: "Pragmatic Approach", desc: "We design for outcomes, not slideware. Every recommendation is benchmarked against cost, risk and time-to-value before it ships." },
  { icon: BookOpen, title: "Deep Domain Expertise", desc: "Senior architects with two decades across BFSI, healthcare and government — paired with vendor-certified delivery teams." },
  { icon: Users, title: "Customer-Centric Strategy", desc: "Dedicated account leadership, transparent SLAs and quarterly business reviews keep us accountable to your roadmap." },
  { icon: Layers, title: "Scalable & Flexible", desc: "Modular engagements that flex from a single workload to a national rollout — without rebuilding what already works." },
];

export function WhyAmstag() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Why AMSTAG"
          title="Built for boards. Trusted by operators."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-xl border border-border p-6 bg-card hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[var(--ink)] text-white">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-[var(--ink)]">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
