import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsPointerDevice(hasPointer);
    if (!hasPointer) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });

      // Detect hover target attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, [data-interactive="true"]');
        setIsHovered(!!interactive);
        
        const label = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        setCursorText(label || '');
      }
    };

    const animateTrailing = () => {
      // Lerp trailing cursor for inertia smoothness
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animateTrailing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-crimson scale-150' : 'bg-white'}`} />
      </div>

      {/* Trailing cinematic reticle */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? (cursorText ? '80px' : '48px') : '28px',
          height: isHovered ? (cursorText ? '80px' : '48px') : '28px',
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-300 flex items-center justify-center ${
            isHovered
              ? 'border-crimson/80 bg-crimson/10 scale-100 backdrop-blur-[1px]'
              : 'border-white/20 scale-90'
          }`}
        >
          {cursorText && (
            <span className="text-[9px] font-mono tracking-widest text-crimson font-bold uppercase select-none">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
