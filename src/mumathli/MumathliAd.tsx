import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./theme";
import { loadFonts } from "./fonts";
import { CinematicBackground } from "./ui/CinematicBackground";
import { Scene1Logo } from "./scenes/Scene1Logo";
import { Scene2Campus } from "./scenes/Scene2Campus";
import { Scene3Features } from "./scenes/Scene3Features";
import { Scene4Memo } from "./scenes/Scene4Memo";
import { Scene5Announce } from "./scenes/Scene5Announce";
import { Scene6Stats } from "./scenes/Scene6Stats";
import { Scene7CTA } from "./scenes/Scene7CTA";

loadFonts();

// A very subtle vignette + soft bloom top layer for the whole film.
const Bloom: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      mixBlendMode: "screen",
      background:
        "radial-gradient(circle at 50% 40%, rgba(47,128,237,0.06), transparent 60%)",
    }}
  />
);

export const MumathliAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050D18" }}>
      {/* Persistent cinematic background across the whole film */}
      <CinematicBackground />

      <Sequence from={SCENES.logo.from} durationInFrames={SCENES.logo.duration}>
        <Scene1Logo />
      </Sequence>
      <Sequence from={SCENES.campus.from} durationInFrames={SCENES.campus.duration}>
        <Scene2Campus />
      </Sequence>
      <Sequence from={SCENES.features.from} durationInFrames={SCENES.features.duration}>
        <Scene3Features />
      </Sequence>
      <Sequence from={SCENES.memo.from} durationInFrames={SCENES.memo.duration}>
        <Scene4Memo />
      </Sequence>
      <Sequence from={SCENES.announce.from} durationInFrames={SCENES.announce.duration}>
        <Scene5Announce />
      </Sequence>
      <Sequence from={SCENES.stats.from} durationInFrames={SCENES.stats.duration}>
        <Scene6Stats />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}>
        <Scene7CTA />
      </Sequence>

      <Bloom />
    </AbsoluteFill>
  );
};
