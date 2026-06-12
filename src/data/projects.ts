export interface Project {
  slug: string;
  name: string;
  year: string;
  lede: string;
  detail: string;
  tags: string[];
  github?: string;
  docs?: string;
}

export const projects: Project[] = [
  {
    slug: 'devproxy',
    name: 'DevProxy',
    year: '2025',
    lede: 'A high-performance HTTP proxy written in modern C++ — connection pooling, an epoll event loop, and a config language small enough to memorize.',
    detail:
      'DevProxy is an HTTP/1.1 forward and reverse proxy built from raw sockets up. It runs a single-threaded epoll-based event loop per core, keeps upstream connections alive in a slab-allocated pool, and reloads configuration on SIGHUP without dropping in-flight requests. Structured access logs ship as newline-delimited JSON. Built to understand exactly what nginx does for me — and what it costs.',
    tags: ['C++17', 'epoll', 'Sockets', 'CMake'],
    github: 'https://github.com/aniketpal/devproxy',
  },
  {
    slug: 'bns-rag',
    name: 'BNS RAG',
    year: '2025',
    lede: 'A biomedical retrieval-augmented generation pipeline that answers clinical questions with citations, not confidence.',
    detail:
      'BNS RAG ingests biomedical literature, chunks it with section-aware splitting, embeds passages into ChromaDB, and serves grounded answers through a locally hosted Ollama model. A reranking stage filters retrieved passages before generation, and an evaluation harness scores every answer for citation faithfulness. The reranker cut hallucinated references by roughly 60% in testing.',
    tags: ['Python', 'Ollama', 'ChromaDB', 'FastAPI'],
    github: 'https://github.com/aniketpal/bns-rag',
  },
  {
    slug: 'distributed-cache',
    name: 'Distributed Cache',
    year: '2024',
    lede: 'A sharded in-memory cache with consistent hashing, TTL eviction, and a wire protocol you can read with netcat.',
    detail:
      'A distributed key-value cache where nodes discover each other over a gossip layer and keys are placed via consistent hashing with virtual nodes, so adding a shard remaps only its slice of the ring. Supports per-key TTLs, LRU eviction under memory pressure, and a deliberately plain text protocol for debuggability. The interesting failures were never in the happy path — they were in what happens when a node disappears mid-rebalance.',
    tags: ['C++', 'Consistent Hashing', 'Gossip', 'TCP'],
    github: 'https://github.com/aniketpal/distributed-cache',
  },
  {
    slug: 'load-balancer',
    name: 'Load Balancer',
    year: '2024',
    lede: 'A Layer 4/7 load balancer with health checks, weighted round-robin, and least-connections scheduling.',
    detail:
      'A load balancer that speaks both raw TCP and HTTP, with pluggable scheduling strategies: round-robin, weighted round-robin, and least-connections. Active health checks eject unhealthy upstreams and readmit them after consecutive successes, with exponential backoff between probes. Built as the natural sequel to DevProxy — once you can move one request, the next question is how to move a million of them fairly.',
    tags: ['C++', 'Layer 4/7', 'Health Checks', 'Scheduling'],
    github: 'https://github.com/aniketpal/load-balancer',
  },
];
