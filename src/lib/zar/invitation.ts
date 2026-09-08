import { getSupabase, isSupabaseConfigured } from "./supabase";

export type LifecycleState = "live" | "fallback" | "not_found";

export interface ZarContact {
  name?: string | null;
  relation?: string | null;
  phone?: string | null;
  whatsapp_url?: string | null;
}

export interface ZarEvent {
  name?: string | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  venue?: string | null;
  note?: string | null;
}

export interface ZarInvitationContent {
  invocation?: string | null;
  groom_name?: string | null;
  bride_name?: string | null;
  groom_photo?: string | null;
  bride_photo?: string | null;
  groom_qualification?: string | null;
  bride_qualification?: string | null;
  groom_occupation?: string | null;
  bride_occupation?: string | null;
  groom_parents?: string | null;
  bride_parents?: string | null;
  relatives?: string[] | null;
  invitation_message?: string | null;
  wedding_date?: string | null;
  invitation_start?: string | null;
  invitation_end?: string | null;
  events?: ZarEvent[] | null;
  venue_name?: string | null;
  venue_address?: string | null;
  venue_city?: string | null;
  venue_maps_url?: string | null;
  venue_image?: string | null;
  gallery?: string[] | null;
  music_enabled?: boolean | null;
  music_url?: string | null;
  contacts?: ZarContact[] | null;
  qr_label?: string | null;
}

export interface ZarPayload {
  state: LifecycleState;
  brand_name?: string | null;
  public_url?: string | null;
  fallback_message?: string | null;
  content?: ZarInvitationContent | null;
}

/** Safely decode the final non-empty pathname segment. */
export function readSlug(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const raw = segments[segments.length - 1];
  if (!raw) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  decoded = decoded.trim();
  if (!decoded || decoded.includes("/") || decoded.includes("\\")) return null;
  return decoded;
}

function unwrap(value: unknown): Record<string, unknown> | null {
  let node = value;
  if (Array.isArray(node)) node = node[0];
  if (!node || typeof node !== "object") return null;
  const record = node as Record<string, unknown>;
  if (
    record['data'] &&
    typeof record['data'] === "object" &&
    !Array.isArray(record['data']) &&
    !("state" in record)
  ) {
    return record['data'] as Record<string, unknown>;
  }
  return record;
}

function pick<T>(record: Record<string, unknown>, keys: string[]): T | undefined {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value as T;
  }
  return undefined;
}

export function normalizePayload(raw: unknown): ZarPayload {
  const record = unwrap(raw);
  if (!record) return { state: "not_found" };

  const stateValue = String(
    pick<string>(record, ["state", "lifecycle", "lifecycle_state", "status"]) ?? "",
  ).toLowerCase();

  const state: LifecycleState =
    stateValue === "live"
      ? "live"
      : stateValue === "fallback"
        ? "fallback"
        : stateValue === "not_found" || stateValue === "notfound" || stateValue === ""
          ? "not_found"
          : "not_found";

  const invitation = (pick<Record<string, unknown>>(record, ["invitation"]) ?? {}) as Record<
    string,
    unknown
  >;
  const shop = (pick<Record<string, unknown>>(record, ["shop", "brand"]) ?? {}) as Record<
    string,
    unknown
  >;

  const brand_name =
    pick<string>(record, ["brand_name", "shop_brand_name", "shop_display_name", "brand"]) ??
    pick<string>(shop, ["brand_name", "display_name", "name"]) ??
    pick<string>(invitation, ["brand_name", "shop_brand_name"]) ??
    null;

  const public_url =
    pick<string>(invitation, ["public_url"]) ?? pick<string>(record, ["public_url"]) ?? null;

  const content =
    (pick<ZarInvitationContent>(record, ["content", "invitation_content"]) as
      | ZarInvitationContent
      | undefined) ??
    (pick<ZarInvitationContent>(invitation, ["content"]) as ZarInvitationContent | undefined) ??
    null;

  return {
    state,
    brand_name,
    public_url,
    fallback_message:
      pick<string>(record, ["fallback_message", "message"]) ??
      pick<string>(shop, ["fallback_message", "tagline"]) ??
      null,
    content: state === "live" ? (content ?? null) : null,
  };
}

export async function fetchInvitation(slug: string): Promise<ZarPayload> {
  if (!isSupabaseConfigured) throw new Error("missing_public_config");
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("get_public_invitation_content", {
    p_slug: slug,
  });
  if (error) throw error;
  return normalizePayload(data);
}
