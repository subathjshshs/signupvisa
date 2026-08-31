import type { APIRoute } from 'astro';

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json().catch(() => ({}));

    // Safe retrieval of Cloudflare env in Astro 5
    const locals = (context.locals as any) || {};
    const runtime = locals.runtime || {};
    const env = runtime.env || {};

    return new Response(
      JSON.stringify({
        status: 'debug_ok',
        receivedPassword: body?.password || null,
        adminPasswordExists: !!env.ADMIN_PASSWORD,
        envKeys: Object.keys(env),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: 'Runtime Error',
        message: err?.message || String(err),
      }),
      {
        status: 200, // Return 200 so DevTools can display the error details
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
