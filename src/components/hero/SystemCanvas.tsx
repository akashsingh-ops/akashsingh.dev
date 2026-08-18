import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Layers, Database, Cpu, Server, Zap, ArrowRight, X } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  category: string;
  details: string[];
}

const initialNodes: Node[] = [
  { id: '1', label: 'APIs', x: 20, y: 35, vx: 0.08, vy: 0.05, category: 'GATEWAY', details: ['RESTful Contracts', 'Serialization', 'Auth & Routing'] },
  { id: '2', label: 'CORE', x: 45, y: 25, vx: -0.06, vy: 0.07, category: 'BACKEND', details: ['Python / Django', 'Business Logic', 'Domain Services'] },
  { id: '3', label: 'GRAPH', x: 75, y: 30, vx: 0.05, vy: -0.06, category: 'STORAGE', details: ['Neo4j (Cypher)', '35+ Queries Optimized', 'Relationship Traversal'] },
  { id: '4', label: 'CACHE', x: 35, y: 65, vx: -0.07, vy: -0.05, category: 'PERFORMANCE', details: ['Redis In-Memory', 'Sub-millisecond State', 'Rate Limiting'] },
  { id: '5', label: 'SEARCH', x: 65, y: 70, vx: 0.06, vy: 0.06, category: 'QUERY', details: ['OpenSearch / Elastic', '<100ms Inverted Index', 'Faceted Lookup'] },
  { id: '6', label: 'PIPELINES', x: 82, y: 60, vx: -0.05, vy: 0.08, category: 'DATA', details: ['ETL Transformation', 'Amazon Redshift', 'Automated Workflows'] },
  { id: '7', label: 'ASYNC', x: 18, y: 75, vx: 0.07, vy: -0.07, category: 'WORKERS', details: ['Celery & Redis', 'Decoupled Queues', 'Zero-Toil Automation'] },
];

export const SystemCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 50, y: 50 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  // As user scrolls down, spread nodes subtly
  const separationFactor = useTransform(scrollY, [0, 500], [1, 1.25]);

  // Subtle natural node drift & mouse reaction
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animationFrameId: number;

    const updateDrift = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          let nx = node.x + node.vx * 0.15;
          let ny = node.y + node.vy * 0.15;
          let nvx = node.vx;
          let nvy = node.vy;

          // Boundary bounds
          if (nx < 10 || nx > 90) nvx = -nvx;
          if (ny < 15 || ny > 85) nvy = -nvy;

          return {
            ...node,
            x: nx,
            y: ny,
            vx: nvx,
            vy: nvy
          };
        })
      );
      animationFrameId = requestAnimationFrame(updateDrift);
    };

    animationFrameId = requestAnimationFrame(updateDrift);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mousePos.current = { x, y };
  };

  // Fixed connections between nodes to form an elegant system mesh
  const connections: [number, number][] = [
    [0, 1], // APIs -> CORE
    [1, 2], // CORE -> GRAPH
    [1, 3], // CORE -> CACHE
    [1, 4], // CORE -> SEARCH
    [2, 4], // GRAPH -> SEARCH
    [4, 5], // SEARCH -> PIPELINES
    [3, 6], // CACHE -> ASYNC
    [0, 6], // APIs -> ASYNC
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[280px] sm:h-[340px] rounded-2xl border border-white/8 bg-[#111418]/50 backdrop-blur overflow-hidden group cursor-crosshair select-none"
    >
      {/* Subtle background radial spotlight */}
      <div
        className="absolute w-[300px] h-[300px] bg-[#FF7A18]/5 rounded-full blur-3xl pointer-events-none transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.current.x}%`,
          top: `${mousePos.current.y}%`
        }}
      />

      {/* SVG Canvas for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(([sourceIdx, targetIdx], idx) => {
          const s = nodes[sourceIdx];
          const t = nodes[targetIdx];
          if (!s || !t) return null;

          const isHighlighted =
            hoveredNodeId === s.id ||
            hoveredNodeId === t.id ||
            activeNode?.id === s.id ||
            activeNode?.id === t.id;

          return (
            <line
              key={idx}
              x1={`${s.x}%`}
              y1={`${s.y}%`}
              x2={`${t.x}%`}
              y2={`${t.y}%`}
              stroke={isHighlighted ? '#FF7A18' : 'rgba(255, 255, 255, 0.12)'}
              strokeWidth={isHighlighted ? 1.5 : 1}
              strokeDasharray={isHighlighted ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isActive = activeNode?.id === node.id;

        return (
          <div
            key={node.id}
            onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 cursor-pointer z-10"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`
            }}
          >
            <div
              className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                isActive || isHovered
                  ? 'w-10 h-10 bg-[#FF7A18] text-white shadow-lg shadow-[#FF7A18]/30 scale-110'
                  : 'w-7 h-7 bg-[#171B20] text-[#9A9FA8] border border-white/15 hover:border-[#FF7A18]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
            </div>
          </div>
        );
      })}

      {/* Subtle Hint */}
      <div className="absolute bottom-3 left-4 font-mono text-[11px] text-[#666C75] flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18] animate-ping" />
        <span>Click any node to inspect system layer</span>
      </div>

      {/* Floating Active Node Inspection Card */}
      {activeNode ? (
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-[#171B20]/95 border border-white/15 backdrop-blur-md rounded-xl p-4 shadow-2xl z-20 max-w-[240px] sm:max-w-[280px] animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF7A18] block font-bold">
                {activeNode.category}
              </span>
              <h4 className="text-sm font-bold text-[#F5F5F2]">
                {activeNode.label}
              </h4>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-[#9A9FA8] hover:text-white p-1 rounded hover:bg-white/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 text-xs text-[#9A9FA8] font-mono">
            {activeNode.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#F5F5F2]/85">
                <span className="text-[#FF7A18]">›</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-[#171B20]/60 border border-white/8 backdrop-blur-sm rounded-lg px-3 py-1.5 text-right font-mono text-[11px] text-[#9A9FA8] hidden sm:block">
          <span className="text-[#F5F5F2] font-semibold">Underlying Topology</span>
          <span className="block text-[10px] text-[#666C75]">REST · Graph · Redshift · Async</span>
        </div>
      )}
    </div>
  );
};
