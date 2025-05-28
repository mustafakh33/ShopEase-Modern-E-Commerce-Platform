/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E86AB",     // الأزرق الأساسي (من الهيدر)
        secondary: "#F18F01",   // البرتقالي (من الأزرار)
        dark: "#333333",        
        light: "#F7F7F7",       
        danger: "#dc3545",     
      },
      fontFamily: {
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 