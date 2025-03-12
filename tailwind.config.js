/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "forest", "corporate", "pastel", "dark",
      "synthwave",
      "halloween",
      "forest",
      "black",
      "luxury",
      "dracula",
      "business",
      "night",
      "coffee",
      "dim",
      "sunset",
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "valentine",
      "garden",
      "lofi",
    ],
  }
}
