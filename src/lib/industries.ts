// Source of truth for Amstag's industry verticals.
// Powers /industries (overview), /industries/$slug (per-industry deep-dive),
// the mobile drawer Industries submenu, and footer deep-links.
// Adding a new sector = adding one entry here.
import {
  Building2,
  Factory,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Radio,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type IndustryTone = {
  gradient: string;
  ring: string;
  text: string;
  chipBorder: string;
  glow: string;
};

export type IndustryQuestion = {
  id: string;
  label: string;
  options: string[];
};

export type Industry = {
  slug: string;
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tone: IndustryTone;

  hero: {
    eyebrow: string;
    bullets: string[];
  };

  overview: {
    headline: string;
    body: string;
  };

  /** Sector-specific operational pain points we hear most often. */
  challenges: Array<{ title: string; body: string }>;

  /** How we solve them — paired with the services that drive each solution. */
  solutions: Array<{
    title: string;
    body: string;
    /** Slug of the related service (links to /services/$slug) */
    serviceSlug?: string;
  }>;

  /** Regulators / frameworks that apply to this sector. */
  regulators: string[];

  /** Tech stack often deployed in this sector. */
  stack: string[];

  /** Headline outcomes we deliver in this sector. */
  stats: Array<{ value: string; label: string }>;

  /** Service slugs most-often paired with engagements in this sector. */
  services: string[];

  enquiryQuestions: IndustryQuestion[];

  /** Slugs of adjacent industries shown at the bottom of the deep-dive. */
  related: string[];
};

const TONES: Record<string, IndustryTone> = {
  amber: {
    gradient: "from-amber-500/20 to-amber-500/5",
    ring: "ring-amber-400/40",
    text: "text-amber-300",
    chipBorder: "border-amber-400/40 text-amber-300",
    glow: "rgb(251 191 36)",
  },
  rose: {
    gradient: "from-rose-500/20 to-rose-500/5",
    ring: "ring-rose-400/40",
    text: "text-rose-300",
    chipBorder: "border-rose-400/40 text-rose-300",
    glow: "rgb(244 114 182)",
  },
  sky: {
    gradient: "from-sky-500/20 to-sky-500/5",
    ring: "ring-sky-400/40",
    text: "text-sky-300",
    chipBorder: "border-sky-400/40 text-sky-300",
    glow: "rgb(56 189 248)",
  },
  emerald: {
    gradient: "from-emerald-500/20 to-emerald-500/5",
    ring: "ring-emerald-400/40",
    text: "text-emerald-300",
    chipBorder: "border-emerald-400/40 text-emerald-300",
    glow: "rgb(52 211 153)",
  },
  fuchsia: {
    gradient: "from-fuchsia-500/20 to-fuchsia-500/5",
    ring: "ring-fuchsia-400/40",
    text: "text-fuchsia-300",
    chipBorder: "border-fuchsia-400/40 text-fuchsia-300",
    glow: "rgb(217 70 239)",
  },
  cyan: {
    gradient: "from-cyan-500/20 to-cyan-500/5",
    ring: "ring-cyan-400/40",
    text: "text-cyan-300",
    chipBorder: "border-cyan-400/40 text-cyan-300",
    glow: "rgb(34 211 238)",
  },
  violet: {
    gradient: "from-violet-500/20 to-violet-500/5",
    ring: "ring-violet-400/40",
    text: "text-violet-300",
    chipBorder: "border-violet-400/40 text-violet-300",
    glow: "rgb(167 139 250)",
  },
  teal: {
    gradient: "from-teal-500/20 to-teal-500/5",
    ring: "ring-teal-400/40",
    text: "text-teal-300",
    chipBorder: "border-teal-400/40 text-teal-300",
    glow: "rgb(45 212 191)",
  },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "bfsi",
    shortLabel: "BFSI",
    title: "Banking, Financial Services & Insurance",
    tagline: "RBI / SEBI-grade controls. Audit-week confidence.",
    description:
      "Continuous compliance, 24×7 SOC and resilient infra for India's NBFCs, banks, fintechs and insurers. Audit week becomes a non-event.",
    icon: Landmark,
    tone: TONES.amber,
    hero: {
      eyebrow: "Industry · BFSI",
      bullets: [
        "RBI cyber-resilience aligned controls",
        "Continuous evidence pipelines",
        "24×7 SOC + incident response",
        "Core banking + treasury operations support",
      ],
    },
    overview: {
      headline: "Built for the regulators that don't blink.",
      body: "BFSI doesn't get bonus points for trying. We deliver controls our customers can point an auditor at, and the operations to keep them green between cycles.",
    },
    challenges: [
      { title: "Audit pressure", body: "Quarterly RBI / SEBI cycles consume weeks of leadership time." },
      { title: "Posture drift", body: "Controls implemented during audit erode in production over the next quarter." },
      { title: "Identity sprawl", body: "Core banking + treasury + customer apps multiply identity stores." },
      { title: "Third-party risk", body: "Vendor onboarding and continuous monitoring is a manual scramble." },
    ],
    solutions: [
      { title: "Continuous evidence pipelines", body: "Cloud, identity, endpoint and network controls feed automated audit-ready reports.", serviceSlug: "compliance" },
      { title: "RBI-aligned SOC", body: "24×7 SOC with detections mapped to RBI master direction + incident playbooks.", serviceSlug: "cybersecurity" },
      { title: "Resilient core ops", body: "DR + backup engineered against ransomware and regulator-defined RTO targets.", serviceSlug: "backup-dr" },
      { title: "Identity federation", body: "Consolidated identity across core, treasury, cloud and SaaS estate.", serviceSlug: "workplace" },
    ],
    regulators: ["RBI", "SEBI", "IRDAI", "ISO 27001", "PCI DSS", "SOC 2"],
    stack: ["Cisco", "Fortinet", "Microsoft", "Splunk", "CrowdStrike", "Veeam", "AWS", "Azure"],
    stats: [
      { value: "−92%", label: "Audit findings vs baseline" },
      { value: "12w → 3w", label: "Audit prep time" },
      { value: "87/100", label: "RBI posture score" },
    ],
    services: ["cybersecurity", "compliance", "managed-it", "backup-dr"],
    enquiryQuestions: [
      { id: "scenario", label: "What brings you here?", options: ["Audit prep", "Active incident", "Posture assessment", "Managed SOC", "Compliance programme"] },
      { id: "regulator", label: "Primary regulator", options: ["RBI", "SEBI", "IRDAI", "Multiple", "Not sure"] },
    ],
    related: ["healthcare", "government", "telecom"],
  },

  {
    slug: "healthcare",
    shortLabel: "Healthcare",
    title: "Healthcare",
    tagline: "HIS / EMR uptime that keeps wards moving.",
    description:
      "Bedside-grade endpoint posture, HIS / PACS / LIS operations and HIPAA-aligned data handling for hospital networks.",
    icon: HeartPulse,
    tone: TONES.rose,
    hero: {
      eyebrow: "Industry · Healthcare",
      bullets: [
        "HIS / PACS / LIS integrations",
        "HIPAA-aligned data handling",
        "Bedside-grade endpoint posture",
        "Multi-campus connectivity",
      ],
    },
    overview: {
      headline: "Uptime measured in patients, not packets.",
      body: "We've engineered networks, identity and operations for hospital chains where the cost of a 10-minute outage is measured in clinical risk. The systems hold up.",
    },
    challenges: [
      { title: "Multi-campus drift", body: "Each campus runs its own stack; standardising without disrupting clinical workflows is hard." },
      { title: "Device sprawl", body: "Bedside terminals, kiosks, medical devices and BYOD all need different postures." },
      { title: "Patient data risk", body: "PHI is high-value; ransomware groups specifically target hospitals." },
      { title: "Clinical change windows", body: "Maintenance windows are narrow and unforgiving." },
    ],
    solutions: [
      { title: "Bedside-grade endpoints", body: "Zero-trust device posture for clinical workstations + locked-down kiosks.", serviceSlug: "workplace" },
      { title: "HIS / PACS uptime", body: "24×7 monitoring of HIS + imaging + lab integrations with measured MTTR.", serviceSlug: "managed-it" },
      { title: "Network resilience", body: "Campus + branch + DC fabric engineered for clinical uptime.", serviceSlug: "networking" },
      { title: "Ransomware-ready backups", body: "Immutable backups + tested recovery drills against modern threat models.", serviceSlug: "backup-dr" },
    ],
    regulators: ["HIPAA", "NABH", "ISO 27001", "ISO 27799", "HL7 / FHIR"],
    stack: ["Cisco", "Dell", "HPE", "Microsoft", "VMware", "Veeam", "CrowdStrike", "Tenable"],
    stats: [
      { value: "99.992%", label: "HIS uptime delivered" },
      { value: "47 min", label: "Median MTTR (critical)" },
      { value: "4.8 / 5", label: "Helpdesk CSAT" },
    ],
    services: ["managed-it", "cybersecurity", "networking", "backup-dr"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["Single campus", "Multi-campus network", "Diagnostic chain", "Greenfield"] },
      { id: "focus", label: "Primary focus", options: ["HIS / EMR uptime", "Cybersecurity / HIPAA", "Network refresh", "Endpoint / MDM"] },
    ],
    related: ["bfsi", "government", "retail"],
  },

  {
    slug: "government",
    shortLabel: "Government",
    title: "Government & Public Sector",
    tagline: "Citizen-scale systems with audit-grade trails.",
    description:
      "Sovereign cloud + on-prem hybrids for e-Gov platforms, with MeitY / CERT-In aligned controls and citizen-scale resilience.",
    icon: Building2,
    tone: TONES.sky,
    hero: {
      eyebrow: "Industry · Government",
      bullets: [
        "MeitY guidelines + CERT-In aligned",
        "Sovereign cloud + on-prem hybrids",
        "Citizen-scale concurrency",
        "Audit-grade access trails",
      ],
    },
    overview: {
      headline: "Public infrastructure, engineered like product.",
      body: "Citizen platforms can't have planned downtime, and they can't quietly drop transactions. We engineer the controls + observability that let public IT teams ship like the best of the private sector.",
    },
    challenges: [
      { title: "Concurrent peaks", body: "Filing seasons, scheme launches and result days drive 50–100× normal traffic." },
      { title: "Sovereignty constraints", body: "Data residency, sovereign cloud and procurement rules narrow options." },
      { title: "Long-tail integrations", body: "Legacy departmental systems must remain interoperable." },
      { title: "Public scrutiny", body: "Outages become headlines; recovery times must hold under questioning." },
    ],
    solutions: [
      { title: "Sovereign landing zones", body: "Multi-account / multi-cloud architectures meeting MeitY data-residency.", serviceSlug: "cloud" },
      { title: "CERT-In aligned SOC", body: "Detections and IR playbooks mapped to CERT-In guidelines.", serviceSlug: "cybersecurity" },
      { title: "Modernisation without rewrites", body: "Strangler-fig modernisation that keeps legacy integrations intact.", serviceSlug: "cloud" },
      { title: "Citizen-scale observability", body: "End-to-end tracing, RUM and synthetic monitoring designed for public scrutiny.", serviceSlug: "managed-it" },
    ],
    regulators: ["MeitY", "CERT-In", "DPDP Act", "ISO 27001", "ISO 22301"],
    stack: ["AWS GovCloud", "Azure Gov", "Open Source LAMP", "Drupal", "OpenStack", "PostgreSQL"],
    stats: [
      { value: "180k", label: "Concurrent users supported" },
      { value: "−68%", label: "Page TTFB after modernisation" },
      { value: "Yes", label: "CERT-In + MeitY aligned" },
    ],
    services: ["cloud", "cybersecurity", "compliance", "managed-it"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["e-Gov platform", "Department modernisation", "Citizen app", "Multi-department"] },
      { id: "focus", label: "Primary focus", options: ["Modernisation", "Cybersecurity / CERT-In", "Cloud landing zone", "Audit prep"] },
    ],
    related: ["bfsi", "healthcare", "telecom"],
  },

  {
    slug: "manufacturing",
    shortLabel: "Manufacturing",
    title: "Manufacturing",
    tagline: "OT and IT, finally on the same network plan.",
    description:
      "Plant-floor visibility, OT segmentation and resilient WAN across plants. Zero line stoppages on cutover.",
    icon: Factory,
    tone: TONES.emerald,
    hero: {
      eyebrow: "Industry · Manufacturing",
      bullets: [
        "Plant-floor + ERP integrations",
        "OT segmentation + passive monitoring",
        "Resilient WAN across plants",
        "Zero line stoppages on cutover",
      ],
    },
    overview: {
      headline: "Plant uptime measured in lakhs per hour.",
      body: "Manufacturing IT can't afford bravery. We use passive monitoring + phased cutovers so plant-floor and IT visibility improves without anyone touching the line.",
    },
    challenges: [
      { title: "OT / IT visibility gap", body: "Corporate SOC has no view of plant-floor assets or anomalies." },
      { title: "Legacy controllers", body: "PLCs and SCADA systems were never designed with network segmentation in mind." },
      { title: "WAN fragility", body: "Plant-to-corporate links go down at the worst possible moment." },
      { title: "Production change risk", body: "Any network change carries line-stoppage risk; appetite for downtime is zero." },
    ],
    solutions: [
      { title: "Passive OT monitoring", body: "Network-tap based visibility into OT assets — no agents, no risk.", serviceSlug: "cybersecurity" },
      { title: "IT / OT segmentation", body: "Reference architectures aligned to IEC 62443. Cutovers staged with rollback windows.", serviceSlug: "networking" },
      { title: "Resilient plant WAN", body: "SD-WAN + LTE / 5G failover. Active-active across MPLS providers.", serviceSlug: "networking" },
      { title: "Plant-floor backup", body: "Engineering workstation + recipe backups with verified restore.", serviceSlug: "backup-dr" },
    ],
    regulators: ["IEC 62443", "ISO 27001", "NIST CSF", "ISA-95"],
    stack: ["Cisco", "Fortinet", "Claroty", "Nozomi", "Splunk", "Schneider", "Rockwell", "Siemens"],
    stats: [
      { value: "+340%", label: "OT incidents now visible" },
      { value: "−100%", label: "Segmentation gaps" },
      { value: "31s", label: "Avg time to detect" },
    ],
    services: ["networking", "cybersecurity", "managed-it", "backup-dr"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["Single plant", "Multi-plant", "OT + IT consolidation", "Greenfield plant"] },
      { id: "focus", label: "Primary focus", options: ["OT visibility", "IT / OT segmentation", "Plant WAN", "Plant security"] },
    ],
    related: ["logistics", "retail", "bfsi"],
  },

  {
    slug: "retail",
    shortLabel: "Retail",
    title: "Retail",
    tagline: "Storefront uptime, billion-event peak days.",
    description:
      "POS + omnichannel platforms, edge networking at scale, and continuous PCI DSS compliance across hundreds of stores.",
    icon: ShoppingBag,
    tone: TONES.fuchsia,
    hero: {
      eyebrow: "Industry · Retail",
      bullets: [
        "POS + omnichannel platforms",
        "Edge networking at 320+ branches",
        "PCI DSS continuous compliance",
        "Peak-day infra autoscaling",
      ],
    },
    overview: {
      headline: "Black-Friday-grade infra on a year-round budget.",
      body: "Retail is the most unforgiving production environment in India — every minute of POS downtime has a number attached. We design and run infra that holds up on the worst day.",
    },
    challenges: [
      { title: "Store network drift", body: "Hundreds of stores, each with its own quirks; standardisation is a slog." },
      { title: "PCI scope creep", body: "Cardholder data touches POS, ecommerce, CRM and analytics — scope explodes." },
      { title: "Peak load risk", body: "Sale events drive 10–50× normal traffic; under-provisioning loses revenue." },
      { title: "Edge security", body: "Every store is a small attack surface; perimeter thinking doesn't work." },
    ],
    solutions: [
      { title: "Unified store networks", body: "SD-WAN + zero-trust segmentation across all stores with one console.", serviceSlug: "networking" },
      { title: "PCI continuous compliance", body: "Evidence pipelines that hold scope and pass quarterly.", serviceSlug: "compliance" },
      { title: "Peak-ready cloud", body: "Autoscaling + FinOps so we right-size for daily and right-size up for events.", serviceSlug: "cloud" },
      { title: "Edge SOC", body: "Detections tuned for POS environments + tested IR playbooks.", serviceSlug: "cybersecurity" },
    ],
    regulators: ["PCI DSS", "ISO 27001", "DPDP Act"],
    stack: ["Cisco Meraki", "Fortinet", "AWS", "Cloudflare", "Datadog", "NCR", "Verifone"],
    stats: [
      { value: "12,400", label: "Peak orders/sec sustained" },
      { value: "0 min", label: "POS downtime in last event" },
      { value: "Zero", label: "PCI findings in last cycle" },
    ],
    services: ["networking", "cloud", "cybersecurity", "compliance"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["< 50 stores", "50–250 stores", "250+ stores", "Omnichannel platform"] },
      { id: "focus", label: "Primary focus", options: ["PCI DSS", "Network refresh", "Peak readiness", "Store security"] },
    ],
    related: ["logistics", "hospitality", "telecom"],
  },

  {
    slug: "telecom",
    shortLabel: "Telecom",
    title: "Telecom",
    tagline: "Carrier-grade ops without carrier overhead.",
    description:
      "BSS / OSS operations, edge + core observability, and resilient backhaul + peering — for telcos and broadband operators.",
    icon: Radio,
    tone: TONES.cyan,
    hero: {
      eyebrow: "Industry · Telecom",
      bullets: [
        "BSS / OSS application operations",
        "Edge + core observability",
        "Resilient backhaul + peering",
        "TRAI / CERT-In aligned posture",
      ],
    },
    overview: {
      headline: "Subscriber experience, instrumented end-to-end.",
      body: "Telco workloads bridge IT and network engineering. We bring the SRE practices that turn user-impacting incidents into telemetry, not pages.",
    },
    challenges: [
      { title: "Cross-domain incidents", body: "Subscriber-impacting issues span apps, transport and access — root cause is buried." },
      { title: "Long-tail BSS / OSS", body: "Decade-old systems still process billing; brittle and under-monitored." },
      { title: "Peering volatility", body: "Routing or peering changes can degrade subscriber experience silently." },
      { title: "Regulatory cadence", body: "TRAI + CERT-In reporting drives constant evidence work." },
    ],
    solutions: [
      { title: "End-to-end observability", body: "Synthetic + RUM + tracing that ties subscriber experience to infra signals.", serviceSlug: "managed-it" },
      { title: "BSS / OSS operations", body: "24×7 ops with run-book maturity for billing, charging, provisioning.", serviceSlug: "managed-it" },
      { title: "Resilient transport", body: "BGP, peering and backhaul engineered for graceful degradation.", serviceSlug: "networking" },
      { title: "TRAI-aligned SOC", body: "Detections + reporting mapped to TRAI + CERT-In timelines.", serviceSlug: "cybersecurity" },
    ],
    regulators: ["TRAI", "CERT-In", "ISO 27001", "ISO 22301"],
    stack: ["Cisco", "Juniper", "Nokia", "Splunk", "Datadog", "Kafka", "OpenStack"],
    stats: [
      { value: "99.999%", label: "Application uptime (5 nines)" },
      { value: "< 3 min", label: "Subscriber impact MTTR" },
      { value: "100%", label: "TRAI report compliance" },
    ],
    services: ["managed-it", "networking", "cybersecurity", "cloud"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["BSS / OSS ops", "Network ops", "Subscriber experience", "Greenfield"] },
      { id: "focus", label: "Primary focus", options: ["Observability", "Resilience", "Compliance", "Operations"] },
    ],
    related: ["bfsi", "government", "retail"],
  },

  {
    slug: "logistics",
    shortLabel: "Logistics",
    title: "Logistics & Supply Chain",
    tagline: "Track every parcel; protect every API.",
    description:
      "WMS / TMS application operations, API gateway + bot defence, and hub-and-spoke connectivity for India's largest fulfilment networks.",
    icon: Truck,
    tone: TONES.violet,
    hero: {
      eyebrow: "Industry · Logistics",
      bullets: [
        "WMS / TMS application ops",
        "API gateway + bot defence",
        "Hub-and-spoke WAN",
        "Real-time fleet observability",
      ],
    },
    overview: {
      headline: "Operations that scale with parcels per hour.",
      body: "Logistics workloads are spiky, API-heavy and adversarial — we engineer the controls and ops that hold up at peak.",
    },
    challenges: [
      { title: "API abuse", body: "Tracking APIs are targets for scraping, credential stuffing and account takeover." },
      { title: "Hub network reliability", body: "Hub outages cascade into parcels stuck in scanners across regions." },
      { title: "Real-time fleet data", body: "GPS + telematics + scan events must be queryable in real time." },
      { title: "Vendor sprawl", body: "Couriers, fulfilment partners and last-mile providers all integrate differently." },
    ],
    solutions: [
      { title: "API gateway + bot defence", body: "Rate-limiting, behavioural detection, ATO protection for public APIs.", serviceSlug: "cybersecurity" },
      { title: "Hub network engineering", body: "Resilient hub-and-spoke design with rapid failover and tested DR.", serviceSlug: "networking" },
      { title: "Real-time data plane", body: "Streaming infra (Kafka / Kinesis) operated with SLAs.", serviceSlug: "cloud" },
      { title: "WMS / TMS managed ops", body: "24×7 application support with senior on-call for peak events.", serviceSlug: "managed-it" },
    ],
    regulators: ["ISO 27001", "DPDP Act", "PCI DSS"],
    stack: ["AWS", "Kafka", "Kong", "Cloudflare", "Fortinet", "Datadog", "Snowflake"],
    stats: [
      { value: "1.2M / 24h", label: "API abuse attempts blocked" },
      { value: "9 min", label: "Time to mitigate ATO wave" },
      { value: "−99%", label: "Account takeovers" },
    ],
    services: ["cybersecurity", "networking", "managed-it", "cloud"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["Last-mile / D2C", "B2B fulfilment", "International freight", "Greenfield"] },
      { id: "focus", label: "Primary focus", options: ["API security", "Hub network", "Peak resilience", "Observability"] },
    ],
    related: ["retail", "manufacturing", "hospitality"],
  },

  {
    slug: "hospitality",
    shortLabel: "Hospitality",
    title: "Real Estate & Hospitality",
    tagline: "Distributed properties, centralised IT.",
    description:
      "Property-level SD-WAN, guest Wi-Fi and centralised identity for hotels, real estate operators and serviced apartments.",
    icon: Hotel,
    tone: TONES.teal,
    hero: {
      eyebrow: "Industry · Hospitality",
      bullets: [
        "Property-level SD-WAN",
        "Guest Wi-Fi + PCI compliance",
        "Centralised identity + helpdesk",
        "PMS / POS reliability",
      ],
    },
    overview: {
      headline: "Every property, one operating model.",
      body: "Hospitality estates struggle with property-by-property drift. We make every property feel like an extension of HQ — same controls, same playbook.",
    },
    challenges: [
      { title: "Property-by-property drift", body: "Each property runs slightly different infra, vendors and operating practices." },
      { title: "Guest-network risk", body: "Hotel Wi-Fi must be open AND compliant — most operators get one of those wrong." },
      { title: "PMS uptime", body: "Front-desk PMS failures stop check-ins and revenue at the same time." },
      { title: "Loyalty data security", body: "Loyalty + booking data is high-value; breach impact is reputational." },
    ],
    solutions: [
      { title: "SD-WAN per property", body: "Centralised network policy with property-level edge resilience.", serviceSlug: "networking" },
      { title: "PCI-compliant guest Wi-Fi", body: "Guest network properly segmented from POS / PMS estate.", serviceSlug: "networking" },
      { title: "Centralised helpdesk", body: "One identity, one helpdesk number, one playbook across every property.", serviceSlug: "managed-it" },
      { title: "Loyalty data security", body: "Tokenisation + access controls + continuous monitoring of loyalty estate.", serviceSlug: "cybersecurity" },
    ],
    regulators: ["PCI DSS", "ISO 27001", "DPDP Act", "GDPR (intl chains)"],
    stack: ["Cisco Meraki", "Aruba", "Fortinet", "Microsoft", "Opera PMS", "Cloudflare"],
    stats: [
      { value: "1 console", label: "All properties unified" },
      { value: "99.95%", label: "PMS uptime" },
      { value: "PCI", label: "Across guest + back-office" },
    ],
    services: ["networking", "managed-it", "cybersecurity", "compliance"],
    enquiryQuestions: [
      { id: "scope", label: "Scope", options: ["Single property", "Chain (< 20)", "Chain (20+)", "Mixed-use estate"] },
      { id: "focus", label: "Primary focus", options: ["Network refresh", "PCI compliance", "Helpdesk consolidation", "Guest Wi-Fi"] },
    ],
    related: ["retail", "logistics", "bfsi"],
  },
];

export const INDUSTRY_BY_SLUG: Record<string, Industry> = INDUSTRIES.reduce(
  (acc, ind) => ({ ...acc, [ind.slug]: ind }),
  {} as Record<string, Industry>
);

export function getRelatedIndustries(slug: string): Industry[] {
  const ind = INDUSTRY_BY_SLUG[slug];
  if (!ind) return [];
  return ind.related
    .map((s) => INDUSTRY_BY_SLUG[s])
    .filter((x): x is Industry => Boolean(x));
}

// Re-export real-estate alias if needed elsewhere
export { Home };
