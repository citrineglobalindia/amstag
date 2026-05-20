// SiteLoader, first-paint branded splash screen.
//
// Lifecycle:
//   1. Renders immediately on mount (covers the page during initial hydration).
//   2. Stays visible for at least MIN_DISPLAY_MS so the splash doesn't
//      "flash" on a fast network.
//   3. Once both the logo asset has loaded AND the minimum-display window
//      has elapsed, fades out and unmounts.
//   4. After it has shown once per browser session, the in-page splash is
//      suppressed (we don't want it on every internal navigation).
//
// Visuals:
//   - Dark ink background with breathing brand+innovation glow blobs and
//     grid mesh.
//   - The Amstag logo sits in the centre with two animated rings around it
//     (orbital dashed ring + expanding ping ring) and a sweeping highlight
//     across the wordmark.
//   - An indeterminate gradient progress bar runs along the bottom while
//     the splash is on screen.
//
// The whole thing respects prefers-reduced-motion: with the user's reduced-
// motion setting, the orbiting ring stops and the progress bar holds steady.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "amstag.siteLoaderShown.v1";
const MIN_DISPLAY_MS = 1100;
const FAILSAFE_MS = 4500;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const reduce = useReducedMotion();

  // Suppress on subsequent in-session navigations
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        setVisible(false);
      }
    } catch {
      // ignore privacy-mode failures
    }
  }, []);

  // Once mounted, wait for image AND minimum display window
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore
        }
      }, remaining);
    };

    // Failsafe, never trap the user behind the splash
    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    if (imgLoaded) {
      finish();
    } else {
      const img = new Image();
      img.onload = () => {
        setImgLoaded(true);
        finish();
      };
      img.onerror = finish;
      img.src = "/logo.png";
    }

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, [visible, imgLoaded]);

  // Lock body scroll while splash is up
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Amstag"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[var(--ink)] text-white overflow-hidden"
        >
          {/* Ambient glow blobs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/30 blur-[120px]"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/25 blur-[120px]"
            animate={
              reduce
                ? undefined
                : { scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

          {/* Centred logo + rings */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative grid place-items-center h-32 w-32 md:h-36 md:w-36">
              {/* Orbiting dashed ring */}
              <motion.svg
                viewBox="0 0 144 144"
                className="absolute inset-0 w-full h-full"
                aria-hidden
                animate={reduce ? undefined : { rotate: 360 }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: "linear" }
                }
              >
                <circle
                  cx="72"
                  cy="72"
                  r="66"
                  fill="none"
                  stroke="oklch(0.78 0.16 175 / 0.55)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                />
              </motion.svg>

              {/* Expanding ping ring */}
              <motion.span
                aria-hidden
                className="absolute inset-2 rounded-full border border-white/15"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.18], opacity: [0.5, 0] }
                }
                transition={
                  reduce
                    ? undefined
                    : { duration: 1.8, repeat: Infinity, ease: "easeOut" }
                }
              />

              {/* Logo with subtle breathing */}
              <motion.img
                src="/logo.png"
                alt=""
                width={88}
                height={88}
                className="relative h-20 w-20 md:h-[88px] md:w-[88px] object-contain drop-shadow-[0_0_24px_rgba(0,217,166,0.35)]"
                onLoad={() => setImgLoaded(true)}
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>

            {/* Wordmark with gradient sheen */}
            <div className="mt-6 relative">
              <span className="font-display text-3xl md:text-4xl font-bold text-white/90">
                Amstag
              </span>
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent font-display text-3xl md:text-4xl font-bold"
                  initial={{ backgroundPosition: "-200% 0" }}
                  animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  Amstag
                </motion.span>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--innovation)]">
              Engineered IT
            </div>
          </div>

          {/* Indeterminate progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
            <motion.div
              aria-hidden
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--innovation)] to-transparent"
              initial={{ x: "-100%" }}
              animate={reduce ? undefined : { x: ["-100%", "300%"] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
