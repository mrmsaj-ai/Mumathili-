import React from "react";
import { COLORS } from "../theme";

// The Mumathli app-icon: a premium rounded tile with a golden graduation cap
// and a soft chat spark — "smart university companion". Rendered as SVG so it
// stays razor-sharp at 4K.
export const LogoMark: React.FC<{ size?: number; glow?: boolean }> = ({
  size = 360,
  glow = true,
}) => {
  const r = size * 0.24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 360 360"
      style={{
        filter: glow
          ? `drop-shadow(0 0 60px ${COLORS.blue}88) drop-shadow(0 30px 60px rgba(0,0,0,0.5))`
          : "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
      }}
    >
      <defs>
        <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#123A6B" />
          <stop offset="0.5" stopColor={COLORS.navy} />
          <stop offset="1" stopColor={COLORS.navyDeep} />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.goldSoft} />
          <stop offset="1" stopColor={COLORS.gold} />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="0.4" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Tile */}
      <rect x="10" y="10" width="340" height="340" rx={r} fill="url(#tile)" />
      {/* Inner border */}
      <rect
        x="10"
        y="10"
        width="340"
        height="340"
        rx={r}
        fill="none"
        stroke={COLORS.blue}
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      {/* Top glass highlight */}
      <rect x="24" y="24" width="312" height="150" rx={r * 0.8} fill="url(#rim)" opacity="0.6" />

      {/* Graduation cap */}
      <g transform="translate(180 150)">
        <polygon points="0,-46 118,4 0,54 -118,4" fill="url(#gold)" />
        <polygon points="0,-30 78,4 0,38 -78,4" fill={COLORS.navyDeep} opacity="0.25" />
        {/* Cap base */}
        <path
          d="M -62 18 L -62 60 Q 0 96 62 60 L 62 18 L 0 46 Z"
          fill="url(#gold)"
          opacity="0.92"
        />
        {/* Tassel */}
        <line x1="118" y1="4" x2="118" y2="72" stroke={COLORS.goldSoft} strokeWidth="4" />
        <circle cx="118" cy="80" r="9" fill={COLORS.goldSoft} />
      </g>

      {/* Chat spark dot (the "AI" accent) */}
      <circle cx="266" cy="262" r="20" fill={COLORS.blueBright}>
      </circle>
      <circle cx="266" cy="262" r="20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
    </svg>
  );
};
