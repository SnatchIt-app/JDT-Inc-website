/**
 * Apple touch icon — same JDT mark scaled to 180×180.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0c0a09",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 18,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "4px solid #ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 70,
              lineHeight: 1,
              letterSpacing: 2,
            }}
          >
            JDT
          </span>
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 14,
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            INC.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
