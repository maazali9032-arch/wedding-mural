import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode, SVGProps } from "react";

/**
 * A single ink stroke that draws itself when scrolled into view.
 * Construction = stroke-dashoffset over pathLength, never an opacity fade-in.
 */
export function InkPath({
  d,
  delay = 0,
  duration = 1.4,
  ...rest
}: { d: string; delay?: number; duration?: number } & Omit<SVGProps<SVGPathElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "ref" | "style">) {
  const reduced = useReducedMotion();
  const transition: Transition = reduced
    ? { duration: 0.2, delay: 0 }
    : { duration, delay, ease: [0.22, 0.61, 0.36, 1] };

  return (
    <motion.path
      d={d}
      pathLength={1}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.85 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={transition}
      {...(rest as Record<string, unknown>)}
    />
  );
}

/** Ink wash / fill that seeps in once its outline has been drawn. */
export function InkWash({
  children,
  delay = 0.6,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.2 : 1.1, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.g>
  );
}

/** Content block that settles into the mural as its region is drawn. */
export function Settle({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduced ? 0.25 : 0.9, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
