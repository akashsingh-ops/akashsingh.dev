import React from 'react';
import { profileData, RESUME_URL } from '../../data/profile';
import { Terminal } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  return (
    <footer className="border-t border-white/8 bg-[#0B0D0F] py-12 text-[#666C75] text-xs font-mono">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#9A9FA8]">
            <span className="font-bold text-[#F5F5F2]">AKASH SINGH</span>
            <span>·</span>
            <span>Backend Software Engineer</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in a new tab)"
              className="text-[#9A9FA8] hover:text-[#F5F5F2] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in a new tab)"
              className="text-[#9A9FA8] hover:text-[#FF7A18] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={profileData.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile (opens in a new tab)"
              className="text-[#9A9FA8] hover:text-[#F5F5F2] transition-colors"
            >
              LeetCode ↗
            </a>
            <a
              href={profileData.socialLinks.devlore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DEVLORE (opens in a new tab)"
              className="text-[#9A9FA8] hover:text-[#F5F5F2] transition-colors"
            >
              DEVLORE ↗
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="text-[#F5F5F2] hover:text-[#FF7A18] font-medium transition-colors"
            >
              Resume ↗
            </a>
            <button
              onClick={onOpenTerminal}
              className="text-[#666C75] hover:text-[#FF7A18] transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3 h-3 text-[#FF7A18]" />
              <span>CLI</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#666C75]">
          <div>
            © {new Date().getFullYear()} Akash Singh
          </div>
          <div>
            Understand the system. Build the solution. Make it better.
          </div>
        </div>
      </div>
    </footer>
  );
};
