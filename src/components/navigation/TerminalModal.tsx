import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Terminal, X, CornerDownLeft, ArrowUpRight, Github, Linkedin, Mail, Check, Copy, ExternalLink, Sparkles, Volume2, VolumeX, Network, Shield, Search, Database } from 'lucide-react';
import { profileData, RESUME_URL } from '../../data/profile';
import { cliSounds } from '../../audio/cliSounds';
import { ProjectId } from '../projects/ProjectsSection';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (project: ProjectId) => void;
  onNavigateSection?: (sectionId: string) => void;
}

interface CommandEntry {
  id: string;
  command: string;
  cwd?: string;
  output: React.ReactNode;
}

const ALL_AUTOCOMPLETE_COMMANDS = [
  'help',
  'help --advanced',
  'whoami',
  'about',
  'projects',
  'mimasa',
  'mimasa-ai',
  'oceanmotion',
  'xaigi',
  'architecture',
  'work',
  'open mimasa-ai',
  'open oceanmotion',
  'open geek-search',
  'open eazeae',
  'open xaigi',
  'open dell',
  'open innefu',
  'open terra-link',
  'experience',
  'skills',
  'thinking',
  'journey',
  'devlore',
  'github',
  'linkedin',
  'leetcode',
  'resume',
  'contact',
  'status',
  'stack',
  'sound on',
  'sound off',
  'sound toggle',
  'ls',
  'cd projects',
  'cd experience',
  'cd skills',
  'cd about',
  'cd ..',
  'cat about.txt',
  'cat philosophy.txt',
  'cat now.txt',
  'cat resume.url',
  'cat contact.txt',
  'cat mimasa.txt',
  'cat oceanmotion.txt',
  'neofetch',
  'git log',
  'git log --oneline',
  'sudo hire akash',
  'coffee',
  'ping akash',
  'make future',
  'clear',
  'exit'
];

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onNavigateSection
}) => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [autocompleteGhost, setAutocompleteGhost] = useState('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => cliSounds.getSoundEnabled());

  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  // Initial Welcome Output
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      id: 'init-boot',
      command: 'init',
      cwd: '~',
      output: (
        <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
          <div className="text-[#69717D] space-y-0.5">
            <p>loading profile...</p>
            <p>loading projects (Mimasa AI, Geek-Search, OceanMotion, EazEae)...</p>
            <p>loading experience (Xaigi Technology, Dell, Innefu)...</p>
          </div>
          <div className="space-y-0.5 text-[#D8DEE5]">
            <p className="text-emerald-400 font-medium">✓ profile loaded</p>
            <p className="text-emerald-400 font-medium">✓ 4 core projects indexed</p>
            <p className="text-emerald-400 font-medium">✓ systems ready</p>
          </div>
          <div className="pt-1.5 text-[#69717D]">
            Type <span className="text-[#FF7A18] font-bold">"help"</span> to see commands or try <span className="text-[#FF7A18]">"projects"</span> or <span className="text-[#FF7A18]">"mimasa"</span>.
          </div>
        </div>
      )
    }
  ]);

  // Audio activation and input focus on terminal open
  useEffect(() => {
    if (isOpen) {
      cliSounds.initContext();
      cliSounds.playOpen();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    cliSounds.playClose();
    onClose();
  };

  // Scroll to bottom when history grows
  useEffect(() => {
    if (isOpen) {
      bottomAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Autocomplete ghost calculation
  useEffect(() => {
    const trimmed = input.toLowerCase();
    if (!trimmed) {
      setAutocompleteGhost('');
      return;
    }
    const match = ALL_AUTOCOMPLETE_COMMANDS.find((cmd) => cmd.startsWith(trimmed) && cmd !== trimmed);
    if (match) {
      setAutocompleteGhost(match.slice(trimmed.length));
    } else {
      setAutocompleteGhost('');
    }
  }, [input]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profileData.socialLinks.email);
    setCopiedEmail(true);
    cliSounds.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenProjectAction = (project: ProjectId) => {
    cliSounds.playSuccess();
    if (onOpenProject) {
      onOpenProject(project);
    } else {
      const workElem = document.getElementById('work');
      if (workElem) workElem.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  const executeCommand = (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    // Trigger mechanical click audio feedback on command submission
    cliSounds.playEnterClick();

    // Record in history buffer for up/down navigation
    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    const args = lower.split(' ').filter(Boolean);
    const mainCmd = args[0];
    const subArg = args.slice(1).join(' ');

    let outputNode: React.ReactNode = null;

    // ==========================================
    // COMMAND DISPATCHER
    // ==========================================

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    if (lower === 'exit' || lower === 'quit' || lower === ':q') {
      handleCloseModal();
      setInput('');
      return;
    }

    // Audio sound toggle commands
    if (mainCmd === 'sound' || mainCmd === 'audio' || mainCmd === 'mute') {
      if (subArg === 'off' || subArg === 'mute' || mainCmd === 'mute') {
        cliSounds.setSoundEnabled(false);
        setSoundEnabled(false);
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#69717D]">Mechanical audio feedback: <span className="text-rose-400 font-bold">DISABLED</span></p>
            <p className="text-[#69717D] text-[11px]">Type <span className="text-[#FF7A18]">sound on</span> to re-enable.</p>
          </div>
        );
      } else if (subArg === 'on' || subArg === 'enable') {
        cliSounds.setSoundEnabled(true);
        setSoundEnabled(true);
        cliSounds.playSuccess();
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#69717D]">Mechanical audio feedback: <span className="text-emerald-400 font-bold">ENABLED</span></p>
            <p className="text-[#69717D] text-[11px]">Tactile mechanical clicks and soft synth blips active.</p>
          </div>
        );
      } else {
        const next = cliSounds.toggleMute();
        setSoundEnabled(next);
        if (next) cliSounds.playSuccess();
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#69717D]">
              Mechanical audio: {next ? <span className="text-emerald-400 font-bold">ENABLED</span> : <span className="text-rose-400 font-bold">DISABLED</span>}
            </p>
          </div>
        );
      }

      setHistory((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          command: trimmed,
          cwd: currentDir,
          output: outputNode
        }
      ]);
      setInput('');
      return;
    }

    switch (mainCmd) {
      case 'help':
      case '?':
        if (subArg === '--advanced' || subArg === '-a' || subArg === 'advanced') {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-[#FF7A18] font-semibold">// Advanced terminal commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[#69717D]">
                <div><span className="text-[#D8DEE5] font-medium">architecture</span> → system topology</div>
                <div><span className="text-[#D8DEE5] font-medium">xaigi</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Xaigi Tech work</div>
                <div><span className="text-[#D8DEE5] font-medium">mimasa</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Mimasa AI deep dive</div>
                <div><span className="text-[#D8DEE5] font-medium">oceanmotion</span> &nbsp;→ OceanMotion graph</div>
                <div><span className="text-[#D8DEE5] font-medium">ls / cd</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ filesystem navigation</div>
                <div><span className="text-[#D8DEE5] font-medium">cat &lt;file&gt;</span> &nbsp;&nbsp;→ inspect files</div>
                <div><span className="text-[#D8DEE5] font-medium">status</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ runtime overview</div>
                <div><span className="text-[#D8DEE5] font-medium">stack</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ depth breakdown</div>
                <div><span className="text-[#D8DEE5] font-medium">neofetch</span> &nbsp;&nbsp;&nbsp;→ developer specs</div>
                <div><span className="text-[#D8DEE5] font-medium">git log</span> &nbsp;&nbsp;&nbsp;&nbsp;→ career timeline</div>
              </div>
              <div className="pt-2 border-t border-white/6 text-[#69717D]">
                <p className="text-[#FF7A18] font-medium">// Easter eggs:</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/8 text-[#D8DEE5]">sudo hire akash</span>
                  <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/8 text-[#D8DEE5]">coffee</span>
                  <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/8 text-[#D8DEE5]">ping akash</span>
                </div>
              </div>
            </div>
          );
        } else {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-[#FF7A18] font-semibold">Available commands:</p>
              <div className="space-y-1 text-[#69717D]">
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">about</span> → who is Akash?</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">projects</span> → explore 4 key case studies</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">mimasa</span> → Mimasa AI (Search · Multi-tenant · AI)</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">oceanmotion</span> → OceanMotion (Neo4j · 70+ APIs · RBAC)</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">xaigi</span> → Xaigi Technology overview</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">architecture</span> → backend system topology</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">experience</span> → career journey</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">skills</span> → technical stack</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">resume</span> → open official resume</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">contact</span> → contact Akash</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">sound [on|off]</span> → mechanical clicks</p>
                <p><span className="text-[#D8DEE5] font-medium inline-block w-28">clear</span> → clear terminal</p>
              </div>
              <div className="pt-2 text-[11px] text-[#69717D] border-t border-white/6">
                Tip: try <button onClick={() => executeCommand('open mimasa-ai')} className="text-[#FF7A18] underline hover:text-[#FF8B33]">"open mimasa-ai"</button> or <button onClick={() => executeCommand('open oceanmotion')} className="text-[#FF7A18] underline hover:text-[#FF8B33]">"open oceanmotion"</button>
              </div>
            </div>
          );
        }
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div>
              <p className="text-sm font-bold text-[#F5F5F2]">Akash Singh</p>
              <p className="text-[#FF7A18]">Backend & Systems Software Engineer</p>
              <p className="text-[#69717D] text-[11px]">APIs · Graph Databases · Multi-tenancy · Search · Data & AI Workflows</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#69717D] font-semibold">focus:</p>
              <div className="pl-3 space-y-0.5 text-[#D8DEE5]">
                <p>• High-throughput REST APIs & Django / Celery</p>
                <p>• Graph Database Modeling & Cypher Optimization (Neo4j)</p>
                <p>• Multi-Tenant RBAC & Data Isolation</p>
                <p>• Sub-100ms Search & Typo Correction</p>
                <p>• GenAI & Data Science Collaboration (RAG / LangChain)</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-2.5 text-xs font-mono text-[#D8DEE5] leading-relaxed max-w-xl">
            <p>
              I grew up in a small-town environment and was curious about how things worked from an early age.
            </p>
            <p>
              I started with frontend development, then became deeply fascinated by what happens behind the interface:
            </p>
            <div className="py-1 text-[#FF7A18] font-bold">
              APIs → data → graph databases → systems → automation → AI workflows
            </div>
            <p>
              I have worked across production systems like OceanMotion, Mimasa AI, and enterprise data pipelines at Dell Technologies.
            </p>
          </div>
        );
        break;

      case 'projects':
      case 'work':
        outputNode = (
          <div className="space-y-4 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#FF7A18] font-semibold tracking-wider uppercase text-[11px]">SELECTED WORK // 4 CORE CASE STUDIES</p>
            
            <div className="space-y-3 pl-2 border-l border-white/10">
              {/* 01 Mimasa AI */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF7A18] font-bold">01</span>
                  <span className="text-[#F5F5F2] font-bold">mimasa-ai</span>
                  <span className="text-[10px] text-[#69717D]">// AI-powered enterprise data analytics & search</span>
                </div>
                <p className="text-[#69717D] pl-6 text-[11px]">
                  &lt;100ms intelligent search · 6-step signal onboarding · tenant DB isolation · Django/Celery notifications
                </p>
                <div className="pl-6 pt-1">
                  <button
                    onClick={() => executeCommand('open mimasa-ai')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171B20] hover:bg-[#FF7A18]/15 text-[#FF7A18] border border-white/8 hover:border-[#FF7A18]/30 transition-colors text-[11px]"
                  >
                    <span>open mimasa-ai</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 02 Geek-Search */}
              <div className="space-y-1 pt-2 border-t border-white/6">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF7A18] font-bold">02</span>
                  <span className="text-[#F5F5F2] font-bold">geek-search</span>
                  <span className="text-[10px] text-[#69717D]">// placement & contest platform</span>
                </div>
                <p className="text-[#69717D] pl-6 text-[11px]">1,000+ students · 10,000+ submissions · ~40% latency speedup · Frontend + Database</p>
                <div className="pl-6 pt-1">
                  <button
                    onClick={() => executeCommand('open geek-search')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171B20] hover:bg-[#FF7A18]/15 text-[#FF7A18] border border-white/8 hover:border-[#FF7A18]/30 transition-colors text-[11px]"
                  >
                    <span>open geek-search</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 03 OceanMotion */}
              <div className="space-y-1 pt-2 border-t border-white/6">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF7A18] font-bold">03</span>
                  <span className="text-[#F5F5F2] font-bold">oceanmotion</span>
                  <span className="text-[10px] text-[#69717D]">// enterprise cloud analytics & graph platform</span>
                </div>
                <p className="text-[#69717D] pl-6 text-[11px]">70+ REST APIs · Neo4j 35+ Cypher queries · 30–40% query speedup · RBAC module</p>
                <div className="pl-6 pt-1">
                  <button
                    onClick={() => executeCommand('open oceanmotion')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171B20] hover:bg-[#FF7A18]/15 text-[#FF7A18] border border-white/8 hover:border-[#FF7A18]/30 transition-colors text-[11px]"
                  >
                    <span>open oceanmotion</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 04 EazEae */}
              <div className="space-y-1 pt-2 border-t border-white/6">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF7A18] font-bold">04</span>
                  <span className="text-[#F5F5F2] font-bold">eazeae</span>
                  <span className="text-[10px] text-[#69717D]">// digital heritage tourism platform</span>
                </div>
                <p className="text-[#69717D] pl-6 text-[11px]">500+ daily requests · ~75% faster · QR-based access verification</p>
                <div className="pl-6 pt-1">
                  <button
                    onClick={() => executeCommand('open eazeae')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171B20] hover:bg-[#FF7A18]/15 text-[#FF7A18] border border-white/8 hover:border-[#FF7A18]/30 transition-colors text-[11px]"
                  >
                    <span>open eazeae</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[#69717D] text-[11px]">
              Type <span className="text-[#FF7A18]">open &lt;project-id&gt;</span> to inspect interactive case studies.
            </div>
          </div>
        );
        break;

      case 'mimasa':
      case 'mimasa-ai':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#F5F5F2]">01 / MIMASA AI</p>
              <span className="text-[10px] text-[#FF7A18] px-2 py-0.5 rounded bg-[#FF7A18]/10 border border-[#FF7A18]/20">
                Xaigi Technology
              </span>
            </div>
            <p className="text-[#FF7A18] font-semibold">
              Making enterprise data easier to understand, search, and act on.
            </p>
            <div className="space-y-1 pl-2 border-l border-white/10 text-[11px] text-[#69717D]">
              <p>• <strong className="text-[#D8DEE5]">Intelligent Search:</strong> &lt;100ms fuzzy and prefix discovery across data sources and charts</p>
              <p>• <strong className="text-[#D8DEE5]">6-Step Onboarding:</strong> Capturing personal, professional, and interest signals for GenAI</p>
              <p>• <strong className="text-[#D8DEE5]">Tenant Workspaces:</strong> Strict database isolation and scoped records</p>
              <p>• <strong className="text-[#D8DEE5]">Celery Notifications:</strong> Decoupled Django signals and asynchronous dispatches</p>
              <p>• <strong className="text-[#D8DEE5]">AI Collaboration:</strong> Supported GenAI and Data Science teams on RAG & NL-to-SQL</p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => handleOpenProjectAction('mimasa-ai')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
              >
                <span>Launch Mimasa AI Case Study ↗</span>
              </button>
            </div>
          </div>
        );
        break;

      case 'oceanmotion':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#F5F5F2]">03 / OCEANMOTION</p>
              <span className="text-[10px] text-[#FF7A18] px-2 py-0.5 rounded bg-[#FF7A18]/10 border border-[#FF7A18]/20">
                Xaigi Technology
              </span>
            </div>
            <p className="text-[#FF7A18] font-semibold">
              Enterprise Cloud Analytics Platform — Dataset Publishing & Graph RBAC.
            </p>
            <div className="space-y-1 pl-2 border-l border-white/10 text-[11px] text-[#69717D]">
              <p>• <strong className="text-[#D8DEE5]">70+ REST APIs:</strong> Dataset ingestion, metadata, licensing, pricing, and subscriptions</p>
              <p>• <strong className="text-[#D8DEE5]">Neo4j Graph Centerpiece:</strong> USER → GROUP → DATASET → CHART → DASHBOARD</p>
              <p>• <strong className="text-[#D8DEE5]">35+ Cypher Queries:</strong> 30–40% query performance optimization via indexing & pattern rewrites</p>
              <p>• <strong className="text-[#D8DEE5]">Group Sharing / RBAC:</strong> Multi-tenant groups with Admin/Member roles and Superset sync</p>
              <p>• <strong className="text-[#D8DEE5]">Permission Leakage Debugging:</strong> Fixed nested dashboard query anomalies and latency spikes</p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => handleOpenProjectAction('oceanmotion')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
              >
                <span>Launch OceanMotion Case Study ↗</span>
              </button>
            </div>
          </div>
        );
        break;

      case 'xaigi':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#F5F5F2]">XAIGI TECHNOLOGY</p>
              <span className="text-[10px] text-[#69717D]">Backend / Full-Stack Engineering</span>
            </div>
            <p className="text-[#69717D] leading-relaxed">
              Professional software engineering across graph databases, high-throughput APIs, multi-tenant RBAC, search, analytics, and GenAI collaboration.
            </p>
            <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-2">
              <span className="text-[10px] text-[#FF7A18] font-bold uppercase block">Core Projects Built at Xaigi:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => executeCommand('open oceanmotion')}
                  className="p-2 rounded-lg bg-[#0B0D0F] border border-white/6 hover:border-[#FF7A18]/40 text-left text-[#D8DEE5]"
                >
                  <strong className="text-[#FF7A18] block">01. OceanMotion</strong>
                  <span className="text-[10px] text-[#69717D]">70+ APIs · Neo4j · RBAC · Superset</span>
                </button>
                <button
                  onClick={() => executeCommand('open mimasa-ai')}
                  className="p-2 rounded-lg bg-[#0B0D0F] border border-white/6 hover:border-[#FF7A18]/40 text-left text-[#D8DEE5]"
                >
                  <strong className="text-[#FF7A18] block">02. Mimasa AI</strong>
                  <span className="text-[10px] text-[#69717D]">&lt;100ms Search · Tenant Isolation · AI</span>
                </button>
              </div>
            </div>
            <div className="text-[11px] text-[#69717D]">
              <strong className="text-[#D8DEE5]">Cross-team collaboration:</strong> Worked with GenAI and Data Science teams providing backend & frontend engineering support.
            </div>
          </div>
        );
        break;

      case 'architecture':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#FF7A18] font-semibold">// BACKEND & SYSTEMS ARCHITECTURE OVERVIEW</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-1">
                <div className="text-[#FF7A18] font-bold flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5" />
                  GRAPH TOPOLOGY (NEO4J)
                </div>
                <p className="text-[#69717D] text-[11px]">
                  USER → GROUP → DATASET → CHART → DASHBOARD. 35+ Cypher queries, indexed property matching, 30–40% execution speedup.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-1">
                <div className="text-[#FF7A18] font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  MULTI-TENANT RBAC
                </div>
                <p className="text-[#69717D] text-[11px]">
                  Organization isolation, scoped database models, Admin / Member token claims, and Apache Superset permission mapping.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-1">
                <div className="text-[#FF7A18] font-bold flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  INTELLIGENT SEARCH
                </div>
                <p className="text-[#69717D] text-[11px]">
                  &lt;100ms full-text, fuzzy match, prefix match, and typo correction across datasources, dashboards, and analyses.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-1">
                <div className="text-[#FF7A18] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  DATA & AI AUTOMATION
                </div>
                <p className="text-[#69717D] text-[11px]">
                  Decoupled Celery event queues, ETL pipelines to Redshift, RAG contextual retrieval, and NL-to-SQL query planning.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case 'open':
        if (subArg === 'mimasa-ai' || subArg === 'mimasa') {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening project [mimasa-ai]...</p>
              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F5F5F2]">Mimasa AI</span>
                  <span className="text-[10px] text-[#FF7A18] font-mono">ENTERPRISE DATA & SEARCH</span>
                </div>
                <p className="text-[#69717D] text-[11px] leading-relaxed">
                  Making enterprise data easier to understand, search, and act on. &lt;100ms search, 6-step onboarding, tenant isolation, and GenAI collaboration.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenProjectAction('mimasa-ai')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
                  >
                    <span>Launch Full Case Study Modal ↗</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateSection) onNavigateSection('work');
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] text-xs border border-white/10"
                  >
                    <span>Jump to Section</span>
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (subArg === 'oceanmotion') {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening project [oceanmotion]...</p>
              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F5F5F2]">OceanMotion</span>
                  <span className="text-[10px] text-[#FF7A18] font-mono">CLOUD ANALYTICS & GRAPH</span>
                </div>
                <p className="text-[#69717D] text-[11px] leading-relaxed">
                  70+ REST APIs, Neo4j graph centerpiece, 35+ Cypher queries with 30–40% optimization, and RBAC group sharing module.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenProjectAction('oceanmotion')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
                  >
                    <span>Launch Full Case Study Modal ↗</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateSection) onNavigateSection('work');
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] text-xs border border-white/10"
                  >
                    <span>Jump to Section</span>
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (subArg === 'geek-search' || subArg === 'geeksearch') {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening project [geek-search]...</p>
              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F5F5F2]">Geek-Search</span>
                  <span className="text-[10px] text-[#FF7A18] font-mono">PLACEMENT PLATFORM</span>
                </div>
                <p className="text-[#69717D] text-[11px] leading-relaxed">
                  Contributed across frontend engineering and database optimization, supporting 1,000+ students and 10,000+ contest code submissions.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenProjectAction('geek-search')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
                  >
                    <span>Launch Full Case Study Modal ↗</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateSection) onNavigateSection('work');
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] text-xs border border-white/10"
                  >
                    <span>Jump to Section</span>
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (subArg === 'eazeae') {
          outputNode = (
            <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening project [eazeae]...</p>
              <div className="p-3 rounded-xl bg-[#111418] border border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F5F5F2]">EazEae</span>
                  <span className="text-[10px] text-[#FF7A18] font-mono">DIGITAL HERITAGE PLATFORM</span>
                </div>
                <p className="text-[#69717D] text-[11px] leading-relaxed">
                  500+ daily visitor entry requests handled smoothly with ~75% faster verification pipelines and atomic double-scan prevention.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenProjectAction('eazeae')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
                  >
                    <span>Launch Full Case Study Modal ↗</span>
                  </button>
                  <a
                    href="https://github.com/akashsingh-ops/EazEae_MajorProject"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] text-xs border border-white/10"
                  >
                    <Github className="w-3.5 h-3.5 text-[#69717D]" />
                    <span>GitHub Repo ↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        } else if (subArg === 'xaigi') {
          executeCommand('xaigi');
          return;
        } else if (subArg === 'dell' || subArg === 'innefu' || subArg === 'terra-link') {
          outputNode = (
            <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening journey record: {subArg}...</p>
              <p className="text-[#69717D]">
                Navigating to career timeline milestone.
              </p>
              <button
                onClick={() => {
                  if (onNavigateSection) onNavigateSection('journey');
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[#FF7A18] border border-white/10 text-xs mt-1"
              >
                <span>View {subArg} in Timeline ↗</span>
              </button>
            </div>
          );
        } else if (subArg === 'resume') {
          window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening resume...</p>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="text-[#FF7A18] hover:underline flex items-center gap-1">
                <span>↗ Google Drive PDF</span>
              </a>
            </div>
          );
        } else if (subArg === 'github') {
          window.open(profileData.socialLinks.github, '_blank', 'noopener,noreferrer');
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening github...</p>
              <p className="text-[#69717D]">↗ github.com/akashsingh-ops</p>
            </div>
          );
        } else if (subArg === 'linkedin') {
          window.open(profileData.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening linkedin...</p>
              <p className="text-[#69717D]">↗ linkedin.com/in/akash-singh-aa0b601a3</p>
            </div>
          );
        } else if (subArg === 'leetcode') {
          window.open(profileData.socialLinks.leetcode, '_blank', 'noopener,noreferrer');
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening leetcode...</p>
              <p className="text-[#69717D]">300+ problems solved.</p>
            </div>
          );
        } else if (subArg === 'devlore') {
          window.open(profileData.socialLinks.devlore, '_blank', 'noopener,noreferrer');
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">opening DEVLORE...</p>
              <p className="text-[#69717D]">learn · build · share</p>
            </div>
          );
        } else {
          outputNode = (
            <div className="text-xs font-mono text-[#69717D]">
              Target not found: "{subArg}". Supported: <span className="text-[#D8DEE5]">open mimasa-ai</span>, <span className="text-[#D8DEE5]">open oceanmotion</span>, <span className="text-[#D8DEE5]">open geek-search</span>, <span className="text-[#D8DEE5]">open eazeae</span>
            </div>
          );
        }
        break;

      case 'experience':
      case 'career':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="space-y-2 border-l border-white/10 pl-3">
              <div>
                <span className="text-[#FF7A18] font-bold">2026 → present</span>
                <p className="text-[#F5F5F2] font-semibold">Dell Technologies</p>
                <p className="text-[#69717D] text-[11px]">Service Delivery Engineer · Data Pipelines & ETL</p>
              </div>

              <div className="pt-1">
                <span className="text-[#FF7A18] font-bold">2025</span>
                <p className="text-[#F5F5F2] font-semibold">Innefu Labs</p>
                <p className="text-[#69717D] text-[11px]">Software Engineer · Systems & Integrations</p>
              </div>

              <div className="pt-1">
                <span className="text-[#FF7A18] font-bold">2024</span>
                <p className="text-[#F5F5F2] font-semibold">Xaigi Technology</p>
                <p className="text-[#69717D] text-[11px]">Backend Developer · OceanMotion & Mimasa AI</p>
              </div>

              <div className="pt-1">
                <span className="text-[#FF7A18] font-bold">2023</span>
                <p className="text-[#F5F5F2] font-semibold">Terra-link Global</p>
                <p className="text-[#69717D] text-[11px]">Software Developer Intern · Core Features</p>
              </div>
            </div>
            <div className="text-[11px] text-[#69717D]">
              Try: <button onClick={() => executeCommand('xaigi')} className="text-[#FF7A18] underline">xaigi</button> or <button onClick={() => executeCommand('open dell')} className="text-[#FF7A18] underline">open dell</button>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[#FF7A18] font-semibold text-[11px]">BACKEND & APIS</p>
                <p className="text-[#69717D] text-xs">Python · Django · Django REST Framework · Redis · Celery</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#FF7A18] font-semibold text-[11px]">GRAPH & DATABASES</p>
                <p className="text-[#69717D] text-xs">Neo4j · Cypher (35+ queries) · MySQL · PostgreSQL</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#FF7A18] font-semibold text-[11px]">DATA & ANALYTICS</p>
                <p className="text-[#69717D] text-xs">Elasticsearch · OpenSearch · Apache Superset · Redshift ETL</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#FF7A18] font-semibold text-[11px]">AI & AUTOMATION</p>
                <p className="text-[#69717D] text-xs">RAG · LangChain · NL-to-SQL · Codium · Tabnine</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'thinking':
      case 'philosophy':
      case 'manifesto':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#69717D]">how I approach engineering:</p>
            <div className="space-y-1 pl-2 text-[#D8DEE5]">
              <p><span className="text-[#FF7A18]">01</span> &nbsp;understand the problem</p>
              <p><span className="text-[#FF7A18]">02</span> &nbsp;understand the system</p>
              <p><span className="text-[#FF7A18]">03</span> &nbsp;find the bottleneck</p>
              <p><span className="text-[#FF7A18]">04</span> &nbsp;build the simplest useful solution</p>
              <p><span className="text-[#FF7A18]">05</span> &nbsp;measure</p>
              <p><span className="text-[#FF7A18]">06</span> &nbsp;improve</p>
            </div>
            <div className="pt-2 border-t border-white/6 text-[#FF7A18] italic">
              &gt; "An API is only one part of the system."
            </div>
          </div>
        );
        break;

      case 'journey':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
            <div className="space-y-1 pl-2 border-l border-white/10">
              <p className="text-[#D8DEE5]">curious</p>
              <p className="text-[#69717D] text-[10px]"> &nbsp; ↓</p>
              <p className="text-[#D8DEE5]">builder</p>
              <p className="text-[#69717D] text-[10px]"> &nbsp; ↓</p>
              <p className="text-[#D8DEE5]">frontend</p>
              <p className="text-[#69717D] text-[10px]"> &nbsp; ↓</p>
              <p className="text-[#FF7A18] font-bold">backend (Xaigi · OceanMotion & Mimasa AI)</p>
              <p className="text-[#69717D] text-[10px]"> &nbsp; ↓</p>
              <p className="text-[#D8DEE5]">data systems & pipelines (Dell Technologies)</p>
              <p className="text-[#69717D] text-[10px]"> &nbsp; ↓</p>
              <p className="text-emerald-400 font-semibold">distributed systems & agentic automation</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  if (onNavigateSection) onNavigateSection('journey');
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#FF7A18] hover:underline"
              >
                <span>Explore Interactive Journey in Portfolio ↗</span>
              </button>
            </div>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
            <p className="text-emerald-400 font-bold">opening resume...</p>
            <p className="text-[#69717D]">
              ↗ Official Google Drive resume document opened in new tab.
            </p>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#FF7A18] hover:underline font-bold"
            >
              <span>[ Open Resume Directly ↗ ]</span>
            </a>
          </div>
        );
        break;

      case 'github':
        window.open(profileData.socialLinks.github, '_blank', 'noopener,noreferrer');
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-emerald-400 font-bold">opening github...</p>
            <p className="text-[#69717D]">↗ https://github.com/akashsingh-ops</p>
          </div>
        );
        break;

      case 'linkedin':
        window.open(profileData.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-emerald-400 font-bold">opening linkedin...</p>
            <p className="text-[#69717D]">↗ https://www.linkedin.com/in/akash-singh-aa0b601a3/</p>
          </div>
        );
        break;

      case 'leetcode':
        window.open(profileData.socialLinks.leetcode, '_blank', 'noopener,noreferrer');
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-emerald-400 font-bold">opening LeetCode...</p>
            <p className="text-[#69717D]">300+ problems solved across data structures & algorithms.</p>
            <p className="text-[#69717D]">↗ https://leetcode.com/u/AkashSingh2002/</p>
          </div>
        );
        break;

      case 'devlore':
        window.open(profileData.socialLinks.devlore, '_blank', 'noopener,noreferrer');
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <p className="text-[#FF7A18] font-bold">DEVLORE</p>
            <p className="text-[#69717D]">learn · build · share</p>
            <p className="text-emerald-400 font-medium">opening...</p>
            <p className="text-[#69717D]">↗ https://www.instagram.com/thedevlore/</p>
          </div>
        );
        break;

      case 'contact':
      case 'email':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="space-y-1">
              <p><span className="text-[#69717D] inline-block w-20">email</span> {profileData.socialLinks.email}</p>
              <p><span className="text-[#69717D] inline-block w-20">linkedin</span> /akash-singh-aa0b601a3</p>
              <p><span className="text-[#69717D] inline-block w-20">github</span> /akashsingh-ops</p>
            </div>

            <div className="pt-2">
              <p className="text-[#69717D] text-[11px] mb-2">Choose a channel:</p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${profileData.socialLinks.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A18] text-[#090B0D] font-bold text-xs hover:bg-[#FF8B33] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>

                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] border border-white/10 text-xs transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#FF7A18]" />
                  <span>LinkedIn ↗</span>
                </a>

                <button
                  onClick={copyEmailToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8DEE5] border border-white/10 text-xs transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#69717D]" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>
          </div>
        );
        break;

      case 'status':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-[#D8DEE5]">
            <div className="space-y-1">
              <p className="text-[#FF7A18] font-bold">SYSTEM</p>
              <div className="border-t border-white/10 pt-1 text-[#69717D] space-y-0.5">
                <p><span className="text-[#D8DEE5] inline-block w-28">profile</span> online</p>
                <p><span className="text-[#D8DEE5] inline-block w-28">projects</span> 4 indexed</p>
                <p><span className="text-[#D8DEE5] inline-block w-28">portfolio</span> running</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[#FF7A18] font-bold">CURRENT FOCUS</p>
              <div className="border-t border-white/10 pt-1 text-[#69717D] space-y-0.5">
                <p>• backend & distributed systems</p>
                <p>• data pipeline automation (ETL / Redshift)</p>
                <p>• agentic AI workflows</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[#FF7A18] font-bold">STATUS</p>
              <div className="border-t border-white/10 pt-1 text-emerald-400 font-semibold">
                building.
              </div>
            </div>
          </div>
        );
        break;

      case 'stack':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
            <div className="space-y-1.5">
              <div>
                <span className="text-[#FF7A18] font-bold inline-block w-32">BACKEND</span>
                <span className="text-[#D8DEE5]">Python · Django · DRF · SQL</span>
              </div>
              <div>
                <span className="text-[#FF7A18] font-bold inline-block w-32">GRAPH & DATA</span>
                <span className="text-[#D8DEE5]">Neo4j · Cypher · Redis · AWS · Celery</span>
              </div>
              <div>
                <span className="text-[#FF7A18] font-bold inline-block w-32">ANALYTICS</span>
                <span className="text-[#D8DEE5]">OpenSearch · Redshift · Apache Superset</span>
              </div>
              <div>
                <span className="text-[#FF7A18] font-bold inline-block w-32">AI COLLABORATION</span>
                <span className="text-[#D8DEE5]">RAG · LangChain · Knowledge Graphs · Agentic workflows</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        if (currentDir === 'projects' || currentDir === '/projects') {
          outputNode = (
            <div className="text-xs font-mono text-[#D8DEE5] space-y-1">
              <p className="text-[#69717D]">/projects</p>
              <div className="flex flex-wrap gap-4 text-emerald-400">
                <span>01-mimasa-ai/</span>
                <span>02-geek-search/</span>
                <span>03-oceanmotion/</span>
                <span>04-eazeae/</span>
              </div>
            </div>
          );
        } else {
          outputNode = (
            <div className="text-xs font-mono grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <span className="text-[#7C9CFF]">about/</span>
              <span className="text-[#7C9CFF]">projects/</span>
              <span className="text-[#7C9CFF]">experience/</span>
              <span className="text-[#7C9CFF]">skills/</span>
              <span className="text-[#7C9CFF]">thinking/</span>
              <span className="text-[#7C9CFF]">journey/</span>
              <span className="text-[#7C9CFF]">devlore/</span>
              <span className="text-[#7C9CFF]">contact/</span>
              <span className="text-[#69717D]">now.txt</span>
              <span className="text-[#69717D]">philosophy.txt</span>
              <span className="text-[#69717D]">mimasa.txt</span>
              <span className="text-[#69717D]">oceanmotion.txt</span>
              <span className="text-[#69717D]">resume.url</span>
            </div>
          );
        }
        break;

      case 'cd':
        if (!subArg || subArg === '~' || subArg === '..' || subArg === '/') {
          setCurrentDir('~');
          outputNode = <p className="text-[#69717D] text-xs font-mono">~</p>;
        } else if (subArg === 'projects' || subArg === 'work') {
          setCurrentDir('projects');
          outputNode = (
            <div className="text-xs font-mono space-y-1 text-[#D8DEE5]">
              <p className="text-[#69717D]">/projects</p>
              <div className="flex flex-wrap gap-3 text-emerald-400">
                <button onClick={() => executeCommand('open mimasa-ai')} className="hover:underline">mimasa-ai/</button>
                <button onClick={() => executeCommand('open geek-search')} className="hover:underline">geek-search/</button>
                <button onClick={() => executeCommand('open oceanmotion')} className="hover:underline">oceanmotion/</button>
                <button onClick={() => executeCommand('open eazeae')} className="hover:underline">eazeae/</button>
              </div>
            </div>
          );
        } else if (subArg === 'experience') {
          setCurrentDir('experience');
          executeCommand('experience');
          return;
        } else if (subArg === 'skills') {
          setCurrentDir('skills');
          executeCommand('skills');
          return;
        } else if (subArg === 'about') {
          setCurrentDir('about');
          executeCommand('about');
          return;
        } else {
          outputNode = <p className="text-rose-400 text-xs font-mono">cd: no such directory: {subArg}</p>;
        }
        break;

      case 'cat':
        if (subArg === 'about.txt' || subArg === 'about') {
          executeCommand('about');
          return;
        } else if (subArg === 'mimasa.txt' || subArg === 'mimasa') {
          executeCommand('mimasa');
          return;
        } else if (subArg === 'oceanmotion.txt' || subArg === 'oceanmotion') {
          executeCommand('oceanmotion');
          return;
        } else if (subArg === 'philosophy.txt' || subArg === 'thinking') {
          executeCommand('thinking');
          return;
        } else if (subArg === 'now.txt' || subArg === 'now') {
          outputNode = (
            <div className="text-xs font-mono space-y-2 text-[#D8DEE5]">
              <div>
                <span className="text-[#69717D]">learning:</span>
                <p className="pl-3 text-[#D8DEE5]">distributed systems</p>
              </div>
              <div>
                <span className="text-[#69717D]">exploring:</span>
                <p className="pl-3 text-[#D8DEE5]">agentic automation</p>
              </div>
              <div>
                <span className="text-[#69717D]">building:</span>
                <p className="pl-3 text-[#D8DEE5]">useful products</p>
              </div>
            </div>
          );
        } else if (subArg === 'resume.url' || subArg === 'resume') {
          executeCommand('resume');
          return;
        } else if (subArg === 'contact.txt') {
          executeCommand('contact');
          return;
        } else {
          outputNode = <p className="text-rose-400 text-xs font-mono">cat: {subArg}: No such file</p>;
        }
        break;

      case 'neofetch':
        outputNode = (
          <div className="flex flex-col sm:flex-row items-start gap-4 text-xs font-mono text-[#D8DEE5]">
            <pre className="text-[#FF7A18] font-mono leading-none select-none text-[11px]">
{`  █████╗  ███████╗
 ██╔══██╗ ██╔════╝
 ███████║ ███████╗
 ██╔══██║ ╚════██║
 ██║  ██║ ███████║
 ╚═╝  ╚═╝ ╚══════╝`}
            </pre>
            <div className="space-y-0.5 text-[#D8DEE5] text-[11px]">
              <p className="font-bold text-[#F5F5F2] text-xs">AKASH SINGH</p>
              <p className="text-[#69717D] pb-1">──────────────────────────────</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Role:</span> Backend & Systems Software Engineer</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Focus:</span> APIs, Graph DBs, Multi-Tenancy, Search, AI</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Stack:</span> Python / Django / DRF / Celery</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Database:</span> Neo4j / Cypher / MySQL / Redis</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Cloud:</span> AWS (OpenSearch, Redshift, S3)</p>
              <p><span className="text-[#FF7A18] inline-block w-24">Projects:</span> Mimasa AI, Geek-Search, OceanMotion, EazEae</p>
            </div>
          </div>
        );
        break;

      case 'git':
        if (subArg === 'log' || subArg === 'log --oneline') {
          outputNode = (
            <div className="space-y-1.5 text-xs font-mono text-[#D8DEE5]">
              <p className="text-[#FF7A18] font-semibold">// Recent career commits:</p>
              <div className="space-y-1 text-[#69717D] pl-2 border-l border-white/10">
                <p><span className="text-[#7C9CFF]">f4b8291</span> <span className="text-[#D8DEE5]">feat: data ingestion & ETL automation</span> <span className="text-[10px] text-[#69717D]">(Dell Technologies)</span></p>
                <p><span className="text-[#7C9CFF]">e89a12c</span> <span className="text-[#D8DEE5]">feat: intelligent search & tenant isolation</span> <span className="text-[10px] text-[#69717D]">(Mimasa AI)</span></p>
                <p><span className="text-[#7C9CFF]">c3189d2</span> <span className="text-[#D8DEE5]">feat: Neo4j Cypher optimization & RBAC engine</span> <span className="text-[10px] text-[#69717D]">(OceanMotion)</span></p>
                <p><span className="text-[#7C9CFF]">a7102e5</span> <span className="text-[#D8DEE5]">feat: contest submissions & leaderboard tuning</span> <span className="text-[10px] text-[#69717D]">(Geek-Search)</span></p>
                <p><span className="text-[#7C9CFF]">904f81a</span> <span className="text-[#D8DEE5]">feat: QR digital heritage ticketing pipeline</span> <span className="text-[10px] text-[#69717D]">(EazEae)</span></p>
              </div>
            </div>
          );
        } else {
          outputNode = <p className="text-[#69717D] text-xs font-mono">git: try <span className="text-[#FF7A18]">git log --oneline</span></p>;
        }
        break;

      case 'sudo':
        if (subArg === 'hire akash') {
          outputNode = (
            <div className="space-y-2 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400 font-bold">[sudo] permission granted: initializing candidate review...</p>
              <div className="p-3 rounded-xl bg-[#111418] border border-emerald-500/30 text-[#D8DEE5] space-y-1">
                <p className="font-bold text-white">Akash Singh — Backend Software Engineer</p>
                <p className="text-[#69717D] text-[11px]">Strong in Python, Django, DRF, Neo4j, Redis, REST APIs, and system optimization.</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${profileData.socialLinks.email}`}
                    className="px-2.5 py-1 rounded bg-[#FF7A18] text-[#090B0D] font-bold text-xs"
                  >
                    Send Email Proposal ↗
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-white/5 text-[#D8DEE5] border border-white/10 text-xs hover:bg-white/10"
                  >
                    View Official Resume ↗
                  </a>
                </div>
              </div>
            </div>
          );
        } else {
          outputNode = <p className="text-rose-400 text-xs font-mono">sudo: {subArg}: command not found</p>;
        }
        break;

      case 'coffee':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
            <pre className="text-[#FF7A18] select-none">
{`   (  )   (   )  )
    ) (   )  (  (
  (____)____)____)
  |              |___
  |  HIGH-SPEED  |   )
  |   BACKEND    |___/
  \\______________/`}
            </pre>
            <p className="text-[#69717D] text-[11px]">Fueling query tuning, database indexing, and pipeline architecture.</p>
          </div>
        );
        break;

      case 'ping':
        if (subArg === 'akash') {
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-emerald-400">PING akash (akashsingh.dev): 56 data bytes</p>
              <p className="text-[#69717D]">64 bytes from akash: icmp_seq=1 ttl=64 time=14.2 ms</p>
              <p className="text-[#69717D]">64 bytes from akash: icmp_seq=2 ttl=64 time=12.8 ms</p>
              <p className="text-emerald-400 pt-1">--- akash ping statistics ---</p>
              <p className="text-[#D8DEE5]">2 packets transmitted, 2 received, 0% packet loss, time 1002ms</p>
            </div>
          );
        } else {
          outputNode = <p className="text-[#69717D] text-xs font-mono">ping: try <span className="text-[#FF7A18]">ping akash</span></p>;
        }
        break;

      case 'make':
        if (subArg === 'future') {
          outputNode = (
            <div className="space-y-1 text-xs font-mono text-[#D8DEE5]">
              <p className="text-[#FF7A18] font-bold">Building the future...</p>
              <p className="text-[#69717D]">• Distributed systems architecture</p>
              <p className="text-[#69717D]">• Autonomous data validation agents</p>
              <p className="text-[#69717D]">• Reliable, scalable software products</p>
            </div>
          );
        } else {
          outputNode = <p className="text-[#69717D] text-xs font-mono">make: Nothing to be done for '{subArg}'. Try: <span className="text-[#FF7A18]">make future</span></p>;
        }
        break;

      default:
        outputNode = (
          <div className="text-xs font-mono text-[#69717D]">
            command not found: "{trimmed}". Type <span className="text-[#FF7A18]">"help"</span> or <span className="text-[#FF7A18]">"projects"</span> for suggestions.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        command: trimmed,
        cwd: currentDir,
        output: outputNode
      }
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Mechanical keypress click audio feedback
    if (e.key !== 'Enter' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab') {
      cliSounds.playKeyClick();
    }

    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      cliSounds.playKeyClick();
      const trimmed = input.toLowerCase();
      if (trimmed) {
        const match = ALL_AUTOCOMPLETE_COMMANDS.find((cmd) => cmd.startsWith(trimmed));
        if (match) {
          setInput(match);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandList[nextIdx]);
      cliSounds.playKeyClick();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIdx);
        setInput(commandList[nextIdx]);
      }
      cliSounds.playKeyClick();
    }
  };

  const toggleSoundFromUI = () => {
    const next = cliSounds.toggleMute();
    setSoundEnabled(next);
    if (next) cliSounds.playSuccess();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCloseModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Terminal Window */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 15 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl h-[85vh] max-h-[680px] bg-[#0A0D10] border border-white/12 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111418] border-b border-white/8 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCloseModal}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                  title="Close Terminal"
                />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-[#9A9FA8] font-medium ml-2">
                akash@portfolio: {currentDir}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sound toggle button */}
              <button
                onClick={toggleSoundFromUI}
                className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#9A9FA8] hover:text-[#F5F5F2] transition-colors"
                title={soundEnabled ? 'Mute mechanical CLI audio' : 'Enable mechanical CLI audio'}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span className="text-[10px] hidden sm:inline text-emerald-400 font-medium">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#69717D]" />
                    <span className="text-[10px] hidden sm:inline text-[#69717D]">MUTED</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-[#69717D] hidden sm:inline">
                ESC to close
              </span>
              <button
                onClick={handleCloseModal}
                className="text-[#69717D] hover:text-[#F5F5F2] transition-colors p-1 rounded hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body with Output Logs */}
          <div
            ref={scrollContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs space-y-4 cursor-text"
          >
            {history.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#9A9FA8]">
                  <span className="text-[#FF7A18] font-bold">akash@dev:{entry.cwd || '~'}$</span>
                  <span className="text-[#F5F5F2]">{entry.command}</span>
                </div>
                <div className="pl-4">{entry.output}</div>
              </div>
            ))}

            {/* Current Input Prompt */}
            <div className="flex items-center gap-2 text-[#9A9FA8] pt-1">
              <span className="text-[#FF7A18] font-bold shrink-0">akash@dev:{currentDir}$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-[#F5F5F2] outline-none font-mono text-xs caret-[#FF7A18] z-10"
                />
                {/* Autocomplete Ghost text */}
                {autocompleteGhost && (
                  <span className="absolute left-0 pointer-events-none text-[#69717D] font-mono text-xs select-none">
                    <span className="opacity-0">{input}</span>
                    <span>{autocompleteGhost}</span>
                  </span>
                )}
              </div>
            </div>

            <div ref={bottomAnchorRef} />
          </div>

          {/* Terminal Footer Navigation Shortcuts */}
          <div className="px-4 py-2.5 bg-[#0D1013] border-t border-white/6 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#69717D]">
            <div className="flex flex-wrap items-center gap-3">
              <span>Quick:</span>
              <button
                onClick={() => executeCommand('mimasa')}
                className="hover:text-[#FF7A18] transition-colors"
              >
                mimasa
              </button>
              <button
                onClick={() => executeCommand('oceanmotion')}
                className="hover:text-[#FF7A18] transition-colors"
              >
                oceanmotion
              </button>
              <button
                onClick={() => executeCommand('xaigi')}
                className="hover:text-[#FF7A18] transition-colors"
              >
                xaigi
              </button>
              <button
                onClick={() => executeCommand('architecture')}
                className="hover:text-[#FF7A18] transition-colors"
              >
                architecture
              </button>
              <button
                onClick={() => executeCommand('resume')}
                className="hover:text-[#FF7A18] transition-colors"
              >
                resume
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>[Tab] autocomplete</span>
              <span>·</span>
              <span>[↑↓] history</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
