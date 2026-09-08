import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
const anonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] as string | undefined;

let client: SupabaseClient | null = null;

export const isSupabaseConfigured = Boolean(url && anonKey);

export function getSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error("missing_public_config");
  }
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
