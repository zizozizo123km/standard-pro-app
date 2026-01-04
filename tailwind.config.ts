/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))', // Typically white/light gray
        foreground: 'hsl(var(--foreground))', // Typically black/dark gray

        // Facebook/Meta Primary Colors
        primary: {
          DEFAULT: 'hsl(var(--primary))', // Facebook Blue (e.g., #1877F2)
          foreground: 'hsl(var(--primary-foreground))', // White
          'faded': 'hsl(var(--primary-faded))', // Lighter blue for backgrounds/hovers
        },

        // Facebook-specific shades and semantic colors
        'fb-blue': {
          DEFAULT: '#1877F2',
          light: '#E7F3FF', // Very light blue for background sections
          dark: '#166BE3',
        },
        'fb-gray': {
          DEFAULT: '#F0F2F5', // Standard light gray background color
          medium: '#BCC0C4', // Icons/Borders
          dark: '#606770', // Text/Icons secondary
        },
        'fb-green': '#38AF00', // Success/Post Button
        'fb-red': '#FA383E', // Error/Alert

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'Inter', // Modern, clean font (often used as substitute for system font in web projects)
          ...fontFamily.sans
        ],
        // Optionally define a system font stack to mimic native Facebook feel more closely
        system: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Custom loading/skeleton animation
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        // Custom fade/slide for Feed
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite linear',
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'fb-card': '0 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for posts/cards
        'fb-header': '0 0 4px rgba(0, 0, 0, 0.15)', // Header/Nav bar shadow
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;