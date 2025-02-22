import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/infraestructure/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          "200": "#fbcfe8",
        },
        purple: {
          "300": "#c4b5fd",
        },
        blue: {
          "200": "#bfdbfe",
          "300": "#93c5fd",
        },
        yellow: {
          "200": "#fde68a",
        },
        orange: {
          "300": "#fdba74",
        },
        red: {
          "200": "#fecaca",
        },
        cyan: {
          "200": "#a5f3fc",
        },
        teal: {
          "200": "#99f6e4",
        },
        green: {
          "200": "#bbf7d0",
          "300": "#6ee7b7",
        },
        lime: {
          "200": "#d9f99d",
        },
        emerald: {
          "200": "#a7f3d0",
        },
      },
      scale: {
        "110": "1.1",
      },
      transitionProperty: {
        width: "width",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(45deg, #e85a4f, #d43d37, #bf2622, #aa0f0d)",
        "text-gradient":
          "linear-gradient(45deg, #FFFFFF, #F8F8FF, #FFFAFA, #FFFFF0, #FFF5EE)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundClip: {
        text: "text",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  variants: {
    extend: {
      scale: ["hover", "focus"],
      transform: ["group-hover"],
    },
  },
  plugins: [
    addVariablesForColors,
    flowbite.plugin(),
    // require("daisyui"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".hover-props:hover": {
          backgroundColor: "var(--tw-bg-opacity, #f3f4f6)",
        },
        ".dark .hover-props:hover": {
          backgroundColor: "var(--tw-bg-opacity, #374151)",
        },
        ".text-gradient": {
          background:
            "linear-gradient(45deg, #FFFFFF, #F8F8FF, #FFFAFA, #FFFFF0, #FFF5EE)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
