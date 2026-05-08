/**
 * Favicon — square architectural JDT mark on ink background.
 *
 * Generated at build time via ImageResponse so we don't ship a binary
 * PNG. Renders crisp at the 32px tab size; the same composition is
 * used at 180px in apple-icon.tsx for higher-DPI surfaces.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          padding: 3,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1.5px solid #ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: 0.5,
            }}
          >
            JDT
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
