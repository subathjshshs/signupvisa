import type { APIRoute } from 'astro';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const b = await request.json().catch(() => null);
  if (!b) return new Response(JSON.stringify({ error: 'Invalid body' }), { status: 400 });

  await db
    .prepare(
      `UPDATE destinations SET country_name=?, flag_emoji=?, summary=?, description=?, image_url=?, sort_order=?, is_active=?, is_featured=?, updated_at=datetime('now')
       WHERE id=?`
    )
    .bind(
      b.country_name, b.flag_emoji || '', b.summary || '', b.description || '', b.image_url || '',
      Number(b.sort_order) || 0, b.is_active ? 1 : 0, b.is_featured ? 1 : 0, params.id
    )
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  await db.prepare('DELETE FROM destinations WHERE id=?').bind(params.id).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
