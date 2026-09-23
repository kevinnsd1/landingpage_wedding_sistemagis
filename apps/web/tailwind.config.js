/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kisah: {
          primary: "#263238",
          primaryHover: "#1E293B",
          secondary: "#667085",
          background: "#FCFCFC",
          surface: "#FFFFFF",
          pink: "#FCBACB",
          pinkAccent: "#FC9FB1",
          pinkDark: "#7D4050",
          pinkSoft: "#FFF1F4",
          greenSoft: "#B9DCA9",
          green: "#74A12E",
          greenDark: "#3D6420",
          yellow: "#FFEAAB",
          cream: "#FFEAAB",
          creamSoft: "#FFF9E6",
          creamDark: "#7A5D00",
          text: "#263238",
          textMuted: "#667085",
          border: "#E8E8E8",
          borderSubtle: "#F1F5F9",
          error: "#D9536F",
          errorSoft: "#FBE1E7",
          errorDark: "#B83D58",
        },
      },
      fontFamily: {
        brand: ['Quintessential', 'cursive', 'serif'],
        ui: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(15, 23, 42, 0.04)',
        'elevated': '0 10px 30px rgba(15, 23, 42, 0.08)',
        'romantic': '0 12px 36px rgba(15, 23, 42, 0.08)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
}
