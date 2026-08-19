import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CinematicSection,
  childItemVariant
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
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">05</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">ENGINEERING PHILOSOPHY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
            Understand the problem<br />
            before writing code<span className="text-[#FF6B53]">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#C3CBD3] leading-relaxed">
            First-principles mental models governing system design, database queries, and architectural longevity.
          </p>
        </motion.div>

        {/* Dynamic Philosophy Sequence: UNDERSTAND -> DESIGN -> BUILD -> MEASURE -> IMPROVE */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151E27] border border-white/8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <span className="text-[#7E8994] uppercase tracking-wider text-[11px]">
            // Core Mental Sequence:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#FFFFFF]">
            {coreSequence.map((item, idx) => (
              <React.Fragment key={item}>
                <span className={item === 'UNDERSTAND' || item === 'BUILD' || item === 'IMPROVE' ? 'text-[#FF6B53]' : 'text-[#C3CBD3]'}>
                  {item}
                </span>
                {idx < coreSequence.length - 1 && (
                  <span className="text-[#7E8994]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Interactive Philosophy Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pillar Selector Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {pillars.map((pillar) => {
              const isSelected = selectedPillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`w-full p-4 rounded-xl text-left font-mono text-xs font-bold transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#151E27] text-[#FF6B53] border border-[#FF6B53]/50 shadow-md'
                      : 'bg-[#151E27]/30 text-[#7E8994] hover:text-[#FFFFFF] hover:bg-[#151E27]/60 border border-white/5'
                  }`}
                >
                  <span>{pillar.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B53]" />}
                </button>
              );
            })}
          </div>

          {/* Active Pillar Statement */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#151E27] border border-white/8 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#FF6B53] font-bold uppercase tracking-widest">
                Principle // {activePillar.name}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight leading-snug">
                "{activePillar.rule}"
              </h3>
            </div>

            <p className="text-base text-[#C3CBD3] leading-relaxed pt-2 border-t border-white/8">
              {activePillar.context}
            </p>
          </div>

        </div>

      </div>
    </CinematicSection>
  );
};
