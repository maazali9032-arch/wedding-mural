import { useMemo, useRef, useState } from "react";
import { Phone, MessageCircle, MapPin, Music, Pause } from "lucide-react";
import { InkSpine } from "./InkSpine";
import { Settle } from "./Draw";
import {
  ArchNiche,
  GateMotif,
  HorizonMotif,
  PalaceMotif,
  PanoramaMotif,
  SpineKnot,
} from "./Motifs";
import { BrandTicker } from "./BrandTicker";
import { Rsvp } from "./Rsvp";
import { QrPanel } from "./QrPanel";
import type { ZarContact, ZarPayload } from "@/lib/zar/types";

const clean = (v?: string | null) => {
  const s = (v ?? "").toString().trim();
  return s.length ? s : null;
};
const safeHttp = (v?: string | null) => {
  const value = clean(v);
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
};

function galleryUrls(gallery: unknown): string[] {
  if (!Array.isArray(gallery)) return [];
  return gallery
    .map((g) => (typeof g === "string" ? g : ((g as { url?: string })?.url ?? "")))
    .map((u) => (u ?? "").trim())
    .filter((u): u is string => Boolean(safeHttp(u)));
}

function relativeNames(relatives: unknown): string[] {
  if (!Array.isArray(relatives)) return [];
  return relatives
    .map((r) => (typeof r === "string" ? r : ((r as { name?: string })?.name ?? "")))
    .map((s) => (s ?? "").trim())
    .filter(Boolean);
}

function whatsappHref(contact: ZarContact): string | null {
  const supplied = clean(contact.whatsapp_url);
  if (supplied) return safeHttp(supplied);
  const digits = (contact.phone ?? "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

function Region({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative z-10 mx-auto w-full max-w-2xl px-5 ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[0.6rem] uppercase tracking-[0.38em] text-[var(--mural-ink-soft)]">
      {children}
    </p>
  );
}

export function Invitation({ payload }: { payload: ZarPayload }) {
  const content = payload.invitation?.content ?? {};
  const groom = content.groom ?? {};
  const bride = content.bride ?? {};
  const groomName = clean(groom.name);
  const brideName = clean(bride.name);
  const venue = content.venue ?? {};
  const events = (content.events ?? []).filter((e) => clean(e?.name) || clean(e?.title));
  const gallery = useMemo(() => galleryUrls(content.gallery), [content.gallery]);
  const relatives = useMemo(() => relativeNames(content.relatives), [content.relatives]);
  const contacts = (content.contacts ?? []).filter((c) => clean(c?.phone)).slice(0, 2);
  const publicUrl = clean(payload.invitation?.public_url);
  const mapsUrl = safeHttp(venue.maps_url);
  const musicUrl = content.music?.enabled ? safeHttp(content.music?.url) : null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const parentsOf = (p: typeof groom) => {
    const combined = clean(p.parents);
    if (combined) return [combined];
    return [clean(p.father), clean(p.mother)].filter(Boolean) as string[];
  };

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <main className="zar-paper relative min-h-screen overflow-x-hidden font-body text-[var(--mural-ink)]">
      <InkSpine />
      <BrandTicker
        name={payload.brand?.display_name ?? null}
        tagline={payload.brand?.tagline ?? null}
      />

      {payload.isDevPlaceholder ? (
        <div className="relative z-40 bg-[var(--mural-rose)] px-4 py-1 text-center font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--mural-paper)]">
          Development preview — not a real invitation
        </div>
      ) : null}

      {musicUrl ? (
        <>
          <audio ref={audioRef} src={musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleMusic}
            className="zar-frame fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full bg-[var(--mural-paper)]/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] backdrop-blur"
          >
            {playing ? <Pause className="size-3" /> : <Music className="size-3" />}
            {playing ? "Pause" : "Play"}
          </button>
        </>
      ) : null}

      {/* Region 1 — entry point into the mural */}
      <Region className="flex min-h-[86svh] flex-col items-center justify-center pt-16 text-center">
        <div className="w-40 sm:w-52">
          <GateMotif />
        </div>
        {clean(content.invocation) ? (
          <Settle delay={0.9}>
            <p className="mt-6 max-w-sm font-display text-lg leading-relaxed text-[var(--mural-ink-soft)]">
              {content.invocation}
            </p>
          </Settle>
        ) : null}
        <Settle delay={1.3}>
          <p className="mt-10 font-body text-[0.6rem] uppercase tracking-[0.4em] text-[var(--mural-ink-soft)]">
            Scroll to unroll the story
          </p>
        </Settle>
      </Region>

      {/* Region 2 — the world and the names */}
      <Region className="pb-24 pt-10 text-center">
        <HorizonMotif />
        {clean(content.invitation_start) ? (
          <Settle delay={0.4}>
            <p className="mx-auto mt-8 max-w-sm font-body text-[0.65rem] uppercase leading-relaxed tracking-[0.24em] text-[var(--mural-ink-soft)]">
              {content.invitation_start}
            </p>
          </Settle>
        ) : null}

        <div className="mt-6 space-y-1">
          {groomName ? (
            <Settle delay={0.6}>
              <h1 className="break-words font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[1.05] text-[var(--mural-ink)]">
                {groomName}
              </h1>
            </Settle>
          ) : null}
          {groomName && brideName ? (
            <Settle delay={0.8}>
              <p className="font-display text-3xl italic text-[var(--mural-gold)]">&amp;</p>
            </Settle>
          ) : null}
          {brideName ? (
            <Settle delay={1}>
              <h1 className="break-words font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[1.05] text-[var(--mural-ink)]">
                {brideName}
              </h1>
            </Settle>
          ) : null}
        </div>

        {clean(content.wedding_date) ? (
          <Settle delay={1.2}>
            <p className="mt-6 font-body text-xs uppercase tracking-[0.35em] text-[var(--mural-ink-soft)]">
              {content.wedding_date}
            </p>
          </Settle>
        ) : null}
        {clean(content.start_time) || clean(content.end_time) ? (
          <p className="mt-2 text-xs tracking-widest text-[var(--mural-ink-soft)]">
            {[clean(content.start_time), clean(content.end_time)].filter(Boolean).join(" – ")}
          </p>
        ) : null}

        {[groom, bride].some((person) => safeHttp(person.photo_url)) ? (
          <div className="mx-auto mt-8 flex max-w-sm justify-center gap-5">
            {[groom, bride].map((person, index) =>
              safeHttp(person.photo_url) ? (
                <img
                  key={index}
                  src={safeHttp(person.photo_url)!}
                  alt={clean(person.name) ?? "Couple portrait"}
                  loading="lazy"
                  className="zar-frame size-28 rounded-full object-cover sm:size-36"
                />
              ) : null,
            )}
          </div>
        ) : null}

        {[groom, bride].some((p) => clean(p.qualification) || clean(p.occupation)) ? (
          <Settle delay={1.35}>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { p: groom, name: groomName },
                { p: bride, name: brideName },
              ]
                .filter((x) => x.name && (clean(x.p.qualification) || clean(x.p.occupation)))
                .map((x) => (
                  <div key={x.name} className="text-center">
                    <p className="font-display text-lg">{x.name}</p>
                    {clean(x.p.qualification) ? (
                      <p className="font-body text-[0.65rem] tracking-widest text-[var(--mural-ink-soft)]">
                        {x.p.qualification}
                      </p>
                    ) : null}
                    {clean(x.p.occupation) ? (
                      <p className="font-body text-[0.65rem] tracking-widest text-[var(--mural-ink-soft)]">
                        {x.p.occupation}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
          </Settle>
        ) : null}
      </Region>

      {/* Region 3 — families and message */}
      {[...parentsOf(groom), ...parentsOf(bride)].length ||
      clean(content.message) ||
      relatives.length ? (
        <Region className="pb-24 text-center">
          <SpineKnot />
          {[...parentsOf(groom), ...parentsOf(bride)].length ? (
            <Settle delay={0.3}>
              <Eyebrow>Our families</Eyebrow>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { label: groomName ? `Son of` : null, list: parentsOf(groom) },
                  { label: brideName ? `Daughter of` : null, list: parentsOf(bride) },
                ]
                  .filter((c) => c.list.length)
                  .map((c, i) => (
                    <div key={i}>
                      {c.label ? (
                        <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--mural-ink-soft)]">
                          {c.label}
                        </p>
                      ) : null}
                      {c.list.map((n) => (
                        <p key={n} className="font-display text-xl leading-snug">
                          {n}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            </Settle>
          ) : null}

          {relatives.length ? (
            <Settle delay={0.5}>
              <p className="mt-8 font-body text-[0.65rem] leading-relaxed tracking-[0.2em] text-[var(--mural-ink-soft)]">
                {relatives.join(" \u00b7 ")}
              </p>
            </Settle>
          ) : null}

          {clean(content.message) ? (
            <Settle delay={0.7}>
              <p className="mx-auto mt-10 max-w-md font-display text-xl italic leading-relaxed text-[var(--mural-ink)]">
                {content.message}
              </p>
            </Settle>
          ) : null}
        </Region>
      ) : null}

      {/* Region 4 — events as illustrated locations */}
      {events.length ? (
        <Region className="pb-24 text-center">
          <SpineKnot />
          <Settle>
            <Eyebrow>Wedding events</Eyebrow>
          </Settle>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {events.map((e, i) => (
              <Settle key={i} delay={0.15 * i}>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-16">
                    <ArchNiche delay={0.15 * i} />
                  </div>
                  <p className="mt-2 font-display text-lg leading-tight">
                    {clean(e.name) ?? clean(e.title)}
                  </p>
                  {clean(e.date) ? (
                    <p className="font-body text-[0.6rem] tracking-[0.2em] text-[var(--mural-ink-soft)]">
                      {e.date}
                    </p>
                  ) : null}
                  {clean(e.time) ? (
                    <p className="font-body text-[0.6rem] tracking-[0.2em] text-[var(--mural-ink-soft)]">
                      {e.time}
                    </p>
                  ) : null}
                  {clean(e.venue) ? (
                    <p className="mt-1 font-body text-[0.6rem] leading-snug text-[var(--mural-ink-soft)]">
                      {e.venue}
                    </p>
                  ) : null}
                  {clean(e.description) ? (
                    <p className="mt-1 font-body text-[0.6rem] leading-snug text-[var(--mural-ink-soft)]">
                      {e.description}
                    </p>
                  ) : null}
                </div>
              </Settle>
            ))}
          </div>
        </Region>
      ) : null}

      {/* Region 5 — the venue as a destination in the same world */}
      {clean(venue.name) ||
      clean(venue.address) ||
      clean(venue.city) ||
      safeHttp(venue.image_url) ||
      mapsUrl ? (
        <Region className="pb-24 text-center">
          <PalaceMotif />
          <Settle delay={0.4}>
            <Eyebrow>Venue</Eyebrow>
            {clean(venue.name) ? (
              <h2 className="mt-2 font-display text-3xl">{venue.name}</h2>
            ) : null}
            {clean(venue.address) ? (
              <p className="mt-1 font-body text-xs tracking-wide text-[var(--mural-ink-soft)]">
                {venue.address}
              </p>
            ) : null}
            {clean(venue.city) ? (
              <p className="font-body text-xs tracking-wide text-[var(--mural-ink-soft)]">
                {venue.city}
              </p>
            ) : null}
          </Settle>
          {safeHttp(venue.image_url) ? (
            <Settle delay={0.6}>
              <img
                src={safeHttp(venue.image_url)!}
                alt={clean(venue.name) ?? "Venue"}
                loading="lazy"
                className="zar-frame mx-auto mt-6 max-h-56 w-full rounded-md object-cover"
              />
            </Settle>
          ) : null}
          {mapsUrl ? (
            <Settle delay={0.75}>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zar-frame mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--mural-ink)] px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.28em] text-[var(--mural-paper)]"
              >
                <MapPin className="size-3.5" /> Get Directions
              </a>
            </Settle>
          ) : null}
        </Region>
      ) : null}

      {/* Region 6 — memories framed inside the mural */}
      {gallery.length ? (
        <Region className="pb-24 text-center">
          <SpineKnot />
          <Settle>
            <Eyebrow>Our memories</Eyebrow>
          </Settle>
          <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
            {gallery.map((src, i) => (
              <Settle key={src + i} delay={0.08 * i} className="shrink-0 snap-center">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="zar-frame h-40 w-32 rounded-sm object-cover sm:h-52 sm:w-40"
                />
              </Settle>
            ))}
          </div>
        </Region>
      ) : null}

      {/* Region 7 — RSVP */}
      <Region className="pb-24 text-center">
        <SpineKnot />
        <Settle>
          <Eyebrow>Kindly respond</Eyebrow>
          <p className="mb-8 mt-2 font-display text-lg italic text-[var(--mural-ink-soft)]">
            Your presence will make our day more special
          </p>
        </Settle>
        <Rsvp />
      </Region>

      {/* Region 8 — contacts and QR */}
      {contacts.length || publicUrl ? (
        <Region className="pb-24 text-center">
          <SpineKnot />
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:items-start">
            {contacts.length ? (
              <Settle>
                <Eyebrow>Get in touch</Eyebrow>
                <div className="mt-4 space-y-3">
                  {contacts.map((c, i) => {
                    const wa = whatsappHref(c);
                    return (
                      <div
                        key={i}
                        className="zar-frame flex items-center justify-between gap-3 rounded-md bg-[var(--mural-paper)]/60 px-4 py-3 text-left"
                      >
                        <div>
                          {clean(c.name) ? (
                            <p className="font-display text-lg leading-tight">{c.name}</p>
                          ) : null}
                          {clean(c.relation) ? (
                            <p className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-[var(--mural-ink-soft)]">
                              {c.relation}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${(c.phone ?? "").replace(/\s/g, "")}`}
                            aria-label="Call"
                            className="zar-frame grid size-9 place-items-center rounded-full"
                          >
                            <Phone className="size-4" />
                          </a>
                          {wa ? (
                            <a
                              href={wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                              className="zar-frame grid size-9 place-items-center rounded-full"
                            >
                              <MessageCircle className="size-4" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Settle>
            ) : null}

            {publicUrl ? (
              <Settle delay={0.2}>
                <Eyebrow>Scan &amp; share</Eyebrow>
                <div className="mt-4">
                  <QrPanel url={publicUrl} label={content.qr_label ?? null} />
                </div>
              </Settle>
            ) : null}
          </div>
        </Region>
      ) : null}

      {/* Region 9 — closing panorama */}
      <Region className="pb-24 text-center">
        <PanoramaMotif />
        <Settle delay={0.5}>
          <h2 className="mt-6 font-display text-3xl tracking-wide">Thank you</h2>
          {clean(content.invitation_end) ? (
            <p className="mx-auto mt-2 max-w-sm font-body text-[0.65rem] uppercase tracking-[0.28em] text-[var(--mural-ink-soft)]">
              {content.invitation_end}
            </p>
          ) : null}
          {groomName || brideName ? (
            <p className="mt-6 font-display text-2xl text-[var(--mural-ink)]">
              {[groomName, brideName].filter(Boolean).join("  \u0026  ")}
            </p>
          ) : null}
        </Settle>
      </Region>
    </main>
  );
}
