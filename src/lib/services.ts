// Source of truth for AMSTAG's eight service practices.
// Powers /services (overview), /services/$slug (per-service deep-dive),
// the desktop ServicesRadialMenu and the mobile Header drawer Services
// submenu. Adding a new service = adding one entry here.
import {
  Cloud,
  Cpu,
  Database,
  HeadphonesIcon,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceTone = {
  /** Tailwind from→to gradient classes used on hero + headlines. */
  gradient: string;
  /** Tailwind ring colour for the centre badge. */
  ring: string;
  /** Tailwind text colour for accents. */
  text: string;
  /** Tailwind border-tinted colour for chips. */
  chipBorder: string;
  /** Hex glow for icon tile shadow. */
  glow: string;
};

export type ServiceQuestion = {
  id: string;
  label: string;
  options: string[];
};

export type Service = {
  slug: string;
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tone: ServiceTone;

  hero: {
    eyebrow: string;
    bullets: string[];
  };

  overview: {
    headline: string;
    body: string;
  };

  capabilities: Array<{
    title: string;
    body: string;
  }>;

  methodology: Array<{
    title: string;
    body: string;
  }>;

  stack: string[];
  industries: string[];

  stats: Array<{ value: string; label: string }>;

  enquiryQuestions: ServiceQuestion[];

  related: string[]; // slugs
};

const TONES: Record<string, ServiceTone> = {
  sky: {
    gradient: "from-sky-500/20 to-sky-500/5",
    ring: "ring-sky-400/40",
    text: "text-sky-300",
    chipBorder: "border-sky-400/40 text-sky-300",
    glow: "rgb(56 189 248)",
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
  rose: {
    gradient: "from-rose-500/20 to-rose-500/5",
    ring: "ring-rose-400/40",
    text: "text-rose-300",
    chipBorder: "border-rose-400/40 text-rose-300",
    glow: "rgb(244 114 182)",
  },
  emerald: {
    gradient: "from-emerald-500/20 to-emerald-500/5",
    ring: "ring-emerald-400/40",
    text: "text-emerald-300",
    chipBorder: "border-emerald-400/40 text-emerald-300",
    glow: "rgb(52 211 153)",
  },
  amber: {
    gradient: "from-amber-500/20 to-amber-500/5",
    ring: "ring-amber-400/40",
    text: "text-amber-300",
    chipBorder: "border-amber-400/40 text-amber-300",
    glow: "rgb(251 191 36)",
  },
  fuchsia: {
    gradient: "from-fuchsia-500/20 to-fuchsia-500/5",
    ring: "ring-fuchsia-400/40",
    text: "text-fuchsia-300",
    chipBorder: "border-fuchsia-400/40 text-fuchsia-300",
    glow: "rgb(217 70 239)",
  },
  teal: {
    gradient: "from-teal-500/20 to-teal-500/5",
    ring: "ring-teal-400/40",
    text: "text-teal-300",
    chipBorder: "border-teal-400/40 text-teal-300",
    glow: "rgb(45 212 191)",
  },
};

export const SERVICES: Service[] = [
  {
    slug: "data-center",
    shortLabel: "Data Center",
    title: "Data Center Engineering",
    tagline: "Greenfield builds, brownfield migrations, audit-grade uptime.",
    description:
      "We design, build and run on-prem and colocation data centres for India's most demanding enterprises — from Tier III reference architectures to no-downtime petabyte migrations.",
    icon: Server,
    tone: TONES.sky,
    hero: {
      eyebrow: "Service · Data Center",
      bullets: [
        "Tier III / IV reference designs",
        "Hyperconverged + virtualisation platforms",
        "DR site engineering + runbooks",
        "Petabyte migrations with zero downtime",
      ],
    },
    overview: {
      headline: "Infrastructure that compounds in reliability.",
      body: "We've moved petabytes between data centres without breaking SLAs. Our DC engagements start with a capacity + risk model and end with operations runbooks the in-house team owns from day one.",
    },
    capabilities: [
      { title: "Greenfield builds", body: "Tier III / IV reference designs, capacity planning and rack-level layouts. Vendor-agnostic." },
      { title: "Brownfield optimisation", body: "Power, cooling and density re-engineering. Often saves 15–30% in operating cost." },
      { title: "HCI & virtualisation", body: "VxRail, Nutanix, vSphere, Hyper-V. Including hardware refresh and lifecycle." },
      { title: "DR engineering", body: "Active-active and warm-standby designs. RTO/RPO modelling validated by drills." },
      { title: "Migrations", body: "VMware → vSphere, on-prem → cloud, DC consolidation. We've moved petabytes without downtime." },
      { title: "Compliance posture", body: "Audit-ready evidence trails for ISO 27001, RBI cyber-resilience, SEBI." },
    ],
    methodology: [
      { title: "Discover", body: "Two-week assessment of capacity, dependencies, risk and compliance posture." },
      { title: "Design", body: "Reference architecture + migration runbook reviewed with your team." },
      { title: "Deliver", body: "Phased rollout with named senior owners on every workload." },
      { title: "Operate", body: "24×7 NOC handover with quarterly business reviews." },
    ],
    stack: ["Dell", "HPE", "Cisco UCS", "VMware vSphere", "Nutanix", "VxRail", "Veeam", "Pure Storage"],
    industries: ["BFSI", "Healthcare", "Government", "Manufacturing"],
    stats: [
      { value: "PBs", label: "Migrated without downtime" },
      { value: "99.99%", label: "DC uptime delivered" },
      { value: "30+", label: "Greenfield + brownfield builds" },
    ],
    enquiryQuestions: [
      {
        id: "engagement",
        label: "What kind of engagement?",
        options: ["Greenfield build", "Migration", "Brownfield optimisation", "DR design", "Audit prep", "Not sure yet"],
      },
      {
        id: "scale",
        label: "Estimated scale",
        options: ["< 50 racks", "50–200 racks", "> 200 racks", "Multi-site"],
      },
    ],
    related: ["cloud", "managed-it", "backup-dr"],
  },

  {
    slug: "networking",
    shortLabel: "Networking",
    title: "Networking",
    tagline: "Campus, branch, datacentre fabric and SD-WAN — designed and run.",
    description:
      "From core switches to last-mile failover, we engineer enterprise networks that hold up under audit and don't make Sunday support pages.",
    icon: Network,
    tone: TONES.cyan,
    hero: {
      eyebrow: "Service · Networking",
      bullets: [
        "Campus + branch + DC fabric",
        "SD-WAN and SASE rollouts",
        "Zero-trust segmentation",
        "OT/IT segmentation for plants",
      ],
    },
    overview: {
      headline: "Networks designed for the worst case.",
      body: "We design, deploy and run enterprise networks across data centres, branches and plants — including SD-WAN and SASE migrations that pay back in months, not years.",
    },
    capabilities: [
      { title: "Campus + branch design", body: "Reference architectures for office, branch and remote-site connectivity." },
      { title: "DC fabric", body: "Spine-leaf, EVPN-VXLAN, Cisco ACI / NSX micro-segmentation." },
      { title: "SD-WAN / SASE", body: "Cisco Viptela, Versa, Fortinet, Cato — design, rollout and run." },
      { title: "OT / IT segmentation", body: "Plant-floor segmentation with passive monitoring. Zero line stoppages." },
      { title: "Wireless + IoT", body: "High-density Wi-Fi 6/6E, IoT segmentation, captive portals." },
      { title: "Network security", body: "Next-gen firewalls, IDS/IPS, NAC, DDoS posture." },
    ],
    methodology: [
      { title: "Site survey", body: "Physical + logical assessment across all sites in scope." },
      { title: "Reference design", body: "End-to-end architecture diagram, BoM, and migration plan." },
      { title: "Phased rollout", body: "Site-by-site cutover with rollback windows. Senior owner on every cut." },
      { title: "Run + improve", body: "24×7 NOC with quarterly performance + posture review." },
    ],
    stack: ["Cisco", "Juniper", "Aruba", "Fortinet", "Palo Alto", "Cato", "Versa", "Meraki"],
    industries: ["Manufacturing", "Retail", "BFSI", "Healthcare"],
    stats: [
      { value: "320+", label: "Branches under SD-WAN" },
      { value: "99.99%", label: "Network availability" },
      { value: "0", label: "Plant line stoppages on cutover" },
    ],
    enquiryQuestions: [
      {
        id: "topology",
        label: "Topology in scope",
        options: ["Single site", "Multi-site / WAN", "DC fabric", "Plant / OT", "Wireless"],
      },
      {
        id: "outcome",
        label: "Primary outcome",
        options: ["Refresh / modernise", "SD-WAN / SASE migration", "Segmentation", "Capacity expansion"],
      },
    ],
    related: ["data-center", "cybersecurity", "managed-it"],
  },

  {
    slug: "cloud",
    shortLabel: "Cloud",
    title: "Cloud & Hosting",
    tagline: "AWS, Azure, GCP, VMware Cloud — landing zones, FinOps, full ops.",
    description:
      "Landing-zone architecture, lift-shift-modernise migrations, FinOps and 24×7 cloud operations across the hyperscalers and VMware Cloud.",
    icon: Cloud,
    tone: TONES.violet,
    hero: {
      eyebrow: "Service · Cloud",
      bullets: [
        "AWS / Azure / GCP / VMware Cloud",
        "Landing-zone + governance",
        "Lift-shift-modernise migrations",
        "24×7 managed cloud operations",
      ],
    },
    overview: {
      headline: "Cloud done with discipline, not enthusiasm.",
      body: "We're a cloud-first practice that knows where cloud doesn't belong. Our engagements start with a clear-eyed business case and end with a landing zone your auditors love.",
    },
    capabilities: [
      { title: "Landing-zone design", body: "Multi-account / subscription governance with guard-rails." },
      { title: "Migrations", body: "Lift, lift-shift, lift-shift-modernise. Phased with zero data loss." },
      { title: "FinOps", body: "Cost visibility + optimisation. Most engagements pay back in 3 months." },
      { title: "Modernisation", body: "Containers, serverless, managed databases. Where it makes business sense." },
      { title: "Cloud security", body: "CSPM, identity, key management, network security baked in." },
      { title: "Managed cloud ops", body: "24×7 SRE for production workloads. SLA-backed." },
    ],
    methodology: [
      { title: "Cloud business case", body: "TCO model with current vs target. Honest assumptions, no slideware." },
      { title: "Landing zone", body: "Account / subscription topology, identity, networking, billing." },
      { title: "Migration waves", body: "Application portfolio assessed → grouped → migrated in measured waves." },
      { title: "Operate", body: "Incident response, FinOps reviews and continuous modernisation." },
    ],
    stack: ["AWS", "Azure", "GCP", "VMware Cloud", "Terraform", "Kubernetes", "GitHub Actions", "Datadog"],
    industries: ["BFSI", "Retail", "Telecom", "Government"],
    stats: [
      { value: "$M", label: "Cloud spend optimised" },
      { value: "3 mo", label: "Avg FinOps payback" },
      { value: "200+", label: "Migrated workloads" },
    ],
    enquiryQuestions: [
      {
        id: "platform",
        label: "Cloud platform",
        options: ["AWS", "Azure", "GCP", "VMware Cloud", "Multi-cloud", "Not decided"],
      },
      {
        id: "stage",
        label: "Where are you?",
        options: ["Pre-migration", "Mid-migration", "In production", "Optimising cost"],
      },
    ],
    related: ["data-center", "cybersecurity", "managed-it"],
  },

  {
    slug: "cybersecurity",
    shortLabel: "Cybersecurity",
    title: "Cybersecurity",
    tagline: "24×7 SOC, EDR/XDR, identity, compliance — red-team validated.",
    description:
      "A full-stack cybersecurity practice — vulnerability management, EDR/XDR, identity, SIEM and a 24×7 SOC out of Bangalore. RBI / SEBI / HIPAA / PCI DSS aligned.",
    icon: ShieldCheck,
    tone: TONES.rose,
    hero: {
      eyebrow: "Service · Cybersecurity",
      bullets: [
        "24×7 SOC + Incident Response",
        "EDR / XDR / SIEM",
        "VAPT + red team",
        "RBI / SEBI / HIPAA / PCI DSS",
      ],
    },
    overview: {
      headline: "Posture you can prove. Defence you can call.",
      body: "Our SOC is staffed by senior analysts with red-team certifications. We don't sell tools — we run the programmes that put them to work.",
    },
    capabilities: [
      { title: "24×7 SOC", body: "Tier 1 → 3 staffed in Bangalore. SLAs with measured detection + response times." },
      { title: "EDR / XDR", body: "Deployment, tuning and operations of CrowdStrike, SentinelOne, Defender." },
      { title: "SIEM", body: "Splunk, Sentinel, Wazuh — including detection engineering and use-case library." },
      { title: "Vulnerability management", body: "Continuous scanning, prioritisation, evidence-based remediation." },
      { title: "Identity + zero-trust", body: "Entra ID / Okta, MFA, conditional access, privileged access mgmt." },
      { title: "VAPT + red team", body: "Network, web, mobile, cloud — reports with prioritised remediation, not just findings." },
    ],
    methodology: [
      { title: "Posture assessment", body: "Control gap analysis vs the framework you operate under." },
      { title: "Quick wins", body: "30/60/90 plan that closes the highest-risk findings first." },
      { title: "Programme + SOC", body: "Stand up the controls; integrate into the SOC for continuous monitoring." },
      { title: "Drills + audit prep", body: "Tabletop + IR drills, plus continuous evidence pipelines for audits." },
    ],
    stack: ["CrowdStrike", "SentinelOne", "Microsoft Defender", "Splunk", "Sentinel", "Wazuh", "Tenable", "Okta"],
    industries: ["BFSI", "Healthcare", "Government", "Telecom"],
    stats: [
      { value: "24×7", label: "SOC coverage" },
      { value: "1.2M", label: "Threats blocked / 24h" },
      { value: "9 min", label: "Median time to mitigate" },
    ],
    enquiryQuestions: [
      {
        id: "scenario",
        label: "What brings you here?",
        options: ["Active incident", "Audit / compliance", "VAPT / red team", "SOC / managed security", "Programme assessment"],
      },
      {
        id: "framework",
        label: "Compliance framework",
        options: ["RBI", "SEBI", "HIPAA", "PCI DSS", "ISO 27001", "Not sure"],
      },
    ],
    related: ["managed-it", "compliance", "cloud"],
  },

  {
    slug: "managed-it",
    shortLabel: "Managed IT",
    title: "Managed IT Services",
    tagline: "Full-stack ITSM with senior on-call ownership and measurable SLAs.",
    description:
      "Endpoint, server, network, identity and user support — run by a senior team with named owners on every account and SLAs that hold up under audit.",
    icon: HeadphonesIcon,
    tone: TONES.emerald,
    hero: {
      eyebrow: "Service · Managed IT",
      bullets: [
        "Tiered support, senior owners",
        "Endpoint / server / identity",
        "24×7 NOC + service desk",
        "Quarterly business reviews",
      ],
    },
    overview: {
      headline: "Operations you stop noticing.",
      body: "We don't hide behind queues. Every account has a named senior owner; every escalation has a senior engineer on the line within minutes.",
    },
    capabilities: [
      { title: "Service desk", body: "Tier 1 → 3 across endpoint, M365, identity. Local-language support." },
      { title: "Server + workload ops", body: "Patch, monitor, backup, performance — Linux + Windows." },
      { title: "Network ops", body: "Switch, router, firewall, Wi-Fi monitoring + management." },
      { title: "Identity + endpoint", body: "Entra ID / Intune / JAMF lifecycle, conditional access, posture." },
      { title: "Major incident management", body: "Senior IM lead + war room within 30 min of P1." },
      { title: "Continuous improvement", body: "Quarterly business reviews and a posted improvement backlog." },
    ],
    methodology: [
      { title: "Transition", body: "30-day knowledge transfer with shadowing and runbook capture." },
      { title: "Stabilise", body: "First 90 days focused on closing inherited backlog and noisy alerts." },
      { title: "Operate", body: "Steady-state with monthly KPIs + quarterly business reviews." },
      { title: "Modernise", body: "Continuous improvement against a published roadmap." },
    ],
    stack: ["ServiceNow", "Freshservice", "Datadog", "PRTG", "Microsoft 365", "Intune", "JAMF", "Tanium"],
    industries: ["BFSI", "Healthcare", "Manufacturing", "Retail"],
    stats: [
      { value: "250+", label: "Enterprise accounts" },
      { value: "15 min", label: "P1 response SLA" },
      { value: "4.8/5", label: "Customer CSAT" },
    ],
    enquiryQuestions: [
      {
        id: "scope",
        label: "What do you want managed?",
        options: ["Endpoints / users", "Servers / workloads", "Network", "Identity", "Full stack"],
      },
      {
        id: "footprint",
        label: "Footprint size",
        options: ["< 250 users", "250–1000", "1000–5000", "5000+"],
      },
    ],
    related: ["cybersecurity", "cloud", "data-center"],
  },

  {
    slug: "compliance",
    shortLabel: "Compliance",
    title: "Compliance & Governance",
    tagline: "ISO 27001, RBI, SEBI, HIPAA, PCI DSS — gap analysis to audit pass.",
    description:
      "From gap analysis to continuous evidence pipelines, we make audit week a non-event for India's regulators and global frameworks.",
    icon: Workflow,
    tone: TONES.amber,
    hero: {
      eyebrow: "Service · Compliance",
      bullets: [
        "ISO 27001, ISO 9001, ISO 22301",
        "RBI / SEBI / IRDAI / HIPAA / PCI",
        "Gap → controls → evidence → audit",
        "Continuous compliance pipelines",
      ],
    },
    overview: {
      headline: "Audit week, finally a non-event.",
      body: "We turn audit prep from a quarterly fire drill into a continuous evidence pipeline. Most engagements close their first audit cycle in 8–12 weeks.",
    },
    capabilities: [
      { title: "Framework selection", body: "Choose the right framework for your risk + customer profile." },
      { title: "Gap analysis", body: "Detailed control gap report with priority + effort estimates." },
      { title: "Controls implementation", body: "Build the controls with engineering, not slideware." },
      { title: "Evidence pipelines", body: "Automated collection from cloud, identity, endpoint, ticketing." },
      { title: "Audit preparation", body: "Auditor-ready reports + walkthroughs. We sit through the audit with you." },
      { title: "Continuous monitoring", body: "Drift detection so you never re-cycle through compliance debt." },
    ],
    methodology: [
      { title: "Scope", body: "Pick the framework + define the in-scope estate." },
      { title: "Gap", body: "Control-by-control gap analysis with severity rating." },
      { title: "Remediate", body: "Engineering-led implementation, evidence captured as we go." },
      { title: "Audit + sustain", body: "Audit support + continuous monitoring rolled into managed services." },
    ],
    stack: ["Drata", "Vanta", "ServiceNow GRC", "Splunk", "Sentinel", "Tenable", "AWS Audit Manager"],
    industries: ["BFSI", "Healthcare", "Government", "Telecom"],
    stats: [
      { value: "−92%", label: "Audit findings (avg)" },
      { value: "12w → 3w", label: "Audit prep time" },
      { value: "100%", label: "First-cycle audit pass" },
    ],
    enquiryQuestions: [
      {
        id: "framework",
        label: "Target framework",
        options: ["ISO 27001", "RBI cyber-resilience", "SEBI", "HIPAA", "PCI DSS", "SOC 2", "Multiple"],
      },
      {
        id: "stage",
        label: "Where are you?",
        options: ["Just starting", "Mid-implementation", "Audit in <90 days", "Re-certification"],
      },
    ],
    related: ["cybersecurity", "managed-it", "cloud"],
  },

  {
    slug: "backup-dr",
    shortLabel: "Backup & DR",
    title: "Backup & Resilience",
    tagline: "Immutable backups + tested DR. Recovery objectives that hold under audit.",
    description:
      "Veeam, Commvault, Rubrik with immutable storage and quarterly recovery drills. Designed against ransomware, not just equipment failure.",
    icon: Database,
    tone: TONES.fuchsia,
    hero: {
      eyebrow: "Service · Backup & DR",
      bullets: [
        "Immutable backup architecture",
        "RTO / RPO design + drills",
        "Ransomware recovery posture",
        "Veeam / Commvault / Rubrik",
      ],
    },
    overview: {
      headline: "Backups that survive your worst day.",
      body: "We've recovered customers from ransomware incidents in hours instead of weeks because we design for the worst case — air-gapped, immutable, drilled.",
    },
    capabilities: [
      { title: "Backup architecture", body: "Veeam, Commvault, Rubrik — designed for your RTO/RPO and budget." },
      { title: "Immutable storage", body: "Object lock, air-gapped vaults, off-site replication." },
      { title: "DR design", body: "Active-active, warm-standby, cold-site — modelled against your appetite." },
      { title: "Recovery drills", body: "Quarterly tabletop + technical drills with measured RTO/RPO." },
      { title: "Ransomware playbooks", body: "Detection, isolation, recovery and forensics workflows." },
      { title: "Compliance evidence", body: "Backup + recovery evidence integrated with audit pipelines." },
    ],
    methodology: [
      { title: "Risk model", body: "Workload-by-workload RTO/RPO targets aligned with business impact." },
      { title: "Architecture", body: "Backup + DR design with immutable layers and recovery sequencing." },
      { title: "Implement", body: "Phased rollout, baseline backups, replication, validation." },
      { title: "Drill + improve", body: "Quarterly drills with metrics fed back into the architecture." },
    ],
    stack: ["Veeam", "Commvault", "Rubrik", "AWS S3 Object Lock", "Azure Immutable Blob", "Pure Storage"],
    industries: ["BFSI", "Healthcare", "Manufacturing", "Government"],
    stats: [
      { value: "100%", label: "Quarterly drill pass rate" },
      { value: "< 4h", label: "RTO for tier-1 workloads" },
      { value: "Zero", label: "Data lost in IR engagements" },
    ],
    enquiryQuestions: [
      {
        id: "trigger",
        label: "What triggered this?",
        options: ["Active incident", "Audit gap", "DR refresh", "Ransomware concern", "Cloud migration"],
      },
      {
        id: "platform",
        label: "Existing platform",
        options: ["Veeam", "Commvault", "Rubrik", "Native cloud", "None / mixed"],
      },
    ],
    related: ["cybersecurity", "data-center", "cloud"],
  },

  {
    slug: "workplace",
    shortLabel: "Workplace",
    title: "Modern Workplace",
    tagline: "M365, Workspace, Intune, identity federation, zero-trust device posture.",
    description:
      "Microsoft 365, Google Workspace, Intune/MDM, identity federation and zero-trust device posture for distributed teams.",
    icon: Cpu,
    tone: TONES.teal,
    hero: {
      eyebrow: "Service · Modern Workplace",
      bullets: [
        "M365 + Entra ID + Intune",
        "Google Workspace",
        "JAMF / MDM for Apple fleets",
        "Conditional access + ZT posture",
      ],
    },
    overview: {
      headline: "A workplace that's productive AND audit-ready.",
      body: "We build the workplace stack — identity, devices, collaboration — so your distributed teams stay productive and your CISO sleeps.",
    },
    capabilities: [
      { title: "M365 / Workspace ops", body: "Tenant design, licensing, governance, lifecycle." },
      { title: "Identity federation", body: "Entra ID, Okta, federation, SCIM, SSO across SaaS estate." },
      { title: "MDM / device management", body: "Intune for Windows, JAMF for Apple — full lifecycle + compliance." },
      { title: "Zero-trust posture", body: "Conditional access, device compliance, risk-based access." },
      { title: "Collaboration", body: "Teams + Workspace governance, retention, eDiscovery." },
      { title: "User experience", body: "Onboarding, named-account support, productivity analytics." },
    ],
    methodology: [
      { title: "Tenant design", body: "Identity, licensing, security baselines and governance model." },
      { title: "Pilot rollout", body: "Pilot cohort onboarding with feedback baked into the design." },
      { title: "Migration", body: "Phased migration of users, devices, mailboxes, files." },
      { title: "Operate", body: "Lifecycle management with continuous posture monitoring." },
    ],
    stack: ["Microsoft 365", "Entra ID", "Intune", "Google Workspace", "JAMF", "Okta", "Cisco Duo"],
    industries: ["BFSI", "Healthcare", "Retail", "Telecom", "Government"],
    stats: [
      { value: "150k+", label: "Users under management" },
      { value: "ZT", label: "Posture across all customers" },
      { value: "< 24h", label: "New-joiner provisioning" },
    ],
    enquiryQuestions: [
      {
        id: "platform",
        label: "Workplace platform",
        options: ["Microsoft 365", "Google Workspace", "Hybrid", "Migrating between them"],
      },
      {
        id: "scope",
        label: "Scope",
        options: ["Identity / SSO", "MDM / endpoint", "Tenant migration", "Full stack"],
      },
    ],
    related: ["managed-it", "cybersecurity", "cloud"],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = SERVICES.reduce(
  (acc, s) => ({ ...acc, [s.slug]: s }),
  {} as Record<string, Service>
);

export function getRelatedServices(slug: string): Service[] {
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) return [];
  return svc.related
    .map((s) => SERVICE_BY_SLUG[s])
    .filter((x): x is Service => Boolean(x));
}
