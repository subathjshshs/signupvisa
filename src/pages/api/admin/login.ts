import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const body = await request.json().catch(() => null);

  const runtime = (locals as any).runtime || {};
  const env = runtime.env || {};

  return new Response(
    JSON.stringify({
      submittedPassword: body?.password,
      hasEnvObject: !!runtime.env,
      adminPasswordDefined: env.ADMIN_PASSWORD !== undefined,
      envKeys: Object.keys(env),
      runtimeKeys: Object.keys(runtime),
    }),
    { status: 200 }
  );
};
