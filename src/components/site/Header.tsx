import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  Cloud,
  Cpu,
  Database,
  HeadphonesIcon,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  ArrowUpRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ServicesRadialMenu } from "./ServicesRadialMenu";

type NavItem = { label: string; href: string; kind?: "menu" };

const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", kind: "menu" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Mobile sub-menu for Services — pulls from the canonical SERVICES catalogue
// so links go straight to each individual service page (/services/$slug).
const mobileServices = [
  { icon: Server, label: "Data Center", slug: "data-center", tone: "from-sky-500/20 to-sky-500/5 border-sky-400/40", text: "text-sky-200" },
  { icon: Network, label: "Networking", slug: "networking", tone: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/40", text: "text-cyan-200" },
  { icon: Cloud, label: "Cloud", slug: "cloud", tone: "from-violet-500/20 to-violet-500/5 border-violet-400/40", text: "text-violet-200" },
  { icon: ShieldCheck, label: "Cybersecurity", slug: "cybersecurity", tone: "from-rose-500/20 to-rose-500/5 border-rose-400/40", text: "text-rose-200" },
  { icon: HeadphonesIcon, label: "Managed IT", slug: "managed-it", tone: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/40", text: "text-emerald-200" },
  { icon: Workflow, label: "Compliance", slug: "compliance", tone: "from-amber-500/20 to-amber-500/5 border-amber-400/40", text: "text-amber-200" },
  { icon: Database, label: "Backup & DR", slug: "backup-dr", tone: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-400/40", text: "text-fuchsia-200" },
  { icon: Cpu, label: "Workplace", slug: "workplace", tone: "from-teal-500/20 to-teal-500/5 border-teal-400/40", text: "text-teal-200" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const route = useRouterState({ select: (s) => s.location.pathname });

  const darkHeroRoutes = new Set([
    "/", "/about", "/services", "/industries", "/case-studies", "/insights", "/contact", "/careers",
  ]);
  const isOnDarkHero = darkHeroRoutes.has(route);
  const lightMode = scrolled || !isOnDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset state on route change
  useEffect(() => {
    setServicesOpen(false);
    setOpen(false);
    setMobileServicesOpen(false);
  }, [route]);

  // Lock background scroll while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Defensive: close desktop radial menu on small viewports
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 1023px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setServicesOpen(false);
    };
    onChange(mql);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          lightMode
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(10,22,40,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group" aria-label="AMSTAG home">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`grid place-items-center w-9 h-9 rounded-lg font-display font-bold transition-colors ${
                lightMode ? "bg-[var(--ink)] text-white" : "bg-white text-[var(--ink)]"
              }`}
            >
              A
            </motion.span>
            <span className={`font-display text-lg font-bold tracking-tight transition-colors ${lightMode ? "text-[var(--ink)]" : "text-white"}`}>
              AMSTAG
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n, i) => {
              const isMenu = n.kind === "menu";
              const sharedClasses = `relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md group ${
                lightMode ? "text-foreground/80 hover:text-[var(--ink)]" : "text-white/85 hover:text-white"
              }`;
              const inner = (
                <>
                  <span className="relative">
                    {n.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px w-0 transition-all duration-300 group-hover:w-full ${
                        lightMode ? "bg-[var(--brand)]" : "bg-[var(--innovation)]"
                      }`}
                    />
                  </span>
                  {isMenu && (
                    <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  )}
                </>
              );

              return isMenu ? (
                <motion.button
                  type="button"
                  key={n.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                  whileHover={{ y: -1 }}
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="dialog"
                  className={sharedClasses}
                >
                  {inner}
                </motion.button>
              ) : (
                <motion.a
                  key={n.label}
                  href={n.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                  whileHover={{ y: -1 }}
                  className={sharedClasses}
                >
                  {inner}
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block"
          >
            <Button
              asChild
              className={`rounded-lg h-10 px-5 font-medium transition-transform hover:-translate-y-0.5 ${
                lightMode
                  ? "bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white"
                  : "bg-white text-[var(--ink)] hover:bg-white/90"
              }`}
            >
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${lightMode ? "text-[var(--ink)]" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <ServicesRadialMenu open={servicesOpen} onClose={() => setServicesOpen(false)} />

      {/* Mobile mega-drawer — full-height immersive overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[60] bg-[var(--ink)] text-white overflow-hidden"
          >
            {/* Ambient glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-[var(--brand)]/30 blur-[100px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[var(--innovation)]/20 blur-[100px]"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

            {/* Top bar */}
            <div className="relative z-[1] flex items-center justify-between h-16 px-5 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--innovation)] text-white font-display font-bold">A</span>
                <span className="font-display text-lg font-bold">AMSTAG</span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md bg-white/5 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div
              className="relative z-[1] overflow-y-auto px-5 pt-4 pb-8"
              style={{ height: "calc(100dvh - 4rem)" }}
            >
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
                className="flex flex-col gap-1"
                aria-label="Primary"
              >
                {nav.map((n) => {
                  const isMenu = n.kind === "menu";
                  if (isMenu) {
                    return (
                      <motion.div
                        key={n.label}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          aria-expanded={mobileServicesOpen}
                          className="w-full flex items-center justify-between px-4 py-4 text-lg font-display font-semibold text-white border-b border-white/5 active:bg-white/5"
                        >
                          <span>{n.label}</span>
                          <ChevronDown
                            className={`h-5 w-5 text-white/60 transition-transform duration-300 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              key="services-grid"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 py-3">
                                {mobileServices.map((s, i) => (
                                  <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.04 }}
                                  >
                                    <Link
                                      to="/services/$slug"
                                      params={{ slug: s.slug }}
                                      onClick={() => setOpen(false)}
                                      className={`flex items-center gap-2.5 rounded-xl border bg-gradient-to-br ${s.tone} p-3 active:scale-[0.97] transition-transform`}
                                    >
                                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-white/10">
                                        <s.icon className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
                                      </span>
                                      <span className={`text-sm font-medium ${s.text}`}>{s.label}</span>
                                    </Link>
                                  </motion.div>
                                ))}
                                <Link
                                  to="/services"
                                  onClick={() => setOpen(false)}
                                  className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-[var(--innovation)]"
                                >
                                  See full Services page <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={n.label}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Link
                        to={n.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-4 py-4 text-lg font-display font-semibold text-white border-b border-white/5 active:bg-white/5"
                      >
                        <span>{n.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-white/40" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* CTA + Quick contact actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-6 space-y-3"
              >
                <Button asChild className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 rounded-lg">
                  <Link to="/contact" onClick={() => setOpen(false)}>Book a Consultation</Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919035738956"
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-sm font-medium text-white"
                  >
                    <Phone className="h-4 w-4" /> Call sales
                  </a>
                  <a
                    href="https://wa.me/919945645909"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-3 text-sm font-medium text-white"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--innovation)]"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--innovation)] opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[var(--innovation)]" />
                </span>
                NOC online · 24×7×365
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
