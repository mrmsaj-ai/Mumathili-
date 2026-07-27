import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { COLORS, TOTAL_FRAMES } from "../theme";

// A moving radial "spotlight" of soft blue light drifting behind everything.
const BlueGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / TOTAL_FRAMES;

  const x = interpolate(Math.sin(frame / 210), [-1, 1], [32, 68]);
  const y = interpolate(Math.cos(frame / 260), [-1, 1], [30, 62]);
  const scale = interpolate(Math.sin(frame / 180), [-1, 1], [0.9, 1.2]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, ${COLORS.blueGlow}66 0%, ${COLORS.blueGlow}22 22%, transparent 55%)`,
        transform: `scale(${scale})`,
        filter: "blur(20px)",
        opacity: interpolate(t, [0, 0.05], [0, 1], { extrapolateRight: "clamp" }),
      }}
    />
  );
};

// A second, tighter warm-gold rim glow for depth.
const GoldRim: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(Math.cos(frame / 300), [-1, 1], [20, 80]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% 80%, ${COLORS.gold}18 0%, transparent 40%)`,
        filter: "blur(40px)",
      }}
    />
  );
};

type Particle = {
  x: number;
  baseY: number;
  size: number;
  speed: number;
  drift: number;
  twinkle: number;
  bright: boolean;
};

const PARTICLES: Particle[] = Array.from({ length: 90 }, (_, i) => ({
  x: random(`px-${i}`) * 100,
  baseY: random(`py-${i}`) * 100,
  size: 2 + random(`ps-${i}`) * 10,
  speed: 6 + random(`pv-${i}`) * 22,
  drift: (random(`pd-${i}`) - 0.5) * 8,
  twinkle: random(`pt-${i}`) * Math.PI * 2,
  bright: random(`pb-${i}`) > 0.7,
}));

// Floating golden particles rising slowly with a soft bloom + twinkle.
const GoldParticles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PARTICLES.map((p, i) => {
        const y = (p.baseY - (frame / 60) * p.speed) % 110;
        const yy = y < -5 ? y + 110 : y;
        const x = p.x + Math.sin(frame / 90 + p.twinkle) * p.drift;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame / 20 + p.twinkle));
        const opacity = twinkle * (p.bright ? 0.9 : 0.5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${yy}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.bright ? COLORS.goldSoft : COLORS.gold,
              opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${COLORS.gold}${p.bright ? "aa" : "55"}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Subtle vignette so the frame edges fall into shadow — cinematic.
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 45%, rgba(2,7,14,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

export const CinematicBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.navyDeep} 0%, ${COLORS.navy} 45%, ${COLORS.navyLight} 100%)`,
      }}
    >
      <BlueGlow />
      <GoldRim />
      <GoldParticles />
      <Vignette />
    </AbsoluteFill>
  );
};
