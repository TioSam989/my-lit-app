module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "test":"var(--test)",
        "main-bg-color": "var(--main-bg-color)",
        "squares-primary-bg-color":"var(--squares-primary-bg-color)",
        "squares-secondary-bg-color":"var(--squares-secondary-bg-color)",
        "divs-bg-color":"var(--divs-bg-color)",
        "font-primary-color":"var(--font-primary-color)",
        "font-secondary-color":"var(--font-secondary-color)"
      },
      
      spacing:{
        "title-font-size":"var(--title-font-size)",
        "subtitle-font-size":"var(--subtitle-font-size)",
        "content-font-size":"var(--content-font-size)"
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
