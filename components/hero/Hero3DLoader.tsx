"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => <GlowPlaceholder />,
});

function GlowPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="w-[60vmin] h-[60vmin] max-w-[520px] max-h-[520px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle at 35% 35%, var(--color-glow-from), var(--color-glow-to) 70%, transparent 100%)',
          animation: 'glow-pulse 6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero3DLoader() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglAvailable(hasWebGL());
  }, []);

  // No WebGL support: permanent CSS-only fallback instead of hoping R3F degrades gracefully.
  if (webglAvailable === false) {
    return <GlowPlaceholder />;
  }

  return <HeroScene3D />;
}
