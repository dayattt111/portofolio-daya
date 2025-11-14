import { useEffect, useRef, useState } from 'react';

interface ScrollColor3DProps {
  children?: React.ReactNode;
}

const neonColors = [
  '#00E5FF',
  '#00D4FF',
  '#00C3FF',
  '#00A3FF',
  '#0083FF',
  '#0063FF',
];

export default function ScrollColor3D({ children }: ScrollColor3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState(neonColors[0]);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      const newColorIndex = Math.floor(scrollPercent * (neonColors.length - 1));
      setCurrentColor(neonColors[newColorIndex]);

      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = window.innerHeight / 2;
      const rotationX = (elementCenter - screenCenter) * 0.01;

      setRotation({
        x: rotationX,
        y: (window.scrollY % 360) * 0.1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateZ(${rotation.y % 360}deg)`,
        transition: 'transform 0.3s ease-out, color 0.6s ease-out',
        color: currentColor,
        textShadow: `0 0 20px ${currentColor}80`,
      }}
    >
      {children}
    </div>
  );
}
