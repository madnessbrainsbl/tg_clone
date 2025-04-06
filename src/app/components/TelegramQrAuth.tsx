'use client';

import { useEffect, useState } from 'react';

// Simple SVG-based QR code component
const SimpleQrCode = () => {
  return (
    <div className="qr-container">
      <svg width="280" height="280" viewBox="0 0 280 280">
        {/* Background */}
        <rect width="280" height="280" fill="#f5f5f5" />

        {/* Top-left position square */}
        <rect x="28" y="28" width="56" height="56" fill="#141b26" />
        <rect x="42" y="42" width="28" height="28" fill="white" />
        <rect x="49" y="49" width="14" height="14" fill="#141b26" />

        {/* Top-right position square */}
        <rect x="196" y="28" width="56" height="56" fill="#141b26" />
        <rect x="210" y="42" width="28" height="28" fill="white" />
        <rect x="217" y="49" width="14" height="14" fill="#141b26" />

        {/* Bottom-left position square */}
        <rect x="28" y="196" width="56" height="56" fill="#141b26" />
        <rect x="42" y="210" width="28" height="28" fill="white" />
        <rect x="49" y="217" width="14" height="14" fill="#141b26" />

        {/* Data pattern - simplified representation */}
        <rect x="112" y="28" width="14" height="14" fill="#141b26" />
        <rect x="140" y="28" width="14" height="14" fill="#141b26" />
        <rect x="168" y="28" width="14" height="14" fill="#141b26" />

        <rect x="112" y="56" width="14" height="14" fill="#141b26" />
        <rect x="140" y="56" width="14" height="14" fill="#141b26" />
        <rect x="168" y="56" width="14" height="14" fill="#141b26" />

        <rect x="112" y="84" width="14" height="14" fill="#141b26" />
        <rect x="140" y="84" width="14" height="14" fill="#141b26" />
        <rect x="168" y="84" width="14" height="14" fill="#141b26" />

        <rect x="28" y="112" width="14" height="14" fill="#141b26" />
        <rect x="56" y="112" width="14" height="14" fill="#141b26" />
        <rect x="84" y="112" width="14" height="14" fill="#141b26" />
        <rect x="112" y="112" width="14" height="14" fill="#141b26" />
        <rect x="168" y="112" width="14" height="14" fill="#141b26" />
        <rect x="196" y="112" width="14" height="14" fill="#141b26" />
        <rect x="224" y="112" width="14" height="14" fill="#141b26" />

        <rect x="28" y="140" width="14" height="14" fill="#141b26" />
        <rect x="84" y="140" width="14" height="14" fill="#141b26" />
        <rect x="140" y="140" width="14" height="14" fill="#141b26" />
        <rect x="196" y="140" width="14" height="14" fill="#141b26" />

        <rect x="28" y="168" width="14" height="14" fill="#141b26" />
        <rect x="84" y="168" width="14" height="14" fill="#141b26" />
        <rect x="112" y="168" width="14" height="14" fill="#141b26" />
        <rect x="140" y="168" width="14" height="14" fill="#141b26" />
        <rect x="168" y="168" width="14" height="14" fill="#141b26" />
        <rect x="224" y="168" width="14" height="14" fill="#141b26" />

        <rect x="112" y="196" width="14" height="14" fill="#141b26" />
        <rect x="140" y="196" width="14" height="14" fill="#141b26" />
        <rect x="196" y="196" width="14" height="14" fill="#141b26" />

        <rect x="112" y="224" width="14" height="14" fill="#141b26" />
        <rect x="140" y="224" width="14" height="14" fill="#141b26" />
        <rect x="168" y="224" width="14" height="14" fill="#141b26" />
        <rect x="196" y="224" width="14" height="14" fill="#141b26" />
        <rect x="224" y="224" width="14" height="14" fill="#141b26" />
      </svg>
    </div>
  );
};

export default function TelegramQrAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setLoadingVisible(false);
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleAuth = () => {
    setIsPhoneAuth(!isPhoneAuth);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the phone number to Telegram's servers
    alert(`Phone number ${phoneNumber} would be sent to Telegram for verification.`);
  };

  return (
    <div className="auth-background">
      <div className="auth-form">
        {!isPhoneAuth ? (
          <div id="auth-qr-form">
            <div className="qr-outer">
              <div className={`qr-inner opacity-transition ${isLoading ? 'not-shown' : 'shown'}`}>
                <SimpleQrCode />
                <div className="qr-plane">
                  <svg viewBox="0 0 24 24" width="54" height="54">
                    <path
                      fill="#2AABEE"
                      d="M10.6 13.4c.2.2.4.3.6.3.2 0 .4-.1.6-.3l1.8-1.8c.3-.3.5-.7.5-1.1s-.2-.8-.5-1.1L12 8c-.6-.6-1.5-.6-2.1 0L8.1 9.8c-.6.6-.6 1.5 0 2.1l2.5 1.5z">
                    </path>
                    <path
                      fill="#2AABEE"
                      d="M19.5 4.6l-1.8-1.8c-.6-.6-1.5-.6-2.1 0L4.6 13.9c-.6.6-.6 1.5 0 2.1l1.8 1.8c.6.6 1.5.6 2.1 0L19.5 6.8c.6-.6.6-1.6 0-2.2z">
                    </path>
                  </svg>
                </div>
              </div>

              {loadingVisible && (
                <div className="qr-loading">
                  <div className="spinner" />
                </div>
              )}
            </div>
            <h1>Log in to Telegram by QR Code</h1>
            <ol>
              <li><span>Open Telegram on your phone</span></li>
              <li><span>Go to <b>Settings</b> &gt; <b>Devices</b> &gt; <b>Link Desktop Device</b></span></li>
              <li><span>Point your phone at this screen to confirm login</span></li>
            </ol>
          </div>
        ) : (
          <div className="phone-auth-container">
            <div className="phone-icon-container">
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path
                  fill="#2AABEE"
                  d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM21 6h-7V4h7v2zm0 4h-7V8h7v2zm0 4h-7v-2h7v2z"
                  opacity=".5">
                </path>
                <path
                  fill="#2AABEE"
                  d="M17.7 12.4c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1 .5.5.7 1.2.7 1.9 0 .7-.2 1.4-.7 1.9-.3.3-.3.7 0 1 .3.3.7.3 1 0 .8-.8 1.2-1.8 1.2-2.9 0-1.1-.4-2.2-1.2-2.9z">
                </path>
                <path
                  fill="#2AABEE"
                  d="M21 11.2c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1 1.1 1.1 1.7 2.6 1.7 4.2 0 1.6-.6 3.1-1.7 4.2-.3.3-.3.7 0 1 .3.3.7.3 1 0 1.4-1.4 2.2-3.3 2.2-5.2 0-1.9-.8-3.8-2.2-5.2z">
                </path>
              </svg>
            </div>
            <h1>Your Phone</h1>
            <p className="text-gray-500 mb-4">Please confirm your country code and enter your phone number.</p>

            <form onSubmit={handlePhoneSubmit} className="w-full">
              <div className="phone-input-container">
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-next-button">
                Next
              </button>
            </form>
          </div>
        )}

        <button className="auth-toggle-button" onClick={handleToggleAuth}>
          {isPhoneAuth
            ? 'Log in by QR Code'
            : 'Log in by Phone Number'}
        </button>
      </div>
    </div>
  );
}
