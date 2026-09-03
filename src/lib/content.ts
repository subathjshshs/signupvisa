export async function getSettings(db: any) {
  try {
    if (!db) return {};
    const { results } = await db.prepare('SELECT key, value FROM settings').all();
    const map: Record<string, string> = {};
    for (const row of results as any[]) map[row.key] = row.value;
    return map;
  } catch {
    return {};
  }
}

export async function getServices(db?: any) {
  try {
    if (!db) return [];
    const { results } = await db.prepare('SELECT * FROM services ORDER BY sort_order ASC').all();
    return results || [];
  } catch {
    return [];
  }
}

export async function getDestinations(db?: any) {
  try {
    if (!db) return [];
    const { results } = await db.prepare('SELECT * FROM destinations ORDER BY name ASC').all();
    return results || [];
  } catch {
    return [];
  }
}

export async function getTestimonials(db?: any, limit?: number) {
  try {
    if (!db) return [];
    const { results } = await db.prepare('SELECT * FROM testimonials LIMIT ?').bind(limit || 10).all();
    return results || [];
  } catch {
    return [];
  }
}

export async function getPublishedPosts(db?: any) {
  try {
    if (!db) return [];
    const { results } = await db.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC").all();
    return results || [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(db?: any, slug?: string) {
  try {
    if (!db || !slug) return null;
    const post = await db.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'").bind(slug).first();
    return post || null;
  } catch {
    return null;
  }
}