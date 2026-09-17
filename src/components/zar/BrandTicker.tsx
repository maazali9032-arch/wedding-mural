/**
 * Global floating shop/brand strip.
 * Tiny, semi-transparent, pointer-events-safe, fixed to the viewport bottom.
 * The brand name is supplied by the public RPC payload —
 * it is never hardcoded and never queried from a shop table directly.
 */
export function BrandTicker({ name, tagline }: { name?: string | null; tagline?: string | null }) {
  const label = (name ?? "").trim();
  if (!label) return null;

  const words = [label, tagline?.trim() || null].filter(Boolean) as string[];
  const run = Array.from({ length: 6 }, (_, i) => words[i % words.length]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-30 flex items-center overflow-hidden
                 border-y border-[var(--mural-line-faint)] bg-[var(--mural-ticker)]
                 backdrop-blur-[1px]"
      style={{ bottom: 0, height: "clamp(14px, 1.8svh, 22px)" }}
    >
      <div className="zar-marquee flex min-w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {run.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center text-[0.5rem] uppercase tracking-[0.42em] text-[var(--mural-ink)]/70"
              >
                {word}
                <span className="mx-4 text-[var(--mural-gold)]">&#10022;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
