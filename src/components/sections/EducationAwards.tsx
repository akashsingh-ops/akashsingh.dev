import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { educationData, achievementsData } from '../../data/achievementsEducation';
import { Award, GraduationCap } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

export const EducationAwards: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="foundations"
      chapterNumber="09"
      chapterLabel="FOUNDATIONS"
      motionType="foundations"
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">09</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">FOUNDATIONS & RECOGNITION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
            Education & Honors<span className="text-[#FF6B53]">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#C3CBD3] leading-relaxed">
            Academic background in computer science and professional engineering milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] uppercase tracking-wider font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundations</span>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#151E27] border border-white/8 space-y-2 hover:border-[#FF6B53]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#7E8994]">{edu.period}</span>
                    <span className="text-xs font-mono font-bold text-[#FF6B53] px-2 py-0.5 rounded bg-white/5">{edu.score}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">{edu.degree}</h3>
                  <div className="text-xs font-mono text-[#C3CBD3]">{edu.institution}</div>
                  <p className="text-xs text-[#7E8994] pt-1">{edu.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recognition Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] uppercase tracking-wider font-bold">
              <Award className="w-4 h-4" />
              <span>Honors & Milestones</span>
            </div>

            <div className="space-y-4">
              {achievementsData.map((ach, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#151E27] border border-white/8 space-y-2 hover:border-[#FF6B53]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-[#FFFFFF]">{ach.title}</h3>
                    <span className="text-[10px] font-mono text-[#C3CBD3] px-2 py-0.5 rounded bg-white/5 border border-white/8">{ach.tag}</span>
                  </div>
                  <div className="text-xs font-mono text-[#FF6B53]">{ach.organization}</div>
                  <p className="text-xs text-[#C3CBD3] leading-relaxed">{ach.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
};
