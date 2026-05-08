const certs = ["ISO 27001", "ISO 9001", "CMMI Level 3", "MSME Registered"];
const oems = ["Cisco", "Dell", "HPE", "Microsoft", "AWS", "Fortinet", "VMware", "Palo Alto", "Veeam", "Sophos"];

export function Certifications() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="container-x text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">Certifications</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {certs.map((c) => (
            <span key={c} className="font-display text-lg font-semibold text-muted-foreground hover:text-[var(--ink)] transition-colors">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">OEM Partners</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {oems.map((o) => (
            <span key={o} className="font-display text-base font-medium text-muted-foreground/70 hover:text-[var(--brand)] transition-colors">
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
