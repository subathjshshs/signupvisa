import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const { results } = await db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  return new Response(JSON.stringify(results), { status: 200 });
};
