import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { 
  Workflow, 
  Database, 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Terminal
} from 'lucide-react';

export const AutomatorDataSection: React.FC = () => {
  const [activePipelineStage, setActivePipelineStage] = useState<number>(2);

  const pipelineStages = [
    {
      title: '1. Multi-Source Ingestion',
      category: 'Data Extraction',
      description: 'Ingesting operational event logs, metric streams, and relational data from distributed enterprise source systems.',
      tech: 'Python · Ingestion Connectors'
    },
    {
      title: '2. Automated ETL & Cleanse',
      category: 'Transformation',
      description: 'Cleansing schema anomalies, standardizing timestamps, and restructuring records for analytical dimensional modeling.',
      tech: 'ETL Pipelines · Data Validation'
    },
    {
      title: '3. Amazon Redshift Warehousing',
      category: 'Lakehouse Store',
      description: 'Loading high-throughput analytical records into optimized columnar Redshift tables with distribution and sort keys.',
      tech: 'Amazon Redshift · Columnar SQL'
    },
    {
      title: '4. Operational Automation',
      category: 'Zero-Toil Workflows',
      description: 'Eliminating repetitive daily manual tasks performed by team members with reliable background automation scripts.',
      tech: 'Process Automation · Cron Orchestration'
    },
    {
      title: '5. AI / Agentic Workflow Exploration',
      category: 'Future Exploration',
      description: 'Investigating intelligent agentic workflows to automate routine diagnostic validations and anomaly detection.',
      tech: 'AI Agents · Operational Assistants'
    }
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#21262D] relative bg-[#0D1117]" id="automator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          stage="06 // AUTOMATOR"
          tagline="Data & Process Automation"
          title="From Backend to Data Pipelines & Operational Automation"
          subtitle="Engineering automated ETL workflows, Amazon Redshift warehousing, and zero-toil systems at Dell Technologies."
        />

        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-10">
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#30363D]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#FF6A00] font-bold uppercase tracking-wider">
                  CURRENT FOCUS // DELL TECHNOLOGIES
                </span>
                <span className="text-xs text-[#8B949E] font-mono">
                  (02/2026 – Present)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enterprise Data Engineering & Operational Automation
              </h3>
              <p className="text-base text-[#C9D1D9] max-w-3xl leading-relaxed">
                Transforming manual operational workflows into automated pipelines while managing reliable data flow from ingestion through Amazon Redshift warehousing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] shrink-0 font-mono text-xs text-right space-y-1">
              <div className="text-[#8B949E]">ROLE:</div>
              <div className="text-white font-bold">Service Delivery Engineer</div>
              <div className="text-emerald-400 font-semibold">Active & Building</div>
            </div>
          </div>

          {/* Interactive Pipeline Architecture Flow */}
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#8B949E]">
              <span>INTERACTIVE DATA & AUTOMATION PIPELINE:</span>
              <span className="text-[#FFA34D]">CLICK ANY STAGE TO INSPECT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {pipelineStages.map((stage, idx) => {
                const isSelected = activePipelineStage === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePipelineStage(idx)}
                    className={`p-4 rounded-xl border text-left font-mono transition-all ${
                      isSelected
                        ? 'bg-[#FF6A00]/15 border-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/10 scale-[1.02]'
                        : 'bg-[#0D1117] border-[#30363D] text-[#8B949E] hover:border-[#8B949E]'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-[#FFA34D] block mb-1">
                      {stage.category}
                    </span>
                    <h4 className="font-bold text-xs text-white mb-2 leading-tight">
                      {stage.title}
                    </h4>
                    <p className="text-[10px] text-[#8B949E] leading-relaxed line-clamp-3 mb-2">
                      {stage.description}
                    </p>
                    <div className="pt-2 border-t border-[#21262D] text-[9px] text-[#FFA34D] truncate">
                      {stage.tech}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Insights: The Automation Mindset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFA34D] font-bold uppercase">
                <Clock className="w-4 h-4 text-[#FF6A00]" />
                <span>Zero-Toil Automation Mindset</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
                “If a task is performed manually every day by team members, it introduces human fatigue, delays, and variability. Identifying the deterministic rules behind that process and building reliable automation eliminates toil permanently.”
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Agentic Workflow Exploration</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
                Actively exploring how AI agents can assist operational data engineering—evaluating autonomous routines for anomaly detection, intelligent alert routing, and validating pipeline schema migrations safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
