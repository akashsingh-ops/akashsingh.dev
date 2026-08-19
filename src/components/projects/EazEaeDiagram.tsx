import React, { useState } from 'react';
import { QrCode, Smartphone, Database, CheckCircle2, Zap, Clock, Shield } from 'lucide-react';

export const EazEaeDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scanned, setScanned] = useState<boolean>(false);

  const steps = [
    {
      title: 'Dynamic QR Scan',
      desc: 'Visitor scans QR at physical tourist attraction via mobile camera.',
      metric: '500+ Daily Visitors'
    },
    {
      title: 'Instant Content Delivery',
      desc: 'Pre-rendered multilingual audio/text guides served with optimized asset compression.',
      metric: '~75% Faster Access'
    },
    {
      title: 'Low-Connectivity Fallback',
      desc: 'Client caching and lightweight payloads ensure zero deadlocks in remote heritage sites.',
      metric: '99.9% Uptime'
    }
  ];

  const handleScan = () => {
    setScanned(true);
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => setScanned(false), 3000);
    }, 1200);
  };

  return (
    <div className="bg-[#0F161E] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6B53]" />
          <span className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
            EAZEAE // QR VISITOR PIPELINE & EDGE CACHING
          </span>
        </div>
        <button
          onClick={handleScan}
          disabled={scanned}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151E27] hover:bg-[#1B2630] border border-[#FF6B53]/40 text-[#FF6B53] font-mono text-xs font-semibold transition-all disabled:opacity-50"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{scanned ? 'Scanning QR...' : 'Simulate QR Entry'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((step, idx) => {
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
        <span>Pipeline: QR SCAN → CACHED ASSET DISPATCH → MULTILINGUAL AUDIO</span>
        <span className="text-emerald-400 font-bold">500+ Daily Requests</span>
      </div>
    </div>
  );
};
