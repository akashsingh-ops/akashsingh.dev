import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Code2,
  Server,
  Globe,
  Database,
  Cloud,
  Shield,
  Sparkles,
  Wrench,
  Search,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Layers,
  Zap,
  Lock,
  GitBranch,
  Play
} from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';
import { ProjectId } from '../projects/ProjectsSection';

interface SkillsMatrixProps {
  onOpenProject?: (projectId: ProjectId) => void;
}

export type CategoryId =
  | 'languages'
  | 'backend'
  | 'frontend'
  | 'data'
  | 'cloud'
  | 'systems'
  | 'ai'
  | 'tools';

interface CategoryMeta {
  id: CategoryId;
  number: string;
  name: string;
  shortDesc: string;
  preview: string;
  icon: React.ReactNode;
}

const categories: CategoryMeta[] = [
  {
    id: 'languages',
    number: '01',
    name: 'LANGUAGES',
    shortDesc: 'Programming foundations',
    preview: 'Python · JavaScript · Java · C · C++',
    icon: <Code2 className="w-4 h-4" />
  },
  {
    id: 'backend',
    number: '02',
    name: 'BACKEND',
    shortDesc: 'APIs & application systems',
    preview: 'Python · Django · DRF · FastAPI · Celery · Redis',
    icon: <Server className="w-4 h-4" />
  },
  {
    id: 'frontend',
    number: '03',
    name: 'FRONTEND',
    shortDesc: 'Interfaces & interaction',
    preview: 'React.js · JavaScript · HTML/CSS · Tailwind CSS',
    icon: <Globe className="w-4 h-4" />
  },
  {
    id: 'data',
    number: '04',
    name: 'DATA & DATABASES',
    shortDesc: 'Databases, search & analytics',
    preview: 'Neo4j · Cypher · MySQL · Redis · Elasticsearch · Redshift · ETL',
    icon: <Database className="w-4 h-4" />
  },
  {
    id: 'cloud',
    number: '05',
    name: 'CLOUD & DEVOPS',
    shortDesc: 'Infrastructure & delivery',
    preview: 'AWS (EC2, S3, Lambda, IAM) · Docker · CI/CD',
    icon: <Cloud className="w-4 h-4" />
  },
  {
    id: 'systems',
    number: '06',
    name: 'SYSTEMS & SECURITY',
    shortDesc: 'Architecture & access control',
    preview: 'RBAC · Multi-Tenancy · API Security · Optimization',
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: 'ai',
    number: '07',
    name: 'AI & ANALYTICS',
    shortDesc: 'Intelligence & data exploration',
    preview: 'RAG · LangChain · LangGraph · NL→SQL · Superset',
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: 'tools',
    number: '08',
    name: 'ENGINEERING TOOLS',
    shortDesc: 'Workflow & developer tooling',
    preview: 'Git · GitHub · Bitbucket · Jira · Postman · Codium',
    icon: <Wrench className="w-4 h-4" />
  }
];

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>('backend');
  const [hoveredCategory, setHoveredCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive sub-feature tabs inside detail panels
  const [activeDataFeature, setActiveDataFeature] = useState<'neo4j' | 'elastic' | 'redshift'>('neo4j');
  const [activeSystemLayer, setActiveSystemLayer] = useState<string>('CACHE');
  const [activeSystemFeature, setActiveSystemFeature] = useState<'pipeline' | 'rbac' | 'multitenancy'>('pipeline');
  const [simulatedFuzzy, setSimulatedFuzzy] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const handleNavigateProject = (projId: ProjectId) => {
    if (onOpenProject) {
      onOpenProject(projId);
    } else {
      const workElem = document.getElementById('work');
      if (workElem) {
        workElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const activeMeta = categories.find((c) => c.id === selectedCategory) || categories[1];

  // Search filtering logic
  const isMatchingSearch = (catId: CategoryId) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const cat = categories.find(c => c.id === catId);
    if (!cat) return false;
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.preview.toLowerCase().includes(q) ||
      cat.shortDesc.toLowerCase().includes(q)
    );
  };

  return (
    <CinematicSection
      id="skills"
      chapterNumber="06"
      chapterLabel="TECHNICAL CAPABILITIES"
      motionType="skills"
      className="py-24 sm:py-36 relative overflow-hidden"
    >
      {/* Ambient background soft spotlight */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FF6B53]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/8">
          <motion.div
            className="space-y-4 max-w-2xl"
            variants={shouldReduceMotion ? undefined : childItemVariant}
          >
            <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
              <span className="text-[#FF6B53] font-bold">06</span>
              <span className="text-white/20">/</span>
              <span className="uppercase tracking-widest">TECHNICAL CAPABILITIES</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
              THE ENGINEERING STACK<span className="text-[#FF6B53]">.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#C3CBD3] leading-relaxed">
              The tools, systems, and technologies I use to turn ideas into working software.
            </p>
          </motion.div>

          {/* Quick Search Filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E8994]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. Neo4j, Django, RBAC)..."
              className="w-full bg-[#151E27] border border-white/10 focus:border-[#FF6B53] focus:outline-none rounded-xl pl-9.5 pr-4 py-2.5 text-xs font-mono text-[#FFFFFF] placeholder-[#7E8994] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7E8994] hover:text-[#FFFFFF]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP STACK MAP & INTERACTIVE DETAIL VIEW */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: CONSTELLATION MAP (~45%) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#7E8994] pb-2 border-b border-white/6">
              <span className="uppercase tracking-widest text-[#FF6B53] font-bold">// Engineering Map</span>
              <span>Select domain to inspect</span>
            </div>

            {/* Central hub representation with connecting nodes */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#151E27] border border-white/8 overflow-hidden space-y-6">
              
              {/* Hub Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#C3CBD3]">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B53]" />
                  <span className="font-bold text-[#FFFFFF]">AKASH SINGH</span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#7E8994]">CORE STACK</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#7E8994]">
                  8 DOMAINS
                </span>
              </div>

              {/* 8 Interactive Category Nodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const isHovered = hoveredCategory === cat.id;
                  const matches = isMatchingSearch(cat.id);

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 relative group border ${
                        isSelected
                          ? 'bg-[#0F161E] border-[#FF6B53] shadow-lg shadow-[#FF6B53]/5 -translate-y-0.5'
                          : matches
                          ? 'bg-[#0F161E]/50 hover:bg-[#0F161E] border-white/5 hover:border-white/20'
                          : 'bg-[#0F161E]/20 border-white/5 opacity-30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-mono text-[11px] font-bold ${isSelected ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                          {cat.number}
                        </span>
                        <div className={`p-1 rounded-md ${isSelected ? 'text-[#FF6B53]' : 'text-[#7E8994] group-hover:text-[#FFFFFF]'}`}>
                          {cat.icon}
                        </div>
                      </div>

                      <h4 className={`font-bold text-xs tracking-tight ${isSelected ? 'text-[#FFFFFF]' : 'text-[#C3CBD3] group-hover:text-[#FFFFFF]'}`}>
                        {cat.name}
                      </h4>

                      <p className="text-[11px] text-[#7E8994] line-clamp-1 mt-0.5">
                        {cat.shortDesc}
                      </p>

                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#FF6B53]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hover / Active Fast Preview Strip */}
              <div className="pt-3 border-t border-white/6 font-mono text-[11px] text-[#7E8994] flex items-center justify-between min-h-[32px]">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[#FF6B53] font-bold">›</span>
                  <span className="text-[#C3CBD3] truncate">
                    {hoveredCategory
                      ? categories.find(c => c.id === hoveredCategory)?.preview
                      : activeMeta.preview}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: DEEP CLUSTER DETAIL PANEL (~55%) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory || 'default'}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 rounded-3xl bg-[#151E27] border border-white/8 space-y-6 relative overflow-hidden"
              >
                {/* Top Domain Title & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] font-bold">
                      <span>{activeMeta.number}</span>
                      <span>/</span>
                      <span>{activeMeta.name}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                      {activeMeta.shortDesc}
                    </h3>
                  </div>

                  <div className="p-2 rounded-xl bg-[#0F161E] border border-white/8 text-[#FF6B53]">
                    {activeMeta.icon}
                  </div>
                </div>

                {/* ================================================================= */}
                {/* CATEGORY 01: LANGUAGES */}
                {/* ================================================================= */}
                {selectedCategory === 'languages' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-[#0F161E] border border-[#FF6B53]/40 space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FF6B53] text-[#0F161E]">
                            PRIMARY
                          </span>
                          <h4 className="text-lg font-bold text-[#FFFFFF]">Python</h4>
                        </div>
                        <span className="text-xs font-mono text-[#FF6B53]">Backend + data scripting</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#C3CBD3] leading-relaxed">
                        Core language utilized for enterprise APIs, data scraping, ETL pipelines, Neo4j graph traversals, and automated process scripts.
                      </p>
                      <div className="pt-2 border-t border-white/6 flex items-center gap-2 text-[11px] font-mono text-[#7E8994]">
                        <span className="text-[#FF6B53]">PROVEN THROUGH:</span>
                        <span className="text-[#FFFFFF]">OceanMotion · Mimasa AI · Dell Technologies</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1.5">
                        <div className="text-sm font-bold text-[#FFFFFF]">JavaScript</div>
                        <p className="text-xs text-[#7E8994]">Frontend logic & asynchronous web runtimes</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1.5">
                        <div className="text-sm font-bold text-[#FFFFFF]">Java</div>
                        <p className="text-xs text-[#7E8994]">Object-oriented programming & concurrency foundations</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1.5">
                        <div className="text-sm font-bold text-[#FFFFFF]">C</div>
                        <p className="text-xs text-[#7E8994]">Low-level memory management & system fundamentals</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1.5">
                        <div className="text-sm font-bold text-[#FFFFFF]">C++</div>
                        <p className="text-xs text-[#7E8994]">High-performance algorithms & data structures</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 02: BACKEND */}
                {/* ================================================================= */}
                {selectedCategory === 'backend' && (
                  <div className="space-y-6">
                    {/* Capability Strip */}
                    <div className="flex flex-wrap gap-2 pb-2">
                      {['REST APIs', 'Business Logic', 'Authentication', 'Async Processing'].map((cap) => (
                        <span key={cap} className="px-3 py-1 rounded-lg bg-[#0F161E] border border-[#E25B45]/30 text-xs font-mono text-[#FFFFFF]">
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Organized Groups: CORE / FRAMEWORKS / ASYNC */}
                    <div className="space-y-4">
                      {/* CORE */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#7E8994] uppercase tracking-wider block">
                          // 01. Core Backend
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 flex items-center justify-between">
                          <span className="font-bold text-sm text-[#FFFFFF]">Python</span>
                          <span className="text-xs font-mono text-[#C3CBD3]">Backend + data scripting</span>
                        </div>
                      </div>

                      {/* FRAMEWORKS */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#7E8994] uppercase tracking-wider block">
                          // 02. Frameworks & APIs
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">Django</span>
                            <p className="text-[11px] text-[#7E8994]">Enterprise backend development</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">Django REST Framework</span>
                            <p className="text-[11px] text-[#7E8994]">REST API development</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">FastAPI</span>
                            <p className="text-[11px] text-[#7E8994]">High-throughput async endpoints</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">Node.js</span>
                            <p className="text-[11px] text-[#7E8994]">Runtime tooling & services</p>
                          </div>
                        </div>
                      </div>

                      {/* ASYNC & QUEUES */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#7E8994] uppercase tracking-wider block">
                          // 03. Asynchronous Execution
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">Celery</span>
                            <p className="text-[11px] text-[#7E8994]">Async task processing & workers</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                            <span className="font-bold text-xs text-[#FFFFFF]">Redis</span>
                            <p className="text-[11px] text-[#7E8994]">Caching + task queues</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Proof footer & CTA */}
                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-[#FF6B53] font-bold block">PROVEN THROUGH WORK:</span>
                        <span className="text-[#C3CBD3]">OceanMotion (70+ APIs) · Mimasa AI · Dell</span>
                      </div>
                      <button
                        onClick={() => handleNavigateProject('oceanmotion')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B53] hover:bg-[#FF7A63] text-[#0F161E] font-bold text-xs transition-all"
                      >
                        <span>View Related Work</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 03: FRONTEND */}
                {/* ================================================================= */}
                {selectedCategory === 'frontend' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-[#C3CBD3] leading-relaxed">
                      Frontend engineering focus is centered on clean interfaces, state flows, component modularity, and crisp contracts with backend APIs.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                        <span className="font-bold text-sm text-[#FFFFFF]">React.js</span>
                        <p className="text-xs text-[#7E8994]">Component-based UI architecture</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                        <span className="font-bold text-sm text-[#FFFFFF]">JavaScript</span>
                        <p className="text-xs text-[#7E8994]">Frontend logic & state flows</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                        <span className="font-bold text-sm text-[#FFFFFF]">HTML / CSS</span>
                        <p className="text-xs text-[#7E8994]">Web semantic structure & styling</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                        <span className="font-bold text-sm text-[#FFFFFF]">Tailwind CSS</span>
                        <p className="text-xs text-[#7E8994]">Utility-first design styling</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1 sm:col-span-2">
                        <span className="font-bold text-sm text-[#FFFFFF]">Bootstrap</span>
                        <p className="text-xs text-[#7E8994]">Responsive UI framework</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-[#FF6B53] font-bold block">USED IN PRODUCTION:</span>
                        <span className="text-[#C3CBD3]">Mimasa AI · Geek-Search · EazEae</span>
                      </div>
                      <button
                        onClick={() => handleNavigateProject('geek-search')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151E27] hover:bg-[#1B2630] border border-[#FF6B53]/40 text-[#FF6B53] font-bold text-xs transition-all"
                      >
                        <span>View Related Work</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 04: DATA & DATABASES (MAJOR STRONG CATEGORY) */}
                {/* ================================================================= */}
                {selectedCategory === 'data' && (
                  <div className="space-y-6">
                    {/* Interactive Proof Tabs */}
                    <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0F161E] border border-white/6 overflow-x-auto">
                      <button
                        onClick={() => setActiveDataFeature('neo4j')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                          activeDataFeature === 'neo4j'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3] hover:text-[#FFFFFF]'
                        }`}
                      >
                        Neo4j & Cypher
                      </button>
                      <button
                        onClick={() => setActiveDataFeature('elastic')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                          activeDataFeature === 'elastic'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3] hover:text-[#FFFFFF]'
                        }`}
                      >
                        Elasticsearch
                      </button>
                      <button
                        onClick={() => setActiveDataFeature('redshift')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                          activeDataFeature === 'redshift'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3] hover:text-[#FFFFFF]'
                        }`}
                      >
                        Redshift & ETL
                      </button>
                    </div>

                    {/* Active Interactive Sub-Feature Visualization */}
                    {activeDataFeature === 'neo4j' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-[#FF6B53]/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#FF6B53]">
                            // NEO4J GRAPH DATA MODELING
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-400">
                            30–40% Speedup
                          </span>
                        </div>

                        {/* Animated Graph Flow */}
                        <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 flex items-center justify-between text-center font-mono text-[11px] overflow-x-auto gap-2">
                          <span className="px-2.5 py-1 rounded bg-[#0F161E] text-[#FFFFFF] font-bold">USER</span>
                          <span className="text-[#FF6B53]">↓</span>
                          <span className="px-2.5 py-1 rounded bg-[#0F161E] text-[#FFFFFF] font-bold">GROUP</span>
                          <span className="text-[#FF6B53]">↓</span>
                          <span className="px-2.5 py-1 rounded bg-[#0F161E] text-[#FFFFFF] font-bold">DATASET</span>
                          <span className="text-[#FF6B53]">↓</span>
                          <span className="px-2.5 py-1 rounded bg-[#0F161E] text-[#FFFFFF] font-bold">CHART</span>
                          <span className="text-[#FF6B53]">↓</span>
                          <span className="px-2.5 py-1 rounded bg-[#0F161E] text-[#FFFFFF] font-bold">DASHBOARD</span>
                        </div>

                        <div className="space-y-2 text-xs font-mono text-[#C3CBD3]">
                          <div className="text-[#FFFFFF] font-bold">PROVEN THROUGH: OceanMotion</div>
                          <p className="text-[#7E8994]">
                            Refactored 35+ Cypher query execution plans, replaced unbounded traversals with anchored node index lookups.
                          </p>
                        </div>

                        <button
                          onClick={() => handleNavigateProject('oceanmotion')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6B53] text-[#0F161E] font-bold text-xs"
                        >
                          <span>Explore OceanMotion Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {activeDataFeature === 'elastic' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-[#FF6B53]/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#FF6B53]">
                            // ELASTICSEARCH SUB-100MS SEARCH
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-400">
                            &lt;100ms Latency
                          </span>
                        </div>

                        {/* Search Simulation */}
                        <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#7E8994]">Simulated User Input:</span>
                            <span className="text-[#FF6B53] font-bold">"sales dashbord"</span>
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                            <span>Typo Correction Engine:</span>
                            <span>→ "sales dashboard" (Sub-100ms)</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {['Full-text', 'Fuzzy', 'Autocomplete', 'Prefix', 'Typo correction'].map((f) => (
                            <span key={f} className="px-2.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#C3CBD3]">
                              {f}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-1 text-xs font-mono">
                          <div className="text-[#FFFFFF] font-bold">PROVEN THROUGH: Mimasa AI</div>
                          <p className="text-[#7E8994]">Synchronized multi-tenant graph nodes into Elasticsearch index shards.</p>
                        </div>

                        <button
                          onClick={() => handleNavigateProject('mimasa-ai')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6B53] text-[#0F161E] font-bold text-xs"
                        >
                          <span>Explore Mimasa AI</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {activeDataFeature === 'redshift' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-[#FF6B53]/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#FF6B53]">
                            // REDSHIFT DATA WAREHOUSE & ETL
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FFFFFF]">
                            Dell Technologies
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 flex items-center justify-between text-center font-mono text-[10px] sm:text-[11px] gap-1 overflow-x-auto">
                          <span className="p-1.5 rounded bg-[#0F161E] text-[#C3CBD3]">SOURCES</span>
                          <span>→</span>
                          <span className="p-1.5 rounded bg-[#0F161E] text-[#C3CBD3]">INGEST</span>
                          <span>→</span>
                          <span className="p-1.5 rounded bg-[#0F161E] text-[#C3CBD3]">TRANSFORM</span>
                          <span>→</span>
                          <span className="p-1.5 rounded bg-[#0F161E] text-[#FF6B53] font-bold">REDSHIFT</span>
                          <span>→</span>
                          <span className="p-1.5 rounded bg-[#0F161E] text-emerald-400 font-bold">ANALYTICS</span>
                        </div>

                        <p className="text-xs font-mono text-[#7E8994]">
                          Engineered data transformation scripts feeding analytical warehousing and eliminating repetitive manual reporting.
                        </p>
                      </div>
                    )}

                    {/* Compact Inventory List */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">MySQL</div>
                        <div className="text-[10px] text-[#7E8994]">Relational schemas</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">MongoDB</div>
                        <div className="text-[10px] text-[#7E8994]">Document database</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">Redis</div>
                        <div className="text-[10px] text-[#7E8994]">Cache & Queue</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">Apache Superset</div>
                        <div className="text-[10px] text-[#7E8994]">Visual reporting</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">ETL</div>
                        <div className="text-[10px] text-[#7E8994]">Data pipelines</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                        <div className="text-xs font-bold text-[#FFFFFF]">Cypher</div>
                        <div className="text-[10px] text-[#7E8994]">Graph query language</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 05: CLOUD & DEVOPS */}
                {/* ================================================================= */}
                {selectedCategory === 'cloud' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 flex items-center justify-between text-center font-mono text-[11px]">
                      <span className="p-2 rounded bg-[#151E27] text-[#FFFFFF]">CODE</span>
                      <span className="text-[#FF6B53]">→</span>
                      <span className="p-2 rounded bg-[#151E27] text-[#FFFFFF]">CONTAINER</span>
                      <span className="text-[#FF6B53]">→</span>
                      <span className="p-2 rounded bg-[#151E27] text-[#FFFFFF]">CLOUD</span>
                      <span className="text-[#FF6B53]">→</span>
                      <span className="p-2 rounded bg-[#151E27] text-emerald-400 font-bold">DEPLOY</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#FFFFFF]">AWS Cloud Infrastructure</span>
                          <span className="text-xs font-mono text-[#FF6B53]">EC2 · S3 · Lambda · IAM</span>
                        </div>
                        <p className="text-xs text-[#7E8994]">
                          Compute instance configuration, cloud object storage, serverless handlers, and fine-grained IAM policy scoping.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                          <span className="font-bold text-sm text-[#FFFFFF]">Docker</span>
                          <p className="text-xs text-[#7E8994]">Containerization & environment parity</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                          <span className="font-bold text-sm text-[#FFFFFF]">CI/CD</span>
                          <p className="text-xs text-[#7E8994]">Automated build, test, and release flows</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 text-xs font-mono text-[#7E8994] flex items-center justify-between">
                      <span>USED IN: Dell Technologies · Backend / Data workflows</span>
                      <span className="text-emerald-400 font-bold">Production</span>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 06: SYSTEMS & SECURITY */}
                {/* ================================================================= */}
                {selectedCategory === 'systems' && (
                  <div className="space-y-6">
                    {/* Sub tabs: Pipeline / RBAC / Multi-Tenancy */}
                    <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0F161E] border border-white/6">
                      <button
                        onClick={() => setActiveSystemFeature('pipeline')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                          activeSystemFeature === 'pipeline'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3]'
                        }`}
                      >
                        Architecture Flow
                      </button>
                      <button
                        onClick={() => setActiveSystemFeature('rbac')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                          activeSystemFeature === 'rbac'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3]'
                        }`}
                      >
                        RBAC Model
                      </button>
                      <button
                        onClick={() => setActiveSystemFeature('multitenancy')}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                          activeSystemFeature === 'multitenancy'
                            ? 'bg-[#FF6B53] text-[#0F161E]'
                            : 'text-[#C3CBD3]'
                        }`}
                      >
                        Multi-Tenancy
                      </button>
                    </div>

                    {activeSystemFeature === 'pipeline' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-white/6 space-y-4">
                        <span className="font-mono text-xs text-[#FF6B53] font-bold block">
                          // CLICKABLE ARCHITECTURE PIPELINE
                        </span>
                        
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 font-mono text-[10px] text-center">
                          {['CLIENT', 'API', 'SERVICE', 'DATABASE', 'CACHE', 'WORKER', 'DATA'].map((layer) => (
                            <button
                              key={layer}
                              onClick={() => setActiveSystemLayer(layer)}
                              className={`p-2 rounded-lg border transition-all ${
                                activeSystemLayer === layer
                                  ? 'bg-[#FF6B53] text-[#0F161E] font-bold border-[#FF6B53]'
                                  : 'bg-[#151E27] text-[#C3CBD3] border-white/5 hover:border-white/20'
                              }`}
                            >
                              {layer}
                            </button>
                          ))}
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 font-mono text-xs space-y-1">
                          <span className="text-[#FF6B53] font-bold">Layer Role ({activeSystemLayer}):</span>
                          <p className="text-[#C3CBD3]">
                            {activeSystemLayer === 'CLIENT' && 'Dispatches authenticated requests and receives predictable JSON contracts.'}
                            {activeSystemLayer === 'API' && 'Enforces JWT stateless token validation, rate-limiting, and routing.'}
                            {activeSystemLayer === 'SERVICE' && 'Pure domain business logic decoupled from transport and framework layer.'}
                            {activeSystemLayer === 'DATABASE' && 'Neo4j Cypher and relational MySQL query execution and ACID transactions.'}
                            {activeSystemLayer === 'CACHE' && 'Redis in-memory caching to avoid repeated expensive calculations.'}
                            {activeSystemLayer === 'WORKER' && 'Celery asynchronous workers offloading processing from critical request path.'}
                            {activeSystemLayer === 'DATA' && 'Amazon Redshift data warehousing and Elasticsearch full-text indices.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSystemFeature === 'rbac' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-white/6 space-y-3 font-mono text-xs">
                        <span className="text-[#FF6B53] font-bold block">// RBAC ACCESS CONTROL TREE</span>
                        <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 space-y-2">
                          <div className="flex items-center gap-2 text-[#FFFFFF]">
                            <span className="text-[#FF6B53]">USER</span>
                            <span>→</span>
                            <span className="text-[#FF6B53]">ROLE (Admin / Member)</span>
                            <span>→</span>
                            <span className="text-[#FF6B53]">RESOURCE (Dataset / Chart / Dashboard)</span>
                          </div>
                          <p className="text-[#7E8994] text-[11px]">
                            Eliminated recursive traversal loops and permission ambiguity in OceanMotion by enforcing explicit permission checks.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSystemFeature === 'multitenancy' && (
                      <div className="p-5 rounded-2xl bg-[#0F161E] border border-white/6 space-y-3 font-mono text-xs">
                        <span className="text-[#FF6B53] font-bold block">// MULTI-TENANT ISOLATION MODEL</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-3 rounded-xl bg-[#151E27] border border-white/6">
                            <span className="text-[#FF6B53] font-bold block">TENANT A</span>
                            <span className="text-[#7E8994]">Users · Workspaces · Isolated Datasets</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#151E27] border border-white/6">
                            <span className="text-[#FF6B53] font-bold block">TENANT B</span>
                            <span className="text-[#7E8994]">Users · Workspaces · Isolated Datasets</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-[#C3CBD3] pt-1">
                          Enforces database row-level scoping and tenant partition keys preventing cross-organization data leakage.
                        </div>
                      </div>
                    )}

                    {/* Engineering Capabilities Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                      {[
                        { title: 'RBAC', desc: 'Access control' },
                        { title: 'Multi-tenancy', desc: 'Tenant isolation' },
                        { title: 'Performance', desc: 'Query optimization' },
                        { title: 'Event-driven', desc: 'Async workers' },
                        { title: 'API Security', desc: 'JWT · OAuth2' },
                        { title: 'Automation', desc: 'Toil elimination' }
                      ].map((c) => (
                        <div key={c.title} className="p-3 rounded-xl bg-[#0F161E] border border-white/6">
                          <div className="text-xs font-bold text-[#FFFFFF]">{c.title}</div>
                          <div className="text-[10px] text-[#7E8994]">{c.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 07: AI & ANALYTICS */}
                {/* ================================================================= */}
                {selectedCategory === 'ai' && (
                  <div className="space-y-6">
                    {/* Clear Collaboration Note */}
                    <div className="p-4 rounded-xl bg-[#0F161E] border border-[#FF6B53]/30 space-y-1.5">
                      <span className="text-xs font-mono text-[#FF6B53] font-bold uppercase tracking-wider block">
                        // Collaboration & Systems Support:
                      </span>
                      <p className="text-xs sm:text-sm text-[#C3CBD3] leading-relaxed">
                        Worked closely with GenAI and Data Science teams on AI-powered analytics, providing backend architecture, data integration, and tenant-isolated retrieval workflows.
                      </p>
                    </div>

                    {/* Animated Flow */}
                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 space-y-2">
                      <span className="text-[11px] font-mono text-[#7E8994] uppercase tracking-wider block">
                        // Intelligence Flow Architecture:
                      </span>
                      <div className="p-3 rounded-lg bg-[#151E27] font-mono text-[10px] sm:text-[11px] flex flex-wrap items-center gap-1.5 text-[#C3CBD3]">
                        <span className="text-[#FFFFFF] font-bold">USER QUESTION</span>
                        <span className="text-[#FF6B53]">→</span>
                        <span>CONTEXT</span>
                        <span className="text-[#FF6B53]">→</span>
                        <span className="text-cyan-400 font-bold">RAG</span>
                        <span className="text-[#FF6B53]">→</span>
                        <span>LANGCHAIN/LANGGRAPH</span>
                        <span className="text-[#FF6B53]">→</span>
                        <span className="text-emerald-400 font-bold">NL → SQL</span>
                        <span className="text-[#FF6B53]">→</span>
                        <span className="text-[#FFFFFF]">INSIGHT & AUTOMATION</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { name: 'RAG', desc: 'Contextual retrieval' },
                        { name: 'LangChain', desc: 'Chaining workflows' },
                        { name: 'LangGraph', desc: 'State graphs' },
                        { name: 'NL → SQL', desc: 'Query generation' },
                        { name: 'AI Agents', desc: 'Task execution' },
                        { name: 'Agentic Workflows', desc: 'Diagnostics' },
                        { name: 'Data Analytics', desc: 'Reporting' },
                        { name: 'Apache Superset', desc: 'Dashboards' }
                      ].map((item) => (
                        <div key={item.name} className="p-3 rounded-xl bg-[#0F161E] border border-white/6 space-y-0.5">
                          <div className="text-xs font-bold text-[#FFFFFF]">{item.name}</div>
                          <div className="text-[10px] text-[#7E8994]">{item.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-[#0F161E] border border-white/6 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#7E8994]">PROVEN THROUGH: Mimasa AI</span>
                      <button
                        onClick={() => handleNavigateProject('mimasa-ai')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B53] text-[#0F161E] font-bold text-xs"
                      >
                        <span>Explore Mimasa AI</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* CATEGORY 08: ENGINEERING TOOLS */}
                {/* ================================================================= */}
                {selectedCategory === 'tools' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-[#C3CBD3] leading-relaxed">
                      Developer tooling and workflows utilized for version control, issue tracking, API testing, and AI-assisted development.
                    </p>

                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-[#7E8994] uppercase tracking-wider block">
                        // Core Developer Tooling
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { name: 'Git', desc: 'Version control' },
                          { name: 'GitHub', desc: 'Code review & CI' },
                          { name: 'Bitbucket', desc: 'Repository management' },
                          { name: 'Jira', desc: 'Agile sprints' },
                          { name: 'Postman', desc: 'API testing & contracts' }
                        ].map((t) => (
                          <div key={t.name} className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-0.5">
                            <div className="text-xs font-bold text-[#FFFFFF]">{t.name}</div>
                            <div className="text-[10px] text-[#7E8994]">{t.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-mono text-[#7E8994] uppercase tracking-wider block">
                        // AI-Assisted Development
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                          <div className="text-xs font-bold text-[#FFFFFF]">Codium</div>
                          <p className="text-[11px] text-[#7E8994]">AI code analysis & test generation</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                          <div className="text-xs font-bold text-[#FFFFFF]">Tabnine</div>
                          <p className="text-[11px] text-[#7E8994]">Contextual code autocomplete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PHILOSOPHY MARKER: BUILT THROUGH EXPERIENCE */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7E8994]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B53]" />
            <span className="font-bold text-[#FFFFFF] tracking-wider uppercase">
              BUILT THROUGH EXPERIENCE.
            </span>
          </div>

          <div className="text-[11px] text-[#7E8994]">
            Backend · Systems Architecture · Data Engineering · Automation
          </div>
        </div>

      </div>
    </CinematicSection>
  );
};
