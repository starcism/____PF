/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundColor: {
        'hover-button': 'rgba(0, 0, 0, 0.05)',
        'nav-button': 'rgba(0, 0, 0, 0.3)',
        'dot-nav': 'rgba(187, 187, 187, 0.66)',
      },
      colors: {
        gray: {
          "1": "#EEEEEE",
          "2": "#D9D9D9",
          "3": "#BBBBBB",
          "4": "#737373",
          "5": "#555555",
          "6": "#373737",
        },
        turquoise: "#85b8cb",
        pinkish: "#fe929f",
        lightgold: "#ece4e2",
        lightpurple: "#e4e2ec",
        viva: {
          DEFAULT: "#BB2649",
          "1": "#C9516D",
          "2": "#CF6780",
          "3": "#D67D92",
          "4": "#DD93A4",
          "5": "#E4A8B6",
          "6": "#EBBEC8",
          "7": "#F1D4DB",
          "8": "#F8E9ED",
          "-1": "#26BB98",
          "-2": "#44D9B6",
          tone : {
            DEFAULT: "#AF3854",
            "1": "#A9415A",
            "2": "#A34A5F",
            "3": "#9E5365",
            "4": "#985C6A",
            "5": "#926570",
            "6": "#8C6E75",
            "7": "#86777B",
          },
          gray : {
            DEFAULT: "#8C8C8C",
            "1": "#717171",
            "2": "#636363",
            "3": "#575757",
            "4": "#484848",
          },
          orange : {
            DEFAULT : "#BB4E26",
          },
        },
      },
    },
  },
  plugins: [],
}