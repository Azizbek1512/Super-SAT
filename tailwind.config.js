/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
module.exports = {
  content: ["./public/index.html", "./public/js/**/*.js", "!./public/js/data/**"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: v("bg"), card: v("card"), ink: v("ink"), mute: v("mute"), line: v("line"),
        acc: v("acc"), accink: v("accink"), ok: v("ok"), okbg: v("okbg"), bad: v("bad"), badbg: v("badbg"),
        brand: v("brand"), gold: v("gold"),
      },
      fontFamily: { sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"] },
      boxShadow: { soft: "0 1px 2px rgb(15 23 42 / .04), 0 4px 16px -6px rgb(15 23 42 / .10)" },
    },
  },
  plugins: [],
};
