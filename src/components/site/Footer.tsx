import { Linkedin, Twitter, Youtube, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const cols = [
  {
    title: "Offerings",
    links: ["Data Center", "Networking", "Cloud & Hosting", "Managed IT", "Cybersecurity", "Compliance"],
  },
  {
    title: "Industries",
    links: ["BFSI", "Healthcare", "Government", "Manufacturing", "Retail", "Telecom"],
  },
  {
    title: "Company",
    links: ["About", "Leadership", "Careers", "Insights", "Case Studies", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white/80">
      <div className="container-x py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--brand)] text-white font-display font-bold">A</span>
            <span className="font-display text-lg font-bold text-white">AMSTAG</span>
          </div>
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Mission-critical IT infrastructure, cybersecurity, cloud and managed services for India's most demanding enterprises.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[Linkedin, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 grid place-items-center rounded-md bg-white/5 hover:bg-[var(--brand)] transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Button asChild className="mt-5 bg-[#25D366] hover:bg-[#1ebe5a] text-white">
            <a href="https://wa.me/919945645909" target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
            </a>
          </Button>
        </div>

        {cols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <div className="text-xs uppercase tracking-widest font-mono text-white/50">{c.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}><a className="hover:text-white transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-widest font-mono text-white/50">Newsletter</div>
          <p className="mt-4 text-sm text-white/60">Quarterly insights for IT leaders.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-3 flex gap-2"
          >
            <Input type="email" required placeholder="you@company.com" className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-10" />
            <Button type="submit" size="icon" className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] h-10 w-10 shrink-0">
              <Mail className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} AMSTAG Tech Pvt. Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
