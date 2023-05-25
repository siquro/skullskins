/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009894',
        secondary: 'rgba(1, 92, 113, 1)'
        
      },
      backgroundImage: {
        'offersBg': "url('/offers_section/background.svg')",
        'categoriesBg': "url('/categories_bg.svg')",
        'aboutBg': "url('/about/back.svg')",
        
      }
    },
  },
  plugins: [],
}
