import { createFileRoute } from "@tanstack/react-router";
import { GateMotif, SpineKnot } from "@/components/zar/Motifs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAR Invitations — Digital Wedding Invitations" },
      {
        name: "description",
        content:
          "ZAR crafts illustrated digital wedding invitations. Open your personal invitation link to view yours.",
      },
      { property: "og:title", content: "ZAR Invitations — Digital Wedding Invitations" },
      {
        property: "og:description",
        content:
          "ZAR crafts illustrated digital wedding invitations. Open your personal invitation link to view yours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/** The root path never resolves to a wedding. */
function Landing() {
  return (
    <main className="zar-paper flex min-h-screen items-center justify-center overflow-x-hidden px-6 py-16 text-center font-body text-[var(--mural-ink)]">
      <div className="w-full max-w-sm">
        <div className="mx-auto w-32">
          <GateMotif />
        </div>
        <h1 className="mt-8 font-display text-4xl tracking-wide">ZAR Invitations</h1>
        <p className="mt-3 font-body text-[0.65rem] uppercase tracking-[0.32em] text-[var(--mural-ink-soft)]">
          Crafting your special moments
        </p>
        <SpineKnot delay={0.4} />
        <p className="mt-4 font-body text-xs leading-relaxed tracking-wide text-[var(--mural-ink-soft)]">
          Each invitation lives at its own private link. Please open the link shared with you to
          view it.
        </p>
      </div>
    </main>
  );
}
