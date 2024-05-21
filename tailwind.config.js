/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit', // allow to update CSS classes automatically when a file is updated (watch mode). See below
  content: {
    files: [
      './src/**/*.{html,ts,tsx}', // scan for these files in the solution
    ]
  },
  corePlugins: {
    preflight: false, // to avoid conflict with base SPFx styles otherwise (ex: buttons background-color)
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
      extend: {
        fontFamily: {
          sans: ['var(--myWebPart-fontPrimary)', 'Roboto', ...defaultTheme.fontFamily.sans]
        },
        colors: {
          /* light/dark is controlled by the theme values at WebPart level */
          primary: "var(--myWebPart-primary, #7C4DFF)",
          background: "var(--myWebPart-background, #F3F5F6)",
          link: "var(--myWebPart-link, #1E252B)",
          linkHover: "var(--myWebPart-linkHover, #1E252B)",
          bodyText: "var(--myWebPart-bodyText, #1E252B)"
        },
        extend: {
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
          },
          borderRadius: {
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: "calc(var(--radius) - 4px)",
          },
          // fontFamily: {
          //   sans: ["var(--font-sans)", ...fontFamily.sans],
          // },
          keyframes: {
            "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // to be able to style inputs
    [require("tailwindcss-animate")],
  ],
};