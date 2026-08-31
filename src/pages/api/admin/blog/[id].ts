import type { APIRoute } from 'astro';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const b = await request.json().catch(() => null);
  if (!b) return new Response(JSON.stringify({ error: 'Invalid body' }), { status: 400 });

  const publishedAt = b.status === 'published' ? new Date().toISOString() : null;
  await db
    .prepare(
      `UPDATE blog_posts SET title=?, excerpt=?, cover_image_url=?, body_html=?, status=?, published_at=COALESCE(published_at, ?), updated_at=datetime('now')
       WHERE id=?`
    )
    .bind(b.title, b.excerpt || '', b.cover_image_url || '', b.body_html || '', b.status || 'draft', publishedAt, params.id)
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  await db.prepare('DELETE FROM blog_posts WHERE id=?').bind(params.id).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
