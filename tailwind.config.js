/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        'ps-purple': '#7c3aed',
        'ps-purple-dark': '#5b21b6',
        'ps-purple-light': '#ede9fe',
        'ps-blue': '#2563eb',
        'ps-blue-light': '#dbeafe',
        'ps-green': '#16a34a',
        'ps-green-light': '#dcfce7',
        'ps-gray': '#6b7280',
        'ps-gray-light': '#f3f4f6',
        'ps-gray-dark': '#374151',
      },
      fontFamily: {
        sans: ['Dosis', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
