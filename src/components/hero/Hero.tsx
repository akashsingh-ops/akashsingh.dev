import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, FileText } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';
import { SystemCanvas } from './SystemCanvas';

interface HeroProps {
  onOpenTerminal: () => void;
}

const customEase = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll exit transforms
  const heroY = useTransform(scrollY, [0, 600], [0, -50]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.65]);

  return (
    <motion.section
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
      id="hero"
      style={
        shouldReduceMotion
          ? {}
          : {
              y: heroY,
              scale: heroScale,
              opacity: heroOpacity,
            }
      }
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">
        {/* Editorial Top Title */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {/* Step 1: Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEase, delay: 0.05 }}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9A9FA8]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18]" />
            <span>PORTFOLIO // AKASH SINGH</span>
          </motion.div>

          <div className="space-y-4">
            {/* Step 2: Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: customEase, delay: 0.15 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F5F5F2] tracking-tight leading-[1.08]"
            >
              Akash Singh
            </motion.h1>

            {/* Step 3: Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: customEase, delay: 0.25 }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#9A9FA8] tracking-tight leading-snug"
            >
              Backend Software Engineer building systems behind the interface.
            </motion.p>
          </div>

          {/* Step 4: Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase, delay: 0.35 }}
            className="text-base sm:text-lg text-[#F5F5F2]/80 max-w-2xl leading-relaxed font-normal"
          >
            {profileData.tagline}
          </motion.p>

          {/* Step 4.5: Minimal Tech Signals */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEase, delay: 0.45 }}
            className="pt-1 font-mono text-xs text-[#666C75]"
          >
            Python · Django · Databases · Systems · Automation · AI
          </motion.div>

          {/* Step 5: Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEase, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
          >
            {/* Priority 1: Primary Action */}
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF7A18] hover:bg-[#FF8B33] text-[#F5F5F2] font-semibold text-sm tracking-wide transition-all shadow-lg shadow-[#FF7A18]/20 active:scale-95 hover:-translate-y-0.5"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* Priority 2: View Resume with subtle hover micro-interaction */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#171B20] hover:bg-[#1E232A] text-[#F5F5F2] hover:text-white border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/50"
            >
              <FileText className="w-4 h-4 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-all duration-200 group-hover:-translate-y-0.5" />
              <span>View Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Priority 3: GitHub Link */}
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in a new tab)"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 text-[#9A9FA8] hover:text-[#F5F5F2] border border-transparent hover:border-white/10 text-sm font-medium transition-all duration-200"
            >
              <Github className="w-4 h-4 text-[#9A9FA8]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#666C75]" />
            </a>
          </motion.div>
        </div>

        {/* Step 6: System Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: customEase, delay: 0.65 }}
          className="space-y-3"
        >
          <SystemCanvas />
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center justify-center pt-16 sm:pt-20 text-[#666C75] text-xs font-mono gap-2"
        >
          <span className="uppercase tracking-widest text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </div>
    </motion.section>
  );
};
