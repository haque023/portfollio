import type { Project } from '../types/index.ts'

/**
 * Portfolio projects, in display order.
 *
 * Rules for this file:
 *  - `status` must reflect reality. Use "Production" only for systems actually running in production.
 *  - `results` may only contain verified outcomes. Leave it empty when nothing has been measured;
 *    the detail page then says so explicitly.
 *  - Add `github` / `demo` only when the URL exists. Both are optional and hidden when omitted.
 */
export const projects: Project[] = [
  {
    id: 'enterprise-rag-platform',
    title: 'Enterprise RAG Platform',
    category: 'AI & RAG',
    status: 'MVP',
    summary:
      'Enterprise knowledge retrieval that grounds LLM answers in indexed company documents using embeddings, a vector database and semantic search.',
    overview:
      'A retrieval-augmented generation platform for enterprise document and knowledge search. Documents are ingested, embedded and indexed so an LLM-powered assistant can answer questions from company knowledge instead of relying on model memory.',
    problem:
      'Enterprise knowledge is scattered across documents and systems, and keyword search returns file lists rather than answers. General-purpose LLMs do not know internal content and cannot be trusted to guess it.',
    solution:
      'Ingest documents, split them into chunks, embed each chunk, and store the vectors in a vector database. At query time, run semantic (and optionally hybrid) retrieval, assemble the retrieved context, and have the LLM generate an answer grounded in that context.',
    architectureHighlights: [
      'Clean separation between ingestion, retrieval and generation so each stage can be evaluated and replaced independently.',
      'Embedding model and vector store are configuration choices (OpenAI text-embedding-3-small, Sentence Transformers, ChromaDB, Qdrant).',
      'Retrieval quality and answer groundedness are treated as first-class evaluation targets.',
    ],
    architecture: [
      { label: 'Ingestion', items: ['Document loaders', 'Chunking', 'Embedding model'] },
      { label: 'Storage', items: ['Vector database', 'Document metadata'] },
      {
        label: 'Retrieval',
        items: ['Semantic search', 'Hybrid retrieval', 'Context construction'],
      },
      { label: 'Generation', items: ['Prompt assembly', 'LLM', 'Grounded answer'] },
      { label: 'Delivery', items: ['REST API', 'Assistant interface'] },
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LLM',
      'Azure OpenAI',
      'Embeddings',
      'ChromaDB',
      'Qdrant',
      'Semantic search',
      'RAG',
    ],
    keyFeatures: [
      'Semantic document search over an embedded corpus',
      'LLM-powered assistant with contextual retrieval',
      'Chunking and embedding pipeline for document ingestion',
      'Swappable embedding models and vector stores',
    ],
    challenges: [
      'Choosing chunk size and overlap so retrieved context is complete but focused.',
      'Balancing semantic and keyword matching for enterprise terminology and identifiers.',
      'Measuring retrieval quality and groundedness rather than judging answers by eye.',
    ],
    results: [],
  },
  {
    id: 'ai-interview-system',
    title: 'AI Interview System',
    category: 'AI Agents',
    status: 'Prototype',
    summary:
      'A multi-agent interview platform design covering interview planning, question generation, answer evaluation, behavioral analysis and report generation.',
    overview:
      'A prototype of an AI-assisted interview platform in which specialised agents each own one stage of the interview process, from planning through to a final assessment report.',
    problem:
      'Structured interviews are time-consuming to prepare, hard to score consistently, and difficult to summarise into a comparable report.',
    solution:
      'Split the process across cooperating agents: a planner defines the interview structure, a question generator tailors questions to the role and profile, an evaluator scores answers, a behavioral analyzer processes visual signals, and a report generator produces the final assessment. Conversational and avatar interfaces are being explored for the candidate experience.',
    architectureHighlights: [
      'One agent per responsibility, coordinated through a FastAPI backend.',
      'RAG grounds question generation and evaluation in role and profile context.',
      'Behavioral analysis runs on facial-signal models (MediaPipe, ONNX Runtime, HSEmotion).',
      'Avatar interfaces (for example Simli) are treated as pluggable presentation layers.',
    ],
    architecture: [
      { label: 'Interface', items: ['Candidate UI', 'Conversational / avatar layer'] },
      { label: 'Backend', items: ['FastAPI', 'Session orchestration'] },
      {
        label: 'Agents',
        items: [
          'Interview planner',
          'Question generator',
          'Answer evaluator',
          'Behavioral analyzer',
          'Report generator',
        ],
      },
      { label: 'Models & context', items: ['LLM', 'RAG context', 'MediaPipe / ONNX Runtime'] },
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LLM',
      'AI agents',
      'RAG',
      'MediaPipe',
      'ONNX Runtime',
      'HSEmotion',
      'Simli',
    ],
    keyFeatures: [
      'Role-aware interview planning',
      'Question generation from role and profile context',
      'Answer evaluation and scoring',
      'Behavioral / facial-expression signal analysis',
      'Automated interview report generation',
    ],
    challenges: [
      'Keeping answer evaluation consistent and explainable across candidates and roles.',
      'Treating behavioral signals as supporting information rather than definitive judgement.',
      'Coordinating several agents while keeping latency acceptable for a live conversation.',
    ],
    results: [],
  },
  {
    id: 'enterprise-anomaly-detection',
    title: 'Enterprise Anomaly Detection Platform (EDAP)',
    category: 'Enterprise Systems',
    status: 'Concept',
    summary:
      'An architecture for collecting events across business systems, detecting anomalies, scoring risk and recommending controlled actions.',
    overview:
      'EDAP is an enterprise data and anomaly detection concept. It collects business events from ERP, databases, APIs and IoT sources, normalises them, detects anomalies and turns them into scored, actionable alerts.',
    problem:
      'Irregularities such as unusual sales-order patterns are spread across many systems and are usually noticed late, if at all, because no single system sees the whole picture.',
    solution:
      'Collect events from each source into a common shape, run detection over the normalised stream, score the risk of each finding, alert the right people and recommend a next step, with any automated action kept under control.',
    architectureHighlights: [
      'Business events (for example "sales order approved") are modelled separately from raw database changes.',
      'An ERP event outbox combined with SQL Server change data capture is the intended reliable event source, with idempotency and replay.',
      'Sales-order header and row data is a first target for auditing scenarios.',
    ],
    architecture: [
      {
        label: 'Sources',
        items: ['SQL Server', 'PostgreSQL', 'ERP', 'APIs', 'Google Workspace', 'IoT'],
      },
      { label: 'Collection', items: ['Event outbox', 'Change data capture'] },
      { label: 'Normalization', items: ['Common event schema'] },
      { label: 'Detection', items: ['Rules', 'AI / ML models'] },
      { label: 'Risk scoring', items: ['Business-impact score'] },
      { label: 'Response', items: ['Alert', 'Recommendation', 'Controlled action'] },
    ],
    technologies: ['Python', '.NET', 'SQL Server', 'PostgreSQL', 'REST APIs', 'AI / ML'],
    keyFeatures: [
      'Multi-source event collection',
      'Normalised event model across systems',
      'Anomaly detection and risk scoring',
      'Alerts with recommended follow-up',
    ],
    challenges: [
      'Distinguishing meaningful business events from low-level row changes.',
      'Reliable event delivery: idempotent consumers, replay and observability.',
      'Keeping automated actions safe and reviewable.',
    ],
    results: [],
  },
  {
    id: 'ai-job-matching-engine',
    title: 'AI Job Matching Engine',
    category: 'AI & RAG',
    status: 'MVP',
    summary:
      'Job recommendation and candidate matching that combines parsed profile and job features, semantic embeddings and a 100-point scoring framework.',
    overview:
      'The matching engine behind the NextJobz / NextJobApps job portal work. It parses resumes and jobs, derives features, uses embeddings and vector search for semantic matching, and ranks results with an explicit scoring model.',
    problem:
      'Keyword matching misses candidates whose skills are phrased differently from a job description, and opaque rankings are hard to trust or tune.',
    solution:
      'Extract structured features from profiles and jobs, embed skills and text for semantic similarity, retrieve candidates or jobs by vector search, and rank them with a transparent 100-point recommendation framework.',
    architectureHighlights: [
      'A 100-point scoring framework across relevant experience, duration, industry, seniority, latest category, job title, skills and education.',
      'Embedding options include OpenAI text-embedding-3-small (1536 dimensions) and Qwen3-Embedding-8B (1024-dimension configurations explored), plus Sentence Transformers.',
      'Semantic retrieval narrows the candidate set; the scoring layer produces the explainable ranking.',
    ],
    architecture: [
      { label: 'Parsing', items: ['Resume parsing', 'Job parsing'] },
      { label: 'Features', items: ['Profile features', 'Job features'] },
      { label: 'Embedding', items: ['Skill / text embeddings'] },
      { label: 'Retrieval', items: ['Vector database', 'Semantic search'] },
      { label: 'Ranking', items: ['100-point scoring framework'] },
      { label: 'Delivery', items: ['Backend APIs', 'Job portal (Next.js)'] },
    ],
    technologies: [
      'Embeddings',
      'Semantic search',
      'Vector database',
      'Sentence Transformers',
      'Backend APIs',
      'Next.js',
    ],
    keyFeatures: [
      'Resume and job parsing',
      'Semantic skill and text matching',
      'Explainable 100-point recommendation scoring',
      'Candidate-to-job and job-to-candidate matching',
    ],
    challenges: [
      'Weighing very different signals (skills, seniority, industry, recency) into one score.',
      'Matching skills semantically without over-matching loosely related terms.',
      'Keeping the ranking explainable enough to tune.',
    ],
    results: [
      'Defined a 100-point recommendation scoring framework across eight factors: relevant experience, duration, industry, seniority, latest category, job title, skills and education.',
    ],
  },
  {
    id: 'edge-industrial-vision',
    title: 'Edge Industrial Vision & Telemetry',
    category: 'Industrial AI',
    status: 'Prototype',
    summary:
      'Production-line monitoring that combines computer vision, edge inference and telemetry, with industrial control over Modbus RTU / RS485.',
    overview:
      'A pipeline concept and prototype for factory monitoring: cameras and edge inference detect production events, telemetry is streamed, and results are integrated with enterprise software. Related hardware work covers PLC-style control over RS485.',
    problem:
      'Manual counting and inspection on a production line is slow and error-prone, and the resulting data rarely reaches enterprise systems in a usable form.',
    solution:
      'Run vision models at the edge to detect and count events, publish telemetry over lightweight protocols, and integrate with backend systems. Control hardware is driven through Modbus RTU over RS485.',
    architectureHighlights: [
      'Target applications: cement bag counting, defect detection, production monitoring and industrial event detection.',
      'Edge-first inference keeps latency low and reduces the need to stream raw video.',
      'Control path: microcontroller, RS485, Modbus RTU, R421C32 32-channel relay.',
    ],
    architecture: [
      { label: 'Capture', items: ['Cameras', 'Production line sensors'] },
      { label: 'Edge inference', items: ['Computer vision', 'Counting / defect detection'] },
      { label: 'Telemetry', items: ['MQTT', 'Industrial telemetry'] },
      {
        label: 'Control',
        items: ['ESP32 / M5Stack / StampPLC', 'RS485 + Modbus RTU', 'Relay module'],
      },
      { label: 'Integration', items: ['Backend APIs', 'SQL database', 'Enterprise systems'] },
    ],
    technologies: [
      'Computer vision',
      'Edge AI',
      'Python',
      'MQTT',
      'Modbus RTU',
      'RS485',
      'ESP32',
      'M5Stack',
      'StampPLC',
    ],
    keyFeatures: [
      'Vision-based counting and defect detection concepts',
      'MQTT telemetry from the line to enterprise systems',
      'Modbus RTU relay control over RS485',
    ],
    challenges: [
      'High-speed counting where objects move quickly past the camera.',
      'Running reliably on constrained edge hardware.',
      'Bridging industrial protocols and modern enterprise APIs.',
    ],
    results: [],
  },
  {
    id: 'erp-mcp-server',
    title: 'ERP MCP Server',
    category: 'AI Agents',
    status: 'Concept',
    summary:
      'A concept for exposing ERP capabilities to LLM agents as governed tools through the Model Context Protocol.',
    overview:
      'An architecture for enterprise AI integration in which ERP functions are published as MCP tools. Agents and LLM clients call those tools instead of touching databases directly, with authentication and control in between.',
    problem:
      'Connecting LLMs to ERP systems ad hoc leads to fragile integrations and unclear access boundaries, and giving an agent direct database access is unacceptable in an enterprise.',
    solution:
      'Wrap selected ERP operations as MCP tools behind an authenticated server. The agent discovers and calls tools; the server enforces permissions, calls existing enterprise APIs and returns structured results.',
    architectureHighlights: [
      'Existing ERP APIs remain the system of record; the MCP layer is an adapter, not a rewrite.',
      'Authentication and authorization are enforced at the tool boundary.',
      'The same pattern extends to Google Workspace and other enterprise APIs.',
    ],
    architecture: [
      { label: 'Client', items: ['LLM', 'AI agent'] },
      { label: 'Protocol', items: ['MCP client', 'Tool discovery'] },
      { label: 'MCP server', items: ['Tool definitions', 'Auth & permissions'] },
      { label: 'Enterprise APIs', items: ['ERP APIs (ASP.NET Core)', 'Google Workspace APIs'] },
      { label: 'Data', items: ['SQL Server'] },
    ],
    technologies: ['MCP', 'LLM', 'Tool calling', '.NET', 'ASP.NET Core', 'SQL Server', 'OAuth'],
    keyFeatures: [
      'ERP operations exposed as callable tools',
      'Permission checks at the tool boundary',
      'Reusable pattern for other enterprise APIs',
    ],
    challenges: [
      'Designing tool granularity so agents stay effective without over-broad access.',
      'Authenticating agent-initiated calls against enterprise identity.',
      'Keeping automated, write-capable actions controlled and auditable.',
    ],
    results: [],
  },
  {
    id: 'agentmesh',
    title: 'AgentMesh',
    category: 'AI Agents',
    status: 'Reference',
    summary:
      'A reference architecture for an enterprise AI platform: provider-agnostic LLM access, agent runtime, RAG and MCP behind a hexagonal core.',
    overview:
      'AgentMesh is a portfolio reference architecture under active development. It is not established production experience; it exists to demonstrate how a reusable enterprise AI platform can be structured.',
    problem:
      'AI prototypes often hard-wire one LLM provider, one vector store and one orchestration library, which makes them difficult to evolve, test or move between clouds.',
    solution:
      'Use Clean / Hexagonal architecture so LLM providers, agent implementations, RAG providers, tools and infrastructure adapters are all replaceable behind ports.',
    architectureHighlights: [
      'Ports and adapters for LLM providers: OpenAI, Azure OpenAI and local models.',
      'Async Python and Pydantic models throughout the API and runtime.',
      'LangGraph, LlamaIndex, A2A and RabbitMQ are project and learning implementations, not claimed production experience.',
      'Observability, evaluation and CI/CD are part of the design from the start.',
    ],
    architecture: [
      { label: 'Interface', items: ['FastAPI', 'Pydantic models'] },
      { label: 'Application', items: ['Agent runtime', 'Workflow orchestration'] },
      { label: 'Ports', items: ['LLM provider', 'RAG provider', 'Tools / MCP'] },
      {
        label: 'Adapters',
        items: ['OpenAI / Azure OpenAI / local LLMs', 'PostgreSQL', 'Redis', 'RabbitMQ'],
      },
      { label: 'Operations', items: ['Docker', 'Kubernetes', 'Observability', 'CI/CD'] },
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Pydantic',
      'Async Python',
      'LangGraph',
      'LlamaIndex',
      'MCP',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
    ],
    keyFeatures: [
      'Replaceable LLM providers, agents, RAG providers and tools',
      'Hexagonal core with infrastructure adapters',
      'Agent runtime with tool and MCP integration',
      'Designed for observability and evaluation',
    ],
    challenges: [
      'Keeping the core free of provider-specific SDK details.',
      'Testing agent behaviour deterministically.',
      'Choosing how much orchestration framework to adopt versus own.',
    ],
    results: [],
  },
  {
    id: 'knowledge-graph-portal',
    title: 'Enterprise Knowledge Graph & Intelligence Portal',
    category: 'AI & RAG',
    status: 'Prototype',
    summary:
      'Connects email history, ERP master data and Google Workspace activity in a knowledge graph to power AI search and relationship analysis.',
    overview:
      'An enterprise intelligence prototype that links information from several business sources so people and AI can search across them and understand organisational relationships.',
    problem:
      'Important context lives in email, ERP master data and workspace activity that are never joined, so relationship questions cannot be answered from any one system.',
    solution:
      'Integrate the sources into PostgreSQL and a Neo4j graph, then apply RAG and AI search over the connected data.',
    architectureHighlights: [
      'Relational storage in PostgreSQL alongside a Neo4j graph of entities and relationships.',
      'GraphRAG-style retrieval is being explored on top of the graph and is project-level work.',
    ],
    architecture: [
      {
        label: 'Sources',
        items: ['Email history', 'ERP master data', 'Google Workspace activity'],
      },
      { label: 'Integration', items: ['Enterprise data integration'] },
      { label: 'Stores', items: ['PostgreSQL', 'Neo4j knowledge graph'] },
      { label: 'AI layer', items: ['AI search', 'RAG'] },
      { label: 'Portal', items: ['Intelligence portal'] },
    ],
    technologies: ['PostgreSQL', 'Neo4j', 'RAG', 'Knowledge graphs', 'Google Workspace APIs'],
    keyFeatures: [
      'Cross-source enterprise search',
      'Organisational relationship analysis',
      'Graph-backed retrieval for AI',
    ],
    challenges: [
      'Resolving entities consistently across email, ERP and workspace data.',
      'Applying access control to retrieval across sensitive sources.',
    ],
    results: [],
  },
  {
    id: 'local-llm-platform',
    title: 'Enterprise Local LLM & Tool-Calling Platform',
    category: 'Research',
    status: 'Research',
    summary:
      'Research into serving open-weight models locally with Ollama and vLLM so enterprise AI does not have to send all data to external APIs.',
    overview:
      'An exploration of local LLM infrastructure: open-weight models served on GPU hardware with tool calling and agent workflows.',
    problem:
      'Some enterprise data should not leave the organisation, which rules out sending every request to an external LLM API.',
    solution:
      'Serve open-weight models (Qwen, DeepSeek) on local GPUs through Ollama and vLLM, and give them tool-calling capabilities for agent workflows.',
    architectureHighlights: [
      'Hardware experimentation on an RTX 4090 and a dual-GPU server environment.',
      'Model serving is abstracted so local and hosted models can be swapped.',
    ],
    architecture: [
      { label: 'Clients', items: ['Applications', 'Agents'] },
      { label: 'Serving', items: ['Ollama', 'vLLM'] },
      { label: 'Models', items: ['Qwen', 'DeepSeek', 'Open-weight models'] },
      { label: 'Hardware', items: ['RTX 4090', 'Dual-GPU server'] },
    ],
    technologies: ['Ollama', 'vLLM', 'Qwen', 'DeepSeek', 'Hugging Face', 'Tool calling'],
    keyFeatures: ['Local GPU inference', 'Tool calling with open-weight models', 'Agent workflows'],
    challenges: [
      'Matching hosted-model tool-calling reliability with open-weight models.',
      'GPU memory and throughput trade-offs when serving larger models.',
    ],
    results: [],
  },
]

export const getProject = (id: string | undefined) => projects.find((p) => p.id === id)

export const projectCategories = [...new Set(projects.map((p) => p.category))]
