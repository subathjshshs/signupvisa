-- Visa & Migration — D1 schema
-- Run once with: npx wrangler d1 execute signupvisa --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS destinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  country_name TEXT NOT NULL,
  flag_emoji TEXT,
  summary TEXT,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_name TEXT NOT NULL,
  photo_url TEXT,
  destination TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  body_html TEXT,
  status TEXT DEFAULT 'draft', -- draft | published
  published_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  event_date TEXT,
  image_url TEXT,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS offices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  map_url TEXT,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  interested_service TEXT,
  interested_destination TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- new | contacted | converted | closed
  created_at TEXT DEFAULT (datetime('now'))
);

-- Seed sensible defaults so the site isn't empty on first deploy
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('company_name', 'Visa & Migration'),
  ('tagline', 'Your trusted pathway to studying and working abroad'),
  ('phone', ''),
  ('whatsapp', ''),
  ('email', ''),
  ('logo_url', ''),
  ('hero_image_url', ''),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('address', '');

INSERT OR IGNORE INTO services (slug, name, tagline, description, sort_order, is_active, is_featured) VALUES
  ('student-visa', 'Student Visa Processing', 'From application to acceptance letter to visa approval', 'End-to-end support for students applying to study abroad — university selection, application, documentation, and visa lodgement.', 1, 1, 1);
