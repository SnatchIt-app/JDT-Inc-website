/**
 * Favicon — minimal "J" mark in the JDT ink palette.
 *
 * Generated at build time via ImageResponse so we don't have to commit
 * binary assets. Can be replaced later with a custom logo file in /public
 * without changing any other code.
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
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontSize: 22,
          fontFamily: "Georgia, 'Times New Roman', serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
