/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["var(--spave-grotesk)"],
        barlow: ["var(--font-barlow)"],
      },
      colors: {
        primary: "#0E0E0E",
        secondary: "#1B1B1B",

        lightText: "#F1F1F1",
        darkText: "#333333",

        accent: "#02FE4F",
        secondAccent: "#2771E7",
      },
      backgroundImage: {
        newHeroBg: "url('/overlay_background/background_2.png')",
        lightHeroBg: "url('/overlay_background/Herobackground_2.png')",
        bgWaveRight: "url('/overlay_background/Sbg1_2.png')",
        bgAboutCard: "url('/about/About_card.png')",

        btnBg: "linear-gradient(150deg, #00db43 0%, #008629 100%)",
        btnBgHover: "linear-gradient(320deg, #2771e7 0%, #00db43 100%)",
        bgCardHover: "linear-gradient(150deg, #02FE4F29 0%, #0098FF3B 90%)",
        bgGreenTwoCornerShade: "radial-gradient(at top center, transparent 75%, #00db43 100%)",
        bgGreenOneCornerShade: "linear-gradient(150deg, #0e0e0e 38%, #02fe4f29 100%)",
      },
    },
  },
  plugins: [],
};
