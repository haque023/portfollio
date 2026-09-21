import type { EducationEntry, ExperienceEntry } from '../types/index.ts'

/**
 * Work history, newest first. To add a role, append a new object to this array.
 * Only record employers, dates, responsibilities and metrics that are factually correct.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'akij-ibos',
    company: 'Akij iBOS Limited',
    role: 'Senior AI & Software Engineer (L-1)',
    start: 'March 2021',
    end: null,
    summary:
      'Building and running enterprise software for the iBOS ERP ecosystem, and adding LLM, RAG and automation capabilities on top of it.',
    highlights: [
      'Design and build backend services and REST APIs in C#, ASP.NET Core / MVC, Web API and Entity Framework for ERP, supply chain (RTM), garments (RMG) and accounting products.',
      'Support production systems used by approximately 2,000 people; work covers system analysis, system design, architecture, design patterns and database-driven application design.',
      'Reduced the response time of an intelligent chatbot workflow from roughly 40–50 seconds to under 5 seconds.',
      'Integrate LLMs (OpenAI, Azure OpenAI, open-weight models) into enterprise workflows: RAG pipelines, embeddings, vector databases, semantic search, tool calling and AI agents.',
      'Build Python and FastAPI services alongside .NET systems, with asynchronous processing and background services for long-running work.',
      'Deploy on Azure App Service and Azure Functions, using Docker, Kubernetes and Azure DevOps CI/CD pipelines.',
      'Work on Industrial IoT and computer-vision solutions, including PLC, Modbus RTU / RS485 and MQTT integration with enterprise software.',
      'Lead four engineers directly and coordinate around fifteen more indirectly.',
    ],
    technologies: [
      'C#',
      '.NET Core',
      'ASP.NET Core',
      'Entity Framework',
      'Python',
      'FastAPI',
      'Azure OpenAI',
      'RAG',
      'Embeddings',
      'Vector databases',
      'SQL Server',
      'PostgreSQL',
      'Azure',
      'Docker',
      'Kubernetes',
      'Azure DevOps',
      'Industrial IoT',
    ],
    metrics: [
      { value: '~2,000', label: 'users on supported systems' },
      { value: '<5s', label: 'chatbot response (from ~40–50s)' },
      { value: '4 + ~15', label: 'engineers led (direct + indirect)' },
    ],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'uap-bsc-cse',
    institution: 'University of Asia Pacific (UAP)',
    degree: 'B.Sc. in Computer Science & Engineering',
    result: 'CGPA 3.85 / 4.00',
    notes: ['SSC: 4.5+ / 5.0', 'HSC: 4.5+ / 5.0'],
  },
]
