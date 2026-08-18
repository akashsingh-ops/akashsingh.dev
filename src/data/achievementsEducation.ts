import { EducationItem, AchievementItem } from '../types';

export const educationData: EducationItem[] = [
  {
    institution: 'KIET Group of Institutions',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Information Technology',
    score: 'CGPA: 8.1 / 10',
    period: 'Completed 07/2024',
    highlight: 'Deepened focus in systems programming, databases, web architectures, and algorithms.'
  },
  {
    institution: 'Dayalbagh Educational Institute',
    degree: 'Diploma in Information Technology',
    score: 'CGPA: 8.92 / 10',
    period: 'Completed 07/2021',
    highlight: 'Foundation in computing fundamentals, structured programming, and practical IT engineering.'
  }
];

export const achievementsData: AchievementItem[] = [
  {
    title: 'Employee of the Month (Twice)',
    organization: 'Xaigi Technology',
    detail: 'Recognized twice for outstanding contributions in optimizing backend graph queries and architecting multi-tenant RBAC systems.',
    tag: 'Professional Recognition'
  },
  {
    title: 'INR 10,000 Engineering Award',
    organization: 'Xaigi Technology',
    detail: 'Awarded alongside Employee of the Month recognition for high-impact technical performance and backend reliability.',
    tag: 'Performance Award'
  },
  {
    title: '2nd Place — KIET Hackathon',
    organization: 'KIET Group of Institutions',
    detail: 'Secured 2nd rank among 60+ competing engineering teams for rapid prototyping of a real-world software solution.',
    tag: 'Hackathon'
  },
  {
    title: '300+ DSA Problems Solved',
    organization: 'LeetCode & Competitive Platforms',
    detail: 'Consistent problem-solving in graph traversals, dynamic programming, tree manipulation, and algorithm design.',
    tag: 'Problem Solving'
  },
  {
    title: '2-Star Coder',
    organization: 'HackerEarth',
    detail: 'Demonstrated algorithmic proficiency and competitive programming skills in time-constrained challenges.',
    tag: 'Competitive Coding'
  }
];

export const devloreData = {
  name: 'DEVLORE',
  tagline: 'Learn · Experiment · Share',
  description:
    'A dedicated technical space where Akash documents software engineering concepts, breaks down backend system designs, shares architectural lessons, and builds in public.',
  link: 'https://www.instagram.com/thedevlore/',
  handle: '@thedevlore',
  coreThemes: [
    'Backend System Mechanics & Data Flow',
    'Database Optimization & Indexing Strategies',
    'System Design Patterns for Real Applications',
    'Continuous Learning & Engineering Insights'
  ]
};
