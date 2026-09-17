import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { InkPath } from "./Draw";

/**
 * RSVP is animation only. Nothing is stored, counted or transmitted.
 */
export function Rsvp() {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {choice === null ? (
          <motion.div
            key="choices"
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button
              type="button"
              onClick={() => setChoice("yes")}
              className="zar-frame w-full rounded-full bg-[var(--mural-ink)] px-7 py-3 font-body text-xs uppercase tracking-[0.28em] text-[var(--mural-paper)] transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
            >
              Will Be There
            </button>
            <button
              type="button"
              onClick={() => setChoice("no")}
              className="zar-frame w-full rounded-full bg-transparent px-7 py-3 font-body text-xs uppercase tracking-[0.28em] text-[var(--mural-ink)] transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
            >
              Regretfully Decline
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="seal"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <svg viewBox="0 0 120 120" className="w-24" role="presentation">
              <InkPath
                d="M60 12 a48 48 0 1 1 -0.1 0"
                stroke="var(--mural-gold)"
                strokeWidth={1.4}
                duration={1.2}
              />
              <InkPath
                d={
                  choice === "yes"
                    ? "M40 62 l14 14 l26 -30"
                    : "M60 34 c 18 14 18 30 0 42 c -18 -12 -18 -28 0 -42 z"
                }
                stroke="var(--mural-ink)"
                strokeWidth={1.6}
                delay={0.7}
                duration={0.9}
              />
            </svg>
            <p className="font-display text-2xl text-[var(--mural-ink)]">
              {choice === "yes" ? "Your presence is written in" : "You will be missed"}
            </p>
            <p className="max-w-xs font-body text-xs leading-relaxed tracking-wide text-[var(--mural-ink-soft)]">
              {choice === "yes"
                ? "Thank you — the mural feels warmer already."
                : "Thank you for letting us know. You remain part of our story."}
            </p>
            <button
              type="button"
              onClick={() => setChoice(null)}
              className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--mural-ink-soft)] underline-offset-4 hover:underline"
            >
              Change response
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
