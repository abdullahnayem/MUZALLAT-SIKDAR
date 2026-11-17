import type { L } from "@/lib/localize";
import type { MediaId } from "./media";

export type ServiceSlug =
  | "pergola-solutions"
  | "car-parking-shades"
  | "awnings"
  | "steel-structures"
  | "stage-doors";

export type ServiceIconName = "sun" | "car" | "umbrella" | "hammer" | "door";

export type Offering = { title: L; text: L };

export type Service = {
  slug: ServiceSlug;
  icon: ServiceIconName;
  title: L;
  /** One-sentence summary for cards. */
  short: L;
  /** Paragraphs for the detail page. Descriptive only: no specs, warranties or claims. */
  description: L[];
  offerings: Offering[];
  /** Main illustrative image (AI) used on cards and the detail hero. */
  hero: MediaId;
  /** Additional illustrative images (AI) for the detail page. */
  illustrations: MediaId[];
};

export const services: Service[] = [
  {
    slug: "pergola-solutions",
    icon: "sun",
    title: { en: "Pergola Solutions", ar: "حلول البرغولا" },
    short: {
      en: "Garden, rooftop and retractable pergolas designed around how you use your outdoor space.",
      ar: "برغولات للحدائق والأسطح وبرغولات قابلة للسحب، مصممة وفق طريقة استخدامكم لمساحتكم الخارجية.",
    },
    description: [
      {
        en: "A well-designed pergola turns an open terrace, garden or rooftop into a space you can actually use. We design and build pergolas that suit the architecture of the property and the way the space is lived in.",
        ar: "البرغولا المصممة بعناية تحوّل التراس أو الحديقة أو السطح المفتوح إلى مساحة يمكن استخدامها فعلياً. نصمم وننفذ برغولات تتناسب مع عمارة العقار وطريقة استخدام المكان.",
      },
      {
        en: "From fixed slatted roofs to retractable systems, each pergola is planned around the site, the level of shade you need and the finish you prefer.",
        ar: "من الأسقف الشرائحية الثابتة إلى الأنظمة القابلة للسحب، تُخطَّط كل برغولا وفق الموقع ودرجة الظل المطلوبة والتشطيب الذي تفضلونه.",
      },
    ],
    offerings: [
      {
        title: { en: "Garden Pergolas", ar: "برغولات الحدائق" },
        text: {
          en: "Shaded lounge and dining areas that sit naturally within a garden or lawn.",
          ar: "مساحات جلوس وطعام مظللة تنسجم مع الحديقة والمسطحات الخضراء.",
        },
      },
      {
        title: { en: "Rooftop Pergolas", ar: "برغولات الأسطح" },
        text: {
          en: "Usable shade for roofs and terraces, planned around the building's structure.",
          ar: "ظل عملي للأسطح والتراسات، مخطط وفق الهيكل الإنشائي للمبنى.",
        },
      },
      {
        title: { en: "Retractable Pergolas", ar: "البرغولات القابلة للسحب" },
        text: {
          en: "Adjustable roof systems that let you choose between shade and open sky.",
          ar: "أنظمة أسقف قابلة للتعديل تتيح لكم الاختيار بين الظل والسماء المفتوحة.",
        },
      },
      {
        title: { en: "Custom Pergola Designs", ar: "تصاميم برغولا مخصصة" },
        text: {
          en: "Bespoke layouts and finishes developed to match your property and brief.",
          ar: "تصاميم وتشطيبات خاصة تُطوَّر لتناسب عقاركم ومتطلباتكم.",
        },
      },
    ],
    hero: "pergolaGarden",
    illustrations: ["pergolaRooftop", "pergolaRetractable", "heroDusk"],
  },
  {
    slug: "car-parking-shades",
    icon: "car",
    title: { en: "Car Parking Shades", ar: "مظلات مواقف السيارات" },
    short: {
      en: "Residential and commercial parking shades, built to protect vehicles and complement the building.",
      ar: "مظلات مواقف سكنية وتجارية، مصممة لحماية المركبات والتناغم مع المبنى.",
    },
    description: [
      {
        en: "Parking shades protect vehicles from direct sun and make driveways and car parks more comfortable to use. We design structures that fit the available space and sit well with the building they serve.",
        ar: "تحمي مظلات المواقف المركبات من أشعة الشمس المباشرة وتجعل المداخل والمواقف أكثر راحة في الاستخدام. نصمم هياكل تناسب المساحة المتاحة وتنسجم مع المبنى الذي تخدمه.",
      },
      {
        en: "Our work includes tensioned-fabric canopies, curved-roof structures and decorative laser-cut panel designs, for single villas as well as larger multi-bay layouts.",
        ar: "تشمل أعمالنا مظلات القماش المشدود، والهياكل ذات الأسقف المقوّسة، وتصاميم الألواح المفرغة بالليزر، للفلل الفردية وللمواقف الكبيرة متعددة المواقف.",
      },
    ],
    offerings: [
      {
        title: { en: "Residential Parking Shades", ar: "مظلات مواقف سكنية" },
        text: {
          en: "Shades for villa driveways and residential compounds.",
          ar: "مظلات لمداخل الفلل والمجمعات السكنية.",
        },
      },
      {
        title: { en: "Commercial Parking Shades", ar: "مظلات مواقف تجارية" },
        text: {
          en: "Multi-bay structures for offices, retail and commercial sites.",
          ar: "هياكل متعددة المواقف للمكاتب والمحلات والمواقع التجارية.",
        },
      },
      {
        title: {
          en: "Custom Parking Shade Structures",
          ar: "هياكل مظلات مواقف مخصصة",
        },
        text: {
          en: "Tailored forms and finishes for unusual plots or specific design requirements.",
          ar: "أشكال وتشطيبات مخصصة للمساحات غير التقليدية أو متطلبات التصميم الخاصة.",
        },
      },
    ],
    hero: "parkingVilla",
    illustrations: ["parkingCommercial", "parkingTensile"],
  },
  {
    slug: "awnings",
    icon: "umbrella",
    title: { en: "Awnings", ar: "المظلات الجانبية" },
    short: {
      en: "Outdoor, retractable and custom awnings for patios, windows and commercial frontages.",
      ar: "مظلات خارجية وقابلة للسحب ومخصصة للأفنية والنوافذ والواجهات التجارية.",
    },
    description: [
      {
        en: "Awnings add shade exactly where it is needed: over a patio, a window or the front of a restaurant or shop. They are a flexible way to make outdoor areas more comfortable.",
        ar: "تضيف المظلات الجانبية الظل تماماً حيث تحتاجونه: فوق فناء أو نافذة أو واجهة مطعم أو محل. وهي وسيلة مرنة لجعل المساحات الخارجية أكثر راحة.",
      },
      {
        en: "We supply and install fixed and retractable awnings in a choice of fabrics and frame finishes, planned to suit the facade.",
        ar: "نوفر ونركّب مظلات ثابتة وقابلة للسحب بخيارات متعددة من الأقمشة وتشطيبات الهياكل، ونخططها لتناسب الواجهة.",
      },
    ],
    offerings: [
      {
        title: { en: "Outdoor Awnings", ar: "مظلات خارجية" },
        text: {
          en: "Shade for patios, entrances, terraces and commercial frontages.",
          ar: "ظل للأفنية والمداخل والتراسات والواجهات التجارية.",
        },
      },
      {
        title: { en: "Retractable Awnings", ar: "مظلات قابلة للسحب" },
        text: {
          en: "Extend when you need shade, retract when you don't.",
          ar: "تمتد عند الحاجة إلى الظل وتنطوي عند عدم الحاجة.",
        },
      },
      {
        title: { en: "Custom Awning Solutions", ar: "حلول مظلات مخصصة" },
        text: {
          en: "Made-to-measure awnings for specific openings and designs.",
          ar: "مظلات بمقاسات خاصة لفتحات وتصاميم محددة.",
        },
      },
    ],
    hero: "awningPatio",
    illustrations: ["awningWindows", "awningRestaurant"],
  },
  {
    slug: "steel-structures",
    icon: "hammer",
    title: { en: "Steel Structures", ar: "الهياكل الحديدية" },
    short: {
      en: "Custom, outdoor and architectural steel structures, fabricated to your design.",
      ar: "هياكل حديدية مخصصة وخارجية ومعمارية، تُصنَّع وفق تصميمكم.",
    },
    description: [
      {
        en: "Steel gives outdoor structures their strength and clean lines. We fabricate custom steel frameworks for canopies, pavilions and architectural features that need to look as good as they perform.",
        ar: "يمنح الحديد الهياكل الخارجية قوتها وخطوطها النظيفة. نصنّع هياكل حديدية مخصصة للمظلات والأجنحة والعناصر المعمارية التي يجب أن تبدو جيدة بقدر ما هي متينة.",
      },
      {
        en: "Each project is fabricated and finished to suit its setting, whether it stands alone or forms part of a larger building.",
        ar: "يُصنَّع كل مشروع ويُنهى بما يناسب موقعه، سواء كان قائماً بذاته أو جزءاً من مبنى أكبر.",
      },
    ],
    offerings: [
      {
        title: { en: "Custom Steel Structures", ar: "هياكل حديدية مخصصة" },
        text: {
          en: "Fabricated to your drawings or developed with you from a brief.",
          ar: "تُصنَّع وفق مخططاتكم أو تُطوَّر معكم انطلاقاً من متطلباتكم.",
        },
      },
      {
        title: { en: "Outdoor Steel Structures", ar: "هياكل حديدية خارجية" },
        text: {
          en: "Canopies, pavilions and frameworks designed for outdoor use.",
          ar: "مظلات وأجنحة وهياكل مصممة للاستخدام الخارجي.",
        },
      },
      {
        title: {
          en: "Architectural Steel Solutions",
          ar: "حلول حديدية معمارية",
        },
        text: {
          en: "Steel elements that form part of a building's design language.",
          ar: "عناصر حديدية تشكّل جزءاً من لغة تصميم المبنى.",
        },
      },
    ],
    hero: "steelCanopy",
    illustrations: ["steelPavilion", "steelGateway"],
  },
  {
    slug: "stage-doors",
    icon: "door",
    title: { en: "Stage Doors", ar: "أبواب المسارح" },
    short: {
      en: "Custom and architectural stage door solutions made to suit the space.",
      ar: "حلول أبواب مسارح مخصصة ومعمارية تُصنَّع لتناسب المكان.",
    },
    description: [
      {
        en: "Doors set the tone of an entrance. We make custom door solutions in metal and glass, designed to match the architecture around them.",
        ar: "الأبواب هي ما يحدد طابع المدخل. نصنّع حلول أبواب مخصصة من المعدن والزجاج، مصممة لتتناسب مع العمارة المحيطة بها.",
      },
      {
        en: "Tell us about the space and the look you want, and we will propose a door design that fits.",
        ar: "أخبرونا عن المكان والمظهر الذي تريدونه، وسنقترح تصميم باب مناسباً.",
      },
    ],
    offerings: [
      {
        title: { en: "Custom Stage Doors", ar: "أبواب مسارح مخصصة" },
        text: {
          en: "Doors made to the size, finish and detailing you specify.",
          ar: "أبواب تُصنَّع بالمقاس والتشطيب والتفاصيل التي تحددونها.",
        },
      },
      {
        title: {
          en: "Architectural Stage Door Solutions",
          ar: "حلول أبواب مسارح معمارية",
        },
        text: {
          en: "Door designs developed as part of the wider architectural scheme.",
          ar: "تصاميم أبواب تُطوَّر كجزء من المنظومة المعمارية الأوسع.",
        },
      },
    ],
    hero: "doorVenue",
    illustrations: ["doorBronze", "doorPivot"],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
