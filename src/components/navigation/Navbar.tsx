import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Menu, X } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
          isScrolled ? 'pt-3 sm:pt-4' : 'pt-5 sm:pt-6'
        }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? 'bg-[#151E27]/85 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 shadow-2xl max-w-5xl w-[92%] sm:w-auto gap-6 sm:gap-10'
              : 'w-full max-w-7xl px-6 sm:px-8 py-2'
          }`}
        >
          {/* Left: AKASH */}
          <a
            href="#"
            className="flex items-center gap-2 group text-[#FFFFFF] tracking-tight text-sm sm:text-base font-extrabold focus:outline-none"
          >
            <span className="tracking-wider uppercase hover:text-[#FF6B53] transition-colors">
              AKASH
            </span>
          </a>

          {/* Center/Right: Work, Journey, Thinking, About */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-[#C3CBD3]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#FFFFFF] hover:text-[#FF6B53] transition-colors tracking-wide font-medium py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Terminal, Resume ↗ */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="group px-3 py-1.5 rounded-lg bg-[#0F161E] hover:bg-[#1B2630] text-[#C3CBD3] hover:text-[#FFFFFF] border border-white/10 hover:border-[#FF6B53]/50 transition-all duration-200 text-xs font-mono flex items-center gap-2 focus:outline-none"
              title="Open Developer Terminal CLI (⌘K / Ctrl+K)"
              aria-label="Open Developer Terminal CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-[#FF6B53] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-medium">Terminal</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#7E8994] bg-white/5 border border-white/10 rounded group-hover:text-[#FF6B53] group-hover:border-[#FF6B53]/30 transition-colors">
                ⌘K
              </kbd>
            </button>

            {/* Resume Link */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#FFFFFF] hover:text-[#0F161E] bg-[#FF6B53]/15 hover:bg-[#FF6B53] border border-[#FF6B53]/30 hover:border-[#FF6B53] transition-all duration-200 text-xs font-mono font-medium focus:outline-none"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF6B53] group-hover:text-[#0F161E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C3CBD3] hover:text-[#FFFFFF] md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0F161E]/95 backdrop-blur-lg md:hidden pt-24 px-6 flex flex-col justify-between pb-12">
          <div className="space-y-6">
            <div className="text-xs font-mono text-[#7E8994] uppercase tracking-widest pb-2 border-b border-white/10">
              // Navigation
            </div>
            <nav className="space-y-4 font-mono text-base">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[#FFFFFF] hover:text-[#FF6B53] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-3 rounded-xl bg-[#151E27] border border-white/10 text-xs font-mono text-[#FFFFFF] flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#FF6B53]" />
              <span>Launch Terminal CLI</span>
            </button>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#FF6B53] text-[#0F161E] font-bold text-xs font-mono flex items-center justify-center gap-2"
            >
              <span>View Official Resume ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
