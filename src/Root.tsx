import "./index.css";
import { Composition } from "remotion";
import { MumathliAd } from "./mumathli/MumathliAd";
import {
  FPS,
  HEIGHT,
  TOTAL_FRAMES,
  WIDTH,
} from "./mumathli/theme";

// The Mumathli cinematic advertisement.
// Render with:  npx remotion render MumathliAd out/mumathli.mp4
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MumathliAd"
        component={MumathliAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
