import { Analytics } from '@vercel/analytics/react';
import { cookies } from 'next/headers';

export default async function AnalyticsCookieGate() {
  const cookieStore = await cookies();
  const analyticsConsent = cookieStore.get('analyticsConsent');
  if (analyticsConsent?.value !== 'true') return null;
    
  return <Analytics />;
}
