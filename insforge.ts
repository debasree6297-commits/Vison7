/**
 * Insforge backend client for AI (Image Studio, Chat Studio).
 * API keys are never exposed in the frontend — all AI calls go through Insforge edge functions.
 */
import { createClient } from '@insforge/sdk';

const baseUrl = import.meta.env.VITE_INSFORGE_BASE_URL || 'https://k44png3v.ap-southeast.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || '';

export const insforge = createClient({
  baseUrl,
  anonKey: anonKey || undefined,
});

export default insforge;
