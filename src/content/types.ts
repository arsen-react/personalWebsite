export interface Stat {
  value: string;
  label: string;
}

export interface Job {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Project {
  name: string;
  stack: string;
  href: string;
  highlights: string[];
}

export interface SkillGroup {
  icon: string;
  title: string;
  tags: string[];
}

export interface Education {
  period: string;
  school: string;
  detail: string;
}

export interface Language {
  name: string;
  level: string;
}
