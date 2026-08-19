import React from 'react';
import { profileData, RESUME_URL } from '../../data/profile';
import { Terminal } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  return (
    <footer className="border-t border-white/8 bg-[#0F161E] py-12 text-[#7E8994] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#C3CBD3]">
            <span className="font-bold text-[#FFFFFF]">AKASH SINGH</span>
            <span>·</span>
            <span>Backend Software Engineer</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in a new tab)"
              className="text-[#C3CBD3] hover:text-[#FFFFFF] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in a new tab)"
              className="text-[#C3CBD3] hover:text-[#FF6B53] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={profileData.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile (opens in a new tab)"
              className="text-[#C3CBD3] hover:text-[#FFFFFF] transition-colors"
            >
              LeetCode ↗
            </a>
            <a
              href={profileData.socialLinks.devlore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DEVLORE (opens in a new tab)"
              className="text-[#C3CBD3] hover:text-[#FFFFFF] transition-colors"
            >
              DEVLORE ↗
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="text-[#FFFFFF] hover:text-[#FF6B53] font-medium transition-colors"
            >
              Resume ↗
            </a>
            <button
              onClick={onOpenTerminal}
              className="text-[#7E8994] hover:text-[#FF6B53] transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5 text-[#FF6B53]" />
              <span>CLI (⌘K)</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#7E8994]">
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
