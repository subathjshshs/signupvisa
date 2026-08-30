import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const { results } = await db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  return new Response(JSON.stringify(results), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const b = await request.json().catch(() => null);
  if (!b?.slug || !b?.title) return new Response(JSON.stringify({ error: 'slug and title required' }), { status: 400 });

  const publishedAt = b.status === 'published' ? new Date().toISOString() : null;
  await db
    .prepare(
      `INSERT INTO blog_posts (slug, title, excerpt, cover_image_url, body_html, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(b.slug, b.title, b.excerpt || '', b.cover_image_url || '', b.body_html || '', b.status || 'draft', publishedAt)
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
