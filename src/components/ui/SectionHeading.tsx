import React from 'react';

interface SectionHeadingProps {
  number?: string;
  stage?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  stage,
  title,
  subtitle,
  alignment = 'left',
  className = ''
}) => {
  return (
    <div
      className={`mb-12 sm:mb-16 ${
        alignment === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'
      } ${className}`}
    >
      {(number || stage) && (
        <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#9A9FA8]">
          {number && (
            <span className="text-[#FF7A18] font-bold tracking-widest">
              {number}
            </span>
          )}
          {number && stage && <span className="text-white/20">/</span>}
          {stage && (
            <span className="uppercase tracking-widest text-[#9A9FA8]">
              {stage}
            </span>
          )}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight mb-4 leading-[1.12]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#9A9FA8] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
