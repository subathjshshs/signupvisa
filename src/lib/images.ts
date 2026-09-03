// Static asset paths for verified photography and brand assets stored under /public.
// These assets are intentionally independent of the content/database layer.

export const LOGO_HEADER = '/images/logo/logo-header.svg';
export const LOGO_FOOTER = '/images/logo/logo-footer.svg';
export const HERO_IMAGE = '/images/hero/homebanner.webp';
export const TRUST_BADGE = '/images/trust/trustbadge.webp';
export const OFFICE_MOULVIBAZAR = '/images/office/moulvibazar.webp';

export const DESTINATION_IMAGES: Record<string, string> = {
  australia: '/images/destinations/aus/aus.webp',
  aus: '/images/destinations/aus/aus.webp',
  canada: '/images/destinations/canada/canada.webp',
  europe: '/images/destinations/europe/europe.webp',
  uk: '/images/destinations/uk/uk.webp',
  'united-kingdom': '/images/destinations/uk/uk.webp',
  britain: '/images/destinations/uk/uk.webp',
  usa: '/images/destinations/usa/usa.webp',
  america: '/images/destinations/usa/usa.webp',
  'united-states': '/images/destinations/usa/usa.webp',
};

export const SERVICE_IMAGES: Record<string, string> = {
  'student-visa': '/images/services/student/student.webp',
  student: '/images/services/student/student.webp',
  'work-visa': '/images/services/work/work.webp',
  work: '/images/services/work/work.webp',
  'skilled-migration': '/images/services/skilled/skilled.webp',
  skilled: '/images/services/skilled/skilled.webp',
  'visit-visa': '/images/services/visit/visit.webp',
  visit: '/images/services/visit/visit.webp',
};

export const TEAM_IMAGES: Record<string, string> = {
  tanvir: '/images/team/denmakmdtanvir.webp',
  fariha: '/images/team/studentfariha.webp',
  rakib: '/images/team/studentrakib.webp',
};

/** Find a matching static image for a slug/name against a given map, trying exact then substring match. */
export function resolveImage(map: Record<string, string>, key: string | undefined | null): string | null {
  if (!key) return null;
  const k = key.toLowerCase().trim();
  if (map[k]) return map[k];
  for (const mapKey of Object.keys(map)) {
    if (k.includes(mapKey) || mapKey.includes(k)) return map[mapKey];
  }
  return null;
}
