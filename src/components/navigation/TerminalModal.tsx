import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'curl /akash',
      output: (
        <pre className="text-[#7C9CFF] font-mono text-xs whitespace-pre-wrap leading-relaxed">
{JSON.stringify(
  {
    name: 'Akash Singh',
    role: 'Backend-focused Software Engineer',
    motto: 'Understand the system. Build the solution. Make it better.',
    specialization: 'System Design · Database Optimization · Automation · API Architecture',
    metrics: {
      graph_queries_optimized: '35+',
      query_latency_gain: '~40%',
      search_response_time: '<100ms',
      tourism_reqs_daily: '500+'
    },
    contact: {
      github: 'https://github.com/akashsingh-ops',
      linkedin: 'https://www.linkedin.com/in/akash-singh-aa0b601a3/',
      email: 'akashsingh285285@gmail.com'
    }
  },
  null,
  2
)}
        </pre>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-[#9A9FA8] text-xs space-y-1 font-mono">
            <p className="text-[#FF7A18] font-bold">// Available commands:</p>
            <p><span className="text-[#F5F5F2]">curl /akash</span> - Raw profile data</p>
            <p><span className="text-[#F5F5F2]">resume</span> - View official resume</p>
            <p><span className="text-[#F5F5F2]">projects</span> - Flagship case studies</p>
            <p><span className="text-[#F5F5F2]">skills</span> - Core engineering capabilities</p>
            <p><span className="text-[#F5F5F2]">philosophy</span> - Core engineering manifesto</p>
            <p><span className="text-[#F5F5F2]">clear</span> - Clear output</p>
            <p><span className="text-[#F5F5F2]">exit</span> - Close terminal</p>
          </div>
        );
        break;
      case 'resume':
      case 'cat resume':
      case 'cat resume.pdf':
      case 'open resume':
        output = (
          <div className="text-xs font-mono space-y-2 text-[#9A9FA8]">
            <p className="text-emerald-400 font-bold">✓ Official Resume document on Google Drive</p>
            <div className="pt-1">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Akash Singh's resume — opens in a new tab"
                className="text-[#FF7A18] hover:underline font-bold"
              >
                [View Resume ↗]
              </a>
            </div>
          </div>
        );
        break;
      case 'curl /akash':
      case 'curl akash':
      case 'akash':
        output = (
          <pre className="text-[#7C9CFF] font-mono text-xs whitespace-pre-wrap leading-relaxed">
{JSON.stringify(
  {
    engineer: profileData.name,
    tagline: profileData.tagline,
    core_stack: ['Python', 'Django', 'Neo4j', 'Redis', 'AWS OpenSearch', 'Amazon Redshift', 'Celery'],
    interests: profileData.engineeringInterests
  },
  null,
  2
)}
          </pre>
        );
        break;
      case 'projects':
        output = (
          <div className="text-[#9A9FA8] text-xs font-mono space-y-1.5">
            <p className="text-[#F5F5F2] font-bold">1. Geek-Search</p>
            <p className="text-xs text-[#666C75]">1,000+ Students · 10,000+ Submissions · ~40% Latency Improvement</p>
            <p className="text-[#F5F5F2] font-bold pt-1">2. EazEae</p>
            <p className="text-xs text-[#666C75]">500+ Daily Requests · ~75% Faster Responses · QR-based access</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="text-xs font-mono text-[#9A9FA8] space-y-1">
            <p className="text-[#FF7A18] font-bold">[PRIMARY STACK]</p>
            <p>Python · Django REST Framework · Neo4j (Cypher) · Celery · MySQL · Redis · AWS OpenSearch · Redshift</p>
          </div>
        );
        break;
      case 'philosophy':
        output = (
          <p className="text-[#FF7A18] text-xs font-mono italic">
            "Understand the problem before writing the code."
          </p>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            command not found: {cmd}. Type <span className="underline text-[#FF7A18] cursor-pointer" onClick={() => setInput('help')}>help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0B0D0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Terminal Header */}
        <div className="bg-[#111418] px-4 py-3 border-b border-white/8 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setHistory([])} />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#9A9FA8] ml-2">
              <Terminal className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>akash@system: ~ (zsh)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#9A9FA8] hover:text-[#F5F5F2] p-1 rounded"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs space-y-4 bg-[#0B0D0F]">
          <div className="text-[11px] text-[#666C75] border-b border-white/6 pb-2">
            Akash Singh Terminal CLI · Type <span className="text-[#FF7A18]">help</span> or <span className="text-[#FF7A18]">exit</span>.
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[#FF7A18] font-bold">akash:~$</span>
                <span className="text-[#F5F5F2]">{item.command}</span>
              </div>
              <div className="pl-3 border-l border-white/10">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleCommand} className="bg-[#111418] px-4 py-3 border-t border-white/8 flex items-center gap-2">
          <span className="text-[#FF7A18] font-mono text-xs font-bold">akash:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command (e.g. help, curl /akash)..."
            className="flex-1 bg-transparent font-mono text-xs text-[#F5F5F2] focus:outline-none placeholder-[#666C75]"
          />
          <button
            type="submit"
            className="text-xs font-mono text-[#9A9FA8] hover:text-[#FF7A18] flex items-center gap-1 bg-white/5 px-2 py-1 rounded"
          >
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
