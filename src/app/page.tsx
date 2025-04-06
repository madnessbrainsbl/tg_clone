'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const QRCodeWrapper = dynamic(() => import('@/components/QRCodeWrapper'), {
  ssr: false
});

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-[360px] w-full">
        <div className="mb-8">
          <QRCodeWrapper />
        </div>

        <h1 className="text-[22px] font-bold mb-6 text-gray-900">
          {t('Log in to Telegram by QR Code')}
        </h1>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#3390EC] text-white flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div className="text-[15px] text-gray-900">
              {t('Open Telegram on your phone')}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#3390EC] text-white flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div className="text-[15px] text-gray-900">
              Go to <span className="font-bold">Settings</span> {' > '} <span className="font-bold">Devices</span> {' > '} <span className="font-bold">Link Desktop Device</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#3390EC] text-white flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div className="text-[15px] text-gray-900">
              {t('Point your phone at this screen to confirm login')}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <Link 
            href="/phone" 
            className="text-[#3390EC] hover:underline text-sm inline-block uppercase"
          >
            {t('LOG IN BY PHONE NUMBER')}
          </Link>

          <button 
            onClick={toggleLanguage}
            className="text-[#3390EC] hover:underline text-sm inline-block uppercase"
          >
            {t('CONTINUE IN RUSSIAN')}
          </button>
        </div>
      </div>
    </main>
  );
}
