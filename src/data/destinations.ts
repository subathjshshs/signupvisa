import { DESTINATION_IMAGES } from '../lib/images';

export interface Destination {
  slug: string;
  name: string;
  flag: string;
  summary: string;
  description: string;
  imageUrl: string;
}

export const destinations: Destination[] = [
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    summary: 'Study, work and migration pathways in Australia.',
    description:
      'Explore study, work and migration options in Australia with guidance tailored to your profile, goals and chosen pathway.',
    imageUrl: DESTINATION_IMAGES.australia,
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    summary: 'International study and visa pathways across the UK.',
    description:
      'Explore education and visa pathways in the United Kingdom with clear guidance on applications, documentation and next steps.',
    imageUrl: DESTINATION_IMAGES.uk,
  },
  {
    slug: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    summary: 'Explore opportunities to study and visit the USA.',
    description:
      'Explore eligible study and visit pathways for the United States with structured application and documentation guidance.',
    imageUrl: DESTINATION_IMAGES.usa,
  },
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    summary: 'Study, work and long-term pathway options in Canada.',
    description:
      'Explore Canadian study, work and migration pathways with practical guidance from profile assessment through application preparation.',
    imageUrl: DESTINATION_IMAGES.canada,
  },
  {
    slug: 'europe',
    name: 'Europe',
    flag: '🇪🇺',
    summary: 'Discover opportunities across selected European destinations.',
    description:
      'Explore international education, work and visit opportunities across Europe, with pathway selection based on your individual goals.',
    imageUrl: DESTINATION_IMAGES.europe,
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}
