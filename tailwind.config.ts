import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {    
    extend: {
      colors:{
        "primary-accent":"#F97F29",
        "primary":"#f0f4f8",
        "primary-light":"#F2F2F2",
        "primary-dark":"#1F1D1D",
        "primary-dark-accent":"#FF968C",
        "primary-dark-light":"#E5DFDF",
        "secondary-dark":"#676E80",
      },      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
