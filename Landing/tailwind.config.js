const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./*.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {        
      screens:{
        'sm':'360px',
        'md':'768px',
        'lg':'960px',
        'xl':'1367px',
      },
      extend: {
        colors: {
          'light-greeen': '#3BDB38',
          'orange': '#FF4E03',
          'gray' : '#9B9D9B',
        },
        container: {
          center: true,
        },
        fontFamily: {
          'main': ['Montserrat', 'sans-serif']
        },
        gridTemplateAreas: {
         
        }
      },
    },
    variants: {
        extend: {},
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      require('@savvywombat/tailwindcss-grid-areas'),
      function({addComponents}){
        addComponents({
          '.container': {
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '640px',
            },
            '@screen md': {
              maxWidth: '835px',
            },
            '@screen lg': {
              maxWidth: '835px',
            },
            '@screen xl': {
              maxWidth: '1230px',
            },
          }
        })
      }
    ],
}