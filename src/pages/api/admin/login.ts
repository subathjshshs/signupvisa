import type { APIRoute } from 'astro';
import { makeSessionCookieValue } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, locals }) => {
const env = locals.runtime?.env || {};  const body = await request.json().catch(() => null);

  if (!body?.password || !env?.ADMIN_PASSWORD || body.password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  const secret = env.SESSION_SECRET || 'dev-secret-change-me';
  const value = await makeSessionCookieValue(secret);
  cookies.set('admin_session', value, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
