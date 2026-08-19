import React, { useState } from 'react';
import { Users, Trophy, Zap, Database, CheckCircle2, Play } from 'lucide-react';

export const GeekSearchDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const pipelineSteps = [
    {
      title: 'Student Code Submission',
      subtitle: 'Contest / Problem Solved',
      desc: 'Student submits algorithmic solution from browser client during active contest bursts.',
      metric: '10,000+ Submissions'
    },
    {
      title: 'Submission Ingestion & Normalization',
      subtitle: 'Schema Structured',
      desc: 'Normalized submission data into structured records without table lock contention.',
      metric: 'ACID Consistency'
    },
    {
      title: 'Leaderboard Query Optimization',
      subtitle: 'Indexed Rank Aggregations',
      desc: 'Replaced expensive full table scans with composite indexed ranking queries.',
      metric: '~40% Latency Drop'
    },
    {
      title: 'Real-time Student Feedback',
      subtitle: 'Instant Contest Standings',
      desc: 'Sub-second updates pushed to 1,000+ student profiles and college rankings.',
      metric: '1,000+ Students'
    }
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    let step = 0;
    setActiveStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < pipelineSteps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 700);
  };

  return (
    <div className="bg-[#0F161E] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6B53]" />
          <span className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
            GEEK-SEARCH // CONCURRENCY & LEADERBOARD PIPELINE
          </span>
        </div>
        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151E27] hover:bg-[#1B2630] border border-[#FF6B53]/40 text-[#FF6B53] font-mono text-xs font-semibold transition-all disabled:opacity-50"
        >
          <Play className="w-3 h-3" />
          <span>{isSimulating ? 'Processing...' : 'Simulate Submission'}</span>
        </button>
      </div>

      {/* 4-Step Student to Leaderboard Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pipelineSteps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.title}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#151E27] border-[#FF6B53] shadow-lg shadow-[#FF6B53]/5 -translate-y-0.5'
                  : 'bg-[#151E27]/40 border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                  0{idx + 1}.
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#C3CBD3]">
                  {step.metric}
                </span>
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-[#FFFFFF] mb-1">{step.title}</h5>
              <p className="text-[11px] text-[#7E8994] leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-[#151E27] border border-white/6 flex items-center justify-between text-xs font-mono text-[#7E8994]">
        <span>Pipeline: STUDENT → SUBMISSION → CONTEST → LEADERBOARD</span>
        <span className="text-emerald-400 font-bold">1,000+ Active Students</span>
      </div>
    </div>
  );
};
