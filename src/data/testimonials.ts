import type { L } from "@/lib/localize";

/**
 * Real customer testimonials only. The homepage section renders ONLY when this array is non-empty.
 * Never add placeholder or invented testimonials.
 */
export type Testimonial = {
  quote: L;
  name: string;
  /** e.g. "Villa owner" – only with the customer's permission. */
  role?: L;
};

export const testimonials: Testimonial[] = [];
