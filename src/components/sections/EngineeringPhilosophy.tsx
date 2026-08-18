import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  CinematicSection,
  childItemVariant,
  childItemScaleVariant
} from '../ui/CinematicSection';

interface Pillar {
  id: string;
  name: string;
  rule: string;
  context: string;
}

const pillars: Pillar[] = [
  {
    id: 'systems',
    name: 'SYSTEMS',
    rule: 'An API does not exist in isolation. It communicates with networks, databases, caches, and callers.',
    context: 'Designing an endpoint requires anticipating caller behavior, concurrency locks, connection pooling, and downstream storage limits.'
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    rule: 'Performance is not added later. It is designed into the data structure and access pattern.',
    context: 'Profiling query plans, indexing hot-path attributes, and structuring normalized schemas create order-of-magnitude improvements.'
  },
  {
    id: 'reliability',
    name: 'RELIABILITY',
    rule: 'Assume parts of the system will fail. Design so failure is isolated.',
    context: 'Atomic transactions, idempotent API endpoints, and decoupled asynchronous queues prevent cascade failures under pressure.'
  },
  {
    id: 'scale',
    name: 'SCALE',
    rule: 'Do not optimize prematurely. Measure baselines, then optimize where bottlenecks actually appear.',
    context: 'Real bottlenecks rarely match developer intuition. Profile flamegraphs and p95/p99 response latencies before refactoring.'
  },
  {
    id: 'change',
    name: 'CHANGE',
    rule: 'Systems evolve. Clean boundaries allow systems to adapt without complete rewrites.',
    context: 'Explicit API contracts, decoupled service domains, and modular architecture ensure codebase longevity.'
  }
];

export const EngineeringPhilosophy: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('systems');
  const shouldReduceMotion = useReducedMotion();

  const activePillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0];

  const coreSequence = ['UNDERSTAND', 'DESIGN', 'BUILD', 'MEASURE', 'IMPROVE'];

  return (
    <CinematicSection
      id="philosophy"
      chapterNumber="05"
      chapterLabel="PHILOSOPHY"
      motionType="philosophy"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Tag */}
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">05</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">ENGINEERING PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Understand the problem before writing the code.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            First-principles mental models governing system design, database queries, and architectural longevity.
          </p>
        </motion.div>

        {/* Dynamic Philosophy Sequence: UNDERSTAND -> DESIGN -> BUILD -> MEASURE -> IMPROVE */}
        <motion.div
          className="p-5 sm:p-6 rounded-2xl bg-[#111418] border border-white/8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
          variants={shouldReduceMotion ? undefined : childItemScaleVariant}
        >
          <span className="text-[#666C75] uppercase tracking-wider text-[11px] block sm:inline">
            // Core Mental Sequence:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#F5F5F2]">
            {coreSequence.map((item, idx) => (
              <React.Fragment key={item}>
                <span className={item === 'UNDERSTAND' || item === 'BUILD' || item === 'IMPROVE' ? 'text-[#FF7A18]' : 'text-[#9A9FA8]'}>
                  {item}
                </span>
                {idx < coreSequence.length - 1 && (
                  <span className="text-white/20">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Interactive 5 Pillars Selector */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/8 pb-4">
            {pillars.map((pillar) => {
              const isSelected = selectedPillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#FF7A18] text-white shadow-lg shadow-[#FF7A18]/25 scale-105'
                      : 'bg-[#111418] text-[#9A9FA8] hover:text-[#F5F5F2] border border-white/6 hover:border-white/15'
                  }`}
                >
                  {pillar.name}
                </button>
              );
            })}
          </div>

          {/* Active Rule Display Box with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#111418] border border-white/8 space-y-4 relative overflow-hidden"
            >
              <div className="text-[11px] font-mono text-[#FF7A18] uppercase tracking-widest font-bold">
                // Rule of {activePillar.name}
              </div>

              <blockquote className="text-xl sm:text-2xl font-bold text-[#F5F5F2] tracking-tight leading-snug">
                "{activePillar.rule}"
              </blockquote>

              <p className="text-sm sm:text-base text-[#9A9FA8] leading-relaxed pt-2">
                {activePillar.context}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </CinematicSection>
  );
};
