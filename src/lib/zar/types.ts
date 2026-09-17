export type LifecycleState = "live" | "fallback" | "not_found" | "error";

export interface ZarContact {
  name?: string | null;
  relation?: string | null;
  phone?: string | null;
  whatsapp_url?: string | null;
  photo_url?: string | null;
}

export interface ZarEvent {
  name?: string | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  description?: string | null;
  venue?: string | null;
}

export interface ZarPerson {
  name?: string | null;
  photo_url?: string | null;
  qualification?: string | null;
  occupation?: string | null;
  father?: string | null;
  mother?: string | null;
  parents?: string | null;
}

export interface ZarVenue {
  name?: string | null;
  address?: string | null;
  city?: string | null;
  maps_url?: string | null;
  image_url?: string | null;
}

export interface ZarMusic {
  enabled?: boolean | null;
  url?: string | null;
  title?: string | null;
}

export interface ZarContent {
  invocation?: string | null;
  invitation_start?: string | null;
  invitation_end?: string | null;
  wedding_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  message?: string | null;
  groom?: ZarPerson | null;
  bride?: ZarPerson | null;
  relatives?: Array<string | { name?: string | null; relation?: string | null }> | null;
  events?: ZarEvent[] | null;
  venue?: ZarVenue | null;
  gallery?: Array<string | { url?: string | null; caption?: string | null }> | null;
  music?: ZarMusic | null;
  contacts?: ZarContact[] | null;
  qr_label?: string | null;
}

export interface ZarInvitation {
  slug?: string | null;
  public_url?: string | null;
  content?: ZarContent | null;
}

export interface ZarBrand {
  /** Approved public display field for the shop/brand strip. */
  display_name?: string | null;
  tagline?: string | null;
}

export interface ZarPayload {
  state: LifecycleState;
  invitation?: ZarInvitation | null;
  brand?: ZarBrand | null;
  fallback?: {
    name?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    address?: string | null;
    city?: string | null;
    business_contact?: string | null;
  } | null;
  /** dev-only visual testing marker */
  isDevPlaceholder?: boolean;
}
