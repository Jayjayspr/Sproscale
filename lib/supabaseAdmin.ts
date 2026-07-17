import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

// Server-only client met de service-role key. Omzeilt RLS — gebruik alleen
// in API-routes die de sessie eerst met verifyAdminRequest() controleren.
//
// Lazy: de client wordt pas aangemaakt bij de eerste échte aanroep, niet bij
// het importeren van deze module. Next.js voert module-top-level code soms
// uit tijdens `next build` (route-analyse) — als createClient() daar direct
// zou draaien en de env var ontbreekt, crasht dat de hele productie-build
// in plaats van alleen deze route bij gebruik.
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY of NEXT_PUBLIC_SUPABASE_URL ontbreekt in de serveromgeving.');
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cachedClient;
}
