
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

// Load defaults as needed
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // Custom brand colors for Nia
        nia: {
          '50': '#f4f2f7',
          '100': '#e7e1f1',
          '200': '#d4c8e3',
          '300': '#b8a2d0',
          '400': '#9c7dbc',
          '500': '#885eab',
          '600': '#7a4b9d',
          '700': '#663d85',
          '800': '#55346d',
          '900': '#432953',
          '950': '#2a1a34',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        nia: {
          css: {
            '--tw-prose-body': 'hsl(260 10% 30%)',
            '--tw-prose-headings': 'hsl(260 10% 10%)',
            '--tw-prose-lead': 'hsl(260 10% 40%)',
            '--tw-prose-links': 'hsl(282 69% 25%)',
            '--tw-prose-bold': 'hsl(260 10% 10%)',
            '--tw-prose-counters': 'hsl(260 10% 40%)',
            '--tw-prose-bullets': 'hsl(260 10% 50%)',
            '--tw-prose-hr': 'hsl(260 10% 90%)',
            '--tw-prose-quotes': 'hsl(260 10% 10%)',
            '--tw-prose-quote-borders': 'hsl(282 69% 85%)',
            '--tw-prose-captions': 'hsl(260 10% 40%)',
            '--tw-prose-code': 'hsl(260 10% 10%)',
            '--tw-prose-pre-code': 'hsl(260 10% 95%)',
            '--tw-prose-pre-bg': 'hsl(260 10% 15%)',
            '--tw-prose-th-borders': 'hsl(260 10% 80%)',
            '--tw-prose-td-borders': 'hsl(260 10% 90%)',
            
            // Base
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
            
            // Spacing
            'h2, h3': {
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            'h4, h5, h6': {
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            
            // Typography
            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            h1: {
              fontSize: '2.5em',
              lineHeight: '1.3',
            },
            h2: {
              fontSize: '1.75em',
              lineHeight: '1.4',
            },
            h3: {
              fontSize: '1.4em',
              lineHeight: '1.4',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a:hover': {
              color: 'hsl(282 69% 35%)',
            },
            'ul, ol': {
              paddingLeft: '1.5em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            blockquote: {
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              paddingLeft: '1em',
              marginLeft: 0,
              marginRight: 0,
            },
          },
        },
      },
    },
  },
  plugins: [
    animatePlugin,
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

export default config;
