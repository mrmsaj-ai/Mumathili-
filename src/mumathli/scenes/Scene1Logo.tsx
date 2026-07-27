import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENES } from "../theme";
import { LogoMark } from "../ui/LogoMark";
import { useSceneFade } from "../ui/fade";

export const Scene1Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.logo.duration;
  const fade = useSceneFade(dur, 18, 22);

  const pop = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const logoScale = interpolate(pop, [0, 1], [0.4, 1]);
  const logoY = interpolate(pop, [0, 1], [60, 0]);

  // Slow, continuous cinematic push-in on the whole scene.
  const camera = interpolate(frame, [0, dur], [1.0, 1.12]);

  const titleIn = spring({ frame: frame - 26, fps, config: { damping: 16 } });
  const subIn = spring({ frame: frame - 44, fps, config: { damping: 18 } });

  const ring = 0.5 + 0.5 * Math.sin(frame / 14);

  return (
    <AbsoluteFill
      style={{
        opacity: fade,
        transform: `scale(${camera})`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Halo behind logo */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.blue}55 0%, transparent 62%)`,
          filter: "blur(20px)",
          opacity: 0.6 + ring * 0.4,
        }}
      />
      <div
        style={{
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          marginBottom: 60,
        }}
      >
        <LogoMark size={440} />
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 900,
          fontSize: 220,
          color: COLORS.white,
          direction: "rtl",
          lineHeight: 1,
          textShadow: `0 0 60px ${COLORS.blue}aa, 0 8px 40px rgba(0,0,0,0.5)`,
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
          letterSpacing: -4,
        }}
      >
        ممثلي
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 600,
          fontSize: 74,
          color: COLORS.gold,
          direction: "rtl",
          marginTop: 24,
          opacity: interpolate(subIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subIn, [0, 1], [30, 0])}px)`,
          textShadow: `0 0 30px ${COLORS.gold}66`,
        }}
      >
        تطبيقك الجامعي الذكي
      </div>
    </AbsoluteFill>
  );
};
