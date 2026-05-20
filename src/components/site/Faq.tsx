// Faq, accordion of the eight questions sales actually gets asked.
// Layout: 2-column on desktop (questions split between columns), single
// column on mobile. Each item smoothly expands its body via AnimatePresence
// height/opacity tween.
//
// Animation: chevron rotates 180° on open; body slides down with a soft
// height tween; a thin progress underline draws on hover.
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { Reveal } from "./motion";

type Item = { q: string; a: React.ReactNode };

const items: Item[] = [
  {
    q: "How quickly can you respond to an enquiry?",
    a: (
      <>
        Within one business day a senior architect, not a sales rep, replies
        with a calendar link. For active incidents, the SOC line is staffed
        24×7 and we acknowledge within minutes.
      </>
    ),
  },
  {
    q: "Are you vendor-locked, or vendor-agnostic?",
    a: (
      <>
        Vendor-agnostic. We hold partnerships with 40+ OEMs (Cisco, Dell, HPE,
        Microsoft, AWS, Fortinet, VMware, Veeam, etc.) so engagements pick the
        right tool for your environment, not whatever we resell hardest.
      </>
    ),
  },
  {
    q: "Can you handle multi-cloud and hybrid environments?",
    a: (
      <>
        Yes, most of our largest customers are hybrid. Our cloud practice
        runs on AWS, Azure, GCP and VMware Cloud, with a unified posture for
        identity, networking, observability and FinOps across all of them.
      </>
    ),
  },
  {
    q: "Do you support deployments outside Bangalore?",
    a: (
      <>
        Yes. We have on-site engineers across Bangalore, Mumbai, Hyderabad,
        Chennai and NCR, and field-services partnerships covering pan-India.
        Our largest single deployment runs across 320+ branches.
      </>
    ),
  },
  {
    q: "What's a typical engagement size?",
    a: (
      <>
        Project engagements range from <span className="font-medium">₹15 L</span> for
        a focused VAPT or audit-prep, through <span className="font-medium">₹2–5 Cr</span>{" "}
        for data-centre builds and migrations. Managed-services contracts are
        priced per user / endpoint / SLA tier; strategic partnerships are
        custom. We'll always start with a free 30-min scoping call.
      </>
    ),
  },
  {
    q: "What about compliance, RBI, SEBI, HIPAA, PCI?",
    a: (
      <>
        Our compliance practice runs continuous-evidence pipelines aligned to
        ISO 27001, RBI cyber-resilience, SEBI, IRDAI, HIPAA, PCI DSS and SOC 2.
        Most engagements close their first audit cycle in 8–12 weeks and
        re-cycle in days.
      </>
    ),
  },
  {
    q: "Can we trial before committing?",
    a: (
      <>
        Yes, most managed-services engagements start with a 30 / 60 / 90 day
        proof-of-value covering one site or one workload, with measurable exit
        criteria. We'd rather earn the next phase than lock you in upfront.
      </>
    ),
  },
  {
    q: "Where can I see customer references?",
    a: (
      <>
        Six anonymised case studies are on our{" "}
        <Link to="/case-studies" className="text-[var(--brand)] underline-offset-4 hover:underline">
          Case Studies page
        </Link>
        ; named references are arranged on request after an initial call.
        About 80% of our customer references happen on a 30-minute Zoom.
      </>
    ),
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal direction="right" className="lg:col-span-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
              Frequently asked
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--ink)] text-balance">
              The eight questions sales actually gets asked.
            </h2>
            <p className="mt-4 text-base text-foreground/70 leading-relaxed">
              The honest answers, the kind we'd give on a call. If your
              question isn't here, our chatbot or the contact form will route
              you to the right architect.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--brand-hover)] group"
            >
              <MessageCircle className="h-4 w-4" />
              Ask your own question
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal direction="left" delay={0.05} className="lg:col-span-8">
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
              {items.map((it, i) => (
                <FaqRow
                  key={it.q}
                  item={it}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx((cur) => (cur === i ? null : i))}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group w-full flex items-center justify-between gap-4 px-5 md:px-7 py-5 text-left transition-colors hover:bg-[var(--surface)]"
      >
        <span className="font-display text-base md:text-lg font-semibold text-[var(--ink)] flex-1 min-w-0 pr-2">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
            open
              ? "bg-[var(--brand)] text-white"
              : "bg-[var(--surface)] text-foreground/60 group-hover:bg-[var(--brand)]/10 group-hover:text-[var(--brand)]"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-5 -mt-1 text-sm md:text-base text-foreground/75 leading-relaxed max-w-3xl">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
