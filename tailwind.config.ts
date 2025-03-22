
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
        // Custom brand colors - updated to match Motia blue tones
        nia: {
          '50': '#e6f7ff',
          '100': '#b3e7ff',
          '200': '#80d6ff',
          '300': '#4dc6ff',
          '400': '#1ab6ff',
          '500': '#00a6f5',
          '600': '#0085cc',
          '700': '#0064a3',
          '800': '#00447a',
          '900': '#002651',
          '950': '#001733',
        },
        motia: {
          '50': '#e6f9ff',
          '100': '#cceeff',
          '200': '#99ddff',
          '300': '#66cbff',
          '400': '#33baff',
          '500': '#00a9ff',
          '600': '#0087cc',
          '700': '#006699',
          '800': '#004466',
          '900': '#002233',
          '950': '#001119',
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
        waveAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'wave-bg': 'waveAnimation 15s ease infinite',
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        motia: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'wave-pattern': "url('/public/lovable-uploads/091d74e9-e1ae-406b-8b54-9aaa3d328542.png')",
        'motia-gradient': "linear-gradient(135deg, #004466 0%, #0087cc 50%, #33baff 100%)",
      },
      typography: {
        nia: {
          css: {
            '--tw-prose-body': 'hsl(260 10% 30%)',
            '--tw-prose-headings': 'hsl(260 10% 10%)',
            '--tw-prose-lead': 'hsl(260 10% 40%)',
            '--tw-prose-links': 'hsl(196 100% 45%)',
            '--tw-prose-bold': 'hsl(260 10% 10%)',
            '--tw-prose-counters': 'hsl(260 10% 40%)',
            '--tw-prose-bullets': 'hsl(260 10% 50%)',
            '--tw-prose-hr': 'hsl(260 10% 90%)',
            '--tw-prose-quotes': 'hsl(260 10% 10%)',
            '--tw-prose-quote-borders': 'hsl(196 100% 85%)',
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
              color: 'hsl(196 100% 35%)',
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
