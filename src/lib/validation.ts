export const serviceOptions = [
  "pergola-solutions",
  "car-parking-shades",
  "awnings",
  "steel-structures",
  "stage-doors",
  "other",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  /** Honeypot: must stay empty. */
  website?: string;
};

export type ErrorKey =
  | "required"
  | "nameShort"
  | "phoneInvalid"
  | "emailInvalid"
  | "serviceInvalid"
  | "messageShort";

export type FieldName = "name" | "phone" | "email" | "service" | "message";
export type FieldErrors = Partial<Record<FieldName, ErrorKey>>;

const phonePattern = /^\+?[0-9]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the browser form and the API route so both enforce the same rules. */
export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const phone = input.phone.replace(/[\s()-]/g, "");
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "required";
  else if (name.length < 2) errors.name = "nameShort";

  if (!phone) errors.phone = "required";
  else if (!phonePattern.test(phone)) errors.phone = "phoneInvalid";

  if (email && !emailPattern.test(email)) errors.email = "emailInvalid";

  if (!input.service) errors.service = "required";
  else if (!(serviceOptions as readonly string[]).includes(input.service))
    errors.service = "serviceInvalid";

  if (!message) errors.message = "required";
  else if (message.length < 10) errors.message = "messageShort";

  return errors;
}
