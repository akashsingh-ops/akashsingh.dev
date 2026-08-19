import { Project } from '../types';

export interface ProjectExtended extends Project {
  company?: string;
  architectureSubtitle?: string;
  quickFacts: {
    stat: string;
    label: string;
    detail?: string;
  }[];
  story: {
    problemStatement: string;
    problemPoints?: string[];
    whatItDoes: string;
    roleStatement: string;
    collaborationDetails?: string;
    technicalChallenge: string;
    solutionDetails: string[];
    outcomes: string[];
    learned: string;
  };
}

export const projectsData: ProjectExtended[] = [
  {
    id: 'mimasa-ai',
    title: 'Mimasa AI',
    tagline: 'AI-powered Data Analytics — making enterprise data easier to understand, search, and act on.',
    category: 'Enterprise Data Analytics & Search Platform',
    company: 'Xaigi Technology',
    architectureSubtitle: 'Backend · Data · Search · AI',
    personalContext:
      'Enterprise data lives in disparate silos across fragmented systems, teams, and formats. Insights are delayed, decisions reactive, and execution manual. Mimasa AI reconciles enterprise data into governed models with plain-language querying and automated downstream actions.',
    role: [
      'Backend & Frontend Engineering Support',
      'Intelligent Search Engine',
      'Multi-Tenant Workspace Isolation',
      'Async Notification Pipelines',
      'Personalized Onboarding Flow',
      'GenAI & Data Science Collaboration'
    ],
    technologies: [
      'Python',
      'Django REST Framework',
      'Elasticsearch / OpenSearch',
      'Celery & Redis',
      'PostgreSQL',
      'LangChain / RAG',
      'React.js'
    ],
    quickFacts: [
      { stat: '<100ms', label: 'Search Latency', detail: 'Sub-100ms fuzzy and prefix discovery across data sources and charts' },
      { stat: '6-Step', label: 'Onboarding Pipeline', detail: 'Personal, professional, and interest signal capture for GenAI' },
      { stat: 'Multi-Tenant', label: 'Workspace Isolation', detail: 'Strict organization boundary enforcement across assets' },
      { stat: 'Async', label: 'Signal & Celery Queues', detail: 'Decoupled in-app, email, security, and asset collaboration triggers' }
    ],
    metrics: [
      {
        value: '<100ms',
        label: 'Search Response Time',
        detail: 'Fuzzy search, typo tolerance, autocomplete, and prefix search across dashboards and datasources.'
      },
      {
        value: '6-Step',
        label: 'Onboarding Flow',
        detail: 'Captures personal, professional, and interest metadata to drive personalized GenAI recommendations.'
      },
      {
        value: '100%',
        label: 'Tenant Isolation',
        detail: 'Scoped database records and organization IDs preventing cross-organization data leakage.'
      }
    ],
    problem:
      'Data exists, but it lives in silos across systems, teams, and formats. Insights are delayed, decisions are reactive, and execution is manual.',
    solution:
      'Mimasa AI connects to the systems organizations already run, reconciles data into governed models, lets users question that data in plain language, and helps carry decisions into source systems through automation agents.',
    technicalDecisions: [
      'Built intelligent search supporting full-text, fuzzy search, typo correction, autocomplete, and prefix queries with <100ms response time.',
      'Constructed multi-tenant organization workspaces with scoped database records and strict asset permission boundaries.',
      'Designed an asynchronous event notification architecture leveraging Django Signals and Celery task queues for in-app, email, and collaboration updates.',
      'Engineered the comprehensive 6-step user onboarding flow capturing multidimensional profile signals to seed personalized AI recommendations.',
      'Collaborated with the GenAI and Data Science teams on RAG-based systems, LangChain/LangGraph workflows, NL-to-SQL querying, insight generation, and forecasting.'
    ],
    challenges: [
      'Delivering sub-100ms search latency across heterogeneous entity types (datasources, dashboards, charts, analyses) while maintaining strict tenant access boundaries.',
      'Decoupling real-time notifications and audit events from the critical API response path under high concurrent event volume.'
    ],
    impact: [
      'Unified enterprise data discoverability with sub-100ms typo-tolerant search across all tenant assets.',
      'Streamlined user acquisition with an end-to-end 6-step signal onboarding pipeline feeding GenAI context.',
      'Delivered reliable multi-tenant isolation and event-driven notifications across the enterprise workspace.'
    ],
    whatILearned:
      'Working closely with GenAI and Data Science teams taught me how high-performance backend pipelines, clean data contracts, and strict tenant boundaries are the essential foundation for dependable AI-driven workflows.',
    featured: true,
    story: {
      problemStatement: 'Data exists. But it lives in silos — across systems, teams, and formats.',
      problemPoints: [
        'Insights are delayed.',
        'Decisions are reactive.',
        'Execution is manual.'
      ],
      whatItDoes:
        'Mimasa AI connects to the systems organizations already run, reconciles data into governed models, lets users question that data in plain language, and helps carry decisions into source systems through automation agents.',
      roleStatement:
        'Worked closely with the GenAI and Data Science teams, providing backend and frontend engineering support across data analytics, search, organization management, notifications, onboarding, and AI-powered workflows.',
      collaborationDetails:
        'Collaborated with the GenAI and Data Science teams on RAG-based systems, LangChain/LangGraph workflows, NL-to-SQL translation, insight generation, and forecasting.',
      technicalChallenge:
        'Ensuring sub-100ms search responsiveness, robust multi-tenant data boundaries, and non-blocking asynchronous event processing across enterprise assets.',
      solutionDetails: [
        'Intelligent Search: Engineered full-text, fuzzy matching, typo tolerance, autocomplete, and prefix search yielding <100ms response times.',
        'Organization Workspace: Built tenant-based data isolation using scoped database records and organization IDs with strict permission enforcement.',
        'Decoupled Notifications: Routed event triggers via Django Signals into Celery worker queues for in-app, email, and security dispatches.',
        '6-Step Onboarding: Captured personal, professional, and interest signals to power downstream GenAI personalization.'
      ],
      outcomes: [
        'Sub-100ms search response across datasources, dashboards, charts, and analyses.',
        'Zero cross-tenant data leakage with strict workspace boundary enforcement.',
        'Seamless handoff between core backend ingestion and GenAI analytical agents.'
      ],
      learned:
        'High-quality AI applications require rock-solid backend infrastructure: deterministic data models, rapid indexing, decoupled queues, and clear team boundaries.'
    }
  },
  {
    id: 'geek-search',
    title: 'Geek-Search',
    tagline: 'A platform built to help students discover opportunities beyond the curriculum.',
    category: 'Placement & Competitive Coding Platform',
    architectureSubtitle: 'Frontend · Database Architecture',
    personalContext:
      'Coming from a small-town background, Akash saw that many students spend much of college focused primarily on traditional academics with limited exposure to placement-oriented preparation, coding contests, and industry expectations. He built Geek-Search to help bridge that gap.',
    role: [
      'Frontend Engineering',
      'Database Design & Optimization',
      'Leaderboard State Management'
    ],
    technologies: ['React.js', 'Relational Database Design', 'REST APIs', 'Performance Tuning', 'State Management'],
    quickFacts: [
      { stat: '1,000+', label: 'Students Engaged', detail: 'Active student users preparing for competitive programming and tech placements' },
      { stat: '10,000+', label: 'Code Submissions', detail: 'Submissions processed across global coding contests and practice modules' },
      { stat: '~40%', label: 'Latency Reduction', detail: 'Achieved through schema restructuring and query caching optimizations' }
    ],
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
      'Students outside major tier-1 hubs lacked structured tracking for coding contests, transparent leaderboards, and organized placement roadmaps.',
    solution:
      'Engineered an interactive student preparation portal supporting live contest leaderboards, structured problem tracking, global coding contest integration, and low-latency submission feedback.',
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
    featured: true,
    story: {
      problemStatement: 'Students outside tier-1 colleges lacked exposure to placement preparation, coding contests, and industry expectations.',
      whatItDoes: 'Provides structured tracking for global coding contests, curated problem roadmaps, and instant submission ranking.',
      roleStatement: 'Contributed across frontend engineering and database design & optimization.',
      technicalChallenge: 'Preventing leaderboard calculation bottlenecks during peak concurrent contest submissions.',
      solutionDetails: [
        'Relational Schema Tuning: Restructured submission tables and indices to eliminate full scans during score aggregation.',
        'Optimistic Frontend State: Cached contest states on the client edge for snappy UI interaction.',
        'Contest Integrations: Integrated global coding contests into accessible roadmaps.'
      ],
      outcomes: [
        '1,000+ active students preparing for technical interviews.',
        '10,000+ verified contest submissions processed.',
        '~40% latency reduction across contest pages.'
      ],
      learned: 'Observing real users struggle with latency made me realize that database structure and data movement define user experience.'
    }
  },
  {
    id: 'oceanmotion',
    title: 'OceanMotion',
    tagline: 'Enterprise Cloud Analytics Platform — dataset publishing, graph systems, RBAC, and analytics.',
    category: 'Enterprise Cloud Analytics & Graph Platform',
    company: 'Xaigi Technology',
    architectureSubtitle: 'Django · Neo4j · Superset · REST APIs',
    personalContext:
      'Turning a complex dataset lifecycle into a governed publishing and analytics platform. Engineered deep backend architectures spanning dataset ingestion, metadata licensing, Neo4j graph relationships, multi-tenant RBAC, and Apache Superset analytical dashboards.',
    role: [
      'Backend Architecture & REST APIs',
      'Neo4j Graph Database & Cypher Optimization',
      'Group Sharing & RBAC Engine',
      'Apache Superset Dashboard Integration',
      'Permission Leakage & Performance Debugging'
    ],
    technologies: [
      'Python',
      'Django REST Framework',
      'Neo4j (Cypher)',
      'Apache Superset',
      'PostgreSQL',
      'RBAC Security',
      'Celery & Redis'
    ],
    quickFacts: [
      { stat: '70+', label: 'REST APIs Built', detail: 'Dataset ingestion, metadata, licensing, subscriptions, and access control' },
      { stat: '35+', label: 'Cypher Queries', detail: 'Complex graph traversals across multi-entity relationship trees in Neo4j' },
      { stat: '30–40%', label: 'Query Speedup', detail: 'Optimized graph pattern matching, indexing, and relationship traversals' },
      { stat: 'RBAC', label: 'Group Sharing Engine', detail: 'Multi-tenant groups, Admin/Member roles, and domain-wide Superset permissions' }
    ],
    metrics: [
      {
        value: '70+',
        label: 'REST APIs Built',
        detail: 'Covering dataset ingestion, metadata, licensing, pricing, subscriptions, and access control.'
      },
      {
        value: '35+',
        label: 'Cypher Queries Optimized',
        detail: 'Complex graph queries across deep relationship trees in Neo4j.'
      },
      {
        value: '30–40%',
        label: 'Execution Improvement',
        detail: 'Achieved through indexing, pattern rewrites, and relationship traversal optimization.'
      }
    ],
    problem:
      'Organizations needed a secure, high-performance platform to manage the complete lifecycle of analytical datasets: uploading, metadata tagging, licensing, pricing, group-level sharing, access governance, and real-time visualization.',
    solution:
      'Engineered an enterprise publishing and analytics platform integrating Django REST APIs, Neo4j graph representations for users/groups/datasets/charts/dashboards, and Apache Superset for interactive analytics.',
    technicalDecisions: [
      'Constructed 70+ production REST APIs covering dataset ingestion, metadata schemas, licensing, subscription tiers, and access control.',
      'Represented multi-entity relationships in Neo4j (USER → GROUP → DATASET → CHART → DASHBOARD) and authored 35+ complex Cypher queries.',
      'Achieved a 30–40% query execution speed improvement through Cypher pattern rewrites, targeted schema indexing, and relationship optimization.',
      'Architected and implemented the Group Sharing / RBAC module from scratch supporting multi-tenant groups, Admin/Member roles, and domain-wide Superset permissions.',
      'Integrated Apache Superset to generate real-time charts and dashboards, backed by graph storage representations in Neo4j.'
    ],
    challenges: [
      'Permission leakage and slow query execution occurred when users shared complex nested dashboards containing cross-group dataset dependencies.',
      'Diagnosed the bottleneck by profiling Cypher execution plans, refactoring traversal patterns, and eliminating circular relationship checks to achieve both correct access governance and faster queries.'
    ],
    impact: [
      'Delivered 70+ robust, documented REST APIs powering the full dataset publishing lifecycle.',
      'Boosted graph query execution performance by 30–40% across 35+ production Cypher queries.',
      'Enabled seamless multi-tenant collaboration with zero permission leakage across shared charts and dashboards.'
    ],
    whatILearned:
      'Graph databases excel at representing connected data, but require careful traversal modeling and indexing to avoid exponential relationship expansion under complex RBAC rules.',
    featured: true,
    story: {
      problemStatement: 'Turning a complex dataset lifecycle into a governed publishing and analytics platform.',
      whatItDoes: 'Governs dataset upload, licensing, pricing, access control, publication, and visual analytics via Apache Superset.',
      roleStatement: 'Core backend engineering: designed 70+ REST APIs, optimized 35+ Cypher graph queries, and built the RBAC Group Sharing engine from scratch.',
      technicalChallenge: 'Eliminating slow queries and permission leakage across nested shared dashboard assets in Neo4j.',
      solutionDetails: [
        '70+ REST APIs: Full dataset publishing lifecycle including ingestion, licensing, subscriptions, and access control.',
        'Graph Centerpiece: Modeled USER → GROUP → DATASET → CHART → DASHBOARD relationships in Neo4j with 35+ optimized Cypher queries.',
        'Query Tuning: Achieved 30–40% faster execution via indexing, pattern rewrites, and relationship optimization.',
        'RBAC Engine: Multi-tenant groups with Admin/Member roles and domain-wide asset permission sync into Apache Superset.'
      ],
      outcomes: [
        '30–40% query execution speedup across all graph traversals.',
        '70+ production APIs running reliably with clean role-based security.',
        'Zero permission leakage on deeply shared dashboards and charts.'
      ],
      learned: 'Debugging permission leakage taught me how crucial it is to inspect database query plans (EXPLAIN / PROFILE) rather than assuming business logic is at fault.'
    }
  },
  {
    id: 'eazeae',
    title: 'EazEae',
    tagline: 'Digital Tourism Platform — QR-based visitor access and ticketing infrastructure.',
    category: 'QR-Based Access & Digital Tourism Platform',
    architectureSubtitle: 'Full-stack + Backend Systems',
    personalContext:
      'Growing up around Agra—a city renowned for iconic monuments—Akash noticed that smaller historical heritage monuments often lacked accessible digital visitor experiences, leading to ticketing friction, long queues, and paper ticket mismanagement.',
    role: ['Full-Stack Engineering', 'Backend API Architecture', 'Database Design'],
    technologies: ['Node.js', 'MongoDB', 'React Native', 'QR Cryptography', 'Role-Based Access Control'],
    quickFacts: [
      { stat: '500+', label: 'Daily Requests', detail: 'Concurrent tourist access validation scans and ticketing queries' },
      { stat: '~75%', label: 'Faster Responses', detail: 'Optimized validation pipeline and database query indexing' },
      { stat: '100%', label: 'Duplicate Prevention', detail: 'Atomic status check and single-use QR token invalidation' }
    ],
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
      'Smaller historical monuments suffered from manual queue bottlenecks, counterfeit or re-used paper tickets, and lack of real-time footfall analytics for site administrators.',
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
    featured: true,
    story: {
      problemStatement: 'Heritage sites in Agra lacked accessible digital visitor experiences, causing queue friction and ticket mismanagement.',
      whatItDoes: 'Generates single-use encrypted QR tokens, validates tickets at the gate in milliseconds, and streams analytics to monument managers.',
      roleStatement: 'Full-stack & backend systems engineering: API design, QR token lifecycle, and database optimization.',
      technicalChallenge: 'Preventing duplicate scans under concurrent gate traffic while reducing verification latency.',
      solutionDetails: [
        'Atomic Invalidation: Designed transactional state transitions to ensure a token cannot be validated twice simultaneously.',
        'Index Optimization: Indexing token hashes and timestamps reduced database lookup times by ~75%.',
        'Role-Based Controls: Separate views for visitors, gate inspectors, and site administrators.'
      ],
      outcomes: [
        '500+ daily visitor scans handled smoothly.',
        '~75% reduction in gate verification latency.',
        '100% duplicate access prevention.'
      ],
      learned: 'Performance engineering often comes down to concurrency management and database indexing rather than adding more server hardware.'
    }
  }
];
