import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const { results } = await db.prepare('SELECT * FROM services ORDER BY sort_order ASC').all();
  return new Response(JSON.stringify(results), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const b = await request.json().catch(() => null);
  if (!b?.slug || !b?.name) return new Response(JSON.stringify({ error: 'slug and name required' }), { status: 400 });

  await db
    .prepare(
      `INSERT INTO services (slug, name, tagline, description, image_url, sort_order, is_active, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      b.slug, b.name, b.tagline || '', b.description || '', b.image_url || '',
      Number(b.sort_order) || 0, b.is_active ? 1 : 1, b.is_featured ? 1 : 0
    )
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
