import type { APIRoute } from 'astro';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const b = await request.json().catch(() => null);
  if (!b?.status) return new Response(JSON.stringify({ error: 'status required' }), { status: 400 });
  await db.prepare('UPDATE leads SET status=? WHERE id=?').bind(b.status, params.id).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  await db.prepare('DELETE FROM leads WHERE id=?').bind(params.id).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
