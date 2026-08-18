import { SkillCategory } from '../types';

export const skillCategoriesData: SkillCategory[] = [
  {
    title: 'Backend Engineering',
    description: 'Core runtime environments, frameworks, and API construction engines.',
    dominant: true,
    skills: [
      { name: 'Python', proficiency: 'dominant', note: 'Primary backend language' },
      { name: 'Django', proficiency: 'dominant', note: 'Production enterprise APIs' },
      { name: 'Django REST Framework', proficiency: 'dominant', note: 'Serialization, viewsets, authentication' },
      { name: 'FastAPI', proficiency: 'familiar', note: 'Asynchronous microservices & OpenAPI' },
      { name: 'Node.js', proficiency: 'familiar', note: 'REST APIs & runtime tooling' },
      { name: 'Celery', proficiency: 'dominant', note: 'Distributed async task queues & workers' }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Relational, graph, cache, and search storage systems.',
    dominant: true,
    skills: [
      { name: 'Neo4j (Cypher)', proficiency: 'dominant', note: 'Graph modeling & 35+ query optimizations' },
      { name: 'MySQL / PostgreSQL', proficiency: 'dominant', note: 'Relational schema design, indexes, transactions' },
      { name: 'Redis', proficiency: 'proficient', note: 'In-memory caching, pub/sub, session state' },
      { name: 'Amazon Redshift', proficiency: 'proficient', note: 'Data warehousing & analytical query loading' },
      { name: 'MongoDB', proficiency: 'familiar', note: 'Document modeling & atomic updates' },
      { name: 'Elasticsearch / OpenSearch', proficiency: 'proficient', note: 'Full-text & faceted search <100ms' }
    ]
  },
  {
    title: 'Architecture & System Design',
    description: 'Patterns for isolation, throughput, data flow, and resilience.',
    dominant: true,
    skills: [
      { name: 'Multi-Tenant Systems', proficiency: 'dominant', note: 'Tenant isolation, schema & data partitioning' },
      { name: 'Role-Based Access Control (RBAC)', proficiency: 'dominant', note: 'Fine-grained policy enforcement' },
      { name: 'RESTful API Architecture', proficiency: 'dominant', note: 'Predictable interfaces, idempotency, versioning' },
      { name: 'Event-Driven & Async Queues', proficiency: 'proficient', note: 'Decoupling heavy compute from request path' },
      { name: 'Data Synchronization Pipelines', proficiency: 'proficient', note: 'Graph ↔ Search index consistency' },
      { name: 'JWT & OAuth2 Security', proficiency: 'proficient', note: 'Stateless token auth & secure session flow' }
    ]
  },
  {
    title: 'Data Pipelines, Analytics & AI Exploration',
    description: 'Extract-Transform-Load, visualization platforms, and agentic workflows.',
    dominant: false,
    skills: [
      { name: 'ETL Pipelines', proficiency: 'proficient', note: 'Data cleaning, transformation & ingestion' },
      { name: 'Apache Superset', proficiency: 'proficient', note: 'Interactive analytical dashboards' },
      { name: 'LangChain & RAG (Exploration)', proficiency: 'familiar', note: 'Contextual retrieval with Knowledge Graphs' },
      { name: 'AI / Agentic Workflow Exploration', proficiency: 'exploring', note: 'Automating operational tasks' }
    ]
  },
  {
    title: 'Cloud, Infrastructure & DevOps',
    description: 'Cloud hosting, containerization, and deployment automation.',
    dominant: false,
    skills: [
      { name: 'AWS (EC2, S3, IAM, Lambda)', proficiency: 'proficient', note: 'Cloud compute, storage & IAM permissions' },
      { name: 'Docker', proficiency: 'proficient', note: 'Containerization of backend services' },
      { name: 'CI/CD & Git Workflows', proficiency: 'proficient', note: 'Automated testing and release pipelines' }
    ]
  },
  {
    title: 'Languages & Engineering Tooling',
    description: 'Programming fundamentals and developer toolchain.',
    dominant: false,
    skills: [
      { name: 'Python', proficiency: 'dominant' },
      { name: 'JavaScript / TypeScript', proficiency: 'proficient' },
      { name: 'Java', proficiency: 'familiar' },
      { name: 'C / C++', proficiency: 'familiar' },
      { name: 'Git & GitHub', proficiency: 'dominant' },
      { name: 'Postman', proficiency: 'dominant' },
      { name: 'Pytest', proficiency: 'proficient' },
      { name: 'Jira & Bitbucket', proficiency: 'proficient' }
    ]
  }
];
