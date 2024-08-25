module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        sidebarOpen: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        sidebarClose: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)'},
        },
        spinFast: {
          to: { transform: 'rotate(-360deg)' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        sidebarOpen: 'sidebarOpen 0.5s ease-out',
        sidebarClose: 'sidebarClose 0.5s ease-out',
        spinFast: 'spinFast 0.3s linear infinite', 
        slide: 'slide 1s ease-out forwards',
        fade: 'fade 1s ease-out forwards',
      },
      
    },
    screens: {
      'max-xsm': {'max': '267px'},
      sm: '640px',
 
      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}