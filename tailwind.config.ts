import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // Per-case-study accent classes are stored as strings inside data
  // files (lib/caseStudies.ts) — Tailwind's JIT scanner can't always
  // detect them as literal class names. Safelist the canonical set so
  // the build always includes them.
  safelist: [
    "border-snatch",
    "text-snatch",
    "bg-snatch",
    "group-hover:border-snatch",
    "border-xperts",
    "text-xperts",
    "bg-xperts",
    "group-hover:border-xperts",
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
        // Editorial gray scale, slightly warm-tinted so it sits inside
        // the cream/ink palette without reading as cold. Used for
        // hairline rules, secondary type, dividers, and the new gray-
        // muted section backgrounds.
        gray: {
          50: "#f7f5f1",
          100: "#ecebe6",
          200: "#dcdad3",
          300: "#bfbcb3",
          400: "#9a968b",
          500: "#75716a",
          600: "#5a5751",
          700: "#403e3a",
          800: "#272624",
          900: "#161513",
        },
        // Per-case-study brand accents. NOT brand colors of JDT — these
        // surface only on the relevant case study card / page hairlines
        // so each engagement reads in its own register without breaking
        // the editorial chrome.
        snatch: { DEFAULT: "#D90429", soft: "#F0586F" },
        xperts: { DEFAULT: "#0F8B8D", soft: "#5BB1B3" },
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
