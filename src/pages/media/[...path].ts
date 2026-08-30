import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  const bucket = locals.runtime?.env?.MEDIA;
  const path = params.path;
  if (!bucket || !path) return new Response('Not found', { status: 404 });

  const object = await bucket.get(path);
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
};
