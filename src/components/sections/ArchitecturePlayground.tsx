import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  RotateCcw,
  Sliders,
  Zap,
  Activity,
  ShieldCheck,
  Search,
  Database,
  Layers,
  Network,
  Cpu,
  Server,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Sparkles,
  GitCommit,
  Clock,
  Volume2,
  VolumeX,
  Share2,
  Radio,
  Workflow
} from 'lucide-react';
import { CinematicSection } from '../ui/CinematicSection';
import { cliSounds } from '../../audio/cliSounds';

type BlueprintId = 'mimasa-search' | 'oceanmotion-graph' | 'eazeae-atomic-qr';

interface ArchitectureNode {
  id: string;
  name: string;
  shortLabel: string;
  category: 'gateway' | 'security' | 'database' | 'queue' | 'ai' | 'analytics';
  protocol: string;
  baseLatencyMs: number;
  description: string;
  implementation: string;
  failureSafeguard: string;
  latencyBudget: string;
  techBadge: string;
}

interface BlueprintConfig {
  id: BlueprintId;
  name: string;
  systemName: string;
  tagline: string;
  summary: string;
  targetP99: string;
  keyMetric: string;
  metricDetail: string;
  coreTech: string[];
  nodes: ArchitectureNode[];
}

const BLUEPRINTS: Record<BlueprintId, BlueprintConfig> = {
  'mimasa-search': {
    id: 'mimasa-search',
    name: 'Distributed Search & AI Pipeline',
    systemName: 'Mimasa AI (Xaigi Tech)',
    tagline: 'Multi-tenant isolation with <100ms typo-tolerant OpenSearch, Celery async queues, and RAG.',
    summary:
      'Engineered for enterprise data discoverability. Incoming queries are authenticated via JWT, strictly scoped to the tenant workspace, queried across Elasticsearch shards with typo tolerance, and augmented via GenAI workflows.',
    targetP99: '< 95ms',
    keyMetric: '<100ms',
    metricDetail: 'Sub-100ms fuzzy search & prefix discovery',
    coreTech: ['Python', 'Django REST', 'Elasticsearch / OpenSearch', 'Celery & Redis', 'PostgreSQL', 'LangChain'],
    nodes: [
      {
        id: 'client_gateway',
        name: 'API Gateway & Ingress',
        shortLabel: 'Ingress Gateway',
        category: 'gateway',
        protocol: 'HTTPS / TLS 1.3',
        baseLatencyMs: 6,
        description: 'Receives search query, decrypts Bearer token, validates tenant claim, and attaches request UUID.',
        implementation: 'Django REST Middleware extracts tenant_id from cryptographic claims and validates active organization session.',
        failureSafeguard: 'HTTP 401 on expired tokens; strict rate-limiting per IP/tenant bucket.',
        latencyBudget: '< 8ms',
        techBadge: 'Django REST'
      },
      {
        id: 'tenant_firewall',
        name: 'Multi-Tenant Scoping Engine',
        shortLabel: 'Tenant Isolation',
        category: 'security',
        protocol: 'Internal Middleware',
        baseLatencyMs: 3,
        description: 'Injects organization isolation boundary into thread-local context to prevent cross-tenant data leakage.',
        implementation: 'Appends mandatory tenant partition keys to all downstream database ORM and Elasticsearch query filters.',
        failureSafeguard: 'Deny-by-default interceptor halts any query missing explicit tenant scoping.',
        latencyBudget: '< 4ms',
        techBadge: 'Tenant Guard'
      },
      {
        id: 'opensearch_cluster',
        name: 'Elasticsearch / OpenSearch Cluster',
        shortLabel: 'Search Cluster',
        category: 'database',
        protocol: 'REST / Shard Routing',
        baseLatencyMs: 34,
        description: 'Executes sub-100ms full-text fuzzy matching, Levenshtein typo tolerance, and edge-ngram autocomplete.',
        implementation: 'Custom shard routing using org_id hash; custom analyzers with 2-gram prefix matching and synonym maps.',
        failureSafeguard: 'Circuit breakers prevent cluster heap exhaustion under high-concurrency wildcard queries.',
        latencyBudget: '< 45ms',
        techBadge: 'OpenSearch'
      },
      {
        id: 'celery_broker',
        name: 'Celery Queue & Redis Broker',
        shortLabel: 'Async Celery Queue',
        category: 'queue',
        protocol: 'AMQP / Redis Streams',
        baseLatencyMs: 10,
        description: 'Asynchronously decouples audit event logging, user onboarding signal ingestion, and notification dispatching.',
        implementation: 'Django Signals dispatch background tasks to isolated worker pools without blocking the HTTP response thread.',
        failureSafeguard: 'Dead-letter queues with exponential backoff retry for failed delivery.',
        latencyBudget: '< 15ms',
        techBadge: 'Celery + Redis'
      },
      {
        id: 'genai_rag_layer',
        name: 'RAG Context & NL-to-SQL Engine',
        shortLabel: 'GenAI / RAG Layer',
        category: 'ai',
        protocol: 'Internal RPC / LangGraph',
        baseLatencyMs: 26,
        description: 'Collaborates with GenAI and Data Science models for contextual prompt retrieval, NL-to-SQL, and forecasting.',
        implementation: 'Schema metadata embeddings retrieved via vector indexing, validated through AST SQL syntax sanitizers.',
        failureSafeguard: 'Strict SQL AST parser blocks non-SELECT queries and prevents SQL injection.',
        latencyBudget: '< 35ms',
        techBadge: 'LangChain / RAG'
      },
      {
        id: 'datastore_sink',
        name: 'PostgreSQL & Real-Time Push',
        shortLabel: 'Data Sink & WS',
        category: 'analytics',
        protocol: 'Postgres Wire / WSS',
        baseLatencyMs: 9,
        description: 'Persists analytical workspace state and pushes live updates to the user browser interface.',
        implementation: 'PgBouncer connection pooling with prepared statements; WebSocket broadcast to subscribed client channels.',
        failureSafeguard: 'Read-replica automatic routing with client reconnection backoff.',
        latencyBudget: '< 12ms',
        techBadge: 'PostgreSQL'
      }
    ]
  },
  'oceanmotion-graph': {
    id: 'oceanmotion-graph',
    name: 'Knowledge Graph & RBAC Traversal',
    systemName: 'OceanMotion Platform',
    tagline: 'Neo4j graph modeling USER → GROUP → DATASET → CHART relationships with 35+ tuned Cypher queries.',
    summary:
      'Engineered for deep enterprise authorization and data asset publishing. Optimizes multi-hop relationship traversals using indexed anchor constraints to prevent permission leakage into Apache Superset.',
    targetP99: '< 50ms',
    keyMetric: '30–40%',
    metricDetail: 'Faster query execution via Cypher tuning',
    coreTech: ['Neo4j (Cypher)', 'Node.js / Express', 'Redis', 'Apache Superset', 'RBAC Security'],
    nodes: [
      {
        id: 'api_router',
        name: '70+ REST API Router',
        shortLabel: 'REST Router',
        category: 'gateway',
        protocol: 'HTTP/2',
        baseLatencyMs: 5,
        description: 'Orchestrates 70+ production endpoints for dataset publishing, access licensing, and group sharing.',
        implementation: 'Express controller layer with centralized JSON schema validation and distributed correlation IDs.',
        failureSafeguard: 'Graceful schema rejection with standardized error contracts.',
        latencyBudget: '< 6ms',
        techBadge: 'Node.js Express'
      },
      {
        id: 'rbac_matrix',
        name: 'Role & Policy Evaluator',
        shortLabel: 'RBAC Evaluator',
        category: 'security',
        protocol: 'In-Memory Policy Engine',
        baseLatencyMs: 4,
        description: 'Evaluates multi-tenant group memberships (Admin / Member) and permission inheritance rules.',
        implementation: 'Bitmask role evaluation against active token claims to establish authorized graph traversal roots.',
        failureSafeguard: 'Deny-by-default gate halts unauthorized traversals at the perimeter.',
        latencyBudget: '< 5ms',
        techBadge: 'RBAC Engine'
      },
      {
        id: 'redis_graph_cache',
        name: 'Redis Graph Anchor Cache',
        shortLabel: 'Redis Anchor Cache',
        category: 'queue',
        protocol: 'In-Memory TCP',
        baseLatencyMs: 3,
        description: 'Caches frequently resolved user-group authorization subgraphs to eliminate redundant disk queries.',
        implementation: 'Key-value cache with automatic event-driven invalidation on group member mutation events.',
        failureSafeguard: 'Transparent cache-miss bypass directly to Neo4j graph cluster.',
        latencyBudget: '< 4ms',
        techBadge: 'Redis Cache'
      },
      {
        id: 'neo4j_traversal',
        name: 'Neo4j Cypher Traversal Engine',
        shortLabel: 'Neo4j Graph Engine',
        category: 'database',
        protocol: 'Bolt Protocol (Binary)',
        baseLatencyMs: 24,
        description: 'Executes optimized Cypher traversals linking USER → GROUP → DATASET → CHART with anchor node lookups.',
        implementation: 'Refactored 35+ Cypher queries using INDEX ON :Group(id) and PROFILE execution plan rewrites (30–40% speedup).',
        failureSafeguard: 'Max hop depth limit prevents cyclical graph recursion and catastrophic memory consumption.',
        latencyBudget: '< 30ms',
        techBadge: 'Neo4j Cypher'
      },
      {
        id: 'superset_sync',
        name: 'Apache Superset Authorization Sync',
        shortLabel: 'Superset Sync',
        category: 'analytics',
        protocol: 'REST / Webhook',
        baseLatencyMs: 8,
        description: 'Synchronizes domain-wide asset permission tokens into Apache Superset for leak-free dashboard rendering.',
        implementation: 'Granular dataset role mapping ensuring charts reflect real-time graph permission states.',
        failureSafeguard: 'Transactional rollback if permissions fail to synchronize downstream.',
        latencyBudget: '< 10ms',
        techBadge: 'Apache Superset'
      }
    ]
  },
  'eazeae-atomic-qr': {
    id: 'eazeae-atomic-qr',
    name: 'High-Concurrency Atomic QR Ticketing',
    systemName: 'EazEae Tourism Platform',
    tagline: 'Encrypted QR validation pipeline handling 500+ daily scans with single-use atomic state locks.',
    summary:
      'Engineered for heritage monument gates in Agra. Solved concurrency double-scan race conditions using atomic single-use state transitions and optimized MongoDB hash indexes for ~75% faster validation.',
    targetP99: '< 55ms',
    keyMetric: '~75%',
    metricDetail: 'Faster verification latency via indexing',
    coreTech: ['Node.js', 'MongoDB', 'React Native', 'QR Cryptography', 'Atomic Mutex Locks'],
    nodes: [
      {
        id: 'gate_scanner',
        name: 'Monument Gate Scanner',
        shortLabel: 'Gate Scanner',
        category: 'gateway',
        protocol: 'AES-256 Encrypted Payload',
        baseLatencyMs: 5,
        description: 'Captures high-entropy encrypted QR pass containing ticket UUID, monument ID, and cryptographic timestamp.',
        implementation: 'Mobile & hardware optical reader with timestamp drift tolerance (<15 min).',
        failureSafeguard: 'Offline checksum reject instantly discards corrupted QR captures.',
        latencyBudget: '< 6ms',
        techBadge: 'QR Ingress'
      },
      {
        id: 'edge_gateway',
        name: 'Edge Ingress Gateway',
        shortLabel: 'Edge Gateway',
        category: 'security',
        protocol: 'HTTPS / TLS 1.3',
        baseLatencyMs: 9,
        description: 'Terminates TLS connection, checks replay time-window, and parses ticket token hash.',
        implementation: 'Node.js reverse proxy with keep-alive socket pools for 500+ daily concurrent scans.',
        failureSafeguard: 'Replay-attack window check prevents reuse of expired QR frames.',
        latencyBudget: '< 12ms',
        techBadge: 'Edge Proxy'
      },
      {
        id: 'atomic_state_lock',
        name: 'Atomic State Locker (Mutex)',
        shortLabel: 'Atomic Mutex Lock',
        category: 'queue',
        protocol: 'Atomic DB Transaction',
        baseLatencyMs: 14,
        description: 'Executes atomic single-use state transition (ISSUED → VALIDATED), mathematically preventing double-scans.',
        implementation: 'Atomic findOneAndUpdate with condition { status: "ISSUED" }. Simultaneous scans yield 1 SUCCESS, 1 REJECT.',
        failureSafeguard: 'Zero duplicate entries: concurrent turnstile attempts are blocked in <15ms with audit log.',
        latencyBudget: '< 18ms',
        techBadge: 'Atomic Lock'
      },
      {
        id: 'mongodb_hash_index',
        name: 'MongoDB Document Hash Store',
        shortLabel: 'Indexed Mongo Store',
        category: 'database',
        protocol: 'BSON Wire Protocol',
        baseLatencyMs: 8,
        description: 'Retrieves visitor pass document in sub-milliseconds via compound hash and date indexes.',
        implementation: 'Unique compound index on (tokenHash, eventDate) cuts query latency from 210ms collection scan to ~8ms.',
        failureSafeguard: 'Index memory residency verified on startup to prevent cold-query page faults.',
        latencyBudget: '< 12ms',
        techBadge: 'MongoDB Index'
      },
      {
        id: 'live_ingress_stream',
        name: 'Real-Time Ingress Analytics Stream',
        shortLabel: 'Ingress Stream',
        category: 'analytics',
        protocol: 'Server-Sent Events / WebSocket',
        baseLatencyMs: 7,
        description: 'Streams instantaneous gate throughput, entry counts, and capacity alerts to monument administrators.',
        implementation: 'Low-overhead SSE broadcast channel updating live administrative footfall telemetry.',
        failureSafeguard: 'Buffer queue persists telemetry offline during transient connectivity drops.',
        latencyBudget: '< 10ms',
        techBadge: 'Real-Time SSE'
      }
    ]
  }
};

interface TraceLogEntry {
  id: string;
  timestamp: string;
  nodeName: string;
  status: 'info' | 'success' | 'warning' | 'error';
  message: string;
  latencyMs: number;
}

export const ArchitecturePlayground: React.FC = () => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<BlueprintId>('mimasa-search');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePacketNodeIndex, setActivePacketNodeIndex] = useState<number | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<TraceLogEntry[]>([]);
  const [totalSimulatedLatency, setTotalSimulatedLatency] = useState<number>(0);

  // Blueprint-specific interactive toggles
  const [mimasaTypoEnabled, setMimasaTypoEnabled] = useState<boolean>(true);
  const [mimasaHighLoad, setMimasaHighLoad] = useState<boolean>(false);
  const [oceanOptimizerEnabled, setOceanOptimizerEnabled] = useState<boolean>(true);
  const [oceanRoleAdmin, setOceanRoleAdmin] = useState<boolean>(false);
  const [eazeaeSimulateDuplicate, setEazeaeSimulateDuplicate] = useState<boolean>(false);
  const [eazeaeIndexOptimized, setEazeaeIndexOptimized] = useState<boolean>(true);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const currentBlueprint = BLUEPRINTS[activeBlueprintId];
  const selectedNode = currentBlueprint.nodes[selectedNodeIndex] || currentBlueprint.nodes[0];

  // Auto-scroll trace logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  // Reset node selection when blueprint changes
  useEffect(() => {
    setSelectedNodeIndex(0);
    setActivePacketNodeIndex(null);
    setIsSimulating(false);
    setSimulationLogs([]);
    setTotalSimulatedLatency(0);
  }, [activeBlueprintId]);

  // Compute live latency based on toggles
  const calculateNodeLatency = (node: ArchitectureNode, index: number): number => {
    let latency = node.baseLatencyMs;

    if (activeBlueprintId === 'mimasa-search') {
      if (node.id === 'opensearch_cluster' && mimasaTypoEnabled) {
        latency += 8; // Levenshtein fuzzy distance matching
      }
      if (mimasaHighLoad) {
        latency = Math.round(latency * 1.35);
      }
    } else if (activeBlueprintId === 'oceanmotion-graph') {
      if (node.id === 'neo4j_traversal') {
        latency = oceanOptimizerEnabled ? 24 : 142; // Unoptimized traversal bottleneck
      }
      if (node.id === 'rbac_matrix' && oceanRoleAdmin) {
        latency = 2; // Admin bypass
      }
    } else if (activeBlueprintId === 'eazeae-atomic-qr') {
      if (node.id === 'mongodb_hash_index') {
        latency = eazeaeIndexOptimized ? 8 : 46; // Unindexed vs indexed hash lookup
      }
      if (node.id === 'atomic_state_lock' && eazeaeSimulateDuplicate) {
        latency = 12; // Instant atomic reject
      }
    }

    // Add subtle organic jitter
    return Math.max(2, latency + (Math.floor(Math.sin(index * 3) * 2)));
  };

  // Run Step-by-Step Live Request Simulator
  const handleFireRequest = async () => {
    if (isSimulating) return;

    cliSounds.initContext();
    cliSounds.playEnterClick();
    setIsSimulating(true);
    setSimulationLogs([]);
    setTotalSimulatedLatency(0);

    const initialEntry: TraceLogEntry = {
      id: 'init',
      timestamp: '00:00.000',
      nodeName: 'INGRESS_CLIENT',
      status: 'info',
      message: `[REQUEST_START] Ingress initialized for ${currentBlueprint.name}. Payload validated.`,
      latencyMs: 0
    };
    setSimulationLogs([initialEntry]);

    let accumulatedLatency = 0;

    for (let i = 0; i < currentBlueprint.nodes.length; i++) {
      const node = currentBlueprint.nodes[i];
      setActivePacketNodeIndex(i);
      setSelectedNodeIndex(i);

      const stepLatency = calculateNodeLatency(node, i);
      accumulatedLatency += stepLatency;
      setTotalSimulatedLatency(accumulatedLatency);

      // Play subtle acoustic click on progression
      cliSounds.playKeyClick();

      // Check special interactive branch conditions
      let logStatus: 'info' | 'success' | 'warning' | 'error' = 'success';
      let logMsg = `[OK ${stepLatency}ms] ${node.shortLabel} handled payload successfully via ${node.protocol}.`;

      if (activeBlueprintId === 'mimasa-search' && node.id === 'opensearch_cluster' && mimasaTypoEnabled) {
        logMsg = `[FUZZY_MATCH ${stepLatency}ms] Corrected query token "dashbord" → "dashboard" in OpenSearch shard (org_id scoped).`;
      } else if (activeBlueprintId === 'oceanmotion-graph' && node.id === 'neo4j_traversal') {
        if (oceanOptimizerEnabled) {
          logMsg = `[INDEX_ANCHORED ${stepLatency}ms] 35+ Cypher queries matched via INDEX ON :Group(id) (30–40% faster).`;
        } else {
          logStatus = 'warning';
          logMsg = `[UNOPTIMIZED_SCAN ${stepLatency}ms] Full table scan detected! (Toggle optimizer to reduce to 24ms).`;
        }
      } else if (activeBlueprintId === 'eazeae-atomic-qr' && node.id === 'atomic_state_lock' && eazeaeSimulateDuplicate) {
        logStatus = 'warning';
        logMsg = `[MUTEX_REJECT ${stepLatency}ms] ATOMIC LOCK TRIPPED: Second scan on Ticket UUID rejected. Status: ALREADY_VALIDATED (0 duplicate entry).`;
      }

      setSimulationLogs((prev) => [
        ...prev,
        {
          id: `step-${i}-${Date.now()}`,
          timestamp: `+${accumulatedLatency.toFixed(1)}ms`,
          nodeName: node.shortLabel.toUpperCase().replace(/\s+/g, '_'),
          status: logStatus,
          message: logMsg,
          latencyMs: stepLatency
        }
      ]);

      // Delay per node for animation visibility
      await new Promise((resolve) => setTimeout(resolve, 450));
    }

    // Final completion
    cliSounds.playSuccess();
    setSimulationLogs((prev) => [
      ...prev,
      {
        id: `done-${Date.now()}`,
        timestamp: `+${accumulatedLatency.toFixed(1)}ms`,
        nodeName: 'CYCLE_COMPLETE',
        status: 'success',
        message: `[REQUEST_RESOLVED] End-to-end trace finished. Total duration: ${accumulatedLatency}ms (P99 Target: ${currentBlueprint.targetP99}).`,
        latencyMs: accumulatedLatency
      }
    ]);

    setIsSimulating(false);
  };

  const handleResetSimulation = () => {
    cliSounds.playKeyClick();
    setIsSimulating(false);
    setActivePacketNodeIndex(null);
    setSimulationLogs([]);
    setTotalSimulatedLatency(0);
  };

  return (
    <CinematicSection
      id="playground"
      chapterNumber="07"
      chapterLabel="SYSTEM BLUEPRINT"
      motionType="constellation"
      className="relative z-20 py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF6B53] font-bold tracking-widest uppercase">
              07 / ARCHITECTURE PLAYGROUND
            </span>
            <span className="h-px w-12 bg-[#FF6B53]/30" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B53]/10 border border-[#FF6B53]/25 text-[11px] font-mono text-[#FF6B53]">
              <Radio className="w-2.5 h-2.5 animate-pulse text-[#FF6B53]" />
              Live Interactive Simulator
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
            THE ARCHITECTURE PLAYGROUND.
          </h2>

          <p className="text-base sm:text-lg text-[#C3CBD3] leading-relaxed">
            Step through real production pipelines, simulate distributed race conditions, and test how sub-100ms backend decisions translate into resilient systems.
          </p>
        </div>

        {/* Blueprint Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-[#151E27] border border-white/8">
          {(Object.keys(BLUEPRINTS) as BlueprintId[]).map((bpId) => {
            const bp = BLUEPRINTS[bpId];
            const isSelected = activeBlueprintId === bpId;

            return (
              <button
                key={bpId}
                onClick={() => {
                  cliSounds.playKeyClick();
                  setActiveBlueprintId(bpId);
                }}
                className={`group relative text-left p-4 rounded-xl transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? 'bg-[#0F161E] border border-[#FF6B53]/40 shadow-lg'
                    : 'hover:bg-[#1B2630]/60 border border-transparent text-[#7E8994]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#FF6B53]' : 'text-[#7E8994]'}`}>
                    SYS.0{bpId === 'mimasa-search' ? '1' : bpId === 'oceanmotion-graph' ? '2' : '3'}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-[#FF6B53]/15 text-[#FF6B53] border border-[#FF6B53]/30' : 'bg-white/5 text-[#7E8994]'
                  }`}>
                    {bp.keyMetric}
                  </span>
                </div>

                <div className={`text-sm sm:text-base font-bold ${isSelected ? 'text-[#FFFFFF]' : 'text-[#C3CBD3] group-hover:text-[#FFFFFF]'}`}>
                  {bp.name}
                </div>

                <div className="text-xs text-[#7E8994] truncate mt-1">
                  {bp.systemName}
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeBlueprintIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FF6B53] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Blueprint Interactive Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Blueprint Visual Canvas (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151E27] border border-white/8 space-y-8 relative overflow-hidden">
              
              {/* Top Pipeline Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#FF6B53] font-bold uppercase">
                      ACTIVE SYSTEM TOPOLOGY
                    </span>
                    <span className="text-xs text-[#7E8994]">·</span>
                    <span className="font-mono text-xs text-[#C3CBD3]">
                      {currentBlueprint.nodes.length} Nodes in Chain
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">
                    {currentBlueprint.name}
                  </h3>
                </div>

                {/* Simulator Action Controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleResetSimulation}
                    disabled={isSimulating && activePacketNodeIndex === null}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F161E] hover:bg-[#1B2630] border border-white/10 text-xs font-mono text-[#C3CBD3] hover:text-[#FFFFFF] transition-all disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleFireRequest}
                    disabled={isSimulating}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B53] hover:bg-[#FF7A63] text-[#0F161E] font-bold text-xs tracking-wide transition-all shadow-md disabled:opacity-60"
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{isSimulating ? 'Tracing Request...' : 'Send Test Request'}</span>
                  </button>
                </div>
              </div>

              {/* Topology Nodes Grid Flow */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {currentBlueprint.nodes.map((node, index) => {
                    const isSelected = selectedNodeIndex === index;
                    const isPacketActive = activePacketNodeIndex === index;
                    const nodeLatency = calculateNodeLatency(node, index);

                    return (
                      <motion.div
                        key={node.id}
                        whileHover={{ y: -2 }}
                        onClick={() => {
                          cliSounds.playKeyClick();
                          setSelectedNodeIndex(index);
                        }}
                        className={`cursor-pointer p-4 rounded-2xl transition-all duration-200 relative border ${
                          isSelected
                            ? 'bg-[#0F161E] border-[#FF6B53] shadow-md shadow-[#FF6B53]/10'
                            : isPacketActive
                            ? 'bg-[#0F161E] border-[#FF6B53] ring-2 ring-[#FF6B53]/30'
                            : 'bg-[#0F161E]/80 hover:bg-[#0F161E] border-white/8 hover:border-white/15'
                        }`}
                      >
                        {/* Status Beacon / Packet Indicator */}
                        {isPacketActive && (
                          <motion.span
                            layoutId="packetBeacon"
                            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#FF6B53] ring-4 ring-[#FF6B53]/30 animate-pulse"
                          />
                        )}

                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[10px] text-[#7E8994] font-bold">
                            0{index + 1} · {node.techBadge}
                          </span>
                          <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#FF6B53]/15 text-[#FF6B53]' : 'bg-white/5 text-[#7E8994]'
                          }`}>
                            ~{nodeLatency}ms
                          </span>
                        </div>

                        <div className="text-sm font-bold text-[#FFFFFF] line-clamp-1 mb-1">
                          {node.shortLabel}
                        </div>

                        <p className="text-xs text-[#7E8994] line-clamp-2 leading-relaxed">
                          {node.description}
                        </p>

                        <div className="mt-3 pt-2 border-t border-white/6 flex items-center justify-between text-[10px] font-mono text-[#7E8994]">
                          <span className="truncate">{node.protocol}</span>
                          <span className={isSelected ? 'text-[#FF6B53] font-bold' : ''}>
                            {isSelected ? 'ACTIVE' : 'INSPECT →'}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Blueprint-Specific Scenario Controls */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F161E] border border-white/8 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] font-bold uppercase">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Interactive Parameter Controls</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#7E8994]">
                    Toggle live conditions to test system tolerance
                  </span>
                </div>

                {/* Mimasa AI Toggles */}
                {activeBlueprintId === 'mimasa-search' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setMimasaTypoEnabled(!mimasaTypoEnabled);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        mimasaTypoEnabled
                          ? 'bg-[#FF6B53]/10 border-[#FF6B53]/40 text-[#FFFFFF]'
                          : 'bg-[#151E27] border-white/8 text-[#7E8994]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">Typo-Tolerant Fuzzy Matching</div>
                        <div className="text-[10px] text-[#7E8994]">Simulates "dashbord" → "dashboard"</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${mimasaTypoEnabled ? 'bg-[#FF6B53] text-[#0F161E] font-bold' : 'bg-white/5 text-[#7E8994]'}`}>
                        {mimasaTypoEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setMimasaHighLoad(!mimasaHighLoad);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        mimasaHighLoad
                          ? 'bg-amber-500/10 border-amber-500/40 text-[#FFFFFF]'
                          : 'bg-[#151E27] border-white/8 text-[#7E8994]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">10x Peak Concurrency Load</div>
                        <div className="text-[10px] text-[#7E8994]">Stress tests Celery worker pool</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${mimasaHighLoad ? 'bg-amber-400 text-[#0F161E] font-bold' : 'bg-white/5 text-[#7E8994]'}`}>
                        {mimasaHighLoad ? '10x LOAD' : '1x NORMAL'}
                      </span>
                    </button>
                  </div>
                )}

                {/* OceanMotion Toggles */}
                {activeBlueprintId === 'oceanmotion-graph' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setOceanOptimizerEnabled(!oceanOptimizerEnabled);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        oceanOptimizerEnabled
                          ? 'bg-[#FF6B53]/10 border-[#FF6B53]/40 text-[#FFFFFF]'
                          : 'bg-red-500/10 border-red-500/40 text-red-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">Cypher Query Optimizer</div>
                        <div className="text-[10px] text-[#7E8994]">{oceanOptimizerEnabled ? 'INDEX ON :Group(id) (24ms)' : 'Unindexed Scan (142ms)'}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${oceanOptimizerEnabled ? 'bg-[#FF6B53] text-[#0F161E] font-bold' : 'bg-red-500 text-white font-bold'}`}>
                        {oceanOptimizerEnabled ? 'TUNED' : 'UNINDEXED'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setOceanRoleAdmin(!oceanRoleAdmin);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        oceanRoleAdmin
                          ? 'bg-[#FF6B53]/10 border-[#FF6B53]/40 text-[#FFFFFF]'
                          : 'bg-[#151E27] border-white/8 text-[#7E8994]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">RBAC Test Persona</div>
                        <div className="text-[10px] text-[#7E8994]">{oceanRoleAdmin ? 'Full System Admin Access' : 'Scoped Member Group'}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${oceanRoleAdmin ? 'bg-[#FF6B53] text-[#0F161E] font-bold' : 'bg-white/10 text-[#FFFFFF]'}`}>
                        {oceanRoleAdmin ? 'ADMIN' : 'MEMBER'}
                      </span>
                    </button>
                  </div>
                )}

                {/* EazEae Toggles */}
                {activeBlueprintId === 'eazeae-atomic-qr' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setEazeaeSimulateDuplicate(!eazeaeSimulateDuplicate);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        eazeaeSimulateDuplicate
                          ? 'bg-amber-500/15 border-amber-500/50 text-[#FFFFFF]'
                          : 'bg-[#151E27] border-white/8 text-[#7E8994]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">Simulate Duplicate Concurrent Scan</div>
                        <div className="text-[10px] text-[#7E8994]">Tests atomic mutex state lock</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${eazeaeSimulateDuplicate ? 'bg-amber-400 text-[#0F161E] font-bold' : 'bg-white/5 text-[#7E8994]'}`}>
                        {eazeaeSimulateDuplicate ? 'DUPLICATE' : 'SINGLE'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        cliSounds.playKeyClick();
                        setEazeaeIndexOptimized(!eazeaeIndexOptimized);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between ${
                        eazeaeIndexOptimized
                          ? 'bg-[#FF6B53]/10 border-[#FF6B53]/40 text-[#FFFFFF]'
                          : 'bg-red-500/10 border-red-500/40 text-red-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#FFFFFF]">MongoDB Compound Hash Index</div>
                        <div className="text-[10px] text-[#7E8994]">{eazeaeIndexOptimized ? '~75% faster lookup (~8ms)' : 'Legacy Collection Scan (~46ms)'}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${eazeaeIndexOptimized ? 'bg-[#FF6B53] text-[#0F161E] font-bold' : 'bg-red-500 text-white font-bold'}`}>
                        {eazeaeIndexOptimized ? 'INDEXED' : 'UNINDEXED'}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Real-Time Request Trace Terminal Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#7E8994]">
                  <div className="flex items-center gap-1.5 text-[#FF6B53] font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>DISTRIBUTED REQUEST TRACE LOG</span>
                  </div>
                  {totalSimulatedLatency > 0 && (
                    <span className="text-emerald-400 font-bold">
                      Accumulated: {totalSimulatedLatency}ms
                    </span>
                  )}
                </div>

                <div
                  ref={logsContainerRef}
                  className="p-4 rounded-2xl bg-[#0F161E] border border-white/8 font-mono text-xs space-y-2 max-h-48 overflow-y-auto"
                >
                  {simulationLogs.length === 0 ? (
                    <div className="text-[#7E8994] py-4 text-center">
                      Click <span className="text-[#FF6B53] font-bold">"Send Test Request"</span> above to trigger live packet tracing through the system topology.
                    </div>
                  ) : (
                    simulationLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#7E8994] shrink-0">{log.timestamp}</span>
                        <span className={`shrink-0 font-bold ${
                          log.status === 'error' ? 'text-red-400' :
                          log.status === 'warning' ? 'text-amber-400' :
                          log.status === 'info' ? 'text-sky-400' :
                          'text-emerald-400'
                        }`}>
                          [{log.nodeName}]
                        </span>
                        <span className="text-[#C3CBD3]">{log.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Node Deep Dive Inspector Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Selected Node Card */}
            <div className="p-6 rounded-3xl bg-[#151E27] border border-white/8 space-y-6">
              
              <div className="space-y-1 pb-4 border-b border-white/8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FF6B53] font-bold uppercase">
                    NODE INSPECTOR · 0{selectedNodeIndex + 1}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0F161E] border border-white/10 text-[#C3CBD3]">
                    {selectedNode.techBadge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF]">
                  {selectedNode.name}
                </h3>
                <div className="text-xs font-mono text-[#7E8994]">
                  Protocol: {selectedNode.protocol}
                </div>
              </div>

              {/* Core Responsibility */}
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-[#FF6B53] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>RESPONSIBILITY</span>
                </div>
                <p className="text-xs text-[#C3CBD3] leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Implementation Strategy */}
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>AKASH'S IMPLEMENTATION</span>
                </div>
                <p className="text-xs text-[#C3CBD3] leading-relaxed">
                  {selectedNode.implementation}
                </p>
              </div>

              {/* Failure Mode & Resilience */}
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FAILURE SAFEGUARD</span>
                </div>
                <p className="text-xs text-[#C3CBD3] leading-relaxed">
                  {selectedNode.failureSafeguard}
                </p>
              </div>

              {/* Performance Budget */}
              <div className="p-3.5 rounded-xl bg-[#0F161E] border border-white/6 flex items-center justify-between font-mono text-xs">
                <span className="text-[#7E8994]">Latency Target</span>
                <span className="text-emerald-400 font-bold">{selectedNode.latencyBudget}</span>
              </div>

            </div>

            {/* Architectural Summary Callout */}
            <div className="p-6 rounded-3xl bg-[#151E27]/70 border border-white/8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF6B53] font-bold uppercase">
                <Workflow className="w-3.5 h-3.5" />
                <span>SYSTEM RATIONALE</span>
              </div>
              <p className="text-xs text-[#C3CBD3] leading-relaxed">
                {currentBlueprint.summary}
              </p>
              <div className="pt-2 border-t border-white/6 flex items-center justify-between text-xs font-mono text-[#7E8994]">
                <span>P99 Benchmark</span>
                <span className="text-[#FFFFFF] font-bold">{currentBlueprint.targetP99}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </CinematicSection>
  );
};
