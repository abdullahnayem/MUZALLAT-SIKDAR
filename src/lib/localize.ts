/** A string available in both site languages. */
export type L = { en: string; ar: string };
/** A list of strings available in both site languages. */
export type LList = { en: string[]; ar: string[] };

export const pick = (value: L, locale: string): string =>
  locale === "ar" ? value.ar : value.en;

export const pickList = (value: LList, locale: string): string[] =>
  locale === "ar" ? value.ar : value.en;
