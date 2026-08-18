import React, { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { Server, Database, Cpu, Cloud, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

interface SkillCluster {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; note: string }[];
}

const clusters: SkillCluster[] = [
  {
    id: 'backend',
    name: 'BACKEND',
    tagline: 'Runtime environments, API frameworks, and task queues',
    icon: <Server className="w-4 h-4 text-[#FF7A18]" />,
    skills: [
      { name: 'Python', level: 'Primary', note: 'Primary backend language for enterprise APIs and data scripting' },
      { name: 'Django / Django REST Framework', level: 'Production', note: 'Serialization, viewsets, authentication, and ORM' },
      { name: 'FastAPI', level: 'Familiar', note: 'High-throughput async endpoints & OpenAPI specs' },
      { name: 'Celery & Redis', level: 'Production', note: 'Asynchronous task workers and queue management' },
      { name: 'Node.js', level: 'Familiar', note: 'REST APIs and JavaScript runtime tooling' }
    ]
  },
  {
    id: 'databases',
    name: 'DATABASES',
    tagline: 'Relational, graph, cache, search, and warehousing',
    icon: <Database className="w-4 h-4 text-[#7C9CFF]" />,
    skills: [
      { name: 'Neo4j (Cypher)', level: 'Specialized', note: 'Graph modeling & 35+ query optimizations with ~40% latency reduction' },
      { name: 'PostgreSQL / MySQL', level: 'Production', note: 'Relational schema design, indexes, and transactions' },
      { name: 'Amazon Redshift', level: 'Production', note: 'Data warehousing & analytical query ingestion' },
      { name: 'Redis', level: 'Production', note: 'In-memory caching, pub/sub, and sub-millisecond retrieval' },
      { name: 'Elasticsearch / OpenSearch', level: 'Production', note: 'Sub-100ms multi-attribute search index synchronization' }
    ]
  },
  {
    id: 'systems',
    name: 'SYSTEMS',
    tagline: 'Architecture, isolation boundaries, and protocols',
    icon: <Cpu className="w-4 h-4 text-[#F5F5F2]" />,
    skills: [
      { name: 'Multi-Tenant RBAC', level: 'Specialized', note: 'Tenant isolation and granular role-based policy enforcement' },
      { name: 'RESTful API Architecture', level: 'Production', note: 'Predictable interfaces, idempotency, and versioning' },
      { name: 'Data Synchronization', level: 'Production', note: 'Dual-database consistency between Graph and Search engines' },
      { name: 'JWT & Stateless Auth', level: 'Production', note: 'Secure token authentication and session lifetimes' }
    ]
  },
  {
    id: 'cloud',
    name: 'CLOUD & DEVOPS',
    tagline: 'Compute, containerization, and delivery pipelines',
    icon: <Cloud className="w-4 h-4 text-[#9A9FA8]" />,
    skills: [
      { name: 'AWS (EC2, S3, IAM, Redshift)', level: 'Proficient', note: 'Cloud infrastructure, data storage, and IAM policies' },
      { name: 'Docker', level: 'Proficient', note: 'Containerization and multi-stage container builds' },
      { name: 'Git & CI/CD', level: 'Proficient', note: 'Version control, branch workflows, and automated testing' }
    ]
  },
  {
    id: 'data',
    name: 'DATA & AUTOMATION',
    tagline: 'Pipelines, ETL transformations, and operational tooling',
    icon: <Layers className="w-4 h-4 text-[#FF7A18]" />,
    skills: [
      { name: 'ETL Pipelines', level: 'Production', note: 'Data extraction, cleaning, transformation, and ingestion' },
      { name: 'Process Automation', level: 'Production', note: 'Python scripts eliminating manual team toil' },
      { name: 'Apache Superset', level: 'Proficient', note: 'Interactive analytical reporting dashboards' }
    ]
  },
  {
    id: 'ai',
    name: 'AI EXPLORATION',
    tagline: 'Contextual retrieval and agentic workflows',
    icon: <Sparkles className="w-4 h-4 text-[#7C9CFF]" />,
    skills: [
      { name: 'RAG & Knowledge Graphs', level: 'Exploration', note: 'Contextual retrieval combining LangChain with Graph DBs' },
      { name: 'AI / Agentic Workflows', level: 'Exploration', note: 'Automating operational data validation & diagnostics' }
    ]
  }
];

const customEase = [0.22, 1, 0.36, 1] as const;

export const SkillsMatrix: React.FC = () => {
  const [activeClusterId, setActiveClusterId] = useState<string>('backend');
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px', once: false });

  const currentCluster = clusters.find((c) => c.id === activeClusterId) || clusters[0];

  return (
    <CinematicSection
      id="skills"
      chapterNumber="06"
      chapterLabel="CONSTELLATION"
      motionType="constellation"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">06</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">SKILLS CONSTELLATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Technical competencies.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            Categorized by domain rather than endless logos. Select a cluster to inspect proven capabilities.
          </p>
        </motion.div>

        {/* Constellation Category Buttons Grid with Stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {clusters.map((cluster, idx) => {
            const isSelected = activeClusterId === cluster.id;
            return (
              <motion.button
                key={cluster.id}
                onClick={() => setActiveClusterId(cluster.id)}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.5, ease: customEase, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-[#171B20] border-[#FF7A18]/60 shadow-lg shadow-[#FF7A18]/5 scale-102'
                    : 'bg-[#111418] border-white/6 hover:border-white/15 text-[#9A9FA8]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono text-[#666C75]">
                    0{clusters.indexOf(cluster) + 1}
                  </span>
                  <div className={isSelected ? 'text-[#FF7A18]' : 'text-[#9A9FA8]'}>
                    {cluster.icon}
                  </div>
                </div>

                <div className="pt-2">
                  <span className={`font-mono text-xs font-bold block ${isSelected ? 'text-[#F5F5F2]' : 'text-[#9A9FA8]'}`}>
                    {cluster.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Cluster Details Box with focus transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCluster.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111418] border border-white/8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                  // Active Cluster
                </span>
                <h3 className="text-xl font-bold text-[#F5F5F2] tracking-tight">
                  {currentCluster.name}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#9A9FA8]">
                {currentCluster.tagline}
              </p>
            </div>

            <div className="space-y-3">
              {currentCluster.skills.map((skill, sIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                  className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF7A18] font-bold text-xs">›</span>
                      <span className="font-mono text-sm font-bold text-[#F5F5F2]">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#9A9FA8] pl-3.5 leading-snug">
                      {skill.note}
                    </p>
                  </div>

                  <span className="self-start sm:self-center px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-[#9A9FA8] shrink-0">
                    {skill.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </CinematicSection>
  );
};
