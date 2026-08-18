import React, { useState } from 'react';
import { QrCode, ShieldCheck, Database, Check, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

export const EazEaeDiagram: React.FC = () => {
  const [scanType, setScanType] = useState<'valid' | 'duplicate'>('valid');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'validated' | 'rejected'>('idle');
  const [scanLogs, setScanLogs] = useState<string>('Ready for monument gate scan...');

  const runScanSimulation = (type: 'valid' | 'duplicate') => {
    setScanType(type);
    setScanStatus('scanning');
    setScanLogs('Scanning encrypted QR token payload at monument entry gate...');

    setTimeout(() => {
      if (type === 'valid') {
        setScanStatus('validated');
        setScanLogs('ATOMIC VALIDATION SUCCESS: Token #EAZEAE_AGRA_9041 verified. Status updated to USED. Gate Opened (Latency: 42ms).');
      } else {
        setScanStatus('rejected');
        setScanLogs('CONCURRENCY CONFLICT PREVENTED: Token #EAZEAE_AGRA_9041 was already marked USED at 07:14:02. Access Denied.');
      }
    }, 600);
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-xl p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#21262D]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            EAZEAE // CONCURRENCY-SAFE QR VALIDATION ARCHITECTURE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => runScanSimulation('valid')}
            className="px-3 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 font-mono text-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Simulate Valid Pass</span>
          </button>
          <button
            onClick={() => runScanSimulation('duplicate')}
            className="px-3 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 font-mono text-xs transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Test Duplicate Scan</span>
          </button>
        </div>
      </div>

      {/* Interactive System Flow Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-center font-mono text-xs">
        {/* Node 1 */}
        <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] flex flex-col items-center justify-center space-y-1">
          <QrCode className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-[11px]">1. SCAN QR</span>
          <span className="text-[9px] text-[#8B949E]">Visitor at gate</span>
        </div>

        {/* Node 2 */}
        <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] flex flex-col items-center justify-center space-y-1">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-white text-[11px]">2. INGRESS REQ</span>
          <span className="text-[9px] text-[#8B949E]">Express API</span>
        </div>

        {/* Node 3 */}
        <div className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all ${
          scanStatus === 'scanning' ? 'bg-[#FF6A00]/20 border-[#FF6A00]' : 'bg-[#161B22] border-[#30363D]'
        }`}>
          <ShieldCheck className="w-5 h-5 text-[#FF6A00]" />
          <span className="font-bold text-white text-[11px]">3. ATOMIC CHECK</span>
          <span className="text-[9px] text-[#8B949E]">Token state match</span>
        </div>

        {/* Node 4 */}
        <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] flex flex-col items-center justify-center space-y-1">
          <Database className="w-5 h-5 text-purple-400" />
          <span className="font-bold text-white text-[11px]">4. DB MUTATION</span>
          <span className="text-[9px] text-[#8B949E]">Indexed MongoDB</span>
        </div>

        {/* Node 5 */}
        <div className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all ${
          scanStatus === 'validated'
            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
            : scanStatus === 'rejected'
            ? 'bg-rose-950/50 border-rose-500 text-rose-300'
            : 'bg-[#161B22] border-[#30363D]'
        }`}>
          {scanStatus === 'validated' ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : scanStatus === 'rejected' ? (
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-[#8B949E]" />
          )}
          <span className="font-bold text-[11px]">
            {scanStatus === 'validated' ? 'ALLOW (200)' : scanStatus === 'rejected' ? 'REJECT (409)' : '5. VERDICT'}
          </span>
          <span className="text-[9px] text-[#8B949E]">
            {scanStatus === 'validated' ? 'Gate opened' : scanStatus === 'rejected' ? 'Duplicate blocked' : 'Single-use safe'}
          </span>
        </div>
      </div>

      {/* Telemetry Output Log */}
      <div className="bg-[#161B22] p-3.5 rounded-lg border border-[#21262D] font-mono text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#8B949E] font-bold">STATUS:</span>
          <span className={scanStatus === 'validated' ? 'text-emerald-400' : scanStatus === 'rejected' ? 'text-rose-400' : 'text-[#C9D1D9]'}>
            {scanLogs}
          </span>
        </div>
        <span className="text-[10px] text-[#FFA34D] font-bold px-2 py-0.5 rounded bg-[#21262D] border border-[#30363D]">
          ~75% FASTER
        </span>
      </div>

      {/* Engineering Story Note */}
      <div className="text-xs text-[#8B949E] leading-relaxed bg-[#161B22]/60 p-3 rounded-lg border border-[#30363D]/70">
        <span className="text-[#FFA34D] font-semibold font-mono uppercase block mb-1">
          // The Concurrency Debugging Lesson:
        </span>
        "Initially investigated as an API performance slowdown, profiling revealed race conditions when validating tourist tokens concurrently. Redesigning the validation pipeline to perform atomic conditional updates directly in MongoDB eliminated lock contention and boosted response speed by ~75%."
      </div>
    </div>
  );
};
