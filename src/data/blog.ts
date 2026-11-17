import type { L } from "@/lib/localize";
import type { MediaId } from "./media";

/** General-guidance articles. They make no claims about specific projects, prices or results. */
export type BlogSection = { heading: L; body: L[] };

export type BlogPost = {
  slug: string;
  title: L;
  excerpt: L;
  /** ISO date. */
  date: string;
  image: MediaId;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-a-car-parking-shade",
    title: {
      en: "How to Choose the Right Car Parking Shade",
      ar: "كيف تختار مظلة مواقف السيارات المناسبة",
    },
    excerpt: {
      en: "Space, fabric or solid roof, and the look of your building: the questions worth answering before you commission a parking shade.",
      ar: "المساحة، والقماش أو السقف الصلب، ومظهر المبنى: أسئلة تستحق الإجابة قبل طلب مظلة مواقف.",
    },
    date: "2026-11-12",
    image: "parkingVilla",
    sections: [
      {
        heading: { en: "Start with the space", ar: "ابدأ بالمساحة" },
        body: [
          {
            en: "Measure the area you want to cover and note how many vehicles you need to park now and in the future. The position of gates, walls and existing columns will shape what kind of structure is possible.",
            ar: "قم بقياس المساحة التي تريد تغطيتها ودوّن عدد المركبات التي تحتاجها الآن ومستقبلاً. سيحدد موقع البوابات والجدران والأعمدة القائمة نوع الهيكل الممكن.",
          },
        ],
      },
      {
        heading: { en: "Fabric or solid roofing", ar: "قماش أم سقف صلب" },
        body: [
          {
            en: "Tensioned fabric gives a light, sculptural look and works well for flowing shapes. Solid roofing panels give a more traditional profile. The right choice depends on the look you want and how the structure will be used.",
            ar: "يمنح القماش المشدود مظهراً خفيفاً ونحتياً ويناسب الأشكال المنسابة، بينما تعطي ألواح الأسقف الصلبة شكلاً أكثر تقليدية. يعتمد الاختيار الأنسب على المظهر الذي تريده وكيفية استخدام الهيكل.",
          },
        ],
      },
      {
        heading: { en: "Make it part of the building", ar: "اجعلها جزءاً من المبنى" },
        body: [
          {
            en: "A parking shade is often the first thing seen from the street. Matching its colours and lines to the facade helps it look like part of the original design rather than an add-on.",
            ar: "غالباً ما تكون مظلة المواقف أول ما يُرى من الشارع. ومطابقة ألوانها وخطوطها مع الواجهة تجعلها تبدو جزءاً من التصميم الأصلي لا إضافة لاحقة.",
          },
        ],
      },
    ],
  },
  {
    slug: "pergola-or-awning",
    title: {
      en: "Pergola or Awning: Which Suits Your Outdoor Space?",
      ar: "برغولا أم مظلة جانبية: أيهما يناسب مساحتك الخارجية؟",
    },
    excerpt: {
      en: "Both bring shade, but they work differently. A short guide to deciding between a pergola and an awning.",
      ar: "كلاهما يوفر الظل لكنهما يعملان بطريقة مختلفة. دليل مختصر للمفاضلة بين البرغولا والمظلة الجانبية.",
    },
    date: "2026-11-05",
    image: "pergolaGarden",
    sections: [
      {
        heading: { en: "What a pergola offers", ar: "ما الذي توفره البرغولا" },
        body: [
          {
            en: "A pergola is a free-standing or wall-attached structure that defines an outdoor room. It suits gardens, terraces and rooftops where you want a lasting, architectural feature.",
            ar: "البرغولا هيكل قائم بذاته أو مثبت بالجدار يحدد غرفة خارجية. تناسب الحدائق والتراسات والأسطح حيث تريد عنصراً معمارياً دائماً.",
          },
        ],
      },
      {
        heading: { en: "What an awning offers", ar: "ما الذي توفره المظلة الجانبية" },
        body: [
          {
            en: "An awning attaches to an existing wall and projects outward. It is a slimmer solution for a patio, window or shopfront, and retractable versions can be folded away when you don't need shade.",
            ar: "تُثبَّت المظلة الجانبية على جدار قائم وتمتد إلى الخارج. هي حل أنحف للفناء أو النافذة أو واجهة المحل، ويمكن طي الأنواع القابلة للسحب عند عدم الحاجة إلى الظل.",
          },
        ],
      },
      {
        heading: { en: "How to decide", ar: "كيف تقرر" },
        body: [
          {
            en: "If you want a defined outdoor room, choose a pergola. If you need shade over a specific opening or a flexible, lighter solution, an awning may be the better fit. If you are unsure, send us photos of the space and we will advise.",
            ar: "إذا أردت غرفة خارجية محددة فاختر البرغولا، وإذا احتجت ظلاً فوق فتحة معينة أو حلاً أخف وأكثر مرونة فقد تكون المظلة الجانبية الأنسب. وإن لم تكن متأكداً فأرسل لنا صوراً للمكان لنقدم لك المشورة.",
          },
        ],
      },
    ],
  },
  {
    slug: "steel-structures-outdoors",
    title: {
      en: "What to Consider Before Building an Outdoor Steel Structure",
      ar: "ما الذي ينبغي مراعاته قبل إنشاء هيكل حديدي خارجي",
    },
    excerpt: {
      en: "Design intent, finish and detailing: the decisions that make an outdoor steel structure look right and last.",
      ar: "فكرة التصميم والتشطيب والتفاصيل: قرارات تجعل الهيكل الحديدي الخارجي يبدو جيداً ويدوم.",
    },
    date: "2026-10-29",
    image: "steelPavilion",
    sections: [
      {
        heading: { en: "Define what it is for", ar: "حدّد الغرض منه" },
        body: [
          {
            en: "A canopy, a pavilion and a gateway have different needs. Being clear about the purpose helps determine the size, the supports and how the structure meets the ground and the building.",
            ar: "للمظلة والجناح والبوابة احتياجات مختلفة. ووضوح الغرض يساعد في تحديد الحجم والركائز وكيفية التقاء الهيكل بالأرض والمبنى.",
          },
        ],
      },
      {
        heading: { en: "Think about the finish", ar: "فكّر في التشطيب" },
        body: [
          {
            en: "Outdoor steel needs a suitable protective finish, and the colour affects how the structure sits in its surroundings. Discuss the finish early, as it influences both appearance and maintenance.",
            ar: "يحتاج الحديد الخارجي إلى تشطيب حماية مناسب، ويؤثر اللون في انسجام الهيكل مع محيطه. ناقش التشطيب مبكراً لأنه يؤثر في المظهر والصيانة معاً.",
          },
        ],
      },
      {
        heading: { en: "Details make the difference", ar: "التفاصيل تصنع الفرق" },
        body: [
          {
            en: "Clean connections, consistent lines and careful installation are what separate a structure that looks engineered from one that looks improvised.",
            ar: "الوصلات النظيفة والخطوط المتناسقة والتركيب الدقيق هي ما يميز هيكلاً يبدو مدروساً عن آخر يبدو مرتجلاً.",
          },
        ],
      },
    ],
  },
  {
    slug: "planning-your-outdoor-shade-project",
    title: {
      en: "Planning Your Outdoor Shade Project: A Simple Checklist",
      ar: "تخطيط مشروع الظل الخارجي: قائمة مراجعة بسيطة",
    },
    excerpt: {
      en: "What to have ready before you contact a shading contractor, so the first conversation is as useful as possible.",
      ar: "ما ينبغي تجهيزه قبل التواصل مع مقاول مظلات، ليكون أول حوار مفيداً قدر الإمكان.",
    },
    date: "2026-10-22",
    image: "heroDusk",
    sections: [
      {
        heading: { en: "Gather the basics", ar: "جهّز الأساسيات" },
        body: [
          {
            en: "Photos of the space, rough measurements and any building drawings you have will help the discussion move quickly.",
            ar: "صور للمكان وقياسات تقريبية وأي مخططات للمبنى لديك ستساعد على تسريع النقاش.",
          },
        ],
      },
      {
        heading: { en: "Describe how you will use it", ar: "صف كيف ستستخدمه" },
        body: [
          {
            en: "Will it cover cars, a seating area or an entrance? How much shade do you want? Knowing this lets the design be shaped around real use.",
            ar: "هل سيغطي سيارات أم منطقة جلوس أم مدخلاً؟ وما مقدار الظل الذي تريده؟ معرفة ذلك تتيح بناء التصميم على الاستخدام الفعلي.",
          },
        ],
      },
      {
        heading: { en: "Share your references", ar: "شارك مراجعك" },
        body: [
          {
            en: "If you have seen a style or finish you like, share it. Reference images are the quickest way to align on the look you want.",
            ar: "إن رأيت أسلوباً أو تشطيباً أعجبك فشاركه معنا. الصور المرجعية أسرع وسيلة للاتفاق على المظهر المطلوب.",
          },
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
