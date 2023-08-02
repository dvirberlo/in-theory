/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
        "one-spin": "spin 1s ease-out 1",
        "one-spin-reverse": "spin 1s ease-out 1 reverse",

        "slide-in-up": "slide-in-up 0.5s ease-out",
        "slide-in-down": "slide-in-down 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",

        "slide-out-up": "slide-out-up 0.5s ease-out",
        "slide-out-down": "slide-out-down 0.5s ease-out",
        "slide-out-left": "slide-out-left 0.5s ease-out",
        "slide-out-right": "slide-out-right 0.5s ease-out",

        // blur animations were removed because they are too heavy:
        // "blur-in": "blur-in .5s ease-out",
        // "blur-out": "blur-out .5s ease-out",

        "fade-in": "fade-in .5s ease-out",
        "delayed-fade-in": "delayed-fade-in 2s ease-out",
        "fade-out": "fade-out .5s ease-out",

        "scale-up": "scale-up .5s ease-out",
      },
    },
  },
  plugins: [],
};
