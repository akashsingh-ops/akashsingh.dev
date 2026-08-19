import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { projectsData, ProjectExtended } from '../../data/projects';
import { Modal } from '../ui/Modal';
import { CountUp } from '../ui/CountUp';
import { MimasaAiDiagram } from './MimasaAiDiagram';
import { OceanMotionDiagram } from './OceanMotionDiagram';
import { GeekSearchDiagram } from './GeekSearchDiagram';
import { EazEaeDiagram } from './EazEaeDiagram';
import {
  ArrowUpRight,
  Github,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users,
  Code,
  QrCode,
  Network,
  Sparkles,
  Layers,
  ChevronRight,
  Database,
  Search,
  Building2,
  Briefcase
} from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

const customEase = [0.22, 1, 0.36, 1] as const;

export type ProjectId = 'mimasa-ai' | 'geek-search' | 'oceanmotion' | 'eazeae';

interface ProjectsSectionProps {
  externalModalProject?: ProjectId | null;
  onCloseExternalModal?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  externalModalProject,
  onCloseExternalModal
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId>('mimasa-ai');
  const [internalModalProject, setInternalModalProject] = useState<ProjectId | null>(null);

  const activeModalProject = externalModalProject !== undefined && externalModalProject !== null
    ? externalModalProject
    : internalModalProject;

  // When external modal triggers, also sync active tab
  useEffect(() => {
    if (externalModalProject) {
      setSelectedProjectId(externalModalProject);
    }
  }, [externalModalProject]);

  const handleCloseModal = () => {
    setInternalModalProject(null);
    onCloseExternalModal?.();
  };

  const shouldReduceMotion = useReducedMotion();
  const currentProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <CinematicSection
      id="work"
      chapterNumber="03"
      chapterLabel="SELECTED WORK"
      motionType="aperture"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">03</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">SELECTED WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Turning complex systems into dependable software.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            Case studies grounded in backend architecture, graph databases, multi-tenant RBAC, enterprise search, and AI-driven automation.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* CLEAN PROJECT SELECTOR NAVIGATION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#666C75]">
            <span className="uppercase tracking-widest text-[#FF7A18] font-bold">// Project Index</span>
            <span>Click to switch project view</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-[#111418]/60 border border-white/6">
            {projectsData.map((project, idx) => {
              const isSelected = selectedProjectId === project.id;
              const formattedNum = `0${idx + 1}`;

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id as ProjectId)}
                  className={`p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-[#171B20] border border-[#FF7A18]/60 shadow-lg shadow-[#FF7A18]/5'
                      : 'bg-[#0B0D0F]/70 border border-white/5 hover:border-white/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Top indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#FF7A18]' : 'text-[#666C75]'}`}>
                      {formattedNum} /
                    </span>
                    {project.company && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#9A9FA8]">
                        {project.company}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-mono font-bold text-sm sm:text-base tracking-tight transition-colors ${
                    isSelected ? 'text-[#F5F5F2]' : 'text-[#9A9FA8] group-hover:text-[#F5F5F2]'
                  }`}>
                    {project.title.toUpperCase()}
                  </h3>

                  <p className="text-[11px] text-[#666C75] line-clamp-1 mt-1 font-mono">
                    {project.architectureSubtitle || project.category}
                  </p>

                  {/* Active bottom glow bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A18] to-transparent"
                      transition={{ duration: 0.4, ease: customEase }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE PROJECT HERO SHOWCASE (Cinematic 500-700ms Transition) */}
        {/* ========================================================================= */}
        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.985 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.55, ease: customEase }}
              className="p-6 sm:p-9 rounded-3xl bg-[#111418]/50 border border-white/8 hover:border-white/15 transition-all duration-300 space-y-8"
            >
              {/* Card Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/6 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#FF7A18] font-bold px-2 py-0.5 rounded bg-[#FF7A18]/10 border border-[#FF7A18]/20">
                    {projectsData.findIndex((p) => p.id === currentProject.id) + 1 < 10
                      ? `0${projectsData.findIndex((p) => p.id === currentProject.id) + 1}`
                      : projectsData.findIndex((p) => p.id === currentProject.id) + 1}{' '}
                    // {currentProject.title.toUpperCase()}
                  </span>
                  {currentProject.company && (
                    <span className="text-xs font-mono text-[#9A9FA8] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                      <span>{currentProject.company}</span>
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-[#666C75]">
                  {currentProject.architectureSubtitle}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
                  {currentProject.title}
                </h3>
                <p className="text-lg sm:text-xl font-medium text-[#9A9FA8] max-w-3xl leading-relaxed">
                  {currentProject.tagline}
                </p>
              </div>

              {/* Key Quick Facts Strip */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-4 border-y border-white/8 font-mono text-sm">
                {currentProject.quickFacts.map((fact, idx) => (
                  <React.Fragment key={idx}>
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-[#F5F5F2] block">
                        {fact.stat}
                      </span>
                      <span className="text-xs text-[#666C75]">{fact.label}</span>
                    </div>
                    {idx < currentProject.quickFacts.length - 1 && (
                      <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Project Signature Visual Component */}
              <div className="space-y-2">
                {currentProject.id === 'mimasa-ai' && <MimasaAiDiagram />}
                {currentProject.id === 'oceanmotion' && <OceanMotionDiagram />}
                {currentProject.id === 'geek-search' && <GeekSearchDiagram />}
                {currentProject.id === 'eazeae' && <EazEaeDiagram />}
              </div>

              {/* Primary Call to Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => setInternalModalProject(currentProject.id as ProjectId)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171B20] hover:bg-[#FF7A18] text-sm font-semibold text-[#F5F5F2] hover:text-[#090B0D] border border-white/15 hover:border-[#FF7A18] transition-all duration-200 shadow-md group"
                >
                  <span>Explore case study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF7A18] group-hover:text-[#090B0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-white/5 text-xs font-mono text-[#9A9FA8] hover:text-[#F5F5F2] border border-white/8 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-[#666C75]" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* SELECTED WORK PROGRESSION RELATIONSHIP */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-2xl bg-[#111418]/40 border border-white/6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#666C75]">
            <span className="uppercase tracking-wider text-[#FF7A18] font-bold">// Engineering Scope Progression</span>
            <span>Real-World → Scale & AI</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            {[
              { id: 'eazeae', title: '04. EAZEAE', desc: 'Full-stack + Real-world access validation' },
              { id: 'geek-search', title: '02. GEEK-SEARCH', desc: 'Builder + Personal initiative & 1,000+ students' },
              { id: 'oceanmotion', title: '03. OCEANMOTION', desc: 'Deep Backend + Graph DB + 70+ APIs + RBAC' },
              { id: 'mimasa-ai', title: '01. MIMASA AI', desc: 'Enterprise Data + Search + Multi-Tenant + AI' }
            ].map((prog) => (
              <button
                key={prog.id}
                onClick={() => setSelectedProjectId(prog.id as ProjectId)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedProjectId === prog.id
                    ? 'bg-[#171B20] border-[#FF7A18]/40 text-[#F5F5F2]'
                    : 'bg-[#0B0D0F] border-white/5 text-[#9A9FA8] hover:border-white/15'
                }`}
              >
                <div className="font-bold text-[#FF7A18] text-[11px] mb-1">{prog.title}</div>
                <div className="text-[10px] text-[#9A9FA8] leading-snug">{prog.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY MODAL: MIMASA AI */}
      {/* ========================================================================= */}
      {activeModalProject === 'mimasa-ai' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="Mimasa AI Case Study"
          subtitle="AI-Powered Enterprise Data Analytics & Search (Xaigi Technology)"
          maxWidth="3xl"
        >
          <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
            {/* The Problem */}
            <div className="p-5 rounded-2xl bg-[#0B0D0F] border border-white/8 space-y-3">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold tracking-wider block">
                The Problem
              </span>
              <p className="text-base sm:text-lg font-bold text-[#F5F5F2]">
                "Data exists. But it lives in silos — across systems, teams, and formats."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-[#9A9FA8] pt-1">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/6 text-center">
                  <span className="text-[#FF7A18] block font-bold">01</span>
                  <span>Insights are delayed.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/6 text-center">
                  <span className="text-[#FF7A18] block font-bold">02</span>
                  <span>Decisions are reactive.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/6 text-center">
                  <span className="text-[#FF7A18] block font-bold">03</span>
                  <span>Execution is manual.</span>
                </div>
              </div>
            </div>

            {/* What Mimasa AI Does */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2] font-mono">What Mimasa AI Does</h4>
              <p>
                Mimasa AI connects to the systems organizations already run, reconciles data into governed models, lets users question that data in plain language, and helps carry decisions into source systems through automation agents.
              </p>
            </div>

            {/* Akash's Role (Honest & Explicit) */}
            <div className="p-4 rounded-xl bg-[#171B20] border border-[#FF7A18]/30 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                My Role // Backend + Frontend Engineering Support
              </span>
              <p className="text-[#F5F5F2] text-sm">
                Worked closely with the <strong>GenAI and Data Science teams</strong>, providing backend and frontend engineering support across data analytics, search, organization management, notifications, onboarding, and AI-powered workflows.
              </p>
            </div>

            {/* Interactive Architecture & Diagram Embed */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#666C75] uppercase tracking-wider block">
                // Interactive Contribution Exploration
              </span>
              <MimasaAiDiagram />
            </div>

            {/* Measurable Outcomes */}
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                Measurable Impact & Results
              </span>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#F5F5F2]">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>&lt;100ms fuzzy and prefix discovery across data sources, dashboards, and charts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>6-step signal onboarding pipeline capturing profile signals for GenAI recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>Strict multi-tenant organization workspace data isolation preventing cross-tenant leakage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>Decoupled Celery and Django Signal notification pipeline handling high event volume</span>
                </li>
              </ul>
            </div>

            {/* Key Takeaway */}
            <div className="text-xs font-mono text-[#9A9FA8] pt-2 border-t border-white/6">
              <strong className="text-[#F5F5F2]">What I Learned:</strong> High-performance backend pipelines, clean data schemas, and strict boundary isolation are the essential bedrock required before any GenAI layer can produce reliable insights.
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY MODAL: OCEANMOTION */}
      {/* ========================================================================= */}
      {activeModalProject === 'oceanmotion' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="OceanMotion Case Study"
          subtitle="Enterprise Cloud Analytics Platform (Xaigi Technology)"
          maxWidth="3xl"
        >
          <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
            {/* Primary Story */}
            <div className="p-5 rounded-2xl bg-[#0B0D0F] border border-white/8 space-y-3">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold tracking-wider block">
                Primary Mission
              </span>
              <p className="text-base sm:text-lg font-bold text-[#F5F5F2]">
                Turning a complex dataset lifecycle into a governed publishing and analytics platform.
              </p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/6 font-mono text-xs text-[#9A9FA8]">
                UPLOAD → LICENSING → PRICING → ACCESS CONTROL → PUBLICATION → ANALYTICS
              </div>
            </div>

            {/* Akash's Role */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2] font-mono">Backend Architecture & Core Contributions</h4>
              <p>
                Engineered 70+ production REST APIs covering dataset ingestion, metadata schemas, licensing, subscription tiers, and access control. Represented connected entities in Neo4j (USER → GROUP → DATASET → CHART → DASHBOARD) and authored 35+ complex Cypher queries.
              </p>
            </div>

            {/* Interactive Graph & RBAC Showcase */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#666C75] uppercase tracking-wider block">
                // Neo4j & RBAC Architecture Engine
              </span>
              <OceanMotionDiagram />
            </div>

            {/* Group Sharing & Permission Leakage Investigation */}
            <div className="p-4 rounded-xl bg-[#171B20] border border-[#FF7A18]/30 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                When Permissions Get Complicated // Root-Cause Debugging
              </span>
              <p className="text-[#F5F5F2] text-xs sm:text-sm">
                Diagnosed and resolved permission leakage and high traversal latency on shared nested dashboards by refactoring recursive Cypher queries with explicit directional constraints and group-scoping predicates — resulting in correct RBAC enforcement and a <strong>30–40% query execution improvement</strong>.
              </p>
            </div>

            {/* Measurable Outcomes */}
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                Engineering Metrics
              </span>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#F5F5F2]">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>70+ REST APIs built across ingestion, licensing, subscriptions, and access control</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>35+ complex Cypher queries written and optimized</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>30–40% query execution speed improvement through indexing and pattern rewrites</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>Group Sharing / RBAC module architected from scratch with Apache Superset permissions</span>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY MODAL: GEEK-SEARCH */}
      {/* ========================================================================= */}
      {activeModalProject === 'geek-search' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="Geek-Search Case Study"
          subtitle="Placement & Competitive Coding Platform"
          maxWidth="2xl"
        >
          <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-1">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold">
                Origin & Context
              </span>
              <p className="text-[#F5F5F2]">
                Coming from a small-town background, Akash saw that many students lacked exposure to placement-oriented preparation, coding contests, and industry expectations. He built Geek-Search to help bridge that gap.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">The Problem</h4>
              <p>
                Students outside major tier-1 hubs lacked structured tracking for coding contests, transparent leaderboards, and organized placement roadmaps.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">Role & Contribution (Frontend + Database)</h4>
              <p>
                Contributed across <strong>frontend engineering and database design & optimization</strong>, structuring queries and state management so students could submit code and track live rankings seamlessly during active campus coding contests.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B20] border border-white/10 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                Measurable Impact
              </span>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#F5F5F2]">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>1,000+ students actively engaged in preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>10,000+ code submissions processed reliably</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>~40% latency reduction achieved for page and contest responses</span>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY MODAL: EAZEAE */}
      {/* ========================================================================= */}
      {activeModalProject === 'eazeae' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="EazEae Case Study"
          subtitle="Digital Tourism & Access Platform"
          maxWidth="2xl"
        >
          <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-1">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold">
                Origin & Context
              </span>
              <p className="text-[#F5F5F2]">
                Growing up around Agra made Akash aware of the gap in digital visitor experiences around smaller heritage monuments, where manual queues and paper ticketing created unnecessary friction.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">The Engineering Challenge</h4>
              <p>
                The primary challenge was ensuring reliable QR-based access verification and robust backend/database performance under concurrent gate entry requests while strictly preventing duplicate or reused passes.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">The Approach</h4>
              <p>
                Built a streamlined validation workflow optimizing database indexing and request handling to keep latency minimal under concurrent visitor scans.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171B20] border border-white/10 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] font-bold block">
                Measurable Outcomes
              </span>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#F5F5F2]">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>500+ daily visitor entry requests handled smoothly</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>~75% faster response times through optimized validation pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF7A18]">✓</span>
                  <span>100% duplicate access prevention at the gate</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://github.com/akashsingh-ops/EazEae_MajorProject"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#FF7A18] hover:underline"
              >
                <Github className="w-4 h-4" />
                <span>View project on GitHub ↗</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </CinematicSection>
  );
};
