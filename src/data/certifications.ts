import type { Certification, LearningItem } from '../types'

/**
 * Verified certifications only. Do not add entries without a real credential;
 * the UI shows nothing for certifications when the array is empty.
 *
 * Add information here, for example:
 * { id: 'az-xxx', title: 'Certification name', issuer: 'Issuer', date: '2026', credentialUrl: 'https://...' }
 */
export const certifications: Certification[] = [
  {
    id: 'udemy-ai-engineer-core-track',
    title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
    issuer: 'Udemy',
    date: '5 Aug 2026',
    credentialUrl: 'https://ude.my/UC-a0987fc1-2284-4bf0-95b4-57b638b51da',
    details: ['Instructors: Ligency, Ed Donner', '33.5 total hours'],
  },
]

/** Ongoing learning and exploration. Keep each item honest about its depth. */
export const learning: LearningItem[] = [
  {
    id: 'ai-evaluation',
    title: 'AI & RAG evaluation',
    description:
      'Studying evaluation for LLM and RAG systems: relevance, groundedness, fluency, retrieval quality and context quality, including Azure AI evaluation concepts.',
    tags: ['RAG evaluation', 'Azure AI', 'Groundedness'],
  },
  {
    id: 'azure-ai-foundry',
    title: 'Azure AI Foundry & Foundry Local',
    description:
      'Working through model deployment on Azure AI Foundry, Foundry Local, and the regional availability and quota constraints that come with them.',
    tags: ['Azure AI Foundry', 'Model deployment'],
  },
  {
    id: 'agent-frameworks',
    title: 'Agent frameworks & protocols',
    description:
      'Project-level exploration of LangGraph, LlamaIndex and A2A alongside MCP, mainly through the AgentMesh reference architecture.',
    tags: ['LangGraph', 'LlamaIndex', 'A2A', 'MCP'],
  },
  {
    id: 'model-training',
    title: 'Fine-tuning & small models',
    description:
      'Experiments with QLoRA, Hugging Face tooling and open-weight or small language models. Research and experimentation, not production training.',
    tags: ['QLoRA', 'Hugging Face', 'Open-weight LLMs'],
  },
  {
    id: 'local-llm',
    title: 'Local LLM serving',
    description:
      'Running open-weight models with Ollama and vLLM on GPU hardware to evaluate enterprise AI that keeps data off external APIs.',
    tags: ['Ollama', 'vLLM', 'Qwen', 'DeepSeek'],
  },
]
