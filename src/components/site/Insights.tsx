import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Offerings";

const posts = [
  {
    tag: "Cybersecurity",
    title: "Operationalizing Zero Trust in Indian BFSI: a 90-day playbook",
    date: "Apr 24, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=70",
  },
  {
    tag: "Cloud",
    title: "FinOps after the migration: how mid-market CIOs cut cloud spend 32%",
    date: "Apr 12, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=70",
  },
  {
    tag: "Data Center",
    title: "Engineering 99.99% uptime across distributed branch networks",
    date: "Mar 30, 2026",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=70",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Insights" title="Practical takes from our practice." />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-widest text-[var(--brand)]">{p.tag}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="mt-3 font-display font-semibold text-[var(--ink)] text-lg leading-snug">
                  {p.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] group-hover:gap-2 transition-all">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
