import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 18, suffix: "+", label: "Years engineering enterprise IT" },
  { value: 250, suffix: "+", label: "Enterprise clients served" },
  { value: 13, suffix: "", label: "Industries powered end-to-end" },
  { value: 99.99, suffix: "%", label: "Average uptime SLA delivered", decimals: 2 },
];

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => v.toFixed(decimals) + suffix);

  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 1.6, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function Stats() {
  return (
    <section className="bg-[var(--surface)] border-b border-border py-14 md:py-20">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center lg:text-left lg:px-4 lg:border-l lg:border-border first:border-l-0"
          >
            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--ink)]">
              <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
