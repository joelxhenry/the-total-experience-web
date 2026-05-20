/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'caption': ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'body': ['1rem', { lineHeight: '1.65rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'h4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '2.4rem', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '2.9rem', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display': ['3.5rem', { lineHeight: '3.75rem', letterSpacing: '-0.025em', fontWeight: '800' }]
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          muted: '#f1f5f9',
          elevated: '#ffffff',
          dark: '#0f172a',
          'dark-subtle': '#111827',
          'dark-muted': '#1e293b',
          'dark-elevated': '#1f2937'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
        'accent-gradient-soft': 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        'card-lg': '0 10px 30px -10px rgb(15 23 42 / 0.15)'
      }
    },
  },
  plugins: [],
}
