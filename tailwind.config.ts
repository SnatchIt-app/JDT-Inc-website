import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        ink: {
          // Slightly warm black — reads as ink on print, not screen black.
          DEFAULT: "#0c0a09",
          soft: "#1c1a17",
        },
        paper: {
          DEFAULT: "#ffffff",
          // Cream-leaning neutrals add the warmth the prompt asked for
          // without breaking the editorial restraint.
          soft: "#faf8f4",
          muted: "#f3eee5",
          // Used sparingly for full-section breathing moments.
          warm: "#ece4d6",
        },
        // Warm taupe — used in tiny doses (eyebrows on warm sections,
        // architectural rule lines). Not a brand color, an accent only.
        accent: {
          DEFAULT: "#8a7c6a",
          soft: "#b8ad9d",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      fontSize: {
        display: ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        hero: ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
