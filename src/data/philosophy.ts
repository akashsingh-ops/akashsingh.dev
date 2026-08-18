import { PhilosophyPrinciple } from '../types';

export const manifestoStatement =
  'A good backend engineer understands the problem before writing the code, thinks about how the entire system works together, and builds solutions that are reliable, scalable, secure, and easy to maintain. They don’t just make an API work — they think about what happens when the system grows, fails, or has to change.';

export const principlesData: PhilosophyPrinciple[] = [
  {
    id: 'understand-first',
    title: 'Understand Before Building',
    statement: 'Don’t optimize code before understanding the problem.',
    explanation:
      'Jumping directly into code often produces elegant solutions to the wrong problem. Real engineering begins by questioning assumptions, profiling existing behavior, identifying the actual bottleneck, and clarifying edge cases.',
    mentalModel: 'Problem Scope → Root Cause Analysis → Minimal Architecture → Implementation'
  },
  {
    id: 'think-in-systems',
    title: 'Think in Systems',
    statement: 'An API doesn’t exist in isolation.',
    explanation:
      'Every endpoint interacts with network latency, connection pooling, database query plans, cache eviction strategies, and worker queues. Designing an endpoint requires anticipating upstream caller behavior and downstream storage limits.',
    mentalModel: 'Client → Gateway → Auth → App Logic → Cache / DB → Workers → Observability'
  },
  {
    id: 'measure-before-claiming',
    title: 'Measure Before Claiming',
    statement: 'Performance improvements should be measurable.',
    explanation:
      'Intuition about what is slow is frequently wrong. Profiling execution plans, capturing p95/p99 response latencies, inspecting database indexes, and running reproducible benchmarks ensure optimizations produce tangible, verifiable gains.',
    mentalModel: 'Baseline Metrics → Profiling / Flamegraph → Targeted Refactor → Comparative Benchmark'
  },
  {
    id: 'design-for-change',
    title: 'Design for Change',
    statement: 'Systems evolve.',
    explanation:
      'Software requirements change constantly. Decoupling components through well-defined API contracts, clean domain boundaries, and modular service interfaces ensures the codebase can adapt without requiring complete architectural rewrites.',
    mentalModel: 'Explicit Interfaces + Decoupled Boundaries = Safe Evolutions'
  },
  {
    id: 'automate-repetition',
    title: 'Automate Repetition',
    statement: 'If something is repeatedly done manually, it is a candidate for automation.',
    explanation:
      'Repetitive manual tasks consume cognitive energy and introduce operational risk. Building automated pipelines, validation scripts, and ETL workflows eliminates toil and lets engineers focus on solving novel challenges.',
    mentalModel: 'Manual Process → Identify Deterministic Rules → Script / Pipeline → Continuous Execution'
  },
  {
    id: 'build-for-real-users',
    title: 'Build for Real Users',
    statement: 'Technology matters because it solves real problems.',
    explanation:
      'Engineering excellence is not about how many libraries or complex patterns are employed. It is measured by whether real people can depend on the system every day with speed, reliability, and security.',
    mentalModel: 'Real Human Need → Dependable & Accessible Technology → Measurable Utility'
  }
];
