import type { L } from "@/lib/localize";

/**
 * Every raster image on the site.
 * - "real": genuine MUZALLAT SIKDAR photographs (plates blurred in the web copies).
 * - "ai":   AI-generated illustrative images. Never used as portfolio projects.
 */
export type MediaKind = "real" | "ai";

export type Media = {
  src: string;
  width: number;
  height: number;
  kind: MediaKind;
  alt: L;
};

const real = (
  file: string,
  width: number,
  height: number,
  en: string,
  ar: string,
): Media => ({
  src: `/images/real/${file}.webp`,
  width,
  height,
  kind: "real",
  alt: { en, ar },
});

const ai = (
  path: string,
  width: number,
  height: number,
  en: string,
  ar: string,
): Media => ({
  src: `/images/ai-generated/${path}.webp`,
  width,
  height,
  kind: "ai",
  alt: { en, ar },
});

export const media = {
  // ───────── Real company photographs ─────────
  realParkingGrey: real(
    "parking-tensile-fabric-grey",
    1600,
    1200,
    "Grey tensioned-fabric parking shade on a dark steel frame at a villa",
    "مظلة مواقف سيارات من القماش المشدود الرمادي على هيكل حديدي داكن في فيلا",
  ),
  realCarportWhite: real(
    "carport-laser-cut-white",
    1055,
    1054,
    "White carport with decorative laser-cut Islamic-pattern panels",
    "مظلة سيارات بيضاء بألواح مفرغة بالليزر بنقوش إسلامية",
  ),
  realParkingCream: real(
    "parking-cream-canopies",
    1600,
    1200,
    "Cream pyramid fabric canopies shading parked cars with decorative screens",
    "مظلات هرمية من القماش بلون كريمي تغطي السيارات مع حواجز زخرفية",
  ),
  realParkingVault: real(
    "parking-barrel-vault",
    1800,
    1350,
    "Curved barrel-vault roofed parking shade covering several bays",
    "مظلة مواقف سيارات بسقف مقوّس تغطي عدة مواقف",
  ),
  realPergolaLed: real(
    "pergola-led-dusk",
    640,
    640,
    "Slatted pergola with LED edge lighting in the evening",
    "برغولا بشرائح مع إضاءة LED على الحواف في المساء",
  ),
  realDoorCharcoal: real(
    "door-charcoal-double",
    1536,
    2048,
    "Charcoal double door with frosted glass slats and cast medallions",
    "باب مزدوج فحمي اللون بشرائح زجاج مصنفر وميداليات مصبوبة",
  ),

  // ───────── AI-generated illustrative images ─────────
  heroGarden: ai(
    "hero/villa-garden-pergola-golden-hour",
    1536,
    864,
    "Illustrative image of a modern louvred pergola on a villa terrace at sunset",
    "صورة توضيحية لبرغولا حديثة بشرائح على تراس فيلا وقت الغروب",
  ),
  heroDusk: ai(
    "hero/villa-retractable-pergola-dusk",
    1536,
    864,
    "Illustrative image of a modern pergola over a dining area at dusk",
    "صورة توضيحية لبرغولا حديثة فوق منطقة طعام عند الغسق",
  ),
  pergolaGarden: ai(
    "pergolas/garden-pergola-wood-effect-slats",
    1280,
    960,
    "Illustrative garden pergola with wood-effect slatted roof",
    "صورة توضيحية لبرغولا حديقة بسقف شرائح بمظهر الخشب",
  ),
  pergolaRooftop: ai(
    "pergolas/rooftop-pergola-terrace",
    1280,
    960,
    "Illustrative rooftop pergola with glass balustrade and skyline view",
    "صورة توضيحية لبرغولا على السطح مع حاجز زجاجي وإطلالة على الأفق",
  ),
  pergolaRetractable: ai(
    "pergolas/retractable-pergola-fabric-roof",
    1280,
    960,
    "Illustrative retractable pergola with a fabric roof system",
    "صورة توضيحية لبرغولا قابلة للسحب بنظام سقف قماشي",
  ),
  parkingVilla: ai(
    "parking-shades/villa-cantilever-parking-shade",
    1280,
    960,
    "Illustrative cantilever parking shade at a villa driveway",
    "صورة توضيحية لمظلة مواقف كابولية عند مدخل فيلا",
  ),
  parkingCommercial: ai(
    "parking-shades/commercial-multi-bay-parking-shade",
    1536,
    864,
    "Illustrative commercial multi-bay tensile parking shade",
    "صورة توضيحية لمظلة مواقف تجارية متعددة المواقف من القماش المشدود",
  ),
  parkingTensile: ai(
    "parking-shades/tensile-parking-structure-dusk",
    1280,
    960,
    "Illustrative sculptural tensile parking structure at golden hour",
    "صورة توضيحية لهيكل مواقف نحتي من القماش المشدود وقت الغروب",
  ),
  awningPatio: ai(
    "awnings/retractable-awning-villa-patio",
    1280,
    960,
    "Illustrative retractable awning over a villa patio",
    "صورة توضيحية لمظلة قابلة للسحب فوق فناء فيلا",
  ),
  awningWindows: ai(
    "awnings/villa-window-awnings-striped",
    1280,
    960,
    "Illustrative striped window awnings on a modern villa facade",
    "صورة توضيحية لمظلات نوافذ مخططة على واجهة فيلا حديثة",
  ),
  awningRestaurant: ai(
    "awnings/restaurant-terrace-awning-dusk",
    1536,
    864,
    "Illustrative commercial awning over a restaurant terrace at dusk",
    "صورة توضيحية لمظلة تجارية فوق تراس مطعم عند الغسق",
  ),
  steelCanopy: ai(
    "steel-structures/steel-portal-canopy-courtyard",
    1280,
    960,
    "Illustrative black steel portal-frame canopy over a courtyard",
    "صورة توضيحية لمظلة بهيكل حديدي أسود فوق فناء",
  ),
  steelPavilion: ai(
    "steel-structures/steel-pavilion-framework-garden",
    1536,
    864,
    "Illustrative outdoor steel pavilion framework in a garden",
    "صورة توضيحية لهيكل جناح حديدي خارجي في حديقة",
  ),
  steelGateway: ai(
    "steel-structures/steel-gateway-entrance-fins",
    1280,
    960,
    "Illustrative architectural steel gateway with vertical fins",
    "صورة توضيحية لبوابة حديدية معمارية بزعانف رأسية",
  ),
  doorBronze: ai(
    "stage-doors/custom-double-door-bronze-slats",
    960,
    1280,
    "Illustrative custom double door in dark bronze with slatted panels",
    "صورة توضيحية لباب مزدوج مخصص بلون برونزي داكن بألواح شرائحية",
  ),
  doorVenue: ai(
    "stage-doors/venue-entrance-steel-perforated-doors",
    1536,
    864,
    "Illustrative venue entrance with steel doors and perforated geometric panels",
    "صورة توضيحية لمدخل قاعة بأبواب حديدية وألواح مفرغة بنقوش هندسية",
  ),
  doorPivot: ai(
    "stage-doors/pivot-entrance-door-limestone",
    1280,
    960,
    "Illustrative pivot entrance door between limestone walls",
    "صورة توضيحية لباب مدخل محوري بين جدران من الحجر الجيري",
  ),
} as const satisfies Record<string, Media>;

export type MediaId = keyof typeof media;
