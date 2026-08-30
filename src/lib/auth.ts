// Minimal admin-session handling: no external auth service, just a signed cookie.
// The cookie value is `1` XOR-signed with SESSION_SECRET via HMAC — good enough for
// a single-admin panel. If you later want multiple admin accounts with individual
// logins, swap this for checks against the admin_users table (schema.sql already
// has the table ready for that).

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function makeSessionCookieValue(secret: string): Promise<string> {
  const payload = `admin:${Date.now()}`;
  const sig = await hmac(secret, payload);
  return `${payload}.${sig}`;
}

export async function isValidSession(cookieValue: string | undefined, secret: string): Promise<boolean> {
  if (!cookieValue) return false;
  const [payload, sig] = cookieValue.split('.');
  if (!payload || !sig) return false;
  const expected = await hmac(secret, payload);
  if (expected !== sig) return false;
  // Sessions last 7 days
  const ts = Number(payload.split(':')[1]);
  if (!ts || Date.now() - ts > 7 * 24 * 60 * 60 * 1000) return false;
  return true;
}
