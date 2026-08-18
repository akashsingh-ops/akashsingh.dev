import React, { useState } from 'react';
import { Shield, Building2, UserCheck, Lock, Database, CheckCircle2, AlertCircle } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  users: string[];
  roles: string[];
  allowedDatasets: string[];
}

const tenants: Tenant[] = [
  {
    id: 'tenant-a',
    name: 'Enterprise Org Alpha',
    users: ['alice@alpha.io (Admin)', 'bob@alpha.io (Analyst)'],
    roles: ['SuperAdmin', 'DataAnalyst'],
    allowedDatasets: ['alpha_finance_db', 'alpha_graph_nodes', 'alpha_audit_logs']
  },
  {
    id: 'tenant-b',
    name: 'Healthcare Beta',
    users: ['carol@beta.med (Lead)', 'david@beta.med (Auditor)'],
    roles: ['OrgAdmin', 'SecurityAuditor'],
    allowedDatasets: ['beta_patient_records', 'beta_access_telemetry']
  },
  {
    id: 'tenant-c',
    name: 'Logistics Gamma',
    users: ['elena@gamma.co (Manager)', 'frank@gamma.co (Operator)'],
    roles: ['FleetAdmin', 'TelemetryViewer'],
    allowedDatasets: ['gamma_fleet_telemetry', 'gamma_route_graphs']
  }
];

export const RbacArchitecture: React.FC = () => {
  const [selectedTenantId, setSelectedTenantId] = useState<string>('tenant-a');
  const [testAction, setTestAction] = useState<'read_own' | 'cross_tenant'>('read_own');
  const [auditLog, setAuditLog] = useState<string>('Tenant Alpha context injected into request context. Query scoped to tenant_id=org_alpha.');

  const selectedTenant = tenants.find((t) => t.id === selectedTenantId) || tenants[0];

  const handleTestSimulation = (type: 'read_own' | 'cross_tenant') => {
    setTestAction(type);
    if (type === 'read_own') {
      setAuditLog(`[RBAC 200 OK] User query matched tenant context (${selectedTenant.name}). Scoped filter applied automatically: WHERE tenant_id == '${selectedTenant.id}'.`);
    } else {
      setAuditLog(`[RBAC 403 FORBIDDEN] User from ${selectedTenant.name} attempted cross-tenant access to another organization's dataset. Middleware rejected request before reaching DB layer.`);
    }
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-xl p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#21262D]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#FF6A00]" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            MULTI-TENANT RBAC ENFORCEMENT SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => handleTestSimulation('read_own')}
            className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
          >
            Authorized Scoped Read
          </button>
          <button
            onClick={() => handleTestSimulation('cross_tenant')}
            className="px-2.5 py-1 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
          >
            Test Cross-Tenant Isolation
          </button>
        </div>
      </div>

      {/* Tenant Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tenants.map((tenant) => {
          const isSelected = tenant.id === selectedTenantId;
          return (
            <button
              key={tenant.id}
              onClick={() => {
                setSelectedTenantId(tenant.id);
                setAuditLog(`Switched context to ${tenant.name}. RBAC filters dynamically bound to ${tenant.id}.`);
              }}
              className={`p-3 rounded-xl border text-left font-mono transition-all ${
                isSelected
                  ? 'bg-[#FF6A00]/15 border-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/10'
                  : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#8B949E]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Building2 className="w-4 h-4 text-[#FFA34D]" />
                <span className="text-[10px] text-[#FFA34D] uppercase font-bold">
                  TENANT
                </span>
              </div>
              <div className="font-bold text-xs text-white">{tenant.name}</div>
              <div className="text-[10px] text-[#8B949E]">{tenant.users.length} Users · {tenant.roles.length} Roles</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Isolation Topology */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Tier 1: Scoped Users */}
        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E] pb-1 border-b border-[#21262D]">
            <span>1. AUTHENTICATED USERS</span>
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="space-y-1.5 pt-1">
            {selectedTenant.users.map((u, i) => (
              <div key={i} className="p-2 rounded bg-[#0D1117] text-[#C9D1D9] text-[11px] border border-[#21262D]">
                {u}
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: RBAC Roles & Permissions */}
        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E] pb-1 border-b border-[#21262D]">
            <span>2. ENFORCED ROLES</span>
            <Lock className="w-3.5 h-3.5 text-[#FF6A00]" />
          </div>
          <div className="space-y-1.5 pt-1">
            {selectedTenant.roles.map((r, i) => (
              <div key={i} className="p-2 rounded bg-[#0D1117] text-[#FFA34D] text-[11px] border border-[#21262D] font-bold">
                ROLE: {r}
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Isolated Datasets */}
        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E] pb-1 border-b border-[#21262D]">
            <span>3. SCOPED DATASETS</span>
            <Database className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="space-y-1.5 pt-1">
            {selectedTenant.allowedDatasets.map((d, i) => (
              <div key={i} className="p-2 rounded bg-[#0D1117] text-emerald-300 text-[11px] border border-[#21262D]">
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Middleware Audit Log */}
      <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] font-mono text-xs flex items-start gap-2.5">
        {testAction === 'read_own' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <span className="text-[#8B949E] font-bold uppercase text-[10px] block">
            MIDDLEWARE ENFORCEMENT AUDIT:
          </span>
          <p className={testAction === 'read_own' ? 'text-emerald-400' : 'text-rose-400'}>
            {auditLog}
          </p>
        </div>
      </div>
    </div>
  );
};
