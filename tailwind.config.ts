import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111318',
        surface: '#1A1A22',
        border: { DEFAULT: '#E8E8E8', strong: '#FFFFFF' },
        accent: { DEFAULT: '#4ADE80', soft: '#86EFAC' },
        'text-primary': '#F5F5F5',
        'text-muted': '#9CA3AF',
      },
    },
  },
  plugins: [],
};
export default config;
