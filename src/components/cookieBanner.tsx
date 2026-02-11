'use client';

import { useEffect } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';

export default function CookieBanner() {
  useEffect(() => {
    const consent = Cookies.get('blogCookieConsent');
    if (consent === 'true' && typeof window !== 'undefined') {
      console.log('Analytics enabled');
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      console.log('Analytics enabled');
    }
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      console.log('Analytics disabled');
    }
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="blogCookieConsent"
      sameSite="strict"
      cookieSecurity={true}
      enableDeclineButton
      expires={365}
      onAccept={handleAccept}
      onDecline={handleDecline}
      style={{ background: '#1a1a1a', padding: '16px' }}
      buttonStyle={{ background: '#10b981', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
      declineButtonStyle={{ background: 'transparent', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: '1px solid #444' }}
    >
      This site uses cookies for analytics. <a href="/privacy" className="underline text-green-400">Privacy Policy</a>
    </CookieConsent>
  );
}
