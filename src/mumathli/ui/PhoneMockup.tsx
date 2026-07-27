import React from "react";
import { COLORS } from "../theme";

// A premium iPhone-style mockup. Screen content is passed as children and is
// clipped to the display. Includes titanium bezel, dynamic island, side
// buttons, a screen reflection sweep and an Apple-style specular highlight.
export const PhoneMockup: React.FC<{
  width?: number;
  children?: React.ReactNode;
  glow?: string;
  reflection?: number; // 0..1 position of the diagonal reflection sweep
  style?: React.CSSProperties;
}> = ({ width = 520, children, glow = COLORS.blue, reflection = 0.5, style }) => {
  const height = width * 2.16;
  const radius = width * 0.16;
  const bezel = width * 0.028;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        position: "relative",
        background: "linear-gradient(150deg, #2b3340 0%, #171d27 40%, #05080d 100%)",
        padding: bezel,
        boxShadow: `0 60px 140px rgba(0,0,0,0.6), 0 0 90px ${glow}55, inset 0 0 0 2px rgba(255,255,255,0.08)`,
        ...style,
      }}
    >
      {/* Titanium rim highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          padding: 2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.25))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius - bezel,
          overflow: "hidden",
          position: "relative",
          background: COLORS.navyDeep,
        }}
      >
        {children}

        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: width * 0.045,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.32,
            height: width * 0.085,
            borderRadius: 999,
            background: "#05070c",
            zIndex: 20,
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.8)",
          }}
        />

        {/* Diagonal reflection sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(115deg, transparent ${reflection * 100 - 18}%, rgba(255,255,255,0.14) ${reflection * 100}%, transparent ${reflection * 100 + 18}%)`,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
        {/* Top glass gloss */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "22%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), transparent)",
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
      </div>

      {/* Side buttons */}
      <div style={sideBtn(width, height * 0.22, height * 0.18, "left")} />
      <div style={sideBtn(width, height * 0.13, height * 0.31, "left")} />
      <div style={sideBtn(width, height * 0.18, height * 0.25, "right")} />
    </div>
  );
};

const sideBtn = (
  w: number,
  top: number,
  h: number,
  side: "left" | "right",
): React.CSSProperties => ({
  position: "absolute",
  [side]: -w * 0.012,
  top,
  width: w * 0.014,
  height: h,
  borderRadius: 4,
  background: "linear-gradient(90deg, #3a4152, #1a1f29)",
});
