/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
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
        couple: ['Quintessential', 'cursive', 'serif'],
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
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out both',
        'fade-in-left': 'fadeInLeft 1.2s ease-out both',
        'fade-in-right': 'fadeInRight 1.2s ease-out both',
        'dancer-left': 'dancerLeft 5s ease-in-out infinite',
        'dancer-right': 'dancerRight 5s ease-in-out infinite',
        'spin-in': 'spinFadeIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
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
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        dancerLeft: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-1.5deg)' },
        },
        dancerRight: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        },
        spinFadeIn: {
          '0%':   { opacity: '0', transform: 'rotate(360deg) scale(0.6)' },
          '70%':  { opacity: '1', transform: 'rotate(-8deg) scale(1.04)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
