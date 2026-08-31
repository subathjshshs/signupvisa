import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const { results } = await db.prepare('SELECT key, value FROM settings').all();
  const map: Record<string, string> = {};
  for (const row of results as any[]) map[row.key] = row.value ?? '';
  return new Response(JSON.stringify(map), { status: 200 });
};

export const PUT: APIRoute = async ({ request, locals }) => {
  const db = (locals.runtime?.env?.DB ?? locals.runtime?.DB);
  const b = await request.json().catch(() => null);
  if (!b) return new Response(JSON.stringify({ error: 'Invalid body' }), { status: 400 });

  const stmts = Object.entries(b).map(([key, value]) =>
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(key, String(value))
  );
  await db.batch(stmts);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
