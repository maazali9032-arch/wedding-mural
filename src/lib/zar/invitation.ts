import { getSupabase } from "./client";
import type { ZarContent, ZarPayload } from "./types";

const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const pick = (o: Record<string, unknown>, ...keys: string[]) =>
  keys.map((key) => str(o[key])).find(Boolean) ?? null;

function contentOf(value: unknown): ZarContent {
  const c = obj(value),
    g = obj(c["groom"]),
    b = obj(c["bride"]),
    v = obj(c["venue"]),
    m = obj(c["music"]);
  return {
    invocation: pick(c, "invocation"),
    invitation_start: pick(c, "invitation_start"),
    invitation_end: pick(c, "invitation_end"),
    wedding_date: pick(c, "wedding_date"),
    start_time: pick(c, "start_time"),
    end_time: pick(c, "end_time"),
    message: pick(c, "message"),
    groom: {
      name: pick(g, "name") ?? pick(c, "groom_name"),
      photo_url: pick(g, "photo_url") ?? pick(c, "groom_photo_url"),
      qualification: pick(g, "qualification") ?? pick(c, "groom_qualification"),
      occupation: pick(g, "occupation") ?? pick(c, "groom_occupation"),
      parents: pick(g, "parents") ?? pick(c, "groom_parents"),
      father: pick(g, "father"),
      mother: pick(g, "mother"),
    },
    bride: {
      name: pick(b, "name") ?? pick(c, "bride_name"),
      photo_url: pick(b, "photo_url") ?? pick(c, "bride_photo_url"),
      qualification: pick(b, "qualification") ?? pick(c, "bride_qualification"),
      occupation: pick(b, "occupation") ?? pick(c, "bride_occupation"),
      parents: pick(b, "parents") ?? pick(c, "bride_parents"),
      father: pick(b, "father"),
      mother: pick(b, "mother"),
    },
    relatives:
      typeof c["relatives"] === "string"
        ? [c["relatives"]]
        : (arr(c["relatives"]) as NonNullable<ZarContent["relatives"]>),
    events: arr(c["events"])
      .map((item) => {
        const e = obj(item);
        return {
          name: pick(e, "name", "title", "event_name"),
          date: pick(e, "date", "event_date"),
          time: pick(e, "time", "start_time"),
          venue: pick(e, "venue", "venue_name"),
          description: pick(e, "description", "note"),
        };
      })
      .filter((e) => e.name),
    venue: {
      name: pick(v, "name") ?? pick(c, "venue_name"),
      address: pick(v, "address") ?? pick(c, "venue_address"),
      city: pick(v, "city") ?? pick(c, "city"),
      maps_url: pick(v, "maps_url") ?? pick(c, "maps_url"),
      image_url: pick(v, "image_url") ?? pick(c, "venue_image_url"),
    },
    gallery: arr(c["gallery"])
      .map((item) =>
        typeof item === "string"
          ? item
          : {
              url: pick(obj(item), "url", "src", "image_url"),
              caption: pick(obj(item), "caption", "alt"),
            },
      )
      .filter((item) => (typeof item === "string" ? Boolean(item.trim()) : Boolean(item.url))),
    music: {
      enabled: m["enabled"] === true || c["music_enabled"] === true,
      url: pick(m, "url") ?? pick(c, "music_url"),
      title: pick(m, "title"),
    },
    contacts: arr(c["contacts"])
      .slice(0, 2)
      .map((item) => {
        const x = obj(item);
        return {
          name: pick(x, "name"),
          phone: pick(x, "phone"),
          whatsapp_url: pick(x, "whatsapp_url"),
        };
      })
      .filter((x) => x.phone),
    qr_label: pick(c, "qr_text", "qr_label"),
  };
}

function normalize(value: unknown): ZarPayload {
  let r = obj(value);
  if (!r["state"] && r["data"]) r = obj(r["data"]);
  const shop = obj(r["shop"]);
  if (r["state"] === "fallback")
    return {
      state: "fallback",
      brand: { display_name: pick(shop, "name", "display_name") },
      fallback: {
        name: pick(shop, "name"),
        phone: pick(shop, "phone"),
        whatsapp: pick(shop, "whatsapp"),
        address: pick(shop, "address"),
        city: pick(shop, "city"),
        business_contact: pick(shop, "business_contact"),
      },
    };
  if (r["state"] !== "live") return { state: "not_found" };
  const invitation = obj(r["invitation"]),
    content = r["content"] ?? invitation["content"];
  const brand = obj(r["brand"]);
  return {
    state: "live",
    invitation: { public_url: pick(invitation, "public_url"), content: contentOf(content) },
    brand: {
      display_name: pick(brand, "display_name") ?? pick(shop, "name", "display_name"),
      tagline: pick(brand, "tagline"),
    },
  };
}

export async function fetchInvitation(slug: string): Promise<ZarPayload> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("config");
  const { data, error } = await supabase.rpc("get_public_invitation_content", { p_slug: slug });
  if (error) throw new Error(error.message);
  return normalize(data);
}
