import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skyglass: "#dff8ff",
        mintlight: "#dfffe8",
        lagoon: "#37b5d6",
        ocean: "#0c7fa6",
        pine: "#0f7563",
        cloud: "#f7feff",
        aurora: "#7af0ca"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(18, 103, 132, 0.16)",
        glow: "0 0 40px rgba(122, 240, 202, 0.35)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(255,255,255,0.92), transparent 30%), radial-gradient(circle at 85% 15%, rgba(122,240,202,0.42), transparent 20%), linear-gradient(180deg, rgba(219,247,255,0.98) 0%, rgba(212,255,229,0.82) 48%, rgba(255,255,255,0.94) 100%)"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Manrope'", "system-ui", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        drift: {
          "0%": { transform: "translateX(-6px)" },
          "50%": { transform: "translateX(8px)" },
          "100%": { transform: "translateX(-6px)" }
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        reveal: "reveal 700ms ease-out both"
      }
    }
  },
  plugins: []
} satisfies Config;
