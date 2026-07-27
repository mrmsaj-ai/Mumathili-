import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENES } from "../theme";
import { PhoneMockup } from "../ui/PhoneMockup";
import { HomeScreen } from "../screens/Screens";
import { LogoMark } from "../ui/LogoMark";
import { GooglePlayBadge } from "../ui/GooglePlayBadge";
import { useSceneFade } from "../ui/fade";

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.cta.duration;
  const fade = useSceneFade(dur, 24, 40);

  const phoneIn = spring({ frame, fps, config: { damping: 15 } });
  const logoIn = spring({ frame: frame - 22, fps, config: { damping: 16 } });
  const ctaIn = spring({ frame: frame - 40, fps, config: { damping: 18 } });
  const badgeIn = spring({ frame: frame - 58, fps, config: { damping: 16 } });
  const siteIn = spring({ frame: frame - 74, fps, config: { damping: 18 } });

  const glowPulse = 0.6 + 0.4 * Math.sin(frame / 18);

  return (
    <AbsoluteFill
      style={{
        opacity: fade,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 220,
      }}
    >
      {/* Strong blue glow behind phone */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1500,
            height: 1500,
            borderRadius: "50%",
            marginLeft: 700,
            background: `radial-gradient(circle, ${COLORS.blue}88 0%, ${COLORS.blueGlow}33 35%, transparent 62%)`,
            filter: "blur(30px)",
            opacity: glowPulse,
          }}
        />
      </AbsoluteFill>

      {/* Text column */}
      <div
        style={{
          direction: "rtl",
          fontFamily: FONT_FAMILY,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 5,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(logoIn, [0, 1], [40, 0])}px) scale(${interpolate(
              logoIn,
              [0, 1],
              [0.7, 1],
            )})`,
            opacity: logoIn,
            display: "flex",
            alignItems: "center",
            gap: 36,
            marginBottom: 40,
          }}
        >
          <LogoMark size={200} />
          <div style={{ fontSize: 170, fontWeight: 900, color: COLORS.white }}>
            ممثلي
          </div>
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: COLORS.gold,
            opacity: ctaIn,
            transform: `translateX(${interpolate(ctaIn, [0, 1], [-60, 0])}px)`,
            textShadow: `0 0 40px ${COLORS.gold}66`,
            marginBottom: 50,
          }}
        >
          حمّل ممثلي الآن
        </div>

        <div
          style={{
            opacity: badgeIn,
            transform: `translateY(${interpolate(badgeIn, [0, 1], [40, 0])}px)`,
            marginBottom: 44,
            direction: "ltr",
          }}
        >
          <GooglePlayBadge width={620} />
        </div>

        <div
          style={{
            opacity: siteIn,
            display: "flex",
            alignItems: "center",
            gap: 22,
            direction: "ltr",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: COLORS.blueBright,
              boxShadow: `0 0 24px ${COLORS.blue}`,
            }}
          />
          <div style={{ fontSize: 72, fontWeight: 700, color: COLORS.white }}>
            mumathli.app
          </div>
        </div>
      </div>

      {/* Phone */}
      <div
        style={{
          zIndex: 5,
          transform: `translateY(${interpolate(phoneIn, [0, 1], [120, 0])}px) scale(${interpolate(
            phoneIn,
            [0, 1],
            [0.8, 1],
          )})`,
        }}
      >
        <PhoneMockup width={640} glow={COLORS.blueBright} reflection={0.5}>
          <HomeScreen w={585} />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
