/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
      backgroundImage: {
        'stripe-pattern': "repeating-linear-gradient(to bottom, oklch(var(--b1)), oklch(var(--b1)) 10px, oklch(var(--b2)) 10px, oklch(var(--b2)) 20px)",
        'stripe-primary': "repeating-linear-gradient(to bottom, oklch(var(--b1)), oklch(var(--b1)) 10px, oklch(var(--p) / 0.05) 10px, oklch(var(--p) / 0.05) 20px)",
      'stripe-sm': "repeating-linear-gradient(to bottom, oklch(var(--b1)), oklch(var(--b1)) 2px, oklch(var(--b2)) 2px, oklch(var(--b2)) 4px)",
      'stripe-notebook': "repeating-linear-gradient(to bottom, oklch(var(--b1)), oklch(var(--b1)) 27px, oklch(var(--p)) 27px, oklch(var(--b2)) 28px)",
'grid-pattern': `repeating-linear-gradient(to right, oklch(var(--p) / 0.05) 0 1px, transparent 1px 50px),
                   repeating-linear-gradient(to bottom, oklch(var(--p) / 0.05) 0 1px, transparent 1px 50px)`,
    }
    }
    
  },
  plugins: [daisyui],
  daisyui: {


    themes: [

     "dark","light" ,"cupcake", "retro", "forest", "corporate", "pastel",
      "synthwave", "halloween", "black", "luxury", "business",
      "night", "coffee", "dim", "sunset", "bumblebee", "emerald",
      "valentine", "garden", "lofi", "dracula", "cyberpunk", "fantasy", "wireframe","acid",

    ]
  }
}


// {
//       dark: {
//         "base-100": "oklch(14% 0.004 49.25)",
//         "base-200": "oklch(23.26% 0.014 253.1)",
//         "base-300": "oklch(21.15% 0.012 254.09)",
//         "base-content": "oklch(97.807% 0.029 256.847)",
//         "primary": "oklch(98% 0.003 247.858)",
//         "primary-content": "oklch(12% 0.042 264.695)",
//         "secondary": "oklch(65% 0.241 354.308)",
//         "secondary-content": "oklch(94% 0.028 342.258)",
//         "accent": "oklch(77% 0.152 181.912)",
//         "accent-content": "oklch(38% 0.063 188.416)",
//         "neutral": "oklch(14% 0.005 285.823)",
//         "neutral-content": "oklch(92% 0.004 286.32)",
//         "info": "oklch(74% 0.16 232.661)",
//         "info-content": "oklch(29% 0.066 243.157)",
//         "success": "oklch(76% 0.177 163.223)",
//         "success-content": "oklch(37% 0.077 168.94)",
//         "warning": "oklch(82% 0.189 84.429)",
//         "warning-content": "oklch(41% 0.112 45.904)",
//         "error": "oklch(71% 0.194 13.428)",
//         "error-content": "oklch(27% 0.105 12.094)",
//         "radius-selector": "0.5rem",
//         "radius-field": "0.25rem",
//         "radius-box": "0.5rem",
//         "size-selector": "0.25rem",
//         "size-field": "0.25rem",
//         "border": "1px",
//         "depth": "1",
//         "noise": "0"
//       }
//     }, {
//       light: {
//         "color-scheme": "light",
//         "base-100": "oklch(100% 0 0)",
//         "base-200": "oklch(98% 0 0)",
//         "base-300": "oklch(95% 0 0)",
//         "base-content": "oklch(21% 0.006 285.885)",
//         "primary": "oklch(12% 0.042 264.695)",
//         "primary-content": "oklch(93% 0.034 272.788)",
//         "secondary": "oklch(65% 0.241 354.308)",
//         "secondary-content": "oklch(94% 0.028 342.258)",
//         "accent": "oklch(77% 0.152 181.912)",
//         "accent-content": "oklch(38% 0.063 188.416)",
//         "neutral": "oklch(14% 0.005 285.823)",
//         "neutral-content": "oklch(92% 0.004 286.32)",
//         "info": "oklch(74% 0.16 232.661)",
//         "info-content": "oklch(29% 0.066 243.157)",
//         "success": "oklch(76% 0.177 163.223)",
//         "success-content": "oklch(37% 0.077 168.94)",
//         "warning": "oklch(82% 0.189 84.429)",
//         "warning-content": "oklch(41% 0.112 45.904)",
//         "error": "oklch(71% 0.194 13.428)",
//         "error-content": "oklch(27% 0.105 12.094)",
//         "radius-selector": "0.5rem",
//         "radius-field": "0.25rem",
//         "radius-box": "0.5rem",
//         "size-selector": "0.25rem",
//         "size-field": "0.25rem",
//         "border": "1px",
//         "depth": "1",
//         "noise": "0"
//       }
//     },