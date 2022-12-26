/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('/background.png')",
        "nlw-gradient": "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)",
        "game-gradient": "linear-gradient(188deg, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.9) 67.88%)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
