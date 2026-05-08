import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Offerings";

const featured = {
  industry: "BFSI",
  client: "Top-5 Indian Private Bank",
  challenge: "Legacy DC fabric struggled to meet RBI's resilience guidelines and digital banking growth.",
  outcome: "Reduced unplanned downtime by 78% across 1,400+ branches",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=70",
};

const others = [
  {
    industry: "Healthcare",
    client: "Multi-specialty Hospital Network",
    outcome: "Cut threat dwell time from 14 days to 4 hours",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=70",
  },
  {
    industry: "Manufacturing",
    client: "Tier-1 Auto Component Maker",
    outcome: "Migrated 240 workloads to cloud with zero data loss",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=70",
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Case Studies"
          title="Outcomes our customers measure in basis points and minutes."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                {featured.industry} · Featured
              </div>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
                {featured.outcome}
              </h3>
              <p className="mt-3 text-muted-foreground">{featured.challenge}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{featured.client}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                  Read case study <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.a>

          {others.map((c, i) => (
            <motion.a
              key={c.client}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">{c.industry}</div>
                <h4 className="mt-2 font-display font-semibold text-lg text-[var(--ink)]">{c.outcome}</h4>
                <span className="mt-auto pt-3 text-sm text-muted-foreground">{c.client}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
