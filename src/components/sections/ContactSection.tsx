import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profileData, RESUME_URL } from '../../data/profile';
import { ArrowUpRight, Github, Linkedin, Mail, Check, Copy, FileText } from 'lucide-react';
import {
  CinematicSection,
  childItemVariant,
  childItemScaleVariant
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
      {/* Subtle warm ambient glow behind contact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF7A18]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12 relative z-10">
        <motion.div
          className="space-y-4 max-w-2xl"
          variants={shouldReduceMotion ? undefined : childItemVariant}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#9A9FA8]">
            <span className="text-[#FF7A18] font-bold">09</span>
            <span className="text-white/20">/</span>
            <span className="uppercase tracking-widest">CONTACT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            Let's build something useful.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed">
            Open to discussing backend systems, database performance, automation pipelines, products, or interesting engineering problems.
          </p>
        </motion.div>

        {/* Contact Actions */}
        <motion.div
          className="flex flex-wrap items-center gap-3 sm:gap-4"
          variants={shouldReduceMotion ? undefined : childItemScaleVariant}
        >
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn (opens in a new tab)"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF7A18] hover:bg-[#FF8B33] text-[#F5F5F2] font-semibold text-sm tracking-wide transition-all shadow-lg shadow-[#FF7A18]/20 active:scale-95 hover:-translate-y-0.5"
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
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111418] hover:bg-white/10 text-[#F5F5F2] border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4 text-[#9A9FA8]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#666C75]" />
          </a>

          {/* View Official Resume */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Akash Singh's resume — opens in a new tab"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111418] hover:bg-white/10 text-[#F5F5F2] hover:text-white border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/50"
          >
            <FileText className="w-4 h-4 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-all duration-200 group-hover:-translate-y-0.5" />
            <span>View Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111418] hover:bg-white/10 text-[#9A9FA8] hover:text-[#F5F5F2] border border-white/10 hover:border-white/20 text-sm font-mono transition-all duration-200 hover:-translate-y-0.5"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-sans text-xs">Email Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#9A9FA8]" />
                <span className="text-xs">{profileData.socialLinks.email}</span>
                <Copy className="w-3 h-3 text-[#666C75]" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </CinematicSection>
  );
};

