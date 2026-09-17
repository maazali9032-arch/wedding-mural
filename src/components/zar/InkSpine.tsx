import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * The continuous vine/river that physically connects every region of the mural.
 * It is inked in real time by scroll progress: the same single path runs from
 * the first region to the last, so new regions always grow out of the previous.
 */
export function InkSpine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });

  const spine =
    "M50 0 C 20 60, 80 110, 50 170 C 20 230, 82 280, 50 340 C 18 400, 80 450, 50 510 " +
    "C 20 570, 80 620, 50 680 C 22 740, 78 790, 50 850 C 20 910, 80 960, 50 1000";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-1/2 h-full w-[92vw] max-w-[520px] -translate-x-1/2 opacity-[0.5]"
      >
        <path d={spine} fill="none" stroke="var(--mural-line-faint)" strokeWidth="0.5" />
        <motion.path
          d={spine}
          fill="none"
          stroke="var(--mural-ink)"
          strokeWidth="0.7"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: reduced ? 1 : drawn }}
        />
      </svg>
    </div>
  );
}
