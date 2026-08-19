import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'motion/react';
import { experienceData } from '../../data/experience';
import { ExperienceItem } from '../../types';
import { Drawer } from '../ui/Drawer';
import {
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Database,
  Server,
  Zap,
  Cpu,
  Sparkles,
  Network,
  Share2,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

const customEase = [0.22, 1, 0.36, 1] as const;

export const JourneyTimeline: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [activeDellNode, setActiveDellNode] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px', once: false });

  // Scroll tracking for animated SVG path drawing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end 80%']
  });

  // Animated pathLength from 0 to 1 as user scrolls
  const pathLengthValue = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  const dellPipelineNodes = [
    { label: 'Multiple Sources', desc: 'Enterprise databases, operational event streams, and raw logs' },
    { label: 'Data Ingestion', desc: 'Secure data extraction and staging pipelines' },
    { label: 'ETL Workflows', desc: 'Automated data cleaning, filtering, and normalization' },
    { label: 'Transformation', desc: 'Structuring datasets into analytical dimensional schemas' },
    { label: 'Amazon Redshift', desc: 'Scalable cloud data warehousing powering downstream queries' },
    { label: 'Automation', desc: 'Zero-toil Python automation reducing recurring operational tasks' },
    { label: 'AI Agentic Exploration', desc: 'Exploring intelligent workflows for data validation and diagnostics' }
  ];

  return (
    <CinematicSection
      ref={sectionRef}
      id="journey"
      chapterNumber="04"
      chapterLabel="JOURNEY"
      motionType="chronicle"
      className="py-24 sm:py-36 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">04</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Professional trajectory.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            From enterprise user interfaces to backend APIs, graph databases, multi-tenant RBAC, and data automation pipelines.
          </p>
        </motion.div>

        {/* Timeline Container with Dynamic SVG Path Drawing */}
        <div className="relative pl-7 sm:pl-10 space-y-6 sm:space-y-8">
          {/* Animated SVG Timeline Connection System */}
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 32 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="journeySpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A18" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FF7A18" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFA15C" stopOpacity="0.9" />
                </linearGradient>
                <filter id="journeyGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background trace dashed baseline */}
              <line
                x1="12"
                y1="10"
                x2="12"
                y2="990"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Animated SVG Path with pathLength - draws as user scrolls */}
              <motion.path
                d="M 12 10 L 12 990"
                stroke="url(#journeySpineGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#journeyGlow)"
                style={{
                  pathLength: shouldReduceMotion ? 1 : pathLengthValue
                }}
              />

              {/* Branching SVG Horizontal Connectors to Timeline Milestones */}
              {experienceData.map((_, idx) => {
                const yPos = 35 + idx * 280;
                return (
                  <g key={idx}>
                    <motion.path
                      d={`M 12 ${yPos} Q 20 ${yPos} 28 ${yPos}`}
                      stroke="url(#journeySpineGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        pathLength: shouldReduceMotion ? 1 : pathLengthValue
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {experienceData.map((exp, idx) => {
            return (
              <motion.div
                key={exp.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 25 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.6, ease: customEase, delay: shouldReduceMotion ? 0 : idx * 0.12 }}
                className="relative"
              >
                {/* Timeline node marker with pulse */}
                <div className="absolute -left-[32px] sm:-left-[44px] top-7 w-4 h-4 rounded-full bg-[#111418] border-2 border-[#FF7A18] flex items-center justify-center z-20 shadow-md shadow-[#FF7A18]/30">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#FF7A18]"
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                  />
                </div>

                <button
                  onClick={() => setSelectedExp(exp)}
                  className="w-full p-6 sm:p-7 rounded-2xl bg-[#111418] border border-white/6 hover:border-white/20 hover:bg-[#171B20]/70 transition-all duration-200 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs text-[#FF7A18] font-bold">
                        {exp.period.split('–')[0].trim()}
                      </span>
                      <span className="text-white/20">·</span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F2] tracking-tight group-hover:text-[#FF7A18] transition-colors">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          Current
                        </span>
                      )}
                      {exp.id === 'xaigi' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF7A18]/15 border border-[#FF7A18]/30 text-[#FF7A18]">
                          OceanMotion & Mimasa AI
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-[#9A9FA8] font-mono">
                      {exp.role}
                    </div>

                    <p className="text-xs sm:text-sm text-[#666C75] line-clamp-1 max-w-2xl pt-0.5">
                      {exp.themes.join(' · ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#9A9FA8] group-hover:text-[#F5F5F2] shrink-0 self-end sm:self-center">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 text-[#FF7A18] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Experience Deep Dive Drawer */}
      {selectedExp && (
        <Drawer
          isOpen={!!selectedExp}
          onClose={() => setSelectedExp(null)}
          title={selectedExp.company}
          subtitle={`${selectedExp.role} (${selectedExp.period})`}
          width="lg"
        >
          <div className="space-y-6 text-[#9A9FA8] text-sm sm:text-base leading-relaxed">
            {/* Overview */}
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase tracking-wider font-bold block mb-1">
                Role Overview
              </span>
              <p className="text-[#F5F5F2]">
                {selectedExp.overview}
              </p>
            </div>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {selectedExp.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6">
                  <div className="font-mono text-base font-bold text-[#FF7A18]">{m.stat}</div>
                  <div className="text-[11px] text-[#9A9FA8] mt-0.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>

            {/* XAIGI TECHNOLOGY SPECIAL CHAPTER */}
            {selectedExp.id === 'xaigi' && (
              <div className="space-y-5 p-4 rounded-2xl bg-[#0B0D0F] border border-white/8">
                {/* Major Projects built at Xaigi */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-[#FF7A18] uppercase tracking-wider font-bold block">
                    // Major Systems Built at Xaigi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#111418] border border-white/6 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F5F5F2]">01. OCEANMOTION</span>
                        <span className="text-[10px] text-[#FF7A18]">GRAPH / RBAC</span>
                      </div>
                      <p className="text-[11px] text-[#9A9FA8] leading-tight">
                        Dataset publishing platform, 70+ REST APIs, Neo4j 35+ Cypher queries, Apache Superset charts.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#111418] border border-white/6 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F5F5F2]">02. MIMASA AI</span>
                        <span className="text-[10px] text-[#FF7A18]">SEARCH / AI</span>
                      </div>
                      <p className="text-[11px] text-[#9A9FA8] leading-tight">
                        &lt;100ms intelligent search, tenant workspaces, 6-step onboarding, Django signals & Celery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ENGINEERING ACROSS TEAMS VISUALIZATION */}
                <div className="space-y-3 p-4 rounded-xl bg-[#111418] border border-white/6">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#F5F5F2] font-bold uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#FF7A18]" />
                      ENGINEERING ACROSS TEAMS
                    </span>
                    <span className="text-[10px] text-[#666C75]">Cross-functional</span>
                  </div>

                  {/* Topology Diagram */}
                  <div className="p-3 rounded-lg bg-[#0B0D0F] border border-white/5 font-mono text-xs space-y-3 text-center">
                    <div className="inline-block px-3 py-1 rounded bg-[#FF7A18]/20 border border-[#FF7A18]/40 text-[#FF7A18] font-bold">
                      AKASH SINGH
                    </div>
                    <div className="text-white/20">│</div>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="p-1.5 rounded bg-white/5 border border-white/8 text-[#F5F5F2]">
                        Backend
                      </div>
                      <div className="p-1.5 rounded bg-white/5 border border-white/8 text-[#F5F5F2]">
                        Frontend
                      </div>
                      <div className="p-1.5 rounded bg-white/5 border border-white/8 text-[#F5F5F2]">
                        APIs
                      </div>
                    </div>
                    <div className="text-white/20">│</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-[#171B20] border border-[#FF7A18]/30 text-[#FF7A18] font-semibold">
                        GenAI Team
                      </div>
                      <div className="p-2 rounded bg-[#171B20] border border-emerald-500/30 text-emerald-400 font-semibold">
                        Data Science Team
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#9A9FA8] font-mono leading-relaxed">
                    Worked with <strong>GenAI and Data Science teams</strong> while providing backend and frontend engineering support across analytics, search, and workflows.
                  </p>
                </div>

                {/* Structured Tech Stack for Xaigi */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#666C75] block">
                    // Technology Stack Organization
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-[#111418] border border-white/5">
                      <span className="text-[10px] text-[#FF7A18] font-bold block mb-1">BACKEND</span>
                      <span className="text-[#F5F5F2]">Python · Django · Django REST Framework</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#111418] border border-white/5">
                      <span className="text-[10px] text-[#FF7A18] font-bold block mb-1">GRAPH / DATA</span>
                      <span className="text-[#F5F5F2]">Neo4j · Cypher · Elasticsearch</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#111418] border border-white/5">
                      <span className="text-[10px] text-[#FF7A18] font-bold block mb-1">FRONTEND</span>
                      <span className="text-[#F5F5F2]">React.js · JavaScript</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#111418] border border-white/5">
                      <span className="text-[10px] text-[#FF7A18] font-bold block mb-1">AI-ASSISTED DEV</span>
                      <span className="text-[#F5F5F2]">Codium · Tabnine</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Dell Pipeline Showcase */}
            {selectedExp.id === 'dell' && (
              <div className="space-y-4 p-4 rounded-xl bg-[#0B0D0F] border border-white/8 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF7A18]" />
                    Enterprise Data Pipeline Topology
                  </span>
                  <span className="text-[10px] font-mono text-[#666C75]">Step 0{activeDellNode + 1} of 07</span>
                </div>

                {/* Animated Pipeline SVG Track */}
                <div className="relative py-2">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 700 24">
                    <defs>
                      <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7C9CFF" />
                        <stop offset="50%" stopColor="#FF7A18" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                    <line x1="20" y1="12" x2="680" y2="12" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                    <motion.path
                      d="M 20 12 L 680 12"
                      stroke="url(#pipeGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: (activeDellNode + 1) / 7 }}
                      transition={{ duration: 0.5, ease: customEase }}
                    />
                    {dellPipelineNodes.map((_, i) => {
                      const cx = 20 + i * (660 / 6);
                      const isNodeActive = i <= activeDellNode;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy="12"
                          r={i === activeDellNode ? "6" : "4"}
                          fill={isNodeActive ? "#FF7A18" : "#111418"}
                          stroke={isNodeActive ? "#F5F5F2" : "rgba(255,255,255,0.2)"}
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dellPipelineNodes.map((node, i) => (
                    <button
                      key={node.label}
                      onClick={() => setActiveDellNode(i)}
                      className={`p-2.5 rounded-lg text-left border transition-all text-xs font-mono relative ${
                        activeDellNode === i
                          ? 'bg-[#171B20] border-[#FF7A18] text-[#F5F5F2] shadow-sm shadow-[#FF7A18]/20'
                          : 'bg-[#111418] border-white/5 text-[#9A9FA8] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#666C75]">0{i + 1}</span>
                        {activeDellNode === i && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18] animate-pulse" />
                        )}
                      </div>
                      <span className="font-bold line-clamp-1">{node.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-[#111418] border border-white/5 font-mono text-xs text-[#F5F5F2]/90 flex items-center gap-2">
                  <span className="text-[#FF7A18]">›</span>
                  <span>{dellPipelineNodes[activeDellNode].desc}</span>
                </div>
              </div>
            )}

            {/* Key Verified Contributions */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#F5F5F2]">Key Contributions & Architecture</h4>
              <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                {selectedExp.keyContributions.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#FF7A18] mt-1 font-bold">›</span>
                    <span className="text-[#F5F5F2]/90 leading-relaxed">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666C75] block mb-2">
                // Technology Focus
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedExp.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 font-mono text-xs text-[#9A9FA8]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </CinematicSection>
  );
};
