const partners = [
  "Cisco", "Dell", "HPE", "Microsoft", "AWS", "Fortinet",
  "Palo Alto", "VMware", "Lenovo", "Juniper", "Veeam", "Sophos",
];

export function LogoMarquee() {
  const items = [...partners, ...partners];
  return (
    <section aria-label="Technology partners" className="border-y border-border bg-background py-10 overflow-hidden">
      <div className="container-x mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono text-center">
          Trusted partnerships with global technology leaders
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-14 marquee w-max">
          {items.map((p, i) => (
            <div
              key={i}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/60 hover:text-[var(--ink)] transition-colors whitespace-nowrap"
            >
              {p}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
