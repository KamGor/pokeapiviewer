module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      './node_modules/tw-elements/dist/js/**/*.js'
    ],
    plugins: [
      require("@tailwindcss/typography"),
      function ({ addVariant }) {
        addVariant('active', '&.active');
      },
    ],
    theme: {
      extend: {
        typography:{
        },
        colors: {
          'primary': '#1E40AF',
          'secondary': '#F59E0B',
          'accent': '#10B981',
          'muted': '#6B7280',
          'light': '#F3F4F6',
          'dark': '#111827',
        },
      },
      container: {
        center: true,
      }
    },
    safelist: [
      
    ]
  }