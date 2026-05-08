// Innovation — terminal-typewriter section.
// A faux-terminal panel cycles through three "deploy" lines that type
// themselves out character-by-character; the right column shows the
// short pitch with a single "Read more →" CTA into /case-studies.
// Signature animation: typewriter cursor + line-by-line cycle.
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Reveal } from "./motion";

const TERMINAL_LINES = [
  {
    cmd: "amstag deploy --landing-zone aws-multi-account",
    out: ["✓ 12 accounts provisioned", "✓ Guard-rails applied · CIS 1.5", "✓ 0 policy drift detected"],
  },
  {
    cmd: "amstag soc tail --severity high",
    out: ["⚠ 47 events triaged", "✓ 4 isolated · 0 escalated", "✓ MTTR 9m · within SLA"],
  },
  {
    cmd: "amstag dr drill --tier-1",
    out: ["✓ 17 workloads recovered", "✓ RTO 3m 42s (target ≤ 4m)", "✓ Audit evidence captured"],
  },
];

function useTypedLine(text: string, active: boolean, charsPerSec = 40) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!active) return;
    setChars(0);
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const next = Math.min(text.length, Math.floor(elapsed * charsPerSec));
      setChars(next);
      if (next < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, active, charsPerSec]);
  return text.slice(0, chars);
}

export function Innovation() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle every ~5s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % TERMINAL_LINES.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const active = TERMINAL_LINES[activeIdx];
  const typedCmd = useTypedLine(active.cmd, true);
  const cmdDone = typedCmd === active.cmd;

  return (
    <section className="relative bg-[var(--ink)] text-white py-20 md:py-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/30 blur-[120px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-1/3 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/20 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        {/* Left — pitch */}
        <Reveal direction="right" className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">
            Innovation Lab
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight text-balance">
            We ship runbooks{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              like product teams ship code.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
            Every operational playbook lives in version control, runs through
            CI, and gets re-validated quarterly. The result: ops you can
            audit, repeat, and improve.
          </p>
          <Link
            to="/case-studies"
            className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-[var(--innovation)] hover:text-white group"
          >
            Read how this plays out in production
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Right — terminal */}
        <Reveal direction="left" delay={0.1} className="lg:col-span-7">
          <div className="relative">
            {/* Halo */}
            <motion.div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--brand)]/30 to-[var(--innovation)]/30 blur-2xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative rounded-2xl border border-white/10 bg-[#0b1224] shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden font-mono">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] text-white/45">
                  <Terminal className="h-3 w-3" /> ops@amstag-noc · zsh
                </span>
              </div>
              {/* Body */}
              <div className="px-5 py-5 min-h-[260px] text-[13px] md:text-sm leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex">
                      <span className="text-[var(--innovation)] mr-2 select-none">$</span>
                      <span className="text-white whitespace-pre-wrap break-all">
                        {typedCmd}
                        {!cmdDone && (
                          <span className="inline-block w-2 h-4 align-middle bg-white/80 animate-pulse" />
                        )}
                      </span>
                    </div>
                    {cmdDone && (
                      <div className="mt-3 space-y-1">
                        {active.out.map((line, i) => (
                          <motion.div
                            key={`${activeIdx}-${i}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.18 }}
                            className={`whitespace-pre ${
                              line.startsWith("✓")
                                ? "text-[var(--innovation)]"
                                : line.startsWith("⚠")
                                ? "text-amber-300"
                                : "text-white/75"
                            }`}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Bottom strip */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/[0.02] text-[10px] text-white/40">
                <span>SOC · NOC · Cloud Ops</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--innovation)] opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[var(--innovation)]" />
                  </span>
                  Live
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
