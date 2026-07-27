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

const PUSHES = [
  { i: "📢", t: "إعلان من الممثل", d: "امتحان الخوارزميات يوم الأحد", c: COLORS.blue },
  { i: "📝", t: "تحديث الواجبات", d: "أُضيف واجب جديد تلقائياً", c: COLORS.gold },
  { i: "📅", t: "تحديث الجدول", d: "تم تحديث جدولك فوراً", c: "#39C0A0" },
  { i: "📂", t: "ملف جديد", d: "محاضرة ٧ متاحة الآن", c: "#B47CFF" },
];

const PushCard: React.FC<{
  item: (typeof PUSHES)[number];
  index: number;
}> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - 15 - index * 22,
    fps,
    config: { damping: 14, mass: 0.9 },
  });
  const y = interpolate(enter, [0, 1], [-220, index * 190]);
  const op = interpolate(enter, [0, 1], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px) scale(${interpolate(
          enter,
          [0, 1],
          [0.9, 1],
        )})`,
        opacity: op,
      }}
    >
      <Glass
        radius={44}
        glow={`${item.c}55`}
        style={{
          width: 1300,
          padding: "44px 56px",
          display: "flex",
          alignItems: "center",
          gap: 40,
          direction: "rtl",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 32,
            background: `${item.c}33`,
            border: `2px solid ${item.c}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 66,
            boxShadow: `0 0 40px ${item.c}66`,
          }}
        >
          {item.i}
        </div>
        <div style={{ flex: 1, fontFamily: FONT_FAMILY }}>
          <div style={{ fontSize: 54, fontWeight: 800, color: COLORS.white }}>
            {item.t}
          </div>
          <div style={{ fontSize: 42, color: COLORS.ghost, marginTop: 6 }}>
            {item.d}
          </div>
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 34, color: COLORS.muted }}>
          الآن
        </div>
      </Glass>
    </div>
  );
};

export const Scene5Announce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.announce.duration;
  const fade = useSceneFade(dur, 20, 22);

  const titleIn = spring({ frame, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ opacity: fade, alignItems: "center" }}>
      <div
        style={{
          marginTop: 150,
          fontFamily: FONT_FAMILY,
          direction: "rtl",
          textAlign: "center",
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 900, color: COLORS.white }}>
          كل شيء يتحدّث فوراً
        </div>
        <div style={{ fontSize: 50, color: COLORS.gold, marginTop: 10 }}>
          ينشر الممثل · فيصلك الإشعار في لحظتها
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 120, width: 1300, height: 900 }}>
        {PUSHES.map((p, i) => (
          <PushCard key={p.t} item={p} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
