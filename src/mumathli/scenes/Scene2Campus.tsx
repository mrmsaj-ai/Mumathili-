import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENES } from "../theme";
import { PhoneMockup } from "../ui/PhoneMockup";
import {
  HomeScreen,
  TimetableScreen,
  SubjectsScreen,
  NotificationsScreen,
  ChatScreen,
} from "../screens/Screens";
import { useSceneFade } from "../ui/fade";

// Abstract campus students — soft-focus silhouettes walking, some holding a
// glowing phone. Sits behind the hero phones for depth.
const Silhouette: React.FC<{ x: number; scale: number; delay: number }> = ({
  x,
  scale,
  delay,
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame + delay) / 9) * 8 * scale;
  const sway = Math.sin((frame + delay) / 18) * 4;
  return (
    <div
      style={{
        position: "absolute",
        bottom: -40,
        left: `${x}%`,
        transform: `translate(${sway}px, ${bob}px) scale(${scale})`,
        opacity: 0.55,
        filter: "blur(2px)",
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: COLORS.navyDeep,
          margin: "0 auto",
        }}
      />
      <div
        style={{
          width: 150,
          height: 300,
          borderRadius: "60px 60px 20px 20px",
          background: `linear-gradient(180deg, ${COLORS.navyLight}, ${COLORS.navyDeep})`,
          marginTop: -12,
        }}
      />
      {/* glowing phone in hand */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 6,
          width: 34,
          height: 64,
          borderRadius: 8,
          background: COLORS.blueBright,
          boxShadow: `0 0 40px 8px ${COLORS.blue}`,
        }}
      />
    </div>
  );
};

export const Scene2Campus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENES.campus.duration;
  const fade = useSceneFade(dur, 20, 22);

  const screens = [
    { c: <HomeScreen w={430} />, label: "الرئيسية" },
    { c: <TimetableScreen w={430} />, label: "الجدول" },
    { c: <SubjectsScreen w={430} />, label: "المواد" },
    { c: <NotificationsScreen w={430} />, label: "الإشعارات" },
    { c: <ChatScreen w={430} />, label: "ميمو AI" },
  ];

  // Cinematic horizontal pan across the phone filmstrip.
  const pan = interpolate(frame, [0, dur], [700, -1900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gap = 620;

  const titleIn = spring({ frame: frame - 10, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      {/* background campus bokeh */}
      <AbsoluteFill>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${random(`cb-${i}`) * 100}%`,
              top: `${20 + random(`cby-${i}`) * 50}%`,
              width: 40 + random(`cbs-${i}`) * 90,
              height: 40 + random(`cbs-${i}`) * 90,
              borderRadius: "50%",
              background: i % 2 ? COLORS.blue : COLORS.gold,
              opacity: 0.1,
              filter: "blur(30px)",
            }}
          />
        ))}
      </AbsoluteFill>

      {/* students */}
      <Silhouette x={4} scale={1.1} delay={0} />
      <Silhouette x={70} scale={0.9} delay={20} />
      <Silhouette x={40} scale={0.7} delay={45} />
      <Silhouette x={86} scale={1.15} delay={12} />

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          direction: "rtl",
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [-30, 0])}px)`,
          zIndex: 5,
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 900, color: COLORS.white }}>
          كل جامعتك في مكان واحد
        </div>
        <div style={{ fontSize: 48, color: COLORS.gold, marginTop: 10 }}>
          الآلاف من الطلاب يستخدمون مُمثلي كل يوم
        </div>
      </div>

      {/* phone filmstrip */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ position: "relative", transform: `translateX(${pan}px)`, top: 90 }}>
          {screens.map((s, i) => {
            const px = i * gap;
            // Parallax tilt & focus based on distance from centre of frame.
            const centerness = 1 - Math.min(1, Math.abs(px + pan) / 900);
            const scale = interpolate(centerness, [0, 1], [0.82, 1]);
            const blur = interpolate(centerness, [0, 1], [6, 0]);
            const rotY = interpolate(px + pan, [-900, 900], [26, -26], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: px,
                  top: 0,
                  transform: `perspective(2000px) rotateY(${rotY}deg) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  zIndex: Math.round(centerness * 10),
                }}
              >
                <PhoneMockup width={470} glow={COLORS.blue} reflection={0.4}>
                  {s.c}
                </PhoneMockup>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 30,
                    fontFamily: FONT_FAMILY,
                    fontSize: 46,
                    fontWeight: 800,
                    color: COLORS.gold,
                    opacity: centerness,
                  }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
