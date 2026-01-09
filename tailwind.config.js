/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Customizations go here
      colors: {
        primary: "#1E88E5",
        success: "#2E7D32",
        warning: "#F9A825",
        danger: "#C62828",
        background: "#FFFFFF",
        text: "#212121",
        muted: "#757575",
      },
    },
  },
  plugins: ["nativewind/babel"],
}