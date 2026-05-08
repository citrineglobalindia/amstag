import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Stats } from "@/components/site/Stats";
import { Offerings } from "@/components/site/Offerings";
import { Innovation } from "@/components/site/Innovation";
import { Industries } from "@/components/site/Industries";
import { WhyAmstag } from "@/components/site/WhyAmstag";
import { Process } from "@/components/site/Process";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Testimonials } from "@/components/site/Testimonials";
import { Certifications } from "@/components/site/Certifications";
import { Insights } from "@/components/site/Insights";
import { CtaContact } from "@/components/site/CtaContact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AMSTAG Tech Pvt. Ltd.",
  url: "https://www.amstag.in",
  logo: "https://www.amstag.in/logo.png",
  description:
    "AMSTAG is a Bangalore-based IT infrastructure and managed services company delivering cybersecurity, cloud, data center and 24×7 support to India's leading enterprises.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "217, 8th Cross, BHEL Layout, II Stage, Pattanagere, R.R. Nagar",
    addressLocality: "Bangalore",
    postalCode: "560098",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-90357-38956", contactType: "sales", areaServed: "IN", email: "sales@amstag.in" },
    { "@type": "ContactPoint", telephone: "+91-99456-45909", contactType: "customer support", areaServed: "IN", email: "contact@amstag.in" },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMSTAG — Mission-critical IT for India's enterprises" },
      { name: "description", content: "Managed services, cybersecurity, cloud and 24×7 support for BFSI, healthcare, government and manufacturing leaders. ACT · ACCELERATE · ACE." },
      { property: "og:title", content: "AMSTAG — Your IT Partner" },
      { property: "og:description", content: "Enterprise IT infrastructure, cybersecurity, cloud and managed services. Bangalore HQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <Stats />
        <Offerings />
        <Innovation />
        <Industries />
        <WhyAmstag />
        <Process />
        <CaseStudies />
        <Testimonials />
        <Certifications />
        <Insights />
        <CtaContact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster richColors position="top-right" />
    </div>
  );
}
