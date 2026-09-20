// Base URL for the Express backend API
// In production (Vercel), set NEXT_PUBLIC_API_URL in your Vercel Project Settings.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
