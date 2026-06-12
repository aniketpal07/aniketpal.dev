export interface DarkroomPhoto {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Photos for the DARKROOM widget. Replace the placeholder sources with
 * your own photographs — drop files into /public/darkroom and point
 * `src` at them, e.g. '/darkroom/frame-01.jpg'.
 */
export const photos: DarkroomPhoto[] = [
  {
    src: 'https://picsum.photos/seed/kaalniti-press/900/600',
    alt: 'Black and white frame of a city street at night',
    caption: 'Frame 01 — The city, late edition',
  },
  {
    src: 'https://picsum.photos/seed/kaalniti-wires/900/600',
    alt: 'Overhead power lines against an evening sky',
    caption: 'Frame 02 — Infrastructure, mostly invisible',
  },
  {
    src: 'https://picsum.photos/seed/kaalniti-desk/900/600',
    alt: 'A workbench with tools and notes under lamplight',
    caption: 'Frame 03 — The desk where it happens',
  },
];
