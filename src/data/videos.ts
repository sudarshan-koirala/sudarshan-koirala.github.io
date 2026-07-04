import { fetchText, blocks, field } from './rss';

export interface VideoItem {
  id: string;
  title: string;
  date: Date;
}

// @datasciencebasics — public uploads feed (no API key needed).
const CHANNEL_ID = 'UCHGw1uT1XmqaRm-6W15-KlQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// ── Curation controls ──────────────────────────────────────────────────────
// Pin video IDs to the front of the grid, in this order (overrides recency).
export const videoPins: string[] = [];
// Hide video IDs you don't want on the site (Shorts, off-topic uploads, etc.).
export const videoHides: string[] = [];

// Shown only if the YouTube feed can't be reached during the build.
const fallbackVideos: Array<{ id: string; title: string }> = [
  { id: 'h_9ix0IJ96g', title: 'One Layer Over Claude Code, Codex and More: Omnigent Deep Dive from Databricks' },
  { id: 'o2Mo0j1WIOo', title: 'I Asked Claude to Build My Content Dashboard. It Updates Itself' },
  { id: 'Q-LvBm1Nnfc', title: 'Stop Using Slow PDF Parsers | LiteParse v2.0 (Rust) Tutorial' },
  { id: 'sHQx7JS0I2Q', title: 'MLflow for AI Agents: The Open Source Tool Every Builder Should Know' },
  { id: 'q7vwfBbx9Wk', title: 'Databricks AI Dev Kit + Claude Code: Vibe Coding' },
  { id: 'zPY0bjGrSc4', title: 'Claude Code For Complete Beginners | Here’s How To Get Started (2026)' },
  { id: 'lo7dwAscLdE', title: 'Databricks Genie Explained: Databricks One Renamed, UI Tour, Chat vs Ask & Scheduled Tasks (2026)' },
  { id: 'O5OoifJoGmM', title: 'Kiro Powers for Beginners - Step by Step Guide' },
  { id: 'CWVcA2K-P4c', title: 'Claude Design for Beginners 2026 - Complete Guide' },
  { id: 'a1EIi9BM3b0', title: 'KIRO For Dummies: The Complete Beginner’s Guide (Install - Build - Powers)' },
];

async function fetchYouTube(): Promise<VideoItem[]> {
  const xml = await fetchText(FEED_URL);
  if (!xml) return [];
  return blocks(xml, 'entry')
    .map((entry) => ({
      id: field(entry, 'yt:videoId'),
      title: field(entry, 'title'),
      date: new Date(field(entry, 'published')),
    }))
    .filter((v) => v.id && v.title && !Number.isNaN(v.date.getTime()));
}

// Latest uploads (auto), with pinned videos first and hidden ones removed.
export async function getVideos(limit = 12): Promise<VideoItem[]> {
  let items = await fetchYouTube();
  const usingFallback = items.length === 0;
  if (usingFallback) {
    // Synthetic descending dates just to keep a stable order for the fallback.
    items = fallbackVideos.map((v, i) => ({ ...v, date: new Date(Date.now() - i * 86_400_000) }));
  }

  const hidden = new Set(videoHides);
  items = items.filter((v) => !hidden.has(v.id));

  const byId = new Map(items.map((v) => [v.id, v]));
  const pinnedIds = new Set(videoPins);
  const pinned = videoPins.map((id) => byId.get(id)).filter((v): v is VideoItem => Boolean(v));
  const rest = items.filter((v) => !pinnedIds.has(v.id));
  if (!usingFallback) rest.sort((a, b) => b.date.getTime() - a.date.getTime());

  return [...pinned, ...rest].slice(0, limit);
}
