import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'motion/react';

export type CinematicMotionType =
  | 'origin'        // Chapter 01: Soft unfurl & vertical lift
  | 'depth'         // Chapter 02: Z-axis stack expansion
  | 'aperture'      // Chapter 03: Wide cinematic frame entrance
  | 'chronicle'     // Chapter 04: Progressive vertical trajectory
  | 'philosophy'    // Chapter 05: Perspective card shift
  | 'constellation' // Chapter 06: Radial cluster ignition
  | 'editorial'     // Chapter 07: Publication bloom
  | 'foundations'   // Chapter 08: Balanced dual-pillar reveal
  | 'convergence';  // Chapter 09: Focal ambient arrival

interface CinematicSectionProps {
  id: string;
  chapterNumber?: string;
  chapterLabel?: string;
  motionType?: CinematicMotionType;
  className?: string;
  children: React.ReactNode;
}

const customEase = [0.22, 1, 0.36, 1] as const;

// Distinct chapter animation variants mapping to the cinematic principles
const chapterVariantsMap: Record<CinematicMotionType, Variants> = {
  origin: {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: customEase,
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  },
  depth: {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: customEase,
        staggerChildren: 0.15,
        delayChildren: 0.08
      }
    }
  },
  aperture: {
    hidden: { opacity: 0, y: 55, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: customEase,
        staggerChildren: 0.16,
        delayChildren: 0.1
      }
    }
  },
  chronicle: {
    hidden: { opacity: 0, y: 45, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: customEase,
        staggerChildren: 0.14,
        delayChildren: 0.06
      }
    }
  },
  philosophy: {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: customEase,
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  },
  constellation: {
    hidden: { opacity: 0, y: 45, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: customEase,
        staggerChildren: 0.08,
        delayChildren: 0.06
      }
    }
  },
  editorial: {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: customEase,
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  },
  foundations: {
    hidden: { opacity: 0, y: 45, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: customEase,
        staggerChildren: 0.14,
        delayChildren: 0.08
      }
    }
  },
  convergence: {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: customEase,
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }
};

// Child item variants for staggered fluid reveals inside each chapter
export const childItemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase }
  }
};

export const childItemScaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: customEase }
  }
};

export const childItemSlideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: customEase }
  }
};

export const childItemSlideRightVariant: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: customEase }
  }
};

export const CinematicSection = React.forwardRef<HTMLElement, CinematicSectionProps>(({
  id,
  chapterNumber,
  chapterLabel,
  motionType = 'origin',
  className = '',
  children
}, forwardedRef) => {
  const internalRef = useRef<HTMLElement>(null);
  const resolvedRef = (forwardedRef as React.RefObject<HTMLElement>) || internalRef;
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(resolvedRef, {
    margin: '-12% 0px -12% 0px',
    amount: 0.12,
    once: false // Fully reversible upon scrolling up/down
  });

  const variants = chapterVariantsMap[motionType];

  return (
    <motion.section
      ref={resolvedRef}
      id={id}
      initial={shouldReduceMotion ? { opacity: 1 } : 'hidden'}
      animate={shouldReduceMotion ? { opacity: 1 } : isInView ? 'visible' : 'hidden'}
      variants={shouldReduceMotion ? undefined : variants}
      className={`relative border-t border-white/8 bg-[#0B0D0F] transition-colors duration-500 ${className}`}
    >
      {/* Chapter Marker Accent Line & Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A18]/20 to-transparent pointer-events-none" />

      {/* Chapter Watermark Indicator for Wide Screens */}
      {chapterNumber && (
        <div className="absolute top-10 right-8 sm:right-12 font-mono text-[10px] uppercase tracking-widest text-white/10 hidden xl:flex items-center gap-2 pointer-events-none select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18]/40" />
          <span>CHAPTER {chapterNumber} // {chapterLabel}</span>
        </div>
      )}

      {children}
    </motion.section>
  );
});

CinematicSection.displayName = 'CinematicSection';

