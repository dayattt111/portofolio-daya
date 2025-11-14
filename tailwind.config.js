/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'retro-dark': '#0a0e27',
        'retro-darker': '#050812',
        'neon-cyan': '#00ff88',
        'neon-pink': '#ff006e',
        'neon-purple': '#b537f2',
        'neon-yellow': '#ffbe0b',
        'neon-orange': '#ff006e',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'cursive'],
        'retro': ['VT323', 'monospace'],
      },
      animation: {
        'pixel-bounce': 'pixelBounce 0.6s ease-in-out infinite',
        'pixel-pulse': 'pixelPulse 1.5s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'retro-glow': 'retroGlow 2s ease-in-out infinite',
        'scan-line': 'scanlineMove 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pixelPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        retroGlow: {
          '0%, 100%': { 
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(255, 0, 110, 0.3)',
          },
          '50%': { 
            textShadow: '0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(255, 0, 110, 0.5)',
          },
        },
        scanlineMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
