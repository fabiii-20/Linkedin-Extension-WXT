/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}",  // Standard source files (React/JSX/TSX)
    "./.output/**/*.{html,js,ts}",  // WXT output directory, where bundled files might reside
    "./entrypoints/popup/**/*.{html,js,ts,tsx}", // If you have popup HTML/JS files for your extension
    "./entrypoints/*.{html,js,ts,tsx}",
    "./entrypoints/popup/*.{html,js,ts,tsx}",

  ],
  theme: {
    extend: {
      // Custom styles and extensions go here
    },
  },
  plugins: [],
};
