export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-KW" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
