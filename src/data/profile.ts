import type { Profile, Stat } from '../types/index.ts'

/**
 * Core personal information. Source of truth for the hero, about, contact and structured data.
 * This file must stay free of `import.meta.env` so the build-time SEO plugin can import it.
 */
export const profile: Profile = {
  name: 'MD Emdadul Haque',
  headline: 'Senior Software Engineer | AI Engineer',
  roles: ['Senior Software Engineer', 'AI Engineer'],
  tagline:
    'Building production-grade AI, LLM, RAG, and backend systems with .NET, Python, and Azure.',
  email: 'mhaque023@gmail.com',
  phone: '01879888773',
  // Bangladesh country code (+880) with the leading trunk "0" dropped.
  phoneHref: '+8801879888773',
  cvPath: 'cv/MD-Emdadul-Haque-CV.pdf',
  summary: [
    'I am a software engineer with nearly six years of experience building enterprise software and backend platforms at Akij iBOS Limited. My foundation is C# and .NET: ASP.NET Core APIs, Entity Framework, microservices and database-driven systems for ERP, supply chain and accounting products.',
    'Over the last few years I have added the AI layer on top of that foundation: LLM applications with OpenAI and Azure OpenAI, retrieval-augmented generation, embeddings, semantic search over vector databases, tool calling and agent workflows, and RAG evaluation. Python and FastAPI are my tools for the AI services; .NET remains my tool for the enterprise systems they plug into.',
    'What I care about is connecting AI to real systems: ERP data, SQL databases, enterprise APIs, industrial hardware and production infrastructure on Azure, Docker and Kubernetes. I also work on industrial and IoT solutions, from Modbus/RS485 control to computer vision on the production line, and I lead a small engineering team.',
  ],
  focusAreas: [
    {
      title: '.NET backend engineering',
      description:
        'C#, ASP.NET Core, Web API, Entity Framework, microservices and performance tuning for enterprise ERP products.',
    },
    {
      title: 'LLM & RAG applications',
      description:
        'Document ingestion, chunking, embeddings, vector search, context construction and grounded generation.',
    },
    {
      title: 'AI agents & tool calling',
      description:
        'Function/tool calling, agent workflows and MCP-style integration of enterprise capabilities as tools.',
    },
    {
      title: 'Cloud & delivery',
      description:
        'Azure App Service, Azure Functions, Azure OpenAI, Docker, Kubernetes and Azure DevOps CI/CD pipelines.',
    },
    {
      title: 'Enterprise integration',
      description:
        'ERP, SQL Server and PostgreSQL data, Google Workspace APIs and event-driven integration for downstream AI.',
    },
    {
      title: 'Industrial & IoT',
      description:
        'PLC, Modbus RTU over RS485, MQTT, ESP32-class hardware and computer vision for production monitoring.',
    },
  ],
}

/**
 * Figures taken from the supplied profile's evidence bank. They are approximate and
 * self-reported. Do not add numbers here unless they can be substantiated.
 */
export const stats: Stat[] = [
  { value: '~6 yrs', label: 'Software engineering', note: 'Enterprise & AI systems' },
  { value: '~2,000', label: 'Users on supported systems', note: 'Approximate' },
  {
    value: '40–50s → <5s',
    label: 'Intelligent chatbot response time',
    note: 'Approximate before/after',
  },
  { value: '4 + ~15', label: 'Engineers led', note: '4 direct, ~15 coordinated indirectly' },
]
