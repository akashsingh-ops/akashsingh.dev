import React, { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Modal } from '../ui/Modal';
import { CountUp } from '../ui/CountUp';
import { ArrowUpRight, Github, ArrowRight, CheckCircle2, ShieldCheck, Zap, Users, Code, QrCode } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant,
  childItemScaleVariant,
  childItemSlideLeftVariant,
  childItemSlideRightVariant
} from '../ui/CinematicSection';

const customEase = [0.22, 1, 0.36, 1] as const;

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<'geek-search' | 'eazeae' | null>(null);
  const [activeGeekStep, setActiveGeekStep] = useState<number>(1);
  const [activeEazEaeStep, setActiveEazEaeStep] = useState<number>(1);

  const shouldReduceMotion = useReducedMotion();
  const geekRef = useRef<HTMLDivElement>(null);
  const eazRef = useRef<HTMLDivElement>(null);

  const isGeekInView = useInView(geekRef, { margin: '-100px', once: false });
  const isEazInView = useInView(eazRef, { margin: '-100px', once: false });

  return (
    <CinematicSection
      id="work"
      chapterNumber="03"
      chapterLabel="SELECTED WORK"
      motionType="aperture"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-28 sm:space-y-36">
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">03</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">SELECTED WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Turning real problems into dependable software.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            Case studies grounded in actual user friction, database performance tuning, and scalable architecture.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* PROJECT 1: GEEK-SEARCH (Subtle slide from left: translateX(-30px)) */}
        {/* ========================================================================= */}
        <motion.div
          ref={geekRef}
          className="space-y-8 p-6 sm:p-8 rounded-3xl bg-[#111418]/40 border border-white/6 hover:border-white/15 transition-all duration-300"
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -35 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : isGeekInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -25 }
          }
          transition={{ duration: 0.7, ease: customEase }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF7A18] font-bold">
              01 // PLATFORM
            </span>
            <span className="text-xs font-mono text-[#666C75]">
              Frontend & Database Architecture
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              Geek-Search
            </h3>
            <p className="text-lg sm:text-xl font-medium text-[#9A9FA8] max-w-3xl">
              Placement & Competitive Coding Platform built to help students access opportunities beyond the traditional curriculum.
            </p>
          </div>

          {/* Key Facts Strip with Animated Count-Up */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-4 border-y border-white/8 font-mono text-sm">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#F5F5F2] block">
                <CountUp end={1000} suffix="+" duration={1.5} />
              </span>
              <span className="text-xs text-[#666C75]">Students Engaged</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#F5F5F2] block">
                <CountUp end={10000} suffix="+" duration={1.8} />
              </span>
              <span className="text-xs text-[#666C75]">Code Submissions</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#FF7A18] block">
                <CountUp end={40} prefix="~" suffix="%" duration={1.6} />
              </span>
              <span className="text-xs text-[#666C75]">Latency Reduction</span>
            </div>
          </div>

          {/* Minimal Interactive 3-Node Flow */}
          <div className="p-6 rounded-2xl bg-[#111418] border border-white/8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#666C75] flex items-center justify-between">
              <span>// Architecture Pipeline</span>
              <span className="text-[11px] text-[#9A9FA8]">Click step to inspect</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: '01', title: 'SUBMISSION', stat: '10,000+ submissions', detail: 'Algorithmic contest code captured at frontend edge' },
                { step: '02', title: 'PROCESS', stat: 'Frontend + Database', detail: 'Structured submission processing & schema optimization' },
                { step: '03', title: 'LEADERBOARD', stat: '~40% speedup', detail: 'Low-latency ranked student contest standings' }
              ].map((item, idx) => {
                const isSelected = activeGeekStep === idx;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveGeekStep(idx)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#171B20] border-[#FF7A18]/50 shadow-lg shadow-[#FF7A18]/5'
                        : 'bg-[#0B0D0F] border-white/6 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[#666C75]">{item.step}</span>
                      <span className="text-xs font-mono font-bold text-[#FF7A18]">{item.stat}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#F5F5F2] font-mono mb-1">{item.title}</h4>
                    <p className="text-xs text-[#9A9FA8] leading-snug">{item.detail}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModalProject('geek-search')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#171B20] hover:bg-white/10 text-sm font-medium text-[#F5F5F2] border border-white/10 transition-colors"
            >
              <span>Explore case study</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF7A18]" />
            </button>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* PROJECT 2: EAZEAE (Subtle slide from right: translateX(30px)) */}
        {/* ========================================================================= */}
        <motion.div
          ref={eazRef}
          className="space-y-8 pt-12 border-t border-white/8 p-6 sm:p-8 rounded-3xl bg-[#111418]/40 border border-white/6 hover:border-white/15 transition-all duration-300"
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 35 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : isEazInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 25 }
          }
          transition={{ duration: 0.7, ease: customEase }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF7A18] font-bold">
              02 // MOBILITY & ACCESS
            </span>
            <span className="text-xs font-mono text-[#666C75]">
              Full-Stack & Backend Systems
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              EazEae
            </h3>
            <p className="text-lg sm:text-xl font-medium text-[#9A9FA8] max-w-3xl">
              Digital tourism platform using a QR-based approach to make visitor entry and site information more accessible.
            </p>
          </div>

          {/* Key Facts Strip with Animated Count-Up */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-4 border-y border-white/8 font-mono text-sm">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#F5F5F2] block">
                <CountUp end={500} suffix="+" duration={1.5} />
              </span>
              <span className="text-xs text-[#666C75]">Daily Requests</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#FF7A18] block">
                <CountUp end={75} prefix="~" suffix="%" duration={1.6} />
              </span>
              <span className="text-xs text-[#666C75]">Faster Responses</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#F5F5F2] block">
                <CountUp end={100} suffix="%" duration={1.4} />
              </span>
              <span className="text-xs text-[#666C75]">Duplicate Prevention</span>
            </div>
          </div>

          {/* Minimal Interactive QR Flow: SCAN -> VALIDATE -> ENTRY */}
          <div className="p-6 rounded-2xl bg-[#111418] border border-white/8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#666C75] flex items-center justify-between">
              <span>// Gate Validation Flow</span>
              <span className="text-[11px] text-[#9A9FA8]">Click step to inspect</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: '01', title: 'SCAN', stat: 'QR Interface', detail: 'Visitor presents encrypted digital token at regional heritage gate' },
                { step: '02', title: 'VALIDATE', stat: '<50ms Lookup', detail: 'Concurrent token validation & query indexing to verify access' },
                { step: '03', title: 'ENTRY', stat: 'Atomic Commit', detail: 'Zero duplicate entries with instant site check-in' }
              ].map((item, idx) => {
                const isSelected = activeEazEaeStep === idx;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveEazEaeStep(idx)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#171B20] border-[#FF7A18]/50 shadow-lg shadow-[#FF7A18]/5'
                        : 'bg-[#0B0D0F] border-white/6 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[#666C75]">{item.step}</span>
                      <span className="text-xs font-mono font-bold text-[#FF7A18]">{item.stat}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#F5F5F2] font-mono mb-1">{item.title}</h4>
                    <p className="text-xs text-[#9A9FA8] leading-snug">{item.detail}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Triggers */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveModalProject('eazeae')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#171B20] hover:bg-white/10 text-sm font-medium text-[#F5F5F2] border border-white/10 transition-colors"
            >
              <span>Explore case study</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF7A18]" />
            </button>

            <a
              href="https://github.com/akashsingh-ops/EazEae_MajorProject"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-white/5 text-xs font-mono text-[#9A9FA8] hover:text-[#F5F5F2] border border-white/8 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ArrowUpRight className="w-3 h-3 text-[#666C75]" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY MODAL: GEEK-SEARCH */}
      {/* ========================================================================= */}
      {activeModalProject === 'geek-search' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModalProject(null)}
          title="Geek-Search Case Study"
          subtitle="Placement & Coding Platform"
          maxWidth="2xl"
        >
          <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-1">
              <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold">
                Origin & Context
              </span>
              <p className="text-[#F5F5F2]">
                Akash noticed students spending college primarily on traditional curriculum with limited exposure to placement preparation, coding contests, and industry opportunities. Geek-Search was created to bridge this gap.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">The Problem</h4>
              <p>
                Students outside major tier-1 hubs lacked structured tracking for coding contests, transparent leaderboards, and organized placement roadmaps.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#F5F5F2]">Build & Contribution</h4>
              <p>
                Akash contributed across frontend development and database architecture, structuring queries and state management so students could submit code and track live rankings seamlessly during active campus coding contests.
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
          onClose={() => setActiveModalProject(null)}
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
