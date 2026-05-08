import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./motion";

const partners = [
  "Cisco", "Dell", "HPE", "Microsoft", "AWS", "Fortinet",
  "Palo Alto", "VMware", "Lenovo", "Juniper", "Veeam", "Sophos",
];

export function LogoMarquee() {
  const items = [...partners, ...partners];
  const reduce = useReducedMotion();

  return (
    <section aria-label="Technology partners" className="border-y border-border bg-background py-10 overflow-hidden">
      <Reveal>
        <div className="container-x mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono text-center">
            Trusted partnerships with global technology leaders
          </p>
        </div>
      </Reveal>
      <div className="relative">
        <motion.div
          className="flex gap-14 w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {items.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/60 hover:text-[var(--ink)] transition-colors whitespace-nowrap cursor-default"
            >
              {p}
            </motion.div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
