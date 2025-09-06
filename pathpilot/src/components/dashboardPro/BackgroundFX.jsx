import React from "react";

export default function BackgroundFX() {
  return (
    <>
      {/* گرادیان نرم کل صفحه */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(1200px 600px at 85% 10%, rgba(168, 85, 247,.16), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(99,102,241,.16), transparent 60%), linear-gradient(180deg, #f6f7fb 0%, #eef0f7 60%, #f7f8fc 100%)",
        }}
      />

      {/* بلاب‌های محو گوشه‌ها */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "12%",
          left: "6%",
          width: 340,
          height: 340,
          borderRadius: "999px",
          background:
            "radial-gradient(closest-side, rgba(139,92,246,.24), rgba(139,92,246,0))",
          filter: "blur(30px)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "8%",
          right: "10%",
          width: 420,
          height: 420,
          borderRadius: "999px",
          background:
            "radial-gradient(closest-side, rgba(99,102,241,.22), rgba(99,102,241,0))",
          filter: "blur(36px)",
          zIndex: 0,
        }}
      />

      {/* نویز خیلی ظریف */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.06,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 1'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}
