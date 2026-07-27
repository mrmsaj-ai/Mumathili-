import React from "react";

// A clean "Get it on Google Play" style badge, drawn as SVG so it stays sharp
// at 4K. Uses the classic multi-colour play triangle.
export const GooglePlayBadge: React.FC<{ width?: number }> = ({
  width = 560,
}) => {
  const height = width * 0.296;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 560 166"
      style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))", direction: "ltr" }}
      direction="ltr"
    >
      <defs>
        <linearGradient id="gp-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C6FF" />
          <stop offset="1" stopColor="#0072FF" />
        </linearGradient>
        <linearGradient id="gp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#33E19B" />
          <stop offset="1" stopColor="#0DAF6E" />
        </linearGradient>
        <linearGradient id="gp-y" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE000" />
          <stop offset="1" stopColor="#FFB800" />
        </linearGradient>
        <linearGradient id="gp-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF5B5B" />
          <stop offset="1" stopColor="#E1132C" />
        </linearGradient>
      </defs>

      {/* Pill */}
      <rect
        x="1.5"
        y="1.5"
        width="557"
        height="163"
        rx="34"
        fill="#0B0B0F"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
      />

      {/* Play triangle logo */}
      <g transform="translate(56 34)">
        <path d="M0 4 L0 94 L48 49 Z" fill="url(#gp-b)" />
        <path d="M0 4 L64 42 L48 49 Z" fill="url(#gp-g)" />
        <path d="M0 94 L64 56 L48 49 Z" fill="url(#gp-r)" />
        <path d="M64 42 L86 49 L64 56 L48 49 Z" fill="url(#gp-y)" />
      </g>

      {/* Text */}
      <text
        x="180"
        y="66"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="30"
        opacity="0.85"
        direction="ltr"
        textAnchor="start"
      >
        GET IT ON
      </text>
      <text
        x="178"
        y="122"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="56"
        direction="ltr"
        textAnchor="start"
      >
        Google Play
      </text>
    </svg>
  );
};
