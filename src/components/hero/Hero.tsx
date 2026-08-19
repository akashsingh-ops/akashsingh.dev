import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FileText, ArrowDown } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';
import { HeroPortrait } from './HeroPortrait';

interface HeroProps {
  onOpenTerminal: () => void;
}

const customEase = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll transformation on hero
  const heroY = useTransform(scrollY, [0, 600], [0, -45]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);

  return (
    <motion.section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden"
      style={
        shouldReduceMotion
          ? {}
          : {
              y: heroY,
              opacity: heroOpacity,
            }
      }
    >
      {/* Abstract Background Atmospheric Glow */}
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#FF6B53]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[360px] h-[360px] bg-[#E25B45]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative Large Geometric Engineering Marks */}
      <div className="absolute top-20 left-4 sm:left-10 text-6xl sm:text-8xl font-thin text-white/[0.03] select-none font-mono pointer-events-none">
        &lt;
      </div>
      <div className="absolute bottom-16 right-4 sm:right-12 text-6xl sm:text-8xl font-thin text-white/[0.03] select-none font-mono pointer-events-none">
        &gt;
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT CONTENT AREA: 58-60% */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8 z-10 order-2 lg:order-1">
            
            {/* 1. Small Intro: Hello. + Thin Coral Horizontal Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: customEase, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm sm:text-base font-semibold text-[#FFFFFF] tracking-wide">
                Hello.
              </span>
              <div className="h-[2px] w-12 sm:w-16 bg-[#FF6B53] rounded-full" />
            </motion.div>

            {/* 2. Main Identity Headline */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: customEase, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C3CBD3] tracking-tight"
              >
                I'm Akash
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: customEase, delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]"
              >
                Backend Software Engineer<span className="text-[#FF6B53]">.</span>
              </motion.h1>
            </div>

            {/* 3. Understated Personal Brand Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: customEase, delay: 0.4 }}
              className="font-mono text-[11px] sm:text-xs text-[#7E8994] tracking-wider uppercase"
            >
              BASED IN INDIA · BACKEND · SYSTEMS · DATA
            </motion.div>

            {/* 4. Supporting Statement */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: customEase, delay: 0.5 }}
              className="text-lg sm:text-xl text-[#C3CBD3] max-w-xl leading-relaxed font-normal"
            >
              I build backend systems, optimize how they work, and turn real problems into useful products.
            </motion.p>

            {/* 5. Hero Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: customEase, delay: 0.6 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              {/* Primary CTA: Solid Coral #FF6B53 */}
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF6B53] hover:bg-[#FF7A63] text-[#0F161E] font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#FF6B53]/20 hover:-translate-y-0.5 active:scale-98"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA: Transparent / Subtle Border #E25B45 */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Akash Singh's resume — opens in a new tab"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-[#FFFFFF] border border-[#E25B45]/50 hover:border-[#FF6B53] text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-[#C3CBD3] group-hover:text-[#FF6B53] transition-colors" />
                <span>View Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7E8994] group-hover:text-[#FF6B53] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PORTRAIT AREA: 40-42% */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10 order-1 lg:order-2">
            <HeroPortrait onOpenTerminal={onOpenTerminal} />
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SCROLL INDICATOR: SCROLL TO EXPLORE with thin animated line */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-8 flex items-center justify-between text-xs font-mono text-[#7E8994]"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 sm:w-12 h-[1px] bg-white/10 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-4 bg-[#FF6B53] animate-pulse" />
          </div>
          <span className="tracking-widest uppercase text-[10px] sm:text-xs text-[#7E8994]">
            SCROLL TO EXPLORE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#7E8994]">
          <span className="text-[#FF6B53]">•</span>
          <span>SYSTEMS & APIS</span>
        </div>
      </motion.div>
    </motion.section>
  );
};
