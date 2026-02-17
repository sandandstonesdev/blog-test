export const ALLOWED_ORIGINS: string[] = (process.env.CLIENT_LOG_ALLOWED_ORIGINS?.split(',') || []).map(o => o.trim());
export const LOG_SECRET: string = process.env.CLIENT_LOG_SECRET || (() => { throw new Error('LOG_SECRET is not set in environment'); })();
