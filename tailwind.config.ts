import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Your custom background color
        foreground: "var(--foreground)", // Your custom foreground color
      },
      fontFamily: {
        // Add Space Grotesk and Inter to the font family config
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'], // Space Grotesk with fallback
        'inter': ['var(--font-inter)', 'sans-serif'], // Inter with fallback
      },
    },
  },
  plugins: [],
};

export default config;
