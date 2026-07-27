import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENES } from "../theme";
import { PhoneMockup } from "../ui/PhoneMockup";
import { ChatScreen } from "../screens/Screens";
import { useSceneFade } from "../ui/fade";

// Glowing concentric rings — the AI "aura" behind the assistant.
const AiOrb: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 640, height: 640 }}>
      {[0, 1, 2, 3].map((i) => {
        const pulse = (frame / 60 + i * 0.25) % 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: 200 + pulse * 420,
              height: 200 + pulse * 420,
              borderRadius: "50%",
              border: `3px solid ${COLORS.blueBright}`,
              opacity: (1 - pulse) * 0.5,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, ${COLORS.blueBright}, ${COLORS.blueGlow})`,
          boxShadow: `0 0 120px 30px ${COLORS.blue}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 150,
        }}
      >
        🤖
      </div>
    </div>
  );
};

export const Scene4Memo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.memo.duration;
  const fade = useSceneFade(dur, 20, 24);

  const phoneIn = spring({ frame, fps, config: { damping: 16 } });
  // Memo's answer reveals after the "thinking" beat.
  const reveal = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textIn = spring({ frame: frame - 30, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill
      style={{
        opacity: fade,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 160,
      }}
    >
      {/* Left: AI aura + headline */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          direction: "rtl",
        }}
      >
        <div style={{ position: "relative", height: 640 }}>
          <AiOrb />
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            textAlign: "center",
            marginTop: -40,
            opacity: interpolate(textIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textIn, [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 150,
              fontWeight: 900,
              color: COLORS.white,
              textShadow: `0 0 50px ${COLORS.blue}`,
            }}
          >
            🤖 ميمو
          </div>
          <div style={{ fontSize: 70, color: COLORS.gold, marginTop: 8 }}>
            ذكاؤك الجامعي
          </div>
        </div>
      </div>

      {/* Right: phone with live chat */}
      <div
        style={{
          transform: `translateX(${interpolate(phoneIn, [0, 1], [200, 0])}px) scale(${interpolate(
            phoneIn,
            [0, 1],
            [0.85, 1],
          )})`,
        }}
      >
        <PhoneMockup width={560} glow={COLORS.blueBright} reflection={0.45}>
          <ChatScreen w={510} reveal={reveal} />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
