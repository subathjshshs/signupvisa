import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const { results } = await db.prepare('SELECT * FROM destinations ORDER BY sort_order ASC').all();
  return new Response(JSON.stringify(results), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const b = await request.json().catch(() => null);
  if (!b?.slug || !b?.country_name) return new Response(JSON.stringify({ error: 'slug and country_name required' }), { status: 400 });

  await db
    .prepare(
      `INSERT INTO destinations (slug, country_name, flag_emoji, summary, description, image_url, sort_order, is_active, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      b.slug, b.country_name, b.flag_emoji || '', b.summary || '', b.description || '', b.image_url || '',
      Number(b.sort_order) || 0, 1, b.is_featured ? 1 : 0
    )
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
