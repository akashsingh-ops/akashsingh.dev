import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Menu, X } from 'lucide-react';
import { RESUME_URL } from '../../data/profile';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold for smooth locking transition
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Journey', href: '#journey' },
    { name: 'Thinking', href: '#philosophy' },
    { name: 'Playground', href: '#playground' },
    { name: 'About', href: '#about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 pointer-events-none flex justify-center transition-all duration-500 ease-out ${
          isScrolled ? 'pt-4 sm:pt-5' : 'pt-6 sm:pt-7.5'
        }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
            isScrolled
              ? 'bg-[#151E27]/90 backdrop-blur-md border border-white/10 rounded-full px-5 sm:px-6 py-2 shadow-2xl shadow-black/40 max-w-5xl w-[92%] sm:w-auto gap-6 sm:gap-10'
              : 'w-[92%] max-w-7xl px-4 sm:px-8 py-1.5 bg-transparent border-transparent'
          }`}
        >
          {/* Left: AKASH Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group text-[#FFFFFF] tracking-wider focus:outline-none shrink-0"
            aria-label="Akash Singh Portfolio — Back to top"
          >
            <span
              className={`font-extrabold uppercase transition-all duration-500 ${
                isScrolled
                  ? 'text-sm sm:text-base text-[#FFFFFF] group-hover:text-[#FF6B53]'
                  : 'text-[17px] sm:text-[19px] text-[#FFFFFF]/90 group-hover:text-[#FFFFFF] tracking-wide'
              }`}
            >
              AKASH
            </span>
          </a>

          {/* Center/Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 font-mono transition-all duration-500">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 font-medium transition-colors duration-200 group focus:outline-none ${
                  isScrolled
                    ? 'text-xs text-[#C3CBD3] hover:text-[#FFFFFF]'
                    : 'text-[14px] text-white/65 hover:text-[#FFFFFF]'
                }`}
              >
                <span>{link.name}</span>
                {/* Subtle horizontal accent underline on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6B53] rounded-full transition-all duration-250 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster: Terminal & Resume CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Terminal Action */}
            <button
              onClick={onOpenTerminal}
              className={`group transition-all duration-300 font-mono text-xs flex items-center gap-2 focus:outline-none ${
                isScrolled
                  ? 'px-3 py-1.5 rounded-lg bg-[#0F161E] hover:bg-[#1B2630] text-[#C3CBD3] hover:text-[#FFFFFF] border border-white/10 hover:border-[#FF6B53]/50 shadow-sm'
                  : 'px-2.5 py-1.5 rounded-md bg-transparent hover:bg-white/5 text-[#C3CBD3] hover:text-[#FF6B53] border-none'
              }`}
              title="Open Developer Terminal CLI (⌘K / Ctrl+K)"
              aria-label="Open Developer Terminal CLI"
            >
              {isScrolled ? (
                <Terminal className="w-3.5 h-3.5 text-[#FF6B53] group-hover:scale-110 transition-transform" />
              ) : (
                <span className="text-[#FF6B53] font-bold text-xs">›_</span>
              )}
              <span className="hidden sm:inline font-medium">Terminal</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#7E8994] bg-white/5 border border-white/10 rounded group-hover:text-[#FF6B53] group-hover:border-[#FF6B53]/30 transition-colors">
                ⌘K
              </kbd>
            </button>

            {/* Resume CTA */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Akash Singh's resume — opens in a new tab"
              className={`group inline-flex items-center gap-1.5 transition-all duration-300 font-mono text-xs font-medium focus:outline-none ${
                isScrolled
                  ? 'px-3 py-1.5 rounded-lg text-[#FFFFFF] hover:text-[#0F161E] bg-[#FF6B53]/15 hover:bg-[#FF6B53] border border-[#FF6B53]/35 hover:border-[#FF6B53]'
                  : 'h-[38px] px-4 py-2 rounded-lg text-[#FFFFFF] hover:text-[#FFFFFF] bg-[#FF6B53]/[0.06] hover:bg-[#FF6B53]/[0.18] border border-[#FF6B53]/45 hover:border-[#FF6B53]'
              }`}
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B53] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C3CBD3] hover:text-[#FFFFFF] md:hidden transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0F161E]/96 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="text-xs font-mono text-[#7E8994] uppercase tracking-widest pb-2 border-b border-white/10 flex items-center justify-between">
              <span>// Navigation</span>
              <span className="text-[#FF6B53]">● LIVE</span>
            </div>
            <nav className="space-y-2 font-mono text-base">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[#FFFFFF] hover:text-[#FF6B53] transition-colors py-3 border-b border-white/5 text-lg font-medium"
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
              className="w-full py-3.5 rounded-xl bg-[#151E27] border border-white/10 text-xs font-mono text-[#FFFFFF] flex items-center justify-center gap-2 hover:border-[#FF6B53]/40 transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#FF6B53]" />
              <span>Launch Terminal CLI (⌘K)</span>
            </button>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#FF6B53] text-[#0F161E] font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-[#FF7A63] transition-colors"
            >
              <span>View Official Resume ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
