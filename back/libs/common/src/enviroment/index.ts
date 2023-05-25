import { resolve } from 'node:path';
import { config } from 'dotenv';

config({
  path: resolve(__dirname, '..', '.env'),
});

export const APP_PORT: number = Number(process.env.APP_PORT) || 3001;
export const STEAM_API_KEY: string = process.env.STEAM_API_KEY;
export const AES_SECRET: string = process.env.AES_SECRET;
