import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profileData } from '../../data/profile';
import { Drawer } from '../ui/Drawer';
import { ArrowRight } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant,
  childItemScaleVariant,
  childItemSlideLeftVariant
} from '../ui/CinematicSection';

const customEase = [0.22, 1, 0.36, 1] as const;

export const CuriousOrigin: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [storyDrawerOpen, setStoryDrawerOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { label: 'IDEA', detail: 'A question: how does this work behind the screen?' },
    { label: 'CODE', detail: 'Writing logic to translate thoughts into runnable functions.' },
    { label: 'SYSTEM', detail: 'Orchestrating APIs, databases, caches, and queues.' },
    { label: 'REAL WORLD', detail: 'Delivering reliable tools that solve actual problems for people.' }
  ];

  return (
    <CinematicSection
      id="curious"
      chapterNumber="01"
      chapterLabel="ORIGINS"
      motionType="origin"
      className="py-24 sm:py-36"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: 01 / CURIOUS (slides in from left) */}
          <motion.div
            className="md:col-span-4 space-y-2"
            variants={shouldReduceMotion ? undefined : childItemSlideLeftVariant}
          >
            <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-black text-white/10 tracking-tighter select-none">
              01
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#FF7A18] font-bold">
              CURIOUS
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative + Interactive Morph */}
          <div className="md:col-span-8 space-y-8">
            {/* Headline */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight"
              variants={shouldReduceMotion ? undefined : childItemVariant}
            >
              From curiosity to systems.
            </motion.h2>

            {/* Description */}
            <motion.div
              className="space-y-4 text-base sm:text-lg text-[#9A9FA8] leading-relaxed"
              variants={shouldReduceMotion ? undefined : childItemVariant}
            >
              <p>
                I grew up around Agra and was curious about how things worked long before I knew what software engineering would become.
              </p>
              <p className="text-[#F5F5F2]">
                Software gave me a way to turn ideas into things people could actually use.
              </p>
            </motion.div>

            {/* Interactive Step Morph: IDEA -> CODE -> SYSTEM -> REAL WORLD */}
            <motion.div
              className="p-6 rounded-2xl bg-[#111418] border border-white/8 space-y-4 relative overflow-hidden"
              variants={shouldReduceMotion ? undefined : childItemScaleVariant}
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#666C75]">
                <span>// The Progression</span>
                <span className="text-[10px] text-[#9A9FA8]">Interactive Flow</span>
              </div>

              {/* Steps selection bar */}
              <div className="relative pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
                  {steps.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <button
                        key={step.label}
                        onClick={() => setActiveStep(idx)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 relative group ${
                          isActive
                            ? 'bg-[#171B20] border-[#FF7A18]/60 text-[#F5F5F2] shadow-md shadow-[#FF7A18]/10 -translate-y-0.5'
                            : 'bg-[#0B0D0F] border-white/5 text-[#9A9FA8] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-[#666C75]">
                            0{idx + 1}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18]" />
                          )}
                        </div>
                        <div
                          className={`font-mono text-xs font-bold transition-colors ${
                            isActive ? 'text-[#FF7A18]' : 'text-[#F5F5F2]'
                          }`}
                        >
                          {step.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-lg bg-[#0B0D0F] border border-white/5 font-mono text-xs text-[#9A9FA8] min-h-[44px] flex items-center"
              >
                <span className="text-[#FF7A18] mr-2 font-bold">›</span>
                <span className="text-[#F5F5F2]/90">{steps[activeStep].detail}</span>
              </motion.div>
            </motion.div>

            {/* Progressive Disclosure CTA */}
            <motion.div
              variants={shouldReduceMotion ? undefined : childItemVariant}
            >
              <button
                onClick={() => setStoryDrawerOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#FF7A18] hover:text-[#FF8B33] transition-colors group"
              >
                <span>Read my story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Story Drawer */}
      <Drawer
        isOpen={storyDrawerOpen}
        onClose={() => setStoryDrawerOpen(false)}
        title="From Curiosity to Engineering"
        subtitle="Background & Journey"
        width="lg"
      >
        <div className="space-y-6 text-[#9A9FA8] leading-relaxed text-sm sm:text-base">
          <div className="p-4 rounded-xl bg-[#0B0D0F] border border-white/8 space-y-1">
            <span className="text-[11px] font-mono text-[#FF7A18] uppercase font-bold">
              Origins
            </span>
            <p className="text-[#F5F5F2]">
              {profileData.personalStory.origin}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#F5F5F2]">The Pull Toward the Backend</h4>
            <p>
              {profileData.personalStory.evolution}
            </p>
            <p>
              While designing user interfaces was rewarding, I found myself constantly drawn to what happened after an event was triggered: how did the request travel, which database indices were traversed, how were duplicate submissions prevented, and how did data sync across decoupled systems without race conditions?
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#F5F5F2]">Building for Impact</h4>
            <p>
              Coming from a small-town background shaped how I think about access and technology. Whether creating platforms for students to practice coding beyond standard college curricula or designing contactless QR entry for regional heritage sites, engineering is most meaningful when it solves real human friction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#171B20] border-l-2 border-[#FF7A18] text-xs font-mono text-[#F5F5F2]">
            "Understanding the system, not just writing the code."
          </div>
        </div>
      </Drawer>
    </CinematicSection>
  );
};
