/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
        // DARK MODE
        "primary-bg-dark": "#151B19",
        "secondary-bg-dark": "#1D2A26",
        "primary-txt-dark": "#E8F0E6",
        "secondary-txt-dark": "#95C6B4",
        "primary-accent-dark": "#54776A",
        "secondary-accent-dark": "#141B12",
        "primary-icons-dark": "#6F9F8E",
        "secondary-icons-dark": "#4C6545",
        "primary-borders-dark": "#466258",

        // LIGHT MODE
        "primary-bg": "#FAF9F6", //
        "secondary-bg": "#F2F2F4", //
        "primary-txt": "#1E1F24", //
        "secondary-txt": "#CC0715", //
        "primary-overlay-txt": "#F8F1F0", //
        "primary-accent": "#DC2626", //
        "secondary-accent": "#F8E3E0", //
        "primary-icons": "#F8B3AA",
        "secondary-icons": "#EF9E94",
        "primary-borders": "#EF9E94", //
      },
    },
  },
  plugins: [],
};

// FAF9F6;
// FFFAFA;
