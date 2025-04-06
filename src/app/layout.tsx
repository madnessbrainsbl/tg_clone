import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: "Telegram Web",
  description: "Telegram is a cloud-based mobile and desktop messaging app with a focus on security and speed.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
