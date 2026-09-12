import * as dotenv from 'dotenv';

// Load .env if present (playwright.config.ts also loads dotenv, this is safe)
dotenv.config();
export const credentials={
    standard_user: process.env.STANDARD_USER ?? '',
    standard_pass: process.env.STANDARD_PASS ?? '',
}as const;
// export const STANDARD_USER = process.env.STANDARD_USER ?? '';
// export const STANDARD_PASS = process.env.STANDARD_PASS ?? '';

// export function getStandardCredentials() {
//   return { username: STANDARD_USER, password: STANDARD_PASS };
// }

// export default {
//   STANDARD_USER,
//   STANDARD_PASS,
//   getStandardCredentials,
// };
