module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#011a32',
        'secondary': '#167eff',
        'light-blue': '#eaf3fc',
        'light-blue-border': '#d7e8f9',
      },
      boxShadow: {
        'strong': '0 2px 10px -2px #d3d3d3;',
      },
    },
  },
  plugins: [],
}
