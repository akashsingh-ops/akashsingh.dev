import React, { useEffect, useState } from 'react';

interface Stage {
  id: string;
  number: string;
  name: string;
}

const stages: Stage[] = [
  { id: 'curious', number: '01', name: 'Curious' },
  { id: 'behind-the-interface', number: '02', name: 'Behind Interface' },
  { id: 'work', number: '03', name: 'Selected Work' },
  { id: 'journey', number: '04', name: 'Journey' },
  { id: 'philosophy', number: '05', name: 'Thinking' },
  { id: 'skills', number: '06', name: 'Skills' },
  { id: 'devlore', number: '07', name: 'DEVLORE' },
  { id: 'contact', number: '08', name: 'Contact' }
];

export const ScrollProgress: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string>('curious');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      for (const stage of [...stages].reverse()) {
        const el = document.getElementById(stage.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveStage(stage.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top minimal progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-[#FF7A18] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating subtle side dots for large screens */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-end gap-3 pointer-events-auto">
        <div className="bg-[#111418]/80 backdrop-blur border border-white/8 rounded-full p-2 flex flex-col gap-2.5 shadow-xl">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => scrollTo(stage.id)}
                className="group relative flex items-center justify-end"
                aria-label={`Jump to ${stage.name}`}
              >
                <span className="absolute right-6 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#171B20] border border-white/10 text-[#F5F5F2] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                  {stage.number} {stage.name}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF7A18] scale-150'
                      : 'bg-white/20 group-hover:bg-white/50'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
