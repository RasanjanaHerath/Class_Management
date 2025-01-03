/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'adminNoticeBackgroundImage': "url('/src/assets/logo1.png')",

      },
    },
    screens: {
      xs: "480px",
      ss: "620px", // Add a screen size between xs and sm if needed
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

