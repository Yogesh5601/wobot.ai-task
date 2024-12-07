/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray_100: "#F3F4F6",
        gray_200: "#E5E7EB",
        gray_500: "#6B7280",
        gray_600: "#4B5563",
        gray_700: "#374151",
        gray_800: "#1F2937",
        green_200: "#A7F3D0",
        green_700: "#047857",
        red_500: "#EF4444",
        red_600: "#DC2626",
      },
    },
  },
  plugins: [],
};
