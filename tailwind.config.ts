// Import the daisyUI plugin
const daisyUI = require("daisyui");

// Export your Tailwind CSS configuration
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // Add daisyUI to the plugins array
  plugins: [
    daisyUI,
    // Other plugins can be added here if needed
  ],
};
