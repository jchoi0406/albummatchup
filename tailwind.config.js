/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      fontSize:{
        'xs': '0.75rem',   // Extra Small for phones
        'sm': '0.875rem',  // Small for phones and small screens
        'base': '1rem',    // Default font size
        'lg': '1.125rem',  // Large for tablets and larger screens
        'xl': '1.25rem',   // Extra Large for desktops
        '2xl': '1.5rem',   // Extra Extra Large
      }
    },
  },
  plugins: [],
}

