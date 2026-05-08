// WhatsAppFab — the green message button. Positioning is owned by the parent
// FloatingActions row so this component is a self-contained badge that just
// needs to be placed somewhere; size + animations are baked in.
//
// The icon now vibrates continuously (fast micro-shake every 1.6s) so the
// affordance is unambiguous on a glance — particularly important for users
// who didn't realise it was a live channel.
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Mobile keeps a tighter 48px target (still within Apple HIG / Material spec
// for tappable buttons), desktop expands to 56px for visual presence.
const SIZE_CLASS = "h-12 w-12 sm:h-14 sm:w-14";

export function WhatsAppFab() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href="https://wa.me/919945645909"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with AMSTAG on WhatsApp"
      title="Message us on WhatsApp"
      initial={{ scale: 0, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className={`relative grid place-items-center ${SIZE_CLASS} shrink-0 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#25D366]`}
    >
      {/* Continuous vibration — short, fast micro-shake every ~1.6s.
          Translation gives a real "buzzing" effect; rotation alone reads
          more as a wave. We combine both for a subtle hand-trembling feel. */}
      <motion.span
        className="grid place-items-center"
        animate={
          reduce
            ? undefined
            : {
                x: [0, -1.5, 1.5, -1.5, 1.5, -1, 1, 0],
                y: [0, 1, -1, 1, -1, 0.5, -0.5, 0],
                rotate: [0, -10, 10, -8, 8, -4, 4, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1.0,
                ease: "easeInOut",
              }
        }
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
      </motion.span>

      {/* Expanding pulse ring — confirms the button is "live" */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40"
        animate={reduce ? undefined : { scale: [1, 1.55], opacity: [0.6, 0] }}
        transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Online dot — small green sentinel in the corner */}
      <span
        aria-hidden
        className="absolute -top-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-white"
      >
        <span className="h-2 w-2 rounded-full bg-[#25D366]" />
      </span>
    </motion.a>
  );
}
