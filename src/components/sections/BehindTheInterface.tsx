import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Globe, Shield, Server, Database, Layers, Sparkles, Cpu } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

interface ArchitectureLayer {
  id: string;
  step: string;
  name: string;
  shortTag: string;
  headline: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'ui',
    step: '01',
    name: 'UI',
    shortTag: 'USER INTENT',
    headline: 'Where user actions begin.',
    description: 'Clean interactive client surfaces dispatch structured HTTP requests, handle optimistic updates, and provide clear user feedback.',
    tech: ['React.js', 'State Management', 'Client Contracts'],
    icon: <Globe className="w-5 h-5 text-[#C3CBD3]" />
  },
  {
    id: 'api',
    step: '02',
    name: 'API',
    shortTag: 'GATEWAY & AUTH',
    headline: 'Routing, rate limiting, and multi-tenant security.',
    description: 'Stateless JWT verification, request validation, organization scoping, and API versioning before requests reach domain logic.',
    tech: ['Django REST Framework', 'JWT Auth', 'Rate Limiting'],
    icon: <Shield className="w-5 h-5 text-[#FF6B53]" />
  },
  {
    id: 'service',
    step: '03',
    name: 'SERVICE',
    shortTag: 'BUSINESS LOGIC',
    headline: 'Domain rules and atomic state transitions.',
    description: 'Decoupled services executing business rules, role-based access checks, event triggers, and database transactions.',
    tech: ['Python', 'Django Services', 'Django Signals'],
    icon: <Server className="w-5 h-5 text-[#FFFFFF]" />
  },
  {
    id: 'database',
    step: '04',
    name: 'DATABASE',
    shortTag: 'GRAPH & RELATIONAL',
    headline: 'Where performance and schema modeling live.',
    description: 'Neo4j graph traversals for complex relationships, MySQL/PostgreSQL for relational integrity, and Redis for in-memory caching.',
    tech: ['Neo4j Cypher (35+ queries)', 'MySQL / PostgreSQL', 'Redis'],
    icon: <Database className="w-5 h-5 text-[#FF6B53]" />
  },
  {
    id: 'data',
    step: '05',
    name: 'DATA',
    shortTag: 'ANALYTICS & SEARCH',
    headline: 'Sub-100ms discovery and data warehousing.',
    description: 'Elasticsearch/OpenSearch indices for typo-tolerant search, Apache Superset for visual reporting, and Redshift for analytical storage.',
    tech: ['Elasticsearch', 'Apache Superset', 'Redshift ETL'],
    icon: <Layers className="w-5 h-5 text-[#E25B45]" />
  },
  {
    id: 'ai',
    step: '06',
    name: 'AI',
    shortTag: 'INTELLIGENCE & RAG',
    headline: 'Contextual retrieval and NL-to-SQL workflows.',
    description: 'Collaborating with GenAI and Data Science teams to ground LLMs on enterprise schemas, RAG knowledge graphs, and query planners.',
    tech: ['RAG', 'LangChain', 'Knowledge Graphs'],
    icon: <Sparkles className="w-5 h-5 text-[#FF6B53]" />
  },
  {
    id: 'automation',
    step: '07',
    name: 'AUTOMATION',
    shortTag: 'WORKERS & PIPELINES',
    headline: 'Decoupled queues and operational efficiency.',
    description: 'Celery background workers, automated ETL transformations, and event-driven worker pipelines eliminating manual toil.',
    tech: ['Celery Queues', 'Redis Pub/Sub', 'Automated ETL'],
    icon: <Cpu className="w-5 h-5 text-[#C3CBD3]" />
  }
];

export const BehindTheInterface: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(3); // Database active by default
  const shouldReduceMotion = useReducedMotion();

  const activeLayer = architectureLayers[selectedLayerIndex];

  return (
    <CinematicSection
      id="behind-the-interface"
      chapterNumber="02"
      chapterLabel="ARCHITECTURE"
      motionType="architecture"
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: LARGE EDITORIAL STATEMENT */}
        {/* ========================================================================= */}
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">02</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">BEHIND THE INTERFACE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
            What happens behind<br />
            the interface<span className="text-[#FF6B53]">?</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#C3CBD3] leading-relaxed">
            The real engineering lives beneath the button click—across APIs, graph traversals, data pipelines, and automated execution.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* EDITORIAL UNFOLDING ARCHITECTURE FLOW */}
        {/* UI ↓ API ↓ SERVICE ↓ DATABASE ↓ DATA ↓ AI ↓ AUTOMATION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          
          {/* Left Column: Horizontal / Vertical Flow Pathway */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono text-[#7E8994] uppercase tracking-wider pb-2 flex items-center justify-between border-b border-white/8">
              <span>// Architecture Chain</span>
              <span className="text-[10px] text-[#FF6B53]">Select layer</span>
            </div>

            <div className="space-y-1.5 pt-2">
              {architectureLayers.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl text-left transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#151E27] border border-[#FF6B53]/60 shadow-lg shadow-[#FF6B53]/5'
                        : 'bg-[#151E27]/30 hover:bg-[#151E27]/60 border border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                        {layer.step}
                      </span>
                      <span className={`font-mono text-sm font-bold tracking-wider ${isSelected ? 'text-[#FFFFFF]' : 'text-[#C3CBD3]'}`}>
                        {layer.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#7E8994] hidden sm:inline">
                        {layer.shortTag}
                      </span>
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#FF6B53]/15 text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                        {layer.icon}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Layer Deep Architectural Inspector */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151E27] border border-white/8 space-y-6 relative overflow-hidden">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#7E8994]">
                  <span className="text-[#FF6B53] font-bold">LAYER {activeLayer.step}</span>
                  <span>//</span>
                  <span className="text-[#FFFFFF]">{activeLayer.name}</span>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-[#C3CBD3]">
                  {activeLayer.shortTag}
                </div>
              </div>

              {/* Layer Main Statement */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
                  {activeLayer.headline}
                </h3>
                <p className="text-base text-[#C3CBD3] leading-relaxed">
                  {activeLayer.description}
                </p>
              </div>

              {/* Technologies in this Layer */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-[#7E8994] uppercase tracking-wider block">
                  Core Technologies & Concepts:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeLayer.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2630] border border-[#E25B45]/20 text-xs font-mono text-[#FFFFFF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sequential Architectural Pipeline Indicator */}
              <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 flex items-center justify-between text-xs font-mono text-[#7E8994] overflow-x-auto">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[#FF6B53]">REQUEST</span>
                  <span>→</span>
                  <span className="text-[#FFFFFF] font-bold">{activeLayer.name}</span>
                  <span>→</span>
                  <span className="text-emerald-400">EXECUTE</span>
                </div>
                <span className="text-[10px] text-[#7E8994] shrink-0 pl-4">
                  Step {activeLayer.step} of 07
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </CinematicSection>
  );
};
