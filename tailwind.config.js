export default {
  content: ["./src/**/*.astro"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      jetbrains: ["JetBrains Mono", "monospace"],
    },
  },
  plugins: [require("@catppuccin/tailwindcss")],
};
