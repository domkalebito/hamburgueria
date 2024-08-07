/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },

    extend: {
      boxShadow: {
        'btnCarRemove': '2px 2px 8px 0px rgba(0, 0, 0, 0.8)',
        'btnCarFechar': '2px 2px 8px 0px rgba(0, 0, 0, 0.4)',
        'btnCarFPedido': '2px 2px 8px 0px rgba(0, 0, 0, 0.5)',
        'btnCarFooter': '0px 0px 6px 2px rgba(220, 38, 38, 1)',
        'btnCarItem': '0px 0px 10px 1px rgba(3, 7, 18, 1)'
      },
      dropShadow: {
        '3xl': '-10px 0px 35px rgba(220, 38, 38, 1)',
        '4xl': [
            '-20px 15px 35px rgba(220, 38, 38, 0.55)',
            '-20px 25px 65px rgba(220, 38, 38, 0.35)'
        ]
      },
      backgroundImage: {
        'home': "url('/assets/bg.png')",
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
        
        '3xl': '1600px',
        // => @media (min-width: 1600px) { ... }
      },
      keyframes: {
        wiggle: {
          '0%': { 'box-shadow': '0px 0px 0px 0px rgb(34, 197, 94)' },
          '100%': { 'box-shadow': '0px 0px 16px 4px rgb(34, 197, 94)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite alternate',
      }
    },

  },
  plugins: [],
}