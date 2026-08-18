import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Github, Linkedin, Menu, X, FileText } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Journey', href: '#journey' },
    { name: 'Thinking', href: '#philosophy' },
    { name: 'About', href: '#about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none flex justify-center ${
          isScrolled ? 'pt-4 sm:pt-5' : 'pt-6 sm:pt-8'
        }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? 'bg-[#111418]/85 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-2xl max-w-4xl w-[92%] sm:w-auto gap-6 sm:gap-8'
              : 'w-full max-w-7xl px-6 sm:px-8'
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#"
            className="flex items-center gap-2 group text-[#F5F5F2] tracking-tight text-sm sm:text-base font-semibold focus:outline-none"
          >
            <span className="font-mono text-[#FF7A18] text-xs font-bold px-1.5 py-0.5 rounded bg-[#FF7A18]/10 border border-[#FF7A18]/20">
              AS
            </span>
            <span className="tracking-tight hover:text-[#FF7A18] transition-colors">
              Akash Singh
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-[#9A9FA8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#F5F5F2] transition-colors tracking-wide font-medium py-1"
              >
                {link.name}
              </a>
            ))}

            {/* Subtle Desktop Resume Action */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#F5F5F2] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/50"
            >
              <FileText className="w-3.5 h-3.5 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>View Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenTerminal}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full sm:rounded-md bg-white/5 hover:bg-white/10 text-[#9A9FA8] hover:text-[#FF7A18] border border-white/8 transition-colors text-xs font-mono flex items-center gap-1.5"
              title="Open Terminal CLI (Press 'T')"
            >
              <Terminal className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span className="hidden lg:inline text-[11px]">CLI</span>
            </button>

            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full sm:rounded-md bg-white/5 hover:bg-white/10 text-[#9A9FA8] hover:text-[#F5F5F2] border border-white/8 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-md bg-[#FF7A18]/10 hover:bg-[#FF7A18]/20 text-[#FF7A18] border border-[#FF7A18]/30 transition-colors text-xs font-medium"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-white/5 text-[#9A9FA8] hover:text-[#F5F5F2]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B0D0F]/95 backdrop-blur-lg flex flex-col justify-center px-8 space-y-6 md:hidden animate-fadeIn">
          <div className="flex flex-col space-y-4 text-lg font-medium text-[#9A9FA8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#FF7A18] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Resume Link */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="group flex items-center justify-between p-3 rounded-xl bg-[#171B20] border border-white/10 hover:border-white/20 text-sm font-medium text-[#F5F5F2] hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF7A18] group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>View Resume</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9A9FA8] group-hover:text-[#FF7A18] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-4">

            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#F5F5F2]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#FF7A18]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
