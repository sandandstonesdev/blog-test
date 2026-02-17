

'use client';
import { useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';


export default function CookieBanner() {
  const [analytics, setAnalytics] = useState(false);
  const [telemetry, setTelemetry] = useState(false);

    return (
      <CookieConsent
        location="bottom"
        buttonText="Save Preferences"
        containerClasses="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg px-2 py-4 sm:px-4 sm:py-6"
        contentClasses="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between max-w-5xl mx-auto"
        buttonClasses="btn-primary text-sm sm:text-base"
        expires={365}
        sameSite="strict"
        cookieSecurity={true}
        enableDeclineButton
        declineButtonText="Decline"
        declineButtonClasses="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ml-2 text-sm sm:text-base"
        onAccept={async () => {
          Cookies.set('analyticsConsent', analytics ? 'true' : 'false', { sameSite: 'strict', secure: true });
          Cookies.set('telemetryConsent', telemetry ? 'true' : 'false', { sameSite: 'strict', secure: true });
          try {
            await fetch('/api/telemetry-consent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ consent: telemetry }),
            });
          } catch (e) {
            // Optionally handle error
            console.error('Failed to update telemetry consent', e);
          }
        }}
      >
        <div className="max-w-2xl text-gray-900 dark:text-gray-100">
          <div className="mb-2 text-base font-semibold">Your Privacy Matters</div>
          <div className="text-sm mb-2 leading-relaxed">
            We use cookies to remember your preferences and to enable optional analytics and telemetry for improving our website. You can change your choices at any time. For more details, see our{' '}
            <Link href="/privacy" className="link-underline">Privacy Policy</Link>.
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={analytics}
                onChange={e => setAnalytics(e.target.checked)}
                className="accent-blue-600 w-4 h-4"
                aria-label="Enable analytics cookies"
              />
              Analytics cookies
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={telemetry}
                onChange={e => setTelemetry(e.target.checked)}
                className="accent-blue-600 w-4 h-4"
                aria-label="Enable telemetry cookies"
              />
              Telemetry cookies
            </label>
          </div>
        </div>
      </CookieConsent>
    );
}
