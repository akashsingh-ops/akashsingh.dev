import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import { TerminalModal } from './components/navigation/TerminalModal';
import { Hero } from './components/hero/Hero';
import { CuriousOrigin } from './components/sections/CuriousOrigin';
import { BehindTheInterface } from './components/sections/BehindTheInterface';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { JourneyTimeline } from './components/sections/JourneyTimeline';
import { EngineeringPhilosophy } from './components/sections/EngineeringPhilosophy';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { DevloreSection } from './components/sections/DevloreSection';
import { EducationAwards } from './components/sections/EducationAwards';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/navigation/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Keyboard shortcut for terminal (Press 'T')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 't' || e.key === 'T') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        setTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#0B0D0F] text-[#F5F5F2] min-h-screen selection:bg-[#FF7A18]/25 selection:text-[#FF7A18] subtle-mesh font-sans antialiased">
      {/* Scroll Progress Navigator */}
      <ScrollProgress />

      {/* Main Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Narrative Flow */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <CuriousOrigin />
        <BehindTheInterface />
        <ProjectsSection />
        <JourneyTimeline />
        <EngineeringPhilosophy />
        <SkillsMatrix />
        <DevloreSection />
        <EducationAwards />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Terminal CLI Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
