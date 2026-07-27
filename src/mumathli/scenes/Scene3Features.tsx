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
import { Glass } from "../ui/Glass";
import { useSceneFade } from "../ui/fade";

const FEATURES = [
  { i: "📚", t: "المناهج الدراسية", c: COLORS.blue },
  { i: "📅", t: "الجدول الأسبوعي", c: COLORS.gold },
  { i: "📝", t: "متابعة الواجبات", c: "#39C0A0" },
  { i: "🔔", t: "إشعارات فورية", c: "#B47CFF" },
  { i: "💬", t: "تواصل مع الممثل", c: COLORS.blueBright },
  { i: "📂", t: "ملفات المواد", c: "#FF8A5B" },
];

export const Scene3Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.features.duration;
  const fade = useSceneFade(dur, 20, 22);

  // Continuous gentle 3D rotation of the phone.
  const rotY = Math.sin(frame / 45) * 22;
  const rotX = Math.sin(frame / 70) * 6;
  const entry = spring({ frame, fps, config: { damping: 16 } });

  const cx = 1920;
  const cy = 1080;
  const radiusX = 1180;
  const radiusY = 640;

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      {/* Center phone */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            transform: `perspective(2400px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${interpolate(
              entry,
              [0, 1],
              [0.7, 1],
            )})`,
            filter: `drop-shadow(0 40px 90px rgba(0,0,0,0.6))`,
          }}
        >
          <PhoneMockup width={560} glow={COLORS.blue} reflection={0.5 + Math.sin(frame / 40) * 0.3}>
            <HomeScreen w={510} />
          </PhoneMockup>
        </div>
      </AbsoluteFill>

      {/* Orbiting feature cards */}
      {FEATURES.map((f, i) => {
        const angle = (i / FEATURES.length) * Math.PI * 2 - Math.PI / 2 + frame / 220;
        const x = cx + Math.cos(angle) * radiusX;
        const y = cy + Math.sin(angle) * radiusY;
        const float = Math.sin(frame / 30 + i) * 14;
        const cardIn = spring({
          frame: frame - 8 - i * 5,
          fps,
          config: { damping: 15 },
        });
        const depth = (Math.sin(angle) + 1) / 2; // 0 back .. 1 front
        return (
          <div
            key={f.t}
            style={{
              position: "absolute",
              left: x,
              top: y + float,
              transform: `translate(-50%,-50%) scale(${interpolate(
                cardIn,
                [0, 1],
                [0.5, 0.85 + depth * 0.35],
              )})`,
              opacity: interpolate(cardIn, [0, 1], [0, 0.55 + depth * 0.45]),
              zIndex: Math.round(depth * 10),
            }}
          >
            <Glass
              radius={40}
              glow={`${f.c}66`}
              style={{
                width: 440,
                padding: "40px 46px",
                display: "flex",
                alignItems: "center",
                gap: 32,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 28,
                  background: `${f.c}2e`,
                  border: `2px solid ${f.c}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 60,
                  boxShadow: `0 0 40px ${f.c}55`,
                }}
              >
                {f.i}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 52,
                  fontWeight: 800,
                  color: COLORS.white,
                }}
              >
                {f.t}
              </div>
            </Glass>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
