'use client'

import dynamic from 'next/dynamic';

const PixiCanvas = dynamic(() => import('@/components/PixiCanvas'), { ssr: false });

export default function Home() {
  return (
    <main>
      <PixiCanvas />
    </main>
  );
}
