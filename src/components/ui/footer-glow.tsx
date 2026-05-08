// FooterGlow — glassmorphism footer with animated brand-glow blobs.
// Adapted from mvpblocks/FooterGlow for TanStack Start (no Next.js, no styled-jsx).
// The `.glass` utility is defined in src/styles.css. Animations powered by
// framer-motion and respect prefers-reduced-motion via the Reveal/Stagger
// primitives in src/components/site/motion.tsx.
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/motion";

export type FooterGlowLink = { label: string; href: string };
export type FooterGlowColumn = { title: string; links: FooterGlowLink[] };
export type FooterGlowSocial = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type FooterGlowProps = {
  brand: {
    name: string;
    href?: string;
    /** Inline node rendered inside the brand badge (e.g. an SVG / Lucide icon). */
    logo?: React.ReactNode;
    /** Tagline / description shown beneath the brand badge. */
    description?: string;
  };
  columns: FooterGlowColumn[];
  socials?: FooterGlowSocial[];
  /** Bottom-row legal text. Defaults to current-year copyright. */
  legal?: React.ReactNode;
  /** Tailwind classes for the two ambient glow blobs. Override to rebrand. */
  glowClassName?: { topLeft?: string; bottomRight?: string };
  className?: string;
};

const DEFAULT_GLOWS = {
  topLeft: "bg-[var(--brand)]/25",
  bottomRight: "bg-[var(--innovation)]/20",
};

export function FooterGlow({
  brand,
  columns,
  socials,
  legal,
  glowClassName,
  className,
}: FooterGlowProps) {
  const reduce = useReducedMotion();
  const glows = { ...DEFAULT_GLOWS, ...glowClassName };

  return (
    <footer
      className={`relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8 ${className ?? ""}`}
    >
      {/* Ambient glow blobs — gently pulse and drift */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <motion.div
          className={`absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-3xl ${glows.topLeft}`}
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.18, 1], x: [0, 40, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 11, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className={`absolute right-1/4 -bottom-24 h-80 w-80 rounded-full blur-3xl ${glows.bottomRight}`}
          animate={
            reduce
              ? undefined
              : { scale: [1.05, 1, 1.05], x: [0, -30, 0], opacity: [0.5, 0.85, 0.5] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 13, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <Reveal direction="up" distance={30}>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12"
        >
          {/* Brand column */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href={brand.href ?? "#"}
              className="mb-4 flex items-center gap-2 group"
            >
              {/* If a logo node is provided, render it neutrally so brand
                  artwork (e.g. AMSTAG's deer-and-A) doesn't clash with the
                  gradient. Otherwise fall back to a gradient initials chip. */}
              {brand.logo ? (
                <motion.span
                  whileHover={{ rotate: -8, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}
                  className="inline-flex shrink-0"
                >
                  {brand.logo}
                </motion.span>
              ) : (
                <motion.span
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white shadow-md"
                >
                  <span className="text-base font-extrabold">{brand.name.slice(0, 1)}</span>
                </motion.span>
              )}
              <span className="bg-gradient-to-br from-[var(--ink)] to-[var(--brand)] bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:from-white dark:to-[var(--innovation)]">
                {brand.name}
              </span>
            </a>
            {brand.description && (
              <p className="text-foreground/70 mb-6 max-w-xs text-center text-sm md:text-left">
                {brand.description}
              </p>
            )}
            {socials && socials.length > 0 && (
              <StaggerContainer
                stagger={0.06}
                delayChildren={0.15}
                className="mt-2 flex gap-3 text-[var(--brand)]"
              >
                {socials.map(({ icon: Icon, label, href }) => (
                  <StaggerItem key={label} direction="up" distance={8}>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      whileHover={{ y: -3, scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 320, damping: 16 }}
                      className="hover:text-[var(--innovation)] transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>

          {/* Link columns */}
          <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
            {columns.map((col, ci) => (
              <Reveal key={col.title} direction="up" delay={0.1 + ci * 0.08}>
                <div>
                  <div className="mb-3 text-xs font-semibold tracking-widest text-[var(--brand)] uppercase">
                    {col.title}
                  </div>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <motion.a
                          href={link.href}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                          className="inline-block text-foreground/70 hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </nav>
        </motion.div>
      </Reveal>

      <Reveal direction="up" delay={0.4}>
        <div className="text-foreground/60 relative z-10 mt-10 text-center text-xs">
          {legal ?? <span>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</span>}
        </div>
      </Reveal>
    </footer>
  );
}

// Re-export for convenience when consumers want strongly typed icon refs.
export type { LucideIcon };
