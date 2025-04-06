'use client';

import dynamic from 'next/dynamic';

const AnimatedQRCode = dynamic(() => import('./AnimatedQRCode'), {
  ssr: false
});

export default function QRCodeWrapper() {
  return <AnimatedQRCode />;
} 