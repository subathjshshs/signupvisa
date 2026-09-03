export async function getSettings(db: D1Database): Promise<Record<string, string>> {
  try {
    const { results } = await db.prepare('SELECT key, value FROM settings').all();
    const map: Record<string, string> = {};
    for (const row of results as any[]) map[row.key] = row.value ?? '';
    return map;
  } catch {
    return {};
  }
}

export async function getServices(db: D1Database, { featuredOnly = false } = {}) {
  const sql = featuredOnly
    ? 'SELECT * FROM services WHERE is_active = 1 AND is_featured = 1 ORDER BY sort_order ASC'
    : 'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC';
  const { results } = await db.prepare(sql).all();
  return results as any[];
}

export async function getServiceBySlug(db: D1Database, slug: string) {
  return db.prepare('SELECT * FROM services WHERE slug = ? AND is_active = 1').bind(slug).first();
}

export async function getDestinations(db: D1Database, { featuredOnly = false } = {}) {
  const sql = featuredOnly
    ? 'SELECT * FROM destinations WHERE is_active = 1 AND is_featured = 1 ORDER BY sort_order ASC'
    : 'SELECT * FROM destinations WHERE is_active = 1 ORDER BY sort_order ASC';
  const { results } = await db.prepare(sql).all();
  return results as any[];
}

export async function getDestinationBySlug(db: D1Database, slug: string) {
  return db.prepare('SELECT * FROM destinations WHERE slug = ? AND is_active = 1').bind(slug).first();
}

export async function getTestimonials(db: D1Database, limit = 6) {
  const { results } = await db
    .prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC LIMIT ?')
    .bind(limit)
    .all();
  return results as any[];
}

export async function getPublishedPosts(db: D1Database, limit = 20) {
  const { results } = await db
    .prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return results as any[];
}

export async function getPostBySlug(db: D1Database, slug: string) {
  return db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'").bind(slug).first();
}
