'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "Sign in to Telegram": "Sign in to Telegram",
    "Please confirm your country and enter your phone number.": "Please confirm your country and enter your phone number.",
    "Search country or code": "Search country or code",
    "Phone Number": "Phone Number",
    "Keep me signed in": "Keep me signed in",
    "NEXT": "NEXT",
    "Enter Code": "Enter Code",
    "We've sent the code to": "We've sent the code to",
    "Code": "Code",
    "QR CODE LOGIN": "QR CODE LOGIN",
    "CONTINUE IN RUSSIAN": "ПРОДОЛЖИТЬ НА РУССКОМ",
    "Log in to Telegram by QR Code": "Log in to Telegram by QR Code",
    "Open Telegram on your phone": "Open Telegram on your phone",
    "Go to Settings > Devices > Link Desktop Device": "Go to Settings > Devices > Link Desktop Device",
    "Point your phone at this screen to confirm login": "Point your phone at this screen to confirm login",
    "LOG IN BY PHONE NUMBER": "LOG IN BY PHONE NUMBER",
  },
  ru: {
    "Sign in to Telegram": "Вход в Telegram",
    "Please confirm your country and enter your phone number.": "Пожалуйста, подтвердите страну и введите номер телефона.",
    "Search country or code": "Поиск страны или кода",
    "Phone Number": "Номер телефона",
    "Keep me signed in": "Оставаться в системе",
    "NEXT": "ДАЛЕЕ",
    "Enter Code": "Введите код",
    "We've sent the code to": "Мы отправили код на номер",
    "Code": "Код",
    "QR CODE LOGIN": "ВХОД ПО QR-КОДУ",
    "CONTINUE IN RUSSIAN": "ПРОДОЛЖИТЬ НА РУССКОМ",
    "Log in to Telegram by QR Code": "Войти в Telegram по QR-коду",
    "Open Telegram on your phone": "Откройте Telegram на телефоне",
    "Go to Settings > Devices > Link Desktop Device": "Перейдите в Настройки > Устройства > Подключить устройство",
    "Point your phone at this screen to confirm login": "Наведите камеру телефона на этот экран",
    "LOG IN BY PHONE NUMBER": "ВОЙТИ ПО НОМЕРУ ТЕЛЕФОНА",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 