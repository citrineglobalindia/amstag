import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  Clock,
  Globe2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Enter your company").max(150),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  industry: z.string().trim().min(1, "Select an industry"),
  interest: z.string().trim().min(1, "Pick a focus"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message support",
    sub: "Fastest reply · seconds",
    href: "https://wa.me/919945645909",
    external: true,
    accent: "bg-[#25D366]/15 text-[#25D366]",
  },
  {
    icon: Phone,
    label: "Sales",
    value: "+91 90357 38956",
    sub: "Mon–Fri · 9–19 IST",
    href: "tel:+919035738956",
    accent: "bg-[var(--brand)]/15 text-[var(--brand)]",
  },
  {
    icon: Phone,
    label: "Support",
    value: "+91 99456 45909",
    sub: "24×7×365 NOC line",
    href: "tel:+919945645909",
    accent: "bg-[var(--innovation)]/15 text-emerald-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@amstag.in",
    sub: "Reply within 1 business day",
    href: "mailto:sales@amstag.in",
    accent: "bg-violet-500/15 text-violet-600",
  },
];

const reassurance = [
  { icon: CheckCircle2, label: "1 business day reply", body: "A senior architect responds — not a generic sales rep." },
  { icon: ShieldCheck, label: "Confidential by default", body: "Conversations covered by mutual NDA on request." },
  { icon: Sparkles, label: "No commitment", body: "First call is free; we scope before we propose." },
];

const stats = [
  { value: "<24h", label: "Response time" },
  { value: "250+", label: "Enterprise clients" },
  { value: "99.99%", label: "Avg uptime SLA" },
];

const offices = [
  {
    icon: MapPin,
    label: "Bangalore HQ",
    body: "217, 8th Cross, BHEL Layout, II Stage, Pattanagere, R.R. Nagar, Bangalore 560098",
  },
  {
    icon: Globe2,
    label: "Coverage",
    body: "Pan-India with on-site engineers in Bangalore, Mumbai, Hyderabad, Chennai, NCR.",
  },
  {
    icon: Clock,
    label: "Hours",
    body: "Sales · Mon–Fri 9:00–19:00 IST · NOC/SOC · 24×7×365.",
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AMSTAG | Talk to a senior architect" },
      { name: "description", content: "Talk to AMSTAG about IT infrastructure, cybersecurity, cloud and managed services. A senior architect responds within 1 business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thanks — a senior architect will reach out within one business day.");
    reset();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's design IT that{" "}
            <span className="bg-gradient-to-r from-white via-white to-[var(--innovation)] bg-clip-text text-transparent">
              runs your business — not the other way around.
            </span>
          </>
        }
        description="Tell us about your environment and goals. We'll route you to a senior architect who's worked in your industry — and respond within one business day."
      >
        <StaggerContainer
          stagger={0.06}
          delayChildren={0.1}
          className="flex flex-wrap gap-x-6 gap-y-3 mt-2"
        >
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="inline-flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-white">{s.value}</span>
                <span className="text-xs uppercase tracking-widest text-white/60">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageHero>

      {/* Channels grid — quick pick */}
      <section className="border-b border-border bg-[var(--surface)] py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)] text-center">
              Pick your channel — we'll route you
            </h2>
          </Reveal>
          <StaggerContainer stagger={0.06} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <StaggerItem key={c.label}>
                <motion.a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  whileHover={{ y: -6, borderColor: "var(--brand)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group block h-full rounded-xl border border-border bg-card p-4 md:p-5 hover:shadow-[0_18px_40px_rgba(10,22,40,0.10)]"
                >
                  <div className={`grid place-items-center h-10 w-10 rounded-lg ${c.accent}`}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                    {c.label}
                  </div>
                  <div className="mt-0.5 font-display text-base font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {c.value}
                  </div>
                  <div className="mt-1 text-xs text-foreground/60">{c.sub}</div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Form + reassurance */}
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Reassurance + offices */}
          <Reveal direction="right" className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] text-balance">
              What happens next.
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              You'll hear from a real architect — not a queue, not a chatbot.
              Here's how the conversation usually goes.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                { t: "We acknowledge within hours.", b: "Auto-reply confirms we got your note plus a calendar link." },
                { t: "You meet a senior architect.", b: "30-min call to map your goals, environment and constraints." },
                { t: "We send a one-page scope.", b: "Outcomes, milestones, SLA bands. No 40-page proposal theatre." },
                { t: "You decide what's next.", b: "Pilot, full engagement, or just our notes — your call." },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <li className="flex gap-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-white font-mono text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[var(--ink)]">{step.t}</h3>
                      <p className="mt-0.5 text-sm text-foreground/70">{step.b}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {reassurance.map((r) => (
                <Reveal key={r.label}>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <r.icon className="h-4 w-4 text-[var(--innovation)]" />
                    <div className="mt-2 text-xs font-semibold text-[var(--ink)]">{r.label}</div>
                    <div className="text-[11px] text-foreground/60 leading-relaxed">{r.body}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.05} className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[0_8px_30px_rgba(10,22,40,0.05)] relative overflow-hidden"
              noValidate
              whileHover={{ borderColor: "var(--brand)" }}
            >
              {/* Decorative glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} className="hidden" aria-hidden />

              <div className="relative">
                <h3 className="font-display text-xl font-bold text-[var(--ink)]">Send us a brief</h3>
                <p className="text-sm text-foreground/60">All fields required. We never share your details.</p>
              </div>

              <StaggerContainer stagger={0.05} className="mt-6 space-y-4 relative">
                <StaggerItem>
                  <Field label="Full name" error={errors.name?.message}>
                    <Input {...register("name")} placeholder="Jane Doe" autoComplete="name" className="h-12 text-base sm:text-sm sm:h-11" />
                  </Field>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Work email" error={errors.email?.message}>
                      <Input type="email" inputMode="email" autoComplete="email" {...register("email")} placeholder="jane@company.com" className="h-12 text-base sm:text-sm sm:h-11" />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <Input type="tel" inputMode="tel" {...register("phone")} placeholder="+91 ..." className="h-12 text-base sm:text-sm sm:h-11" />
                    </Field>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <Field label="Company" error={errors.company?.message}>
                    <Input {...register("company")} placeholder="Company name" autoComplete="organization" className="h-12 text-base sm:text-sm sm:h-11" />
                  </Field>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Industry" error={errors.industry?.message}>
                      <select
                        {...register("industry")}
                        className="h-12 sm:h-11 w-full rounded-md border border-input bg-background px-3 text-base sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)]"
                        defaultValue=""
                      >
                        <option value="" disabled>Select industry</option>
                        {["BFSI", "Healthcare", "Government", "Manufacturing", "Retail", "Telecom", "Logistics", "Other"].map((x) => (
                          <option key={x} value={x}>{x}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Focus area" error={errors.interest?.message}>
                      <select
                        {...register("interest")}
                        className="h-12 sm:h-11 w-full rounded-md border border-input bg-background px-3 text-base sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)]"
                        defaultValue=""
                      >
                        <option value="" disabled>Select focus</option>
                        {["Data Center", "Networking", "Cloud", "Cybersecurity", "Managed IT", "Compliance", "Other"].map((x) => (
                          <option key={x} value={x}>{x}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <Field label="How can we help?" error={errors.message?.message}>
                    <Textarea
                      rows={5}
                      {...register("message")}
                      placeholder="Tell us about your environment, goals, compliance needs, timelines…"
                      className="text-base sm:text-sm"
                    />
                  </Field>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 rounded-lg font-medium group">
                      {isSubmitting ? (
                        <span className="inline-flex items-center">
                          <span className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          Send message
                          <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-[var(--brand)] text-center"
                  role="status"
                >
                  Message received. A senior architect will reach out shortly.
                </motion.p>
              )}
              <p className="mt-3 text-xs text-foreground/50 text-center">
                By submitting, you agree to our privacy policy. We respond within 1 business day.
              </p>
            </motion.form>
          </Reveal>
        </div>
      </section>

      {/* Offices strip */}
      <section className="bg-[var(--surface)] border-y border-border py-14 md:py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand)]">Offices & coverage</h2>
          </Reveal>
          <StaggerContainer stagger={0.08} className="mt-6 grid gap-4 md:grid-cols-3">
            {offices.map((o) => (
              <StaggerItem key={o.label}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--brand)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
                    <o.icon className="h-4 w-4" /> {o.label}
                  </div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{o.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-foreground/70">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 block text-xs text-red-500"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}
