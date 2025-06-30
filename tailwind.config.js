/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        first: {
          DEFAULT: "hsl(18, 76%, 54%)", // Normal theme
          dark: "hsl(19, 64%, 58%)", // Dark theme
        },
        "first-alt": {
          DEFAULT: "hsl(19, 64%, 52%)",
          dark: "hsl(19, 64%, 54%)",
        },
        title: {
          DEFAULT: "hsl(19, 16%, 15%)",
          dark: "hsl(19, 24%, 85%)",
        },
        text: {
          DEFAULT: "hsl(19, 16%, 35%)",
          dark: "hsl(19, 16%, 65%)",
        },
        "text-light": {
          DEFAULT: "hsl(19, 8%, 55%)",
        },
        body: {
          DEFAULT: "hsl(19, 100%, 96%)",
          dark: "hsl(19, 12%, 8%)",
        },
        container: {
          DEFAULT: "hsl(19, 100%, 97%)",
          dark: "hsl(19, 10%, 10%)",
        },
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        title: ["Lora", "serif"],
        subtitle: ["Dancing Script", "cursive"],
      },
      fontSize: {
        biggest: "2.25rem",
        h1: "1.5rem",
        h2: "1.25rem",
        h3: "1rem",
        normal: ".938rem",
        small: ".813rem",
        smaller: ".75rem",
        "2rem": "2rem",
      },
      fontWeight: {
        medium: 500,
        "semi-bold": 600,
      },
      zIndex: {
        tooltip: "10",
        fixed: "100",
      },
      height: {
        header: "3.5rem",
      },
    },
  },
  plugins: [],
}


