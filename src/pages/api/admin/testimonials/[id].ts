import type { APIRoute } from 'astro';

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime?.DB;
  await db.prepare('DELETE FROM testimonials WHERE id=?').bind(params.id).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
