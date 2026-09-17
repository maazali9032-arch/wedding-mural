import { Link } from "@tanstack/react-router";
import { GateMotif, SpineKnot } from "./Motifs";
import { BrandTicker } from "./BrandTicker";
import { Settle } from "./Draw";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="zar-paper flex min-h-screen items-center justify-center overflow-x-hidden px-6 py-16 text-center font-body text-[var(--mural-ink)]">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}

export function LoadingScreen() {
  return (
    <Shell>
      <div className="mx-auto w-32 opacity-70">
        <GateMotif />
      </div>
      <p className="mt-6 font-body text-[0.6rem] uppercase tracking-[0.4em] text-[var(--mural-ink-soft)]">
        Unrolling the scroll
      </p>
    </Shell>
  );
}

export function NotFoundScreen() {
  return (
    <Shell>
      <SpineKnot />
      <h1 className="mt-6 font-display text-3xl">This scroll is blank</h1>
      <p className="mt-3 font-body text-xs leading-relaxed tracking-wide text-[var(--mural-ink-soft)]">
        We could not find an invitation at this address. Please check the link you were given.
      </p>
      <Link
        to="/"
        className="zar-frame mt-8 inline-block rounded-full px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.3em]"
      >
        About ZAR
      </Link>
    </Shell>
  );
}

export function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <Shell>
      <SpineKnot />
      <h1 className="mt-6 font-display text-3xl">The ink hasn&apos;t reached us</h1>
      <p className="mt-3 font-body text-xs leading-relaxed tracking-wide text-[var(--mural-ink-soft)]">
        We could not load this invitation right now. Please check your connection and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="zar-frame mt-8 rounded-full bg-[var(--mural-ink)] px-7 py-2.5 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--mural-paper)]"
      >
        Try again
      </button>
    </Shell>
  );
}

/** Fallback state — safe shop information only, never wedding-specific data. */
export function FallbackScreen({
  brandName,
  shop,
}: {
  brandName?: string | null;
  shop?: {
    name?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    address?: string | null;
    city?: string | null;
    business_contact?: string | null;
  } | null;
}) {
  return (
    <>
      <BrandTicker name={brandName ?? null} />
      <Shell>
        <Settle>
          <div className="mx-auto w-28 opacity-80">
            <GateMotif />
          </div>
          <h1 className="mt-6 font-display text-3xl">This invitation is not available</h1>
          <p className="mt-3 font-body text-xs leading-relaxed tracking-wide text-[var(--mural-ink-soft)]">
            Please contact the studio that shared this link for an updated invitation.
          </p>
          {shop?.name ? <p className="mt-6 font-display text-xl">{shop.name}</p> : null}
          {[shop?.address, shop?.city, shop?.business_contact].filter(Boolean).length ? (
            <p className="mt-2 text-xs text-[var(--mural-ink-soft)]">
              {[shop?.address, shop?.city, shop?.business_contact].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          {shop?.phone ? (
            <a className="mt-4 inline-block text-xs underline" href={`tel:${shop.phone}`}>
              {shop.phone}
            </a>
          ) : null}
          {shop?.whatsapp && /^https:\/\//i.test(shop.whatsapp) ? (
            <a
              className="ml-4 mt-4 inline-block text-xs underline"
              href={shop.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          ) : null}
        </Settle>
      </Shell>
    </>
  );
}
