import { staticFile, continueRender, delayRender } from "remotion";

// Load the bundled Arabic fonts so rendering is fully self-contained
// (no network fetch, no watermark). Cairo is a variable font that covers
// both Arabic and Latin glyphs; Tajawal is used as a lighter alternate.
//
// This runs once per bundle evaluation (module side-effect). Each render tab
// evaluates the bundle in a fresh context, so the guard below is per-tab.
let started = false;

export const loadFonts = () => {
  if (started || typeof window === "undefined" || typeof FontFace === "undefined") {
    return;
  }
  started = true;

  const handle = delayRender("Loading Arabic fonts", {
    timeoutInMilliseconds: 120000,
    retries: 2,
  });

  const faces = [
    new FontFace(
      "Cairo",
      `url(${staticFile("fonts/Cairo-Variable.ttf")}) format("truetype")`,
      { weight: "200 900" },
    ),
    new FontFace(
      "Tajawal",
      `url(${staticFile("fonts/Tajawal-Regular.ttf")}) format("truetype")`,
      { weight: "400" },
    ),
    new FontFace(
      "Tajawal",
      `url(${staticFile("fonts/Tajawal-Bold.ttf")}) format("truetype")`,
      { weight: "700" },
    ),
  ];

  (async () => {
    try {
      await Promise.all(
        faces.map(async (f) => {
          await f.load();
          document.fonts.add(f);
        }),
      );
      await document.fonts.ready;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Font load failed", err);
    } finally {
      continueRender(handle);
    }
  })();
};
