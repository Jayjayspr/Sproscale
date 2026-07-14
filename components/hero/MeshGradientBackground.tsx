"use client";

import { useEffect, useRef } from 'react';

export default function MeshGradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const handleMove = (e: MouseEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const el = containerRef.current;
        if (!el) return;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="mesh-parallax mesh-parallax-a">
        <div className="mesh-blob mesh-blob-a" />
      </div>
      <div className="mesh-parallax mesh-parallax-b">
        <div className="mesh-blob mesh-blob-b" />
      </div>
      <div className="mesh-parallax mesh-parallax-c">
        <div className="mesh-blob mesh-blob-c" />
      </div>
      <div className="mesh-parallax mesh-parallax-d">
        <div className="mesh-blob mesh-blob-d" />
      </div>
    </div>
  );
}
