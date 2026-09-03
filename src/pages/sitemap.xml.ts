import type { APIRoute } from 'astro';
import { destinations } from '../data/destinations';
import { services } from '../data/services';

const staticRoutes = ['/', '/services', '/destinations', '/about', '/contact', '/blog'];

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() || 'https://signupvisa.com/').replace(/\/$/, '');
  const paths = [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...destinations.map((destination) => `/destinations/${destination.slug}`),
  ];
  const urls = [...new Set(paths)];
  const body = urls.map((path) => `  <url><loc>${escapeXml(`${base}${path}`)}</loc></url>`).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    },
  );
};
