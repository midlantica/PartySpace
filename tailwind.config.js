/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Blues — darkest to lightest
        'ps-blue-darkest':  '#0f2255',
        'ps-blue-dark':     '#1a3a8f',
        'ps-blue':          '#2563eb',
        'ps-blue-mid':      '#3b82f6',
        'ps-blue-light':    '#dbeafe',
        'ps-blue-lightest': '#eff6ff',
        // Greens
        'ps-green':         '#16a34a',
        'ps-green-light':   '#dcfce7',
        // Grays
        'ps-gray':          '#6b7280',
        'ps-gray-light':    '#f3f4f6',
        'ps-gray-dark':     '#374151',
      },
      backgroundImage: {
        'ps-blue-gradient':  'linear-gradient(to bottom, #2a52c9 0%, #1a3a8f 50%, #0f2255 100%)',
        'ps-green-gradient': 'linear-gradient(to bottom, #3d8b3d 0%, #2d6a2d 50%, #1b3f1b 100%)',
      },
      fontFamily: {
        sans: ['Dosis', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
