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
    <div className="bg-[#0D1117] border border-[#30363D] rounded-xl p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#21262D]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            GEEK-SEARCH // CONCURRENCY & LEADERBOARD PIPELINE
          </span>
        </div>
        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FF6A00]/20 hover:bg-[#FF6A00]/30 text-[#FFA34D] border border-[#FF6A00]/40 font-mono text-xs transition-colors disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? 'Simulating...' : 'Simulate Submission Flow'}</span>
        </button>
      </div>

      {/* Step Pipeline Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pipelineSteps.map((step, idx) => {
          const isCurrent = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#FF6A00]/15 border-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/10 scale-[1.02]'
                  : isPassed
                  ? 'bg-[#161B22] border-emerald-500/40 text-[#C9D1D9]'
                  : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#8B949E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#21262D] text-[#FFA34D]">
                  0{idx + 1}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <h4 className="font-bold text-xs text-white mb-1">{step.title}</h4>
              <p className="text-[11px] text-[#8B949E] leading-relaxed mb-2">
                {step.desc}
              </p>
              <div className="pt-2 border-t border-[#21262D] font-mono text-[10px] text-[#FFA34D] font-semibold">
                {step.metric}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active step explanation */}
      <div className="bg-[#161B22] p-4 rounded-lg border border-[#21262D] flex items-start gap-3">
        <Zap className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-mono font-bold text-white uppercase">
            Engineering Focus at Step 0{activeStep + 1}:
          </span>
          <p className="text-[#C9D1D9] leading-relaxed">
            {activeStep === 0 && 'Handling burst submissions from multiple college participants simultaneously.'}
            {activeStep === 1 && 'Ensuring relational integrity between student accounts, contest IDs, and test-case verdicts.'}
            {activeStep === 2 && 'Replacing unindexed relational queries with composite index scans on (contest_id, score, submission_time).'}
            {activeStep === 3 && 'Delivering sub-second leaderboard ranking feedback across 1,000+ participating students.'}
          </p>
        </div>
      </div>
    </div>
  );
};
