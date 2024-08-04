module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    keyframes: {
      sidebarOpen: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' },
      },
      sidebarClose: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-100%)'},
      },
    },
    animation: {
      sidebarOpen: 'sidebarOpen 0.5s ease-out',
      sidebarClose: 'sidebarClose 0.5s ease-out',
    },
  },
  plugins: [],
}