export interface Testimonial {
  student_name: string;
  photo_url?: string;
  destination?: string;
  quote: string;
  rating?: number;
}

// Keep this list empty until verified client/student testimonials are supplied.
// The site must never invent reviews, names, ratings or outcomes.
export const testimonials: Testimonial[] = [];
