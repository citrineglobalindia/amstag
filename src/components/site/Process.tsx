import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Rocket, Activity, TrendingUp } from "lucide-react";
import { SectionHeader } from "./Offerings";

const steps = [
  { icon: Search, title: "Discover", desc: "Architecture and risk assessment, business outcomes mapping." },
  { icon: PenTool, title: "Design", desc: "Reference architecture, BoM, security posture and rollout plan." },
  { icon: Rocket, title: "Deploy", desc: "Phased delivery with change windows, runbooks and zero-downtime cutovers." },
  { icon: Activity, title: "Manage", desc: "24×7 NOC/SOC, ITIL-aligned operations with strict SLAs." },
  { icon: TrendingUp, title: "Optimize", desc: "Quarterly reviews, FinOps, capacity planning and continuous improvement." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-[var(--surface)] py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Engagement"
          title="A proven 5-step engagement model."
        />
        <div ref={ref} className="mt-16 relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-border" aria-hidden />
          <motion.div
            style={{ width }}
            className="hidden md:block absolute top-7 left-0 h-px bg-gradient-to-r from-[var(--brand)] to-[var(--innovation)]"
            aria-hidden
          />
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative text-center md:px-2"
              >
                <div className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-card border border-border text-[var(--brand)] relative z-10">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</div>
                <div className="mt-1 font-display font-semibold text-[var(--ink)] text-lg">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
