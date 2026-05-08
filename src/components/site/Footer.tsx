import {
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FooterGlow, type FooterGlowSocial } from "@/components/ui/footer-glow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { AmstagLogo } from "./AmstagLogo";

const socials: FooterGlowSocial[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/amstag", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/amstag", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com/@amstag", icon: Youtube },
  { label: "WhatsApp", href: "https://wa.me/919945645909", icon: MessageCircle },
];

const columns = [
  {
    title: "Services",
    links: [
      { label: "Data Center", href: "/services/data-center" },
      { label: "Networking", href: "/services/networking" },
      { label: "Cloud & Hosting", href: "/services/cloud" },
      { label: "Managed IT", href: "/services/managed-it" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "Compliance", href: "/services/compliance" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "BFSI", href: "/industries" },
      { label: "Healthcare", href: "/industries" },
      { label: "Government", href: "/industries" },
      { label: "Manufacturing", href: "/industries" },
      { label: "Retail", href: "/industries" },
      { label: "Telecom", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

      {/* Mobile-only compact footer (<md). Replaces the rich desktop layout
          with one tightly-organised section: brand mini-card, primary CTAs,
          three quick-link chip rows, contact, socials, legal. */}
      <CompactMobileFooter />

      {/* Desktop footer (md+) — FooterGlow centrepiece + 3 detail cards */}
      <div className="hidden md:block">
        <FooterGlow
          brand={{
            name: "AMSTAG",
            href: "/",
            description:
              "Mission-critical IT infrastructure, cybersecurity, cloud and managed services for India's most demanding enterprises. ACT · ACCELERATE · ACE.",
            logo: (
              <img
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            ),
          }}
          columns={columns}
          socials={socials}
          legal={
            <span className="inline-flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-1.5"
              >
                <span className="relative flex size-2">
                  <span className="bg-[var(--innovation)] absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                  <span className="bg-[var(--innovation)] relative inline-flex size-2 rounded-full" />
                </span>
                <span className="font-mono uppercase tracking-widest text-[10px] text-[var(--innovation)]">
                  NOC online · 24×7×365
                </span>
              </motion.span>
              <span className="opacity-50">·</span>
              <span>&copy; {new Date().getFullYear()} AMSTAG Tech Pvt. Ltd.</span>
            </span>
          }
        />

        <StaggerContainer
          stagger={0.1}
          delayChildren={0.1}
          className="container-x relative z-10 grid gap-8 pb-12 lg:grid-cols-3 lg:gap-12"
        >
          <StaggerItem>
            <Reveal direction="right">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--innovation)]">
                  <MapPin className="h-4 w-4" /> Bangalore HQ
                </div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  217, 8th Cross, BHEL Layout, II Stage,
                  <br />
                  Pattanagere, R.R. Nagar, Bangalore 560098
                </p>
              </div>
            </Reveal>
          </StaggerItem>

          <StaggerItem>
            <Reveal direction="up" delay={0.05}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--innovation)]">
                  <Phone className="h-4 w-4" /> Talk to us
                </div>
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  <li>
                    <motion.a whileHover={{ x: 3 }} href="tel:+919035738956" className="inline-block hover:text-white">
                      Sales · +91 90357 38956
                    </motion.a>
                  </li>
                  <li>
                    <motion.a whileHover={{ x: 3 }} href="tel:+919945645909" className="inline-block hover:text-white">
                      Support · +91 99456 45909
                    </motion.a>
                  </li>
                  <li>
                    <motion.a whileHover={{ x: 3 }} href="mailto:sales@amstag.in" className="inline-block hover:text-white">
                      sales@amstag.in
                    </motion.a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </StaggerItem>

          <StaggerItem>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--innovation)]">
                  <Mail className="h-4 w-4" /> Quarterly insights
                </div>
                <p className="mt-2 text-xs text-white/60">
                  For IT leaders. No spam — unsubscribe any time.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-10"
                  />
                  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}>
                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Subscribe"
                      className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] h-10 w-10 shrink-0"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Reveal>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Bottom legal bar — shared across both layouts */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-x py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>ISO 27001</span>
            <span className="opacity-30">|</span>
            <span>ISO 9001</span>
            <span className="opacity-30">|</span>
            <span>CMMI Level 3</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {["Privacy", "Terms", "Sitemap"].map((label) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ y: -1, color: "#fff" }}
                className="hover:text-white"
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Stepstones credit row */}
        <div className="border-t border-white/5">
          <div className="container-x py-3 text-center text-[11px] text-white/45">
            Designed and developed by{" "}
            <motion.a
              href="https://stepstones.in"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -1 }}
              className="inline-flex items-center gap-1 font-medium text-[var(--innovation)] underline-offset-4 hover:text-white hover:underline"
            >
              Stepstones <ArrowUpRight className="h-3 w-3" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Mobile compact footer ───────────────────────── */

function CompactMobileFooter() {
  return (
    <div className="md:hidden relative z-10">
      <Reveal direction="up">
        <div className="container-x pt-12 pb-6">
          {/* Brand mini-card */}
          <div className="flex items-center gap-3">
            <motion.span whileTap={{ scale: 0.95 }} className="inline-flex">
              <AmstagLogo size="md" />
            </motion.span>
            <div>
              <div className="font-display text-lg font-bold">AMSTAG</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--innovation)] flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--innovation)] opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[var(--innovation)]" />
                </span>
                NOC · 24×7
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <motion.a
              href="https://wa.me/919945645909"
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </motion.a>
            <motion.a
              href="tel:+919945645909"
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/15 px-3 py-2.5 text-sm font-medium text-white"
            >
              <Phone className="h-4 w-4" /> Call
            </motion.a>
          </div>

          {/* Quick links — chip rows */}
          <nav aria-label="Footer navigation" className="mt-6 space-y-3">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">
                  {col.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {col.links.map((l) => (
                    <Link
                      key={l.label}
                      to={l.href}
                      className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/75 active:bg-white/10"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Contact strip */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="h-4 w-4 text-[var(--innovation)] shrink-0 mt-0.5" />
              <span className="text-white/70 leading-relaxed">
                217, 8th Cross, BHEL Layout, II Stage, Pattanagere,
                R.R. Nagar, Bangalore 560098
              </span>
            </div>
            <a
              href="mailto:sales@amstag.in"
              className="mt-2 flex items-center gap-2 text-xs text-white/70 hover:text-white"
            >
              <Mail className="h-4 w-4 text-[var(--innovation)] shrink-0" />
              sales@amstag.in
            </a>
          </div>

          {/* Socials */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileTap={{ scale: 0.92 }}
                whileHover={{ y: -3 }}
                className="grid h-9 w-9 place-items-center rounded-md bg-white/5 border border-white/10 text-white/70 hover:bg-[var(--brand)] hover:text-white hover:border-transparent transition-colors"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] text-white/45">
            &copy; {new Date().getFullYear()} AMSTAG Tech Pvt. Ltd.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
