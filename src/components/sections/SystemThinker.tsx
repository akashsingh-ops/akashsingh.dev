import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RbacArchitecture } from '../architecture/RbacArchitecture';
import { ShieldCheck, RefreshCw, Cpu, Layers, Sparkles, Database, Network } from 'lucide-react';

export const SystemThinker: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#21262D] relative bg-[#0D1117]" id="systems">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          stage="05 // SYSTEMS"
          tagline="Architectural Patterns"
          title="The System Thinker: Multi-Tenancy, Sync & Graphs"
          subtitle="How distributed data stores, tenant boundaries, and asynchronous pipelines work harmoniously."
        />

        <div className="space-y-12">
          {/* Sub-system 1: Multi-Tenant RBAC Architecture Deep-Dive */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF6A00] font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>CASE ARCHITECTURE // MULTI-TENANT RBAC (XAIGI TECHNOLOGY)</span>
            </div>
            <RbacArchitecture />
          </div>

          {/* Sub-system 2: Dual DB Sync (Neo4j Graph ↔ Elasticsearch / OpenSearch) */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#30363D]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-cyan-400">
                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">
                    SYNCHRONIZATION PIPELINE
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Neo4j Graph ↔ OpenSearch Real-Time Data Synchronization
                  </h3>
                </div>
              </div>
              <span className="font-mono text-xs text-cyan-300 px-2.5 py-1 rounded bg-[#0D1117] border border-cyan-800 self-start sm:self-auto">
                EVENT-DRIVEN // CELERY
              </span>
            </div>

            <p className="text-sm text-[#C9D1D9] leading-relaxed">
              Graph databases excel at recursive relationship traversals, but full-text and fuzzy multi-attribute search across millions of records requires inverted search indices. To combine the best of both without dual-write race conditions, we engineered an asynchronous event-driven sync pipeline.
            </p>

            {/* Sync Flow Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
                <span className="text-[10px] text-[#FFA34D] font-bold">1. GRAPH MUTATION</span>
                <p className="text-[#C9D1D9] text-[11px]">User or API updates entity relationship in Neo4j.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold">2. DJANGO SIGNAL</span>
                <p className="text-[#C9D1D9] text-[11px]">Post-save hook dispatches serialized diff to Celery broker.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
                <span className="text-[10px] text-indigo-400 font-bold">3. ASYNC WORKER</span>
                <p className="text-[#C9D1D9] text-[11px]">Celery task dequeues diff and updates inverted index doc.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold">4. SUB-100MS SEARCH</span>
                <p className="text-[#C9D1D9] text-[11px]">OpenSearch answers faceted queries instantly.</p>
              </div>
            </div>
          </div>

          {/* Sub-system 3: Mimasa / RAG & Knowledge Graph Exploration */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFA34D] font-bold uppercase">
              <Sparkles className="w-4 h-4 text-[#FF6A00]" />
              <span>EXPLORATORY ENGINEERING // RAG & KNOWLEDGE GRAPHS (MIMASA)</span>
            </div>
            <p className="text-sm text-[#C9D1D9] leading-relaxed">
              Explored retrieval-augmented generation (RAG) workflows integrating <strong className="text-white">LangChain</strong> with <strong className="text-white">Neo4j Knowledge Graphs</strong>. Instead of naive text chunking, linking contextual entities into structured graph nodes allowed retrieval to traverse related domain entities accurately, enriching analytical answers for contextual dashboards.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0D1117] border border-[#30363D] text-[#8B949E]">
                LangChain Framework
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0D1117] border border-[#30363D] text-[#8B949E]">
                Knowledge Graph Extraction
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0D1117] border border-[#30363D] text-[#8B949E]">
                Contextual Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
