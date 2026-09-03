export interface BloggerPost {
  id: string;
  title: string;
  url: string;
  published: string;
  excerpt: string;
  imageUrl: string;
}

const FEED_URL = 'https://blog.signupvisa.com/feeds/posts/default?alt=json&max-results=12';
const BLOG_HOME = 'https://blog.signupvisa.com/';

function stripHtml(value = ''): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function imageFromHtml(html = ''): string {
  const match = html.match(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/i);
  return match?.[1] || '';
}

function xmlValue(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match?.[1]?.trim() || '';
}

function parseJsonFeed(data: any, limit: number): BloggerPost[] {
  const entries = Array.isArray(data?.feed?.entry) ? data.feed.entry : [];
  return entries.slice(0, limit).map((entry: any) => {
    const html = entry?.content?.$t || entry?.summary?.$t || '';
    const alternate = Array.isArray(entry?.link)
      ? entry.link.find((link: any) => link?.rel === 'alternate')
      : null;
    return {
      id: entry?.id?.$t || alternate?.href || entry?.title?.$t || '',
      title: stripHtml(entry?.title?.$t || 'Untitled article'),
      url: alternate?.href || BLOG_HOME,
      published: entry?.published?.$t || entry?.updated?.$t || '',
      excerpt: stripHtml(html).slice(0, 180),
      imageUrl: entry?.media$thumbnail?.url || imageFromHtml(html),
    };
  });
}

function parseXmlFeed(xml: string, limit: number): BloggerPost[] {
  const entries = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map((match) => match[0]).slice(0, limit);
  return entries.map((entry, index) => {
    const title = stripHtml(xmlValue(entry, 'title')) || 'Untitled article';
    const content = xmlValue(entry, 'content') || xmlValue(entry, 'summary');
    const alternateMatch = entry.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["'][^>]*\/?\s*>/i);
    const image = entry.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)?.[1] || imageFromHtml(content);
    return {
      id: xmlValue(entry, 'id') || `${BLOG_HOME}#${index}`,
      title,
      url: alternateMatch?.[1] || BLOG_HOME,
      published: xmlValue(entry, 'published') || xmlValue(entry, 'updated'),
      excerpt: stripHtml(content).slice(0, 180),
      imageUrl: image,
    };
  });
}

export async function getBloggerPosts(limit = 6): Promise<BloggerPost[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(FEED_URL, {
      headers: { Accept: 'application/json, application/atom+xml, application/xml;q=0.9, */*;q=0.8' },
      signal: controller.signal,
      cache: 'force-cache',
      cf: { cacheTtl: 300, cacheEverything: false },
    } as RequestInit & { cf: { cacheTtl: number; cacheEverything: boolean } });

    if (!response.ok) return [];
    const body = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('json') || body.trim().startsWith('{')) {
      try {
        const posts = parseJsonFeed(JSON.parse(body), limit);
        if (posts.length) return posts;
      } catch {
        // Continue to XML parsing if the feed is JSON-shaped but malformed.
      }
    }

    return parseXmlFeed(body, limit);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
