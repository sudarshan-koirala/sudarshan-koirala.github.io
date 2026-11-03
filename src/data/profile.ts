// Single source of truth for career facts shown on the CV, Resume, About and home pages.
// Update facts here once; every page picks them up.

export const contact = {
  name: 'Sudarshan Koirala',
  headline: 'Senior GenAI Engineer',
  location: 'Espoo, Finland',
  email: 'basicsdatascience@gmail.com',
  website: 'https://sudarshan-koirala.github.io',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sudarshan-koirala/' },
    { label: 'GitHub', href: 'https://github.com/sudarshan-koirala' },
    { label: 'YouTube', href: 'https://www.youtube.com/@datasciencebasics' },
    { label: 'Medium', href: 'https://medium.com/@sudarshan-koirala' },
  ],
};

export const summary =
  'Senior GenAI Engineer at KONE with a path from physics and software engineering into data science, ' +
  'machine learning and generative AI. I design and ship enterprise LLM solutions, set up the MLOps and ' +
  'reliability practices that keep them running, and guide data science teams on taking models from ' +
  'prototype to production. Alongside my role, I teach applied AI to a large public audience through the ' +
  'Data Science Basics YouTube channel, Medium articles and open-source example code.';

// Public numbers, checked November 2026. Round down so they stay true as they grow.
export const stats = [
  { value: '24K+', label: 'YouTube subscribers' },
  { value: '1.9M+', label: 'YouTube views' },
  { value: '330+', label: 'Tutorial videos' },
  { value: '1.2K+', label: 'GitHub stars' },
];

export interface Role {
  title: string;
  company: string;
  companyUrl?: string;
  dates: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack?: string[];
}

export const experience: Role[] = [
  {
    title: 'Senior GenAI Engineer',
    company: 'KONE Oyj',
    companyUrl: 'https://www.kone.com',
    dates: 'Aug 2024 – Present',
    location: 'Espoo, Finland',
    summary:
      'KONE is a global leader in elevators and escalators. I lead hands-on development of generative AI ' +
      'solutions for enterprise use cases and help data science teams run them reliably.',
    highlights: [
      'Lead development of AI/ML-driven generative AI solutions, from LLM prototyping to production delivery.',
      'Prototype and deliver LLM applications, including retrieval-augmented generation (RAG), on AWS Bedrock, Azure OpenAI and Databricks.',
      'Design automated workflows for building, testing and deploying ML solutions with CI/CD and model tracking.',
      'Set up SRE practices for AI systems: monitoring, reliability and operational readiness for production workloads.',
      'Guide data science teams on MLOps best practices so models move from notebooks to maintained services.',
    ],
    stack: ['Python', 'AWS Bedrock', 'Azure OpenAI', 'Databricks', 'MLflow', 'LangChain', 'Docker', 'GitLab CI', 'Terraform'],
  },
  {
    title: 'Machine Learning Engineer · Data Scientist · Data Scientist Trainee',
    company: 'KONE Oyj',
    companyUrl: 'https://www.kone.com',
    dates: 'Jan 2022 – Jul 2024',
    location: 'Espoo, Finland',
    summary:
      'Joined KONE in January 2022 as a Data Scientist Trainee and progressed to Data Scientist and then ' +
      'Machine Learning Engineer, building ML solutions on industrial and enterprise data before moving into GenAI engineering.',
    highlights: [
      'Built machine learning models and analyses for industrial and enterprise data problems.',
      'Worked across Python, SQL, PySpark and cloud tooling to prepare data, train models and deliver results.',
    ],
    stack: ['Python', 'SQL', 'PySpark', 'Databricks', 'XGBoost', 'MLflow', 'AWS', 'Azure'],
  },
  {
    title: 'Thesis Worker to Machine Learning Trainee',
    company: 'Nokia Solutions and Networks Oyj',
    companyUrl: 'https://www.nokia.com',
    dates: '2020 – 2021',
    summary: 'Applied NLP and deep learning research inside Nokia, starting as a thesis worker and continuing as an ML trainee.',
    highlights: [
      'Built NLP-based event discovery from social media feeds using spaCy and pre-trained language models.',
      'Implemented end-to-end deep neural networks for tabular data.',
      'Served as scrum master for a team of 15 machine learning trainees.',
    ],
    stack: ['Python', 'spaCy', 'PyTorch', 'NLP', 'Scrum'],
  },
  {
    title: 'Founder & Content Creator',
    company: 'Data Science Basics',
    companyUrl: 'https://www.youtube.com/@datasciencebasics',
    dates: '2022 – Present',
    summary:
      'Independent education channel teaching AI, data science and developer tools through hands-on tutorials.',
    highlights: [
      'Grew the YouTube channel to 24K+ subscribers and 1.9M+ views across 330+ tutorial videos.',
      'Published learning series such as 30 Days of Databricks, LangChain and LlamaIndex RAG builds, local LLMs with Ollama, and AI coding tools (Claude Code, Kiro).',
      'Maintain open-source companion code on GitHub with 1.2K+ stars; the main tutorials repository alone has 330+ stars and 200+ forks.',
      'Write technical explainers on Medium and the weekly LinkedIn newsletter The Agent Brief about AI agents and LLM tooling.',
    ],
  },
];

export interface Degree {
  degree: string;
  school: string;
  dates: string;
  details?: string[];
}

export const education: Degree[] = [
  {
    degree: 'M.Sc. (Technology), Computer Science',
    school: 'Aalto University',
    dates: '2019 – 2021',
    details: [
      'GPA 4.27 / 5',
      'Major: Big Data and Large-Scale Computing',
      'Minor: Machine Learning, Data Science and Artificial Intelligence',
    ],
  },
  {
    degree: 'B.Eng., Software Engineering',
    school: 'Metropolia University of Applied Sciences',
    dates: '2018',
  },
  {
    degree: 'B.Sc., Physics',
    school: 'Tribhuvan University, Nepal',
    dates: '2010',
  },
];

export const skillGroups = [
  { title: 'Generative AI & LLMs', items: ['RAG', 'LLM application design', 'AI agents', 'Evaluation', 'LangChain', 'LlamaIndex', 'Azure OpenAI', 'Amazon Bedrock', 'Ollama'] },
  { title: 'Machine Learning', items: ['PyTorch', 'scikit-learn', 'XGBoost', 'NLP', 'spaCy', 'Deep learning', 'MLflow'] },
  { title: 'Data & Cloud', items: ['Databricks', 'Apache Spark', 'AWS', 'Azure', 'SQL'] },
  { title: 'MLOps & Engineering', items: ['CI/CD', 'GitLab CI', 'Docker', 'Terraform', 'Monitoring', 'SRE practices', 'Git', 'Linux'] },
  { title: 'Programming', items: ['Python', 'SQL', 'PySpark', 'JavaScript'] },
  { title: 'AI Developer Tools', items: ['Claude Code', 'GitHub Copilot', 'Kiro', 'Chainlit', 'Streamlit'] },
];

export const languages = [
  'English (fluent)',
  'Nepali (native)',
  'Hindi (satisfactory)',
  'Finnish (beginner)',
];

export interface Project {
  title: string;
  href: string;
  text: string;
  meta?: string;
}

// Open-source repositories with the most community traction (public GitHub stars/forks).
export const openSource: Project[] = [
  {
    title: 'youtube-stuffs',
    href: 'https://github.com/sudarshan-koirala/youtube-stuffs',
    text: 'Companion code for the Data Science Basics tutorials: LLMs, RAG, agents, Databricks and more.',
    meta: '330+ stars · 200+ forks',
  },
  {
    title: 'langchain-openai-chainlit',
    href: 'https://github.com/sudarshan-koirala/langchain-openai-chainlit',
    text: 'Chat with your documents (PDF, CSV, text) using OpenAI models, LangChain and Chainlit.',
    meta: '150+ stars · 130+ forks',
  },
  {
    title: 'rag-chat-with-pdf',
    href: 'https://github.com/sudarshan-koirala/rag-chat-with-pdf',
    text: 'Local RAG chat over PDFs with Ollama, LangChain and a Chainlit UI.',
    meta: '110+ stars',
  },
  {
    title: 'llamaparser-example',
    href: 'https://github.com/sudarshan-koirala/llamaparser-example',
    text: 'Example of parsing complex PDFs for RAG with LlamaParse.',
    meta: '90+ stars',
  },
  {
    title: '30-days-of-Databricks',
    href: 'https://github.com/sudarshan-koirala/30-days-of-Databricks',
    text: 'Step-by-step guide to learning Databricks in 30 days, for complete beginners.',
  },
];

export const products: Project[] = [
  {
    title: 'Nepali Bato',
    href: 'https://www.nepali-bato.com/',
    text: 'Web app that helps students learn the Nepali language step by step with simple lessons and practice.',
    meta: 'Live',
  },
  {
    title: 'Suomipolku',
    href: 'https://suomipolku.vercel.app/',
    text: 'Web app for learning Finnish step by step with everyday vocabulary and phrases.',
    meta: 'Live',
  },
];

export const selectedWriting = [
  {
    title: 'Prompt vs Context vs Harness Engineering: The Three Layers Around Every AI Model',
    href: 'https://medium.com/@sudarshan-koirala/prompt-vs-context-vs-harness-engineering-the-three-layers-around-every-ai-model-b31628b55845',
  },
  {
    title: 'Omnigent: The Meta-Harness for All Your AI Agents',
    href: 'https://medium.com/@sudarshan-koirala/omnigent-the-meta-harness-for-all-your-ai-agents-4c91d2d8dfae',
  },
  {
    title: 'Amazon Bedrock AgentCore Gateway: One Door for All Your MCP Servers',
    href: 'https://medium.com/@sudarshan-koirala/amazon-bedrock-agentcore-gateway-one-door-for-all-your-mcp-servers-c1de1d68a85f',
  },
  {
    title: 'ParseBench from LlamaIndex: How to Test if Your Document Parser Is Agent-Ready',
    href: 'https://medium.com/@sudarshan-koirala/parsebench-from-llamaindex-how-to-actually-test-if-your-document-parser-is-agent-ready-d164b0341850',
  },
  {
    title: 'Databricks Data + AI Summit 2026: Every Big Announcement, Explained Simply',
    href: 'https://medium.com/@sudarshan-koirala/databricks-data-ai-summit-2026-every-big-announcement-explained-simply-e5b613c3abc1',
  },
];
