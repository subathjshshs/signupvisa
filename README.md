 # Visa & Migration — Website

Astro site + admin panel, built for Cloudflare Pages, D1 (database), and R2 (image storage).

## 1. One-time setup after cloning

```bash
npm install
```

## 2. Point this project at YOUR Cloudflare resources

Open `wrangler.toml` and:
1. Replace `database_id` with your real D1 database ID. Find it with:
   ```bash
   npx wrangler d1 list
   ```
2. Replace `bucket_name` under `[[r2_buckets]]` with your exact R2 bucket name.

## 3. Load the database schema (one-time, or after schema.sql changes)

```bash
npx wrangler d1 execute signupvisa --remote --file=./schema.sql
```

## 4. Local development

```bash
npm run dev
```
(Note: D1/R2 bindings only work locally via `wrangler pages dev`, not plain `astro dev`. To test bindings locally: `npm run build && npx wrangler pages dev ./dist`)

## 5. Deploy

Easiest path: connect this GitHub repo to a Cloudflare Pages project (Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git). Build command: `npm run build`. Output directory: `dist`.

Every `git push` after that auto-deploys.

## 6. Required Pages secrets/variables (Settings -> Environment Variables)

- `ADMIN_PASSWORD` - the password you'll use to log into `/admin`
- `SESSION_SECRET` - any long random string, used to sign admin login sessions
- `PUBLIC_MEDIA_BASE_URL` - (optional) a public URL for your R2 bucket (r2.dev URL or custom domain). If left unset, images are served through `/media/...` on this site instead - works fine, just slightly slower.

## 7. Bindings (Settings -> Functions -> Bindings) - needed in addition to wrangler.toml for the dashboard-deployed project

- D1 database binding: variable name `DB` -> your `signupvisa` database
- R2 bucket binding: variable name `MEDIA` -> your bucket

## Admin panel

Visit `/admin/login` and log in with `ADMIN_PASSWORD`. From there you can manage services, destinations, testimonials, blog posts, leads, and site-wide settings (logo, hero image, contact info) - no code required.
