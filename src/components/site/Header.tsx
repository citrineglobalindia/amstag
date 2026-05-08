import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/#offerings", caret: true },
  { label: "Industries", href: "/#industries", caret: true },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(10,22,40,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group" aria-label="AMSTAG home">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--ink)] text-white font-display font-bold">A</span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--ink)]">
            AMSTAG
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-[var(--ink)] transition-colors flex items-center gap-1 rounded-md"
            >
              {n.label}
              {n.caret && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white rounded-lg h-10 px-5 font-medium"
          >
            <a href="#contact">Book a Consultation</a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-[var(--ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary rounded-md"
              >
                {n.label}
              </a>
            ))}
            <Button asChild className="mt-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
              <a href="#contact" onClick={() => setOpen(false)}>Book a Consultation</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
