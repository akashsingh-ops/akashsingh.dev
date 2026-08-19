import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Drawer } from '../ui/Drawer';
import { ArrowRight, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

const timelineSteps = [
  {
    id: 'curious',
    label: 'CURIOUS',
    period: 'Early Years',
    short: 'Wondering what happens beneath everyday mechanisms and devices.',
    detail: 'Growing up around Agra in a small-town setting, I spent hours taking things apart to understand how gears turned, signals flowed, and components interacted.'
  },
  {
    id: 'builder',
    label: 'BUILDER',
    period: 'Discovery',
    short: 'Writing early programs and discovering digital craftsmanship.',
    detail: 'Software provided an immediate sandbox where logic became functional reality without physical manufacturing constraints.'
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    period: 'Visual Craft',
    short: 'Building interfaces, state flows, and user interactions.',
    detail: 'Mastering DOM cycles, UI states, and user intent taught me how crucial it is for backend APIs to provide clear, resilient contracts.'
  },
  {
    id: 'backend',
    label: 'BACKEND',
    period: 'Core Focus',
    short: 'REST APIs, relational data, and server architecture in Python/Django.',
    detail: 'Diving deep into Django, DRF, Celery workers, and server lifecycles to design high-throughput services that handle heavy production traffic.'
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    period: 'Scale & Graphs',
    short: 'Neo4j graph modeling, multi-tenant RBAC, and query tuning.',
    detail: 'Optimizing 35+ Cypher queries, eliminating nested permission anomalies in OceanMotion, and architecting multi-tenant databases.'
  },
  {
    id: 'ai',
    label: 'AI',
    period: 'Next Frontier',
    short: 'Contextual retrieval, RAG, and agentic operational workflows.',
    detail: 'Collaborating closely with GenAI and Data Science teams on Mimasa AI, exploring knowledge graph augmented generation and data automation.'
  }
];

export const CuriousOrigin: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Backend active by default
  const [storyDrawerOpen, setStoryDrawerOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="about"
      chapterNumber="01"
      chapterLabel="ORIGINS"
      motionType="origin"
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: LARGE EDITORIAL TYPOGRAPHY & SHORT STORY */}
          {/* ========================================================================= */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            variants={shouldReduceMotion ? undefined : childItemVariant}
          >
            {/* Chapter Marker */}
            <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
              <span className="text-[#FF6B53] font-bold">01</span>
              <span className="text-white/20">/</span>
              <span className="uppercase tracking-widest">PERSONAL STORY</span>
            </div>

            {/* Large Heading */}
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
                From curiosity<br />
                to systems<span className="text-[#FF6B53]">.</span>
              </h2>

              <p className="text-lg sm:text-xl font-medium text-[#C3CBD3] tracking-tight">
                Understanding the system, not just writing the code.
              </p>
            </div>

            {/* Short Editorial Story */}
            <div className="space-y-4 text-base sm:text-lg text-[#7E8994] leading-relaxed max-w-xl">
              <p>
                I grew up around Agra in a small-town environment. From an early age, I was curious about how things worked and wanted to become an engineer.
              </p>
              <p className="text-[#C3CBD3]">
                Software gave me a way to turn ideas into things people could actually use.
              </p>
            </div>

            {/* Read My Story CTA */}
            <div className="pt-2">
              <button
                onClick={() => setStoryDrawerOpen(true)}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#151E27] hover:bg-[#1B2630] text-[#FFFFFF] border border-[#E25B45]/40 hover:border-[#FF6B53] text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5"
              >
                <span>Read My Story</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B53] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT: EDITORIAL VERTICAL TIMELINE */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#7E8994] flex items-center justify-between pb-2 border-b border-white/8">
              <span>// The Evolution</span>
              <span className="text-[11px] text-[#FF6B53]">Interactive Milestones</span>
            </div>

            <div className="relative pl-6 space-y-4 border-l border-white/10">
              {timelineSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'bg-[#151E27] border border-[#FF6B53]/50 shadow-xl shadow-[#FF6B53]/5 -translate-y-0.5'
                        : 'bg-[#151E27]/40 hover:bg-[#151E27]/80 border border-white/5 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Active Point Circle Indicator on the left line */}
                    <div
                      className={`absolute -left-[31px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#FF6B53] border-[#0F161E] scale-125 shadow-[0_0_8px_rgba(255,107,83,0.8)]'
                          : 'bg-[#151E27] border-white/20'
                      }`}
                    />

                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                          0{idx + 1}
                        </span>
                        <span className={`text-sm sm:text-base font-bold tracking-tight ${isActive ? 'text-[#FFFFFF]' : 'text-[#C3CBD3]'}`}>
                          {step.label}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-[#7E8994]">
                        {step.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#C3CBD3] leading-relaxed">
                      {step.short}
                    </p>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-3 mt-3 border-t border-white/8 text-xs text-[#7E8994] leading-relaxed"
                      >
                        {step.detail}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* DEEP DIVE STORY DRAWER */}
      {/* ========================================================================= */}
      <Drawer
        isOpen={storyDrawerOpen}
        onClose={() => setStoryDrawerOpen(false)}
        title="Personal Story // Akash Singh"
      >
        <div className="space-y-8 text-[#C3CBD3] text-sm sm:text-base leading-relaxed font-sans">
          
          <div className="space-y-3 pb-6 border-b border-white/8">
            <span className="text-xs font-mono text-[#FF6B53] font-bold uppercase tracking-widest">
              From Curiosity to Systems
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
              Understanding how things work beneath the surface.
            </h3>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFFFFF] uppercase tracking-wider font-mono text-xs">
              01. The Early Sandbox
            </h4>
            <p>
              Growing up around Agra, technology was not an abstract digital service—it was physical machinery, circuits, and questions. I wanted to understand how components communicated, why bottlenecks formed, and how things could be engineered to work better.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFFFFF] uppercase tracking-wider font-mono text-xs">
              02. Transitioning to Behind the Interface
            </h4>
            <p>
              When I started programming, I built frontend interfaces first. But quickly, I found myself drawn to what happens after the click: the HTTP payload, the serialization layer, the query planner, database indexing, and asynchronous workers.
            </p>
            <p>
              That passion led me directly to backend engineering, database modeling (Neo4j Cypher and SQL), and high-throughput API architecture at Xaigi Technology and Dell Technologies.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFFFFF] uppercase tracking-wider font-mono text-xs">
              03. The Core Approach
            </h4>
            <p>
              Whether tuning 35+ Cypher queries for a 30–40% speedup in OceanMotion, implementing sub-100ms intelligent search in Mimasa AI, or automating ETL data pipelines in Amazon Redshift, my philosophy remains constant:
            </p>
            <div className="p-4 rounded-xl bg-[#151E27] border border-[#FF6B53]/30 text-[#FFFFFF] font-mono text-xs sm:text-sm">
              &gt; "Understand the problem deeply. Measure the real bottlenecks. Build the cleanest, most reliable solution."
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/8 text-xs font-mono text-[#7E8994]">
            <span>Agra → Engineering → Systems</span>
            <button
              onClick={() => setStoryDrawerOpen(false)}
              className="text-[#FF6B53] font-bold hover:underline"
            >
              Close Drawer ✕
            </button>
          </div>

        </div>
      </Drawer>
    </CinematicSection>
  );
};
