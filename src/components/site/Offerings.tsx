import { motion } from "framer-motion";
import {
  Server, Network, Cloud, Settings2, ShieldCheck, Camera,
  Headphones, FileCheck2, Compass, ArrowUpRight,
} from "lucide-react";

const items = [
  { icon: Server, title: "Data Center Services", desc: "Design, build, migrate and operate hyper-resilient on-prem and colocation environments.", span: "lg:col-span-2 lg:row-span-2" },
  { icon: ShieldCheck, title: "Cybersecurity Solutions", desc: "Zero-trust, SOC, EDR/XDR, vulnerability management and incident response — 24×7.", span: "lg:col-span-1 lg:row-span-2" },
  { icon: Cloud, title: "Cloud & Hosting", desc: "Multi-cloud strategy, FinOps, landing zones and managed workloads on AWS, Azure and GCP." },
  { icon: Network, title: "Infrastructure & Networking", desc: "SD-WAN, campus, DC fabric and Wi-Fi 7 — engineered for throughput and zero downtime." },
  { icon: Settings2, title: "Managed IT Services", desc: "End-to-end NOC, monitoring, patching and lifecycle management with strict SLAs." },
  { icon: Camera, title: "Physical Security", desc: "IP CCTV, access control, surveillance analytics and integrated command centers." },
  { icon: Headphones, title: "Unified Communication", desc: "Cloud telephony, contact center, video and collaboration that scales with your teams." },
  { icon: FileCheck2, title: "Compliance & Risk", desc: "ISO 27001, RBI, HIPAA, GDPR, DPDP — audit-ready postures, continuously enforced." },
  { icon: Compass, title: "Consultation Services", desc: "Architecture reviews, modernization roadmaps and CIO advisory from senior practitioners." },
];

export function Offerings() {
  return (
    <section id="offerings" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Offerings"
          title="A full-stack IT partner — from copper to cloud."
          desc="Nine integrated practices, one accountable team. We architect, build and run the systems that keep your business on."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[180px] gap-4">
          {items.map((it, i) => (
            <motion.a
              key={it.title}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-[var(--brand)]/40 hover:shadow-[var(--shadow-soft)] transition-all ${it.span ?? ""}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.04), rgba(0,217,166,0.04))" }} />
              <div className="relative flex flex-col h-full">
                <div className="w-11 h-11 grid place-items-center rounded-lg bg-[var(--surface)] text-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white transition-colors">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-display font-semibold text-[var(--ink)]">{it.title}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{it.desc}</p>
                <div className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, desc, light = false }: { eyebrow: string; title: string; desc?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className={`inline-block text-xs uppercase tracking-[0.25em] font-mono ${light ? "text-[var(--innovation)]" : "text-[var(--brand)]"}`}>
        {eyebrow}
      </div>
      <h2 className={`mt-3 font-display text-3xl md:text-5xl font-bold text-balance ${light ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-4 text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{desc}</p>}
    </div>
  );
}
