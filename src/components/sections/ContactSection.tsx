import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profileData, RESUME_URL } from '../../data/profile';
import { ArrowUpRight, Github, Linkedin, Check, Copy, FileText, Mail } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant
} from '../ui/CinematicSection';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CinematicSection
      id="contact"
      chapterNumber="09"
      chapterLabel="CONVERGENCE"
      motionType="convergence"
      className="py-24 sm:py-36 relative overflow-hidden"
    >
      {/* Subtle Coral Ambient Glow behind contact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#FF6B53]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 relative z-10">
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#7E8994]">
            <span className="text-[#FF6B53] font-bold">09</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">GET IN TOUCH</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08]">
            Let's build systems<br />
            that matter<span className="text-[#FF6B53]">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#C3CBD3] leading-relaxed">
            Open to discussing backend architecture, database optimizations, data pipelines, systems engineering, or technical leadership.
          </p>
        </motion.div>

        {/* Contact Actions */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn (opens in a new tab)"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6B53] hover:bg-[#FF7A63] text-[#0F161E] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#FF6B53]/20 active:scale-95 hover:-translate-y-0.5"
          >
            <Linkedin className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile (opens in a new tab)"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#151E27] hover:bg-[#1B2630] text-[#FFFFFF] border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4 text-[#C3CBD3]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#7E8994]" />
          </a>

          {/* View Official Resume */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Akash Singh's resume — opens in a new tab"
            className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#151E27] hover:bg-[#1B2630] text-[#FFFFFF] border border-[#E25B45]/40 hover:border-[#FF6B53] text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4 text-[#C3CBD3] group-hover:text-[#FF6B53] transition-colors" />
            <span>View Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#7E8994] group-hover:text-[#FF6B53] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#151E27] hover:bg-[#1B2630] text-[#C3CBD3] hover:text-[#FFFFFF] border border-white/10 hover:border-white/20 text-sm font-mono transition-all duration-200 hover:-translate-y-0.5"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#7E8994]" />
                <span>{profileData.socialLinks.email}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </CinematicSection>
  );
};
