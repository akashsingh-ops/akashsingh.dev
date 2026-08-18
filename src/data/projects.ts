import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'geek-search',
    title: 'Geek-Search',
    tagline: 'A platform built to help students access opportunities beyond the traditional curriculum.',
    category: 'Placement & Competitive Coding Platform',
    personalContext:
      'Akash comes from a small-town background and noticed that many students spend much of college focused primarily on traditional academics with limited exposure to placement preparation, coding contests, and industry-oriented opportunities. Geek-Search was created to bridge that gap.',
    role: ['Frontend Engineering', 'Database Design & Optimization'],
    technologies: ['React', 'Database Architecture', 'REST APIs', 'Performance Tuning', 'State Management'],
    metrics: [
      {
        value: '1,000+',
        label: 'Students Engaged',
        detail: 'Active student users preparing for competitive programming and tech placements.'
      },
      {
        value: '10,000+',
        label: 'Code Submissions',
        detail: 'Submissions processed across global coding contests and practice modules.'
      },
      {
        value: '~40%',
        label: 'Latency Reduction',
        detail: 'Achieved through schema restructuring and query caching optimizations.'
      }
    ],
    problem:
      'College curricula often fail to prepare students for real-world technical interviews and global competitive programming environments. Students outside tier-1 hubs lacked structured tracking, live contest environments, and curated placement roadmaps.',
    solution:
      'Engineered an interactive student preparation portal supporting live contest leaderboards, structured problem tracking, and low-latency submission feedback.',
    technicalDecisions: [
      'Designed normalized relational schemas to maintain fast student leaderboard lookups under high submission volume.',
      'Implemented front-facing caching and optimistic UI updates for instant submission status verification.',
      'Restructured submission queries to avoid expensive table scans during active multi-student contest peaks.'
    ],
    challenges: [
      'Handling sudden submission bursts during contest deadlines without degrading leaderboard calculation times.',
      'Ensuring low-latency responsive feedback across varied network bandwidths in regional student locations.'
    ],
    impact: [
      'Successfully powered campus coding contests with 1,000+ active student participants.',
      'Processed over 10,000 algorithmic contest submissions reliably.',
      'Delivered ~40% faster page loads and submission feedback for students.'
    ],
    whatILearned:
      'Building for real users taught me that database schema design and network efficiency matter just as much as UI responsiveness. It shifted my perspective permanently toward backend architecture.',
    githubUrl: 'https://github.com/akashsingh-ops',
    featured: true
  },
  {
    id: 'eazeae',
    title: 'EazEae',
    tagline: 'A digital tourism platform designed around easier and more accessible visitor experiences.',
    category: 'QR-Based Access & Digital Tourism Platform',
    personalContext:
      'Growing up around Agra—a city renowned for iconic monuments—Akash noticed that smaller historical heritage sites often had limited digital infrastructure, leading to ticketing friction, long queues, and paper ticket mismanagement.',
    role: ['Full-Stack Engineering', 'Backend API Architecture', 'Database Design'],
    technologies: ['Node.js', 'MongoDB', 'React Native', 'QR Cryptography', 'Role-Based Access Control'],
    metrics: [
      {
        value: '500+',
        label: 'Daily Requests Handled',
        detail: 'Concurrent tourist access validation scans and ticketing queries.'
      },
      {
        value: '~75%',
        label: 'Faster Response Times',
        detail: 'Optimized validation pipeline and database query indexing.'
      },
      {
        value: '100%',
        label: 'Duplicate Entry Prevention',
        detail: 'Atomic status check and single-use QR token invalidation.'
      }
    ],
    problem:
      'Traditional monument ticketing suffered from manual queue bottlenecks, counterfeit or re-used paper tickets, and lack of real-time footfall analytics for site administrators.',
    solution:
      'Built a complete mobile and web ecosystem featuring encrypted QR pass generation, rapid site-gate validation scanner, and a secure role-based administrative dashboard.',
    technicalDecisions: [
      'Designed a single-use token lifecycle with atomic state transitions to strictly prevent double-entry under concurrent gate scans.',
      'Optimized MongoDB document indexing on timestamp and token hashes to achieve sub-millisecond lookup times.',
      'Constructed role-based access control (RBAC) separating tourist profiles, ticket inspectors, and administrative analysts.'
    ],
    challenges: [
      'A difficult engineering challenge was making the QR flow reliable under concurrent requests while preventing duplicate/misused entries.',
      'Initially investigated as a frontend/API performance issue, but root-cause profiling revealed deeper friction in the interplay between token cryptographic validation, request pooling, and database lock contention. Redesigned the validation transaction flow to be atomic and streamlined.'
    ],
    impact: [
      'Handled 500+ daily visitor entry scans seamlessly.',
      'Reduced average verification latency by ~75%, eliminating entry gate queues.',
      'Empowered site managers with real-time visitor analytics and audit trails.'
    ],
    whatILearned:
      'Diagnosing concurrency issues requires looking beneath surface symptoms. What seemed like an API speed problem was actually a database transaction and validation orchestration bottleneck.',
    githubUrl: 'https://github.com/akashsingh-ops/EazEae_MajorProject',
    featured: true
  }
];
