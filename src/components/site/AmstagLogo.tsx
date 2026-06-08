// AmstagLogo, single source of truth for the Amstag brand mark.
// Renders the official logo asset (public/logo.png) and exposes two
// presentation variants:
//   - mark: just the deer-and-A badge (square)
//   - lockup: badge + Amstag wordmark side by side
// Wordmark colour adapts to the parent's `dark` prop so the logo works on
// both light surfaces and the dark hero / footer.
import * as React from "react";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<Size, number> = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
};

// Lobster Two reads visually smaller than Space Grotesk at the same px,
// so wordmark sizes are bumped one step up vs. the sans-serif scale.
const WORDMARK_TEXT_CLASS: Record<Size, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export type AmstagLogoProps = {
  /** Size of the badge in design tokens. Defaults to "md" (36px). */
  size?: Size;
  /** Render the wordmark next to the badge. Default just the badge. */
  withWordmark?: boolean;
  /** Use light wordmark colour (white) for dark backgrounds. */
  dark?: boolean;
  className?: string;
  /** Override accessible label. Defaults to "Amstag". */
  alt?: string;
};

export function AmstagLogo({
  size = "md",
  withWordmark = false,
  dark = false,
  className = "",
  alt = "Amstag",
}: AmstagLogoProps) {
  const px = SIZE_PX[size];
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/logo.png"
        alt={alt}
        width={px}
        height={px}
        loading="eager"
        decoding="async"
        className="block shrink-0"
        style={{ width: px, height: px }}
      />
      {withWordmark && (
        <span
          className={`font-brand font-bold leading-none ${
            WORDMARK_TEXT_CLASS[size]
          } ${dark ? "text-white" : "text-[var(--ink)]"}`}
        >
          Amstag
        </span>
      )}
    </span>
  );
}
