import type { Education, Job, Language, Project, SkillGroup, Stat } from "./types";

export const tagline =
  "I build React and TypeScript consoles for payment and ticketing platforms, from data model to release.";

export const about: { paragraphs: string[]; stats: Stat[] } = {
  paragraphs: [
    "Frontend engineer at PandaTech, building admin consoles for fintech products: condominium payments used by nearly every condominium in Yerevan, a payment network of 4,200+ terminals, and in-app event ticketing.",
    "I own features end to end, from data model to release: payment and KYC workflows, role-based access and two-factor sign-in, and the shared components behind them. I mentor developers, review code and run most releases for two products.",
  ],
  stats: [
    { value: "4,200+", label: "Payment Terminals" },
    { value: "React", label: "Core Specialization" },
    { value: "Fintech", label: "Industry Focus" },
    { value: "Mentor", label: "Team Leadership" },
  ],
};

export const experience: Job[] = [
  {
    company: "PandaTech",
    location: "Yerevan, Armenia",
    role: "Frontend Engineer",
    period: "Feb 2023 — Present",
    highlights: [
      "Main frontend engineer on two fintech admin consoles (condominium payments, event ticketing) and core engineer on a third for a payment-terminal network; also worked on a Next.js 16 marketing site (App Router, PWA)",
      "Designed a drag-and-drop editor (dnd-kit, reducer-based state) that lets operators link, reorder and publish each terminal's payment menu",
      "Built payment and sales workflows end to end: debts, transactions, chargebacks, commission and fee rules, KYC review, event schedules, promo codes and PDF tickets",
      "Built account security and role-based access control (RBAC): two-factor sign-in by authenticator or SMS, device and session management, roles and permissions, and the audit trail",
      "Co-developed the shared data grid behind 69 screens, plus shared picture-upload and rich-text editor components",
      "Made open tabs recover automatically after a deploy instead of breaking on missing chunks; tuned RTK Query caching and added pull-request CI with Docker build checks",
      "Mentored two developers, one now the main developer of a v2 rewrite; run most releases for two products (430+ QA and production promotions since 2024) and do code reviews for the team",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "CryptoLiveDash",
    stack: "React 19 · TypeScript · RTK Query · WebSocket",
    href: "https://github.com/arsen-react/CryptoLiveDash",
    highlights: [
      "Real-time crypto trading dashboard: live Binance prices and candles over WebSocket, TradingView charts and an order book",
      "Redux Toolkit and RTK Query state, drag-and-drop widgets (mouse and keyboard) and Zod-validated persistence",
      "170+ Vitest and React Testing Library tests with coverage gates in CI, including regression tests for live-stream bugs",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    icon: "</>",
    title: "Frontend Architecture",
    tags: ["React", "Next.js", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    icon: "⚙",
    title: "State & Data",
    tags: ["Redux Toolkit", "RTK Query", "TanStack Query", "Formik"],
  },
  { icon: "⚡", title: "Performance", tags: ["Lazy Loading", "Caching", "Chunk-load Recovery"] },
  {
    icon: "☆",
    title: "UI Libraries",
    tags: ["MUI", "Ant Design", "Tailwind CSS", "dnd-kit", "i18next"],
  },
  {
    icon: "🛠",
    title: "Delivery & Tooling",
    tags: ["Vite", "ESLint", "GitHub Actions", "Docker", "Git", "Claude Code"],
  },
  {
    icon: "👥",
    title: "Leadership",
    tags: ["Mentoring", "Code Reviews", "Releases", "Onboarding"],
  },
];

export const softSkills: string[] = [
  "Mentoring",
  "Team Collaboration",
  "Agile & Scrum",
  "Problem-Solving",
  "Attention to Detail",
  "Communication",
  "Time Management",
  "Adaptability",
  "Design Thinking",
];

export const education: Education[] = [
  {
    period: "2014 — 2018",
    school: "National University of Architecture and Construction of Armenia",
    detail: "Bachelor's Degree in Information and Computer Science",
  },
  {
    period: "2021",
    school: "Basic IT Center",
    detail: "Front-End Development course",
  },
  {
    period: "2003 — 2014",
    school: "Experimental High School No. 112 named after Shavarsh Simonyan",
    detail: "High School Diploma, Mathematics",
  },
];

export const languages: Language[] = [
  { name: "Armenian", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Russian", level: "Professional" },
];
