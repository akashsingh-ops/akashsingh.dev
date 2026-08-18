import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { 
  Gauge, 
  TrendingDown, 
  Search, 
  Database, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Activity,
  Sliders
} from 'lucide-react';

interface OptimizationCase {
  id: string;
  title: string;
  context: string;
  system: string;
  stat: string;
  statLabel: string;
  beforeTime: number; // in ms
  afterTime: number; // in ms
  beforeDesc: string;
  afterDesc: string;
  bottleneck: string;
  solution: string;
  executionPlan: string[];
}

const optimizationCases: OptimizationCase[] = [
  {
    id: 'neo4j-graph',
    title: '35+ Neo4j Graph Queries Optimized',
    context: 'Xaigi Technology',
    system: 'Neo4j (Cypher) & Knowledge Graph Engine',
    stat: '~40%',
    statLabel: 'Query Execution Speedup',
    beforeTime: 240,
    afterTime: 144,
    beforeDesc: 'Unpruned cartesian matching across deep multi-hop entity relations causing high memory footprint and CPU throttling.',
    afterDesc: 'Pruned relationship traversal paths using index-backed anchor nodes and parameterized Cypher query patterns.',
    bottleneck: 'Cartesian product expansions during multi-hop graph traversals without anchor node indexes.',
    solution: 'Introduced label-specific index hints, eliminated duplicate MATCH paths, and parameterized queries for execution plan caching.',
    executionPlan: [
      'Profile Cypher query plan using EXPLAIN / PROFILE commands',
      'Identify eager aggregation and unindexed node scans',
      'Refactor relationship MATCH clauses with index hints',
      'Benchmark with 500+ concurrent user graph lookups'
    ]
  },
  {
    id: 'eazeae-qr',
    title: 'EazEae QR Verification Pipeline',
    context: 'EazEae Tourism Platform',
    system: 'Node.js & MongoDB Atomic Transactions',
    stat: '~75%',
    statLabel: 'Faster Gate Scans',
    beforeTime: 180,
    afterTime: 45,
    beforeDesc: 'Sequential token retrieval, separate application-level validation, and non-atomic database write locks.',
    afterDesc: 'Single atomic findOneAndUpdate with compound index on {token_hash, status}, reducing verification to 45ms.',
    bottleneck: 'Double round-trip latency and race conditions during high-volume concurrent tourist entry gate scans.',
    solution: 'Switched to atomic single-query document mutations with compound indexes, preventing double-entry atomically.',
    executionPlan: [
      'Simulate 100 concurrent QR gate check-ins',
      'Detect lock contention on status validation',
      'Implement atomic state transition in single write',
      'Achieve sub-50ms deterministic gate verification'
    ]
  },
  {
    id: 'opensearch-search',
    title: 'AWS OpenSearch Intelligent Discovery',
    context: 'Innefu Labs & Xaigi Technology',
    system: 'AWS OpenSearch & Elasticsearch Indexing',
    stat: '<100ms',
    statLabel: 'Search Latency',
    beforeTime: 320,
    afterTime: 78,
    beforeDesc: 'Ad-hoc relational database LIKE queries scanning millions of unstructured textual rows.',
    afterDesc: 'Pre-indexed inverted indices in OpenSearch synced asynchronously via Celery worker queues.',
    bottleneck: 'Full-table text scanning in primary database causing query queuing and high disk I/O.',
    solution: 'Decoupled search indexing to OpenSearch with custom analyzers and Celery-based real-time sync.',
    executionPlan: [
      'Decouple search reads from primary transactional database',
      'Establish Celery worker sync upon entity mutation',
      'Tune OpenSearch shard routing and filter caching',
      'Verify sub-100ms multi-attribute faceted queries'
    ]
  },
  {
    id: 'sap-hana',
    title: 'SAP HANA Enterprise Dataset Optimization',
    context: 'Terra-link Global',
    system: 'SAP HANA Columnar Storage',
    stat: '25%',
    statLabel: 'Query Performance Boost',
    beforeTime: 400,
    afterTime: 300,
    beforeDesc: 'Redundant column aggregations across 10+ large enterprise business datasets.',
    afterDesc: 'Optimized calculation views and filtered projection columns before join executions.',
    bottleneck: 'Memory-heavy joins evaluated prior to column filtering on large enterprise tables.',
    solution: 'Restructured SQL calculation views to push down filter predicates to the lowest columnar engine layer.',
    executionPlan: [
      'Analyze query execution plan in SAP HANA Studio',
      'Push down WHERE filter predicates below JOIN nodes',
      'Reduce intermediate result set memory allocation',
      'Benchmark across 10+ enterprise production datasets'
    ]
  }
];

export const OptimizerSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('neo4j-graph');

  const activeCase = optimizationCases.find((c) => c.id === selectedCaseId) || optimizationCases[0];

  return (
    <section className="py-20 sm:py-28 border-t border-[#21262D] relative bg-[#0D1117]" id="optimizer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          stage="04 // OPTIMIZER"
          tagline="Performance Engineering"
          title="Performance is a Symptom. Find the Bottleneck."
          subtitle="Measurable query, concurrency, and latency improvements backed by real execution profiling."
        />

        {/* Top Case Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {optimizationCases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-4 rounded-xl border font-mono text-left transition-all ${
                  isSelected
                    ? 'bg-[#FF6A00]/15 border-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/10 scale-[1.02]'
                    : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white hover:border-[#8B949E]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#FFA34D] px-1.5 py-0.5 rounded bg-[#21262D]">
                    {c.context}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">
                    {c.stat}
                  </span>
                </div>
                <div className="font-bold text-xs text-white line-clamp-1 mb-1">
                  {c.title}
                </div>
                <div className="text-[10px] text-[#8B949E] truncate">
                  {c.system}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Optimization Deep-Dive Visualizer */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          {/* Header row with headline metric */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#30363D]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF6A00] font-bold uppercase mb-1">
                <span>OPTIMIZATION CASE // {activeCase.context}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeCase.title}
              </h3>
              <p className="text-sm text-[#8B949E] font-mono mt-1">
                // Target Environment: {activeCase.system}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center gap-4 shrink-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                {activeCase.stat}
              </div>
              <div className="text-xs text-[#C9D1D9] font-medium leading-tight">
                {activeCase.statLabel}
                <span className="block text-[10px] text-[#8B949E] font-mono mt-0.5">
                  Verified in production
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Latency Bar Comparison (Before vs After) */}
          <div className="bg-[#0D1117] p-5 sm:p-7 rounded-xl border border-[#30363D] space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B949E] uppercase font-semibold">
                EXECUTION LATENCY BENCHMARK
              </span>
              <span className="text-emerald-400 font-bold">
                {activeCase.beforeTime}ms → {activeCase.afterTime}ms (Reduced by {Math.round(((activeCase.beforeTime - activeCase.afterTime) / activeCase.beforeTime) * 100)}%)
              </span>
            </div>

            {/* Before Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400 font-semibold">UNOPTIMIZED // BEFORE</span>
                <span className="text-rose-400 font-bold">{activeCase.beforeTime} ms</span>
              </div>
              <div className="h-6 w-full bg-[#161B22] rounded-md overflow-hidden p-0.5 border border-[#30363D]">
                <div
                  className="h-full bg-rose-500/70 rounded transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-bold"
                  style={{ width: '100%' }}
                >
                  Unoptimized Baseline
                </div>
              </div>
              <p className="text-[11px] text-[#8B949E] leading-relaxed pt-1">
                {activeCase.beforeDesc}
              </p>
            </div>

            {/* After Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">OPTIMIZED ARCHITECTURE // AFTER</span>
                <span className="text-emerald-400 font-bold">{activeCase.afterTime} ms</span>
              </div>
              <div className="h-6 w-full bg-[#161B22] rounded-md overflow-hidden p-0.5 border border-[#30363D]">
                <div
                  className="h-full bg-emerald-500 rounded transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-bold"
                  style={{ width: `${(activeCase.afterTime / activeCase.beforeTime) * 100}%` }}
                >
                  Optimized
                </div>
              </div>
              <p className="text-[11px] text-[#C9D1D9] leading-relaxed pt-1">
                {activeCase.afterDesc}
              </p>
            </div>
          </div>

          {/* Root Cause & Solution Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-2">
              <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider block">
                // The Root Bottleneck:
              </span>
              <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
                {activeCase.bottleneck}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-2">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                // The Engineering Solution:
              </span>
              <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
                {activeCase.solution}
              </p>
            </div>
          </div>

          {/* 4-Step Profiling & Execution Workflow */}
          <div className="p-5 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-3">
            <span className="font-mono text-xs text-[#FFA34D] font-bold uppercase tracking-wider block">
              // Step-by-Step Profiling Workflow:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeCase.executionPlan.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#161B22] border border-[#21262D] space-y-1.5"
                >
                  <span className="font-mono text-[10px] text-[#FF6A00] font-bold px-1.5 py-0.5 rounded bg-[#21262D] border border-[#30363D]">
                    STEP 0{idx + 1}
                  </span>
                  <p className="text-xs text-[#C9D1D9] leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
