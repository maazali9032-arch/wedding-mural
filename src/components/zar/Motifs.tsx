import { InkPath, InkWash } from "./Draw";

const S = { stroke: "var(--mural-ink)", strokeWidth: 1.1 } as const;
const F = { stroke: "var(--mural-line-faint)", strokeWidth: 0.9 } as const;

/** Region 1 — the small entry point into the mural world. */
export function GateMotif() {
  return (
    <svg viewBox="0 0 200 240" className="w-full" role="presentation">
      <InkPath d="M40 235 V90 A60 60 0 0 1 160 90 V235" {...S} delay={0.1} duration={1.8} />
      <InkPath d="M56 235 V95 A44 44 0 0 1 144 95 V235" {...F} delay={0.5} duration={1.6} />
      <InkPath d="M100 46 v-22" {...S} delay={1.1} duration={0.5} />
      <InkPath d="M100 24 c -12 -4 -12 -20 0 -24 c 12 4 12 20 0 24 z" {...S} delay={1.3} duration={0.8} />
      <InkPath d="M22 235 h156" {...S} delay={0.2} duration={1.2} />
      <InkWash delay={1.6}>
        <ellipse cx="100" cy="150" rx="34" ry="46" fill="var(--mural-glow)" />
      </InkWash>
    </svg>
  );
}

/** Region 2 — the horizon the couple names stand upon. */
export function HorizonMotif() {
  return (
    <svg viewBox="0 0 360 120" className="w-full" role="presentation">
      <InkPath d="M0 96 C 48 58, 78 92, 112 66 C 146 40, 176 92, 214 70 C 252 48, 300 94, 360 74" {...F} duration={2} />
      <InkPath d="M0 108 C 60 96, 120 116, 180 104 C 240 92, 300 114, 360 102" {...S} delay={0.4} duration={2} />
      <InkPath d="M150 104 v-20 h8 v-10 h6 v10 h8 v20" {...S} delay={1.1} duration={0.9} />
      <InkPath d="M164 74 a10 10 0 0 1 20 0 v30" {...S} delay={1.3} duration={0.9} />
      <InkPath d="M196 104 v-24 h10 v24" {...S} delay={1.5} duration={0.7} />
      <InkPath d="M74 100 v-16 M68 90 l6 -8 l6 8" {...F} delay={1.2} duration={0.6} />
    </svg>
  );
}

/** Small drawn arch used as an illustrated location for each event. */
export function ArchNiche({ delay = 0 }: { delay?: number }) {
  return (
    <svg viewBox="0 0 100 130" className="h-full w-full" role="presentation">
      <InkPath d="M14 128 V52 A36 36 0 0 1 86 52 V128" {...S} delay={delay} duration={1.2} />
      <InkPath d="M24 128 V56 A26 26 0 0 1 76 56 V128" {...F} delay={delay + 0.25} duration={1.1} />
      <InkPath d="M50 22 v-10 M44 12 h12" {...S} delay={delay + 0.7} duration={0.4} />
    </svg>
  );
}

/** Region 5 — the destination palace across the water. */
export function PalaceMotif() {
  return (
    <svg viewBox="0 0 360 150" className="w-full" role="presentation">
      <InkPath d="M60 140 V70 h60 V140" {...S} duration={1.2} />
      <InkPath d="M120 140 V52 A60 40 0 0 1 240 52 V140" {...S} delay={0.3} duration={1.6} />
      <InkPath d="M240 140 V70 h60 V140" {...S} delay={0.6} duration={1.2} />
      <InkPath d="M180 12 v-8" {...S} delay={1.2} duration={0.4} />
      <InkPath d="M150 140 V104 a30 30 0 0 1 60 0 V140" {...F} delay={0.9} duration={1.1} />
      <InkPath d="M78 140 V112 a12 12 0 0 1 24 0 V140 M258 140 V112 a12 12 0 0 1 24 0 V140" {...F} delay={1} duration={1} />
      <InkPath d="M0 146 h360" {...S} delay={1.3} duration={1.4} />
      <InkWash delay={1.6}>
        <rect x="0" y="146" width="360" height="4" fill="var(--mural-water)" />
      </InkWash>
    </svg>
  );
}

/** Final region — the panoramic closing scene. */
export function PanoramaMotif() {
  return (
    <svg viewBox="0 0 360 160" className="w-full" role="presentation">
      <InkPath d="M0 104 C 70 84, 130 118, 200 96 C 262 76, 310 108, 360 92" {...F} duration={2.2} />
      <InkPath d="M126 118 c 12 12 96 12 108 0 c -14 -6 -94 -6 -108 0 z" {...S} delay={0.6} duration={1.4} />
      <InkPath d="M180 118 v-28 M180 90 c 14 6 14 18 0 22" {...S} delay={1.2} duration={0.9} />
      <InkPath d="M0 132 C 90 124, 180 140, 270 130 C 310 126, 336 134, 360 130" {...S} delay={0.9} duration={2} />
      <InkPath d="M40 146 q 10 -8 20 0 M300 146 q 10 -8 20 0" {...F} delay={1.5} duration={0.8} />
      <InkWash delay={1.8}>
        <circle cx="180" cy="66" r="16" fill="var(--mural-glow)" />
      </InkWash>
    </svg>
  );
}

/** Divider ornament that grows out of the spine between regions. */
export function SpineKnot({ delay = 0 }: { delay?: number }) {
  return (
    <svg viewBox="0 0 120 40" className="mx-auto w-32" role="presentation">
      <InkPath d="M0 20 h38" {...F} delay={delay} duration={0.7} />
      <InkPath d="M82 20 h38" {...F} delay={delay} duration={0.7} />
      <InkPath d="M60 6 c 14 6 14 22 0 28 c -14 -6 -14 -22 0 -28 z" {...S} delay={delay + 0.3} duration={0.9} />
      <InkPath d="M60 12 v16" {...F} delay={delay + 0.7} duration={0.5} />
    </svg>
  );
}
