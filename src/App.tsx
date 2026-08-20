import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import { TerminalModal } from './components/navigation/TerminalModal';
import { Hero } from './components/hero/Hero';
import { CuriousOrigin } from './components/sections/CuriousOrigin';
import { BehindTheInterface } from './components/sections/BehindTheInterface';
import { ProjectsSection, ProjectId } from './components/projects/ProjectsSection';
import { JourneyTimeline } from './components/sections/JourneyTimeline';
import { EngineeringPhilosophy } from './components/sections/EngineeringPhilosophy';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { ArchitecturePlayground } from './components/sections/ArchitecturePlayground';
import { DevloreSection } from './components/sections/DevloreSection';
import { EducationAwards } from './components/sections/EducationAwards';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/navigation/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectId | null>(null);

  // Keyboard shortcut for terminal (⌘K / Ctrl+K / T / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if ((e.key === 't' || e.key === 'T') && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (terminalOpen) {
          setTerminalOpen(false);
        } else if (activeProjectModal) {
          setActiveProjectModal(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, activeProjectModal]);

  const handleOpenProject = (project: ProjectId) => {
    setTerminalOpen(false);
    setActiveProjectModal(project);
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setTerminalOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0F161E] text-[#FFFFFF] min-h-screen selection:bg-[#FF6B53]/25 selection:text-[#FF6B53] subtle-mesh font-sans antialiased">
      {/* Scroll Progress Navigator */}
      <ScrollProgress />

      {/* Main Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Narrative Flow */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <CuriousOrigin />
        <BehindTheInterface />
        <ProjectsSection
          externalModalProject={activeProjectModal}
          onCloseExternalModal={() => setActiveProjectModal(null)}
        />
        <JourneyTimeline />
        <EngineeringPhilosophy />
        <SkillsMatrix onOpenProject={handleOpenProject} />
        <ArchitecturePlayground />
        <DevloreSection />
        <EducationAwards />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Developer Terminal CLI */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenProject={handleOpenProject}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
