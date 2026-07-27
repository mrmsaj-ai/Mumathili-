import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENES } from "../theme";
import { Glass } from "../ui/Glass";
import { useSceneFade } from "../ui/fade";

const STATS = [
  { value: 1600, label: "طالب وطالبة", icon: "🎓", c: COLORS.blue },
  { value: 100, label: "شعبة دراسية", icon: "🏛️", c: COLORS.gold },
  { value: 10, label: "جامعات", icon: "🌍", c: "#39C0A0" },
];

const toArabic = (n: number) =>
  n.toLocaleString("ar-EG", { useGrouping: true });

const Counter: React.FC<{
  stat: (typeof STATS)[number];
  index: number;
}> = ({ stat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 10 + index * 12;
  const enter = spring({ frame: frame - start, fps, config: { damping: 15 } });
  const progress = interpolate(frame, [start, start + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - progress, 3);
  const current = Math.round(stat.value * eased);

  return (
    <Glass
      radius={56}
      glow={`${stat.c}55`}
      style={{
        width: 900,
        padding: "90px 60px",
        textAlign: "center",
        direction: "rtl",
        transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) scale(${interpolate(
          enter,
          [0, 1],
          [0.8, 1],
        )})`,
        opacity: enter,
      }}
    >
      <div style={{ fontSize: 120, marginBottom: 10 }}>{stat.icon}</div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 200,
          fontWeight: 900,
          color: COLORS.white,
          lineHeight: 1,
          textShadow: `0 0 60px ${stat.c}`,
          direction: "ltr",
        }}
      >
        <span style={{ direction: "rtl" }}>{toArabic(current)}</span>
        <span style={{ color: stat.c }}>+</span>
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 66,
          fontWeight: 700,
          color: COLORS.gold,
          marginTop: 24,
        }}
      >
        {stat.label}
      </div>
    </Glass>
  );
};

export const Scene6Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.stats.duration;
  const fade = useSceneFade(dur, 18, 22);
  const titleIn = spring({ frame, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill
      style={{ opacity: fade, alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{
          position: "absolute",
          top: 220,
          fontFamily: FONT_FAMILY,
          direction: "rtl",
          textAlign: "center",
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 900, color: COLORS.white }}>
          مجتمع مُمثلي يكبر كل يوم
        </div>
      </div>

      <div style={{ display: "flex", gap: 90, marginTop: 120 }}>
        {STATS.map((s, i) => (
          <Counter key={s.label} stat={s} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
