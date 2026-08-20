import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { projectsData, ProjectExtended } from '../../data/projects';
import { Modal } from '../ui/Modal';
import { MimasaAiDiagram } from './MimasaAiDiagram';
import { OceanMotionDiagram } from './OceanMotionDiagram';
import { GeekSearchDiagram } from './GeekSearchDiagram';
import { EazEaeDiagram } from './EazEaeDiagram';
import {
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

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
  const currentIndex = projectsData.findIndex((p) => p.id === currentProject.id);

  return (
    <CinematicSection
      id="work"
      chapterNumber="03"
      chapterLabel="SELECTED WORK"
      motionType="aperture"
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: SELECTED WORK */}
        {/* ========================================================================= */}
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">03</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">SELECTED WORK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
            Selected Work<span className="text-[#FF6B53]">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#C3CBD3] leading-relaxed">
            Systems I've built, improved, and learned from.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* CLEAN 4-PROJECT SELECTOR TABS: MIMASA AI, GEEK-SEARCH, OCEANMOTION, EAZEAE */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#7E8994] pb-2 border-b border-white/8">
            <span className="uppercase tracking-widest text-[#FF6B53] font-bold">// Project Index</span>
            <span>Select project to view technical architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {projectsData.map((project, idx) => {
              const isSelected = selectedProjectId === project.id;
              const formattedNum = `0${idx + 1}`;

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id as ProjectId)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 relative group ${
                    isSelected
                      ? 'bg-[#151E27] border border-[#FF6B53]/60 shadow-xl shadow-[#FF6B53]/5 -translate-y-0.5'
                      : 'bg-[#151E27]/30 hover:bg-[#151E27]/70 border border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                      {formattedNum} /
                    </span>
                    {project.company && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#C3CBD3]">
                        {project.company}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-extrabold text-sm sm:text-base tracking-tight mb-1 ${isSelected ? 'text-[#FFFFFF]' : 'text-[#C3CBD3]'}`}>
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#7E8994] line-clamp-1">
                    {project.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE PROJECT SHOWCASE */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Project Overview Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#151E27] border border-white/8 space-y-8 relative overflow-hidden">
              
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-[#FF6B53]">
                    0{currentIndex + 1} /
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                    {currentProject.title}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {currentProject.role && currentProject.role.length > 0 && (
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0F161E] border border-white/10 text-[#C3CBD3]">
                      Role: {currentProject.role[0]}
                    </span>
                  )}

                  {currentProject.externalLink && (
                    <a
                      href={currentProject.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${currentProject.externalLink.label} for ${currentProject.title} — opens in a new tab`}
                      className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F161E] hover:bg-[#1B2630] border border-[#FF6B53]/35 hover:border-[#FF6B53] text-xs font-mono text-[#FFFFFF] hover:text-[#FF6B53] transition-all duration-200 focus:outline-none"
                    >
                      <span>{currentProject.externalLink.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  )}

                  <button
                    onClick={() => setInternalModalProject(currentProject.id as ProjectId)}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B53] hover:bg-[#FF7A63] text-[#0F161E] font-bold text-xs tracking-wide transition-all shadow-md"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Tagline & Core Problem Statement */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <h4 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                    {currentProject.tagline}
                  </h4>
                  <p className="text-base sm:text-lg text-[#C3CBD3] leading-relaxed">
                    {currentProject.personalContext || currentProject.problem}
                  </p>

                  {/* Honesty note / collaboration callout for Mimasa AI */}
                  {currentProject.id === 'mimasa-ai' && (
                    <div className="p-4 rounded-xl bg-[#0F161E] border border-[#E25B45]/30 text-xs font-mono text-[#C3CBD3] space-y-1">
                      <span className="text-[#FF6B53] font-bold block">// Cross-Functional Team Support:</span>
                      <p>
                        Worked closely with the GenAI and Data Science teams at Xaigi Technology, providing backend architecture and frontend engineering support for data integration, tenant isolation, and search latency optimization.
                      </p>
                    </div>
                  )}

                  {/* Metrics Bar */}
                  {currentProject.metrics && currentProject.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {currentProject.metrics.map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 space-y-1">
                          <div className="text-base sm:text-lg font-mono font-bold text-[#FF6B53]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[#7E8994] font-medium leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-[#0F161E] border border-white/6 space-y-3">
                    <span className="text-xs font-mono text-[#7E8994] uppercase tracking-wider block">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#151E27] border border-[#E25B45]/20 text-xs font-mono text-[#FFFFFF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Diagram Container */}
              <div className="pt-4 border-t border-white/8">
                {currentProject.id === 'mimasa-ai' && <MimasaAiDiagram />}
                {currentProject.id === 'oceanmotion' && <OceanMotionDiagram />}
                {currentProject.id === 'geek-search' && <GeekSearchDiagram />}
                {currentProject.id === 'eazeae' && <EazEaeDiagram />}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ========================================================================= */}
      {/* DEEP TECHNICAL CASE STUDY MODAL */}
      {/* ========================================================================= */}
      {activeModalProject && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={`Case Study // ${projectsData.find(p => p.id === activeModalProject)?.title}`}
        >
          {(() => {
            const proj = projectsData.find(p => p.id === activeModalProject);
            if (!proj) return null;
            const pIdx = projectsData.findIndex(p => p.id === proj.id);

            return (
              <div className="space-y-8 text-[#C3CBD3] text-sm sm:text-base leading-relaxed">
                
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] font-bold">
                      <span>0{pIdx + 1}</span>
                      <span>/</span>
                      <span>{proj.company || 'ENGINEERING INITIATIVE'}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                      {proj.title}
                    </h3>
                    <p className="text-base text-[#C3CBD3]">
                      {proj.tagline}
                    </p>
                  </div>

                  {proj.externalLink && (
                    <a
                      href={proj.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F161E] hover:bg-[#1B2630] border border-[#FF6B53]/40 hover:border-[#FF6B53] text-xs font-mono text-[#FFFFFF] hover:text-[#FF6B53] transition-all duration-200 shrink-0 focus:outline-none"
                    >
                      <span>{proj.externalLink.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  )}
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                    01. THE PROBLEM
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C3CBD3]">
                    {proj.story?.problemStatement || proj.problem || proj.personalContext}
                  </p>
                </div>

                {/* Technical Architecture */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                    02. ARCHITECTURE & IMPLEMENTATION
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C3CBD3]">
                    {proj.solution || 'Implemented robust backend API contracts, normalized schemas, and fine-grained data access layers.'}
                  </p>
                </div>

                {/* Key Lessons / Outcome */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                    03. MEASURED IMPACT
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {proj.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#151E27] border border-white/6">
                        <div className="text-base font-mono font-bold text-[#FF6B53]">{m.value}</div>
                        <div className="text-xs text-[#7E8994]">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#7E8994]">
                  {proj.externalLink ? (
                    <a
                      href={proj.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[#C3CBD3] hover:text-[#FF6B53] transition-colors"
                    >
                      <span>{proj.externalLink.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span>Akash Singh · Engineering Case Study</span>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="text-[#FF6B53] font-bold hover:underline ml-auto"
                  >
                    Close Case Study ✕
                  </button>
                </div>

              </div>
            );
          })()}
        </Modal>
      )}
    </CinematicSection>
  );
};
