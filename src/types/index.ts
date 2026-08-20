export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  personalContext: string;
  role: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  problem: string;
  solution: string;
  technicalDecisions: string[];
  challenges: string[];
  impact: string[];
  whatILearned: string;
  githubUrl?: string;
  liveUrl?: string;
  externalLink?: {
    url: string;
    label: string;
  };
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location?: string;
  overview: string;
  themes: string[];
  keyContributions: string[];
  impactMetrics: {
    stat: string;
    label: string;
  }[];
  technologies: string[];
  architectureFocus?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  dominant?: boolean;
  skills: {
    name: string;
    proficiency?: 'dominant' | 'proficient' | 'familiar' | 'exploring';
    note?: string;
  }[];
}

export interface PhilosophyPrinciple {
  id: string;
  title: string;
  statement: string;
  explanation: string;
  mentalModel: string;
  codeSnippet?: string;
}

export interface MetricItem {
  stat: string;
  label: string;
  context: string;
  category: 'production' | 'optimization' | 'latency' | 'community' | 'dsa';
  detail: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  period: string;
  highlight: string;
}

export interface AchievementItem {
  title: string;
  organization: string;
  detail: string;
  tag: string;
}
