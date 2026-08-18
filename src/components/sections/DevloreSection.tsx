import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { devloreData } from '../../data/achievementsEducation';
import { ArrowUpRight } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant,
  childItemScaleVariant
} from '../ui/CinematicSection';

export const DevloreSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="devlore"
      chapterNumber="07"
      chapterLabel="SIDE INITIATIVE"
      motionType="editorial"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          className="p-8 sm:p-12 rounded-2xl bg-[#111418] border border-white/8 space-y-6"
          variants={shouldReduceMotion ? undefined : childItemScaleVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">07</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">SIDE INITIATIVE</span>
          </div>

          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              DEVLORE
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#FF7A18] font-mono">
              Learn · Build · Share.
            </p>
            <p className="text-base text-[#9A9FA8] leading-relaxed">
              A technical publication and learning space where I document software mechanics, breakdown backend system designs, and share insights on databases and system architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {devloreData.coreThemes.map((theme, i) => (
              <motion.div
                key={i}
                variants={shouldReduceMotion ? undefined : childItemVariant}
                className="p-3 rounded-lg bg-[#0B0D0F] border border-white/5 font-mono text-xs text-[#9A9FA8] flex items-center gap-2"
              >
                <span className="text-[#FF7A18]">›</span>
                <span>{theme}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <a
              href={devloreData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#171B20] hover:bg-white/10 text-sm font-medium text-[#F5F5F2] border border-white/10 transition-colors group"
            >
              <span>Visit DEVLORE ({devloreData.handle})</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF7A18] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </CinematicSection>
  );
};
