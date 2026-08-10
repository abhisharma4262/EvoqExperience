export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const COMPOSITION_IDS = [
  "HomeFilm",
  "CreateLaunch",
  "TransformLaunch",
  "OperateLaunch",
] as const;

export type CompositionId = (typeof COMPOSITION_IDS)[number];

/** Shared beat lengths for Create / Transform / Operate films (~35s). */
export const PRODUCT_SECTION_FRAMES = {
  create: {
    open: 90,
    pressure: 150,
    actionA: 210,
    actionB: 240,
    governed: 210,
    close: 180,
  },
  transform: {
    open: 90,
    pressure: 150,
    actionA: 180,
    actionB: 240,
    governed: 210,
    close: 180,
  },
  operate: {
    open: 90,
    pressure: 150,
    actionA: 240,
    actionB: 180,
    governed: 180,
    close: 180,
  },
} as const;

function sumFrames(sections: Record<string, number>): number {
  return Object.values(sections).reduce((total, value) => total + value, 0);
}

/** Homepage film section lengths (frames). */
export const HOME_SECTION_FRAMES = {
  open: 90,
  industry: 180,
  challenge: 180,
  work: 210,
  evoq: 240,
  modes: 240,
  compounding: 180,
  close: 150,
} as const;

export const COMPOSITION_META: Record<
  CompositionId,
  {
    id: CompositionId;
    label: string;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
  }
> = {
  HomeFilm: {
    id: "HomeFilm",
    label: "Homepage film",
    durationInFrames: sumFrames(HOME_SECTION_FRAMES),
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  CreateLaunch: {
    id: "CreateLaunch",
    label: "Create launch",
    durationInFrames: sumFrames(PRODUCT_SECTION_FRAMES.create),
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  TransformLaunch: {
    id: "TransformLaunch",
    label: "Transform launch",
    durationInFrames: sumFrames(PRODUCT_SECTION_FRAMES.transform),
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  OperateLaunch: {
    id: "OperateLaunch",
    label: "Operate launch",
    durationInFrames: sumFrames(PRODUCT_SECTION_FRAMES.operate),
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
};
