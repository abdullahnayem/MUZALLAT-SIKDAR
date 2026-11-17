import type { L } from "@/lib/localize";

/** Genuine company videos (portrait, compressed). Muted, lazy, with poster fallback. */
export type VideoItem = {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  title: L;
  caption: L;
};

export const videos: VideoItem[] = [
  {
    id: "dome-stained-polycarbonate",
    src: "/videos/dome-stained-polycarbonate.mp4",
    poster: "/videos/dome-stained-polycarbonate-poster.webp",
    width: 478,
    height: 850,
    title: {
      en: "Coloured-panel dome gazebo",
      ar: "مظلة قبة بألواح ملونة",
    },
    caption: {
      en: "A look up inside a dome-roofed gazebo with coloured translucent panels and a hanging lantern.",
      ar: "نظرة من الداخل إلى مظلة بسقف على شكل قبة بألواح شفافة ملونة وفانوس معلّق.",
    },
  },
  {
    id: "entrance-wood-ceiling",
    src: "/videos/entrance-wood-ceiling.mp4",
    poster: "/videos/entrance-wood-ceiling-poster.webp",
    width: 476,
    height: 848,
    title: {
      en: "Covered entrance with wood-effect ceiling",
      ar: "مدخل مغطى بسقف بمظهر الخشب",
    },
    caption: {
      en: "An evening walk-through of a covered entrance with a slatted wood-effect ceiling and recessed lighting.",
      ar: "جولة مسائية في مدخل مغطى بسقف شرائحي بمظهر الخشب وإضاءة مدمجة.",
    },
  },
];
