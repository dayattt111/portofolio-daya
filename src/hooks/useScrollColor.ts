import { useEffect, useRef, useState } from 'react';

const neonColors = [
  '#00E5FF',
  '#00D4FF',
  '#00C3FF',
  '#00A3FF',
  '#0083FF',
  '#0063FF',
];

export const useScrollColor = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      const newColorIndex = Math.floor(scrollPercent * (neonColors.length - 1));
      if (newColorIndex !== scrollPositionRef.current) {
        scrollPositionRef.current = newColorIndex;
        setColorIndex(newColorIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return neonColors[colorIndex];
};
