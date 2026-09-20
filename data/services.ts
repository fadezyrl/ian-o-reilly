import { assets } from "@/data/assets";

export type Service = {
  id: keyof typeof assets.craft;
  idx: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  previewLabel: string;
  plateLabel: string;
  img: string;
};

export const services: Service[] = [
  {
    id: "skin-fade",
    idx: "01",
    name: "Skin fade",
    price: "€ —",
    duration: "45 minutes",
    description:
      "Taken down to the skin and walked back up with no line left behind. Cut dry so the fade is read in the light it will actually be seen in, then finished round the ear and the neck by razor.",
    previewLabel: "Skin fade, back of head, hard light",
    plateLabel: "Skin fade — back of head, hard light, close on the blend",
    img: assets.craft["skin-fade"],
  },
  {
    id: "modern-fade",
    idx: "02",
    name: "Modern fade",
    price: "€ —",
    duration: "45 minutes",
    description:
      "A softer drop through the sides with weight kept on top. The everyday cut — sharp for the first fortnight, still wearable at the fifth week.",
    previewLabel: "Modern fade, three-quarter profile",
    plateLabel: "Modern fade — three-quarter profile, weight left on top",
    img: assets.craft["modern-fade"],
  },
  {
    id: "scissor-cut",
    idx: "03",
    name: "Scissor cut",
    price: "€ —",
    duration: "45 minutes",
    description:
      "No machine near it. Length removed section by section so the shape holds as it grows out, for longer hair, heavier fringes and anyone growing something back.",
    previewLabel: "Scissor cut in progress",
    plateLabel: "Scissor work — hands and shears, shallow depth of field",
    img: assets.craft["scissor-cut"],
  },
  {
    id: "textured-style",
    idx: "04",
    name: "Textured style",
    price: "€ —",
    duration: "50 minutes",
    description:
      "Crops, quiffs and anything that needs movement rather than a set shape. Point-cut through the top to take weight out without taking length, then styled with as little product as it can stand.",
    previewLabel: "Textured crop, front on",
    plateLabel: "Textured crop — front on, natural movement, finished dry",
    img: assets.craft["textured-style"],
  },
  {
    id: "beard",
    idx: "05",
    name: "Beard & grooming",
    price: "€ —",
    duration: "30 minutes",
    description:
      "Shaped to the jaw rather than to a straight line, cheek and neck set by razor, hot towel to finish. Add it to any cut or take it on its own.",
    previewLabel: "Beard line-up, close detail",
    plateLabel: "Beard detail — razor line at the cheek, hot towel steam",
    img: assets.craft.beard,
  },
];

export const bookingServices: string[] = [
  "Skin fade",
  "Modern fade",
  "Scissor cut",
  "Textured style",
  "Beard",
];

export const bookingTimes: string[] = [
  "09:30",
  "11:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];
