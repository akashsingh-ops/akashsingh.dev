import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Shield, Bell, UserCheck, Cpu, ArrowRight, CheckCircle2, Layers, Database, Terminal, RefreshCw } from 'lucide-react';

export const MimasaAiDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'onboarding' | 'workspace' | 'notifications' | 'ai'>('search');
  const [searchQuery, setSearchQuery] = useState('sales dashbord');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [isSearchSimulating, setIsSearchSimulating] = useState(false);

  // Search typo correction simulation loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (activeTab === 'search') {
      const runSim = () => {
        setIsSearchSimulating(true);
        setSearchQuery('sales dashbord');
        setIsCorrecting(false);

        timeout = setTimeout(() => {
          setIsCorrecting(true);
          setSearchQuery('sales dashboard');
          setIsSearchSimulating(false);
        }, 1400);
      };

      runSim();
      const interval = setInterval(runSim, 6000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [activeTab]);

  return (
    <div className="bg-[#0B0D0F] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Header & Interactive Contribution Map Selector */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/6 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A18] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF7A18] font-bold">
              MIMASA AI // ENGINEERING CONTRIBUTIONS
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#666C75]">
            Xaigi Technology · GenAI & Data Science Collaboration
          </span>
        </div>

        {/* Contribution Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#111418] border border-white/6 font-mono text-xs">
          {[
            { id: 'search', label: 'INTELLIGENT SEARCH', icon: Search },
            { id: 'onboarding', label: 'ONBOARDING PIPELINE', icon: UserCheck },
            { id: 'workspace', label: 'TENANT WORKSPACE', icon: Shield },
            { id: 'notifications', label: 'NOTIFICATIONS (CELERY)', icon: Bell },
            { id: 'ai', label: 'AI COLLABORATION', icon: Sparkles }
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

      {/* Tab Panels */}
      <div className="min-h-[260px] flex flex-col justify-center">
        {/* ========================================================================= */}
        {/* TAB 1: INTELLIGENT SEARCH SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9A9FA8]">
              <span>// Entity Scope: datasources · dashboards · charts · analyses</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                &lt;100ms response time
              </span>
            </div>

            {/* Interactive Query Box */}
            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-3">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0B0D0F] border border-white/10 font-mono text-sm">
                <Search className="w-4 h-4 text-[#FF7A18]" />
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-[#F5F5F2]">{searchQuery}</span>
                  <span className="w-2 h-4 bg-[#FF7A18] animate-pulse" />
                </div>
                {isCorrecting && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Typo Corrected (dashbord → dashboard)
                  </span>
                )}
              </div>

              {/* Live search capability badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[11px]">
                {[
                  { label: 'Full-text', active: true },
                  { label: 'Fuzzy Search', active: isCorrecting },
                  { label: 'Autocomplete', active: true },
                  { label: 'Prefix Match', active: true },
                  { label: 'Typo Correction', active: isCorrecting }
                ].map((cap, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-center border transition-all ${
                      cap.active
                        ? 'bg-[#171B20] border-[#FF7A18]/40 text-[#F5F5F2]'
                        : 'bg-[#0B0D0F] border-white/5 text-[#666C75]'
                    }`}
                  >
                    <div className="text-[10px] text-[#FF7A18]">0{idx + 1}</div>
                    <div className="font-bold">{cap.label}</div>
                  </div>
                ))}
              </div>

              {/* Mock Search Results with Sub-100ms badge */}
              <div className="space-y-1.5 pt-2 border-t border-white/6 font-mono text-xs">
                <div className="p-2 rounded bg-[#0B0D0F] border border-white/6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">DASHBOARD</span>
                    <span className="text-[#F5F5F2] font-semibold">Q3 Global Enterprise Sales Performance</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">18ms</span>
                </div>
                <div className="p-2 rounded bg-[#0B0D0F] border border-white/6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">DATASOURCE</span>
                    <span className="text-[#F5F5F2] font-semibold">PostgreSQL_Production_Sales_Replication</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">24ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 6-STEP ONBOARDING PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'onboarding' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// 6-step signal onboarding pipeline feeding GenAI recommendations</span>
              <span className="text-[#FF7A18] font-bold">Metadata → Signal Flow</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {[
                  { step: '01', title: 'Personal Signals', desc: 'Identity, locale, and workspace role' },
                  { step: '02', title: 'Professional Context', desc: 'Industry domain, data team tier, permissions' },
                  { step: '03', title: 'Analytics Interests', desc: 'Preferred metrics, dashboards, and KPIs' },
                  { step: '04', title: 'Profile Aggregation', desc: 'Consolidation of multi-attribute vector weights' },
                  { step: '05', title: 'Signal Normalization', desc: 'Scoped metadata ingestion to backend DB' },
                  { step: '06', title: 'GenAI Seeding', desc: 'Personalized prompts and recommended insights' }
                ].map((s) => (
                  <div key={s.step} className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#FF7A18] font-bold">{s.step}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="font-bold text-[#F5F5F2]">{s.title}</div>
                    <div className="text-[11px] text-[#9A9FA8] leading-tight">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-[#171B20] border border-[#FF7A18]/20 font-mono text-xs text-[#D8DEE5] flex items-center gap-2">
                <span className="text-[#FF7A18] font-bold">Outcome:</span>
                <span>Built the complete 6-step onboarding flow capturing personal, professional, and interest-based metadata to support personalized GenAI recommendations.</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TENANT WORKSPACE ISOLATION */}
        {/* ========================================================================= */}
        {activeTab === 'workspace' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Scoped Database Isolation & Permission Enforcement</span>
              <span className="text-emerald-400 font-bold">100% Boundary Isolation</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organization A */}
                <div className="p-4 rounded-xl bg-[#0B0D0F] border border-blue-500/30 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-blue-500/20">
                    <span className="font-bold text-blue-400">ORGANIZATION A</span>
                    <span className="text-[10px] text-[#666C75]">org_id: #A-8942</span>
                  </div>
                  <ul className="space-y-1 text-[#9A9FA8] text-[11px] pl-2 border-l border-blue-500/20">
                    <li>├── User: Admin (akash@orga.com)</li>
                    <li>├── User: Data Analyst (team@orga.com)</li>
                    <li>└── Scoped Assets: Datasources · Charts · Dashboards</li>
                  </ul>
                </div>

                {/* Organization B */}
                <div className="p-4 rounded-xl bg-[#0B0D0F] border border-purple-500/30 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-purple-500/20">
                    <span className="font-bold text-purple-400">ORGANIZATION B</span>
                    <span className="text-[10px] text-[#666C75]">org_id: #B-5103</span>
                  </div>
                  <ul className="space-y-1 text-[#9A9FA8] text-[11px] pl-2 border-l border-purple-500/20">
                    <li>├── User: Executive (lead@orgb.com)</li>
                    <li>├── User: Operations (ops@orgb.com)</li>
                    <li>└── Scoped Assets: Isolated Tables · Workflows</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 font-mono text-xs text-[#9A9FA8] space-y-1">
                <p className="text-[#F5F5F2]">
                  <strong className="text-[#FF7A18]">Tenant-based data isolation:</strong> Enforced at the database layer using scoped database records, organization IDs, and RBAC token claims.
                </p>
                <p className="text-[11px] text-[#666C75]">
                  Guarantees that no cross-tenant query, search term, or dashboard cache can leak across organization boundaries.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ASYNC NOTIFICATIONS & CELERY PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Decoupled Asynchronous Event Architecture</span>
              <span className="text-[#FF7A18] font-bold">Signals → Celery → Dispatches</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              {/* Event Flow Pipeline */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[#0B0D0F] border border-white/6 font-mono text-xs">
                <div className="text-center px-2 py-1 rounded bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#666C75] block">TRIGGER</span>
                  <span className="font-bold text-[#F5F5F2]">EVENT</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF7A18]" />
                <div className="text-center px-2 py-1 rounded bg-[#171B20] border border-[#FF7A18]/30">
                  <span className="text-[10px] text-[#FF7A18] block">HOOK</span>
                  <span className="font-bold text-[#FF7A18]">DJANGO SIGNAL</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF7A18]" />
                <div className="text-center px-2 py-1 rounded bg-[#171B20] border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 block">WORKER</span>
                  <span className="font-bold text-emerald-400">CELERY TASK</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF7A18]" />
                <div className="text-center px-2 py-1 rounded bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#666C75] block">DISPATCH</span>
                  <span className="font-bold text-[#F5F5F2]">NOTIFICATION</span>
                </div>
              </div>

              {/* Notification Channel Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { channel: 'In-app Bell Feeds', desc: 'Instant UI updates' },
                  { channel: 'Transactional Email', desc: 'Reports & invitations' },
                  { channel: 'Security Alerts', desc: 'Auth & policy anomalies' },
                  { channel: 'Organization Updates', desc: 'Tenant status changes' },
                  { channel: 'Asset Sharing', desc: 'Dashboard & chart shares' },
                  { channel: 'Team Collaboration', desc: 'Comments & mentions' }
                ].map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#0B0D0F] border border-white/6">
                    <div className="font-bold text-[#F5F5F2]">{c.channel}</div>
                    <div className="text-[10px] text-[#9A9FA8]">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: AI COLLABORATION */}
        {/* ========================================================================= */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9FA8]">
              <span>// Cross-Team Work with GenAI and Data Science Specialists</span>
              <span className="text-[#FF7A18] font-bold">RAG · LangChain · NL → SQL</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111418] border border-white/8 space-y-4">
              {/* Architecture Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {[
                  { step: '01', title: 'USER QUERY', desc: 'Plain-language business question' },
                  { step: '02', title: 'RAG & CONTEXT', desc: 'Schema & semantic metadata retrieval' },
                  { step: '03', title: 'LANGCHAIN FLOW', desc: 'NL-to-SQL & query plan generation' },
                  { step: '04', title: 'INSIGHT & FORECAST', desc: 'Generated charts and automated actions' }
                ].map((item) => (
                  <div key={item.step} className="p-3 rounded-lg bg-[#0B0D0F] border border-white/6 space-y-1">
                    <span className="text-[10px] font-bold text-[#FF7A18]">{item.step}</span>
                    <h5 className="font-bold text-[#F5F5F2]">{item.title}</h5>
                    <p className="text-[10px] text-[#9A9FA8] leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Exact Role Clarification Banner */}
              <div className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/8 font-mono text-xs text-[#9A9FA8] space-y-1">
                <span className="text-[10px] font-mono text-[#FF7A18] uppercase tracking-wider font-bold block">
                  // Collaboration Note
                </span>
                <p className="text-[#F5F5F2]">
                  Collaborated with the <strong>GenAI and Data Science teams</strong> on RAG-based systems, LangChain/LangGraph workflows, NL-to-SQL, insight generation, and forecasting — providing high-throughput backend services, data contracts, and search endpoints.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Animated Conclusion Bar */}
      <div className="pt-4 border-t border-white/8">
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#111418] via-[#171B20] to-[#111418] border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#FF7A18] font-bold">DATA</span>
            <span className="text-white/20">→</span>
            <span className="text-[#F5F5F2]">UNDERSTAND</span>
            <span className="text-white/20">→</span>
            <span className="text-[#F5F5F2]">DECIDE</span>
            <span className="text-white/20">→</span>
            <span className="text-emerald-400 font-bold">ACT</span>
          </div>
          <div className="text-[#9A9FA8] text-[11px] font-medium">
            "From understanding data to acting on it."
          </div>
        </div>
      </div>
    </div>
  );
};
