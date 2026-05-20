// IndustryEnquiry, industry-aware enquiry surface used at the bottom of every
// industry page. Same three-pattern shape as ServiceEnquiry:
//   1. Quick-actions row (Call / WhatsApp / Email) with the industry name
//      pre-filled into deep-links.
//   2. Industry-specific quick-pick chips (regulator, scope, focus) rendered
//      from the industry's `enquiryQuestions` so each sector gets the right
//      intake form.
//   3. Standard contact form (name + email + phone + company + brief).
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import type { Industry } from "@/lib/industries";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const baseSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Enter your company").max(150),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
  answers: z.record(z.string(), z.string()).optional(),
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof baseSchema>;

const REASSURANCE = [
  { icon: CheckCircle2, label: "1 business day reply" },
  { icon: ShieldCheck, label: "Confidential by default" },
  { icon: Sparkles, label: "No commitment" },
];

export function IndustryEnquiry({ industry }: { industry: Industry }) {
  const [submitted, setSubmitted] = useState(false);
  const tone = industry.tone;

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: { answers: {} },
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    // eslint-disable-next-line no-console
    console.info("Industry enquiry submitted", { industry: industry.slug, ...data });
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Thanks, a senior architect with ${industry.shortLabel} experience will reach out within one business day.`);
    reset({ name: "", email: "", company: "", phone: "", message: "", answers: {} });
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/919945645909?text=${encodeURIComponent(
    `Hi Amstag, I'd like to talk about your work in ${industry.title}.`
  )}`;
  const mailLink = `mailto:sales@amstag.in?subject=${encodeURIComponent(
    `Enquiry · ${industry.title}`
  )}&body=${encodeURIComponent(
    `Hi Amstag team,\n\nI'd like to discuss your work in ${industry.title}. Some context:\n\n, `
  )}`;

  return (
    <section
      id="enquire"
      className="relative bg-[var(--ink)] text-white py-20 md:py-28 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full blur-[100px] bg-gradient-to-br ${tone.gradient}`}
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/20 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left, context + quick actions */}
        <Reveal direction="right" className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--innovation)]">
            Enquire · {industry.shortLabel}
          </div>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold leading-tight text-balance text-white">
            Talk to a senior architect with {industry.shortLabel} experience.
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
            Your enquiry routes straight to the team that runs {industry.shortLabel}{" "}
            engagements at Amstag, no triage queue. Most replies go out within hours.
          </p>

          {/* Quick actions */}
          <div className="mt-6 space-y-2.5">
            <QuickAction
              href={whatsappLink}
              icon={MessageCircle}
              label="Open WhatsApp"
              sub={`Pre-filled with "${industry.title}" context`}
              accent="bg-[#25D366]"
              external
            />
            <QuickAction
              href="tel:+919035738956"
              icon={Phone}
              label="Call sales"
              sub="+91 90357 38956 · Mon-Fri 9-19 IST"
              accent="bg-[var(--brand)]"
            />
            <QuickAction
              href={mailLink}
              icon={Mail}
              label="Email"
              sub="sales@amstag.in"
              accent="bg-violet-500"
              external
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {REASSURANCE.map((r) => (
              <span
                key={r.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/75"
              >
                <r.icon className={`h-3 w-3 ${tone.text}`} />
                {r.label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Right, form */}
        <Reveal direction="left" delay={0.05} className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          >
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} className="hidden" aria-hidden />

            {/* Industry banner */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <span className={`grid h-10 w-10 place-items-center rounded-xl border bg-gradient-to-br ${tone.gradient} ${tone.chipBorder}`}>
                <industry.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/55">Enquiring about</div>
                <div className="font-display text-base font-semibold text-white">{industry.title}</div>
              </div>
            </div>

            <StaggerContainer stagger={0.05} className="mt-5 space-y-4">
              {/* Industry-specific quick-pick chips */}
              {industry.enquiryQuestions.map((q) => (
                <StaggerItem key={q.id}>
                  <Controller
                    name={`answers.${q.id}` as `answers.${string}`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/85">
                          {q.label}
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {q.options.map((opt) => {
                            const selected = field.value === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => field.onChange(selected ? "" : opt)}
                                aria-pressed={selected}
                                className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                                  selected
                                    ? `${tone.chipBorder} bg-white/10 text-white`
                                    : "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  />
                </StaggerItem>
              ))}

              {/* Standard contact fields */}
              <StaggerItem>
                <Field label="Full name" error={errors.name?.message}>
                  <Input
                    {...register("name")}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className="h-12 sm:h-11 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base sm:text-sm"
                  />
                </Field>
              </StaggerItem>
              <StaggerItem>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Work email" error={errors.email?.message}>
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      {...register("email")}
                      placeholder="jane@company.com"
                      className="h-12 sm:h-11 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base sm:text-sm"
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <Input
                      type="tel"
                      inputMode="tel"
                      {...register("phone")}
                      placeholder="+91 ..."
                      className="h-12 sm:h-11 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base sm:text-sm"
                    />
                  </Field>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Field label="Company" error={errors.company?.message}>
                  <Input
                    {...register("company")}
                    placeholder="Company name"
                    autoComplete="organization"
                    className="h-12 sm:h-11 bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base sm:text-sm"
                  />
                </Field>
              </StaggerItem>
              <StaggerItem>
                <Field label="What would you like to discuss?" error={errors.message?.message}>
                  <Textarea
                    rows={4}
                    {...register("message")}
                    placeholder={`Briefly: where you are with ${industry.shortLabel}, the outcomes you need, timelines, ...`}
                    className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 text-base sm:text-sm"
                  />
                </Field>
              </StaggerItem>

              <StaggerItem>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 rounded-lg font-medium group"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <span className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        Send enquiry
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
                className="mt-3 text-sm text-[var(--innovation)] text-center"
                role="status"
              >
                Enquiry received. A senior architect with {industry.shortLabel} experience will reach out shortly.
              </motion.p>
            )}
            <p className="mt-3 text-[11px] text-white/60 text-center">
              By submitting, you agree to our privacy policy. We respond within 1 business day.
            </p>
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
  sub,
  accent,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  accent: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/[0.07]"
    >
      <span className={`grid h-10 w-10 place-items-center rounded-lg ${accent} text-white shadow-md shrink-0`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="block text-[11px] text-white/65 truncate">{sub}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
    </motion.a>
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
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/85">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 block text-xs text-red-300"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}
