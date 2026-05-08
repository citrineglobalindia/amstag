import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const certs = ["ISO 27001", "ISO 9001", "CMMI Level 3", "MSME Registered"];
const oems = ["Cisco", "Dell", "HPE", "Microsoft", "AWS", "Fortinet", "VMware", "Palo Alto", "Veeam", "Sophos"];

export function Certifications() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="container-x text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">Certifications</p>
        </Reveal>
        <StaggerContainer stagger={0.06} delayChildren={0.1} className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {certs.map((c) => (
            <StaggerItem key={c} direction="up" distance={12}>
              <motion.span
                whileHover={{ y: -2, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-block font-display text-lg font-semibold text-muted-foreground hover:text-[var(--ink)] transition-colors cursor-default"
              >
                {c}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <Reveal delay={0.15}>
          <p className="mt-12 text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">OEM Partners</p>
        </Reveal>
        <StaggerContainer stagger={0.04} delayChildren={0.2} className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {oems.map((o) => (
            <StaggerItem key={o} direction="up" distance={10}>
              <motion.span
                whileHover={{ y: -2, color: "var(--brand)" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-block font-display text-base font-medium text-muted-foreground/70 transition-colors cursor-default"
              >
                {o}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
