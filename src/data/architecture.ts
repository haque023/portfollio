import type { FlowNode, SupportPanel } from '../types'

/** The request path of a typical RAG / LLM application, top to bottom. */
export const flowNodes: FlowNode[] = [
  {
    id: 'user',
    label: 'User',
    detail: 'Employee, customer or calling system',
    tech: 'Browser · API client',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    detail: 'Authenticated chat or web interface',
    tech: 'Web UI',
  },
  {
    id: 'backend',
    label: 'API Gateway / Backend',
    detail: 'Authentication, validation and business APIs',
    tech: 'ASP.NET Core · FastAPI',
  },
  {
    id: 'orchestration',
    label: 'AI Orchestration',
    detail: 'Prompt assembly, tool calling, agent workflow',
    tech: 'Python · MCP · tool calling',
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    detail: 'Query embedding, semantic and hybrid search, context construction',
    tech: 'Embeddings · semantic search',
  },
  {
    id: 'vector',
    label: 'Vector Database',
    detail: 'Chunk vectors with metadata',
    tech: 'Qdrant · ChromaDB',
  },
  {
    id: 'llm',
    label: 'LLM',
    detail: 'Grounded generation from retrieved context',
    tech: 'Azure OpenAI · OpenAI · Ollama / vLLM',
  },
  {
    id: 'response',
    label: 'Response',
    detail: 'Answer returned to the user and logged for evaluation',
    tech: 'JSON · UI',
  },
]

export const supportPanels: {
  data: SupportPanel
  platform: SupportPanel
  crossCutting: SupportPanel
} = {
  data: {
    id: 'data',
    title: 'Data & state',
    items: [
      { label: 'Redis', detail: 'Cache and session state' },
      { label: 'PostgreSQL', detail: 'Application data' },
      { label: 'SQL Server', detail: 'ERP and enterprise data' },
    ],
  },
  platform: {
    id: 'platform',
    title: 'Runtime platform',
    items: [
      { label: 'Azure', detail: 'App Service, Functions, OpenAI' },
      { label: 'Docker', detail: 'Containerised services' },
      { label: 'Kubernetes', detail: 'Scalable workloads' },
    ],
  },
  crossCutting: {
    id: 'cross',
    title: 'Cross-cutting concerns',
    items: [
      { label: 'Monitoring & logging', detail: 'Observability across every hop' },
      { label: 'Security', detail: 'Authentication and access control' },
      { label: 'Evaluation', detail: 'Retrieval quality and groundedness' },
    ],
  },
}
