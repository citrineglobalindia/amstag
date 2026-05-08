// FloatingActions — single fixed-position container that stacks the chatbot
// launcher above the WhatsApp FAB in a clean vertical column at the bottom-right
// of every page. Both children are size-locked (h-14 w-14, see WhatsAppFab.tsx
// and Chatbot.tsx) so they share a centre line and visually read as a pair.
//
// Layout (bottom-right corner of viewport, growing upward):
//   ┌──────────┐
//   │   💬     │  ← Chatbot launcher (top)
//   ├──────────┤  ← gap-3 (12px)
//   │   📩     │  ← WhatsApp FAB (bottom, the conventional FAB anchor)
//   └──────────┘
//   Total height = 56 + 12 + 56 = 124px, anchored at bottom-5 right-5.
//
// The chatbot's pop-up panel positions itself at fixed bottom-44 right-5 so
// it clears the entire stack when opened.
import { Chatbot } from "./Chatbot";
import { WhatsAppFab } from "./WhatsAppFab";

export function FloatingActions() {
  return (
    <div
      // Safe-area inset on the right + bottom keeps the FABs clear of iPhone
      // home-indicator and notched displays without pushing content on
      // browsers that don't support env().
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
      className="fixed z-50 flex flex-col items-center gap-3"
      role="group"
      aria-label="Quick contact"
    >
      <Chatbot />
      <WhatsAppFab />
    </div>
  );
}
