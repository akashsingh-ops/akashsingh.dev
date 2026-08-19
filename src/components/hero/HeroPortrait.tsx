import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Code2, Terminal, ArrowUpRight } from 'lucide-react';

interface HeroPortraitProps {
  onOpenTerminal?: () => void;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ onOpenTerminal }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[480px] aspect-[4/5] mx-auto flex items-center justify-center select-none">
      {/* 1. Large Soft Coral / Terracotta Halo Background */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0 -m-6 sm:-m-10 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255, 107, 83, 0.28) 0%, rgba(226, 91, 69, 0.12) 38%, rgba(15, 22, 30, 0) 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* 2. Secondary Geometric Concentric Orbital Ring */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-[#E25B45]/15 pointer-events-none" />
      <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-[#FF6B53]/10 pointer-events-none animate-spin-slow" />

      {/* 3. Subtle Engineering Coordinate Marks */}
      <div className="absolute -top-3 -right-3 font-mono text-[10px] text-[#7E8994] tracking-widest pointer-events-none">
        [ 27.1767° N, 78.0081° E ]
      </div>
      <div className="absolute -bottom-2 -left-2 font-mono text-[10px] text-[#E25B45]/60 tracking-wider pointer-events-none">
        +01.SYS // BACKEND
      </div>

      {/* 4. Portrait Container & Silhouette */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#151E27] via-[#121922] to-[#0F161E] border border-white/8 shadow-2xl flex flex-col items-center justify-end"
      >
        {/* Abstract Inner Lighting Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 107, 83, 0.15), transparent 60%)',
          }}
        />

        {/* Subtle Decorative Geometric Lines behind silhouette */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="portrait-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portrait-grid)" />
        </svg>

        {/* High-Fidelity Silhouette / Portrait Graphic representing a Software Engineer */}
        <div className="relative w-full h-full flex flex-col items-center justify-end z-10 pt-8 px-6 pb-2">
          {/* Subtle Ambient Backlight Accent */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#FF6B53]/15 blur-2xl absolute top-10 pointer-events-none" />

          {/* Detailed Vector Silhouette */}
          <svg
            viewBox="0 0 280 340"
            className="w-full max-w-[260px] sm:max-w-[290px] h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Ambient Rim Light */}
            <circle cx="140" cy="115" r="54" fill="url(#headGlow)" opacity="0.3" />

            {/* Torso / Shoulders in Dark Editorial Clothing */}
            <path
              d="M38 340 C42 270, 75 220, 104 202 L116 230 C122 236, 158 236, 164 230 L176 202 C205 220, 238 270, 242 340 Z"
              fill="#101720"
              stroke="#1B2630"
              strokeWidth="1.5"
            />
            {/* Jacket Collar / Lapel Lines */}
            <path
              d="M104 202 L140 252 L176 202"
              stroke="#253341"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M124 230 L140 280 L156 230"
              fill="#0F161E"
              stroke="#E25B45"
              strokeWidth="1"
              strokeOpacity="0.4"
            />

            {/* Neck */}
            <path
              d="M118 165 C118 190, 162 190, 162 165 L162 150 L118 150 Z"
              fill="#D8C2B2"
            />
            {/* Jaw / Shadow on neck */}
            <path
              d="M120 152 Q140 172 160 152 Z"
              fill="#BFA694"
              opacity="0.6"
            />

            {/* Head Silhouette */}
            <ellipse cx="140" cy="118" rx="42" ry="48" fill="#E6D3C5" />

            {/* Modern Clean Hair Styling */}
            <path
              d="M96 112 C95 72, 122 52, 140 52 C168 52, 186 70, 184 110 C178 98, 168 88, 140 88 C118 88, 104 96, 96 112 Z"
              fill="#151A21"
            />
            <path
              d="M96 112 C94 130, 98 140, 101 144 C104 125, 106 110, 114 100 Z"
              fill="#151A21"
            />
            <path
              d="M184 110 C186 128, 182 138, 179 144 C176 125, 174 110, 166 100 Z"
              fill="#151A21"
            />

            {/* Minimal Eyewear / Framing (Software Engineer Detail) */}
            <path
              d="M110 114 H134 M146 114 H170 M134 114 Q140 112 146 114"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect x="110" y="106" width="24" height="16" rx="3" stroke="#2D3748" strokeWidth="1.5" fill="none" opacity="0.8" />
            <rect x="146" y="106" width="24" height="16" rx="3" stroke="#2D3748" strokeWidth="1.5" fill="none" opacity="0.8" />

            {/* Gradients */}
            <defs>
              <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B53" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF6B53" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Minimal Floating Badge over portrait */}
        <div className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-[#0F161E]/80 backdrop-blur-md border border-white/8 flex items-center justify-between text-xs z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B53] animate-pulse" />
            <span className="text-[#FFFFFF] font-medium text-[11px] tracking-wide">AKASH SINGH</span>
          </div>
          <span className="text-[10px] font-mono text-[#7E8994]">
            Backend & Systems
          </span>
        </div>
      </motion.div>

      {/* Decorative Subtle Corner Bracket Marks */}
      <div className="absolute -top-2 -left-2 text-2xl font-light text-[#E25B45]/40 font-mono pointer-events-none select-none">
        &lt;
      </div>
      <div className="absolute -bottom-2 -right-2 text-2xl font-light text-[#E25B45]/40 font-mono pointer-events-none select-none">
        &gt;
      </div>
    </div>
  );
};
