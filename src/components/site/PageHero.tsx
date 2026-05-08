// Animated page hero used at the top of every secondary page.
// Pulls in framer-motion + grid-mesh + gradient blobs to match the home Hero.
import * as React from "react";
import { motion } from "framer-motion";
import { Reveal } from "./motion";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-ink-gradient text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 grid-mesh opacity-50 pointer-events-none" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/25 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/20 blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-x relative z-10 max-w-4xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-xs font-mono uppercase tracking-[0.2em] text-[var(--innovation)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--innovation)] animate-pulse" />
            {eyebrow}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white text-balance">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.3}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
