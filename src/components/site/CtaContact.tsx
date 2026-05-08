import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

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
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--innovation)]">Let's talk</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-white text-balance">
            Let's design IT that runs your business — not the other way around.
          </h2>
          <p className="mt-4 text-white/70 max-w-xl">
            Tell us about your environment and goals. A senior architect will reach out within one business day.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            <InfoBlock icon={<MapPin className="h-5 w-5" />} label="Bangalore HQ">
              217, 8th Cross, BHEL Layout, II Stage, Pattanagere, R.R. Nagar, Bangalore 560098
            </InfoBlock>
            <InfoBlock icon={<Phone className="h-5 w-5" />} label="Sales / Support">
              <a href="tel:+919035738956" className="block hover:text-white">Sales · +91 90357 38956</a>
              <a href="tel:+919945645909" className="block hover:text-white">Support · +91 99456 45909</a>
            </InfoBlock>
            <InfoBlock icon={<Mail className="h-5 w-5" />} label="Email">
              <a href="mailto:sales@amstag.in" className="block hover:text-white">sales@amstag.in</a>
              <a href="mailto:contact@amstag.in" className="block hover:text-white">contact@amstag.in</a>
            </InfoBlock>
            <InfoBlock icon={<MapPin className="h-5 w-5" />} label="Map">
              <div className="aspect-[4/2] rounded-md bg-white/5 border border-white/10 grid place-items-center text-xs text-white/40">
                Map preview
              </div>
            </InfoBlock>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 p-6 md:p-8 space-y-4"
          noValidate
        >
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} className="hidden" aria-hidden />
          <Field label="Full name" error={errors.name?.message}>
            <Input {...register("name")} placeholder="Jane Doe" className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-11" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Work email" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="jane@company.com" className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-11" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <Input type="tel" {...register("phone")} placeholder="+91 ..." className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-11" />
            </Field>
          </div>
          <Field label="Company" error={errors.company?.message}>
            <Input {...register("company")} placeholder="Company name" className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-11" />
          </Field>
          <Field label="How can we help?" error={errors.message?.message}>
            <Textarea rows={4} {...register("message")} placeholder="Tell us about your environment, goals or compliance needs..." className="bg-white/5 border-white/15 text-white placeholder:text-white/40" />
          </Field>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white h-12 rounded-lg font-medium">
            {isSubmitting ? "Sending..." : (<><Send className="mr-2 h-4 w-4" /> Send message</>)}
          </Button>
          {submitted && (
            <p className="text-sm text-[var(--innovation)] text-center" role="status">
              Message received. A senior architect will reach out shortly.
            </p>
          )}
          <p className="text-xs text-white/50 text-center">
            By submitting, you agree to our privacy policy. We respond within 1 business day.
          </p>
        </form>
      </div>
    </section>
  );
}

function InfoBlock({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[var(--innovation)]">
        {icon} {label}
      </div>
      <div className="mt-2 text-sm text-white/80 leading-relaxed">{children}</div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/70 uppercase tracking-wider">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
