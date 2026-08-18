import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { educationData, achievementsData } from '../../data/achievementsEducation';
import { Award, GraduationCap } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant,
  childItemSlideLeftVariant,
  childItemSlideRightVariant
} from '../ui/CinematicSection';

export const EducationAwards: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="about"
      chapterNumber="08"
      chapterLabel="FOUNDATIONS"
      motionType="foundations"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">08</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">FOUNDATIONS & RECOGNITION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Education & recognition.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            Academic background in computer science and professional milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Column */}
          <motion.div
            className="space-y-4"
            variants={shouldReduceMotion ? undefined : childItemSlideLeftVariant}
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF7A18] uppercase tracking-wider font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundations</span>
            </div>

            <div className="space-y-3">
              {educationData.map((edu, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[#111418] border border-white/6 space-y-2 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#666C75]">{edu.period}</span>
                    <span className="text-xs font-mono font-bold text-[#FF7A18] px-2 py-0.5 rounded bg-white/5">{edu.score}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F5F2]">{edu.degree}</h3>
                  <div className="text-xs font-mono text-[#9A9FA8]">{edu.institution}</div>
                  <p className="text-xs text-[#666C75] pt-1">{edu.highlight}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recognition Column */}
          <motion.div
            className="space-y-4"
            variants={shouldReduceMotion ? undefined : childItemSlideRightVariant}
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF7A18] uppercase tracking-wider font-bold">
              <Award className="w-4 h-4" />
              <span>Honors & Milestones</span>
            </div>

            <div className="space-y-3">
              {achievementsData.map((ach, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111418] border border-white/6 space-y-1.5 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#F5F5F2]">{ach.title}</h3>
                    <span className="text-[10px] font-mono text-[#9A9FA8] px-1.5 py-0.5 rounded bg-white/5 border border-white/8">{ach.tag}</span>
                  </div>
                  <div className="text-xs font-mono text-[#FF7A18]">{ach.organization}</div>
                  <p className="text-xs text-[#9A9FA8] leading-relaxed">{ach.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </CinematicSection>
  );
};
