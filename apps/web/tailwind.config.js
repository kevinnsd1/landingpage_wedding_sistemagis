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
          primary: "#0F172A",
          primaryHover: "#1E293B",
          secondary: "#475569",
          background: "#FCFCFC",
          surface: "#FFFFFF",
          pink: "#FC9FB1",
          pinkSoft: "#FCBACB",
          greenSoft: "#B9DCA9",
          green: "#74A12E",
          yellow: "#FFEAAB",
          text: "#0F172A",
          textMuted: "#64748B",
          border: "#E5E7EB",
          error: "#EF4444",
          errorSoft: "#FEF2F2",
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
