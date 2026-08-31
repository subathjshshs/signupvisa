import type { APIRoute } from 'astro';

// Requires a public R2 bucket URL or a custom domain connected to the bucket.
// Set PUBLIC_MEDIA_BASE_URL as a Pages environment variable, e.g.
// https://media.yourdomain.com or the r2.dev URL you enable for this bucket.

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? locals.runtime;
  const bucket = env.MEDIA;
  if (!bucket) return new Response(JSON.stringify({ error: 'Storage not configured' }), { status: 500 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file') as File | null;
  if (!file) return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    return new Response(JSON.stringify({ error: 'Unsupported file type' }), { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'File too large (max 8MB)' }), { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const base = (env as any).PUBLIC_MEDIA_BASE_URL || '';
  const url = base ? `${base.replace(/\/$/, '')}/${key}` : `/media/${key}`;

  return new Response(JSON.stringify({ ok: true, url, key }), { status: 200 });
};
