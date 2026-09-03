/**
 * MYVETA SEO SETTINGS
 *
 * Netlify automatically provides its production URL through `URL`.
 * If you later connect a custom domain, set `NEXT_PUBLIC_SITE_URL` in
 * Netlify to that complete address, for example:
 * https://www.myveta-example.com
 *
 * The fallback below is used only when neither environment value exists.
 */
const DEFAULT_SITE_URL = "https://splendorous-meerkat-209edf.netlify.app";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    vercelProductionUrl ||
    DEFAULT_SITE_URL,
);

export const SITE_NAME = "MyVeta";
export const SITE_ALTERNATE_NAMES = [
  "My Veta",
  "MyVeta Health",
  "MyVeta Senior Health",
];
export const SITE_TITLE =
  "MyVeta | Trusted Health Guidance for Adults 50+";
export const SITE_DESCRIPTION =
  "Clear, reliable health information for adults over 50, covering common conditions, medicines, nutrition, fitness, prevention, and everyday well-being.";

/**
 * After Google Search Console gives you a verification code, add it in
 * Netlify as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Do not paste the full
 * HTML meta tag; paste only the code inside its `content` quotation marks.
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
