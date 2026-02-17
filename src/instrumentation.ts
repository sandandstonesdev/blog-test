import { registerOTel } from '@vercel/otel';

export function register() {
  if (process.env.VERCEL_OTEL_DISABLED !== 'true') {
    //registerOTel({
    //  serviceName: 'next-app',
    //});
  }
}