/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pharmacy: {
          teal: '#028471',
          tealDark: '#015e51',
          emerald: '#10b981',
          coral: '#ff6f61',
        },
      },
    },
  },
  plugins: [],
};
