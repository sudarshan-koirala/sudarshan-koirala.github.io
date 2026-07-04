import { getCollection } from 'astro:content';
import type { PostCardData } from '../components/PostCard.astro';
import { fetchText, blocks, field, fieldAll } from './rss';

// Category assigned to each local blog post (by file id)
const localCategory: Record<string, string> = {
  'kiro-for-beginners': 'AI Tools',
  'mastering-agent-skills-claude': 'AI Tools',
  'reasoning-rag-private': 'LLMs & RAG',
  'databricks-genies-explained': 'Databricks',
};

const MEDIUM_FEED = 'https://medium.com/feed/@sudarshan-koirala';

// ── Curation controls (match by URL slug substring) ─────────────────────────
// Pin articles to the front, in this order (overrides recency).
export const articlePins: string[] = [];
// Hide articles you don't want surfaced on the site.
export const articleHides: string[] = [];

// Local covers for Medium posts whose RSS item does not expose an image.
const articleImageOverrides: Record<string, string> = {
  'loop-engineering-the-new-hype': '/images/loop-engineering/cover.svg',
};

// Shown only if the Medium feed can't be reached during the build.
const fallbackMediumPosts: PostCardData[] = [
  { title: 'Omnigent: The Meta-Harness for All Your AI Agents', category: 'AI Tools', external: true, date: new Date('2026-07-03'), url: 'https://medium.com/@sudarshan-koirala/omnigent-the-meta-harness-for-all-your-ai-agents-4c91d2d8dfae', image: 'https://miro.medium.com/v2/resize:fit:1024/1*ESq5ArHb3v99dlaCts2fkA.png' },
  { title: 'Prompt vs Context vs Harness Engineering: The Three Layers Around Every AI Model', category: 'Engineering', external: true, date: new Date('2026-07-02'), url: 'https://medium.com/@sudarshan-koirala/prompt-vs-context-vs-harness-engineering-the-three-layers-around-every-ai-model-b31628b55845', image: 'https://miro.medium.com/v2/resize:fit:1024/1*Om6cZm4LFzcZ8UTqMvZogg.png' },
  { title: 'Claude Tag: How Anthropic Wants You to Put Claude to Work Right Inside Slack', category: 'AI Tools', external: true, date: new Date('2026-06-26'), url: 'https://medium.com/@sudarshan-koirala/claude-tag-how-anthropic-wants-you-to-put-claude-to-work-right-inside-slack-05a90a82dc29', image: 'https://miro.medium.com/v2/resize:fit:1024/1*NHClPFMc5-KPEx7rBTLmmQ.png' },
  { title: 'Loop Engineering: The New Hype', category: 'Engineering', external: true, date: new Date('2026-06-24'), url: 'https://medium.com/@sudarshan-koirala/loop-engineering-the-new-hype-841beb68814d', image: '/images/loop-engineering/cover.svg' },
  { title: 'Amazon Bedrock AgentCore Gateway: One Door for All Your MCP Servers', category: 'Engineering', external: true, date: new Date('2026-06-21'), url: 'https://medium.com/@sudarshan-koirala/amazon-bedrock-agentcore-gateway-one-door-for-all-your-mcp-servers-c1de1d68a85f', image: 'https://miro.medium.com/v2/resize:fit:1024/1*_g65z1JmZZcPM156YyAnvg.png' },
  { title: 'ParseBench from LlamaIndex: How to Actually Test if Your Document Parser Is Agent-Ready', category: 'LLMs & RAG', external: true, date: new Date('2026-06-20'), url: 'https://medium.com/@sudarshan-koirala/parsebench-from-llamaindex-how-to-actually-test-if-your-document-parser-is-agent-ready-d164b0341850', image: 'https://miro.medium.com/v2/resize:fit:1024/1*qeEdiB9pAiT88Dj2jb6hyA.png' },
  { title: 'Forward Deployed Engineer: The Hottest Job in AI, Explained', category: 'Engineering', external: true, date: new Date('2026-06-19'), url: 'https://medium.com/@sudarshan-koirala/forward-deployed-engineer-the-hottest-job-in-ai-explained-0650a03320b3', image: 'https://miro.medium.com/v2/resize:fit:1024/1*AVuwhu9DCyyCBn67mQYQWA.png' },
  { title: 'What Does “OpenAI API Compatible” Actually Mean?', category: 'Engineering', external: true, date: new Date('2026-06-17'), url: 'https://medium.com/@sudarshan-koirala/what-does-openai-api-compatible-actually-mean-aedfdf35e601', image: 'https://miro.medium.com/v2/resize:fit:1024/1*Mi54_Z8jfn3Cg8RRNCyCkA.png' },
  { title: 'Databricks Data + AI Summit 2026: Every Big Announcement, Explained Simply', category: 'Databricks', external: true, date: new Date('2026-06-16'), url: 'https://medium.com/@sudarshan-koirala/databricks-data-ai-summit-2026-every-big-announcement-explained-simply-e5b613c3abc1', image: 'https://miro.medium.com/v2/resize:fit:1024/1*mbSSGzr2tFFLP9_ucdRUvA.png' },
  { title: 'OpenAPI & Swagger for Complete Beginners', category: 'Engineering', external: true, date: new Date('2026-06-14'), url: 'https://medium.com/@sudarshan-koirala/openapi-swagger-for-complete-beginners-4b9d38157369' },
];

// Best-effort mapping from title + Medium tags to the site's card categories.
function inferCategory(title: string, tags: string[]): string {
  const hay = `${title} ${tags.join(' ')}`.toLowerCase();
  if (hay.includes('databricks')) return 'Databricks';
  if (/\b(rag|retrieval|llm|large-language|embedding|vector)\b/.test(hay)) return 'LLMs & RAG';
  if (/\b(claude|agent|mcp|cursor|kiro|copilot|skill|prompt|context)\b/.test(hay)) return 'AI Tools';
  return 'Engineering';
}

// First real content image (Medium CDN), skipping the tracking pixel.
function coverImage(contentEncoded: string): string | undefined {
  const srcs = [...contentEncoded.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  return srcs.find((src) => /(?:cdn-images-\d+|miro)\.medium\.com/.test(src) && !src.includes('/_/stat'));
}

function articleImageOverride(url: string): string | undefined {
  return Object.entries(articleImageOverrides).find(([slug]) => url.includes(slug))?.[1];
}

async function fetchMedium(): Promise<PostCardData[]> {
  const xml = await fetchText(MEDIUM_FEED);
  if (!xml) return [];
  return blocks(xml, 'item')
    .map((item) => {
      const title = field(item, 'title');
      const url = field(item, 'link').split('?')[0];
      const date = new Date(field(item, 'pubDate'));
      const tags = fieldAll(item, 'category');
      const content = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1] ?? '';
      return {
        title,
        url,
        external: true,
        date,
        category: inferCategory(title, tags),
        image: coverImage(content) ?? articleImageOverride(url),
      } satisfies PostCardData;
    })
    .filter((p) => p.title && p.url && !Number.isNaN(p.date.getTime()));
}

// Medium articles (auto), with pinned first and hidden ones removed.
export async function getMediumPosts(): Promise<PostCardData[]> {
  let items = await fetchMedium();
  if (items.length === 0) items = fallbackMediumPosts;

  items = items.filter((p) => !articleHides.some((slug) => p.url.includes(slug)));

  const pinned = articlePins
    .map((slug) => items.find((p) => p.url.includes(slug)))
    .filter((p): p is PostCardData => Boolean(p));
  const rest = items.filter((p) => !articlePins.some((slug) => p.url.includes(slug)));
  return [...pinned, ...rest];
}

// Local blog posts (Markdown collection) mapped into the shared card shape.
export async function getLocalPosts(): Promise<PostCardData[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return entries.map((post) => ({
    title: post.data.title,
    url: `/blog/${post.id}`,
    external: false,
    date: post.data.date,
    category: localCategory[post.id] ?? 'Engineering',
    description: post.data.description,
    image: post.data.image,
  }));
}

// All posts (local + Medium), newest first.
export async function getAllPosts(): Promise<PostCardData[]> {
  const [local, medium] = await Promise.all([getLocalPosts(), getMediumPosts()]);
  return [...local, ...medium].sort((a, b) => b.date.getTime() - a.date.getTime());
}
