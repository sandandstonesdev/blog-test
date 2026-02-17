import pino from 'pino';

const SENSITIVE_KEYS = ['password', 'token', 'secret', 'auth', 'cookie'];
const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      level: 'info',
      send: (level, logEvent) => {
        const msg = logEvent.messages[0];
        const body = JSON.stringify({ level, message: msg });
        navigator.sendBeacon('/api/client-log', body);
      }
    }
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: SENSITIVE_KEYS.map(k => `meta.${k}`),
    remove: true,
    censor: '[REDACTED]',
  },
});

export default logger;