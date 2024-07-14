/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "../server/static_pages/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    /*screens: {
      'sm': {'min': '576px', 'max': '767px'},
      'md': {'min': '768px', 'max': '991px'},
      'lg': {'min': '992px', 'max': '1199px'},
      'xl': {'min': '1200px'},
    },*/
    extend: {},
  },
  plugins: [],
}

