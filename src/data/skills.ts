import type { ProficiencyTier, SkillGroup } from '../types'

/**
 * Self-assessed proficiency on a 10-point scale, taken from the supplied master profile.
 * These are NOT certifications or externally validated scores. Established professional use
 * is rated above project, research or exploratory exposure. Revisit as evidence accumulates.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & Generative AI',
    description: 'LLM applications, retrieval and evaluation.',
    skills: [
      { name: 'LLMs', score: 8.5 },
      { name: 'Generative AI', score: 8.5 },
      { name: 'RAG', score: 8.5 },
      { name: 'Embeddings', score: 8.5 },
      { name: 'Semantic search', score: 8.5 },
      { name: 'Prompt engineering', score: 8.5 },
      { name: 'Vector search', score: 8.0 },
      { name: 'NLP', score: 8.0 },
      { name: 'Tool / function calling', score: 8.0 },
      { name: 'AI evaluation', score: 7.0 },
      { name: 'RAG evaluation', score: 7.0 },
    ],
  },
  {
    id: 'agents',
    title: 'Agents, Local LLMs & Research',
    description: 'Agentic systems, open-weight models and exploratory work.',
    skills: [
      { name: 'AI agents', score: 7.5 },
      { name: 'Ollama', score: 7.5 },
      { name: 'MCP', score: 7.0 },
      { name: 'Agentic AI', score: 7.0 },
      { name: 'vLLM', score: 7.0 },
      { name: 'Hugging Face', score: 7.0 },
      { name: 'Computer vision', score: 6.5 },
      { name: 'Knowledge graphs', score: 6.5 },
      { name: 'GraphRAG', score: 6.0 },
      { name: 'Fine-tuning / QLoRA', score: 5.5 },
      { name: 'LangGraph', score: 5.5 },
      { name: 'LlamaIndex', score: 5.0 },
      { name: 'A2A', score: 4.5 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Enterprise .NET and Python service engineering.',
    skills: [
      { name: 'C#', score: 9.0 },
      { name: '.NET Core', score: 9.0 },
      { name: 'ASP.NET Core', score: 9.0 },
      { name: 'Web API / REST APIs', score: 9.0 },
      { name: 'Entity Framework', score: 8.5 },
      { name: 'Microservices', score: 8.5 },
      { name: 'Software architecture', score: 8.5 },
      { name: 'Python', score: 8.5 },
      { name: 'FastAPI', score: 8.0 },
      { name: 'Async Python', score: 7.5 },
      { name: 'Pydantic', score: 7.5 },
      { name: 'Flask', score: 7.0 },
    ],
  },
  {
    id: 'data',
    title: 'Databases & Search',
    description: 'Relational, vector, search and cache stores.',
    skills: [
      { name: 'SQL Server', score: 9.0 },
      { name: 'PostgreSQL', score: 8.5 },
      { name: 'ChromaDB', score: 8.0 },
      { name: 'Qdrant', score: 7.5 },
      { name: 'Redis', score: 7.5 },
      { name: 'SQLite', score: 7.5 },
      { name: 'Elasticsearch', score: 7.5 },
      { name: 'Meilisearch', score: 7.0 },
      { name: 'Neo4j', score: 6.5 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Azure-first delivery, containers and pipelines.',
    skills: [
      { name: 'Microsoft Azure', score: 8.5 },
      { name: 'Azure OpenAI', score: 8.5 },
      { name: 'Azure App Service', score: 8.5 },
      { name: 'Docker', score: 8.5 },
      { name: 'Azure DevOps', score: 8.0 },
      { name: 'Azure Functions', score: 8.0 },
      { name: 'Kubernetes', score: 8.0 },
      { name: 'CI/CD', score: 8.0 },
      { name: 'Azure AI / Foundry', score: 6.5 },
      { name: 'GitHub Actions', score: 5.5 },
      { name: 'AWS', score: 4.0 },
      { name: 'GCP', score: 4.0 },
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial / IoT',
    description: 'Field hardware, protocols and edge inference.',
    skills: [
      { name: 'Industrial IoT', score: 7.0 },
      { name: 'Modbus RTU', score: 7.0 },
      { name: 'RS485', score: 7.0 },
      { name: 'MQTT', score: 7.0 },
      { name: 'UART', score: 7.0 },
      { name: 'ESP32', score: 7.0 },
      { name: 'M5Stack / StampPLC', score: 6.5 },
      { name: 'Edge AI', score: 6.0 },
      { name: 'ONNX Runtime', score: 6.0 },
      { name: 'Honeywell (building automation)', score: 5.5 },
    ],
  },
]

export const tierLegend: { tier: ProficiencyTier; label: string; range: string; hint: string }[] = [
  {
    tier: 'professional',
    label: 'Advanced',
    range: '8.0 – 10',
    hint: 'Deep, sustained professional use',
  },
  {
    tier: 'strong',
    label: 'Strong working',
    range: '7.0 – 7.9',
    hint: 'Independently implements and integrates',
  },
  {
    tier: 'project',
    label: 'Project',
    range: '5.5 – 6.9',
    hint: 'Meaningful project / R&D exposure',
  },
  {
    tier: 'exploratory',
    label: 'Exploratory',
    range: '< 5.5',
    hint: 'Learning and experimentation',
  },
]

export function getTier(score: number): ProficiencyTier {
  if (score >= 8) return 'professional'
  if (score >= 7) return 'strong'
  if (score >= 5.5) return 'project'
  return 'exploratory'
}
