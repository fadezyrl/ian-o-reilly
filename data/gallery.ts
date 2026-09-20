import { assets } from "@/data/assets";

export type GalleryShot = {
  id: string;
  label: string;
  caption: string;
  tag: string;
  variant: "tall" | "wide" | "drop" | "lift" | "wide-drop";
  src: string;
};

export const gallery: GalleryShot[] = [
  {
    id: "01",
    label: "01 — Fade",
    caption: "01 — Fade",
    tag: "Skin",
    variant: "tall",
    src: assets.work[0],
  },
  {
    id: "02",
    label: "02 — Motion",
    caption: "02 — Motion",
    tag: "Film",
    variant: "drop",
    src: assets.work[1],
  },
  {
    id: "03",
    label: "03 — Texture",
    caption: "03 — Texture",
    tag: "Crop",
    variant: "wide",
    src: assets.work[2],
  },
  {
    id: "04",
    label: "04 — Chair",
    caption: "04 — Chair",
    tag: "Film",
    variant: "lift",
    src: assets.work[3],
  },
  {
    id: "05",
    label: "05 — Shape",
    caption: "05 — Shape",
    tag: "Fade",
    variant: "tall",
    src: assets.work[4],
  },
  {
    id: "06",
    label: "06 — Room",
    caption: "06 — Room",
    tag: "Space",
    variant: "wide-drop",
    src: assets.work[5],
  },
];
