import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useReducedMotion, AnimatePresence } from 'motion/react';
import { Drawer } from '../ui/Drawer';
import { ArrowRight, Globe, Server, Database, Zap, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

interface LayerSpec {
  id: string;
  number: string;
  name: string;
  shortName: string;
  headline: string;
  bullets: string[];
  icon: React.ReactNode;
  deepDive: {
    overview: string;
    focusAreas: string[];
    mindset: string;
  };
}

const layers: LayerSpec[] = [
  {
    id: 'layer-ui',
    number: '01',
    name: 'Visible UI',
    shortName: 'UI LAYER',
    headline: 'The touchpoint. Clean, responsive, and intuitive.',
    bullets: ['State Management', 'Optimistic Updates', 'Client Contracts'],
    icon: <Globe className="w-4 h-4 text-[#7C9CFF]" />,
    deepDive: {
      overview: 'Where user intent begins. My engineering journey started here, building responsive web interfaces before realizing that the real complexity lives behind the button click.',
      focusAreas: ['Fast client-side rendering', 'Clear request payloads', 'Resilient error states for users'],
      mindset: 'A clean UI only succeeds if the underlying system responds predictably.'
    }
  },
  {
    id: 'layer-gateway',
    number: '02',
    name: 'API Gateway & Routing',
    shortName: 'API GATEWAY',
    headline: 'Connects systems. Route dispatch and authentication.',
    bullets: ['RESTful Contracts', 'JWT & OAuth2 Security', 'Multi-Tenant Partitioning'],
    icon: <Shield className="w-4 h-4 text-[#FF7A18]" />,
    deepDive: {
      overview: 'The entry point and guardrail. Enforces authentication, request validation, rate limiting, and multi-tenant boundary isolation before requests hit business logic.',
      focusAreas: ['Stateless token verification (JWT)', 'Multi-tenant organization isolation', 'Serialization and predictable error schemas'],
      mindset: 'Never trust user input; validate early at the boundary.'
    }
  },
  {
    id: 'layer-logic',
    number: '03',
    name: 'Business Logic & Services',
    shortName: 'BUSINESS LOGIC',
    headline: 'The engine. Domain rules, orchestration, and validation.',
    bullets: ['Python & Django DRF', 'Domain Modularity', 'Transaction Boundaries'],
    icon: <Server className="w-4 h-4 text-[#F5F5F2]" />,
    deepDive: {
      overview: 'Translates functional requirements into decoupled service modules. Manages atomic state transitions and coordinates operations across multiple subsystems.',
      focusAreas: ['Decoupled service modules', 'Atomic state transitions', 'Clean interfaces between components'],
      mindset: 'Keep business logic pure and decoupled from framework quirks.'
    }
  },
  {
    id: 'layer-db',
    number: '04',
    name: 'Database & Storage',
    shortName: 'DATABASE LAYER',
    headline: 'Where performance becomes real. Schema design and indexing.',
    bullets: ['Neo4j Graph (Cypher)', 'PostgreSQL / MySQL', 'Query Tuning & Latency'],
    icon: <Database className="w-4 h-4 text-[#FF7A18]" />,
    deepDive: {
      overview: 'The foundation of system speed. Where query plans, graph traversals, and indexing strategies determine whether an application scales or slows down under load.',
      focusAreas: ['Graph traversals in Neo4j with ~40% latency improvements', 'Relational schema indexing and execution plan profiling', 'Cache strategies with Redis for hot path data'],
      mindset: 'Performance is built at the schema and query layer, not patched on top.'
    }
  },
  {
    id: 'layer-async',
    number: '05',
    name: 'Async Queues & Data Pipelines',
    shortName: 'ASYNC & DATA',
    headline: 'The background machinery. Workers and data warehousing.',
    bullets: ['Celery & Redis Queues', 'Amazon Redshift ETL', 'Operational Automation'],
    icon: <Zap className="w-4 h-4 text-[#7C9CFF]" />,
    deepDive: {
      overview: 'Offloading compute from the critical request path. Ingesting multi-source enterprise data, managing automated ETL workflows into Amazon Redshift, and eliminating repetitive manual toil.',
      focusAreas: ['Distributed task workers via Celery', 'Automated data ingestion and transformation pipelines', 'Exploring AI agentic workflows for operational telemetry'],
      mindset: 'If a task is done manually or takes >50ms, move it to an automated background queue.'
    }
  }
];

const customEase = [0.22, 1, 0.36, 1] as const;

export const BehindTheInterface: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(3); // Default to DB
  const [drawerLayer, setDrawerLayer] = useState<LayerSpec | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Track scroll-driven active layer index smoothly
  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Map 0 -> 1 to layer indices 0, 1, 2, 3, 4
      if (progress < 0.2) {
        setSelectedLayerIndex(0);
      } else if (progress < 0.4) {
        setSelectedLayerIndex(1);
      } else if (progress < 0.6) {
        setSelectedLayerIndex(2);
      } else if (progress < 0.8) {
        setSelectedLayerIndex(3);
      } else {
        setSelectedLayerIndex(4);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, shouldReduceMotion]);

  const currentLayer = layers[selectedLayerIndex] || layers[3];

  return (
    <CinematicSection
      ref={containerRef}
      id="behind-the-interface"
      chapterNumber="02"
      chapterLabel="BEHIND THE INTERFACE"
      motionType="depth"
      className="relative min-h-[140vh] sm:min-h-[170vh]"
    >
      <div className="w-full">
        {/* Sticky Container for Deconstructed Architecture Experience */}
        <div className="sticky top-20 sm:top-24 min-h-[85vh] flex flex-col justify-center py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full space-y-12">
            {/* Section Header */}
            <motion.div
              className="space-y-4 max-w-2xl"
              variants={shouldReduceMotion ? undefined : childItemVariant}
            >
              <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
                <span className="text-[#FF7A18] font-bold">02</span>
                <span className="text-white/20">/</span>
                <span className="uppercase tracking-widest">BEHIND THE INTERFACE</span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] text-[#666C75] font-mono hidden sm:inline">
                  Scroll or select to deconstruct stack
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
                I became interested in software when I started asking what happens behind it.
              </h2>

              <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
                Moving deeper from the visible user interface into API gateways, decoupled services, database indexing, and asynchronous background pipelines.
              </p>
            </motion.div>

          {/* The Deconstructed Stack Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Left: Interactive Layer Selector Stack with SVG connection paths */}
            <div className="lg:col-span-6 space-y-2 relative pl-6 sm:pl-7">
              {/* Animated Vertical Architecture Bus SVG with pathLength */}
              <div className="absolute left-0 top-3 bottom-3 w-6 pointer-events-none overflow-visible">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 24 360">
                  <defs>
                    <linearGradient id="archBusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7C9CFF" />
                      <stop offset="25%" stopColor="#FF7A18" />
                      <stop offset="50%" stopColor="#F5F5F2" />
                      <stop offset="75%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#FF8B33" />
                    </linearGradient>
                    <filter id="busGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Static trace line */}
                  <line x1="8" y1="10" x2="8" y2="350" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Animated SVG Path drawn with pathLength */}
                  <motion.path
                    d="M 8 10 L 8 350"
                    stroke="url(#archBusGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#busGlow)"
                    style={{
                      pathLength: shouldReduceMotion ? 1 : scrollYProgress
                    }}
                  />

                  {/* Branch lines into each tier */}
                  {[0, 1, 2, 3, 4].map((idx) => {
                    const y = 36 + idx * 72;
                    const isActive = selectedLayerIndex === idx;
                    return (
                      <g key={idx}>
                        <motion.path
                          d={`M 8 ${y} L 24 ${y}`}
                          stroke={isActive ? "#FF7A18" : "rgba(255,255,255,0.15)"}
                          strokeWidth={isActive ? "2.5" : "1.5"}
                          strokeLinecap="round"
                          style={{
                            pathLength: shouldReduceMotion ? 1 : scrollYProgress
                          }}
                        />
                        <circle
                          cx="8"
                          cy={y}
                          r={isActive ? "4" : "2.5"}
                          fill={isActive ? "#FF7A18" : "#111418"}
                          stroke={isActive ? "#F5F5F2" : "rgba(255,255,255,0.3)"}
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {layers.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                const isPassed = selectedLayerIndex >= idx;

                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#171B20] border-[#FF7A18]/60 shadow-lg shadow-[#FF7A18]/10 scale-[1.01]'
                        : isPassed
                        ? 'bg-[#111418] border-white/10 text-[#F5F5F2]'
                        : 'bg-[#111418]/60 border-white/5 text-[#9A9FA8]/70 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#FF7A18]/15 text-[#FF7A18]'
                            : isPassed
                            ? 'bg-white/10 text-[#F5F5F2]'
                            : 'bg-white/5 text-[#666C75]'
                        }`}
                      >
                        {layer.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-[#FF7A18] font-bold' : 'text-[#666C75]'}`}>
                            {layer.number}
                          </span>
                          <h4 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-[#F5F5F2]' : 'text-[#9A9FA8]'}`}>
                            {layer.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#666C75] line-clamp-1 mt-0.5">
                          {layer.headline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF7A18]/10 text-[#FF7A18] border border-[#FF7A18]/20 hidden sm:inline">
                          Active Depth
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSelected
                            ? 'text-[#FF7A18] translate-x-1'
                            : 'text-[#666C75] opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Layer Showcase Card with Animated SVG Data-Flow Diagram */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLayer.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: customEase }}
                  className="p-6 sm:p-8 rounded-2xl bg-[#111418] border border-white/10 relative overflow-hidden space-y-6 shadow-2xl"
                >
                  {/* Top indicator */}
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#FF7A18] font-bold">
                        LAYER {currentLayer.number}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="text-xs font-mono uppercase text-[#9A9FA8]">
                        {currentLayer.shortName}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-[#FF7A18]">
                      {currentLayer.icon}
                    </div>
                  </div>

                  {/* Architecture Topology SVG Flow Diagram */}
                  <div className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/6 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9FA8]">
                      <span>SYSTEM TOPOLOGY FLOW</span>
                      <span className="text-[#FF7A18] font-semibold">STAGE {selectedLayerIndex + 1}/5</span>
                    </div>

                    <div className="relative py-1">
                      <svg className="w-full h-10 overflow-visible" viewBox="0 0 500 36">
                        <defs>
                          <linearGradient id="layerFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7C9CFF" />
                            <stop offset="50%" stopColor="#FF7A18" />
                            <stop offset="100%" stopColor="#10B981" />
                          </linearGradient>
                        </defs>

                        {/* Static connecting track */}
                        <line x1="30" y1="18" x2="470" y2="18" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />

                        {/* Animated SVG Path drawn with pathLength */}
                        <motion.path
                          d="M 30 18 L 470 18"
                          stroke="url(#layerFlowGrad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: (selectedLayerIndex + 1) / 5 }}
                          transition={{ duration: 0.55, ease: customEase }}
                        />

                        {/* 5 Architectural stages */}
                        {['UI', 'API', 'Logic', 'DB', 'Async'].map((label, i) => {
                          const cx = 30 + i * (440 / 4);
                          const isReached = i <= selectedLayerIndex;
                          const isCurrent = i === selectedLayerIndex;
                          return (
                            <g key={label}>
                              <circle
                                cx={cx}
                                cy="18"
                                r={isCurrent ? "6.5" : "4"}
                                fill={isCurrent ? "#FF7A18" : isReached ? "#F5F5F2" : "#111418"}
                                stroke={isCurrent ? "#F5F5F2" : isReached ? "#FF7A18" : "rgba(255,255,255,0.2)"}
                                strokeWidth="2"
                              />
                              <text
                                x={cx}
                                y="33"
                                textAnchor="middle"
                                className="text-[8px] font-mono fill-[#9A9FA8]"
                              >
                                {label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Headline & Overview */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#F5F5F2] tracking-tight">
                      {currentLayer.headline}
                    </h3>
                    <p className="text-sm text-[#9A9FA8] leading-relaxed">
                      {currentLayer.deepDive.overview}
                    </p>
                  </div>

                  {/* Bullet Key Details */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#666C75]">
                      // Technical Signals
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {currentLayer.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[#F5F5F2]/90">
                          <span className="text-[#FF7A18]">›</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand Layer Details CTA */}
                  <div className="pt-4 border-t border-white/8 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setDrawerLayer(currentLayer)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#171B20] hover:bg-white/10 text-xs font-mono text-[#F5F5F2] border border-white/10 transition-colors"
                    >
                      <span>Explore Layer Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF7A18]" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Architecture Drawer */}
      {drawerLayer && (
        <Drawer
          isOpen={!!drawerLayer}
          onClose={() => setDrawerLayer(null)}
          title={drawerLayer.name}
          subtitle={`Layer ${drawerLayer.number} // Architecture`}
          width="lg"
        >
          <div className="space-y-6 text-[#9A9FA8] text-sm sm:text-base leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A18] block font-bold mb-1">
                Core Premise
              </span>
              <p className="text-[#F5F5F2]">
                {drawerLayer.deepDive.overview}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#F5F5F2]">Architectural Focus Areas</h4>
              <ul className="space-y-2 font-mono text-xs sm:text-sm">
                {drawerLayer.deepDive.focusAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#FF7A18] mt-1 font-bold">›</span>
                    <span className="text-[#F5F5F2]/90">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#171B20] border-l-2 border-[#FF7A18] text-xs font-mono text-[#F5F5F2]">
              <span className="text-[#9A9FA8] block mb-1">// Mental Model</span>
              "{drawerLayer.deepDive.mindset}"
            </div>
          </div>
        </Drawer>
      )}
      </div>
    </CinematicSection>
  );
};
