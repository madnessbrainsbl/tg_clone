'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const AnimatedQRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, 'https://t.me/login', {
        width: 280,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }
  }, []);

  return (
    <div className="qr-container relative w-[280px] h-[280px] mx-auto">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#3390EC] flex items-center justify-center z-10">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M20.6644 3.2106L2.89955 10.5268C1.81459 10.9738 1.81801 11.4811 2.7038 11.7641L7.39415 13.2487L17.6169 6.13351C18.0609 5.86794 18.4666 6.01064 18.1335 6.30441L9.86063 13.7755L9.86131 13.7761L9.86063 13.7755V16.9903C10.2741 16.9903 10.4548 16.8005 10.6826 16.5813L12.9737 14.3467L17.7091 17.7716C18.4797 18.1995 19.0354 17.9807 19.2216 17.0046L22.3087 4.30153C22.5864 3.13613 21.8788 2.62472 20.6644 3.2106Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedQRCode; 