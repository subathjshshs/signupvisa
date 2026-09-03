import { SERVICE_IMAGES } from '../lib/images';

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  icon: string;
}

export const services: Service[] = [
  {
    slug: 'student-visa',
    name: 'Student Visa',
    tagline: 'Plan your study journey with structured guidance.',
    description:
      'Guidance across course and institution selection, application preparation, documentation and student visa processing.',
    imageUrl: SERVICE_IMAGES['student-visa'],
    icon: '🎓',
  },
  {
    slug: 'work-visa',
    name: 'Work Permit',
    tagline: 'Explore international work opportunities.',
    description:
      'Guidance for applicants exploring work permit pathways, eligibility requirements and application documentation.',
    imageUrl: SERVICE_IMAGES['work-visa'],
    icon: '💼',
  },
  {
    slug: 'skilled-migration',
    name: 'Skilled Migration',
    tagline: 'Build a pathway around your skills and experience.',
    description:
      'Structured guidance for skilled migration pathways, from initial profile assessment through documentation and application preparation.',
    imageUrl: SERVICE_IMAGES['skilled-migration'],
    icon: '🌍',
  },
  {
    slug: 'visit-visa',
    name: 'Visit Visa',
    tagline: 'Prepare your short-stay application with clarity.',
    description:
      'Guidance for visit visa applications, including document preparation and application readiness for eligible destinations.',
    imageUrl: SERVICE_IMAGES['visit-visa'],
    icon: '✈️',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
