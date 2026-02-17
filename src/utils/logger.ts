
import pino from 'pino';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';


const SENSITIVE_KEYS = ['password', 'token', 'secret', 'auth', 'cookie'];
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: SENSITIVE_KEYS.map(k => `meta.${k}`),
    remove: true,
    censor: '[REDACTED]',
  },
  base: null,
});

export default logger;
