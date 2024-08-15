/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "28.5px"],
        lg: ["18px", "21.94px"],
        xl: ["20px", "24.38px"],
        "2xl": ["24px", "29.26px"],
        "3xl": ["28px", "50px"],
        "4xl": ["40px", "58px"],
        "8xl": ["65px", "78px"],
      },
      colors: {
        "primary-bg": "#0E1110",
        "secondary-bg": "#1B2320",
        "primary-txt": "#E8F0E6",
        "secondary-txt": "#95C6B4",
        "primary-accent": "#1D2A26",
        "secondary-accent": "#141B12",
        "tertiary-accent": "#54776A",
        "primary-icons": "#4C6545",
        "primary-borders": "#395148",
        "secondary-borders": "#466258",
      },
    },
  },
  plugins: [],
};
