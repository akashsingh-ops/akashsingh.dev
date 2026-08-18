import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { numbersData } from '../../data/metrics';
import { Activity, Layers, Zap, Users, Code } from 'lucide-react';

export const MetricsStory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Evidence' },
    { id: 'production', label: 'Production Systems' },
    { id: 'optimization', label: 'Query & DB Tuning' },
    { id: 'latency', label: 'Latency & Search' },
    { id: 'community', label: 'Impact & Users' }
  ];

  const filteredMetrics =
    activeFilter === 'all'
      ? numbersData
      : numbersData.filter((m) =>
          activeFilter === 'community'
            ? m.category === 'community' || m.category === 'dsa'
            : m.category === activeFilter
        );

  return (
    <section className="py-20 sm:py-28 border-t border-[#21262D] relative bg-[#0D1117]" id="metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          stage="EVIDENCE // METRICS"
          tagline="Quantitative Track Record"
          title="Numbers That Tell The Story"
          subtitle="Every metric is tied directly to verified production systems, query refactoring, and user engagement."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/20'
                  : 'bg-[#161B22] text-[#8B949E] hover:text-white border border-[#30363D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMetrics.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#FF6A00]/50 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#FFA34D] px-2 py-0.5 rounded bg-[#0D1117] border border-[#21262D]">
                    {item.context}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#30363D] group-hover:bg-[#FF6A00] transition-colors" />
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono text-white group-hover:text-[#FFA34D] transition-colors my-2">
                  {item.stat}
                </div>

                <h3 className="text-sm font-bold text-white mb-1 tracking-tight">
                  {item.label}
                </h3>

                <p className="text-xs text-[#8B949E] leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-[#21262D] flex items-center justify-between text-[11px] font-mono text-[#8B949E]">
                <span>CATEGORY:</span>
                <span className="text-[#C9D1D9] uppercase">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
