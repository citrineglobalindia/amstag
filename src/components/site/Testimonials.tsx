import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "./Offerings";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const items = [
  { quote: "AMSTAG runs our DC like clockwork. Their NOC catches incidents before our internal teams even page.", name: "Rajiv Menon", title: "CTO", company: "Aarav Capital", industry: "BFSI" },
  { quote: "They didn't just migrate workloads — they rebuilt our resilience model. We sleep better.", name: "Dr. Priya Iyer", title: "CIO", company: "Suvarna Hospitals", industry: "Healthcare" },
  { quote: "Pragmatic, senior, accountable. AMSTAG fits in like an in-house team and ships like a product company.", name: "Vikram Shetty", title: "Head of IT", company: "NorthStar Logistics", industry: "Logistics" },
  { quote: "RBI audits used to take quarters. With AMSTAG's posture, we close them in weeks.", name: "Anjali Krishnan", title: "Head of InfoSec", company: "Pragati Bank", industry: "BFSI" },
  { quote: "Their SOC stopped a credential-stuffing wave on our portal in real time. Real proof, not promises.", name: "Karthik R.", title: "VP Engineering", company: "Sahyadri Retail", industry: "Retail" },
];

export function Testimonials() {
  const [ref] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <section className="bg-[var(--surface)] py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow="Testimonials" title="What enterprise leaders say." />
        </Reveal>
        <StaggerContainer stagger={0.1} delayChildren={0.1} className="mt-12 overflow-hidden" amount={0.1}>
          <div className="overflow-hidden" ref={ref}>
            <div className="flex gap-5">
              {items.map((t, i) => (
                <StaggerItem key={i} className="shrink-0 basis-full md:basis-1/2 lg:basis-1/3">
                  <motion.figure
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="h-full rounded-xl border border-border bg-card p-6 flex flex-col shadow-[0_2px_12px_rgba(10,22,40,0.04)] hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)] transition-shadow"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Quote className="h-6 w-6 text-[var(--brand)]" />
                    </motion.div>
                    <blockquote className="mt-4 text-[15px] text-foreground/90 leading-relaxed">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-6 pt-4 border-t border-border">
                      <div className="font-display font-semibold text-[var(--ink)]">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.title} · {t.company}</div>
                      <div className="mt-1 text-xs font-mono uppercase tracking-widest text-[var(--brand)]">{t.industry}</div>
                    </figcaption>
                  </motion.figure>
                </StaggerItem>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
