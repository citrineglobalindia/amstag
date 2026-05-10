import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Enter your company").max(150),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
  website: z.string().max(0).optional(), // honeypot
});
type FormData = z.infer<typeof schema>;

export function CtaContact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return; // honeypot
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thanks — we'll be in touch within one business day.");
    reset();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-ink-gradient text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-mesh opacity-40 pointer-events-none" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/20 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-[var(--innovation)]/15 blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-start">
        <Reveal direction="right">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--innovation)]">Let's talk</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-white text-balance">
              Let's design IT that runs your business — not the other way around.
            </h2>
            <p className="mt-4 text-white/85 max-w-xl">
              Tell us about your environment and goals. A senior architect will reach out within one business day.
            </p>

            <StaggerContainer stagger={0.08} delayChildren={0.1} className="mt-10 grid sm:grid-cols-2 gap-5">
              <StaggerItem>
                <InfoBlock icon={<MapPin className="h-5 w-5" />} label="Bangalore HQ">
                  217, 8th Cross, BHEL Layout, II Stage, Pattanagere, R.R. Nagar, Bangalore 560098
                </InfoBlock>
              </StaggerItem>
              <StaggerItem>
                <InfoBlock icon={<Phone className="h-5 w-5" />} label="Sales / Support">
                  <a href="tel:+919035738956" className="block hover:text-white">Sales · +91 90357 38956</a>
                  <a href="tel:+919945645909" className="block hover:text-white">Support · +91 99456 45909</a>
                </InfoBlock>
              </StaggerItem>
              <StaggerItem>
                <InfoBlock icon={<Mail className="h-5 w-5" />} label="Email">
                  <a href="mailto:sales@amstag.in" className="block hover:text-white">sales@amstag.in</a>
                  <a href="mailto:contact@amstag.in" className="block hover:text-white">contact@amstag.in</a>
                </InfoBlock>
              </StaggerItem>
              <StaggerItem>
                <InfoBlock icon={<MapPin className="h-5 w-5" />} label="Map">
                  <div className="aspect-[4/2] rounded-md bg-white/5 border border-white/10 grid place-items-center text-xs text-white/40">
                    Map preview
                  </div>
                </InfoBlock>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            noValidate
            whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} className="hidden" aria-hidden />
            <StaggerContainer stagger={0.06} delayChildren={0.2} className="space-y-4">
              <StaggerItem>
                <Field label="Full name" error={errors.name?.message}>
                  <Input {...register("name")} placeholder="Jane Doe" className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 h-11 focus-visible:ring-[var(--brand)]" />
                </Field>
              </StaggerItem>
              <StaggerItem>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Work email" error={errors.email?.message}>
                    <Input type="email" {...register("email")} placeholder="jane@company.com" className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 h-11 focus-visible:ring-[var(--brand)]" />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <Input type="tel" {...register("phone")} placeholder="+91 ..." className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 h-11 focus-visible:ring-[var(--brand)]" />
                  </Field>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Field label="Company" error={errors.company?.message}>
                  <Input {...register("company")} placeholder="Company name" className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 h-11 focus-visible:ring-[var(--brand)]" />
                </Field>
              </StaggerItem>
              <StaggerItem>
                <Field label="How can we help?" error={errors.message?.message}>
                  <Textarea rows={4} {...register("message")} placeholder="Tell us about your environment, goals or compliance needs..." className="bg-white/[0.07] border-white/20 text-white placeholder:text-white/55 focus-visible:ring-[var(--brand)]" />
                </Field>
              </StaggerItem>
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 rounded-lg font-medium">
                    {isSubmitting ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center"
                      >
                        <motion.span
                          className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        />
                        Sending…
                      </motion.span>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Send message</>
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
                Message received. A senior architect will reach out shortly.
              </motion.p>
            )}
            <p className="mt-3 text-xs text-white/65 text-center">
              By submitting, you agree to our privacy policy. We respond within 1 business day.
            </p>
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}

function InfoBlock({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.25)" }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="rounded-xl border border-white/10 bg-white/5 p-4 h-full"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[var(--innovation)]">
        {icon} {label}
      </div>
      <div className="mt-2 text-sm text-white/80 leading-relaxed">{children}</div>
    </motion.div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/85 uppercase tracking-wider">{label}</span>
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
