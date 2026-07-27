// Mumathli brand system — the single source of truth for the whole ad.

export const COLORS = {
  navy: "#081526",
  navyDeep: "#050D18",
  navyLight: "#0E2038",
  blue: "#2F80ED",
  blueBright: "#4B9DFF",
  blueGlow: "#1E5FBF",
  gold: "#F5C542",
  goldSoft: "#FFDA7A",
  white: "#FFFFFF",
  ghost: "#C9D6E8",
  muted: "#7E93AE",
} as const;

// Frames per second for the master composition.
export const FPS = 60;
export const DURATION = 30; // seconds
export const TOTAL_FRAMES = FPS * DURATION; // 1800

// 4K UHD, 16:9
export const WIDTH = 3840;
export const HEIGHT = 2160;

// Scene timeline (in frames). Each scene owns its in/out fade.
export const SCENES = {
  logo: { from: 0, duration: 210 },        // 0.0s – 3.5s
  campus: { from: 210, duration: 270 },    // 3.5s – 8.0s
  features: { from: 480, duration: 270 },  // 8.0s – 12.5s
  memo: { from: 750, duration: 300 },      // 12.5s – 17.5s
  announce: { from: 1050, duration: 240 }, // 17.5s – 21.5s
  stats: { from: 1290, duration: 210 },    // 21.5s – 25.0s
  cta: { from: 1500, duration: 300 },      // 25.0s – 30.0s
} as const;

export const FONT_FAMILY = "Cairo, Tajawal, sans-serif";
export const FONT_FAMILY_ALT = "Tajawal, Cairo, sans-serif";
