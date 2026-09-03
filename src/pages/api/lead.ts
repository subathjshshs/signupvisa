import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request }) => {
  const db = (env as any).DB;
  if (!db) return new Response(JSON.stringify({ error: 'DB unavailable' }), { status: 500 });

  const body = await request.json().catch(() => null);
  if (!body || !body.full_name || !body.phone) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  await db
    .prepare(
      `INSERT INTO leads (full_name, phone, email, interested_service, message)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(
      String(body.full_name).slice(0, 200),
      String(body.phone).slice(0, 50),
      body.email ? String(body.email).slice(0, 200) : null,
      body.interested_service ? String(body.interested_service).slice(0, 100) : null,
      body.message ? String(body.message).slice(0, 2000) : null
    )
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
