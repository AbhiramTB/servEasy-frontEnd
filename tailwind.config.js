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
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mydark: {
          ...{
            "primary": "oklch(98% 0.002 247.839)",
            "primary-content": "oklch(100% 0 0)",

            "secondary": "oklch(64% 0.222 41.116)",
            "secondary-content": "oklch(98% 0.016 73.684)",

            "accent": "oklch(51% 0.262 276.966)",
            "accent-content": "oklch(96% 0.018 272.314)",

            "neutral": "oklch(37% 0.013 285.805)",
            "neutral-content": "oklch(98% 0 0)",

            "base-100": "oklch(12% 0.042 264.695)",
            "base-200": "oklch(26% 0.007 34.298)",
            "base-300": "oklch(27% 0.033 256.848)",
            "base-content": "oklch(96% 0.001 286.375)",

            "info": "oklch(74% 0.16 232.661)",
            "success": "oklch(76% 0.177 163.223)",
            "warning": "oklch(82% 0.189 84.429)",
            "error": "oklch(71% 0.202 349.761)",
          }
        }
      },
      "light", "dark", "cupcake", "retro", "forest", "corporate", "pastel", 
      "synthwave", "halloween", "black", "luxury", "dracula", "business",
      "night", "coffee", "dim", "sunset", "bumblebee", "emerald", 
      "valentine", "garden", "lofi"
    ]
  }
}
