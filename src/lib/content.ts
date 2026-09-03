import { getSiteSettings } from '../data/site-config';
import { destinations, getDestination } from '../data/destinations';
import { services, getService } from '../data/services';
import { testimonials } from '../data/testimonials';

/**
 * Compatibility helpers for pages being migrated to the static content model.
 * Site content is no longer read from D1. D1 remains reserved for lead capture.
 */
export function getSettings(_db?: unknown): Record<string, string> {
  return getSiteSettings();
}

export function getServices(_db?: unknown) {
  return services;
}

export function getServiceBySlug(_db?: unknown, slug?: string) {
  return slug ? getService(slug) ?? null : null;
}

export function getDestinations(_db?: unknown) {
  return destinations;
}

export function getDestinationBySlug(_db?: unknown, slug?: string) {
  return slug ? getDestination(slug) ?? null : null;
}

export function getTestimonials(_db?: unknown, limit = 10) {
  return testimonials.slice(0, limit);
}

// Blog content is intentionally not stored in D1. Blogger integration will own this data.
export function getPublishedPosts(_db?: unknown) {
  return [];
}

export function getPostBySlug(_db?: unknown, _slug?: string) {
  return null;
}
