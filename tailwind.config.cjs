/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        main: '#f2e9e4',
        secondary: '#40356e',
        tertiary: '#B29DA0',
        buttonSesion: '#C9ADA7',
        secondaryHover: '#292247',
        footerColor: '#9a8c98',
        lightblueColor: '#dae1ff',
        rolbutton: '#9F7A9A',
        darkblue: '#4a4e69',
        pioyellow: '#faff04',
        hardblue: '#2f88ff',
        palePurple: '#998FA9',
        ticketColor: '#e1e1ec',
        ourgreen: '#24b54c',
        ourpurple: '#52487c'
        

      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
    
    },
    variants: {},
    plugins: [],
}
}
