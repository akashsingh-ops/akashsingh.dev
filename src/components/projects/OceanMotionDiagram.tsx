import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Database, ShieldCheck, Zap, Layers, Share2, BarChart3, ArrowRight, CheckCircle2, ChevronRight, Sparkles, AlertTriangle } from 'lucide-react';

export const OceanMotionDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'graph' | 'rbac' | 'leakage' | 'superset'>('graph');
  const [activeOptItem, setActiveOptItem] = useState<'indexing' | 'patterns' | 'relationships'>('indexing');
  const [selectedNode, setSelectedNode] = useState<string>('DATASET');

  const lifecycleStages = [
    { step: '01', label: 'UPLOAD', desc: 'Secure multipart data stream & raw schema validation' },
    { step: '02', label: 'LICENSING', desc: 'Enterprise data rights, usage limits, and commercial metadata' },
    { step: '03', label: 'PRICING', desc: 'Tiered subscription quotas and dynamic billing policies' },
    { step: '04', label: 'ACCESS CONTROL', desc: 'Fine-grained RBAC and multi-tenant organization boundaries' },
    { step: '05', label: 'PUBLICATION', desc: 'Node indexing and catalog registration in Neo4j' },
    { step: '06', label: 'ANALYTICS', desc: 'Real-time Apache Superset interactive dashboards' }
  ];

  const graphNodes = [
    { id: 'USER', label: 'User Node', rel: '[:MEMBER_OF]', desc: 'Enterprise user identity with JWT authentication claims' },
    { id: 'GROUP', label: 'Group Node', rel: '[:HAS_ACCESS_TO]', desc: 'Tenant workspace group (Admin / Member roles)' },
    { id: 'DATASET', label: 'Dataset Node', rel: '[:POWERS_QUERY]', desc: 'Governed analytical dataset with metadata and licensing' },
    { id: 'CHART', label: 'Chart Node', rel: '[:CONTAINED_IN]', desc: 'Structured analytical chart backed by Cypher aggregations' },
    { id: 'DASHBOARD', label: 'Dashboard Node', rel: '[:VIEWABLE_BY]', desc: 'Multi-chart executive dashboard synced to Superset' }
  ];

  return (
    <div className="bg-[#0B0D0F] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Header & Section Selector */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/6 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A18] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF7A18] font-bold">
              OCEANMOTION // GRAPH & RBAC ARCHITECTURE
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#666C75]">
            Xaigi Technology · Django + Neo4j + Apache Superset
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#111418] border border-white/6 font-mono text-xs">
          {[
            { id: 'graph', label: 'NEO4J GRAPH CENTERPIECE', icon: Network },
            { id: 'lifecycle', label: 'DATASET LIFECYCLE', icon: Layers },
            { id: 'rbac', label: 'GROUP SHARING / RBAC', icon: ShieldCheck },
            { id: 'leakage', label: 'DEBUGGING: PERMISSION LEAKAGE', icon: AlertTriangle },
            { id: 'superset', label: 'APACHE SUPERSET', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#171B20] text-[#FF7A18] border border-[#FF7A18]/40 shadow-sm font-semibold'
                    : 'text-[#9A9FA8] hover:text-[#F5F5F2] hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="min-h-[270px] flex flex-col justify-center">
        {/* ========================================================================= */}
        {/* TAB 1: NEO4J GRAPH CENTERPIECE & QUERY TUNING */}
        {/* ========================================================================= */}
        {activeTab === 'graph' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9A9FA8]">
              <span>// Neo4j Relationship Topology: 35+ Cypher Queries</span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                30–40% Query Execution Improvement
              </span>
            </div>

            {/* Interactive Graph Node Strip */}
            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {graphNodes.map((node, i) => {
                  const isSelected = selectedNode === node.id;
                  return (
                    <React.Fragment key={node.id}>
                      <button
                        onClick={() => setSelectedNode(node.id)}
                        className={`px-3 py-2.5 rounded-xl border font-mono text-xs transition-all ${
                          isSelected
                            ? 'bg-[#171B20] border-[#FF7A18] text-[#FF7A18] shadow-md shadow-[#FF7A18]/10 font-bold scale-105'
                            : 'bg-[#0B0D0F] border-white/8 text-[#9A9FA8] hover:border-white/20 hover:text-[#F5F5F2]'
                        }`}
                      >
                        <div className="text-[9px] text-[#666C75]">NODE 0{i + 1}</div>
                        <div>{node.id}</div>
                      </button>
                      {i < graphNodes.length - 1 && (
                        <div className="hidden sm:flex flex-col items-center">
                          <span className="text-[9px] font-mono text-[#FF7A18]/80">{node.rel}</span>
                          <span className="text-white/20">──→</span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Selected Node Details */}
              <div className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-[#FF7A18] font-bold">Selected Node: {selectedNode}</span>
                  <p className="text-[#9A9FA8] text-[11px] mt-0.5">
                    {graphNodes.find((n) => n.id === selectedNode)?.desc}
                  </p>
                </div>
                <span className="text-[10px] text-[#666C75] px-2 py-1 rounded bg-white/5">Indexed Key</span>
              </div>

              {/* How Did You Improve It? Section */}
              <div className="pt-2 border-t border-white/6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F5F5F2] font-bold">// Query Optimization Techniques:</span>
                  <span className="text-[#FF7A18] font-semibold text-[11px]">Click technique</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  {[
                    { id: 'indexing', title: '01. INDEXING', desc: 'Composite node label and unique property index definitions in Neo4j' },
                    { id: 'patterns', title: '02. PATTERN REWRITES', desc: 'Refactoring variable-length paths to avoid combinatorial explosion' },
                    { id: 'relationships', title: '03. RELATIONSHIP TUNING', desc: 'Direct directional edge traversal instead of unconstrained MATCH' }
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setActiveOptItem(tech.id as any)}
                      className={`p-2.5 rounded-lg text-left border transition-all ${
                        activeOptItem === tech.id
                          ? 'bg-[#171B20] border-[#FF7A18]/50 text-[#F5F5F2]'
                          : 'bg-[#0B0D0F] border-white/5 text-[#9A9FA8] hover:border-white/15'
                      }`}
                    >
                      <div className="font-bold text-[#FF7A18] text-[11px]">{tech.title}</div>
                      <div className="text-[10px] text-[#9A9FA8] leading-tight mt-1">{tech.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DATASET PUBLISHING LIFECYCLE */}
        {/* ========================================================================= */}
        {activeTab === 'lifecycle' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// 70+ Production REST APIs powering the entire publishing pipeline</span>
              <span className="text-[#FF7A18] font-bold">70+ REST APIs</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {lifecycleStages.map((stage) => (
                  <div key={stage.step} className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#FF7A18] font-bold">{stage.step}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="font-bold text-[#F5F5F2]">{stage.label}</div>
                    <div className="text-[10px] text-[#9A9FA8] leading-snug">{stage.desc}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-[#171B20] border border-white/6 font-mono text-xs text-[#9A9FA8]">
                <strong className="text-[#F5F5F2]">API Architecture Coverage:</strong> Ingestion pipelines, metadata schemas, licensing terms, pricing tables, multi-tier subscriptions, and role-based access control.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GROUP SHARING & RBAC MODULE */}
        {/* ========================================================================= */}
        {activeTab === 'rbac' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Multi-Tenant Group Sharing & Policy Enforcement</span>
              <span className="text-[#FF7A18] font-bold">Architected From Scratch</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Group Node Roles */}
                <div className="p-4 rounded-xl bg-[#0B0D0F] border border-[#FF7A18]/30 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#FF7A18]/20">
                    <span className="font-bold text-[#FF7A18]">GROUP STRUCTURE</span>
                    <span className="text-[10px] text-[#666C75]">RBAC Core</span>
                  </div>
                  <ul className="space-y-1.5 text-[#9A9FA8] text-[11px] pl-2 border-l border-[#FF7A18]/20">
                    <li className="text-[#F5F5F2]">├── <strong className="text-[#FF7A18]">ADMIN Role:</strong> Full schema creation, billing, & member provisioning</li>
                    <li className="text-[#F5F5F2]">└── <strong className="text-[#9A9FA8]">MEMBER Role:</strong> Read & execute analytical queries across shared assets</li>
                  </ul>
                </div>

                {/* Shared Asset Matrix */}
                <div className="p-4 rounded-xl bg-[#0B0D0F] border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
                    <span className="font-bold text-emerald-400">SHARED ASSETS</span>
                    <span className="text-[10px] text-[#666C75]">Superset Sync</span>
                  </div>
                  <ul className="space-y-1.5 text-[#9A9FA8] text-[11px] pl-2 border-l border-emerald-500/20">
                    <li>├── <strong className="text-[#F5F5F2]">DATASETS:</strong> Scoped row & column-level permissions</li>
                    <li>├── <strong className="text-[#F5F5F2]">CHARTS:</strong> Reusable visual queries across teams</li>
                    <li>└── <strong className="text-[#F5F5F2]">DASHBOARDS:</strong> Domain-wide permission propagation in Superset</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 text-[#9A9FA8] leading-relaxed">
                <strong className="text-[#F5F5F2]">Core Role:</strong> Architected and implemented the Group Sharing / RBAC module from scratch. Built multi-tenant groups, Admin/Member roles, asset sharing across groups, and domain-wide asset permissions in Apache Superset.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PERMISSION LEAKAGE DEBUGGING STORY */}
        {/* ========================================================================= */}
        {activeTab === 'leakage' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Real Engineering Experience: When Permissions Get Complicated</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Root-Cause Cypher Refactor
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4 font-mono text-xs">
              {/* Problem to Solution Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <div className="text-[10px] text-rose-400">SYMPTOM</div>
                  <div className="font-bold mt-1">Slow Query + Permission Leakage</div>
                </div>
                <div className="flex items-center justify-center text-[#FF7A18]">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-[#F5F5F2]">
                  <div className="text-[10px] text-[#666C75]">DIAGNOSIS</div>
                  <div className="font-bold mt-1">PROFILE Execution Plan Analysis</div>
                </div>
                <div className="flex items-center justify-center text-[#FF7A18]">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="text-[10px] text-emerald-400">RESULT</div>
                  <div className="font-bold mt-1">Faster Shared Assets + Correct RBAC</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/6 space-y-2 text-[#9A9FA8] leading-relaxed">
                <p className="text-[#F5F5F2]">
                  <strong>The Debugging Narrative:</strong> When users shared nested dashboards containing dependent charts from multiple source groups, unconstrained Cypher path traversals evaluated redundant relationships, causing both latency degradation and edge-case permission leakage.
                </p>
                <p className="text-[11px] text-[#69717D]">
                  By refactoring recursive Cypher queries with explicit directional constraints and strict group-scoping predicates, we eliminated the leakage and boosted shared asset query execution speed by ~35%.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: APACHE SUPERSET INTEGRATION */}
        {/* ========================================================================= */}
        {activeTab === 'superset' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Interactive Analytics with Graph Persistence</span>
              <span className="text-[#FF7A18] font-bold">Neo4j ↔ Apache Superset</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#0B0D0F] border border-white/6">
                <div className="text-center px-3 py-2 rounded bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#666C75] block">SOURCE</span>
                  <span className="font-bold text-[#F5F5F2]">OCEANMOTION DATA</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF7A18]" />
                <div className="text-center px-3 py-2 rounded bg-[#171B20] border border-[#FF7A18]/40 text-[#FF7A18]">
                  <span className="text-[10px] text-[#FF7A18] block">ANALYTICS ENGINE</span>
                  <span className="font-bold">APACHE SUPERSET</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF7A18]" />
                <div className="text-center px-3 py-2 rounded bg-[#171B20] border border-emerald-500/40 text-emerald-400">
                  <span className="text-[10px] text-emerald-400 block">VISUALIZATION</span>
                  <span className="font-bold">CHARTS & DASHBOARDS</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/6 text-[#9A9FA8] leading-relaxed">
                <p className="text-[#F5F5F2]">
                  <strong>Integrated Apache Superset:</strong> Connected to live platform data sources to generate real-time interactive charts and dashboards, backed by persistent graph representations for charts, dashboards, and queries stored in Neo4j.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metrics Strip */}
      <div className="pt-4 border-t border-white/8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-[#111418] border border-white/6">
            <span className="text-base font-bold text-[#FF7A18] block">70+</span>
            <span className="text-[11px] text-[#9A9FA8]">REST APIs</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111418] border border-white/6">
            <span className="text-base font-bold text-[#F5F5F2] block">35+</span>
            <span className="text-[11px] text-[#9A9FA8]">Cypher Queries</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111418] border border-white/6">
            <span className="text-base font-bold text-emerald-400 block">30–40%</span>
            <span className="text-[11px] text-[#9A9FA8]">Execution Speedup</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111418] border border-white/6">
            <span className="text-base font-bold text-[#F5F5F2] block">RBAC</span>
            <span className="text-[11px] text-[#9A9FA8]">Group Sharing Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
