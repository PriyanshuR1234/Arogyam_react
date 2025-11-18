/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // A shade of blue
        secondary: '#10b981', // A shade of green
        accent: '#fcd34d', // A shade of yellow/gold for highlights
        neutral: '#f3f4f6', // Light gray for backgrounds
        dark: '#1f2937', // Dark gray for text
        'dark-alt': '#111827', // Even darker gray for footer bottom
      },
    },
  },
  plugins: [],
}
