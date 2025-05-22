/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'smoke-texture': "url('https://images.pexels.com/photos/5702341/pexels-photo-5702341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'silhouette-1': "url('https://images.pexels.com/photos/7648212/pexels-photo-7648212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'silhouette-2': "url('https://images.pexels.com/photos/5558237/pexels-photo-5558237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'cyber-grid': "linear-gradient(to right, rgba(157, 78, 221, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(157, 78, 221, 0.1) 1px, transparent 1px)",
        'neon-glow': "radial-gradient(circle at center, rgba(157, 78, 221, 0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'neon-highlight': '0 0 20px rgba(157, 78, 221, 0.5), inset 0 0 20px rgba(157, 78, 221, 0.5)',
        'cyber-glow': '0 0 15px rgba(157, 78, 221, 0.3), 0 0 30px rgba(157, 78, 221, 0.2), 0 0 45px rgba(157, 78, 221, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slow-reverse': 'float 6s ease-in-out infinite reverse',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cyber-grid': 'cyber-grid 20s linear infinite',
        'neon-flicker': 'neonFlicker 2s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { filter: 'brightness(1) blur(0)' },
          '100%': { filter: 'brightness(1.2) blur(2px)' },
        },
        'cyber-grid': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        'neonFlicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        'scanLine': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      colors: {
        'shadow-black': '#0a0a0a',
        'shadow-dark': '#121214',
        'neon-blue': '#00AAFF',
        'neon-violet': '#9D4EDD',
        'neon-red': '#FF3864',
      },
      filter: {
        'drop-shadow-glow-blue': 'drop-shadow(0 0 5px rgba(0, 170, 255, 0.5))',
        'drop-shadow-glow-violet': 'drop-shadow(0 0 5px rgba(157, 78, 221, 0.5))',
        'drop-shadow-glow-red': 'drop-shadow(0 0 5px rgba(255, 56, 100, 0.5))',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundSize: {
        'auto-40': '40px 40px',
      },
    },
  },
  plugins: [],
};