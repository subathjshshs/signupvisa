import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { makeSessionCookieValue } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const cfEnv = env as any;
  const body = await request.json().catch(() => null);

  if (!body?.password || !cfEnv.ADMIN_PASSWORD || body.password !== cfEnv.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  const secret = cfEnv.SESSION_SECRET || 'dev-secret-change-me';
  const value = await makeSessionCookieValue(secret);
  const maxAge = 60 * 60 * 24 * 7; // 7 days

  // Standard Astro cookie set
  cookies.set('admin_session', value, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge,
  });

  // Explicit HTTP header to guarantee cookie delivery in Cloudflare/Astro 5
  const cookieHeader = `admin_session=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieHeader,
    },
  });
};
