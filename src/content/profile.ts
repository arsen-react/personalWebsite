export interface NavSection {
  id: string;
  label: string;
}

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  firstName: "Arsen",
  lastName: "Melqonyan",
  role: "Frontend Engineer",
  location: "Yerevan, Armenia",
  brand: "arsen.dev",
  description:
    "Frontend Engineer building React and TypeScript consoles for payment and ticketing platforms.",
  tagline:
    "I build React and TypeScript consoles for payment and ticketing platforms, from data model to release.",

  about: [
    "Frontend engineer at PandaTech, building admin consoles for fintech products used by nearly every condominium in Yerevan and a 4,200+ terminal payment network.",
    "I own features end to end: payment and KYC workflows, role-based access, live data and the shared components behind them. I mentor developers, review code and run releases for two products.",
  ],

  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "React", label: "Core Specialization" },
    { value: "Fintech", label: "Industry Focus" },
    { value: "Mentor", label: "Team Leadership" },
  ],

  experience: [
    {
      company: "PandaTech",
      location: "Yerevan, Armenia",
      role: "Frontend Engineer",
      period: "2023 — Present",
      bullets: [
        "Main frontend engineer on two fintech admin consoles (condominium payments, event ticketing) and core engineer on a third for a payment-terminal network",
        "Designed a drag-and-drop editor (dnd-kit, reducer-based state) that lets operators link, reorder and publish each terminal's payment menu",
        "Built payment and sales workflows end to end: debts, transactions, chargebacks, commission and fee rules, KYC review, event schedules, promo codes and PDF tickets",
        "Built account security and role-based access control: two-factor sign-in by authenticator or SMS, device and session management, roles, permissions and the audit trail",
        "Co-developed the shared data grid behind 69 screens, plus shared picture-upload and rich-text editor components",
        "Made open tabs recover automatically after a deploy instead of breaking on missing chunks; tuned RTK Query caching and added pull-request CI",
        "Mentored two developers and run most releases for two products",
      ],
    },
  ],

  projects: [
    {
      name: "CryptoLiveDash",
      stack: "React 19 · TypeScript · RTK Query · WebSocket",
      href: "https://github.com/arsen-react/CryptoLiveDash",
      highlights: [
        "Real-time crypto trading dashboard: live Binance prices and candles over WebSocket, TradingView charts and an order book",
        "Redux Toolkit and RTK Query state, drag-and-drop widgets and Zod-validated persistence",
        "83 Vitest and React Testing Library tests, including regression tests for two live-stream bugs",
      ],
    },
  ],

  skills: [
    {
      icon: "</>",
      title: "Frontend Architecture",
      tags: ["React", "Next.js", "TypeScript", "REST APIs"],
    },
    {
      icon: "⚙",
      title: "State & Data",
      tags: ["Redux Toolkit", "RTK Query", "TanStack Query", "Formik"],
    },
    {
      icon: "⚡",
      title: "Performance",
      tags: ["Lazy Loading", "Caching", "Chunk-load Recovery"],
    },
    {
      icon: "☆",
      title: "UI Libraries",
      tags: ["MUI", "Ant Design", "Tailwind CSS", "dnd-kit"],
    },
    {
      icon: "🛠",
      title: "Tooling & Standards",
      tags: ["Vite", "ESLint", "Vitest", "GitHub Actions"],
    },
    {
      icon: "👥",
      title: "Leadership",
      tags: ["Mentoring", "Code Reviews", "Releases", "Onboarding"],
    },
  ],

  softSkills: [
    "Mentoring",
    "Team Collaboration",
    "Agile & Scrum",
    "Problem-Solving",
    "Attention to Detail",
    "Communication",
    "Time Management",
    "Adaptability",
    "Design Thinking",
  ],

  education: [
    {
      period: "2014 — 2018",
      school: "National University of Architecture and Construction of Armenia",
      detail: "Bachelor's Degree in Information and Computer Science",
    },
    {
      period: "2003 — 2014",
      school: "Shavarsh Simonyan School",
      detail: "General Education",
    },
  ],

  languages: [
    { name: "Armenian", level: "Native" },
    { name: "English", level: "Intermediate" },
    { name: "Russian", level: "Intermediate" },
  ],

  contact: {
    email: "arsen.front@gmail.com",
    phone: "+374 98 068 038",
    github: "https://github.com/arsen-react",
    linkedin: "https://www.linkedin.com/in/arsen-melkonyan",
  },
};

/** "+374 98 068 038" -> "tel:+37498068038" */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
