/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addVariant }) {
      // Enable `light:` utility classes to apply when `.light` is present on a parent (e.g., body)
      addVariant('light', '.light &');
      // Enable `spooky:` utility classes to apply when `.spooky` is present on a parent (e.g., body)
      addVariant('spooky', '.spooky &');
    }
  ],
};
