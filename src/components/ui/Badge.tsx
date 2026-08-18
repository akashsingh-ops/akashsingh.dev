import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'subtle';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    neutral: 'bg-[#171B20] text-[#9A9FA8] border-white/8 hover:border-white/15',
    accent: 'bg-[#FF7A18]/10 text-[#FF7A18] border-[#FF7A18]/25',
    subtle: 'bg-transparent text-[#666C75] border-white/6'
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-md font-mono',
    md: 'text-xs px-3 py-1 rounded-md font-mono'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-medium transition-colors ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};
