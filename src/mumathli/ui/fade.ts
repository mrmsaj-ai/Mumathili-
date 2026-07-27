import { interpolate, useCurrentFrame } from "remotion";

// Standard cinematic scene fade: eases content in at the start and out at the
// end of a sequence so scenes cross-dissolve over the persistent background.
export const useSceneFade = (
  durationInFrames: number,
  inFrames = 20,
  outFrames = 20,
) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [0, inFrames, durationInFrames - outFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};
