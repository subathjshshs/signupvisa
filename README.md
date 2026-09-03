# SIGNUP Visa & Migration — Website

Astro website for SIGNUP Visa & Migration, built for Cloudflare with static site content and D1 reserved for contact/lead submissions.

## 1. Install

```bash
npm install
```

## 2. Local development

```bash
npm run dev
```

For testing the Cloudflare runtime and D1 lead endpoint locally:

```bash
npm run build && npx wrangler pages dev ./dist
```

## 3. Deploy

Connect this GitHub repository to the Cloudflare project and use:

- Build command: `npm run build`
- Output directory: `dist`

A push to the configured deployment branch can trigger the deployment automatically.

## 4. Content architecture

Public site content is maintained in `src/data/`:

- `site-config.ts` — company identity, contact emails and social links
- `services.ts` — service catalogue
- `destinations.ts` — destination catalogue
- `testimonials.ts` — verified testimonials only

The public site does not depend on D1 for ordinary content rendering.

## 5. Lead storage

The D1 `DB` binding is retained for `src/pages/api/lead.ts`, which stores contact/consultation enquiries in the `leads` table.

Do not remove or reset the existing production database as part of normal site development.

## 6. Blog

The website blog is being integrated with the separate Blogger publication at `https://blog.signupvisa.com/`. New Blogger articles will be surfaced automatically on the website; the Blogger publication remains independent.
