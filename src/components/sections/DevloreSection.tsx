import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { devloreData } from '../../data/achievementsEducation';
import { ArrowUpRight } from 'lucide-react';
import {
  CinematicSection,
  childItemScaleVariant
} from '../ui/CinematicSection';

export const DevloreSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="devlore"
      chapterNumber="08"
      chapterLabel="SIDE INITIATIVE"
      motionType="editorial"
      className="py-24 sm:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          className="p-8 sm:p-12 rounded-3xl bg-[#151E27] border border-white/8 space-y-8"
          variants={shouldReduceMotion ? undefined : childItemScaleVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">08</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">TECHNICAL WRITING & COMMUNITY</span>
          </div>

          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
              DEVLORE<span className="text-[#FF6B53]">.</span>
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#FF6B53] font-mono">
              Learn · Build · Share.
            </p>
            <p className="text-base text-[#C3CBD3] leading-relaxed">
              A technical publication and learning space where I document software mechanics, breakdown backend system designs, and share insights on databases and system architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {devloreData.coreThemes.map((theme, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#0F161E] border border-white/5 font-mono text-xs text-[#C3CBD3] flex items-center gap-2"
              >
                <span className="text-[#FF6B53] font-bold">›</span>
                <span>{theme}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={devloreData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F161E] hover:bg-[#1B2630] text-sm font-semibold text-[#FFFFFF] border border-[#E25B45]/40 hover:border-[#FF6B53] transition-all group"
            >
              <span>Visit DEVLORE ({devloreData.handle})</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF6B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </CinematicSection>
  );
};
