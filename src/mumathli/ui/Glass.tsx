import React from "react";
import { COLORS } from "../theme";

// Reusable glassmorphism surface used for cards, phone chrome, chips.
export const Glass: React.FC<{
  style?: React.CSSProperties;
  radius?: number;
  border?: boolean;
  glow?: string;
  children?: React.ReactNode;
}> = ({ style, radius = 32, border = true, glow, children }) => {
  return (
    <div
      style={{
        borderRadius: radius,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: border ? `1.5px solid rgba(255,255,255,0.16)` : "none",
        boxShadow: glow
          ? `0 24px 80px rgba(0,0,0,0.45), 0 0 60px ${glow}`
          : `0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// A small pill chip (used for feature labels).
export const Chip: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 30px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.07)",
      border: `1.5px solid ${COLORS.blue}55`,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: `0 10px 40px rgba(0,0,0,0.4)`,
      ...style,
    }}
  >
    {children}
  </div>
);
