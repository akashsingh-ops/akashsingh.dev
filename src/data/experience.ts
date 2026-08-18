import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'dell',
    company: 'Dell Technologies',
    role: 'Service Delivery Engineer',
    period: '02/2026 – Present',
    current: true,
    location: 'India',
    overview:
      'Focusing on enterprise data ingestion pipelines, automated ETL workflows, Amazon Redshift warehousing, downstream analytics, and engineering automated solutions for repetitive operational workflows.',
    themes: ['Data Ingestion', 'ETL Pipelines', 'Amazon Redshift', 'Operational Automation', 'AI Agentic Workflows'],
    keyContributions: [
      'Architecting and monitoring multi-source data ingestion pipelines that clean, transform, and load enterprise operational datasets into Amazon Redshift.',
      'Automating repetitive manual processes and operational tasks performed regularly by team members to minimize toil and reduce turnaround time.',
      'Researching and exploring AI agentic workflows to automate operational data validation and intelligent incident diagnostics.'
    ],
    impactMetrics: [
      { stat: 'Multi-Source', label: 'Ingestion to Redshift' },
      { stat: 'ETL', label: 'Automated Pipelines' },
      { stat: 'Zero-Toil', label: 'Process Automation Focus' }
    ],
    technologies: ['Python', 'ETL Pipelines', 'Amazon Redshift', 'SQL', 'Automation Scripts', 'Data Warehousing'],
    architectureFocus: 'Data Ingestion → Transformation → Redshift Warehouse → Downstream Analytics & Automation'
  },
  {
    id: 'innefu',
    company: 'Innefu Labs',
    role: 'Software Engineer',
    period: '12/2025 – 01/2026',
    current: false,
    location: 'New Delhi, India',
    overview:
      'Developed high-throughput Python/Django backend APIs, engineered real-time synchronization pipelines between Neo4j graph databases and Elasticsearch, and optimized search query latencies.',
    themes: ['Backend APIs', 'Neo4j ↔ Elasticsearch Sync', 'Intelligent Search', 'Query Optimization'],
    keyContributions: [
      'Engineered bi-directional data synchronization mechanisms ensuring real-time consistency between Neo4j graph nodes and Elasticsearch index documents.',
      'Formulated specialized search endpoints enabling sub-100ms multi-attribute entity discovery across dense knowledge datasets.',
      'Profiled and refactored bottlenecked backend queries, lowering database CPU load and memory consumption.'
    ],
    impactMetrics: [
      { stat: '<100ms', label: 'Search Latency' },
      { stat: 'Dual-DB', label: 'Graph ↔ Search Sync' },
      { stat: 'Python/Django', label: 'Robust REST APIs' }
    ],
    technologies: ['Python', 'Django', 'Neo4j', 'Elasticsearch', 'REST APIs', 'Data Sync Pipelines'],
    architectureFocus: 'Django REST API ↔ Neo4j Graph DB ↔ Sync Engine ↔ Elasticsearch Search Index'
  },
  {
    id: 'xaigi',
    company: 'Xaigi Technology',
    role: 'Backend Developer',
    period: '04/2024 – 12/2025',
    current: false,
    location: 'India',
    overview:
      'Spearheaded core backend architectures, multi-tenant RBAC security models, complex Neo4j graph query optimizations, Celery asynchronous processing, and AWS OpenSearch integrations.',
    themes: [
      'Multi-Tenant RBAC',
      'Neo4j Optimization',
      'AWS OpenSearch',
      'Celery & Async Workflows',
      'Apache Superset',
      'RAG & Knowledge Graphs'
    ],
    keyContributions: [
      'Architected a multi-tenant Role-Based Access Control (RBAC) engine that securely isolates organization tenants while sharing platform infrastructure.',
      'Optimized 35+ complex Cypher graph queries across deep relationship trees in Neo4j, yielding an average ~40% execution speed improvement.',
      'Built decoupled asynchronous task queues using Celery and Django Signals to offload heavy reporting, email triggers, and data processing from the critical request path.',
      'Integrated AWS OpenSearch with Apache Superset dashboards for high-cardinality interactive analytics powering 500+ active users.',
      'Contributed to GenAI / RAG pipeline exploration utilizing LangChain and contextual knowledge graphs for intelligent data retrieval.'
    ],
    impactMetrics: [
      { stat: '35+', label: 'Graph Queries Optimized' },
      { stat: '~40%', label: 'Faster Query Execution' },
      { stat: '500+', label: 'Active Platform Users' },
      { stat: '<100ms', label: 'Search Response Time' }
    ],
    technologies: [
      'Python',
      'Django REST Framework',
      'Neo4j (Cypher)',
      'AWS OpenSearch',
      'Celery & Redis',
      'Apache Superset',
      'LangChain / RAG',
      'PostgreSQL'
    ],
    architectureFocus: 'Tenant Gateway → RBAC Policy Enforcement → Django Business Layer → Neo4j + OpenSearch + Celery Workers'
  },
  {
    id: 'terralink',
    company: 'Terra-link Global',
    role: 'Software Developer Intern',
    period: '05/2023 – 07/2023',
    current: false,
    location: 'India',
    overview:
      'Developed enterprise SAP UI5/Fiori interfaces and performed query optimization on SAP HANA database datasets.',
    themes: ['SAP UI5/Fiori', 'SAP HANA Optimization', 'Enterprise UI', 'Dataset Tuning'],
    keyContributions: [
      'Engineered and delivered 5+ responsive enterprise UI5/Fiori interfaces, contributing to a 15% reduction in production UI defects.',
      'Analyzed and optimized database queries across 10+ large enterprise datasets on SAP HANA, achieving a 25% query performance boost.'
    ],
    impactMetrics: [
      { stat: '25%', label: 'HANA Query Speedup' },
      { stat: '15%', label: 'Defect Reduction' },
      { stat: '5+', label: 'Enterprise Interfaces' }
    ],
    technologies: ['SAP UI5 / Fiori', 'SAP HANA', 'JavaScript', 'SQL', 'Enterprise Systems'],
    architectureFocus: 'Fiori Frontend Client → OData Gateway → SAP HANA Columnar Database'
  }
];
