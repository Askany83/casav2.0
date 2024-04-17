// Import the daisyUI plugin
const daisyUI = require("daisyui");

// Export your Tailwind CSS configuration
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Add daisyUI to the plugins array
  plugins: [
    daisyUI,
    // Other plugins can be added here if needed
  ],
  daisyui: {
    themes: ["cupcake"],
  },
  // theme: {
  //   screens: {
  //     sm: { min: "640px", max: "767px" },
  //     // => @media (min-width: 640px and max-width: 767px) { ... }

  //     md: { min: "768px", max: "1023px" },
  //     // => @media (min-width: 768px and max-width: 1023px) { ... }

  //     lg: { min: "1024px", max: "1279px" },
  //     // => @media (min-width: 1024px and max-width: 1279px) { ... }

  //     xl: { min: "1280px", max: "1535px" },
  //     // => @media (min-width: 1280px and max-width: 1535px) { ... }

  //     "2xl": { min: "1536px" },
  //     // => @media (min-width: 1536px) { ... }
  //   },
  // },
};
