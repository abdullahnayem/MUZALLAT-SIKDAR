import type { L, LList } from "@/lib/localize";
import type { MediaId } from "./media";
import type { ServiceSlug } from "./services";

/**
 * Portfolio = genuine company photographs ONLY.
 * To add a project: drop an optimized photo in public/images/real/, register it in media.ts,
 * then add an entry below. Optional fields (location, year, ...) must only be filled with verified facts.
 */
export type Project = {
  slug: string;
  title: L;
  summary: L;
  /** Primary service category (used for filtering). */
  service: ServiceSlug;
  /** Other services this project also illustrates. */
  alsoServices?: ServiceSlug[];
  image: MediaId;
  /** Observable features only, taken from the photograph. */
  features: LList;
  /** Add only when verified. */
  location?: L;
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "tensioned-fabric-parking-shade",
    title: {
      en: "Tensioned Fabric Parking Shade",
      ar: "مظلة مواقف من القماش المشدود",
    },
    summary: {
      en: "A tensioned-fabric parking shade on a dark steel frame, built over a villa driveway.",
      ar: "مظلة مواقف من القماش المشدود على هيكل حديدي داكن، أُنشئت فوق مدخل فيلا.",
    },
    service: "car-parking-shades",
    alsoServices: ["steel-structures"],
    image: "realParkingGrey",
    features: {
      en: [
        "Tensioned grey fabric roof",
        "Dark steel frame",
        "Covers two parking bays",
        "Suited to a villa facade",
      ],
      ar: [
        "سقف من القماش الرمادي المشدود",
        "هيكل حديدي داكن",
        "يغطي موقفين للسيارات",
        "ينسجم مع واجهة الفيلا",
      ],
    },
  },
  {
    slug: "laser-cut-panel-carport",
    title: {
      en: "Laser-Cut Panel Carport",
      ar: "مظلة سيارات بألواح مفرغة بالليزر",
    },
    summary: {
      en: "A white carport with decorative laser-cut panels in an Islamic geometric pattern and slatted infill.",
      ar: "مظلة سيارات بيضاء بألواح مفرغة بالليزر بنقش هندسي إسلامي وحشوات شرائحية.",
    },
    service: "car-parking-shades",
    alsoServices: ["steel-structures"],
    image: "realCarportWhite",
    features: {
      en: [
        "Laser-cut Islamic-pattern panels",
        "Slatted infill sections",
        "White finish",
        "Flat roof with edge trim",
      ],
      ar: [
        "ألواح مفرغة بالليزر بنقوش إسلامية",
        "أجزاء بحشوات شرائحية",
        "تشطيب أبيض",
        "سقف مسطح بإطار حافة",
      ],
    },
  },
  {
    slug: "pyramid-fabric-canopies",
    title: {
      en: "Pyramid Fabric Canopies",
      ar: "مظلات قماشية هرمية الشكل",
    },
    summary: {
      en: "A row of cream pyramid-shaped fabric canopies shading parked vehicles, with decorative screens at the sides.",
      ar: "صف من المظلات القماشية الهرمية بلون كريمي تظلل المركبات، مع حواجز زخرفية على الجوانب.",
    },
    service: "car-parking-shades",
    image: "realParkingCream",
    features: {
      en: [
        "Pyramid-shaped fabric roofs",
        "Multi-bay layout",
        "Decorative side screens",
      ],
      ar: [
        "أسقف قماشية هرمية الشكل",
        "تصميم متعدد المواقف",
        "حواجز جانبية زخرفية",
      ],
    },
  },
  {
    slug: "curved-roof-parking-shade",
    title: {
      en: "Curved-Roof Parking Shade",
      ar: "مظلة مواقف بسقف مقوّس",
    },
    summary: {
      en: "A multi-bay parking shade with a curved barrel-vault roof profile and a clean, light finish.",
      ar: "مظلة مواقف متعددة بسقف مقوّس على شكل قبو أسطواني وتشطيب نظيف فاتح.",
    },
    service: "car-parking-shades",
    alsoServices: ["steel-structures"],
    image: "realParkingVault",
    features: {
      en: [
        "Curved barrel-vault roof",
        "Stepped multi-bay arrangement",
        "Light finish",
      ],
      ar: [
        "سقف مقوّس على شكل قبو أسطواني",
        "ترتيب متدرج لعدة مواقف",
        "تشطيب فاتح",
      ],
    },
  },
  {
    slug: "slatted-pergola-led-lighting",
    title: {
      en: "Slatted Pergola with LED Lighting",
      ar: "برغولا بشرائح وإضاءة LED",
    },
    summary: {
      en: "A garden pergola with vertical slat screens and warm LED lighting along the roof edge and base.",
      ar: "برغولا حديقة بحواجز شرائحية رأسية وإضاءة LED دافئة على حافة السقف والقاعدة.",
    },
    service: "pergola-solutions",
    image: "realPergolaLed",
    features: {
      en: [
        "Vertical slat side screens",
        "Slatted roof",
        "LED lighting on roof edge and base",
      ],
      ar: [
        "حواجز جانبية بشرائح رأسية",
        "سقف شرائحي",
        "إضاءة LED على حافة السقف والقاعدة",
      ],
    },
  },
  {
    slug: "custom-charcoal-door",
    title: {
      en: "Custom Charcoal Double Door",
      ar: "باب مزدوج مخصص بلون فحمي",
    },
    summary: {
      en: "A custom double door in a charcoal finish with horizontal frosted-glass slats, cast medallions and steel pull handles.",
      ar: "باب مزدوج مخصص بتشطيب فحمي مع شرائح أفقية من الزجاج المصنفر وميداليات مصبوبة ومقابض سحب معدنية.",
    },
    service: "stage-doors",
    image: "realDoorCharcoal",
    features: {
      en: [
        "Horizontal frosted-glass slats",
        "Decorative cast medallions",
        "Long steel pull handles",
      ],
      ar: [
        "شرائح أفقية من الزجاج المصنفر",
        "ميداليات زخرفية مصبوبة",
        "مقابض سحب معدنية طويلة",
      ],
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsForService = (slug: ServiceSlug) =>
  projects.filter((p) => p.service === slug || p.alsoServices?.includes(slug));
