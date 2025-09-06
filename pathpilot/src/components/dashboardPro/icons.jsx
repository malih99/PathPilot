import React from "react";

export const IconReact = (props) => (
  <svg viewBox="0 0 256 256" width={28} height={28} {...props}>
    <g fill="none" stroke="currentColor" strokeWidth="12">
      <circle cx="128" cy="128" r="16" fill="currentColor" />
      <ellipse cx="128" cy="128" rx="100" ry="44" />
      <ellipse
        cx="128"
        cy="128"
        rx="100"
        ry="44"
        transform="rotate(60 128 128)"
      />
      <ellipse
        cx="128"
        cy="128"
        rx="100"
        ry="44"
        transform="rotate(120 128 128)"
      />
    </g>
  </svg>
);

export const IconTS = (props) => (
  <svg viewBox="0 0 256 256" width={28} height={28} {...props}>
    <rect width="256" height="256" rx="22" fill="#3178C6" />
    <text
      x="128"
      y="155"
      textAnchor="middle"
      fontFamily="Inter,Segoe UI,system-ui"
      fontSize="120"
      fontWeight="900"
      fill="white"
    >
      TS
    </text>
  </svg>
);

export const IconTest = (props) => (
  <svg viewBox="0 0 256 256" width={28} height={28} {...props}>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a78bfa" />
        <stop offset="1" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect width="256" height="256" rx="22" fill="url(#g)" />
    <path
      d="M64 176l40-96 32 76 16-40 40 60"
      stroke="white"
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
