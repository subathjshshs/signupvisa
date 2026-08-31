import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const { results } = await db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC').all();
  return new Response(JSON.stringify(results), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const b = await request.json().catch(() => null);
  if (!b?.student_name || !b?.quote) return new Response(JSON.stringify({ error: 'student_name and quote required' }), { status: 400 });

  await db
    .prepare(
      `INSERT INTO testimonials (student_name, photo_url, destination, quote, rating, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(b.student_name, b.photo_url || '', b.destination || '', b.quote, Number(b.rating) || 5, Number(b.sort_order) || 0, 1)
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
