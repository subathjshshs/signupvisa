export interface BloggerPost {
  id: string;
  title: string;
  url: string;
  published: string;
  excerpt: string;
  imageUrl: string;
}

const FEED_URL = 'https://blog.signupvisa.com/feeds/posts/default?alt=json&max-results=12';

function stripHtml(value = ''): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function imageFromHtml(html = ''): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || '';
}

export async function getBloggerPosts(limit = 6): Promise<BloggerPost[]> {
  try {
    const response = await fetch(FEED_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return [];

    const data = await response.json();
    const entries = Array.isArray(data?.feed?.entry) ? data.feed.entry : [];

    return entries.slice(0, limit).map((entry: any) => {
      const html = entry?.content?.$t || entry?.summary?.$t || '';
      const alternate = Array.isArray(entry?.link)
        ? entry.link.find((link: any) => link?.rel === 'alternate')
        : null;

      return {
        id: entry?.id?.$t || alternate?.href || entry?.title?.$t || '',
        title: stripHtml(entry?.title?.$t || 'Untitled article'),
        url: alternate?.href || 'https://blog.signupvisa.com/',
        published: entry?.published?.$t || entry?.updated?.$t || '',
        excerpt: stripHtml(html).slice(0, 180),
        imageUrl: entry?.media$thumbnail?.url || imageFromHtml(html),
      };
    });
  } catch {
    return [];
  }
}
