import { defineMiddleware } from 'astro:middleware';
import { isValidSession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin');

  if (isAdminPage || isAdminApi) {
    const secret = context.locals.runtime?.SESSION_SECRET || 'dev-secret-change-me';
    const cookie = context.cookies.get('admin_session')?.value;
    const valid = await isValidSession(cookie, secret);
    if (!valid) {
      if (isAdminApi) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      return context.redirect('/admin/login');
    }
  }
  return next();
});
